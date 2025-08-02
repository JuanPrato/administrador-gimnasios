import { createClient, type Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export function useRedirectIfSession(url: string, has: boolean = true) {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!!data.session === has) {
        navigate(url);
        return;
      }
    });
  }, []);
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return session;
}

export function useLogin() {
  return async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  };
}

export function useLogout() {
  return () => supabase.auth.signOut();
}
