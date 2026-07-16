import type { SupabaseClient } from "@supabase/supabase-js";
import { SystemClock } from "@/core/application/ports/clock";
import { UuidIdGenerator } from "@/infrastructure/id/uuid-id-generator";
import { CryptoTokenGenerator } from "@/infrastructure/security/crypto-token-generator";
import { SupabaseWristbandRepository } from "@/infrastructure/persistence/supabase/repositories/supabase-wristband.repository";
import { SupabaseActivationCodeRepository } from "@/infrastructure/persistence/supabase/repositories/supabase-activation-code.repository";
import {
  RegisterWristbandUseCase,
  ListAdminWristbandsUseCase,
  GetAdminStatsUseCase,
  GetAdminWristbandDetailUseCase,
  RevokeWristbandUseCase,
  DeleteWristbandUseCase,
} from "@/core/application/use-cases/admin";
import { env } from "@/shared/config/env";

/**
 * Composition root for the admin area. The passed client should be a
 * service-role client (via resolvePersistenceClient) so admin queries can read
 * across all owners, bypassing the owner-only RLS policies.
 */
export function createAdminContainer(db: SupabaseClient) {
  const clock = new SystemClock();
  const idGenerator = new UuidIdGenerator();
  const tokenGenerator = new CryptoTokenGenerator();
  const wristbandRepository = new SupabaseWristbandRepository(db);
  const activationCodeRepository = new SupabaseActivationCodeRepository(db);

  return {
    useCases: {
      registerWristband: new RegisterWristbandUseCase({
        wristbandRepository,
        activationCodeRepository,
        tokenGenerator,
        idGenerator,
        clock,
        appBaseUrl: env.NEXT_PUBLIC_APP_URL,
      }),
      listAdminWristbands: new ListAdminWristbandsUseCase({
        wristbandRepository,
        activationCodeRepository,
      }),
      getAdminStats: new GetAdminStatsUseCase({
        wristbandRepository,
        clock,
      }),
      getAdminWristbandDetail: new GetAdminWristbandDetailUseCase({
        wristbandRepository,
        activationCodeRepository,
      }),
      revokeWristband: new RevokeWristbandUseCase({
        wristbandRepository,
        clock,
      }),
      deleteWristband: new DeleteWristbandUseCase({
        wristbandRepository,
      }),
    },
  };
}

export type AdminContainer = ReturnType<typeof createAdminContainer>;
