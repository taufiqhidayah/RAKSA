"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Radio } from "lucide-react";
import { setTagActiveAction, type FamilyActionState } from "@/app/(dashboard)/actions";

const initialState: FamilyActionState = {};

export function TagActiveToggle({
  wristbandId,
  active,
}: {
  wristbandId: string;
  active: boolean;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(setTagActiveAction, initialState);
  const [optimistic, setOptimistic] = useState(active);

  useEffect(() => {
    setOptimistic(active);
  }, [active]);

  useEffect(() => {
    if (state.success) router.refresh();
  }, [state.success, router]);

  return (
    <form
      action={formAction}
      className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
    >
      <input type="hidden" name="wristbandId" value={wristbandId} />
      <input type="hidden" name="active" value={String(!active)} />
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
          <Radio
            className={`h-4 w-4 ${
              optimistic ? "text-emerald-500" : "text-slate-400 dark:text-slate-500"
            }`}
          />
          {optimistic ? "Tag active" : "Tag inactive"}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {optimistic
            ? "Emergency page accessible via scan."
            : "Emergency page hidden from public."}
        </span>
        {state.error && (
          <span className="mt-1 block text-xs font-medium text-red-600 dark:text-red-400">
            {state.error}
          </span>
        )}
      </span>

      <button
        type="submit"
        role="switch"
        aria-checked={optimistic}
        aria-label="Activate tag"
        disabled={pending}
        onClick={() => setOptimistic((v) => !v)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-60 ${
          optimistic ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
            optimistic ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </form>
  );
}
