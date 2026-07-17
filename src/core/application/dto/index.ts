import { AccessMethod } from "@/core/domain/enums";
import { DeviceType, ProfileMode, WearerRole } from "@/core/domain/enums";

export interface PublicEmergencyContactDto {
  label: string;
  relationship: string;
  telUri: string;
  isPrimary: boolean;
}

export interface PublicEmergencyPageDto {
  profileMode: ProfileMode;
  preferredName: string;
  photoUrl?: string;
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
  /** Optional wearer details captured during the "add family member" flow. */
  wearerRole?: WearerRole;
  wearerLabel?: string;
  notifyOnScan?: boolean;
}

export interface ClaimWristbandOutput {
  wristbandId: string;
  wearerLabel: string;
}

export interface UpdateWristbandWearerInput {
  ownerId: string;
  wristbandId: string;
  wearerRole: WearerRole;
  wearerLabel: string;
  notifyOnScan?: boolean;
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
  deviceType?: string;
  notifyOnScan: boolean;
  activatedAt?: string;
  photoUrl?: string;
}

export interface SetEmergencyPhotoInput {
  ownerId: string;
  wristbandId: string;
  /** Public URL of the uploaded photo, or undefined to clear it. */
  photoUrl?: string;
}

export interface SetWristbandActiveInput {
  ownerId: string;
  wristbandId: string;
  active: boolean;
}

export interface SaveEmergencyProfileInput {
  ownerId: string;
  wristbandId: string;
  preferredName: string;
  approximateAge?: number;
  bloodType?: string;
  criticalAllergies?: string;
  medicalConditions?: string;
  importantMedications?: string;
  emergencyNotes?: string;
  languageHint?: string;
  isPublicEnabled: boolean;
}

export interface EmergencyContactDto {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
  showNameOnPublic: boolean;
}

export interface AddEmergencyContactInput {
  ownerId: string;
  wristbandId: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
  showNameOnPublic: boolean;
}

export interface RemoveEmergencyContactInput {
  ownerId: string;
  wristbandId: string;
  contactId: string;
}

/** Prefill data for the emergency-profile setup page (one owned tag). */
export interface WristbandSetupDto {
  id: string;
  emergencyId: string;
  status: string;
  isActive: boolean;
  wearerLabel: string;
  wearerRole: string;
  profileMode: ProfileMode;
  photoUrl?: string;
  preferredName: string;
  approximateAge?: number;
  bloodType?: string;
  criticalAllergies?: string;
  medicalConditions?: string;
  importantMedications?: string;
  emergencyNotes?: string;
  languageHint?: string;
  isPublicEnabled: boolean;
  contacts: EmergencyContactDto[];
}

export interface ScanActivityDto {
  id: string;
  wearerLabel: string;
  accessMethod: string;
  scannedAt: string;
  locationShared: boolean;
}

export interface ScanTrendPointDto {
  /** UTC day key, e.g. "2026-07-17". */
  date: string;
  count: number;
}

// ── Admin (superadmin tag provisioning) ──

export interface RegisterWristbandInput {
  profileMode?: ProfileMode;
  wearerRole?: WearerRole;
  wearerLabel?: string;
  deviceType?: DeviceType;
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
