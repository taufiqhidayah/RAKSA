import { UseCase } from "../../use-case";
import { WristbandSummaryDto } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { EmergencyProfileRepository } from "@/core/domain/repositories/emergency-profile-repository";

export interface ListFamilyWristbandsDependencies {
  wristbandRepository: WristbandRepository;
  emergencyProfileRepository: EmergencyProfileRepository;
}

/**
 * Returns all wristbands owned by the authenticated account holder, including
 * the wearer photo (from the emergency profile) when one has been uploaded.
 */
export class ListFamilyWristbandsUseCase
  implements UseCase<string, WristbandSummaryDto[]>
{
  constructor(private readonly deps: ListFamilyWristbandsDependencies) {}

  async execute(ownerId: string): Promise<WristbandSummaryDto[]> {
    const wristbands = await this.deps.wristbandRepository.findByOwnerId(ownerId);

    const profiles = await this.deps.emergencyProfileRepository.findByWristbandIds(
      wristbands.map((w) => w.id),
    );
    const photoByWristbandId = new Map(
      profiles
        .filter((p) => p.photoUrl)
        .map((p) => [p.wristbandId, p.photoUrl as string]),
    );

    return wristbands.map((w) => ({
      id: w.id,
      emergencyId: w.emergencyId.toString(),
      status: w.status,
      profileMode: w.profileMode,
      wearerRole: w.wearerRole,
      wearerLabel: w.wearerLabel,
      deviceType: w.deviceType,
      notifyOnScan: w.notifyOnScan,
      activatedAt: w.activatedAt?.toISOString(),
      photoUrl: photoByWristbandId.get(w.id),
    }));
  }
}
