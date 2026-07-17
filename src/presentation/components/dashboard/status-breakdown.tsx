import type { WristbandSummaryDto } from "@/core/application/dto";
import { WristbandStatus } from "@/core/domain/enums";

interface StatusBreakdownProps {
  wristbands: WristbandSummaryDto[];
}

const ROWS: { key: string; label: string; dot: string; bar: string }[] = [
  { key: WristbandStatus.ACTIVE, label: "Active", dot: "bg-emerald-500", bar: "bg-emerald-500" },
  { key: WristbandStatus.CLAIMED, label: "Needs setup", dot: "bg-amber-500", bar: "bg-amber-500" },
  { key: WristbandStatus.DISABLED, label: "Disabled", dot: "bg-slate-400", bar: "bg-slate-400" },
  { key: WristbandStatus.REVOKED, label: "Revoked", dot: "bg-red-500", bar: "bg-red-500" },
];

export function StatusBreakdown({ wristbands }: StatusBreakdownProps) {
  const total = wristbands.length;
  const rows = ROWS.map((r) => ({
    ...r,
    count: wristbands.filter((w) => w.status === r.key).length,
  })).filter((r) => r.count > 0);

  return (
    <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-slate-200/80 bg-white p-5 shadow-[var(--shadow-soft)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h2 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">Tag status</h2>
      <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">Distribution across all family tags</p>

      {total === 0 ? (
        <div className="flex flex-1 items-center justify-center py-8">
          <p className="text-sm text-slate-400 dark:text-slate-500">No tags registered yet</p>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {rows.map((r) => {
            const pct = Math.round((r.count / total) * 100);
            return (
              <div key={r.key}>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <span className={`h-2 w-2 rounded-full ${r.dot}`} />
                    {r.label}
                  </span>
                  <span className="font-semibold tabular-nums text-slate-900 dark:text-slate-100">{r.count}</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className={`h-full rounded-full ${r.bar}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
