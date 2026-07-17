import { TrendingUp } from "lucide-react";
import type { ScanTrendPointDto } from "@/core/application/dto";

interface ScanActivityChartProps {
  points: ScanTrendPointDto[];
}

const VW = 100;
const VH = 40;

function formatDay(date: string): string {
  return new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}

export function ScanActivityChart({ points }: ScanActivityChartProps) {
  const counts = points.map((p) => p.count);
  const total = counts.reduce((a, b) => a + b, 0);
  const max = Math.max(...counts, 1);
  const step = VW / Math.max(points.length - 1, 1);

  const coords = counts.map((v, i) => {
    const x = i * step;
    const y = VH - (v / max) * (VH - 4) - 2;
    return [x, y] as const;
  });
  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `${line} L${VW},${VH} L0,${VH} Z`;

  const labelIdx = [0, Math.floor((points.length - 1) / 2), points.length - 1].filter(
    (v, i, arr) => arr.indexOf(v) === i,
  );

  return (
    <div className="rounded-[var(--radius-card)] border border-slate-200/80 bg-white p-5 shadow-[var(--shadow-soft)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Scan activity
          </h2>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">Last 14 days</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
          <TrendingUp className="h-4 w-4" />
          {total} scans
        </span>
      </div>

      <div className="relative mt-5 h-[200px] w-full">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="dash-chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1="0"
              x2={VW}
              y1={VH * f}
              y2={VH * f}
              className="text-slate-100 dark:text-slate-800"
              stroke="currentColor"
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path d={area} fill="url(#dash-chart-fill)" />
          <path
            d={line}
            fill="none"
            stroke="#7c3aed"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {total === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-400 dark:bg-slate-800 dark:text-slate-400">
              No scans yet
            </p>
          </div>
        )}
      </div>

      <div className="mt-3 flex justify-between text-[11px] font-medium text-slate-400 dark:text-slate-500">
        {labelIdx.map((i) => (
          <span key={i}>{formatDay(points[i].date)}</span>
        ))}
      </div>
    </div>
  );
}
