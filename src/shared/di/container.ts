import type { SupabaseClient } from "@supabase/supabase-js";
import { SystemClock } from "@/core/application/ports/clock";
import { ClaimWristbandUseCase } from "@/core/application/use-cases/wristband/claim-wristband.use-case";
import { ListFamilyWristbandsUseCase } from "@/core/application/use-cases/wristband/list-family-wristbands.use-case";
import { GetPublicEmergencyPageUseCase } from "@/core/application/use-cases/emergency/get-public-emergency-page.use-case";
import { RecordPublicScanUseCase } from "@/core/application/use-cases/emergency/record-public-scan.use-case";
import { ResolveEmergencyIdUseCase } from "@/core/application/use-cases/emergency/resolve-emergency-id.use-case";
import { SupabaseActivationCodeRepository } from "@/infrastructure/persistence/supabase/repositories/supabase-activation-code.repository";
import { SupabaseWristbandRepository } from "@/infrastructure/persistence/supabase/repositories/supabase-wristband.repository";
import { SupabaseAuthService } from "@/infrastructure/auth/supabase-auth.service";
import { resolvePersistenceClient } from "@/infrastructure/persistence/supabase/client/persistence-client";
import { UuidIdGenerator } from "@/infrastructure/id/uuid-id-generator";

/**
 * Composition Root — wires dependencies (Dependency Injection).
 * Presentation layer depends on this factory, not concrete infrastructure.
 */
export function createAppContainer(supabase: SupabaseClient) {
  const clock = new SystemClock();
  const idGenerator = new UuidIdGenerator();
  const db = resolvePersistenceClient(supabase);
  const wristbandRepository = new SupabaseWristbandRepository(db);
  const activationCodeRepository = new SupabaseActivationCodeRepository(db);
  const authService = new SupabaseAuthService(supabase);

  // TODO: wire remaining Supabase repositories when migrations are added

  const emergencyProfileRepository = {
    findByWristbandId: async () => null,
    save: async () => undefined,
  };

  const emergencyContactRepository = {
    findByWristbandId: async () => [],
    save: async () => undefined,
    delete: async () => undefined,
  };

  const scanLogRepository = {
    findByWristbandId: async () => [],
    create: async () => {
      throw new Error("ScanLogRepository not implemented");
    },
    attachLocation: async () => {
      throw new Error("ScanLogRepository not implemented");
    },
  };

  const scanNotificationRepository = {
    findByAccountHolderId: async () => [],
    save: async () => undefined,
    markAsRead: async () => undefined,
  };

  return {
    authService,
    useCases: {
      claimWristband: new ClaimWristbandUseCase({
        wristbandRepository,
        activationCodeRepository,
        clock,
      }),
      listFamilyWristbands: new ListFamilyWristbandsUseCase({
        wristbandRepository,
      }),
      getPublicEmergencyPage: new GetPublicEmergencyPageUseCase({
        wristbandRepository,
        emergencyProfileRepository,
        emergencyContactRepository,
      }),
      resolveEmergencyId: new ResolveEmergencyIdUseCase({
        wristbandRepository,
      }),
      recordPublicScan: new RecordPublicScanUseCase({
        wristbandRepository,
        scanLogRepository,
        scanNotificationRepository,
        idGenerator,
        clock,
      }),
    },
  };
}

export type AppContainer = ReturnType<typeof createAppContainer>;
