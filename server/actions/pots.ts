"use server";

import { auth } from "@/lib/auth";
import { PotsFormSchema, potsSchema } from "@/lib/validations";
import { headers } from "next/headers";
import { db } from "../db/drizzle";
import { and, eq } from "drizzle-orm";
import { potsTable } from "../db/schema";
import { revalidatePath, unstable_cache } from "next/cache";
import { getBalance, updateBalance } from "./balance";

export interface Pot {
  id: number;
  name: string;
  target: number;
  theme: string;
  totalSaved: number;
}

const getCachedPots = unstable_cache(
  async (userId: string) => {
    return await db
      .select()
      .from(potsTable)
      .where(eq(potsTable.userId, userId));
  },
  ["pots"],
  {
    revalidate: 3600, // for 1 hour in seconds
    tags: ["pots"],
  }
);

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
    const pots = await getCachedPots(session.session.userId);

    return { success: true, pots };
  } catch {
    return { success: false, message: "Failed to fetch pots" };
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

export const addMoney = async ({
  potId,
  amount,
}: {
  potId: number;
  amount: number;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const pot = await db
      .select()
      .from(potsTable)
      .where(
        and(
          eq(potsTable.id, potId),
          eq(potsTable.userId, session.session.userId)
        )
      );

    if (pot.length === 0) {
      return { success: false, message: "Pot not found" };
    }

    const balanceData = await getBalance();

    if (!balanceData.success) {
      throw new Error("Failed to fetch balance");
    }

    if (balanceData.balance?.amount < amount) {
      return { success: false, message: "Insufficient balance" };
    }

    const updatedTotal = pot[0].totalSaved + amount;

    await db
      .update(potsTable)
      .set({ totalSaved: updatedTotal })
      .where(eq(potsTable.id, potId));

    await updateBalance({ amount: amount * -1 });

    revalidatePath("/pots");

    return { success: true, message: "Money added successfully" };
  } catch {
    return { success: false, message: "Failed to add money" };
  }
};

export const withdrawMoney = async ({
  potId,
  amount,
}: {
  potId: number;
  amount: number;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const pot = await db
      .select()
      .from(potsTable)
      .where(
        and(
          eq(potsTable.id, potId),
          eq(potsTable.userId, session.session.userId)
        )
      );

    if (pot.length === 0) {
      return { success: false, message: "Pot not found" };
    }

    if (pot[0].totalSaved < amount) {
      return { success: false, message: "Insufficient balance" };
    }

    const updatedTotal = pot[0].totalSaved - amount;

    const [potsData, isUpdated] = await Promise.all([
      db
        .update(potsTable)
        .set({ totalSaved: updatedTotal })
        .where(eq(potsTable.id, potId)),
      updateBalance({ amount }),
    ]);

    if (!isUpdated.success) {
      throw new Error("Failed to update balance");
    }

    revalidatePath("/pots");

    return { success: true, message: "Money withdrawn successfully" };
  } catch {
    return { success: false, message: "Failed to withdraw money" };
  }
};
