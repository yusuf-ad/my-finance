"use server";

// ===== Imports =====
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { transactionsTable } from "../db/schema";
import { db } from "../db/drizzle";
import { and, asc, desc, eq, ilike } from "drizzle-orm";
import { Transaction } from "./transaction";
import { unstable_cache } from "next/cache";

// ===== Cache Functions =====
const getCachedBills = unstable_cache(
  async ({
    userId,
    page,
    pageSize,
    getBy,
    sortBy,
  }: {
    userId: string;
    page: number;
    pageSize: number;
    getBy?: string;
    sortBy?: string;
    filterBy?: string;
  }) => {
    const getOrderBy = () => {
      switch (sortBy) {
        case "Oldest":
          return asc(transactionsTable.date);
        case "Latest":
          return desc(transactionsTable.date);

        case "A to Z":
          return asc(transactionsTable.name);
        case "Z to A":
          return desc(transactionsTable.name);

        case "Highest":
          return desc(transactionsTable.amount);
        case "Lowest":
          return asc(transactionsTable.amount);

        default:
          return asc(transactionsTable.id);
      }
    };

    return await db
      .select()
      .from(transactionsTable)
      .orderBy(getOrderBy())
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

export const getCachedTotalPages = unstable_cache(
  async ({ userId, getBy }: { userId: string; getBy?: string }) => {
    return await db.$count(
      transactionsTable,
      and(
        eq(transactionsTable.userId, userId),
        eq(transactionsTable.recurring, true),
        getBy ? ilike(transactionsTable.name, `%${getBy}%`) : undefined
      )
    );
  }
);

export const getTotalBillsPage = async ({
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
    const totalRows = await getCachedTotalPages({
      userId: session.session.userId,
      getBy,
    });

    return Math.ceil(totalRows / pageSize);
  } catch {
    return 0;
  }
};

// ===== Read Operations =====
export const getRecurringBills = async ({
  page = 1,
  pageSize = 10,
  getBy,
  sortBy,
}: {
  page?: number;
  pageSize?: number;
  getBy?: string;
  sortBy?: string;
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
    const bills = await getCachedBills({
      page,
      pageSize,
      userId: session.session.userId,
      getBy,
      sortBy,
    });

    const formattedBills = bills.map((bill) => ({
      ...bill,
      date: new Date(bill.date),
    }));

    return { success: true, bills: formattedBills };
  } catch {
    return { success: false, message: "Failed to fetch bills" };
  }
};
