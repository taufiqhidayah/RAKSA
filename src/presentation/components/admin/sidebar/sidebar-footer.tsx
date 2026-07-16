import { ShieldCheck } from "lucide-react";

export function SidebarFooter() {
  return (
    <div className="mx-6 mb-6 mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#B79CFF]">
        <ShieldCheck className="h-4 w-4" />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-medium text-white/80">Raksa Platform</p>
        <p className="text-[11px] text-white/40">&copy; 2026 Raksa. All rights reserved.</p>
      </div>
    </div>
  );
}
