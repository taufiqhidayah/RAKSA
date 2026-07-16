import Link from "next/link";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_6px_16px_-6px_rgb(22_163_74_/_0.6)] hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-[0_12px_24px_-8px_rgb(22_163_74_/_0.65)]",
  secondary:
    "border border-slate-200 bg-white text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
  ghost:
    "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
  danger:
    "bg-red-600 text-white shadow-[0_6px_16px_-6px_rgb(220_38_38_/_0.6)] hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-[0_12px_24px_-8px_rgb(220_38_38_/_0.65)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
};

function radiusClass(pill?: boolean): string {
  return pill ? "rounded-full" : "rounded-xl";
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  pill?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", pill = false, className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${radiusClass(pill)} ${className}`}
      {...props}
    >
      {children}
    </button>
  ),
);
Button.displayName = "Button";

interface LinkButtonProps {
  href: string;
  variant?: Variant;
  size?: Size;
  pill?: boolean;
  className?: string;
  children: ReactNode;
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  pill = false,
  className = "",
  children,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${radiusClass(pill)} ${className}`}
    >
      {children}
    </Link>
  );
}
