import { ActivationCode } from "@/core/domain/entities/activation-code";
import { ActivationCodeStatus } from "@/core/domain/enums";

export interface ActivationCodeRow {
  id: string;
  wristband_id: string;
  code: string;
  status: string;
  used_by: string | null;
  used_at: string | null;
  expires_at: string | null;
  created_at: string;
}

export function activationCodeToDomain(row: ActivationCodeRow): ActivationCode {
  return ActivationCode.reconstitute({
    id: row.id,
    wristbandId: row.wristband_id,
    code: row.code,
    status: row.status as ActivationCodeStatus,
    usedBy: row.used_by ?? undefined,
    usedAt: row.used_at ? new Date(row.used_at) : undefined,
    expiresAt: row.expires_at ? new Date(row.expires_at) : undefined,
    createdAt: new Date(row.created_at),
  });
}

export function activationCodeToRow(code: ActivationCode): ActivationCodeRow {
  return {
    id: code.id,
    wristband_id: code.wristbandId,
    code: code.code,
    status: code.status,
    used_by: code.usedBy ?? null,
    used_at: code.usedAt?.toISOString() ?? null,
    expires_at: code.expiresAt?.toISOString() ?? null,
    created_at: code.createdAt.toISOString(),
  };
}
