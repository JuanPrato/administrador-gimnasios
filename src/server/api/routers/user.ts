import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createServerClient, getCurrentProfile } from "~/server/auth/server";
import { entries, payments, plans, profiles } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq, and, desc, like, or } from "drizzle-orm";

const createNewUserSchema = z.object({
  name: z.string().nonempty(),
  surname: z.string().nonempty(),
  email: z.string().email(),
  phone: z.optional(
    z.string().regex(/^\d+$/, "String must contain only digits."),
  ),
  dni: z.string(),
  plan: z.number(),
  observations: z.string().optional(),
});

const filterSchema = z.object({
  search: z.string().min(2).max(100).optional().or(z.literal("")),
  status: z.enum(["todos", "activo", "inactivo"]).default("todos"),
  plan: z.string().default("todos"),
});

export const userRouter = createTRPCRouter({
  createNewUser: protectedProcedure
    .input(createNewUserSchema)
    .mutation(async ({ ctx, input }) => {
      const profile = await getCurrentProfile(ctx.session.data.session!);

      if (!profile || profile.role !== "ADMIN") return;

      const supabase = await createServerClient();

      const userRes = await supabase.auth.signUp({
        email: input.email,
        password: `${input.dni}`,
        phone: input.phone ?? undefined,
      });

      if (userRes.error || !userRes.data.user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: userRes.error?.message,
        });
      }

      await ctx.db.insert(profiles).values({
        role: 2,
        gym: profile?.gym,
        userId: userRes.data.user.id,
        plan: input.plan,
        objective: input.observations,
        name: input.name,
        surname: input.surname,
        active: true,
        dni: input.dni,
        email: input.email,
      });
    }),
  getClientUsers: protectedProcedure
    .input(filterSchema)
    .query(async ({ ctx, input }) => {
      const profile = await getCurrentProfile(ctx.session.data.session!);

      if (!profile) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid user" });
      }

      const queryConditions = [];

      if (input.search) {
        queryConditions.push(
          or(
            like(profiles.name, `%${input.search}%`),
            like(profiles.surname, `%${input.search}%`),
            like(profiles.dni, `%${input.search}%`),
          ),
        );
      }

      if (input.status && input.status !== "todos") {
        queryConditions.push(eq(profiles.active, input.status === "activo"));
      }

      if (input.plan && input.plan !== "todos") {
        queryConditions.push(eq(profiles.plan, Number(input.plan)));
      }

      const clients = await ctx.db
        .selectDistinctOn([profiles.createdAt])
        .from(profiles)
        .innerJoin(plans, eq(plans.id, profiles.plan))
        .leftJoin(payments, eq(payments.profile, profiles.id))
        .where(
          and(
            eq(profiles.gym, profile.gym),
            eq(profiles.role, 2),
            ...queryConditions,
          ),
        )
        .orderBy(desc(profiles.createdAt));

      return clients;
    }),
  getUserByDni: protectedProcedure
    .input(z.object({ dni: z.string().nonempty() }))
    .query(async ({ ctx, input }) => {
      const profile = await getCurrentProfile(ctx.session.data.session!);

      if (!profile) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid user" });
      }

      const [user] = await ctx.db
        .select()
        .from(profiles)
        .innerJoin(plans, eq(plans.id, profiles.plan))
        .where(
          and(
            eq(profiles.gym, profile.gym),
            eq(profiles.role, 2),
            eq(profiles.dni, input.dni),
          ),
        )
        .limit(1);

      return user;
    }),
  getUserMovements: protectedProcedure
    .input(z.object({ profileId: z.number() }))
    .query(async ({ ctx, input }) => {
      const profile = await getCurrentProfile(ctx.session.data.session!);

      if (!profile) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid user" });
      }

      const paymentsList = await ctx.db
        .select()
        .from(payments)
        .where(and(eq(payments.profile, input.profileId)))
        .orderBy(desc(payments.payAt));

      const entriesList = await ctx.db
        .select()
        .from(entries)
        .where(and(eq(entries.profile, input.profileId)))
        .orderBy(desc(entries.createdAt));

      return {
        payments: paymentsList,
        entries: entriesList,
      };
    }),
});
