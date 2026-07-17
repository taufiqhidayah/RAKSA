"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "./reveal";

const FAQS = [
  {
    q: "Does a helper need to install an app?",
    a: "No. Tapping the NFC or scanning the QR opens the emergency page in any browser. Helpers don't need an account or any app.",
  },
  {
    q: "What can a stranger see when they scan?",
    a: "Only what's needed in an emergency, like critical allergies and a button to call family. Your full personal data stays in your account and is never shown publicly.",
  },
  {
    q: "Can one account manage several bands?",
    a: "Yes. A single family account can manage bands for yourself, your kids, and your parents. Each band has its own profile, contacts, and public page.",
  },
  {
    q: "What if a band is lost or stolen?",
    a: "You can deactivate a band anytime from the dashboard. Once deactivated, that band's emergency page no longer shows any data.",
  },
  {
    q: "Is this a medical device?",
    a: "No. raksa is an emergency identification tool that helps reconnect people with their family. Information is self-reported by the owner and doesn't replace professional diagnosis or medical care.",
  },
];

export function LandingFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-canvas py-20 sm:py-28" id="faq">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-sm font-semibold text-brand-600">Common questions</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Still something on your mind?
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 60}>
                <div
                  className={`rounded-2xl border bg-white transition-colors ${
                    isOpen ? "border-brand-200 shadow-[var(--shadow-soft)]" : "border-slate-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-slate-900 sm:text-base">
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-brand-600 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
