import { Handler } from "express";
import {
  getAllPlans,
  getClientsPerPlan as getClientsPerPlanFromService,
} from "../service/plan.service";

export const getPlans: Handler = async (req, res, next) => {
  const plans = await getAllPlans();

  res.json(plans);
};

export const getClientsPerPlan: Handler = async (req, res) => {
  const count = await getClientsPerPlanFromService();

  res.json(count);
};
