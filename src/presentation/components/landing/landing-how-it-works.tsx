import { KeyRound, ScanLine, Watch } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./reveal";

const STEPS: {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    number: "01",
    title: "Wear the band",
    text: "Put on a band with an NFC tag, QR code, and Emergency ID always visible on the wrist.",
    icon: Watch,
  },
  {
    number: "02",
    title: "Set up the profile once",
    text: "Create an account, claim the Activation Code from your kit, then fill in the emergency profile and family contacts.",
    icon: KeyRound,
  },
  {
    number: "03",
    title: "Helpers simply scan",
    text: "In an emergency, people nearby just tap the NFC, scan the QR, or type the Emergency ID. The emergency page opens right away.",
    icon: ScanLine,
  },
];

export function LandingHowItWorks() {
  return (
    <section className="bg-canvas py-20 sm:py-28" id="cara-kerja">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-brand-600">How it works</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Up and running in three steps.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            You only set it up once. After that the band does its job, and
            anyone who helps doesn&apos;t need to learn a thing.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block"
          />
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.number} delay={i * 120}>
                  <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-100 bg-white text-brand-600 shadow-[var(--shadow-soft)]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="mt-5 text-3xl font-extrabold text-brand-200">
                      {step.number}
                    </span>
                    <h3 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600 lg:max-w-none">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
