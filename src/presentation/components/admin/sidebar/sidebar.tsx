import { SidebarLogo } from "./sidebar-logo";
import { SidebarNav } from "./sidebar-nav";
import { SidebarAdminCard } from "./sidebar-admin-card";
import { SidebarFooter } from "./sidebar-footer";

// Subtle glowing particles and thin diagonal lines, low opacity.
function SidebarDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-[#7B61FF]/20 blur-3xl" />
      <div className="absolute right-0 top-1/3 h-36 w-36 rounded-full bg-[#B06BFF]/10 blur-3xl" />

      <div className="absolute left-[-20%] top-[48%] h-px w-[85%] rotate-[28deg] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute left-[-10%] top-[57%] h-px w-[75%] rotate-[28deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <span className="absolute left-[62%] top-[45%] h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_10px_2px_rgba(255,255,255,0.4)]" />
      <span className="absolute left-[30%] top-[38%] h-1 w-1 rounded-full bg-[#B79CFF]/70" />
      <span className="absolute left-[78%] top-[63%] h-1 w-1 rounded-full bg-white/50" />
    </div>
  );
}

export function Sidebar({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`relative flex h-full w-[280px] flex-col overflow-hidden bg-gradient-to-b from-sidebar-top via-sidebar-mid to-sidebar-bot text-white ${className}`}
    >
      <SidebarDecor />
      <div className="relative z-10 flex h-full flex-col">
        <SidebarLogo />
        <SidebarNav />
        <div className="flex-1" />
        <SidebarAdminCard />
        <SidebarFooter />
      </div>
    </aside>
  );
}
