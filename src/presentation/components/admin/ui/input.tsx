import { forwardRef } from "react";
import type { InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

const fieldBase =
  "h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500";

function borderClass(hasError?: boolean): string {
  return hasError
    ? "border-red-400 focus:border-red-500"
    : "border-slate-200 focus:border-brand-500 dark:border-slate-700";
}

interface FieldWrapperProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, error, hint, children }: FieldWrapperProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      )}
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  icon?: LucideIcon;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", hasError, icon: Icon, ...props }, ref) => {
    if (!Icon) {
      return (
        <input ref={ref} className={`${fieldBase} ${borderClass(hasError)} ${className}`} {...props} />
      );
    }
    return (
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          ref={ref}
          className={`${fieldBase} ${borderClass(hasError)} pl-10 ${className}`}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", hasError, children, ...props }, ref) => (
    <select ref={ref} className={`${fieldBase} ${borderClass(hasError)} ${className}`} {...props}>
      {children}
    </select>
  ),
);
Select.displayName = "Select";
