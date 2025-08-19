import { db } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { entries, payments, plans, profiles } from "~/server/db/schema";
import { and, count, eq, gte, sql, sum, desc } from "drizzle-orm";
import dayjs from "dayjs";

export const gymRouter = createTRPCRouter({
  getLastMonthAccess: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.data.session?.user.id;

    if (!userId) return;

    const [profile] = await ctx.db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .limit(1);

    if (!profile || profile.role !== 1) return;

    const stats = await ctx.db
      .select({
        date: sql<Date>`DATE(${entries.createdAt})`.as("date"),
        count: count(),
      })
      .from(entries)
      .innerJoin(profiles, eq(entries.profile, profiles.id))
      .where(eq(profiles.gym, profile.gym))
      .groupBy((al) => al.date);

    return stats;
  }),
});

export async function getGeneralGymStats(gymId: number) {
  const [actives] = await db
    .select({ count: count() })
    .from(profiles)
    .where(
      and(
        eq(profiles.gym, gymId),
        eq(profiles.active, true),
        eq(profiles.role, 2),
      ),
    );

  const startMonth = dayjs().startOf("month");

  const [news] = await db
    .select({ count: count() })
    .from(profiles)
    .where(
      and(gte(profiles.createdAt, startMonth.toDate()), eq(profiles.role, 2)),
    );

  const [revenue] = await db
    .select({ sum: sum(payments.total) })
    .from(payments)
    .where(gte(payments.payAt, startMonth.toDate()));

  const [entriesCount] = await db
    .select({ count: count() })
    .from(entries)
    .where(gte(entries.createdAt, startMonth.toDate()));

  return {
    activeMembers: actives?.count ?? 0,
    newClientsThisMonth: news?.count ?? 0,
    monthlyRevenue: (revenue?.sum ?? 0) as number,
    monthlyAccess: entriesCount?.count ?? 0,
  };
}

export async function getLastPayments(gymId: number, q?: number) {
  const result = await db
    .select()
    .from(payments)
    .innerJoin(profiles, eq(profiles.id, payments.profile))
    .innerJoin(plans, eq(plans.id, payments.plan))
    .where(and(eq(profiles.gym, gymId)))
    .orderBy(desc(payments.payAt))
    .limit(q ?? 10);

  return result.map((r) => ({
    id: r.payments.id,
    name: `${r.profiles.name} ${r.profiles.surname}`,
    date: dayjs(r.payments.payAt).format("DD/MM/YYYY"),
    plan: r.plans,
    total: r.payments.total,
  }));
}
