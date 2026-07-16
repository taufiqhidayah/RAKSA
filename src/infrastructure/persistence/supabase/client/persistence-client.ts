import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "./admin-client";

/**
 * Server-side DB client — prefers service role to bypass RLS for trusted server operations.
 * Falls back to the session client when service role is unavailable.
 */
export function resolvePersistenceClient(sessionClient: SupabaseClient): SupabaseClient {
  try {
    return createSupabaseAdminClient();
  } catch {
    return sessionClient;
  }
}
