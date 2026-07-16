import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="admin-animate-in flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-800/30">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-600/10 dark:bg-brand-500/10 dark:text-brand-300">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
