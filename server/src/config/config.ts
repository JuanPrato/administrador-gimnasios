import dotenv from "dotenv";
import z from "zod";

dotenv.config();

const configSchema = z.object({
  PORT: z.number().readonly(),
});

type Config = z.infer<typeof configSchema>;

const config: Config = configSchema.parse({
  PORT: Number(process.env.PORT),
});

export default config;
