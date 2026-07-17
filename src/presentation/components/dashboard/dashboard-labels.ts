import { DeviceType, ProfileMode, WristbandStatus } from "@/core/domain/enums";

const STATUS_LABELS: Record<string, string> = {
  [WristbandStatus.UNCLAIMED]: "Unclaimed",
  [WristbandStatus.CLAIMED]: "Setup incomplete",
  [WristbandStatus.ACTIVE]: "Active",
  [WristbandStatus.DISABLED]: "Disabled",
  [WristbandStatus.REVOKED]: "Revoked",
};

const PROFILE_MODE_LABELS: Record<ProfileMode, string> = {
  [ProfileMode.ADULT_EMERGENCY]: "Medical emergency",
  [ProfileMode.CHILD_GUARDIAN]: "Child guardian",
  [ProfileMode.ELDERLY_DEPENDENT]: "Elderly",
};

const WEARER_ROLE_LABELS: Record<string, string> = {
  self: "Myself",
  child: "Child",
  elderly_parent: "Parent",
};

const DEVICE_TYPE_LABELS: Record<DeviceType, string> = {
  [DeviceType.BRACELET]: "Bracelet",
  [DeviceType.NECKLACE]: "Necklace",
  [DeviceType.KEYCHAIN]: "Keychain",
};

export function getDeviceTypeLabel(type?: string): string | null {
  if (!type) return null;
  return DEVICE_TYPE_LABELS[type as DeviceType] ?? type;
}

export function getStatusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status;
}

export function getProfileModeLabel(mode: ProfileMode): string {
  return PROFILE_MODE_LABELS[mode] ?? mode;
}

export function getWearerRoleLabel(role: string): string {
  return WEARER_ROLE_LABELS[role] ?? role;
}

export function getStatusBadgeClass(status: string): string {
  switch (status) {
    case WristbandStatus.ACTIVE:
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/25";
    case WristbandStatus.CLAIMED:
      return "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/25";
    case WristbandStatus.DISABLED:
    case WristbandStatus.REVOKED:
      return "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-500/25";
    default:
      return "bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600/30";
  }
}
