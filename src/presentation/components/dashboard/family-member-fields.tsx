"use client";

import { useState } from "react";
import { Baby, UserRound, User, BellRing } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { WearerRole } from "@/core/domain/enums";

interface RoleOption {
  value: string;
  label: string;
  icon: LucideIcon;
}

const ROLE_OPTIONS: RoleOption[] = [
  { value: WearerRole.CHILD, label: "Child", icon: Baby },
  { value: WearerRole.ELDERLY_PARENT, label: "Parent", icon: UserRound },
  { value: WearerRole.SELF, label: "Myself", icon: User },
];

const NAME_HINT: Record<string, { label: string; placeholder: string }> = {
  [WearerRole.CHILD]: { label: "Child's name", placeholder: "e.g. Ani" },
  [WearerRole.ELDERLY_PARENT]: { label: "Parent's name", placeholder: "e.g. Jane Doe" },
  [WearerRole.SELF]: { label: "Your name", placeholder: "e.g. John" },
};

export function FamilyMemberFields({
  defaultRole = WearerRole.CHILD,
  defaultLabel = "",
  defaultNotify = true,
  fieldErrors,
}: {
  defaultRole?: string;
  defaultLabel?: string;
  defaultNotify?: boolean;
  fieldErrors?: Record<string, string>;
}) {
  const [role, setRole] = useState<string>(defaultRole);
  const hint = NAME_HINT[role] ?? NAME_HINT[WearerRole.SELF];

  return (
    <div className="space-y-4">
      <fieldset>
        <legend className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Who is this tag for?
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {ROLE_OPTIONS.map((option) => {
            const active = role === option.value;
            const Icon = option.icon;
            return (
              <label
                key={option.value}
                className={[
                  "flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 text-center transition-all",
                  active
                    ? "border-brand-500 bg-brand-50/70 text-brand-700 ring-2 ring-brand-500/20 dark:border-brand-500 dark:bg-brand-500/15 dark:text-brand-300"
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name="wearerRole"
                  value={option.value}
                  checked={active}
                  onChange={() => setRole(option.value)}
                  className="sr-only"
                />
                <Icon className="h-5 w-5" />
                <span className="text-xs font-semibold">{option.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="wearerLabel" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          {hint.label}
        </label>
        <input
          id="wearerLabel"
          name="wearerLabel"
          type="text"
          defaultValue={defaultLabel}
          maxLength={80}
          placeholder={hint.placeholder}
          autoComplete="off"
          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/15 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-800"
        />
        {fieldErrors?.wearerLabel && (
          <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{fieldErrors.wearerLabel}</p>
        )}
      </div>

      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-slate-700 dark:bg-slate-900">
        <input
          type="checkbox"
          name="notifyOnScan"
          defaultChecked={defaultNotify}
          className="h-4 w-4 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-800"
        />
        <span className="flex items-center gap-1.5 text-sm font-medium text-slate-800 dark:text-slate-200">
          <BellRing className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          Notify me when this tag is scanned
        </span>
      </label>
    </div>
  );
}
