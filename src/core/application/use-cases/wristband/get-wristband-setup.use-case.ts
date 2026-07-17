import { UseCase } from "../../use-case";
import { WristbandSetupDto } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { EmergencyProfileRepository } from "@/core/domain/repositories/emergency-profile-repository";
import { EmergencyContactRepository } from "@/core/domain/repositories/emergency-contact-repository";
import { NotFoundError } from "@/core/domain/errors/domain-errors";

export interface GetWristbandSetupInput {
  ownerId: string;
  wristbandId: string;
}

export interface GetWristbandSetupDependencies {
  wristbandRepository: WristbandRepository;
  emergencyProfileRepository: EmergencyProfileRepository;
  emergencyContactRepository: EmergencyContactRepository;
}

/**
 * Loads a single owned tag plus its emergency profile to prefill the setup page.
 */
export class GetWristbandSetupUseCase
  implements UseCase<GetWristbandSetupInput, WristbandSetupDto>
{
  constructor(private readonly deps: GetWristbandSetupDependencies) {}

  async execute(input: GetWristbandSetupInput): Promise<WristbandSetupDto> {
    const wristband = await this.deps.wristbandRepository.findById(
      input.wristbandId,
    );

    if (!wristband) {
      throw new NotFoundError("Tag tidak ditemukan");
    }

    wristband.assertOwnerAccess(input.ownerId);

    const profile = await this.deps.emergencyProfileRepository.findByWristbandId(
      input.wristbandId,
    );

    const contacts = await this.deps.emergencyContactRepository.findByWristbandId(
      input.wristbandId,
    );

    return {
      id: wristband.id,
      emergencyId: wristband.emergencyId.toString(),
      status: wristband.status,
      isActive: wristband.isPubliclyAccessible(),
      wearerLabel: wristband.wearerLabel,
      wearerRole: wristband.wearerRole,
      profileMode: wristband.profileMode,
      photoUrl: profile?.photoUrl,
      preferredName: profile?.preferredName ?? wristband.wearerLabel,
      approximateAge: profile?.approximateAge,
      bloodType: profile?.bloodType,
      criticalAllergies: profile?.criticalAllergies,
      medicalConditions: profile?.medicalConditions,
      importantMedications: profile?.importantMedications,
      emergencyNotes: profile?.emergencyNotes,
      languageHint: profile?.languageHint,
      isPublicEnabled: profile?.isPublicEnabled ?? true,
      contacts: contacts.map((c) => ({
        id: c.id,
        name: c.name,
        relationship: c.relationship,
        phone: c.phone.value,
        isPrimary: c.isPrimary,
        showNameOnPublic: c.showNameOnPublic,
      })),
    };
  }
}
