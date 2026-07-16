import type { SupabaseClient } from "@supabase/supabase-js";
import { AuthService, AuthenticatedUser } from "@/core/application/ports/auth-service";

export class SupabaseAuthService implements AuthService {
  constructor(private readonly client: SupabaseClient) {}

  async getCurrentUser(): Promise<AuthenticatedUser | null> {
    const { data, error } = await this.client.auth.getUser();

    if (error || !data.user) {
      return null;
    }

    return {
      id: data.user.id,
      email: data.user.email ?? "",
    };
  }

  async signOut(): Promise<void> {
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
  }
}
