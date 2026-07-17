"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { WearerRole } from "@/core/domain/enums";
import { DomainError } from "@/core/domain/errors/domain-errors";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { resolvePersistenceClient } from "@/infrastructure/persistence/supabase/client/persistence-client";
import { uploadEmergencyPhoto } from "@/infrastructure/storage/emergency-photo-storage";
import { createAppContainer } from "@/shared/di/container";

export interface FamilyActionState {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: boolean;
}

const addSchema = z.object({
  activationCode: z.string().trim().min(1, "Activation code is required"),
  wearerRole: z.nativeEnum(WearerRole),
  wearerLabel: z
    .string()
    .trim()
    .min(1, "Member name is required")
    .max(80, "Name must be at most 80 characters"),
  notifyOnScan: z.boolean(),
});

const editSchema = z.object({
  wristbandId: z.string().trim().min(1, "Invalid tag"),
  wearerRole: z.nativeEnum(WearerRole),
  wearerLabel: z
    .string()
    .trim()
    .min(1, "Member name is required")
    .max(80, "Name must be at most 80 characters"),
  notifyOnScan: z.boolean(),
});

function toFieldErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    fieldErrors[issue.path.join(".")] = issue.message;
  }
  return fieldErrors;
}

function mapError(error: unknown): string {
  if (error instanceof DomainError) return error.message;
  return "Something went wrong. Please try again.";
}

/**
 * Adds a family member by claiming their tag and setting who wears it
 * (self / child / elderly parent) plus the display name.
 */
export async function addFamilyMemberAction(
  _prev: FamilyActionState,
  formData: FormData,
): Promise<FamilyActionState> {
  const parsed = addSchema.safeParse({
    activationCode: String(formData.get("activationCode") ?? ""),
    wearerRole: formData.get("wearerRole") ?? undefined,
    wearerLabel: String(formData.get("wearerLabel") ?? ""),
    notifyOnScan: formData.get("notifyOnScan") != null,
  });

  if (!parsed.success) {
    return { error: "Please check your input.", fieldErrors: toFieldErrors(parsed.error) };
  }

  const supabase = await createSupabaseServerClient();
  const { authService, useCases } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    return { error: "Please sign in first." };
  }

  try {
    await useCases.claimWristband.execute({
      ownerId: user.id,
      activationCode: parsed.data.activationCode,
      wearerRole: parsed.data.wearerRole,
      wearerLabel: parsed.data.wearerLabel,
      notifyOnScan: parsed.data.notifyOnScan,
    });
  } catch (error) {
    return { error: mapError(error) };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

/** Edits an existing family member's role, name, and scan-notification setting. */
export async function updateFamilyMemberAction(
  _prev: FamilyActionState,
  formData: FormData,
): Promise<FamilyActionState> {
  const parsed = editSchema.safeParse({
    wristbandId: String(formData.get("wristbandId") ?? ""),
    wearerRole: formData.get("wearerRole") ?? undefined,
    wearerLabel: String(formData.get("wearerLabel") ?? ""),
    notifyOnScan: formData.get("notifyOnScan") != null,
  });

  if (!parsed.success) {
    return { error: "Please check your input.", fieldErrors: toFieldErrors(parsed.error) };
  }

  const supabase = await createSupabaseServerClient();
  const { authService, useCases } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    return { error: "Please sign in first." };
  }

  try {
    await useCases.updateWristbandWearer.execute({
      ownerId: user.id,
      wristbandId: parsed.data.wristbandId,
      wearerRole: parsed.data.wearerRole,
      wearerLabel: parsed.data.wearerLabel,
      notifyOnScan: parsed.data.notifyOnScan,
    });
  } catch (error) {
    return { error: mapError(error) };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

/** Uploads a wearer photo for an owned tag; it shows on the public emergency page. */
export async function uploadFamilyPhotoAction(
  _prev: FamilyActionState,
  formData: FormData,
): Promise<FamilyActionState> {
  const wristbandId = String(formData.get("wristbandId") ?? "").trim();
  const file = formData.get("photo");

  if (!wristbandId) {
    return { error: "Invalid tag." };
  }
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Please select a photo file first." };
  }
  if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
    return { error: "Photo must be JPG, PNG, or WEBP." };
  }
  if (file.size > MAX_PHOTO_BYTES) {
    return { error: "Photo size must be at most 5 MB." };
  }

  const supabase = await createSupabaseServerClient();
  const { authService, useCases } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    return { error: "Please sign in first." };
  }

  try {
    const db = resolvePersistenceClient(supabase);
    const photoUrl = await uploadEmergencyPhoto(db, wristbandId, file);
    await useCases.setEmergencyPhoto.execute({
      ownerId: user.id,
      wristbandId,
      photoUrl,
    });
  } catch (error) {
    if (error instanceof DomainError) {
      return { error: error.message };
    }
    const message = error instanceof Error ? error.message : "";
    return {
      error: message
        ? `Failed to upload photo: ${message}`
        : "Failed to upload photo. Ensure size is < 5 MB and format is JPG/PNG/WEBP.",
    };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

const setupSchema = z.object({
  wristbandId: z.string().trim().min(1, "Invalid tag"),
  preferredName: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(80, "Name must be at most 80 characters"),
  approximateAge: z.number().int().min(0).max(150).optional(),
  bloodType: z.string().trim().max(12).optional(),
  criticalAllergies: z.string().trim().max(500).optional(),
  medicalConditions: z.string().trim().max(500).optional(),
  importantMedications: z.string().trim().max(500).optional(),
  emergencyNotes: z.string().trim().max(1000).optional(),
  languageHint: z.string().trim().max(80).optional(),
  isPublicEnabled: z.boolean(),
  isActive: z.boolean(),
});

function emptyToUndefined(value: FormDataEntryValue | null): string | undefined {
  const s = String(value ?? "").trim();
  return s === "" ? undefined : s;
}

/** Saves the emergency profile for an owned tag and sets its active state. */
export async function saveSetupAction(
  _prev: FamilyActionState,
  formData: FormData,
): Promise<FamilyActionState> {
  const ageRaw = String(formData.get("approximateAge") ?? "").trim();
  const parsed = setupSchema.safeParse({
    wristbandId: String(formData.get("wristbandId") ?? ""),
    preferredName: String(formData.get("preferredName") ?? ""),
    approximateAge: ageRaw === "" ? undefined : Number(ageRaw),
    bloodType: emptyToUndefined(formData.get("bloodType")),
    criticalAllergies: emptyToUndefined(formData.get("criticalAllergies")),
    medicalConditions: emptyToUndefined(formData.get("medicalConditions")),
    importantMedications: emptyToUndefined(formData.get("importantMedications")),
    emergencyNotes: emptyToUndefined(formData.get("emergencyNotes")),
    languageHint: emptyToUndefined(formData.get("languageHint")),
    isPublicEnabled: formData.get("isPublicEnabled") != null,
    isActive: formData.get("isActive") != null,
  });

  if (!parsed.success) {
    return { error: "Please check your input.", fieldErrors: toFieldErrors(parsed.error) };
  }

  const supabase = await createSupabaseServerClient();
  const { authService, useCases } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    return { error: "Please sign in first." };
  }

  try {
    await useCases.saveEmergencyProfile.execute({
      ownerId: user.id,
      wristbandId: parsed.data.wristbandId,
      preferredName: parsed.data.preferredName,
      approximateAge: parsed.data.approximateAge,
      bloodType: parsed.data.bloodType,
      criticalAllergies: parsed.data.criticalAllergies,
      medicalConditions: parsed.data.medicalConditions,
      importantMedications: parsed.data.importantMedications,
      emergencyNotes: parsed.data.emergencyNotes,
      languageHint: parsed.data.languageHint,
      isPublicEnabled: parsed.data.isPublicEnabled,
    });
    await useCases.setWristbandActive.execute({
      ownerId: user.id,
      wristbandId: parsed.data.wristbandId,
      active: parsed.data.isActive,
    });
  } catch (error) {
    return { error: mapError(error) };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

/** Toggles a tag active/inactive (controls public page visibility). */
export async function setTagActiveAction(
  _prev: FamilyActionState,
  formData: FormData,
): Promise<FamilyActionState> {
  const wristbandId = String(formData.get("wristbandId") ?? "").trim();
  const active = String(formData.get("active") ?? "") === "true";

  if (!wristbandId) {
    return { error: "Invalid tag." };
  }

  const supabase = await createSupabaseServerClient();
  const { authService, useCases } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    return { error: "Please sign in first." };
  }

  try {
    await useCases.setWristbandActive.execute({
      ownerId: user.id,
      wristbandId,
      active,
    });
  } catch (error) {
    return { error: mapError(error) };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

const addContactSchema = z.object({
  wristbandId: z.string().trim().min(1, "Invalid tag"),
  name: z
    .string()
    .trim()
    .min(1, "Contact name is required")
    .max(80, "Name must be at most 80 characters"),
  relationship: z
    .string()
    .trim()
    .min(1, "Relationship is required")
    .max(40, "Relationship must be at most 40 characters"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(20, "Phone number must be at most 20 characters"),
  isPrimary: z.boolean(),
  showNameOnPublic: z.boolean(),
});

/** Adds an emergency contact to an owned tag. */
export async function addContactAction(
  _prev: FamilyActionState,
  formData: FormData,
): Promise<FamilyActionState> {
  const parsed = addContactSchema.safeParse({
    wristbandId: String(formData.get("wristbandId") ?? ""),
    name: String(formData.get("name") ?? ""),
    relationship: String(formData.get("relationship") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    isPrimary: formData.get("isPrimary") != null,
    showNameOnPublic: formData.get("showNameOnPublic") != null,
  });

  if (!parsed.success) {
    return { error: "Please check your input.", fieldErrors: toFieldErrors(parsed.error) };
  }

  const supabase = await createSupabaseServerClient();
  const { authService, useCases } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    return { error: "Please sign in first." };
  }

  try {
    await useCases.addEmergencyContact.execute({
      ownerId: user.id,
      wristbandId: parsed.data.wristbandId,
      name: parsed.data.name,
      relationship: parsed.data.relationship,
      phone: parsed.data.phone,
      isPrimary: parsed.data.isPrimary,
      showNameOnPublic: parsed.data.showNameOnPublic,
    });
  } catch (error) {
    return { error: mapError(error) };
  }

  revalidatePath("/setup");
  revalidatePath("/dashboard");
  return { success: true };
}

/** Removes an emergency contact from an owned tag. */
export async function removeContactAction(
  _prev: FamilyActionState,
  formData: FormData,
): Promise<FamilyActionState> {
  const wristbandId = String(formData.get("wristbandId") ?? "").trim();
  const contactId = String(formData.get("contactId") ?? "").trim();

  if (!wristbandId || !contactId) {
    return { error: "Invalid contact." };
  }

  const supabase = await createSupabaseServerClient();
  const { authService, useCases } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    return { error: "Please sign in first." };
  }

  try {
    await useCases.removeEmergencyContact.execute({
      ownerId: user.id,
      wristbandId,
      contactId,
    });
  } catch (error) {
    return { error: mapError(error) };
  }

  revalidatePath("/setup");
  revalidatePath("/dashboard");
  return { success: true };
}

/** Clears the wearer photo for an owned tag. */
export async function removeFamilyPhotoAction(
  _prev: FamilyActionState,
  formData: FormData,
): Promise<FamilyActionState> {
  const wristbandId = String(formData.get("wristbandId") ?? "").trim();
  if (!wristbandId) {
    return { error: "Invalid tag." };
  }

  const supabase = await createSupabaseServerClient();
  const { authService, useCases } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    return { error: "Please sign in first." };
  }

  try {
    await useCases.setEmergencyPhoto.execute({
      ownerId: user.id,
      wristbandId,
      photoUrl: undefined,
    });
  } catch (error) {
    return { error: mapError(error) };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
