"use server";

import { auth } from "@/lib/auth";
import { BudgetFormSchema, budgetSchema } from "@/lib/validations";
import { headers } from "next/headers";
import { db } from "../db/drizzle";
import { budgetsTable } from "../db/schema";
import { and, eq } from "drizzle-orm";

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

    return { success: true, message: "Budget created successfully" };
  } catch {
    return { success: false, message: "Failed to create budget" };
  }
};
