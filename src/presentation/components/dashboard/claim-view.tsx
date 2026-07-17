import Link from "next/link";
import { ArrowLeft, Ticket } from "lucide-react";
import { ClaimForm } from "./claim-form";

export function ClaimView() {
  return (
    <div className="dash-animate-in mx-auto max-w-xl space-y-6">
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Add member
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Enter your activation code and choose who this tag is for.
        </p>
      </div>

      <div className="rounded-[var(--radius-card)] border border-slate-200/80 bg-white p-6 shadow-[var(--shadow-soft)] dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
          <Ticket className="h-6 w-6" />
        </span>
        <div className="mt-5">
          <ClaimForm />
        </div>
      </div>
    </div>
  );
}
