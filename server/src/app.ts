import express, { type Express } from "express";
import cors from "cors";

import planRouter from "./routes/plans.route";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/plans", planRouter);

export default app;
