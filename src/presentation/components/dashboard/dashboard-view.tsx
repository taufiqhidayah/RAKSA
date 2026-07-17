import Link from "next/link";
import {
  Activity,
  ScanLine,
  Nfc,
  QrCode,
  Search,
  MapPin,
  CalendarDays,
  Plus,
  Bell,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type {
  ScanActivityDto,
  ScanTrendPointDto,
  WristbandSummaryDto,
} from "@/core/application/dto";
import { AccessMethod, WristbandStatus } from "@/core/domain/enums";
import { DashboardStats } from "./dashboard-stats";
import { WristbandList } from "./wristband-list";
import { ScanActivityChart } from "./scan-activity-chart";
import { StatusBreakdown } from "./status-breakdown";

interface DashboardViewProps {
  userEmail: string;
  wristbands: WristbandSummaryDto[];
  activity: ScanActivityDto[];
  scanTrend: ScanTrendPointDto[];
}

const METHOD_ICON: Record<string, LucideIcon> = {
  [AccessMethod.NFC]: Nfc,
  [AccessMethod.QR]: QrCode,
  [AccessMethod.MANUAL_LOOKUP]: Search,
  [AccessMethod.UNKNOWN]: ScanLine,
};

const METHOD_LABEL: Record<string, string> = {
  [AccessMethod.NFC]: "NFC",
  [AccessMethod.QR]: "QR code",
  [AccessMethod.MANUAL_LOOKUP]: "Manual lookup",
  [AccessMethod.UNKNOWN]: "Unknown",
};

function displayName(email: string): string {
  const handle = email.split("@")[0]?.replace(/[._-]+/g, " ") ?? email;
  return handle.charAt(0).toUpperCase() + handle.slice(1);
}

function today(): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

function formatWhen(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function ActivityFeed({ activity }: { activity: ScanActivityDto[] }) {
  if (activity.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center rounded-[var(--radius-card)] border border-slate-200/80 bg-white px-6 py-12 text-center shadow-[var(--shadow-soft)] dark:border-slate-800 dark:bg-slate-900">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
          <ScanLine className="h-6 w-6" />
        </span>
        <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">No scans yet</p>
        <p className="mt-1 max-w-xs text-sm text-slate-500 dark:text-slate-400">
          History appears here when someone scans your family tag.
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-100 overflow-hidden rounded-[var(--radius-card)] border border-slate-200/80 bg-white shadow-[var(--shadow-soft)] dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
      {activity.map((item) => {
        const Icon = METHOD_ICON[item.accessMethod] ?? ScanLine;
        return (
          <li key={item.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                {item.wearerLabel} scanned
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {METHOD_LABEL[item.accessMethod] ?? item.accessMethod} · {formatWhen(item.scannedAt)}
              </p>
            </div>
            {item.locationShared && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/25">
                <MapPin className="h-3 w-3" />
                Location
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function DashboardView({ userEmail, wristbands, activity, scanTrend }: DashboardViewProps) {
  const hasWristbands = wristbands.length > 0;
  const total = wristbands.length;
  const active = wristbands.filter((w) => w.status === WristbandStatus.ACTIVE).length;
  const scans14d = scanTrend.reduce((sum, point) => sum + point.count, 0);
  const initial = displayName(userEmail).charAt(0).toUpperCase();

  return (
    <div className="dash-animate-in space-y-6">
      {/* Mobile app-style hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-600 p-5 text-white shadow-[0_20px_45px_-20px_rgba(124,58,237,0.55)] lg:hidden">
        <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
        <div className="relative flex items-center justify-between">
          <Link href="/profile" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-base font-bold ring-1 ring-white/25 backdrop-blur">
              {initial}
            </span>
            <div>
              <p className="text-xs font-medium text-white/70">Welcome</p>
              <p className="text-lg font-bold leading-tight">{displayName(userEmail)}</p>
            </div>
          </Link>
          <Link
            href="/notifications"
            className="relative rounded-2xl bg-white/15 p-2.5 ring-1 ring-white/20 backdrop-blur transition active:scale-95"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Link>
        </div>

        <div className="relative mt-5 flex items-center gap-3 rounded-2xl bg-white/10 p-3.5 ring-1 ring-white/15 backdrop-blur">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">
              {active} of {total} tags active
            </p>
            <p className="text-xs text-white/70">{scans14d} scans in the last 14 days</p>
          </div>
          <Link
            href="/claim"
            className="shrink-0 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-brand-700 shadow-sm transition active:scale-95"
          >
            Add
          </Link>
        </div>
      </section>

      {/* Desktop header */}
      <div className="hidden items-center justify-between lg:flex">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Hi, {displayName(userEmail)}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your family emergency tags at a glance.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            <CalendarDays className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            {today()}
          </span>
          <Link
            href="/claim"
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(124,58,237,0.75)] transition-all hover:-translate-y-0.5 hover:bg-brand-500"
          >
            <Plus className="h-4 w-4" />
            Add member
          </Link>
        </div>
      </div>

      <DashboardStats wristbands={wristbands} scanTrend={scanTrend} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ScanActivityChart points={scanTrend} />
        </div>
        <div className="lg:col-span-1">
          <StatusBreakdown wristbands={wristbands} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="space-y-4 lg:col-span-2">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">Family tags</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">All emergency tags in one account.</p>
            </div>
            {hasWristbands && (
              <Link
                href="/claim"
                className="hidden text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 sm:inline"
              >
                + Add
              </Link>
            )}
          </div>
          <WristbandList wristbands={wristbands} />
        </section>

        <section className="flex flex-col space-y-4 lg:col-span-1">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">Recent activity</h2>
          </div>
          <ActivityFeed activity={activity} />
        </section>
      </div>
    </div>
  );
}
