import { UseCase } from "../../use-case";
import { AddEmergencyContactInput } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { EmergencyContactRepository } from "@/core/domain/repositories/emergency-contact-repository";
import { EmergencyContact } from "@/core/domain/entities/emergency-contact";
import { PhoneNumber } from "@/core/domain/value-objects/phone-number";
import { IdGenerator } from "../../ports/id-generator";
import { Clock } from "../../ports/clock";
import { NotFoundError, ValidationError } from "@/core/domain/errors/domain-errors";

export interface AddEmergencyContactDependencies {
  wristbandRepository: WristbandRepository;
  emergencyContactRepository: EmergencyContactRepository;
  idGenerator: IdGenerator;
  clock: Clock;
}

const MAX_CONTACTS = 5;

/**
 * Adds an emergency contact to an owned tag. Enforces a sane cap and keeps at
 * most one primary contact.
 */
export class AddEmergencyContactUseCase
  implements UseCase<AddEmergencyContactInput, void>
{
  constructor(private readonly deps: AddEmergencyContactDependencies) {}

  async execute(input: AddEmergencyContactInput): Promise<void> {
    const wristband = await this.deps.wristbandRepository.findById(
      input.wristbandId,
    );

    if (!wristband) {
      throw new NotFoundError("Tag tidak ditemukan");
    }

    wristband.assertOwnerAccess(input.ownerId);

    const existing = await this.deps.emergencyContactRepository.findByWristbandId(
      input.wristbandId,
    );

    if (existing.length >= MAX_CONTACTS) {
      throw new ValidationError(`Maksimal ${MAX_CONTACTS} kontak darurat`);
    }

    const now = this.deps.clock.now();
    const phone = PhoneNumber.create(input.phone);

    // A new primary contact demotes any previous primary.
    if (input.isPrimary) {
      for (const contact of existing.filter((c) => c.isPrimary)) {
        await this.deps.emergencyContactRepository.save(
          contact.withPrimary(false, now),
        );
      }
    }

    const contact = EmergencyContact.create({
      id: this.deps.idGenerator.generate(),
      wristbandId: input.wristbandId,
      name: input.name,
      relationship: input.relationship,
      phone,
      isPrimary: input.isPrimary,
      showNameOnPublic: input.showNameOnPublic,
      now,
    });

    await this.deps.emergencyContactRepository.save(contact);
  }
}
