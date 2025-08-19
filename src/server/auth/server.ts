import { env } from "~/env";
import { createServerClient as createSupServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Session } from "@supabase/supabase-js";
import { db } from "../db";
import { profiles as profilesTable, roles as rolesTable } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createServerClient() {
  const cookieStore = await cookies();
  return createSupServerClient(
    env.SUPABASE_URL as string,
    env.SUPABASE_SERVICE_ROLE_KEY as string,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}

export const auth = async () => {
  const supabase = await createServerClient();

  return supabase.auth.getSession();
};

export const getCurrentProfile = async (session: Session) => {
  const user = session.user;

  const [result] = await db
    .select()
    .from(profilesTable)
    .innerJoin(rolesTable, eq(rolesTable.id, profilesTable.role))
    .where(eq(profilesTable.userId, user.id))
    .limit(1);

  if (!result) return null;

  return { ...result.profiles, role: result.roles.description };
};

export type Profile = NonNullable<
  Awaited<ReturnType<typeof getCurrentProfile>>
>;
