import { Baby, HeartPulse, MapPinned } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./reveal";

const VIGNETTES: {
  icon: LucideIcon;
  moment: string;
  headline: string;
  body: string;
  tint: string;
}[] = [
  {
    icon: HeartPulse,
    moment: "On the street, late afternoon",
    headline: "Collapsed, unconscious.",
    body: "Their phone is locked. A crowd gathers but no one knows who to call. One tap on the band, and allergies plus family numbers appear instantly.",
    tint: "bg-rose-50 text-rose-600",
  },
  {
    icon: Baby,
    moment: "In a crowded mall",
    headline: "A five-year-old gets separated.",
    body: "She's crying and doesn't know anyone's number. Staff scan her band, and her parents are called that very second, with the location attached.",
    tint: "bg-brand-50 text-brand-600",
  },
  {
    icon: MapPinned,
    moment: "Two blocks from home",
    headline: "An elderly man forgets the way back.",
    body: "Confused and unable to explain his address. A neighbor scans the band, calls his family, and stays with him until they arrive.",
    tint: "bg-sky-50 text-sky-600",
  },
];

export function LandingStory() {
  return (
    <section className="bg-canvas py-20 sm:py-28" id="cerita">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold text-brand-600">Why it matters</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Emergencies never give you a warning.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Three situations that can happen to anyone. People nearby usually
            want to help, but often don&apos;t know who to call or how.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
          {VIGNETTES.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal
                key={v.headline}
                delay={i * 120}
                className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-slate-200/80 bg-white p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-pop)]"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${v.tint}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-5 text-xs font-medium uppercase tracking-wide text-slate-400">
                  {v.moment}
                </p>
                <h3 className="mt-1.5 text-xl font-bold leading-snug text-slate-900">
                  {v.headline}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {v.body}
                </p>
                <span className="mt-6 h-1 w-10 rounded-full bg-brand-200 transition-all duration-300 group-hover:w-16 group-hover:bg-brand-500" />
              </Reveal>
            );
          })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
