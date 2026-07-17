"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ActivationFlow } from "./activation-flow";
import { ClaimActivationForm } from "./claim-activation-form";
import { AuthMedia } from "./auth-media";
import { RaksaLogo } from "@/presentation/components/brand/raksa-logo";

interface ActivationStepsProps {
  currentStep: 1 | 2 | 3;
}

function ActivationSteps({ currentStep }: ActivationStepsProps) {
  const steps = [
    { number: 1, label: "Activation Code" },
    { number: 2, label: "Sign in / Sign up" },
    { number: 3, label: "Profile setup" },
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

function AuthBrand() {
  return (
    <Link href="/" className="auth-brand" aria-label="raksa">
      <RaksaLogo variant="color" height={80} />
    </Link>
  );
}

interface ActivationPageViewProps {
  isAuthenticated: boolean;
  userEmail?: string;
  redirectTo?: string;
  variant?: "full" | "claim-only";
}

export function ActivationPageView({
  isAuthenticated,
  userEmail,
  redirectTo,
  variant = "full",
}: ActivationPageViewProps) {
  const showClaim = isAuthenticated;
  // The two-step mobile flow (welcome → form) only applies to the login case.
  const twoStep = !showClaim && variant === "full";
  const [mobileStep, setMobileStep] = useState<"intro" | "form">("intro");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  function openForm(mode: "login" | "register") {
    setAuthMode(mode);
    setMobileStep("form");
  }

  // Title/description follow the chosen mode once the user is on the mobile
  // form screen; the welcome (intro) and desktop layouts keep the generic copy.
  const onMobileForm = twoStep && mobileStep === "form";
  const title = onMobileForm
    ? authMode === "login"
      ? "Sign in"
      : "Sign up"
    : variant === "claim-only"
      ? "Claim tag"
      : "Activate tag";
  const description = showClaim
    ? "Enter the activation code from your new tag pack to link it to your account."
    : onMobileForm
      ? authMode === "login"
        ? "Sign in to your account to manage emergency tags."
        : "Create a new account with the activation code from your tag pack."
      : "Sign in to an existing account, or sign up with the activation code from your tag pack.";

  return (
    <div
      className={`auth-shell${twoStep ? " auth-shell--stepped" : ""}`}
      data-step={twoStep ? mobileStep : undefined}
    >
      <main className="auth-panel">
        <div className="auth-panel__inner">
          <div className="auth-brand-row">
            {twoStep && (
              <button
                type="button"
                className="auth-back"
                onClick={() => setMobileStep("intro")}
                aria-label="Back"
              >
                <ChevronLeft size={18} strokeWidth={2.4} />
              </button>
            )}
            <AuthBrand />
            {isAuthenticated && userEmail && (
              <span className="auth-panel__user">{userEmail}</span>
            )}
          </div>

          <div className="auth-panel__body">
            <div className="auth-intro">
              <h1 className="auth-intro__title">{title}</h1>
              <p className="auth-intro__desc">{description}</p>
            </div>

            {twoStep && (
              <div className="auth-intro-cta">
                <button
                  type="button"
                  className="auth-btn auth-btn--primary auth-btn--full"
                  onClick={() => openForm("login")}
                >
                  Sign in to your account
                </button>
                <button
                  type="button"
                  className="auth-btn auth-btn--outline auth-btn--full"
                  onClick={() => openForm("register")}
                >
                  Sign up with activation code
                </button>
              </div>
            )}

            {twoStep && (
              <div className="auth-form-region">
                <ActivationFlow
                  key={authMode}
                  initialMode={authMode}
                  redirectTo={redirectTo}
                />
              </div>
            )}

            {showClaim && variant === "full" && (
              <ActivationSteps currentStep={2} />
            )}

            {showClaim && (
              <>
                <ClaimActivationForm />
                <div className="auth-card__info">
                  <h2 className="auth-card__info-title">After a successful claim</h2>
                  <ul className="auth-card__info-list">
                    <li>Choose a profile mode (yourself, child, or elderly)</li>
                    <li>Fill in emergency info and family contacts</li>
                    <li>Review the public page, then activate your tag</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <AuthMedia />
    </div>
  );
}
