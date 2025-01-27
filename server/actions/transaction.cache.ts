import { unstable_cache } from "next/cache";
import { transactionsTable } from "../db/schema";
import { and, asc, desc, eq, ilike, inArray } from "drizzle-orm";
import { db } from "../db/drizzle";

export const getCachedTransactions = unstable_cache(
  async ({
    userId,
    page,
    pageSize,
    getBy,
    sortBy,
    filterBy,
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
          return desc(transactionsTable.date);
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
          getBy ? ilike(transactionsTable.name, `%${getBy}%`) : undefined,
          filterBy && filterBy !== "All"
            ? eq(transactionsTable.category, filterBy)
            : undefined
        )
      );
  },
  ["transactions"],
  {
    revalidate: 3600,
    tags: ["transactions"],
  }
);

export const getCachedSpendings = unstable_cache(
  async (userId: string, categories: string[]) => {
    const whereCondition =
      categories.length === 0
        ? and(
            eq(transactionsTable.userId, userId),
            eq(transactionsTable.isIncome, false)
          )
        : and(
            eq(transactionsTable.userId, userId),
            inArray(transactionsTable.category, categories),
            eq(transactionsTable.isIncome, false)
          );

    return await db.select().from(transactionsTable).where(whereCondition);
  },
  ["spendings"],
  {
    revalidate: 3600,
    tags: ["transactions", "spendings"],
  }
);

export const getCachedTotalPages = unstable_cache(
  async (userId: string, getBy?: string) => {
    return await db.$count(
      transactionsTable,
      and(
        eq(transactionsTable.userId, userId),
        getBy ? ilike(transactionsTable.name, `%${getBy}%`) : undefined
      )
    );
  },
  ["transactionCount"],
  {
    revalidate: 3600,
    tags: ["transactions"],
  }
);

export const getCachedLatestTransactions = unstable_cache(
  async (number: number, userId: string) => {
    return await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.userId, userId))
      .orderBy(desc(transactionsTable.id))
      .limit(number);
  },
  ["latestTransactions"],
  {
    revalidate: 3600,
    tags: ["transactions"],
  }
);
