import { create } from "zustand";

interface Plan {
  id: number;
  name: string;
  price: number;
  color: string;
}

interface PlanStore {
  plans: Plan[];
}

const usePlansStore = create<PlanStore>()(() => ({
  plans: [],
}));

export function usePlans() {
  const { plans } = usePlansStore();

  function getClientsPerPlan() {}

  return { plans, getClientsPerPlan };
}
