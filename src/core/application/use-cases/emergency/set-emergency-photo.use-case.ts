import { UseCase } from "../../use-case";
import { SetEmergencyPhotoInput } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { EmergencyProfileRepository } from "@/core/domain/repositories/emergency-profile-repository";
import { EmergencyProfile } from "@/core/domain/entities/emergency-profile";
import { IdGenerator } from "../../ports/id-generator";
import { Clock } from "../../ports/clock";
import { NotFoundError } from "@/core/domain/errors/domain-errors";

export interface SetEmergencyPhotoDependencies {
  wristbandRepository: WristbandRepository;
  emergencyProfileRepository: EmergencyProfileRepository;
  idGenerator: IdGenerator;
  clock: Clock;
}

/**
 * Sets (or clears) the wearer photo shown on the public emergency page for an
 * owned tag. Creates the emergency profile row on first upload, using the
 * wearer label as the preferred name so the public page has something to show.
 */
export class SetEmergencyPhotoUseCase
  implements UseCase<SetEmergencyPhotoInput, void>
{
  constructor(private readonly deps: SetEmergencyPhotoDependencies) {}

  async execute(input: SetEmergencyPhotoInput): Promise<void> {
    const wristband = await this.deps.wristbandRepository.findById(
      input.wristbandId,
    );

    if (!wristband) {
      throw new NotFoundError("Tag tidak ditemukan");
    }

    wristband.assertOwnerAccess(input.ownerId);

    const now = this.deps.clock.now();
    const existing = await this.deps.emergencyProfileRepository.findByWristbandId(
      input.wristbandId,
    );

    const profile = existing
      ? existing.withPhoto(input.photoUrl, now)
      : EmergencyProfile.create({
          id: this.deps.idGenerator.generate(),
          wristbandId: input.wristbandId,
          preferredName: wristband.wearerLabel,
          photoUrl: input.photoUrl,
          now,
        });

    await this.deps.emergencyProfileRepository.save(profile);
  }
}
