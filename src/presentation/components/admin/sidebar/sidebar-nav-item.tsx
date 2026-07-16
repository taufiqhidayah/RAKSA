import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface SidebarNavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

export function SidebarNavItem({ href, label, icon: Icon, active = false }: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "group flex items-center gap-4 rounded-[20px] px-5 py-4 text-[18px] font-medium transition-all duration-200",
        active
          ? "bg-gradient-to-r from-[#7B61FF] to-[#B06BFF] text-white shadow-[0_12px_30px_-8px_rgba(139,97,255,0.65)]"
          : "text-white/90 hover:bg-white/10",
      ].join(" ")}
    >
      <Icon
        className={`h-6 w-6 shrink-0 transition-transform duration-200 ${
          active ? "text-white" : "text-white/90 group-hover:scale-110"
        }`}
        strokeWidth={active ? 2.2 : 2}
      />
      <span>{label}</span>
    </Link>
  );
}
