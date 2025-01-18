"use server";

import { db } from "@/server/db/drizzle";
import { transactionsTable } from "../db/schema";
import { revalidatePath } from "next/cache";
import { newTransactionSchema } from "@/lib/validations";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { updateBalance } from "./balance";
import {
  getCachedLatestTransactions,
  getCachedSpendings,
  getCachedTotalPages,
  getCachedTransactions,
} from "./transactions.cache";

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
    const transactions = await getCachedLatestTransactions(
      number,
      session.session.userId
    );

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
