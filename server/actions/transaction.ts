"use server";

import { db } from "@/server/db/drizzle";
import { transactionsTable } from "../db/schema";
import { revalidatePath } from "next/cache";
import { newTransactionSchema } from "@/lib/validations";
import { and, asc, count, desc, eq, ilike } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

export const getTransactions = async ({
  page = 1,
  pageSize = 10,
  getBy,
}: { page?: number; pageSize?: number; getBy?: string } = {}): Promise<
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
      .orderBy(asc(transactionsTable.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .where(
        and(
          eq(transactionsTable.userId, session.session.userId),
          getBy ? ilike(transactionsTable.name, `%${getBy}%`) : undefined
        )
      );

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
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const whereCondition =
      category === "all"
        ? eq(transactionsTable.userId, session.session.userId)
        : and(
            eq(transactionsTable.userId, session.session.userId),
            eq(transactionsTable.category, category)
          );

    const spendings = await db
      .select()
      .from(transactionsTable)
      .where(whereCondition);

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
    const totalRows = await db.$count(
      transactionsTable,
      and(
        eq(transactionsTable.userId, session.session.userId),
        getBy ? ilike(transactionsTable.name, `%${getBy}%`) : undefined
      )
    );

    const totalPages = Math.ceil(totalRows / pageSize);
    return totalPages;
  } catch (error) {
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
