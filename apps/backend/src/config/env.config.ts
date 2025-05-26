import { z } from "zod";

const envSchema = z.object({
  APPLICATION_PORT: z.coerce.number().default(3000),

  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_NAME: z.string(),
  DATABASE_HOST: z.string().default("localhost"),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_REPLICA_SET: z.string().optional(),

  CACHE_SERVICE_PORT: z.coerce.number().default(6379),
  CACHE_SERVICE_HOST: z.string().default("localhost"),
  CACHE_SERVICE_PASSWORD: z.string().optional(),
});

export const env = envSchema.parse(process.env);
