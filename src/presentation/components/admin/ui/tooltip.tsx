"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";

type Placement = "up" | "down" | "left" | "right";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: Placement;
  /** Gap in px between the trigger and the tooltip. */
  offset?: number;
  className?: string;
}

const POSITION: Record<Placement, string> = {
  up: "bottom-full left-1/2 -translate-x-1/2",
  down: "top-full left-1/2 -translate-x-1/2",
  left: "right-full top-1/2 -translate-y-1/2",
  right: "left-full top-1/2 -translate-y-1/2",
};

function offsetStyle(placement: Placement, offset: number): React.CSSProperties {
  switch (placement) {
    case "up":
      return { marginBottom: offset };
    case "down":
      return { marginTop: offset };
    case "left":
      return { marginRight: offset };
    case "right":
      return { marginLeft: offset };
  }
}

/**
 * Lightweight hover/focus tooltip. Dark bubble, max-width 280px with dynamic
 * width for shorter content. No external dependency, scoped to the admin area.
 */
export function Tooltip({
  content,
  children,
  placement = "up",
  offset = 8,
  className = "",
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span aria-describedby={open ? id : undefined}>{children}</span>
      <span
        id={id}
        role="tooltip"
        style={offsetStyle(placement, offset)}
        className={`pointer-events-none absolute z-50 w-max max-w-[500px] rounded-lg bg-slate-900/90 px-3 py-2 text-left text-xs leading-relaxed text-white shadow-lg transition-all duration-150 dark:bg-slate-700 ${
          POSITION[placement]
        } ${open ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        {content}
      </span>
    </span>
  );
}
