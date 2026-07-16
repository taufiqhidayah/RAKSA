import type { SupabaseClient } from "@supabase/supabase-js";
import type { EmergencyContactRepository } from "@/core/domain/repositories/emergency-contact-repository";
import type { EmergencyContact } from "@/core/domain/entities/emergency-contact";
import {
  emergencyContactToDomain,
  emergencyContactToRow,
} from "../mappers/emergency-contact.mapper";

export class SupabaseEmergencyContactRepository
  implements EmergencyContactRepository
{
  constructor(private readonly client: SupabaseClient) {}

  async findByWristbandId(wristbandId: string): Promise<EmergencyContact[]> {
    const { data, error } = await this.client
      .from("emergency_contacts")
      .select("*")
      .eq("wristband_id", wristbandId)
      .order("is_primary", { ascending: false })
      .order("created_at", { ascending: true });

    if (error) throw error;
    return (data ?? []).map(emergencyContactToDomain);
  }

  async save(contact: EmergencyContact): Promise<void> {
    const { error } = await this.client
      .from("emergency_contacts")
      .upsert(emergencyContactToRow(contact));

    if (error) throw error;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.client
      .from("emergency_contacts")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}
