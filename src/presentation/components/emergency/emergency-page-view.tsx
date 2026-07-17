"use client";

import type { PublicEmergencyPageDto } from "@/core/application/dto";
import { ProfileMode } from "@/core/domain/enums";
import {
  Cake,
  ChevronRight,
  Droplet,
  Languages,
  Phone,
  Star,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { RaksaLogo } from "@/presentation/components/brand/raksa-logo";
import { useEffect, useRef, type ReactNode } from "react";

interface EmergencyPageViewProps {
  data: PublicEmergencyPageDto;
}

const sheetCard =
  "rounded-[24px] border border-[#ECE8FF] bg-white shadow-[0_8px_24px_-18px_rgba(67,46,151,0.28)]";

const AVENIR_FONT =
  '"Avenir Next", Avenir, ui-sans-serif, system-ui, sans-serif';

const COLLAPSE_DISTANCE = 220;

export function EmergencyPageView({ data }: EmergencyPageViewProps) {
  const contacts = [...data.contacts].sort(
    (a, b) => Number(b.isPrimary) - Number(a.isPrimary),
  );
  const disclaimer = getDisclaimer(data.profileMode);
  const modeLabel = getModeLabel(data.profileMode);
  const rootRef = useRef<HTMLDivElement>(null);

  // Drive the collapse via a single CSS variable updated on scroll (rAF).
  // Only transform/opacity are animated, so this stays smooth without any
  // React re-renders or custom CSS keyframes.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    let current = 0;
    let target = 0;

    // Ease `current` toward `target` each frame for a smooth, slightly
    // trailing collapse instead of a rigid 1:1 scroll mapping.
    const tick = () => {
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.001) current = target;
      root.style.setProperty("--collapse", current.toFixed(4));
      frame = current === target ? 0 : window.requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = Math.min(Math.max(window.scrollY / COLLAPSE_DISTANCE, 0), 1);
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const heroChips = [
    data.approximateAge !== undefined
      ? { icon: Cake, label: "Age", value: `${data.approximateAge}` }
      : null,
    data.bloodType
      ? { icon: Droplet, label: "Blood type", value: data.bloodType }
      : null,
    data.languageHint
      ? {
          icon: Languages,
          label: "Language",
          value: formatLanguage(data.languageHint),
        }
      : null,
  ].filter(Boolean) as Array<{
    icon: LucideIcon;
    label: string;
    value: string;
  }>;

  const medicalRows = [
    data.criticalAllergies
      ? { label: "Allergies", value: data.criticalAllergies }
      : null,
    data.medicalConditions
      ? { label: "Conditions", value: data.medicalConditions }
      : null,
    data.importantMedications
      ? { label: "Medications", value: data.importantMedications }
      : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  const noteRows = [
    data.profileMode === ProfileMode.CHILD_GUARDIAN && data.reunificationNote
      ? { label: "Reunification", value: data.reunificationNote }
      : null,
    data.profileMode === ProfileMode.ELDERLY_DEPENDENT &&
    (data.disorientationNotes || data.cognitiveConditionFlag)
      ? {
          label: "Support",
          value:
            data.disorientationNotes ??
            "This person may be confused or disoriented.",
        }
      : null,
    data.emergencyNotes
      ? { label: "Notes", value: data.emergencyNotes }
      : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <div ref={rootRef} className="min-h-dvh bg-[#EDE9FE] [--collapse:0]">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center border-b border-[#E4DCFF]/90 bg-[#F5F5F5]/85 backdrop-blur-[14px] opacity-[calc((var(--collapse)-0.55)*3)] [transform:translate3d(0,calc((1-var(--collapse))*-6px),0)] [will-change:opacity,transform]"
        aria-hidden="true"
      >
        <div className="flex w-full max-w-[520px] items-center justify-between gap-3 px-5 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))] min-h-13">
          <p className="m-0 min-w-0 truncate text-base font-bold tracking-[-0.02em] text-[#111827]">
            {data.preferredName}
          </p>
          <RaksaLogo variant="color" height={42} className="shrink-0" />
        </div>
      </div>

      <header className="relative z-0 bg-[#EDE9FE]">
        <div className="mx-auto w-full max-w-[520px] origin-top px-5 pb-8 pt-[max(2.5rem,calc(env(safe-area-inset-top)_+_1.25rem))] opacity-[calc(1-(var(--collapse)*0.85))] [transform:scale(calc(1-(var(--collapse)*0.14)))_translate3d(0,calc(var(--collapse)*-14px),0)] [will-change:transform,opacity]">
          <div className="mb-4 flex min-h-10 items-center justify-center">
            <Link
              href="/"
              aria-label="Open raksa homepage"
              className="flex items-center no-underline transition-opacity hover:opacity-70"
            >
              <RaksaLogo variant="color" height={50} />
            </Link>
          </div>

          <div className="relative flex min-h-[220px] items-end justify-between gap-3">
            <div className="relative z-[1] min-w-0 max-w-[58%] self-center pb-2">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#BE123C] shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
                <span
                  className="size-1.5 rounded-full bg-[#EF4444]"
                  aria-hidden="true"
                />
                Emergency
              </span>
              <h1 className="m-0 text-[clamp(1.85rem,8vw,2.35rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#111827]">
                {data.preferredName}
              </h1>
              <p
                className="mb-0 mt-2 text-[15px] font-medium text-[#6B7280]"
                style={{ fontFamily: AVENIR_FONT }}
              >
                {modeLabel}
              </p>
            </div>

            <div
              className="grid h-[220px] w-40 shrink-0 place-items-center overflow-hidden rounded-[1.75rem] bg-[#D1D5DB] text-[#9CA3AF] max-[380px]:h-[190px] max-[380px]:w-[132px]"
              aria-hidden="true"
            >
              <UserRound size={88} strokeWidth={1.4} />
            </div>
          </div>

          {heroChips.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {heroChips.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
                  aria-label={`${chip.label}: ${chip.value}`}
                >
                  <chip.icon
                    size={14}
                    className="text-[#6D4AFF]"
                    aria-hidden="true"
                  />
                  <span className="font-semibold text-[#111827]">
                    {chip.value}
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <section
        className="relative z-10 mx-auto -mt-4 w-full max-w-[520px] rounded-t-[32px] bg-[#F8F7FF] px-4 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-6 shadow-[0_-12px_40px_-24px_rgba(67,46,151,0.25)]"
        style={{ fontFamily: AVENIR_FONT }}
      >
        <div
          className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-[#DDD6FE]"
          aria-hidden="true"
        />

        {medicalRows.length > 0 && (
          <InfoSection title="Medical information">
            {medicalRows.map((row) => (
              <KeyValueRow key={row.label} label={row.label} value={row.value} />
            ))}
          </InfoSection>
        )}

        {contacts.length > 0 && (
          <section className="mb-5">
            <h2 className="mb-3 mt-0 text-[17px] font-bold text-[#111827]">
              Emergency contact
            </h2>
            <div className={`${sheetCard} divide-y divide-[#F1F0F7]`}>
              {contacts.map((contact) => (
                <a
                  key={`${contact.telUri}-${contact.label}`}
                  href={contact.telUri}
                  className="flex items-center gap-3 px-4 py-3.5 text-inherit no-underline transition-colors hover:bg-[#F8F7FF]"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#E5E7EB] text-[#6B7280]">
                    <UserRound size={22} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="block truncate text-[16px] font-bold text-[#111827]">
                      {contact.label}
                    </strong>
                    <small className="mt-0.5 block text-[13px] text-[#6B7280]">
                      {contact.label === contact.relationship
                        ? "Emergency contact"
                        : contact.relationship}
                    </small>
                  </span>
                  {contact.isPrimary && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#EAFBF2] px-2 py-1 text-[11px] font-semibold text-[#15803D]">
                      <Star size={11} fill="currentColor" aria-hidden="true" />
                      Primary
                    </span>
                  )}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#EDE9FE] text-[#6D4AFF]">
                    <Phone size={16} aria-hidden="true" />
                  </span>
                  <ChevronRight
                    size={18}
                    className="shrink-0 text-[#C4C0D4]"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </section>
        )}

        {noteRows.length > 0 && (
          <InfoSection title="Notes">
            {noteRows.map((row) => (
              <KeyValueRow
                key={row.label}
                label={row.label === "Notes" ? "" : row.label}
                value={row.value}
                stacked
              />
            ))}
          </InfoSection>
        )}

        <footer className="mt-1 border-t border-[#ECEAF3] pt-6 text-center">
          <p className="m-0 text-[13px] font-medium text-[#6B7280]">
            Verified by owner · raksa emergency profile information
          </p>
          <p className="mb-0 mt-1 text-[12px] text-[#9CA3AF]">
            {data.lastConfirmedAt
              ? `Last confirmed ${formatDate(data.lastConfirmedAt)}`
              : "Confirmation date not available"}
          </p>
          <p className="mx-auto mb-0 mt-4 max-w-[420px] text-[12px] leading-relaxed text-[#9CA3AF]">
            {disclaimer}
          </p>
          <Link
            href="/"
            className="mt-5 inline-block text-[12px] font-medium text-[#9CA3AF] no-underline transition-colors hover:text-[#6D4AFF]"
          >
            © 2026 raksa
          </Link>
        </footer>
      </section>
    </div>
  );
}

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-5">
      <h2 className="mb-3 mt-0 text-[17px] font-bold text-[#111827]">{title}</h2>
      <div className={`${sheetCard} divide-y divide-[#F1F0F7]`}>{children}</div>
    </section>
  );
}

function KeyValueRow({
  label,
  value,
  stacked = false,
}: {
  label: string;
  value: string;
  stacked?: boolean;
}) {
  if (stacked) {
    return (
      <div className="px-4 py-3.5">
        {label && (
          <p className="mb-1 mt-0 text-[13px] font-medium text-[#6B7280]">
            {label}
          </p>
        )}
        <p className="mb-0 whitespace-pre-wrap text-[15px] font-semibold leading-relaxed text-[#111827]">
          {value}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3.5">
      <span className="shrink-0 text-[14px] font-medium text-[#6B7280]">{label}</span>
      <span className="text-right text-[14px] font-semibold leading-snug text-[#111827]">
        {value}
      </span>
    </div>
  );
}

function getModeLabel(mode: PublicEmergencyPageDto["profileMode"]): string {
  switch (mode) {
    case ProfileMode.CHILD_GUARDIAN:
      return "Child protection profile";
    case ProfileMode.ELDERLY_DEPENDENT:
      return "Elderly support profile";
    default:
      return "Emergency profile";
  }
}

function getDisclaimer(mode: PublicEmergencyPageDto["profileMode"]): string {
  switch (mode) {
    case ProfileMode.CHILD_GUARDIAN:
      return "This information is provided by a guardian. Verify the pickup person's identity before releasing the child.";
    case ProfileMode.ELDERLY_DEPENDENT:
      return "This information is provided by family and is intended to assist in emergency situations only.";
    default:
      return "This information is provided by the band owner and is not a substitute for professional medical assessment.";
  }
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function formatLanguage(language: string): string {
  return language.replace(/^Bahasa\s+/i, "");
}
