export function SidebarLogo() {
  return (
    <div className="flex items-center gap-3 pl-7 pr-6 pt-8">
      <span className="shrink-0">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="raksa-logo" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7B61FF" />
              <stop offset="100%" stopColor="#B06BFF" />
            </linearGradient>
          </defs>
          <path
            d="M20 2.5 34.6 11 V29 L20 37.5 5.4 29 V11 Z"
            fill="url(#raksa-logo)"
          />
          <path
            d="M20 2.5 34.6 11 V29 L20 37.5 5.4 29 V11 Z"
            stroke="#ffffff"
            strokeOpacity="0.25"
            strokeWidth="1"
            fill="none"
          />
          <text
            x="20"
            y="26"
            textAnchor="middle"
            fontSize="18"
            fontWeight="800"
            fill="#ffffff"
            fontFamily="var(--font-admin, Inter), sans-serif"
          >
            R
          </text>
        </svg>
      </span>
      <div className="leading-tight">
        <p className="text-xl font-extrabold tracking-tight text-white">RAKSA</p>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B79CFF]">
          Superadmin
        </p>
      </div>
    </div>
  );
}
