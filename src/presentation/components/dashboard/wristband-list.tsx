import Link from "next/link";
import { Tag, Plus } from "lucide-react";
import type { WristbandSummaryDto } from "@/core/application/dto";
import { WristbandCard } from "./wristband-card";

interface WristbandListProps {
  wristbands: WristbandSummaryDto[];
}

export function WristbandList({ wristbands }: WristbandListProps) {
  if (wristbands.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[var(--radius-card)] border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-600/10 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/20">
          <Tag className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">No family members yet</h3>
        <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
          Add your first member using the activation code from your tag package, then choose their role.
        </p>
        <Link
          href="/claim"
          className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(124,58,237,0.7)] transition-all hover:-translate-y-0.5 hover:bg-brand-500"
        >
          <Plus className="h-4 w-4" />
          Add first member
        </Link>
      </div>
    );
  }

  return (
    <div className="dash-stagger grid grid-cols-1 gap-4 md:grid-cols-2">
      {wristbands.map((tag, i) => (
        <WristbandCard key={tag.id} tag={tag} index={i} />
      ))}
    </div>
  );
}
