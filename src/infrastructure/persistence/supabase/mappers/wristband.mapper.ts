import { Wristband } from "@/core/domain/entities/wristband";
import { EmergencyId } from "@/core/domain/value-objects/emergency-id";
import { PublicToken } from "@/core/domain/value-objects/public-token";
import {
  ProfileMode,
  WearerRole,
  WristbandStatus,
} from "@/core/domain/enums";

export interface WristbandRow {
  id: string;
  owner_id: string | null;
  emergency_id: string;
  public_token: string;
  status: string;
  profile_mode: string;
  wearer_role: string;
  wearer_label: string;
  notify_on_scan: boolean;
  nfc_url: string;
  qr_url: string;
  claimed_at: string | null;
  activated_at: string | null;
  created_at: string;
  updated_at: string;
}

export function wristbandToDomain(row: WristbandRow): Wristband {
  return Wristband.reconstitute({
    id: row.id,
    ownerId: row.owner_id ?? undefined,
    emergencyId: EmergencyId.create(row.emergency_id),
    publicToken: PublicToken.create(row.public_token),
    status: row.status as WristbandStatus,
    profileMode: row.profile_mode as ProfileMode,
    wearerRole: row.wearer_role as WearerRole,
    wearerLabel: row.wearer_label,
    notifyOnScan: row.notify_on_scan,
    nfcUrl: row.nfc_url,
    qrUrl: row.qr_url,
    claimedAt: row.claimed_at ? new Date(row.claimed_at) : undefined,
    activatedAt: row.activated_at ? new Date(row.activated_at) : undefined,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  });
}

export function wristbandToRow(wristband: Wristband): WristbandRow {
  return {
    id: wristband.id,
    owner_id: wristband.ownerId ?? null,
    emergency_id: wristband.emergencyId.toString(),
    public_token: wristband.publicToken.value,
    status: wristband.status,
    profile_mode: wristband.profileMode,
    wearer_role: wristband.wearerRole,
    wearer_label: wristband.wearerLabel,
    notify_on_scan: wristband.notifyOnScan,
    nfc_url: wristband.nfcUrl,
    qr_url: wristband.qrUrl,
    claimed_at: wristband.claimedAt?.toISOString() ?? null,
    activated_at: wristband.activatedAt?.toISOString() ?? null,
    created_at: wristband.createdAt.toISOString(),
    updated_at: wristband.updatedAt.toISOString(),
  };
}
