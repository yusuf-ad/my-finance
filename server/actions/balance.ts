import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "../db/drizzle";
import { transactionsTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const getBalance = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    // await new Promise((resolve) => setTimeout(resolve, 5000));

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

    const balance = income - expenses;

    return { success: true, balance, income, expenses };
  } catch {
    return {
      success: false,
      message: "Failed to fetch transactions",
    };
  }
};
