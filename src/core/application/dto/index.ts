import { AccessMethod } from "@/core/domain/enums";
import { ProfileMode, WearerRole } from "@/core/domain/enums";

export interface PublicEmergencyContactDto {
  label: string;
  relationship: string;
  telUri: string;
  isPrimary: boolean;
}

export interface PublicEmergencyPageDto {
  profileMode: ProfileMode;
  preferredName: string;
  approximateAge?: number;
  bloodType?: string;
  criticalAllergies?: string;
  medicalConditions?: string;
  importantMedications?: string;
  emergencyNotes?: string;
  reunificationNote?: string;
  disorientationNotes?: string;
  cognitiveConditionFlag: boolean;
  languageHint?: string;
  contacts: PublicEmergencyContactDto[];
  alertMessage?: string;
  wristbandLabel: string;
  lastConfirmedAt?: string;
}

export interface ClaimWristbandInput {
  ownerId: string;
  activationCode: string;
}

export interface ClaimWristbandOutput {
  wristbandId: string;
  wearerLabel: string;
}

export interface RecordScanInput {
  publicToken: string;
  accessMethod: AccessMethod;
  userAgent?: string;
  ipHash?: string;
}

export interface RecordScanOutput {
  scanLogId: string;
  shouldNotifyOwner: boolean;
}

export interface ShareLocationInput {
  scanLogId: string;
  publicToken: string;
  latitude: number;
  longitude: number;
  accuracyM?: number;
}

export interface WristbandSummaryDto {
  id: string;
  emergencyId: string;
  status: string;
  profileMode: ProfileMode;
  wearerRole: string;
  wearerLabel: string;
  notifyOnScan: boolean;
  activatedAt?: string;
}

// ── Admin (superadmin tag provisioning) ──

export interface RegisterWristbandInput {
  profileMode?: ProfileMode;
  wearerRole?: WearerRole;
  wearerLabel?: string;
}

export interface RegisterWristbandOutput {
  wristbandId: string;
  emergencyId: string;
  publicToken: string;
  activationCode: string;
  nfcUrl: string;
  qrUrl: string;
}

export interface AdminWristbandRowDto {
  id: string;
  emergencyId: string;
  status: string;
  profileMode: ProfileMode;
  wearerRole: string;
  wearerLabel: string;
  activationCode?: string;
  activationCodeStatus?: string;
  activatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminWristbandListDto {
  items: AdminWristbandRowDto[];
  total: number;
}

export interface AdminWristbandDetailDto extends AdminWristbandRowDto {
  publicToken: string;
  notifyOnScan: boolean;
  nfcUrl: string;
  qrUrl: string;
  claimedAt?: string;
}

export interface AdminStatsDto {
  total: number;
  activatedToday: number;
  pending: number;
  inactive: number;
}

export interface AdminWristbandListQuery {
  status?: string;
  search?: string;
  page: number;
  pageSize: number;
}
