import { Handler } from "express";

export const getPlans: Handler = (req, res, next) => {
  res.json(["plan1", "plan2", "plan3"]);
};
