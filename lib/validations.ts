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

export const NewTransactionFormSchema = z.object({
  name: z.string().min(1, { message: "Required" }).max(30),
  amount: z.number().min(1, { message: "Required" }),
  category: z.string().min(1, { message: "Required" }),
  date: z.date(),
  recurring: z.boolean(),
});
