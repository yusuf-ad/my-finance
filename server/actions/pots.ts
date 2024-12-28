"use server";

import { auth } from "@/lib/auth";
import { PotsFormSchema, potsSchema } from "@/lib/validations";
import { headers } from "next/headers";
import { db } from "../db/drizzle";
import { and, eq } from "drizzle-orm";
import { potsTable } from "../db/schema";
import { revalidatePath } from "next/cache";

export interface Pot {
  id: number;
  name: string;
  target: number;
  theme: string;
  totalSaved: number;
}

export const getPots = async (): Promise<
  { success: true; pots: Pot[] } | { success: false; message: string }
> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const pots = await db
      .select()
      .from(potsTable)
      .where(eq(potsTable.userId, session.session.userId));

    return { success: true, pots };
  } catch {
    return { success: false, message: "Failed to fetch budgets" };
  }
};

export const createPot = async (newPot: PotsFormSchema) => {
  const isValid = potsSchema.safeParse(newPot);

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
      .from(potsTable)
      .where(
        and(
          eq(potsTable.theme, newPot.theme),
          eq(potsTable.userId, session.session.userId)
        )
      );

    if (themeExists.length > 0) {
      return { success: false, message: "Theme already exists" };
    }

    await db.insert(potsTable).values({
      name: newPot.name,
      target: newPot.target,
      theme: newPot.theme,
      userId: session.session.userId,
      totalSaved: 0,
    });

    revalidatePath("/pots");

    return { success: true, message: "Pot created successfully" };
  } catch {
    return { success: false, message: "Failed to create pot" };
  }
};
