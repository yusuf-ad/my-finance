"use server";

import { db } from "@/server/db/drizzle";
import { transactionsTable } from "../db/schema";
import { revalidatePath } from "next/cache";
import { newTransactionSchema } from "@/lib/validations";
import { ilike } from "drizzle-orm";

export interface Transaction {
  id: number;
  name: string;
  date: Date;
  category: string;
  amount: number;
  recurring: boolean;
}

export type NewTransaction = Omit<Transaction, "id">;

export const getTransactions = async (
  getBy?: string
): Promise<Transaction[]> => {
  const transactions = await db
    .select()
    .from(transactionsTable)
    .where(getBy ? ilike(transactionsTable.name, `%${getBy}%`) : undefined);

  const formattedTransactions = transactions.map((transaction) => ({
    ...transaction,
    date: new Date(transaction.date),
  }));

  return formattedTransactions;
};

export const createTransaction = async (transaction: NewTransaction) => {
  const isValid = newTransactionSchema.safeParse(transaction);

  if (!isValid.success) {
    return { success: false, message: "Invalid data" };
  }

  try {
    await db.insert(transactionsTable).values({
      name: transaction.name,
      date: transaction.date.toISOString(),
      amount: transaction.amount,
      category: transaction.category,
      recurring: transaction.recurring,
    });

    revalidatePath("/transactions");

    return { success: true, message: "Transaction created successfully" };
  } catch {
    return { success: false, message: "Failed to create transaction" };
  }
};
