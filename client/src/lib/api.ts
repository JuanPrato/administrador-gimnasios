import { SERVER_HOST, SERVER_ROUTES } from "./const";
import type { Plan, PlanStat } from "./plans";
import { supabase } from "./supabase";

async function base(method: string, route: string) {
  const jwt = (await supabase.auth.getSession()).data.session?.access_token;
  console.log(jwt);
  const result = await fetch(`${SERVER_HOST}${route}`, {
    method,
    headers: { "Content-Type": "application/json" },
  });

  if (!result.ok) {
    throw new Error("Error fetching with status " + result.status);
  }

  return result.json();
}

export async function getPlans(): Promise<Plan[]> {
  return base("GET", SERVER_ROUTES.PLAN.LIST);
}

export async function getPlansStats(): Promise<PlanStat[]> {
  return base("GET", SERVER_ROUTES.PLAN.STATS);
}
