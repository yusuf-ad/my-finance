"use server";

import { z } from "zod";

const budgetSchema = z.object({
  category: z.string().min(1, { message: "Required" }).max(50),
  maximumSpend: z
    .number()
    .min(0, { message: "Must be a positive number" })
    .max(1000000),
  theme: z.string().min(1, { message: "Required" }).max(75),
});
