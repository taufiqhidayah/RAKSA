import { UseCase } from "../../use-case";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { NotFoundError, ValidationError } from "@/core/domain/errors/domain-errors";

/**
 * Hard delete — permitted ONLY for unclaimed tags. Claimed/active tags carry a
 * user's emergency data; those must be revoked instead of destroyed.
 */
export class DeleteWristbandUseCase implements UseCase<string, void> {
  constructor(
    private readonly deps: { wristbandRepository: WristbandRepository },
  ) {}

  async execute(wristbandId: string): Promise<void> {
    const wristband = await this.deps.wristbandRepository.findById(wristbandId);
    if (!wristband) {
      throw new NotFoundError("Tag not found");
    }

    if (!wristband.canBeHardDeleted()) {
      throw new ValidationError(
        "Only unclaimed tags can be permanently deleted. Use Revoke instead.",
      );
    }

    await this.deps.wristbandRepository.delete(wristbandId);
  }
}
