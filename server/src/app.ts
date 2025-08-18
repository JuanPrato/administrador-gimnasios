import express, { type Express } from "express";
import cors from "cors";

import planRouter from "./routes/plans.route";
import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import config from "./config/config";
import { createClient } from "./lib/supabase";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(async (req, res, next) => {
  const client = createClient(req, res);

  const user = await client.auth.getUser();

  if (user.error) {
    res.json(user.error);
    return;
  }
  if (!user.data) {
    res.status(301);
    res.json();
    return;
  }
  next();
});

app.use("/plans", planRouter);

export default app;
