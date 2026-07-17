import type { SupabaseClient } from "@supabase/supabase-js";
import type { EmergencyProfileRepository } from "@/core/domain/repositories/emergency-profile-repository";
import type { EmergencyProfile } from "@/core/domain/entities/emergency-profile";
import {
  emergencyProfileToDomain,
  emergencyProfileToRow,
} from "../mappers/emergency-profile.mapper";

export class SupabaseEmergencyProfileRepository
  implements EmergencyProfileRepository
{
  constructor(private readonly client: SupabaseClient) {}

  async findByWristbandId(wristbandId: string): Promise<EmergencyProfile | null> {
    const { data, error } = await this.client
      .from("emergency_profiles")
      .select("*")
      .eq("wristband_id", wristbandId)
      .maybeSingle();

    if (error) throw error;
    return data ? emergencyProfileToDomain(data) : null;
  }

  async findByWristbandIds(
    wristbandIds: string[],
  ): Promise<EmergencyProfile[]> {
    if (wristbandIds.length === 0) return [];

    const { data, error } = await this.client
      .from("emergency_profiles")
      .select("*")
      .in("wristband_id", wristbandIds);

    if (error) throw error;
    return (data ?? []).map(emergencyProfileToDomain);
  }

  async save(profile: EmergencyProfile): Promise<void> {
    const { error } = await this.client
      .from("emergency_profiles")
      .upsert(emergencyProfileToRow(profile));

    if (error) throw error;
  }
}
