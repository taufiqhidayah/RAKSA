import { EmergencyContact } from "@/core/domain/entities/emergency-contact";
import { PhoneNumber } from "@/core/domain/value-objects/phone-number";

export interface EmergencyContactRow {
  id: string;
  wristband_id: string;
  name: string;
  relationship: string;
  phone: string;
  is_primary: boolean;
  show_name_on_public: boolean;
  created_at: string;
  updated_at: string;
}

export function emergencyContactToDomain(row: EmergencyContactRow): EmergencyContact {
  return EmergencyContact.reconstitute({
    id: row.id,
    wristbandId: row.wristband_id,
    name: row.name,
    relationship: row.relationship,
    phone: PhoneNumber.create(row.phone),
    isPrimary: row.is_primary,
    showNameOnPublic: row.show_name_on_public,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  });
}

export function emergencyContactToRow(
  contact: EmergencyContact,
): EmergencyContactRow {
  return {
    id: contact.id,
    wristband_id: contact.wristbandId,
    name: contact.name,
    relationship: contact.relationship,
    phone: contact.phone.value,
    is_primary: contact.isPrimary,
    show_name_on_public: contact.showNameOnPublic,
    created_at: contact.createdAt.toISOString(),
    updated_at: contact.updatedAt.toISOString(),
  };
}
