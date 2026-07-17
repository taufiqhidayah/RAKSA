import { UseCase } from "../../use-case";
import { UpdateWristbandWearerInput } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { Clock } from "../../ports/clock";
import { NotFoundError } from "@/core/domain/errors/domain-errors";
import {
  notifyDefaultForRole,
  profileModeForRole,
} from "@/core/domain/policies/wearer-profile-policy";

export interface UpdateWristbandWearerDependencies {
  wristbandRepository: WristbandRepository;
  clock: Clock;
}

/**
 * Edits the wearer of an owned tag (family member): role, display name, and
 * scan-notification preference. Profile mode is derived from the role.
 */
export class UpdateWristbandWearerUseCase
  implements UseCase<UpdateWristbandWearerInput, void>
{
  constructor(private readonly deps: UpdateWristbandWearerDependencies) {}

  async execute(input: UpdateWristbandWearerInput): Promise<void> {
    const wristband = await this.deps.wristbandRepository.findById(
      input.wristbandId,
    );

    if (!wristband) {
      throw new NotFoundError("Tag not found");
    }

    wristband.assertOwnerAccess(input.ownerId);

    const updated = wristband.withWearer({
      wearerRole: input.wearerRole,
      wearerLabel: input.wearerLabel,
      profileMode: profileModeForRole(input.wearerRole),
      notifyOnScan: input.notifyOnScan ?? notifyDefaultForRole(input.wearerRole),
      updatedAt: this.deps.clock.now(),
    });

    await this.deps.wristbandRepository.save(updated);
  }
}
