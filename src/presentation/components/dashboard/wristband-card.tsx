import Link from "next/link";
import {
  ArrowUpRight,
  BellRing,
  CalendarClock,
  ChevronRight,
  Fingerprint,
  User,
  Baby,
  UserRound,
  Watch,
  Gem,
  KeyRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { WristbandSummaryDto } from "@/core/application/dto";
import { DeviceType, WristbandStatus } from "@/core/domain/enums";
import {
  getDeviceTypeLabel,
  getProfileModeLabel,
  getStatusBadgeClass,
  getStatusLabel,
  getWearerRoleLabel,
} from "./dashboard-labels";
import { WristbandEditButton } from "./wristband-edit-button";

interface WristbandCardProps {
  tag: WristbandSummaryDto;
  index?: number;
}

const ROLE_ICON: Record<string, LucideIcon> = {
  self: User,
  child: Baby,
  elderly_parent: UserRound,
};

const DEVICE_ICON: Record<string, LucideIcon> = {
  [DeviceType.BRACELET]: Watch,
  [DeviceType.NECKLACE]: Gem,
  [DeviceType.KEYCHAIN]: KeyRound,
};

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function WristbandCard({ tag, index = 0 }: WristbandCardProps) {
  const activatedDate = formatDate(tag.activatedAt);
  const needsSetup = tag.status === WristbandStatus.CLAIMED;
  const RoleIcon = ROLE_ICON[tag.wearerRole] ?? User;
  const deviceLabel = getDeviceTypeLabel(tag.deviceType);
  const DeviceIcon = tag.deviceType ? DEVICE_ICON[tag.deviceType] : undefined;

  return (
    <article
      className="group flex flex-col rounded-[var(--radius-card)] border border-slate-200/80 bg-white p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-float)] dark:border-slate-800 dark:bg-slate-900"
      style={{ ["--i" as string]: index }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <RoleIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">{tag.wearerLabel}</h3>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {getProfileModeLabel(tag.profileMode)} · {getWearerRoleLabel(tag.wearerRole)}
            </p>
            {deviceLabel && (
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {DeviceIcon && <DeviceIcon className="h-3 w-3" />}
                {deviceLabel}
              </span>
            )}
          </div>
        </div>
        <span
          className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${getStatusBadgeClass(
            tag.status,
          )}`}
        >
          {getStatusLabel(tag.status)}
        </span>
      </div>

      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <Fingerprint className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
          <dt className="sr-only">Emergency ID</dt>
          <dd className="font-mono text-[13px] font-medium tracking-tight text-slate-700 dark:text-slate-200">
            {tag.emergencyId}
          </dd>
        </div>
        {activatedDate && (
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <CalendarClock className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
            <dt className="sr-only">Active since</dt>
            <dd>Active since {activatedDate}</dd>
          </div>
        )}
        {tag.notifyOnScan && (
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <BellRing className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
            <dt className="sr-only">Notifications</dt>
            <dd>Notify on scan</dd>
          </div>
        )}
      </dl>

      <div className="mt-5 flex flex-wrap gap-2 pt-1">
        {needsSetup ? (
          <Link
            href="/setup"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(124,58,237,0.7)] transition-all hover:-translate-y-0.5 hover:bg-brand-500"
          >
            Continue setup
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href={`/wristbands/${tag.id}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
          >
            Details
            <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </Link>
        )}
        <div className={needsSetup ? "w-full" : "flex-1"}>
          <div className="[&>button]:w-full">
            <WristbandEditButton tag={tag} />
          </div>
        </div>
      </div>
    </article>
  );
}
