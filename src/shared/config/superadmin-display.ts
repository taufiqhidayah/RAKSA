import { env } from "./env";

/**
 * Resolves the superadmin display name shown in the admin UI.
 * Uses SUPERADMIN_DISPLAY_NAME when set, otherwise derives a
 * title-cased name from the local part of the email address.
 */
export function superadminDisplayName(email: string): string {
  const configured = env.SUPERADMIN_DISPLAY_NAME?.trim();
  if (configured) return configured;

  const raw = email.split("@")[0]?.replace(/[._-]+/g, " ") ?? "";
  return (
    raw
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") || "Admin"
  );
}
