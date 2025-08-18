import { useQuery } from "@tanstack/react-query";
import { getPlans, getPlansStats } from "./api";

export interface Plan {
  id: number;
  name: string;
  price: number;
  color: string;
}

export interface PlanStat {
  plan: number;
  count: number;
}

export function usePlans() {
  const { data: plans, error } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  const { data: stats, refetch: getStats } = useQuery({
    queryKey: ["planStat"],
    queryFn: getPlansStats,
    enabled: false,
  });

  if (error) console.error(error);

  async function getClientsPerPlan() {
    getStats();
  }

  return { plans, stats, getClientsPerPlan };
}
