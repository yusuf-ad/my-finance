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
];

export const newTransactionSchema = z.object({
  name: z.string().min(2, { message: "Required" }).max(30),
  amount: z.number().min(1, { message: "Required" }).max(1000000),
  category: z.string().min(2, { message: "Required" }).max(50),
  date: z.date(),
  recurring: z.boolean(),
  isIncome: z.boolean(),
});

export type NewTransactionFormSchema = z.infer<typeof newTransactionSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: z.string().min(2, { message: "Required" }).max(30),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type SignupFormSchema = z.infer<typeof signupSchema>;

export const Themes = [
  "green#10B981",
  "yellow#F59E0B",
  "cyan#06B6D4",
  "navy#1E3A8A",
  "red#EF4444",
  "purple#8B5CF6",
  "turquoise#14B8A6",
  "brown#A16207",
  "magenta#D946EF",
  "blue#3B82F6",
  "grey#6B7280",
  "army#4B5563",
  "pink#EC4899",
  "yellowgreen#A3E635",
  "orange#F97316",
];

export const budgetSchema = z.object({
  category: z.string().min(2, { message: "Required" }).max(50),
  maxSpend: z.number().min(1, { message: "Required" }).max(1000000),
  theme: z.string().min(1, { message: "Required" }).max(75),
});

export type BudgetFormSchema = z.infer<typeof budgetSchema>;

export const potsSchema = z.object({
  name: z.string().min(2, { message: "Required" }).max(30),
  target: z.number().min(1, { message: "Required" }).max(1000000),
  theme: z.string().min(1, { message: "Required" }).max(75),
  totalSaved: z.number().min(0).max(1000000),
});

export type PotsFormSchema = z.infer<typeof potsSchema>;

export const addMoneySchema = z.object({
  amount: z.number().min(1),
});

export type AddMoneyFormSchema = z.infer<typeof addMoneySchema>;
