import { UseCase } from "../../use-case";
import { RemoveEmergencyContactInput } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { EmergencyContactRepository } from "@/core/domain/repositories/emergency-contact-repository";
import { NotFoundError } from "@/core/domain/errors/domain-errors";

export interface RemoveEmergencyContactDependencies {
  wristbandRepository: WristbandRepository;
  emergencyContactRepository: EmergencyContactRepository;
}

/** Removes an emergency contact from an owned tag. */
export class RemoveEmergencyContactUseCase
  implements UseCase<RemoveEmergencyContactInput, void>
{
  constructor(private readonly deps: RemoveEmergencyContactDependencies) {}

  async execute(input: RemoveEmergencyContactInput): Promise<void> {
    const wristband = await this.deps.wristbandRepository.findById(
      input.wristbandId,
    );

    if (!wristband) {
      throw new NotFoundError("Tag tidak ditemukan");
    }

    wristband.assertOwnerAccess(input.ownerId);

    const contacts = await this.deps.emergencyContactRepository.findByWristbandId(
      input.wristbandId,
    );
    const target = contacts.find((c) => c.id === input.contactId);

    if (!target) {
      throw new NotFoundError("Kontak tidak ditemukan");
    }

    await this.deps.emergencyContactRepository.delete(target.id);
  }
}
