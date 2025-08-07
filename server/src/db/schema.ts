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
} from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: bigint("id", { mode: "number" }).notNull().primaryKey().unique(),
  description: varchar("description").notNull(),
});

export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  name: varchar("name").notNull().unique(),
  price: real("price").notNull(),
  color: varchar("color").default("#000"),
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
  email: varchar("email"),
  role: integer("role").references(() => roles.id),
});
