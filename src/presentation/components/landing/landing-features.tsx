import {
  BellRing,
  EyeOff,
  Layers,
  MapPin,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./reveal";

const FEATURES: {
  icon: LucideIcon;
  title: string;
  text: string;
}[] = [
  {
    icon: EyeOff,
    title: "Private data stays private",
    text: "Helpers only see what they need to help: allergies, medical conditions, and a button to call family. Address, ID number, and other details never show up.",
  },
  {
    icon: ScanLine,
    title: "Opens on any phone",
    text: "Tap the NFC, scan the QR, or type the Emergency ID in a browser. One of them is bound to work.",
  },
  {
    icon: BellRing,
    title: "You find out first",
    text: "Every time someone scans your child's or parent's band, the notification comes straight to you, with the time and date.",
  },
  {
    icon: MapPin,
    title: "Location only when it's needed",
    text: "Helpers can choose to share their location right then. Nothing tracks quietly in the background.",
  },
  {
    icon: Layers,
    title: "One account for the whole household",
    text: "Manage your band, your kids', and your parents' from the same dashboard. No separate account for each person.",
  },
  {
    icon: ShieldCheck,
    title: "Lost it? Switch it off instantly",
    text: "Just deactivate it from the dashboard and that band's emergency page goes blank at once. Turn it back on whenever you find it.",
  },
];

export function LandingFeatures() {
  return (
    <section className="bg-white py-20 sm:py-28" id="keunggulan">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-semibold text-brand-600">What we care about</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Help fast,
            <br /> guard the data.
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-600">
            We hold back from showing data that isn&apos;t needed. The emergency
            page only surfaces the things that genuinely help a responder.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-canvas px-4 py-2 text-sm font-medium text-slate-600">
            <ShieldCheck className="h-4 w-4 text-brand-600" />
            Privacy-first from day one
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ul className="border-t border-slate-200/80">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Reveal
                as="li"
                key={feature.title}
                delay={i * 70}
                className="group relative border-b border-slate-200/80"
              >
                <span className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-brand-500 transition-transform duration-300 group-hover:scale-y-100" />
                <div className="flex items-baseline gap-5 py-6 pl-5 transition-colors group-hover:pl-6">
                  <span className="w-7 shrink-0 font-mono text-sm font-semibold text-slate-300 transition-colors group-hover:text-brand-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900">
                      <Icon className="h-[18px] w-[18px] text-brand-500" />
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-600">
                      {feature.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
