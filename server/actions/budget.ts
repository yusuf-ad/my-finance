"use server";

// ===== Imports =====
import { auth } from "@/lib/auth";
import { BudgetFormSchema, budgetSchema } from "@/lib/validations";
import { headers } from "next/headers";
import { db } from "../db/drizzle";
import { budgetsTable } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath, unstable_cache } from "next/cache";

// ===== Types =====
export interface Budget {
  id: number;
  category: string;
  maxSpend: number;
  theme: string;
}

// ===== Cache Functions =====
const getCachedBudgets = unstable_cache(
  async (userId: string) => {
    return await db
      .select()
      .from(budgetsTable)
      .where(eq(budgetsTable.userId, userId));
  },
  ["budgets"],
  {
    revalidate: 3600, // 1 hour cache
    tags: ["budgets"],
  }
);

// ===== Read Operations =====
export const getBudgets = async (): Promise<
  { success: true; budgets: Budget[] } | { success: false; message: string }
> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const budgets = await getCachedBudgets(session.session.userId);
    return { success: true, budgets };
  } catch {
    return { success: false, message: "Failed to fetch budgets" };
  }
};

// ===== Write Operations =====
export const createBudget = async (newBudget: BudgetFormSchema) => {
  const isValid = budgetSchema.safeParse(newBudget);

  if (!isValid.success) {
    return { success: false, message: "Invalid data" };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const themeExists = await db
      .select()
      .from(budgetsTable)
      .where(
        and(
          eq(budgetsTable.theme, newBudget.theme),
          eq(budgetsTable.userId, session.session.userId)
        )
      );

    if (themeExists.length > 0) {
      return { success: false, message: "Theme already exists" };
    }

    await db.insert(budgetsTable).values({
      category: newBudget.category,
      maxSpend: newBudget.maxSpend,
      theme: newBudget.theme,
      userId: session.session.userId,
    });

    revalidatePath("/budgets");

    return { success: true, message: "Budget created successfully" };
  } catch {
    return { success: false, message: "Failed to create budget" };
  }
};
