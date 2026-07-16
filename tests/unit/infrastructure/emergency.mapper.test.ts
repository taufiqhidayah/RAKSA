import { describe, expect, it } from "vitest";
import {
  emergencyProfileToDomain,
  emergencyProfileToRow,
  type EmergencyProfileRow,
} from "@/infrastructure/persistence/supabase/mappers/emergency-profile.mapper";
import {
  emergencyContactToDomain,
  emergencyContactToRow,
  type EmergencyContactRow,
} from "@/infrastructure/persistence/supabase/mappers/emergency-contact.mapper";

const timestamp = "2026-07-16T10:00:00.000Z";

describe("emergency Supabase mappers", () => {
  it("maps an emergency profile row to domain and back", () => {
    const row: EmergencyProfileRow = {
      id: "profile-1",
      wristband_id: "wristband-1",
      preferred_name: "Alya",
      approximate_age: 8,
      blood_type: null,
      critical_allergies: "Kacang",
      medical_conditions: null,
      important_medications: null,
      emergency_notes: null,
      reunification_note: "Tunggu di pos keamanan",
      disorientation_notes: null,
      cognitive_condition_flag: false,
      language_hint: "Indonesia",
      is_public_enabled: true,
      last_confirmed_at: timestamp,
      created_at: timestamp,
      updated_at: timestamp,
    };

    const domain = emergencyProfileToDomain(row);

    expect(domain.bloodType).toBeUndefined();
    expect(domain.lastConfirmedAt?.toISOString()).toBe(timestamp);
    expect(emergencyProfileToRow(domain)).toEqual(row);
  });

  it("maps a contact row and normalizes its telephone action", () => {
    const row: EmergencyContactRow = {
      id: "contact-1",
      wristband_id: "wristband-1",
      name: "Budi",
      relationship: "Ayah",
      phone: "081234567890",
      is_primary: true,
      show_name_on_public: true,
      created_at: timestamp,
      updated_at: timestamp,
    };

    const domain = emergencyContactToDomain(row);

    expect(domain.phone.toTelUri()).toBe("tel:+6281234567890");
    expect(emergencyContactToRow(domain)).toEqual(row);
  });
});
