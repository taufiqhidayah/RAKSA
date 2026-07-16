import { EmergencyProfile } from "@/core/domain/entities/emergency-profile";

export interface EmergencyProfileRow {
  id: string;
  wristband_id: string;
  preferred_name: string;
  approximate_age: number | null;
  blood_type: string | null;
  critical_allergies: string | null;
  medical_conditions: string | null;
  important_medications: string | null;
  emergency_notes: string | null;
  reunification_note: string | null;
  disorientation_notes: string | null;
  cognitive_condition_flag: boolean;
  language_hint: string | null;
  is_public_enabled: boolean;
  last_confirmed_at: string | null;
  created_at: string;
  updated_at: string;
}

export function emergencyProfileToDomain(row: EmergencyProfileRow): EmergencyProfile {
  return EmergencyProfile.reconstitute({
    id: row.id,
    wristbandId: row.wristband_id,
    preferredName: row.preferred_name,
    approximateAge: row.approximate_age ?? undefined,
    bloodType: row.blood_type ?? undefined,
    criticalAllergies: row.critical_allergies ?? undefined,
    medicalConditions: row.medical_conditions ?? undefined,
    importantMedications: row.important_medications ?? undefined,
    emergencyNotes: row.emergency_notes ?? undefined,
    reunificationNote: row.reunification_note ?? undefined,
    disorientationNotes: row.disorientation_notes ?? undefined,
    cognitiveConditionFlag: row.cognitive_condition_flag,
    languageHint: row.language_hint ?? undefined,
    isPublicEnabled: row.is_public_enabled,
    lastConfirmedAt: row.last_confirmed_at
      ? new Date(row.last_confirmed_at)
      : undefined,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  });
}

export function emergencyProfileToRow(
  profile: EmergencyProfile,
): EmergencyProfileRow {
  return {
    id: profile.id,
    wristband_id: profile.wristbandId,
    preferred_name: profile.preferredName,
    approximate_age: profile.approximateAge ?? null,
    blood_type: profile.bloodType ?? null,
    critical_allergies: profile.criticalAllergies ?? null,
    medical_conditions: profile.medicalConditions ?? null,
    important_medications: profile.importantMedications ?? null,
    emergency_notes: profile.emergencyNotes ?? null,
    reunification_note: profile.reunificationNote ?? null,
    disorientation_notes: profile.disorientationNotes ?? null,
    cognitive_condition_flag: profile.cognitiveConditionFlag,
    language_hint: profile.languageHint ?? null,
    is_public_enabled: profile.isPublicEnabled,
    last_confirmed_at: profile.lastConfirmedAt?.toISOString() ?? null,
    created_at: profile.createdAt.toISOString(),
    updated_at: profile.updatedAt.toISOString(),
  };
}
