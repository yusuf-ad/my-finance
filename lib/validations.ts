import { z } from "zod";

export const Categories = [
  "Entertainment",
  "Bills",
  "Groceries",
  "DiningOut",
  "Transportation",
  "PersonalCare",
  "Education",
  "Lifestyle",
  "Shopping",
  "General",
] as const;

export const newTransactionSchema = z.object({
  name: z.string().min(1, { message: "Required" }).max(30),
  amount: z.number().min(1, { message: "Required" }),
  category: z.string().min(1, { message: "Required" }),
  date: z.date(),
  recurring: z.boolean(),
});

export type NewTransactionFormSchema = z.infer<typeof newTransactionSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;
