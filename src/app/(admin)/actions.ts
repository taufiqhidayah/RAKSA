"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { DeviceType, ProfileMode, WearerRole } from "@/core/domain/enums";
import { DomainError } from "@/core/domain/errors/domain-errors";
import { AdminWristbandDetailDto, RegisterWristbandOutput } from "@/core/application/dto";
import { getAdminContext } from "@/shared/di/get-admin-context";

export interface RegisterActionState {
  error?: string;
  fieldErrors?: Record<string, string>;
  result?: RegisterWristbandOutput;
}

export interface MutationActionState {
  error?: string;
  success?: boolean;
}

const registerSchema = z.object({
  profileMode: z.nativeEnum(ProfileMode).default(ProfileMode.ADULT_EMERGENCY),
  wearerRole: z.nativeEnum(WearerRole).default(WearerRole.SELF),
  wearerLabel: z.string().trim().max(80, "Label must be at most 80 characters").optional(),
  deviceType: z.nativeEnum(DeviceType).optional(),
});

function mapError(error: unknown): string {
  if (error instanceof DomainError) return error.message;
  return "Something went wrong. Please try again.";
}

export async function registerWristbandAction(
  _prev: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> {
  const parsed = registerSchema.safeParse({
    profileMode: formData.get("profileMode") ?? undefined,
    wearerRole: formData.get("wearerRole") ?? undefined,
    wearerLabel: String(formData.get("wearerLabel") ?? "").trim() || undefined,
    deviceType: formData.get("deviceType") ?? undefined,
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path.join(".")] = issue.message;
    }
    return { error: "Please check your input.", fieldErrors };
  }

  try {
    const { admin } = await getAdminContext();
    const result = await admin.useCases.registerWristband.execute(parsed.data);
    revalidatePath("/admin");
    revalidatePath("/admin/cards");
    return { result };
  } catch (error) {
    return { error: mapError(error) };
  }
}

export interface DetailActionResult {
  error?: string;
  detail?: AdminWristbandDetailDto;
}

export async function getWristbandDetailAction(
  wristbandId: string,
): Promise<DetailActionResult> {
  try {
    const { admin } = await getAdminContext();
    const detail = await admin.useCases.getAdminWristbandDetail.execute(wristbandId);
    return { detail };
  } catch (error) {
    return { error: mapError(error) };
  }
}

export async function revokeWristbandAction(
  _prev: MutationActionState,
  formData: FormData,
): Promise<MutationActionState> {
  const wristbandId = String(formData.get("wristbandId") ?? "").trim();
  if (!wristbandId) {
    return { error: "Tag ID is required." };
  }

  try {
    const { admin } = await getAdminContext();
    await admin.useCases.revokeWristband.execute(wristbandId);
    revalidatePath("/admin");
    revalidatePath("/admin/cards");
    return { success: true };
  } catch (error) {
    return { error: mapError(error) };
  }
}

export async function deleteWristbandAction(
  _prev: MutationActionState,
  formData: FormData,
): Promise<MutationActionState> {
  const wristbandId = String(formData.get("wristbandId") ?? "").trim();
  if (!wristbandId) {
    return { error: "Tag ID is required." };
  }

  try {
    const { admin } = await getAdminContext();
    await admin.useCases.deleteWristband.execute(wristbandId);
    revalidatePath("/admin");
    revalidatePath("/admin/cards");
    return { success: true };
  } catch (error) {
    return { error: mapError(error) };
  }
}
