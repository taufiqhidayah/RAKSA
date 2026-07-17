"use client";

import { useActionState } from "react";
import { claimWristbandAction, type ActionResult } from "@/app/(auth)/actions";

const initialState: ActionResult = {};

export function ClaimActivationForm() {
  const [state, formAction, pending] = useActionState(claimWristbandAction, initialState);

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
        <p className="auth-field__hint">
          Find the activation code inside your tag pack or manual. This code is private and is
          not printed on the tag.
        </p>
      </div>

      {state.error && (
        <p className="auth-form__error" role="alert">
          {state.error}
        </p>
      )}

      <button type="submit" className="auth-btn auth-btn--primary auth-btn--full" disabled={pending}>
        {pending ? "Validating..." : "Claim tag"}
      </button>
    </form>
  );
}
