import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createServerClient, getCurrentProfile } from "~/server/auth/server";
import { profiles } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";

const createNewUserSchema = z.object({
  name: z.string().nonempty(),
  surname: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().regex(/^\d+$/, "String must contain only digits."),
  dni: z.string(),
  plan: z.number(),
  observations: z.string().nullable(),
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
        password: "Prueba01",
        phone: input.phone,
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
      });
    }),
});
