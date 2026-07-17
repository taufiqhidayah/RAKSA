import { UseCase } from "../../use-case";
import {
  ClaimWristbandInput,
  ClaimWristbandOutput,
} from "../../dto";
import { ActivationCodeRepository } from "@/core/domain/repositories/activation-code-repository";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { Clock } from "../../ports/clock";
import {
  InvalidActivationCodeError,
  NotFoundError,
  ValidationError,
} from "@/core/domain/errors/domain-errors";
import {
  isValidActivationCodeFormat,
  normalizeActivationCode,
} from "@/core/domain/value-objects/activation-code-value";
import {
  notifyDefaultForRole,
  profileModeForRole,
} from "@/core/domain/policies/wearer-profile-policy";

export interface ClaimWristbandDependencies {
  wristbandRepository: WristbandRepository;
  activationCodeRepository: ActivationCodeRepository;
  clock: Clock;
}

/**
 * Claims an unclaimed wristband using a one-time activation code.
 * Single Responsibility: orchestrates claim workflow only.
 */
export class ClaimWristbandUseCase
  implements UseCase<ClaimWristbandInput, ClaimWristbandOutput>
{
  constructor(private readonly deps: ClaimWristbandDependencies) {}

  async execute(input: ClaimWristbandInput): Promise<ClaimWristbandOutput> {
    const normalized = normalizeActivationCode(input.activationCode);

    if (!normalized) {
      throw new ValidationError("Activation code is required", "activationCode");
    }

    if (!isValidActivationCodeFormat(normalized)) {
      throw new InvalidActivationCodeError("Invalid activation code format");
    }

    const activationCode =
      await this.deps.activationCodeRepository.findUnusedByCode(normalized);

    if (!activationCode) {
      throw new InvalidActivationCodeError(
        "Activation code is invalid or already used",
      );
    }

    return this.validateAndClaim(activationCode.wristbandId, normalized, input);
  }

  /** Internal helper — validates code against wristband (used by full implementation). */
  protected async validateAndClaim(
    wristbandId: string,
    plainCode: string,
    input: ClaimWristbandInput,
  ): Promise<ClaimWristbandOutput> {
    const wristband = await this.deps.wristbandRepository.findById(wristbandId);

    if (!wristband) {
      throw new NotFoundError("Wristband not found");
    }

    const activationCode =
      await this.deps.activationCodeRepository.findUnusedByWristbandId(wristbandId);

    if (!activationCode || !activationCode.isUsable(this.deps.clock.now())) {
      throw new InvalidActivationCodeError("Activation code is invalid or expired");
    }

    if (!activationCode.matches(plainCode)) {
      throw new InvalidActivationCodeError("Activation code is invalid or expired");
    }

    const now = this.deps.clock.now();
    let claimed = wristband.withClaimed(input.ownerId, now);

    if (input.wearerRole && input.wearerLabel?.trim()) {
      claimed = claimed.withWearer({
        wearerRole: input.wearerRole,
        wearerLabel: input.wearerLabel,
        profileMode: profileModeForRole(input.wearerRole),
        notifyOnScan: input.notifyOnScan ?? notifyDefaultForRole(input.wearerRole),
        updatedAt: now,
      });
    }

    await this.deps.wristbandRepository.save(claimed);
    await this.deps.activationCodeRepository.save(
      activationCode.withUsed(input.ownerId, now),
    );

    return {
      wristbandId: claimed.id,
      wearerLabel: claimed.wearerLabel,
    };
  }
}
