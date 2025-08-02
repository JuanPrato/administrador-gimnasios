import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
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
