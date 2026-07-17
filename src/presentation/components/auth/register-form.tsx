"use client";

import { useActionState } from "react";
import { signUpAction, type ActionResult } from "@/app/(auth)/actions";

const initialState: ActionResult = {};

interface RegisterFormProps {
  activationCode: string;
}

export function RegisterForm({ activationCode }: RegisterFormProps) {
  const [state, formAction, pending] = useActionState(signUpAction, initialState);

  return (
    <form action={formAction} className="auth-form__body">
      <input type="hidden" name="activationCode" value={activationCode} />

      <div className="auth-field">
        <label htmlFor="fullName" className="auth-field__label">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          className="auth-field__input"
          placeholder="Your name"
          required
        />
      </div>

      <div className="auth-field">
        <label htmlFor="registerEmail" className="auth-field__label">
          Email
        </label>
        <input
          id="registerEmail"
          name="email"
          type="email"
          autoComplete="email"
          className="auth-field__input"
          placeholder="name@email.com"
          required
        />
      </div>

      <div className="auth-field">
        <label htmlFor="registerPassword" className="auth-field__label">
          Password
        </label>
        <input
          id="registerPassword"
          name="password"
          type="password"
          autoComplete="new-password"
          className="auth-field__input"
          placeholder="At least 6 characters"
          required
          minLength={6}
        />
      </div>

      {state.error && (
        <p className="auth-form__error" role="alert">
          {state.error}
        </p>
      )}

      <button type="submit" className="auth-btn auth-btn--primary auth-btn--full" disabled={pending}>
        {pending ? "Processing..." : "Create account & claim tag"}
      </button>
    </form>
  );
}
