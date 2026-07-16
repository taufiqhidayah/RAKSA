import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
});

const serverEnvSchema = clientEnvSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  // Authorization for the admin area — the single superadmin's auth.users id (uuid).
  SUPERADMIN_USER_ID: z.string().uuid().optional(),
  // Display name shown in the admin UI (optional; falls back to deriving from email).
  SUPERADMIN_DISPLAY_NAME: z.string().optional(),
});

function loadEnv() {
  const isBuildOrDev =
    process.env.NODE_ENV !== "production" ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL;

  const parsed = serverEnvSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      "placeholder-anon-key",
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPERADMIN_USER_ID: process.env.SUPERADMIN_USER_ID,
    SUPERADMIN_DISPLAY_NAME: process.env.SUPERADMIN_DISPLAY_NAME,
  });

  if (!parsed.success && !isBuildOrDev) {
    const missing = parsed.error.issues.map((i) => i.path.join(".")).join(", ");
    throw new Error(`Missing or invalid environment variables: ${missing}`);
  }

  return (
    parsed.success
      ? parsed.data
      : {
          NEXT_PUBLIC_SUPABASE_URL: "https://placeholder.supabase.co",
          NEXT_PUBLIC_SUPABASE_ANON_KEY: "placeholder-anon-key",
          NEXT_PUBLIC_APP_URL: "http://localhost:3000",
          SUPABASE_SERVICE_ROLE_KEY: undefined,
          SUPERADMIN_USER_ID: undefined,
          SUPERADMIN_DISPLAY_NAME: undefined,
        }
  );
}

export const env = loadEnv();

export type AppEnv = z.infer<typeof serverEnvSchema>;
