import { Handler } from "express";
import { plans as plansTable } from "../db/schema";
import { db } from "../db/db";

export const getPlans: Handler = async (req, res, next) => {
  const plans = await db.select().from(plansTable);

  console.log(plans);

  res.json(plans);
};
