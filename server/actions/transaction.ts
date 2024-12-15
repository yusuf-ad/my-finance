"use server";

import { db } from "@/server/db/drizzle";
import { transactionsTable } from "../db/schema";

export interface Transaction {
  id: number;
  name: string;
  date: Date;
  category: string;
  amount: number;
  recurring: boolean;
}

export const getTransactions = async (): Promise<Transaction[]> => {
  const transactions = await db.select().from(transactionsTable);

  const formattedTransactions = transactions.map((transaction) => ({
    ...transaction,
    date: new Date(transaction.date),
  }));

  return formattedTransactions;
};
