import { Router } from "express";
import { getClientsPerPlan, getPlans } from "../controllers/plans.controller";

const router: Router = Router();

router.get("/", getPlans);
router.get("/stats", getClientsPerPlan);

export default router;
