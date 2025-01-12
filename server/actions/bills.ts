"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { transactionsTable } from "../db/schema";
import { db } from "../db/drizzle";
import { and, asc, eq, ilike } from "drizzle-orm";
import { Transaction } from "./transaction";
import { unstable_cache } from "next/cache";

const getCachedBills = unstable_cache(
  async (userId: string, page: number, pageSize: number, getBy?: string) => {
    return await db
      .select()
      .from(transactionsTable)
      .orderBy(asc(transactionsTable.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .where(
        and(
          eq(transactionsTable.userId, userId),
          eq(transactionsTable.recurring, true),
          getBy ? ilike(transactionsTable.name, `%${getBy}%`) : undefined
        )
      );
  },
  ["bills"],
  {
    revalidate: 3600,
    tags: ["bills", "transactions"],
  }
);

export const getRecurringBills = async ({
  page = 1,
  pageSize = 10,
  getBy,
}: {
  page?: number;
  pageSize?: number;
  getBy?: string;
} = {}): Promise<
  { success: true; bills: Transaction[] } | { success: false; message: string }
> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const bills = await getCachedBills(
      session.session.userId,
      page,
      pageSize,
      getBy
    );

    const formattedBills = bills.map((bill) => ({
      ...bill,
      date: new Date(bill.date),
    }));

    return { success: true, bills: formattedBills };
  } catch {
    return { success: false, message: "Failed to fetch bills" };
  }
};
