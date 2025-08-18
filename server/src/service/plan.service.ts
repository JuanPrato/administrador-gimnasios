import { plans as plansTable, profiles as clientTable } from "../db/schema";
import { db } from "../db/db";
import { count, eq } from "drizzle-orm";

export const getAllPlans = async () => {
  const res = await db
    .select({
      id: plansTable.id,
      name: plansTable.name,
      price: plansTable.price,
      color: plansTable.color,
    })
    .from(plansTable);

  return res.map((r) => ({ ...r, id: Number(r.id) }));
};

export const getClientsPerPlan = async () => {
  const results = await db
    .select({ count: count(), plan: clientTable.plan })
    .from(clientTable)
    .where(eq(clientTable.role, 2))
    .groupBy(clientTable.plan);

  return results.filter((r) => Boolean(r.plan));
};
