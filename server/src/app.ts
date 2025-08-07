import express, { type Express } from "express";

import planRouter from "./routes/plans.route";

const app: Express = express();

app.use(express.json());

app.use("/plans", planRouter);

export default app;
