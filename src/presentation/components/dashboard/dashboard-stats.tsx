import { Users, ShieldCheck, Clock, ScanLine, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ScanTrendPointDto, WristbandSummaryDto } from "@/core/application/dto";
import { WristbandStatus } from "@/core/domain/enums";

interface DashboardStatsProps {
  wristbands: WristbandSummaryDto[];
  scanTrend: ScanTrendPointDto[];
}

type Tone = "brand" | "emerald" | "amber" | "blue";

const iconTile: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300",
};

const sparkColor: Record<Tone, string> = {
  brand: "#7c3aed",
  emerald: "#10b981",
  amber: "#f59e0b",
  blue: "#3b82f6",
};

type Direction = "up" | "down" | "neutral";

const trendStyle: Record<Direction, string> = {
  up: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  down: "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  neutral: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
};

const trendIcon: Record<Direction, LucideIcon> = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  neutral: Minus,
};

function sparkPath(values: number[], width = 100, height = 34): { line: string; area: string } {
  const max = Math.max(...values, 1);
  const step = width / Math.max(values.length - 1, 1);
  const pts = values.map((v, i) => {
    const x = i * step;
    const y = height - (v / max) * (height - 6) - 3;
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  return { line, area };
}

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  tone: Tone;
  index: number;
  hint?: string;
  trend?: { direction: Direction; label: string };
  series?: number[];
}

function StatCard({ label, value, icon: Icon, tone, index, hint, trend, series }: StatCardProps) {
  const TrendIcon = trend ? trendIcon[trend.direction] : Minus;
  const color = sparkColor[tone];
  const gid = `dash-spark-${tone}-${index}`;
  const spark = series ? sparkPath(series) : null;

  return (
    <div
      className="group rounded-[var(--radius-card)] border border-slate-200/80 bg-white p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-float)] dark:border-slate-800 dark:bg-slate-900"
      style={{ ["--i" as string]: index }}
    >
      <div className="flex items-start justify-between">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${iconTile[tone]}`}
        >
          <Icon className="h-5 w-5" />
        </span>
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${trendStyle[trend.direction]}`}
          >
            <TrendIcon className="h-3 w-3" />
            {trend.label}
          </span>
        )}
      </div>

      <p className="mt-4 text-3xl font-bold tracking-tight tabular-nums text-slate-900 dark:text-slate-100">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>

      {spark ? (
        <svg className="mt-3 h-9 w-full" viewBox="0 0 100 34" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={spark.area} fill={`url(#${gid})`} />
          <path
            d={spark.line}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ) : (
        hint && <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{hint}</p>
      )}
    </div>
  );
}

export function DashboardStats({ wristbands, scanTrend }: DashboardStatsProps) {
  const total = wristbands.length;
  const active = wristbands.filter((w) => w.status === WristbandStatus.ACTIVE).length;
  const pending = wristbands.filter((w) => w.status === WristbandStatus.CLAIMED).length;

  const series = scanTrend.map((p) => p.count);
  const totalScans = series.reduce((a, b) => a + b, 0);
  const mid = Math.floor(series.length / 2);
  const prev = series.slice(0, mid).reduce((a, b) => a + b, 0);
  const recent = series.slice(mid).reduce((a, b) => a + b, 0);
  const delta = recent - prev;
  const direction: Direction = delta > 0 ? "up" : delta < 0 ? "down" : "neutral";
  const trendLabel = delta === 0 ? "0" : `${delta > 0 ? "+" : ""}${delta}`;

  return (
    <div className="dash-stagger grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        label="Total tags"
        value={total}
        icon={Users}
        tone="brand"
        index={0}
        hint={total > 0 ? `${active} active · ${pending} need setup` : "No tags yet"}
      />
      <StatCard
        label="Active"
        value={active}
        icon={ShieldCheck}
        tone="emerald"
        index={1}
        hint={total > 0 ? `${Math.round((active / total) * 100)}% of total` : "—"}
      />
      <StatCard
        label="Needs setup"
        value={pending}
        icon={Clock}
        tone="amber"
        index={2}
        hint={pending > 0 ? "Complete emergency profile" : "All set"}
      />
      <StatCard
        label="Scans (14 days)"
        value={totalScans}
        icon={ScanLine}
        tone="blue"
        index={3}
        trend={{ direction, label: trendLabel }}
        series={series}
      />
    </div>
  );
}
