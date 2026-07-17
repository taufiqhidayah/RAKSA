"use server";

import { redirect } from "next/navigation";
import {
  DomainError,
  InvalidActivationCodeError,
  ValidationError,
} from "@/core/domain/errors/domain-errors";
import {
  isValidActivationCodeFormat,
  normalizeActivationCode,
} from "@/core/domain/value-objects/activation-code-value";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { resolvePersistenceClient } from "@/infrastructure/persistence/supabase/client/persistence-client";
import { SupabaseActivationCodeRepository } from "@/infrastructure/persistence/supabase/repositories/supabase-activation-code.repository";
import { createAppContainer } from "@/shared/di/container";

export interface ActionResult {
  error?: string;
  activationCode?: string;
}

async function assertValidUnusedCode(
  activationCode: string,
): Promise<string> {
  const normalized = normalizeActivationCode(activationCode);

  if (!normalized) {
    throw new ValidationError("Activation code is required", "activationCode");
  }

  if (!isValidActivationCodeFormat(normalized)) {
    throw new InvalidActivationCodeError("Invalid activation code format");
  }

  const supabase = await createSupabaseServerClient();
  const db = resolvePersistenceClient(supabase);
  const activationCodeRepository = new SupabaseActivationCodeRepository(db);
  const record = await activationCodeRepository.findUnusedByCode(normalized);

  if (!record) {
    throw new InvalidActivationCodeError(
      "Invalid or already used activation code",
    );
  }

  return normalized;
}

export async function verifyActivationCodeAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const activationCode = String(formData.get("activationCode") ?? "").trim();

  try {
    const normalized = await assertValidUnusedCode(activationCode);
    return { activationCode: normalized };
  } catch (error) {
    if (error instanceof DomainError) {
      return { error: error.message };
    }

    return { error: "Something went wrong. Please try again." };
  }
}

export async function signInAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Incorrect email or password." };
  }

  const redirectTo = String(formData.get("redirect") ?? "").trim();
  redirect(redirectTo || "/dashboard");
}

export async function signUpAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const activationCode = String(formData.get("activationCode") ?? "").trim();

  if (!fullName || !email || !password) {
    return { error: "Name, email, and password are required." };
  }

  if (!activationCode) {
    return { error: "Activation code must be verified first." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  try {
    await assertValidUnusedCode(activationCode);
  } catch (error) {
    if (error instanceof DomainError) {
      return { error: error.message };
    }

    return { error: "Invalid activation code." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  if (!data.user) {
    return { error: "Failed to create account. Please try again." };
  }

  const db = resolvePersistenceClient(supabase);
  const { error: profileError } = await db.from("profiles").upsert({
    id: data.user.id,
    full_name: fullName,
    display_name: fullName,
  });

  if (profileError) {
    return { error: "Account created but profile failed to save. Try signing in again." };
  }

  const { useCases } = createAppContainer(supabase);

  try {
    const result = await useCases.claimWristband.execute({
      ownerId: data.user.id,
      activationCode,
    });

    redirect(`/setup?wristband=${result.wristbandId}`);
  } catch (claimError) {
    if (claimError instanceof DomainError) {
      return { error: claimError.message };
    }

    throw claimError;
  }
}

export async function claimWristbandAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const activationCode = String(formData.get("activationCode") ?? "").trim();

  if (!activationCode) {
    return { error: "Activation code is required." };
  }

  const supabase = await createSupabaseServerClient();
  const { authService, useCases } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    return { error: "Please sign in first." };
  }

  try {
    const result = await useCases.claimWristband.execute({
      ownerId: user.id,
      activationCode,
    });

    redirect(`/setup?wristband=${result.wristbandId}`);
  } catch (error) {
    if (error instanceof DomainError) {
      return { error: error.message };
    }

    throw error;
  }
}
