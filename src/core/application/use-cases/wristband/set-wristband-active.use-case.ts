import { UseCase } from "../../use-case";
import { SetWristbandActiveInput } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { Clock } from "../../ports/clock";
import { NotFoundError } from "@/core/domain/errors/domain-errors";

export interface SetWristbandActiveDependencies {
  wristbandRepository: WristbandRepository;
  clock: Clock;
}

/**
 * Toggles a tag between active (public page reachable) and inactive for its
 * owner. Domain rules decide which status transitions are allowed.
 */
export class SetWristbandActiveUseCase
  implements UseCase<SetWristbandActiveInput, void>
{
  constructor(private readonly deps: SetWristbandActiveDependencies) {}

  async execute(input: SetWristbandActiveInput): Promise<void> {
    const wristband = await this.deps.wristbandRepository.findById(
      input.wristbandId,
    );

    if (!wristband) {
      throw new NotFoundError("Tag tidak ditemukan");
    }

    wristband.assertOwnerAccess(input.ownerId);

    const updated = wristband.setActive(input.active, this.deps.clock.now());
    await this.deps.wristbandRepository.save(updated);
  }
}
