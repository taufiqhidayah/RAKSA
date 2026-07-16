import { UseCase } from "../../use-case";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { EmergencyId } from "@/core/domain/value-objects/emergency-id";
import { NotFoundError } from "@/core/domain/errors/domain-errors";

export interface ResolveEmergencyIdDependencies {
  wristbandRepository: WristbandRepository;
}

/**
 * Resolves a human-readable Emergency ID (GS-XXXX-XXXX) to its public token,
 * so short QR links like {APP_URL}/{emergencyId} can redirect to the canonical
 * /{publicToken} emergency page. No authentication required.
 */
export class ResolveEmergencyIdUseCase implements UseCase<string, string> {
  constructor(private readonly deps: ResolveEmergencyIdDependencies) {}

  async execute(emergencyIdRaw: string): Promise<string> {
    const emergencyId = EmergencyId.create(emergencyIdRaw);
    const wristband = await this.deps.wristbandRepository.findByEmergencyId(emergencyId);

    if (!wristband) {
      throw new NotFoundError("Emergency page not found");
    }

    return wristband.publicToken.value;
  }
}
