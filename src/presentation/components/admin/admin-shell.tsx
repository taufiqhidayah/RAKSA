"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Settings,
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
  User,
  Activity,
  LifeBuoy,
  ChevronDown,
} from "lucide-react";
import type { ReactNode } from "react";
import { createSupabaseBrowserClient } from "@/infrastructure/persistence/supabase/client/browser-client";
import { ToastProvider } from "./ui/toast";
import { ConfirmDialog } from "./ui/confirm-dialog";
import { Sidebar } from "./sidebar/sidebar";

const PROFILE_MENU = [
  { label: "Profile", href: "/admin/settings", icon: User },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Activity Log", href: "/admin/cards", icon: Activity },
  { label: "Help & Support", href: "/admin/settings", icon: LifeBuoy },
];

export function AdminShell({
  userEmail,
  userName,
  children,
}: {
  userEmail: string;
  userName: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("admin-theme");
    setDark(stored === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("admin-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!profileOpen) return;
    function onClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setProfileOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [profileOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }
    params.delete("page");
    router.push(`/admin/cards?${params.toString()}`);
  }

  const name = userName;
  const initials = name
    .split(" ")
    .map((w) => w.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={dark ? "dark" : ""}>
      <div className="admin-scope min-h-screen bg-canvas text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <div className="flex min-h-screen">
          {/* Desktop sidebar */}
          <div className="hidden shrink-0 lg:block">
            <div className="sticky top-0 h-screen">
              <Sidebar />
            </div>
          </div>

          {/* Mobile drawer */}
          {mobileOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
              />
              <div className="admin-animate-slide absolute left-0 top-0 h-full shadow-2xl">
                <Sidebar />
              </div>
            </div>
          )}

          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200/70 bg-white/80 px-4 backdrop-blur-xl sm:px-6 dark:border-slate-800 dark:bg-slate-900/70">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
                aria-label="Buka menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              <form onSubmit={handleSearch} className="relative hidden max-w-md flex-1 sm:block">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  ref={searchRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari Emergency ID atau label..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-10 pr-16 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/15 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
                <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium text-slate-400 sm:flex dark:border-slate-700 dark:bg-slate-900">
                  ⌘K
                </kbd>
              </form>

              <div className="ml-auto flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setDark((d) => !d)}
                  className="rounded-xl p-2 text-slate-500 transition-all hover:-translate-y-0.5 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  aria-label="Ganti tema"
                >
                  {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <button
                  type="button"
                  className="relative rounded-xl p-2 text-slate-500 transition-all hover:-translate-y-0.5 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  aria-label="Notifikasi"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
                </button>

                <div ref={profileRef} className="relative ml-1">
                  <button
                    type="button"
                    onClick={() => setProfileOpen((o) => !o)}
                    className="flex items-center gap-2 rounded-full p-0.5 pr-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-haspopup="menu"
                    aria-expanded={profileOpen}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-white">
                      {initials}
                    </span>
                    <ChevronDown
                      className={`hidden h-4 w-4 text-slate-400 transition-transform duration-200 sm:block ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {profileOpen && (
                    <div
                      role="menu"
                      className="admin-animate-dropdown absolute right-0 top-full z-50 mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-pop)] dark:border-slate-700 dark:bg-slate-900"
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-bold text-white">
                          {initials}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{name}</p>
                          <p className="truncate text-xs text-slate-500 dark:text-slate-400" title={userEmail}>
                            {userEmail}
                          </p>
                        </div>
                      </div>
                      <div className="p-1.5">
                        {PROFILE_MENU.map(({ label, href, icon: Icon }) => (
                          <Link
                            key={label}
                            href={href}
                            role="menuitem"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                          >
                            <Icon className="h-4 w-4 text-slate-400" />
                            {label}
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-slate-100 p-1.5 dark:border-slate-800">
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setProfileOpen(false);
                            setConfirmLogout(true);
                          }}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </header>

            <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-6xl">
                <ToastProvider>{children}</ToastProvider>
              </div>
            </main>
          </div>
        </div>

        {mobileOpen && (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="fixed right-4 top-4 z-50 rounded-xl bg-white p-2 shadow-md lg:hidden dark:bg-slate-800"
            aria-label="Tutup menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <ConfirmDialog
          open={confirmLogout}
          title="Keluar dari akun?"
          description="Anda akan keluar dari sesi superadmin dan diarahkan ke halaman login."
          confirmLabel="Logout"
          cancelLabel="Batal"
          tone="danger"
          loading={signingOut}
          onConfirm={handleSignOut}
          onClose={() => setConfirmLogout(false)}
        />
      </div>
    </div>
  );
}
