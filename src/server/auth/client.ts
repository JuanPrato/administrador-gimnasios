import { createBrowserClient as createSupBrowserClient } from "@supabase/ssr";
import { env } from "~/env";

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON;

export function createBrowserClient() {
  return createSupBrowserClient(supabaseUrl, supabaseKey);
}

export async function login(email: string, password: string) {
  const sup = createBrowserClient();

  return sup.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  const sup = createBrowserClient();

  return sup.auth.signOut();
}
