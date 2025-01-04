"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "../db/drizzle";
import { balanceTable, transactionsTable } from "../db/schema";
import { eq, sql } from "drizzle-orm";

export const getBalance = async () => {
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
      .where(eq(transactionsTable.userId, session.session.userId));

    const income = transactions.reduce((acc, transaction) => {
      return transaction.isIncome ? acc + transaction.amount : acc;
    }, 0);

    const expenses = transactions.reduce((acc, transaction) => {
      return transaction.isIncome ? acc : acc + transaction.amount;
    }, 0);

    const [balance] = await db
      .select()
      .from(balanceTable)
      .where(eq(balanceTable.userId, session.session.userId));

    return { success: true, balance: balance, income, expenses };
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
