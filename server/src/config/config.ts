import dotenv from "dotenv";
import z from "zod";

dotenv.config();

const configSchema = z.object({
  PORT: z.number().readonly(),
  DATABASE_URL: z.string().readonly(),
  SUPABASE_URL: z.string().readonly(),
  SUPABASE_ANON_KEY: z.string().readonly(),
});

type Config = z.infer<typeof configSchema>;

const config: Config = configSchema.parse({
  ...process.env,
  PORT: Number(process.env.PORT),
});

export default config;
