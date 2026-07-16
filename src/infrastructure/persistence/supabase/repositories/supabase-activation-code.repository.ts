import type { SupabaseClient } from "@supabase/supabase-js";
import { ActivationCodeRepository } from "@/core/domain/repositories/activation-code-repository";
import { ActivationCode } from "@/core/domain/entities/activation-code";
import { ActivationCodeStatus } from "@/core/domain/enums";
import { normalizeActivationCode } from "@/core/domain/value-objects/activation-code-value";
import {
  activationCodeToDomain,
  activationCodeToRow,
} from "../mappers/activation-code.mapper";

export class SupabaseActivationCodeRepository implements ActivationCodeRepository {
  constructor(private readonly client: SupabaseClient) {}

  async findUnusedByCode(code: string): Promise<ActivationCode | null> {
    const normalized = normalizeActivationCode(code);

    const { data, error } = await this.client
      .from("activation_codes")
      .select("*")
      .eq("code", normalized)
      .eq("status", ActivationCodeStatus.UNUSED)
      .maybeSingle();

    if (error) throw error;
    return data ? activationCodeToDomain(data) : null;
  }

  async findUnusedByWristbandId(wristbandId: string): Promise<ActivationCode | null> {
    const { data, error } = await this.client
      .from("activation_codes")
      .select("*")
      .eq("wristband_id", wristbandId)
      .eq("status", ActivationCodeStatus.UNUSED)
      .maybeSingle();

    if (error) throw error;
    return data ? activationCodeToDomain(data) : null;
  }

  async findByWristbandId(wristbandId: string): Promise<ActivationCode | null> {
    const { data, error } = await this.client
      .from("activation_codes")
      .select("*")
      .eq("wristband_id", wristbandId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data ? activationCodeToDomain(data) : null;
  }

  async existsByCode(code: string): Promise<boolean> {
    const normalized = normalizeActivationCode(code);

    const { count, error } = await this.client
      .from("activation_codes")
      .select("id", { count: "exact", head: true })
      .eq("code", normalized);

    if (error) throw error;
    return (count ?? 0) > 0;
  }

  async findByWristbandIds(wristbandIds: string[]): Promise<ActivationCode[]> {
    if (wristbandIds.length === 0) return [];

    const { data, error } = await this.client
      .from("activation_codes")
      .select("*")
      .in("wristband_id", wristbandIds);

    if (error) throw error;
    return (data ?? []).map(activationCodeToDomain);
  }

  async save(code: ActivationCode): Promise<void> {
    const row = activationCodeToRow(code);
    const { error } = await this.client.from("activation_codes").upsert(row);

    if (error) throw error;
  }
}
