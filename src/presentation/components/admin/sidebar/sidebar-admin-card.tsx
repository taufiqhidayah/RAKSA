// Orbiting isometric 3D cube illustration (SVG approximation of the reference).
function AdminCardArt() {
  return (
    <svg viewBox="0 0 170 120" className="h-[104px] w-full" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="ac-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ac-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ede9fe" />
          <stop offset="100%" stopColor="#c4b5fd" />
        </linearGradient>
        <linearGradient id="ac-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="ac-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#5b21b6" />
        </linearGradient>
      </defs>

      <ellipse cx="85" cy="60" rx="60" ry="52" fill="url(#ac-glow)" />

      {/* orbit rings */}
      <g stroke="#c4b5fd" strokeOpacity="0.35" strokeWidth="1.4" fill="none">
        <ellipse cx="85" cy="60" rx="66" ry="24" transform="rotate(-18 85 60)" />
        <ellipse cx="85" cy="60" rx="66" ry="24" transform="rotate(22 85 60)" />
      </g>

      {/* orbiting particles */}
      <circle cx="19" cy="52" r="3" fill="#c4b5fd" />
      <circle cx="151" cy="70" r="3.5" fill="#a78bfa" />
      <circle cx="120" cy="26" r="2.5" fill="#ddd6fe" />
      <circle cx="52" cy="96" r="2.5" fill="#a78bfa" />

      {/* cube */}
      <g>
        <polygon points="85,26 112,42 85,58 58,42" fill="url(#ac-top)" />
        <polygon points="58,42 85,58 85,90 58,74" fill="url(#ac-left)" />
        <polygon points="112,42 85,58 85,90 112,74" fill="url(#ac-right)" />
        {/* dice-like dots */}
        <circle cx="70" cy="60" r="2" fill="#ffffff" fillOpacity="0.65" />
        <circle cx="72" cy="72" r="2" fill="#ffffff" fillOpacity="0.5" />
        <circle cx="99" cy="60" r="2" fill="#ffffff" fillOpacity="0.35" />
        <circle cx="101" cy="72" r="2" fill="#ffffff" fillOpacity="0.3" />
      </g>
    </svg>
  );
}

export function SidebarAdminCard() {
  return (
    <div className="mx-6 rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)] transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex justify-center">
        <AdminCardArt />
      </div>
      <p className="mt-3 text-lg font-bold text-white">Mode Superadmin</p>
      <p className="mt-1 text-sm leading-relaxed text-[#B79CFF]/80">
        Akses penuh provisi &amp; manajemen tag
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-[#7B61FF] to-[#B06BFF]" />
        </div>
        <span className="text-xs font-semibold text-white">100%</span>
      </div>
    </div>
  );
}
