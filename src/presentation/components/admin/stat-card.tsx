import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CountUp } from "./ui/count-up";

type Tone = "brand" | "emerald" | "amber" | "blue" | "slate";

const iconTile: Record<Tone, string> = {
  brand: "bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300",
  emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300",
  slate: "bg-slate-100 text-slate-500 dark:bg-slate-700/50 dark:text-slate-300",
};

const sparkColor: Record<Tone, string> = {
  brand: "#8b5cf6",
  emerald: "#10b981",
  amber: "#f59e0b",
  blue: "#3b82f6",
  slate: "#94a3b8",
};

type TrendDirection = "up" | "down" | "neutral";

const trendStyle: Record<TrendDirection, string> = {
  up: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  down: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300",
  neutral: "bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300",
};

const trendIcon: Record<TrendDirection, LucideIcon> = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  neutral: Minus,
};

// Decorative sparkline shapes — placeholders until real time-series exists.
const SPARK_PRESETS = [
  [8, 10, 7, 12, 9, 14, 11, 16, 13, 18],
  [6, 9, 8, 7, 11, 10, 13, 12, 15, 17],
  [10, 8, 11, 9, 12, 10, 13, 11, 14, 12],
  [7, 8, 9, 8, 10, 9, 11, 12, 13, 15],
];

function sparkPath(values: number[], width = 100, height = 30): { line: string; area: string } {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);
  const pts = values.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  return { line, area };
}

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone?: Tone;
  hint?: string;
  trend?: { label: string; direction?: TrendDirection };
  index?: number;
}

export function StatCard({ label, value, icon: Icon, tone = "brand", hint, trend, index = 0 }: StatCardProps) {
  const direction = trend?.direction ?? "up";
  const TrendIcon = trendIcon[direction];
  const color = sparkColor[tone];
  const { line, area } = sparkPath(SPARK_PRESETS[index % SPARK_PRESETS.length]);
  const gid = `spark-${tone}-${index}`;

  return (
    <div
      className="admin-animate-in group relative overflow-hidden rounded-[var(--radius-card)] border border-slate-200/80 bg-white p-5 shadow-[var(--shadow-soft)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-slate-200 hover:shadow-[var(--shadow-float)] dark:border-slate-700/60 dark:bg-slate-800"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex items-start justify-between">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${iconTile[tone]}`}
        >
          <Icon className="h-5 w-5" />
        </span>
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${trendStyle[direction]}`}
          >
            <TrendIcon className="h-3 w-3" />
            {trend.label}
          </span>
        )}
      </div>

      <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900 tabular-nums dark:text-white">
        {typeof value === "number" ? <CountUp value={value} /> : value}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      {hint && <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{hint}</p>}

      <svg
        className="mt-4 h-8 w-full"
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gid})`} />
        <path
          d={line}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
