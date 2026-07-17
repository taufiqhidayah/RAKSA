import { ArrowRight, Search } from "lucide-react";
import { LandingLinkButton } from "./landing-btn";
import { Reveal } from "./reveal";

export function LandingCta() {
  return (
    <section className="bg-white px-4 pb-20 pt-4 sm:px-6 sm:pb-28">
      <Reveal className="mx-auto max-w-6xl">
        <div className="landing-grain relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sidebar-top via-sidebar-mid to-sidebar-bot p-8 text-white shadow-[var(--shadow-float)] sm:p-14">
          <div
            aria-hidden
            className="landing-dots pointer-events-none absolute inset-0 text-white/10"
          />
          <div
            aria-hidden
            className="landing-blob pointer-events-none absolute -right-16 -top-16 h-64 w-64 bg-brand-500/30 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Set up the band now,
              <br className="hidden sm:block" /> before you ever need it.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              It takes just a few minutes to activate. Or, if you&apos;re currently
              with someone who needs help, jump straight to emergency lookup.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LandingLinkButton href="/login" variant="solidDark" size="lg">
                Activate band
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </LandingLinkButton>
              <LandingLinkButton href="/lookup" variant="outlineDark" size="lg">
                <Search className="h-4 w-4" />
                Emergency lookup
              </LandingLinkButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
