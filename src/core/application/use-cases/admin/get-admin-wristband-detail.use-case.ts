import { UseCase } from "../../use-case";
import { AdminWristbandDetailDto } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { ActivationCodeRepository } from "@/core/domain/repositories/activation-code-repository";
import { NotFoundError } from "@/core/domain/errors/domain-errors";

export interface GetAdminWristbandDetailDependencies {
  wristbandRepository: WristbandRepository;
  activationCodeRepository: ActivationCodeRepository;
}

export class GetAdminWristbandDetailUseCase
  implements UseCase<string, AdminWristbandDetailDto>
{
  constructor(private readonly deps: GetAdminWristbandDetailDependencies) {}

  async execute(wristbandId: string): Promise<AdminWristbandDetailDto> {
    const w = await this.deps.wristbandRepository.findById(wristbandId);
    if (!w) {
      throw new NotFoundError("Tag not found");
    }

    const code = await this.deps.activationCodeRepository.findByWristbandId(w.id);

    return {
      id: w.id,
      emergencyId: w.emergencyId.value,
      status: w.status,
      profileMode: w.profileMode,
      wearerRole: w.wearerRole,
      wearerLabel: w.wearerLabel,
      publicToken: w.publicToken.value,
      notifyOnScan: w.notifyOnScan,
      nfcUrl: w.nfcUrl,
      qrUrl: w.qrUrl,
      activationCode: code?.code,
      activationCodeStatus: code?.status,
      claimedAt: w.claimedAt?.toISOString(),
      activatedAt: w.activatedAt?.toISOString(),
      createdAt: w.createdAt.toISOString(),
      updatedAt: w.updatedAt.toISOString(),
    };
  }
}
