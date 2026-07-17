"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { addFamilyMemberAction, type FamilyActionState } from "@/app/(dashboard)/actions";
import { FamilyMemberFields } from "./family-member-fields";

const initialState: FamilyActionState = {};

export function ClaimForm() {
  const [state, formAction, pending] = useActionState(addFamilyMemberAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          htmlFor="activationCode"
          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          Activation code
        </label>
        <input
          id="activationCode"
          name="activationCode"
          type="text"
          inputMode="text"
          placeholder="A1B2C3"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          required
          className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/60 text-center font-mono text-2xl font-semibold uppercase tracking-[0.35em] text-slate-900 transition-all placeholder:tracking-[0.35em] placeholder:text-slate-300 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/15 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder:text-slate-600 dark:focus:bg-slate-800"
        />
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">The code is inside the tag package.</p>
      </div>

      <div className="border-t border-slate-100 pt-5 dark:border-slate-800">
        <FamilyMemberFields fieldErrors={state.fieldErrors} />
      </div>

      {state.error && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-500/25"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(124,58,237,0.75)] transition-all hover:-translate-y-0.5 hover:bg-brand-500 disabled:pointer-events-none disabled:opacity-60"
      >
        {pending ? (
          "Saving…"
        ) : (
          <>
            Add member
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
