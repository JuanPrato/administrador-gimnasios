import { Router } from "express";
import { getPlans } from "../controllers/plans.controller";

const router: Router = Router();

router.get("/", getPlans);

export default router;
