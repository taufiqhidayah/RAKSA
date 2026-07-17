"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Ticket,
  Bell,
  Home,
  LogOut,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { createSupabaseBrowserClient } from "@/infrastructure/persistence/supabase/client/browser-client";
import { ThemeToggle } from "./theme-toggle";

function displayName(email: string): string {
  const handle = email.split("@")[0]?.replace(/[._-]+/g, " ") ?? email;
  return handle.charAt(0).toUpperCase() + handle.slice(1);
}

interface RowProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  badge?: string;
  onClick?: () => void;
  danger?: boolean;
  trailing?: React.ReactNode;
}

function Row({ icon: Icon, label, href, badge, onClick, danger, trailing }: RowProps) {
  const content = (
    <>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          danger
            ? "bg-red-50 text-red-500 dark:bg-red-500/15 dark:text-red-400"
            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
        }`}
      >
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span
        className={`flex-1 text-sm font-medium ${
          danger ? "text-red-600 dark:text-red-400" : "text-slate-800 dark:text-slate-200"
        }`}
      >
        {label}
      </span>
      {badge && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1.5 text-xs font-semibold text-white">
          {badge}
        </span>
      )}
      {trailing}
      {!danger && (href || onClick) && (
        <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600" />
      )}
    </>
  );

  const className =
    "flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {label}
      </p>
      <div className="divide-y divide-slate-100 overflow-hidden rounded-[var(--radius-card)] border border-slate-200/80 bg-white shadow-[var(--shadow-soft)] dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
        {children}
      </div>
    </section>
  );
}

export function ProfileView({
  userEmail,
  tagCount,
}: {
  userEmail: string;
  tagCount: number;
}) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="dash-animate-in mx-auto max-w-xl space-y-6">
      <div className="flex flex-col items-center pt-2 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-3xl font-bold text-white shadow-[0_16px_36px_-14px_rgba(124,58,237,0.6)]">
          {userEmail.charAt(0).toUpperCase()}
        </span>
        <h1 className="mt-4 text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {displayName(userEmail)}
        </h1>
        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{userEmail}</p>
      </div>

      <Group label="Account">
        <Row icon={Users} label="Family tags" href="/dashboard" badge={String(tagCount)} />
        <Row icon={Ticket} label="Add member" href="/claim" />
        <Row icon={Bell} label="Notifications" href="/notifications" />
      </Group>

      <Group label="Preferences">
        <ThemeToggle />
      </Group>

      <Group label="Other">
        <Row icon={Home} label="Home" href="/" />
        <Row
          icon={LogOut}
          label={signingOut ? "Signing out…" : "Sign out"}
          onClick={handleSignOut}
          danger
        />
      </Group>
    </div>
  );
}
