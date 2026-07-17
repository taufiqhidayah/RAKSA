import { UseCase } from "../../use-case";
import { PublicEmergencyPageDto } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { EmergencyProfileRepository } from "@/core/domain/repositories/emergency-profile-repository";
import { EmergencyContactRepository } from "@/core/domain/repositories/emergency-contact-repository";
import { Wristband } from "@/core/domain/entities/wristband";
import { EmergencyId } from "@/core/domain/value-objects/emergency-id";
import { PublicToken } from "@/core/domain/value-objects/public-token";
import {
  InactiveWristbandError,
  NotFoundError,
} from "@/core/domain/errors/domain-errors";

export interface GetPublicEmergencyPageDependencies {
  wristbandRepository: WristbandRepository;
  emergencyProfileRepository: EmergencyProfileRepository;
  emergencyContactRepository: EmergencyContactRepository;
}

/**
 * Builds the public emergency page view model — no authentication required.
 */
export class GetPublicEmergencyPageUseCase
  implements UseCase<string, PublicEmergencyPageDto>
{
  constructor(private readonly deps: GetPublicEmergencyPageDependencies) {}

  async execute(publicTokenRaw: string): Promise<PublicEmergencyPageDto> {
    const publicToken = PublicToken.create(publicTokenRaw);
    const wristband = await this.deps.wristbandRepository.findByPublicToken(publicToken);

    return this.buildPage(wristband);
  }

  async executeByEmergencyId(emergencyIdRaw: string): Promise<PublicEmergencyPageDto> {
    const emergencyId = EmergencyId.create(emergencyIdRaw);
    const wristband = await this.deps.wristbandRepository.findByEmergencyId(emergencyId);

    return this.buildPage(wristband);
  }

  private async buildPage(wristband: Wristband | null): Promise<PublicEmergencyPageDto> {
    if (!wristband) {
      throw new NotFoundError("Emergency page not found");
    }

    if (!wristband.isPubliclyAccessible()) {
      throw new InactiveWristbandError("This wristband is not active");
    }

    const [profile, contacts] = await Promise.all([
      this.deps.emergencyProfileRepository.findByWristbandId(wristband.id),
      this.deps.emergencyContactRepository.findByWristbandId(wristband.id),
    ]);

    if (!profile || !profile.isPublicEnabled) {
      throw new NotFoundError("Emergency profile is not available");
    }

    return {
      profileMode: wristband.profileMode,
      preferredName: profile.preferredName,
      photoUrl: profile.photoUrl,
      approximateAge: profile.approximateAge,
      bloodType: profile.bloodType,
      criticalAllergies: profile.criticalAllergies,
      medicalConditions: profile.medicalConditions,
      importantMedications: profile.importantMedications,
      emergencyNotes: profile.emergencyNotes,
      reunificationNote: profile.reunificationNote,
      disorientationNotes: profile.disorientationNotes,
      cognitiveConditionFlag: profile.cognitiveConditionFlag,
      languageHint: profile.languageHint,
      contacts: contacts.map((contact) => ({
        label: contact.showNameOnPublic ? contact.name : contact.relationship,
        relationship: contact.relationship,
        telUri: contact.phone.toTelUri(),
        isPrimary: contact.isPrimary,
      })),
      wristbandLabel: wristband.wearerLabel,
      lastConfirmedAt: profile.lastConfirmedAt?.toISOString(),
    };
  }
}
