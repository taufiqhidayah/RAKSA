import type { SupabaseClient } from "@supabase/supabase-js";
import {
  WristbandRepository,
  WristbandListFilter,
  WristbandListResult,
} from "@/core/domain/repositories/wristband-repository";
import { Wristband } from "@/core/domain/entities/wristband";
import { EmergencyId } from "@/core/domain/value-objects/emergency-id";
import { PublicToken } from "@/core/domain/value-objects/public-token";
import { wristbandToDomain, wristbandToRow } from "../mappers/wristband.mapper";

export class SupabaseWristbandRepository implements WristbandRepository {
  constructor(private readonly client: SupabaseClient) {}

  async findById(id: string): Promise<Wristband | null> {
    const { data, error } = await this.client
      .from("wristbands")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    return data ? wristbandToDomain(data) : null;
  }

  async findByOwnerId(ownerId: string): Promise<Wristband[]> {
    const { data, error } = await this.client
      .from("wristbands")
      .select("*")
      .eq("owner_id", ownerId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []).map(wristbandToDomain);
  }

  async findByPublicToken(token: PublicToken): Promise<Wristband | null> {
    const { data, error } = await this.client
      .from("wristbands")
      .select("*")
      .eq("public_token", token.value)
      .maybeSingle();

    if (error) throw error;
    return data ? wristbandToDomain(data) : null;
  }

  async findByEmergencyId(emergencyId: EmergencyId): Promise<Wristband | null> {
    const { data, error } = await this.client
      .from("wristbands")
      .select("*")
      .eq("emergency_id", emergencyId.toString())
      .maybeSingle();

    if (error) throw error;
    return data ? wristbandToDomain(data) : null;
  }

  async save(wristband: Wristband): Promise<void> {
    const row = wristbandToRow(wristband);
    const { error } = await this.client.from("wristbands").upsert(row);

    if (error) throw error;
  }

  async findAll(filter: WristbandListFilter): Promise<WristbandListResult> {
    let query = this.client
      .from("wristbands")
      .select("*", { count: "exact" });

    if (filter.status) {
      query = query.eq("status", filter.status);
    }

    if (filter.search) {
      const term = filter.search.trim().replace(/[%,]/g, "");
      if (term) {
        query = query.or(
          `emergency_id.ilike.%${term}%,wearer_label.ilike.%${term}%`,
        );
      }
    }

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(filter.offset, filter.offset + filter.limit - 1);

    if (error) throw error;

    return {
      items: (data ?? []).map(wristbandToDomain),
      total: count ?? 0,
    };
  }

  async countByStatus(): Promise<Record<string, number>> {
    const { data, error } = await this.client
      .from("wristbands")
      .select("status");

    if (error) throw error;

    return (data ?? []).reduce<Record<string, number>>((acc, row) => {
      const status = (row as { status: string }).status;
      acc[status] = (acc[status] ?? 0) + 1;
      return acc;
    }, {});
  }

  async countActivatedSince(since: Date): Promise<number> {
    const { count, error } = await this.client
      .from("wristbands")
      .select("id", { count: "exact", head: true })
      .gte("activated_at", since.toISOString());

    if (error) throw error;
    return count ?? 0;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.client.from("wristbands").delete().eq("id", id);
    if (error) throw error;
  }
}
