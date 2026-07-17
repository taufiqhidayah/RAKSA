"use client";

import { useActionState, useEffect } from "react";
import {
  verifyActivationCodeAction,
  type ActionResult,
} from "@/app/(auth)/actions";

const initialState: ActionResult = {};

interface VerifyActivationCodeFormProps {
  onVerified: (activationCode: string) => void;
}

export function VerifyActivationCodeForm({ onVerified }: VerifyActivationCodeFormProps) {
  const [state, formAction, pending] = useActionState(
    verifyActivationCodeAction,
    initialState,
  );

  useEffect(() => {
    if (state.activationCode) {
      onVerified(state.activationCode);
    }
  }, [state.activationCode, onVerified]);

  return (
    <form action={formAction} className="auth-form__body">
      <div className="auth-field">
        <label htmlFor="activationCode" className="auth-field__label">
          Activation Code
        </label>
        <input
          id="activationCode"
          name="activationCode"
          type="text"
          className="auth-field__input auth-field__input--code"
          placeholder="Example: A1B2C3"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          required
        />
      </div>

      {state.error && (
        <p className="auth-form__error" role="alert">
          {state.error}
        </p>
      )}

      <button type="submit" className="auth-btn auth-btn--primary auth-btn--full" disabled={pending}>
        {pending ? "Validating..." : "Continue"}
      </button>
    </form>
  );
}
