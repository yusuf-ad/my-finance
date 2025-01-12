"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "../db/drizzle";
import { balanceTable, transactionsTable } from "../db/schema";
import { eq, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";

interface Balance {
  id: number;
  amount: number;
  updatedAt: Date;
}

const getCachedBalance = unstable_cache(
  async (userId: string) => {
    const [balance] = await db
      .select()
      .from(balanceTable)
      .where(eq(balanceTable.userId, userId));
    return balance;
  },
  ["balance"],
  {
    revalidate: 3600,
    tags: ["balance"],
  }
);

const getCachedTransactions = unstable_cache(
  async (userId: string) => {
    return await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.userId, userId));
  },
  ["transactions"],
  {
    revalidate: 3600,
    tags: ["transactions"],
  }
);

export const getBalance = async (): Promise<
  | { success: true; balance: Balance; income: number; expenses: number }
  | { success: false; message: string }
> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const [balanceData, transactionData] = await Promise.all([
      getCachedBalance(session.session.userId),
      getCachedTransactions(session.session.userId),
    ]);

    if (!balanceData) {
      return { success: false, message: "Balance not found" };
    }

    if (!transactionData) {
      return { success: false, message: "Transactions not found" };
    }

    const transactions = transactionData;

    const income = transactions.reduce((acc, transaction) => {
      return transaction.isIncome ? acc + transaction.amount : acc;
    }, 0);

    const expenses = transactions.reduce((acc, transaction) => {
      return transaction.isIncome ? acc : acc + transaction.amount;
    }, 0);

    return {
      success: true,
      balance: {
        id: balanceData.id,
        amount: balanceData.amount,
        updatedAt: balanceData.updatedAt,
      },
      income,
      expenses,
    };
  } catch {
    return {
      success: false,
      message: "Failed to fetch transactions",
    };
  }
};

export const updateBalance = async ({ amount }: { amount: number }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const balance = await db
      .update(balanceTable)
      .set({
        amount: sql`${balanceTable.amount} + ${amount}`,
        updatedAt: sql`NOW()`,
      })
      .where(eq(balanceTable.userId, session.session.userId));

    return { success: true, balance };
  } catch {
    return {
      success: false,
      message: "Failed to update balance",
    };
  }
};

export const createBalance = async (amount: number = 0) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await db.insert(balanceTable).values({
      userId: session.session.userId,
      amount,
      updatedAt: sql`NOW()`,
    });

    return { success: true, message: "Balance created" };
  } catch {
    return {
      success: false,
      message: "Failed to create balance",
    };
  }
};
