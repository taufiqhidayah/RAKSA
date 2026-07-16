import { env } from "@/shared/config/env";
import { ForbiddenError } from "@/core/domain/errors/domain-errors";

/**
 * Authorization for the admin area.
 *
 * The superadmin is defined by SUPERADMIN_USER_ID in the server environment,
 * NOT by any database row. This makes privilege escalation via data impossible:
 * even if someone can write to `profiles`, they cannot make themselves admin.
 */
export function isSuperadmin(userId: string | null | undefined): boolean {
  const configured = env.SUPERADMIN_USER_ID;
  if (!configured || !userId) {
    return false;
  }
  return userId === configured;
}

/** Throws ForbiddenError when the given user id is not the configured superadmin. */
export function assertSuperadmin(userId: string | null | undefined): void {
  if (!isSuperadmin(userId)) {
    throw new ForbiddenError("Akses ditolak: khusus superadmin");
  }
}
