"use client";

import { usePathname } from "next/navigation";
import { LayoutGrid, CreditCard, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SidebarNavItem } from "./sidebar-nav-item";

interface NavEntry {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

const NAV: NavEntry[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid, exact: true },
  { href: "/admin/cards", label: "Registered Tags", icon: CreditCard },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function isActive(pathname: string, href: string, exact?: boolean): boolean {
  return exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-8 flex flex-col gap-3 px-4">
      {NAV.map((item) => (
        <SidebarNavItem
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
          active={isActive(pathname, item.href, item.exact)}
        />
      ))}
    </nav>
  );
}
