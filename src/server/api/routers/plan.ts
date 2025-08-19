import {
  plans as plansTable,
  profiles as profilesTable,
} from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { count, eq } from "drizzle-orm";

export const planRouter = createTRPCRouter({
  getPlans: protectedProcedure.query(async ({ ctx }) => {
    const plans = await ctx.db
      .select({
        id: plansTable.id,
        name: plansTable.name,
        price: plansTable.price,
        color: plansTable.color,
        people: count(profilesTable.id),
      })
      .from(plansTable)
      .innerJoin(profilesTable, eq(plansTable.id, profilesTable.plan))
      .groupBy(plansTable.id);

    return plans;
  }),
});
