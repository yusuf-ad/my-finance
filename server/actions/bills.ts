"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { transactionsTable } from "../db/schema";
import { db } from "../db/drizzle";
import { and, asc, eq, ilike } from "drizzle-orm";
import { Transaction } from "./transaction";
import { updateBalance } from "./balance";

export const getRecurringBills = async ({
  page = 1,
  pageSize = 10,
  getBy,
}: {
  page?: number;
  pageSize?: number;
  getBy?: string;
} = {}): Promise<
  | {
      success: true;
      bills: Transaction[];
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
    const bills = await db
      .select()
      .from(transactionsTable)
      .orderBy(asc(transactionsTable.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .where(
        and(
          eq(transactionsTable.userId, session.session.userId),
          eq(transactionsTable.recurring, true),
          getBy ? ilike(transactionsTable.name, `%${getBy}%`) : undefined
        )
      );

    const formattedBills = bills.map((transaction) => ({
      ...transaction,
      date: new Date(transaction.date),
    }));

    return {
      success: true,
      bills: formattedBills,
    };
  } catch {
    return {
      success: false,
      message: "Failed to fetch bills",
    };
  }
};

export const processRecurringBills = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const today = new Date();
    const bills = await db
      .select()
      .from(transactionsTable)
      .where(
        and(
          eq(transactionsTable.userId, session.session.userId),
          eq(transactionsTable.recurring, true)
        )
      );

    for (const bill of bills) {
      const billDate = new Date(bill.date);
      if (
        billDate.getDate() === today.getDate() &&
        billDate.getMonth() === today.getMonth()
      ) {
        await updateBalance({ amount: -bill.amount });
      }
    }

    return { success: true, message: "Recurring bills processed" };
  } catch {
    return {
      success: false,
      message: "Failed to process recurring bills",
    };
  }
};
