/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `gym-manager_${name}`);

import {
  pgTable,
  serial,
  timestamp,
  varchar,
  real,
  smallint,
  bigint,
  uuid,
  integer,
  pgTableCreator,
  boolean,
} from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: bigint("id", { mode: "number" }).notNull().primaryKey().unique(),
  description: varchar("description").notNull(),
});

export const gyms = pgTable("gyms", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }),
  name: varchar("name").notNull(),
});

export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  name: varchar("name").notNull().unique(),
  price: real("price").notNull(),
  color: varchar("color").default("#000"),
  gym: integer("gym").references(() => gyms.id),
});

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  age: smallint("age"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  objective: varchar("objective"),
  plan: integer("plan").references(() => plans.id),
  userId: uuid("user_id").notNull().unique(),
  name: varchar("name").notNull(),
  surname: varchar("surname").notNull(),
  role: integer("role").references(() => roles.id),
  gym: integer("gym")
    .references(() => gyms.id)
    .notNull(),
  active: boolean("active").notNull(),
  dni: varchar("dni").notNull(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  payAt: timestamp("pay_at", { withTimezone: true }).notNull().defaultNow(),
  plan: integer("plan")
    .references(() => plans.id)
    .notNull(),
  total: real("total").notNull().default(0),
  profile: integer("profile")
    .references(() => profiles.id)
    .notNull(),
});

export const entries = pgTable("entries", {
  id: serial("id").primaryKey(),
  profile: integer("profile")
    .references(() => profiles.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
