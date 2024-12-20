"use server";

import { db } from "@/server/db/drizzle";
import { transactionsTable } from "../db/schema";
import { revalidatePath } from "next/cache";
import { newTransactionSchema } from "@/lib/validations";
import { asc, count, ilike } from "drizzle-orm";

export interface Transaction {
  id: number;
  name: string;
  date: Date;
  category: string;
  amount: number;
  recurring: boolean;
}

export type NewTransaction = Omit<Transaction, "id">;

export const getTransactions = async ({
  page = 1,
  pageSize = 10,
  getBy,
}: { page?: number; pageSize?: number; getBy?: string } = {}): Promise<{
  transactions: Transaction[];
  totalPages: number;
}> => {
  const totalRowsResult = await db
    .select({ count: count(transactionsTable.id) })
    .from(transactionsTable)
    .where(getBy ? ilike(transactionsTable.name, `%${getBy}%`) : undefined);

  const totalRows = totalRowsResult[0].count;

  const totalPages = Math.ceil(totalRows / pageSize);

  const transactions = await db
    .select()
    .from(transactionsTable)
    .orderBy(asc(transactionsTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .where(getBy ? ilike(transactionsTable.name, `%${getBy}%`) : undefined);

  const formattedTransactions = transactions.map((transaction) => ({
    ...transaction,
    date: new Date(transaction.date),
  }));

  return { transactions: formattedTransactions, totalPages };
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
