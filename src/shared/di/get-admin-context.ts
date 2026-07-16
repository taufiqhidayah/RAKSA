import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { resolvePersistenceClient } from "@/infrastructure/persistence/supabase/client/persistence-client";
import { SupabaseAuthService } from "@/infrastructure/auth/supabase-auth.service";
import { assertSuperadmin } from "@/infrastructure/auth/assert-superadmin";
import { AuthenticatedUser } from "@/core/application/ports/auth-service";
import { createAdminContainer, AdminContainer } from "./admin-container";

export interface AdminContext {
  user: AuthenticatedUser;
  admin: AdminContainer;
}

/**
 * Server-only: resolves the authenticated user, enforces superadmin
 * authorization, and wires the admin container with a service-role client.
 * Throws ForbiddenError when the caller is not the configured superadmin.
 */
export async function getAdminContext(): Promise<AdminContext> {
  const supabase = await createSupabaseServerClient();
  const authService = new SupabaseAuthService(supabase);

  const user = await authService.getCurrentUser();
  assertSuperadmin(user?.id);

  const db = resolvePersistenceClient(supabase);
  const admin = createAdminContainer(db);

  return { user: user as AuthenticatedUser, admin };
}
