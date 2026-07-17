import { UseCase } from "../../use-case";
import { RegisterWristbandInput, RegisterWristbandOutput } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { ActivationCodeRepository } from "@/core/domain/repositories/activation-code-repository";
import { TokenGenerator } from "../../ports/token-generator";
import { IdGenerator } from "../../ports/id-generator";
import { Clock } from "../../ports/clock";
import { Wristband } from "@/core/domain/entities/wristband";
import { ActivationCode } from "@/core/domain/entities/activation-code";
import { EmergencyId } from "@/core/domain/value-objects/emergency-id";
import { PublicToken } from "@/core/domain/value-objects/public-token";
import { ProfileMode, WearerRole } from "@/core/domain/enums";
import { ConflictError } from "@/core/domain/errors/domain-errors";

export interface RegisterWristbandDependencies {
  wristbandRepository: WristbandRepository;
  activationCodeRepository: ActivationCodeRepository;
  tokenGenerator: TokenGenerator;
  idGenerator: IdGenerator;
  clock: Clock;
  appBaseUrl: string;
}

const MAX_GENERATION_ATTEMPTS = 8;

/**
 * Provisions a brand-new, unclaimed wristband with a generated Emergency ID,
 * public token, and one-time activation code. Superadmin-only workflow.
 */
export class RegisterWristbandUseCase
  implements UseCase<RegisterWristbandInput, RegisterWristbandOutput>
{
  constructor(private readonly deps: RegisterWristbandDependencies) {}

  async execute(input: RegisterWristbandInput): Promise<RegisterWristbandOutput> {
    const emergencyId = await this.generateUniqueEmergencyId();
    const publicToken = await this.generateUniquePublicToken();
    const activationCode = await this.generateUniqueActivationCode();

    const now = this.deps.clock.now();
    const publicUrl = this.buildPublicUrl(publicToken.value);
    const qrUrl = this.buildEmergencyIdUrl(emergencyId.value);

    const wristband = Wristband.register({
      id: this.deps.idGenerator.generate(),
      emergencyId,
      publicToken,
      profileMode: input.profileMode ?? ProfileMode.ADULT_EMERGENCY,
      wearerRole: input.wearerRole ?? WearerRole.SELF,
      wearerLabel: input.wearerLabel?.trim() || "Unassigned tag",
      deviceType: input.deviceType,
      notifyOnScan: (input.wearerRole ?? WearerRole.SELF) !== WearerRole.SELF,
      nfcUrl: publicUrl,
      qrUrl,
      now,
    });

    await this.deps.wristbandRepository.save(wristband);

    const code = ActivationCode.issue({
      id: this.deps.idGenerator.generate(),
      wristbandId: wristband.id,
      code: activationCode,
      now,
    });

    try {
      await this.deps.activationCodeRepository.save(code);
    } catch (error) {
      // Roll back the orphan wristband so provisioning stays consistent.
      await this.deps.wristbandRepository.delete(wristband.id).catch(() => undefined);
      throw error;
    }

    return {
      wristbandId: wristband.id,
      emergencyId: emergencyId.value,
      publicToken: publicToken.value,
      activationCode,
      nfcUrl: publicUrl,
      qrUrl,
    };
  }

  private buildPublicUrl(token: string): string {
    const base = this.deps.appBaseUrl.replace(/\/$/, "");
    return `${base}/${token}`;
  }

  private buildEmergencyIdUrl(emergencyId: string): string {
    const base = this.deps.appBaseUrl.replace(/\/$/, "");
    return `${base}/${emergencyId}`;
  }

  private async generateUniqueEmergencyId(): Promise<EmergencyId> {
    for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt += 1) {
      const candidate = EmergencyId.create(this.deps.tokenGenerator.generateEmergencyId());
      const existing = await this.deps.wristbandRepository.findByEmergencyId(candidate);
      if (!existing) return candidate;
    }
    throw new ConflictError("Failed to generate unique Emergency ID, please try again");
  }

  private async generateUniquePublicToken(): Promise<PublicToken> {
    for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt += 1) {
      const candidate = PublicToken.create(this.deps.tokenGenerator.generatePublicToken());
      const existing = await this.deps.wristbandRepository.findByPublicToken(candidate);
      if (!existing) return candidate;
    }
    throw new ConflictError("Failed to generate unique public token, please try again");
  }

  private async generateUniqueActivationCode(): Promise<string> {
    for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt += 1) {
      const candidate = this.deps.tokenGenerator.generateActivationCode();
      const exists = await this.deps.activationCodeRepository.existsByCode(candidate);
      if (!exists) return candidate;
    }
    throw new ConflictError("Failed to generate unique activation code, please try again");
  }
}
