"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Home,
  Ticket,
  Bell,
  Plus,
  User,
  LogOut,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { createSupabaseBrowserClient } from "@/infrastructure/persistence/supabase/client/browser-client";
import { RaksaLogo } from "@/presentation/components/brand/raksa-logo";

interface NavEntry {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

const NAV: NavEntry[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid, exact: true },
  { href: "/claim", label: "Add member", icon: Ticket },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

function isActive(pathname: string, href: string, exact?: boolean): boolean {
  return exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarPanel({
  userEmail,
  pathname,
  onSignOut,
  signingOut,
}: {
  userEmail: string;
  pathname: string;
  onSignOut: () => void;
  signingOut: boolean;
}) {
  return (
    <aside className="flex h-full w-[264px] flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <Link href="/dashboard" className="flex items-center gap-3 px-6 pt-6" aria-label="raksa Family">
        <RaksaLogo variant="color" height={52} className="dark:hidden" />
        <RaksaLogo variant="white" height={52} className="hidden dark:block" />
        <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-600 dark:bg-brand-950/40 dark:text-brand-300">
          Family
        </span>
      </Link>

      <p className="mt-7 px-6 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        Menu
      </p>
      <nav className="mt-2 flex flex-col gap-1 px-3">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(pathname, href, exact);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={[
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-brand-600 text-white shadow-[0_10px_24px_-12px_rgba(124,58,237,0.8)]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
              ].join(" ")}
            >
              <Icon
                className={`h-[18px] w-[18px] shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"}`}
                strokeWidth={2}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      <div className="m-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-white">
            {userEmail.charAt(0).toUpperCase()}
          </span>
          <p className="min-w-0 flex-1 truncate text-xs font-medium text-slate-500 dark:text-slate-400" title={userEmail}>
            {userEmail}
          </p>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          disabled={signingOut}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-red-500/40 dark:hover:bg-red-500/10 dark:hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  );
}

/** App-style bottom tab bar for mobile. */
function MobileTabBar({ pathname }: { pathname: string }) {
  const tabs: { href: string; label: string; icon: LucideIcon; exact?: boolean }[] = [
    { href: "/dashboard", label: "Home", icon: Home, exact: true },
    { href: "/claim", label: "Add", icon: Plus },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/profile", label: "Account", icon: User },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto grid max-w-md grid-cols-4 items-center px-2 py-2">
        {tabs.map((tab) => (
          <TabLink key={tab.href} {...tab} active={isActive(pathname, tab.href, tab.exact)} />
        ))}
      </div>
    </nav>
  );
}

function TabLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
}) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 py-1.5" aria-current={active ? "page" : undefined}>
      <Icon
        className={`h-[22px] w-[22px] ${active ? "text-brand-600 dark:text-brand-400" : "text-slate-400 dark:text-slate-500"}`}
        strokeWidth={2}
      />
      <span
        className={`text-[11px] font-semibold ${active ? "text-brand-600 dark:text-brand-400" : "text-slate-500 dark:text-slate-400"}`}
      >
        {label}
      </span>
    </Link>
  );
}

export function DashboardShell({
  userEmail,
  children,
}: {
  userEmail: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const initials = userEmail.charAt(0).toUpperCase();

  return (
    <div className="dash-scope min-h-screen bg-canvas text-slate-900">
      <div className="flex min-h-screen">
        <div className="hidden shrink-0 lg:block">
          <div className="sticky top-0 h-screen">
            <SidebarPanel
              userEmail={userEmail}
              pathname={pathname}
              onSignOut={handleSignOut}
              signingOut={signingOut}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 hidden h-16 items-center gap-3 border-b border-slate-200 bg-white/85 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/85 sm:px-6 lg:flex lg:px-8">
            <div className="ml-auto flex items-center gap-1.5">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="/notifications"
                className="relative rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-500 ring-2 ring-white dark:ring-slate-900" />
              </Link>
              <Link
                href="/profile"
                aria-label="Profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-white transition-transform hover:scale-105"
              >
                {initials}
              </Link>
            </div>
          </header>

          <main className="flex-1 px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-10 lg:pt-6">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>

      <MobileTabBar pathname={pathname} />
    </div>
  );
}
