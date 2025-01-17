"use server";

import { db } from "@/server/db/drizzle";
import { transactionsTable } from "../db/schema";
import { revalidatePath } from "next/cache";
import { newTransactionSchema } from "@/lib/validations";
import { and, asc, count, desc, eq, ilike } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { updateBalance } from "./balance";

export interface Transaction {
  id: number;
  name: string;
  date: Date;
  category: string;
  amount: number;
  recurring: boolean;
  isIncome: boolean;
}

export type NewTransaction = Omit<Transaction, "id">;
import { unstable_cache } from "next/cache";

const getCachedTransactions = unstable_cache(
  async ({
    userId,
    page,
    pageSize,
    getBy,
    sortBy,
    filterBy,
  }: {
    userId: string;
    page: number;
    pageSize: number;
    getBy?: string;
    sortBy?: string;
    filterBy?: string;
  }) => {
    return await db
      .select()
      .from(transactionsTable)
      .orderBy(desc(transactionsTable.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .where(
        and(
          eq(transactionsTable.userId, userId),
          getBy ? ilike(transactionsTable.name, `%${getBy}%`) : undefined,
          filterBy && filterBy !== "All"
            ? eq(transactionsTable.category, filterBy)
            : undefined
        )
      );
  },
  ["transactions"],
  {
    revalidate: 3600,
    tags: ["transactions"],
  }
);

const getCachedSpendings = unstable_cache(
  async (userId: string, category: string) => {
    const whereCondition =
      category === "all"
        ? eq(transactionsTable.userId, userId)
        : and(
            eq(transactionsTable.userId, userId),
            eq(transactionsTable.category, category)
          );

    return await db.select().from(transactionsTable).where(whereCondition);
  },
  ["spendings"],
  {
    revalidate: 3600,
    tags: ["transactions", "spendings"],
  }
);

const getCachedTotalPages = unstable_cache(
  async (userId: string, pageSize: number, getBy?: string) => {
    return await db.$count(
      transactionsTable,
      and(
        eq(transactionsTable.userId, userId),
        getBy ? ilike(transactionsTable.name, `%${getBy}%`) : undefined
      )
    );
  },
  ["transactionCount"],
  {
    revalidate: 3600,
    tags: ["transactions"],
  }
);

export const getTransactions = async ({
  page = 1,
  pageSize = 10,
  getBy,
  sortBy,
  filterBy,
}: {
  page?: number;
  pageSize?: number;
  getBy?: string;
  sortBy?: string;
  filterBy?: string;
} = {}): Promise<
  | {
      success: true;
      transactions: Transaction[];
    }
  | {
      success: false;
      message: string;
    }
> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const transactions = await getCachedTransactions({
      page,
      pageSize,
      userId: session.session.userId,
      getBy,
      filterBy,
      sortBy,
    });

    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction,
      date: new Date(transaction.date),
    }));

    return { success: true, transactions: formattedTransactions };
  } catch {
    return {
      success: false,
      message: "Failed to fetch transactions",
    };
  }
};

export const getSpendings = async ({
  category,
}: {
  category: string;
}): Promise<
  | {
      success: true;
      spendings: Transaction[];
    }
  | {
      success: false;
      message: string;
    }
> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const spendings = await getCachedSpendings(
      session.session.userId,
      category
    );

    const formattedSpendings = spendings.map((spending) => ({
      ...spending,
      date: new Date(spending.date),
    }));

    return { success: true, spendings: formattedSpendings };
  } catch {
    return {
      success: false,
      message: "Failed to fetch spendings",
    };
  }
};

export const getTotalPages = async ({
  getBy,
  pageSize,
}: {
  getBy?: string;
  pageSize: number;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.id) {
    return 0;
  }

  try {
    const totalRows = await getCachedTotalPages(
      session.session.userId,
      pageSize,
      getBy
    );

    return Math.ceil(totalRows / pageSize);
  } catch {
    return 0;
  }
};

export const createTransaction = async (transaction: NewTransaction) => {
  const isValid = newTransactionSchema.safeParse(transaction);

  if (!isValid.success) {
    return { success: false, message: "Invalid data" };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await db.insert(transactionsTable).values({
      name: transaction.name,
      date: transaction.date.toISOString(),
      amount: transaction.amount,
      category: transaction.category,
      recurring: transaction.recurring,
      isIncome: transaction.isIncome,
      userId: session.session.userId,
    });

    const updateResult = await updateBalance({
      amount: transaction.isIncome ? transaction.amount : -transaction.amount,
    });

    if (!updateResult.success) {
      throw new Error("Failed to update balance");
    }

    revalidatePath("/transactions");

    return { success: true, message: "Transaction created successfully" };
  } catch {
    return { success: false, message: "Failed to create transaction" };
  }
};

export const getLatestTransactions = async (
  number: number = 4
): Promise<
  | {
      success: true;
      transactions: Transaction[];
    }
  | {
      success: false;
      message: string;
    }
> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const transactions = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.userId, session.session.userId))
      .orderBy(desc(transactionsTable.id))
      .limit(number);

    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction,
      date: new Date(transaction.date),
    }));

    return {
      success: true,
      transactions: formattedTransactions,
    };
  } catch {
    return {
      success: false,
      message: "Failed to fetch latest transactions",
    };
  }
};
