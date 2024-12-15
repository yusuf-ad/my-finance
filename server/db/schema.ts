import { integer, pgTable, date, varchar, boolean } from "drizzle-orm/pg-core";

export const transactionsTable = pgTable("transactions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 30 }).notNull(),
  date: date().notNull(),
  category: varchar({ length: 255 }).notNull(),
  amount: integer().notNull(),
  recurring: boolean().notNull(),
});
