import dotenv from "dotenv";
import path from "node:path";
import { z } from "zod";

dotenv.config();

const booleanFromEnv = z.preprocess((value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }

  return false;
}, z.boolean());

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  FRONTEND_BASE_URL: z.string().url().default("http://localhost:3000"),
  ALLOWED_ORIGINS: z.string().default("http://localhost:3000"),
  LEAD_DB_PATH: z.string().default("./storage/leads.sqlite"),
  LEAD_SEQUENCE_DELAY_MINUTES: z.coerce.number().int().nonnegative().default(1440),
  EMAIL_PROVIDER: z.enum(["console", "smtp", "resend"]).default("console"),
  EMAIL_FROM: z.string().default("Igor Bifano <contato@igorbifano.com>"),
  RESEND_API_KEY: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_SECURE: booleanFromEnv.default(false),
  ADMIN_API_KEY: z.string().optional()
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  ...parsedEnv,
  databasePath: path.resolve(process.cwd(), parsedEnv.LEAD_DB_PATH),
  allowedOrigins: parsedEnv.ALLOWED_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
};
