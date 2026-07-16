import { UseCase } from "../../use-case";
import { AdminWristbandListDto, AdminWristbandListQuery, AdminWristbandRowDto } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { ActivationCodeRepository } from "@/core/domain/repositories/activation-code-repository";
import { Wristband } from "@/core/domain/entities/wristband";
import { ActivationCode } from "@/core/domain/entities/activation-code";
import { WristbandStatus } from "@/core/domain/enums";

export interface ListAdminWristbandsDependencies {
  wristbandRepository: WristbandRepository;
  activationCodeRepository: ActivationCodeRepository;
}

const VALID_STATUSES = new Set<string>(Object.values(WristbandStatus));

export class ListAdminWristbandsUseCase
  implements UseCase<AdminWristbandListQuery, AdminWristbandListDto>
{
  constructor(private readonly deps: ListAdminWristbandsDependencies) {}

  async execute(query: AdminWristbandListQuery): Promise<AdminWristbandListDto> {
    const pageSize = Math.min(Math.max(query.pageSize, 1), 100);
    const page = Math.max(query.page, 1);
    const status =
      query.status && VALID_STATUSES.has(query.status)
        ? (query.status as WristbandStatus)
        : undefined;

    const { items, total } = await this.deps.wristbandRepository.findAll({
      status,
      search: query.search,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const codes = await this.deps.activationCodeRepository.findByWristbandIds(
      items.map((w) => w.id),
    );
    const codeByWristband = new Map(codes.map((code) => [code.wristbandId, code]));

    return {
      items: items.map((w) => this.toRow(w, codeByWristband.get(w.id))),
      total,
    };
  }

  private toRow(
    w: Wristband,
    activationCode?: ActivationCode,
  ): AdminWristbandRowDto {
    return {
      id: w.id,
      emergencyId: w.emergencyId.value,
      status: w.status,
      profileMode: w.profileMode,
      wearerRole: w.wearerRole,
      wearerLabel: w.wearerLabel,
      activationCode: activationCode?.code,
      activationCodeStatus: activationCode?.status,
      activatedAt: w.activatedAt?.toISOString(),
      createdAt: w.createdAt.toISOString(),
      updatedAt: w.updatedAt.toISOString(),
    };
  }
}
