"use server";

import { db } from "@/server/db/drizzle";
import { transactionsTable } from "../db/schema";

export const getTransactions = async () => {
  const transactions = await db.select().from(transactionsTable);

  return transactions;
};
