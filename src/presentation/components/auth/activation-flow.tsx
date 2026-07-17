"use client";

import { useState } from "react";
import Link from "next/link";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { VerifyActivationCodeForm } from "./verify-activation-code-form";

interface ActivationFlowProps {
  redirectTo?: string;
  initialMode?: "login" | "register";
}

function ActivationSteps({ currentStep }: { currentStep: 1 | 2 }) {
  const steps = [
    { number: 1, label: "Activation Code" },
    { number: 2, label: "Create account" },
  ] as const;

  return (
    <ol className="auth-steps">
      {steps.map((step) => (
        <li
          key={step.number}
          className={`auth-steps__item${
            step.number === currentStep
              ? " auth-steps__item--active"
              : step.number < currentStep
                ? " auth-steps__item--done"
                : ""
          }`}
        >
          <span className="auth-steps__number">{step.number}</span>
          <span className="auth-steps__label">{step.label}</span>
        </li>
      ))}
    </ol>
  );
}

export function ActivationFlow({ redirectTo, initialMode = "login" }: ActivationFlowProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [verifiedCode, setVerifiedCode] = useState<string | null>(null);

  function switchToRegister() {
    setMode("register");
    setVerifiedCode(null);
  }

  function switchToLogin() {
    setMode("login");
    setVerifiedCode(null);
  }

  return (
    <div className="auth-form">
      <div className="auth-form__tabs">
        <button
          type="button"
          className={`auth-form__tab${mode === "login" ? " auth-form__tab--active" : ""}`}
          onClick={switchToLogin}
        >
          Sign in
        </button>
        <button
          type="button"
          className={`auth-form__tab${mode === "register" ? " auth-form__tab--active" : ""}`}
          onClick={switchToRegister}
        >
          Sign up
        </button>
      </div>

      {mode === "login" && (
        <>
          <LoginForm redirectTo={redirectTo} />
          <p className="auth-form__hint">
            Don&apos;t have an account?{" "}
            <button type="button" className="auth-link-btn" onClick={switchToRegister}>
              Sign up with activation code
            </button>
          </p>
        </>
      )}

      {mode === "register" && (
        <>
          <ActivationSteps currentStep={verifiedCode ? 2 : 1} />

          {!verifiedCode ? (
            <VerifyActivationCodeForm onVerified={setVerifiedCode} />
          ) : (
            <>
              <div className="auth-verified-code">
                <span className="auth-verified-code__label">Activation code verified</span>
                <code className="auth-verified-code__value">{verifiedCode}</code>
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => setVerifiedCode(null)}
                >
                  Change code
                </button>
              </div>

              <RegisterForm activationCode={verifiedCode} />
            </>
          )}

          <p className="auth-form__hint">
            Already have an account?{" "}
            <button type="button" className="auth-link-btn" onClick={switchToLogin}>
              Sign in here
            </button>
          </p>

          <p className="auth-form__footer">
            Want to add a tag to an existing account?{" "}
            <Link href="/claim" className="auth-link">
              Claim a new tag
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
