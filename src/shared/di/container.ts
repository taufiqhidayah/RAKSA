import type { SupabaseClient } from "@supabase/supabase-js";
import { SystemClock } from "@/core/application/ports/clock";
import { ClaimWristbandUseCase } from "@/core/application/use-cases/wristband/claim-wristband.use-case";
import { ListFamilyWristbandsUseCase } from "@/core/application/use-cases/wristband/list-family-wristbands.use-case";
import { UpdateWristbandWearerUseCase } from "@/core/application/use-cases/wristband/update-wristband-wearer.use-case";
import { SetWristbandActiveUseCase } from "@/core/application/use-cases/wristband/set-wristband-active.use-case";
import { GetWristbandSetupUseCase } from "@/core/application/use-cases/wristband/get-wristband-setup.use-case";
import { SaveEmergencyProfileUseCase } from "@/core/application/use-cases/emergency/save-emergency-profile.use-case";
import { AddEmergencyContactUseCase } from "@/core/application/use-cases/emergency/add-emergency-contact.use-case";
import { RemoveEmergencyContactUseCase } from "@/core/application/use-cases/emergency/remove-emergency-contact.use-case";
import { ListFamilyScanActivityUseCase } from "@/core/application/use-cases/wristband/list-family-scan-activity.use-case";
import { GetFamilyScanTrendUseCase } from "@/core/application/use-cases/wristband/get-family-scan-trend.use-case";
import { GetPublicEmergencyPageUseCase } from "@/core/application/use-cases/emergency/get-public-emergency-page.use-case";
import { SetEmergencyPhotoUseCase } from "@/core/application/use-cases/emergency/set-emergency-photo.use-case";
import { RecordPublicScanUseCase } from "@/core/application/use-cases/emergency/record-public-scan.use-case";
import { ResolveEmergencyIdUseCase } from "@/core/application/use-cases/emergency/resolve-emergency-id.use-case";
import { SupabaseActivationCodeRepository } from "@/infrastructure/persistence/supabase/repositories/supabase-activation-code.repository";
import { SupabaseWristbandRepository } from "@/infrastructure/persistence/supabase/repositories/supabase-wristband.repository";
import { SupabaseEmergencyProfileRepository } from "@/infrastructure/persistence/supabase/repositories/supabase-emergency-profile.repository";
import { SupabaseEmergencyContactRepository } from "@/infrastructure/persistence/supabase/repositories/supabase-emergency-contact.repository";
import { SupabaseScanLogRepository } from "@/infrastructure/persistence/supabase/repositories/supabase-scan-log.repository";
import { SupabaseScanNotificationRepository } from "@/infrastructure/persistence/supabase/repositories/supabase-scan-notification.repository";
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
  const emergencyProfileRepository = new SupabaseEmergencyProfileRepository(db);
  const emergencyContactRepository = new SupabaseEmergencyContactRepository(db);
  const authService = new SupabaseAuthService(supabase);

  const scanLogRepository = new SupabaseScanLogRepository(db);
  const scanNotificationRepository = new SupabaseScanNotificationRepository(db);

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
        emergencyProfileRepository,
      }),
      updateWristbandWearer: new UpdateWristbandWearerUseCase({
        wristbandRepository,
        clock,
      }),
      setEmergencyPhoto: new SetEmergencyPhotoUseCase({
        wristbandRepository,
        emergencyProfileRepository,
        idGenerator,
        clock,
      }),
      setWristbandActive: new SetWristbandActiveUseCase({
        wristbandRepository,
        clock,
      }),
      getWristbandSetup: new GetWristbandSetupUseCase({
        wristbandRepository,
        emergencyProfileRepository,
        emergencyContactRepository,
      }),
      saveEmergencyProfile: new SaveEmergencyProfileUseCase({
        wristbandRepository,
        emergencyProfileRepository,
        idGenerator,
        clock,
      }),
      addEmergencyContact: new AddEmergencyContactUseCase({
        wristbandRepository,
        emergencyContactRepository,
        idGenerator,
        clock,
      }),
      removeEmergencyContact: new RemoveEmergencyContactUseCase({
        wristbandRepository,
        emergencyContactRepository,
      }),
      listFamilyScanActivity: new ListFamilyScanActivityUseCase({
        wristbandRepository,
        scanLogRepository,
      }),
      getFamilyScanTrend: new GetFamilyScanTrendUseCase({
        wristbandRepository,
        scanLogRepository,
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
