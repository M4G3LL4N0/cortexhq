import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:brightness-110 disabled:opacity-50",
  secondary:
    "rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10 disabled:opacity-50",
  ghost:
    "rounded-full px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white disabled:opacity-50",
};

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <button type={type} className={`${variants[variant]} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}
