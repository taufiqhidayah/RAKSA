import { UseCase } from "../../use-case";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { Clock } from "../../ports/clock";
import { NotFoundError } from "@/core/domain/errors/domain-errors";

export interface RevokeWristbandDependencies {
  wristbandRepository: WristbandRepository;
  clock: Clock;
}

/**
 * Soft-revoke: sets status to `revoked` so the public page returns not-found
 * while preserving the audit trail and owner data. Preferred over hard delete.
 */
export class RevokeWristbandUseCase implements UseCase<string, void> {
  constructor(private readonly deps: RevokeWristbandDependencies) {}

  async execute(wristbandId: string): Promise<void> {
    const wristband = await this.deps.wristbandRepository.findById(wristbandId);
    if (!wristband) {
      throw new NotFoundError("Tag not found");
    }

    await this.deps.wristbandRepository.save(
      wristband.withRevoked(this.deps.clock.now()),
    );
  }
}
