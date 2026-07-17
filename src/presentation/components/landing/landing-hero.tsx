import { ArrowRight, Nfc, Phone, QrCode, Search } from "lucide-react";
import { LandingLinkButton } from "./landing-btn";
import { Reveal } from "./reveal";

export function LandingHero() {
  return (
    <section className="landing-grain relative overflow-hidden bg-gradient-to-b from-sidebar-top via-sidebar-mid to-sidebar-bot pt-28 text-white sm:pt-32">
      <div
        aria-hidden
        className="landing-dots pointer-events-none absolute inset-0 text-white/10"
      />
      <div
        aria-hidden
        className="landing-blob pointer-events-none absolute -right-20 top-10 h-80 w-80 bg-brand-500/30 blur-3xl"
      />
      <div
        aria-hidden
        className="landing-blob pointer-events-none absolute -left-24 bottom-0 h-80 w-80 bg-fuchsia-500/20 blur-3xl"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28">
        <div>
          <Reveal
            as="span"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur"
          >
            <Nfc className="h-3.5 w-3.5 text-brand-300" />
            NFC &amp; QR wearable · built by the raksa team
          </Reveal>

          <Reveal
            as="h1"
            delay={80}
            className="mt-6 text-[2.5rem] font-extrabold leading-[1.06] tracking-tight sm:text-[3.4rem]"
          >
            Help people around you
            <br className="hidden sm:block" /> reach your family,
            <br className="hidden sm:block" />{" "}
            <span className="text-brand-300">even when you can&apos;t speak.</span>
          </Reveal>

          <Reveal
            as="p"
            delay={160}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Collapsing on the street, a child lost in a mall, an elderly parent
            who forgot the way home. Whoever finds them just taps their phone on
            the band or scans the QR. The essentials show up and family can be
            called right away. No need to unlock the person&apos;s phone, no app
            to install.
          </Reveal>

          <Reveal delay={240} className="mt-9 flex flex-wrap items-center gap-3">
            <LandingLinkButton href="/login" variant="onDark" size="lg">
              Activate my band
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </LandingLinkButton>
            <LandingLinkButton href="/lookup" variant="outlineDark" size="lg">
              <Search className="h-4 w-4" />
              I found someone
            </LandingLinkButton>
          </Reveal>

          <Reveal
            delay={320}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/55"
          >
            <span className="inline-flex items-center gap-2">
              <Nfc className="h-4 w-4 text-brand-300" /> Tap (NFC)
            </span>
            <span className="inline-flex items-center gap-2">
              <QrCode className="h-4 w-4 text-brand-300" /> Scan QR
            </span>
            <span className="inline-flex items-center gap-2">
              <Search className="h-4 w-4 text-brand-300" /> Enter Emergency ID
            </span>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto w-full max-w-sm">
          <HeroMockup />
        </Reveal>
      </div>

      <div className="pointer-events-none h-16 bg-gradient-to-b from-transparent to-canvas sm:h-20" />
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="relative">
      <div className="landing-float-x absolute -left-6 top-8 z-20 hidden rounded-2xl border border-white/10 bg-white/95 p-3 shadow-[var(--shadow-pop)] sm:block">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Nfc className="h-5 w-5" />
            <span className="landing-ring absolute inset-0 rounded-xl border-2 border-brand-400" />
          </span>
          <div className="leading-tight">
            <p className="text-[11px] font-semibold text-slate-900">Phone tapped</p>
            <p className="text-[10px] text-slate-400">Opening emergency page…</p>
          </div>
        </div>
      </div>

      <div
        className="landing-float absolute -right-4 bottom-14 z-20 hidden rounded-2xl border border-white/10 bg-white/95 p-3 shadow-[var(--shadow-pop)] sm:block"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <QrCode className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="text-[11px] font-semibold text-slate-900">Family notified</p>
            <p className="text-[10px] text-slate-400">with location</p>
          </div>
        </div>
      </div>

      <div className="landing-float relative z-10 mx-auto w-[280px] rounded-[2.5rem] border border-white/10 bg-slate-950/60 p-2.5 shadow-[var(--shadow-float)] backdrop-blur">
        <div className="relative overflow-hidden rounded-[2rem] bg-white">
          <span className="landing-scanline absolute left-4 right-4 z-20 h-px bg-brand-400/70 shadow-[0_0_12px_2px_rgb(139_92_246_/_0.6)]" />

          <div className="bg-gradient-to-br from-brand-600 to-brand-800 px-5 pb-5 pt-6 text-white">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              Emergency Page
            </div>
            <p className="mt-3 text-lg font-bold leading-tight">Budi Santoso</p>
            <p className="text-xs text-brand-100">Emergency ID · GS-7X2K9</p>
          </div>

          <div className="space-y-3 p-4">
            <div className="rounded-xl border border-rose-100 bg-rose-50/70 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-rose-500">
                Critical allergies
              </p>
              <p className="mt-0.5 text-sm font-medium text-slate-800">
                Penicillin · Peanuts
              </p>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_-10px_rgb(124_58_237_/_0.8)]">
              <Phone className="h-4 w-4" />
              Call family
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700">
              Call 112
            </button>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
              <span className="text-[11px] text-slate-500">Share location with family</span>
              <span className="flex h-4 w-7 items-center rounded-full bg-brand-500 p-0.5">
                <span className="ml-auto h-3 w-3 rounded-full bg-white" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
