import { useEffect, useState } from "react";
import { createBrowserClient } from "~/server/auth/client";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const supabase = createBrowserClient();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      const session = await supabase.auth.getSession();
      setUser(session.data.session?.user ?? undefined);
    })().catch(console.error);
  }, []);

  return user;
}
