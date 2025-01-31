import {
  integer,
  pgTable,
  date,
  varchar,
  boolean,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const transactionsTable = pgTable("transactions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text("userId").references(() => user.id),
  name: varchar({ length: 30 }).notNull(),
  date: date().notNull(),
  category: varchar({ length: 255 }).notNull(),
  amount: integer().notNull(),
  recurring: boolean().notNull(),
  isIncome: boolean().notNull().default(false),
});

export const budgetsTable = pgTable("budgets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text("userId").references(() => user.id),
  category: varchar({ length: 255 }).notNull(),
  maxSpend: integer().notNull(),
  theme: varchar({ length: 255 }).notNull(),
});

export const potsTable = pgTable("pots", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text("userId").references(() => user.id),
  name: varchar({ length: 30 }).notNull(),
  target: integer().notNull(),
  theme: varchar({ length: 255 }).notNull(),
  totalSaved: integer().notNull().default(0),
});

export const balanceTable = pgTable("balance", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text("userId").references(() => user.id),
  amount: integer().notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

// better-auth schema

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});
