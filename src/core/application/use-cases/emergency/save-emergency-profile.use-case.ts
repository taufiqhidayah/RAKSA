import { UseCase } from "../../use-case";
import { SaveEmergencyProfileInput } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { EmergencyProfileRepository } from "@/core/domain/repositories/emergency-profile-repository";
import { EmergencyProfile } from "@/core/domain/entities/emergency-profile";
import { IdGenerator } from "../../ports/id-generator";
import { Clock } from "../../ports/clock";
import { NotFoundError } from "@/core/domain/errors/domain-errors";

export interface SaveEmergencyProfileDependencies {
  wristbandRepository: WristbandRepository;
  emergencyProfileRepository: EmergencyProfileRepository;
  idGenerator: IdGenerator;
  clock: Clock;
}

/**
 * Creates or updates the emergency profile for an owned tag (the setup page).
 * The wearer photo, if any, is preserved.
 */
export class SaveEmergencyProfileUseCase
  implements UseCase<SaveEmergencyProfileInput, void>
{
  constructor(private readonly deps: SaveEmergencyProfileDependencies) {}

  async execute(input: SaveEmergencyProfileInput): Promise<void> {
    const wristband = await this.deps.wristbandRepository.findById(
      input.wristbandId,
    );

    if (!wristband) {
      throw new NotFoundError("Tag tidak ditemukan");
    }

    wristband.assertOwnerAccess(input.ownerId);

    const now = this.deps.clock.now();

    // Keep the dashboard label in sync with the display name set here, so a tag
    // no longer shows the provisioning placeholder ("Unassigned tag").
    const preferredName = input.preferredName.trim();
    if (preferredName && wristband.wearerLabel !== preferredName) {
      await this.deps.wristbandRepository.save(
        wristband.withWearerLabel(preferredName, now),
      );
    }

    const existing = await this.deps.emergencyProfileRepository.findByWristbandId(
      input.wristbandId,
    );

    const base =
      existing ??
      EmergencyProfile.create({
        id: this.deps.idGenerator.generate(),
        wristbandId: input.wristbandId,
        preferredName: input.preferredName,
        isPublicEnabled: input.isPublicEnabled,
        now,
      });

    const profile = base.withDetails({
      preferredName: input.preferredName,
      approximateAge: input.approximateAge,
      bloodType: input.bloodType,
      criticalAllergies: input.criticalAllergies,
      medicalConditions: input.medicalConditions,
      importantMedications: input.importantMedications,
      emergencyNotes: input.emergencyNotes,
      languageHint: input.languageHint,
      isPublicEnabled: input.isPublicEnabled,
      updatedAt: now,
    });

    await this.deps.emergencyProfileRepository.save(profile);
  }
}
