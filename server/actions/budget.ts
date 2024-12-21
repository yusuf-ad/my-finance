"use server";

import { BudgetFormSchema } from "@/lib/validations";

export const createBudget = async (newBudget: BudgetFormSchema) => {
  console.log(newBudget);
};
