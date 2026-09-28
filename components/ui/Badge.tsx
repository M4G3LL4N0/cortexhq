import type { ReactNode } from "react";

type Tone = "neutral" | "violet" | "cyan" | "amber" | "rose";

const tones: Record<Tone, string> = {
  neutral: "border-white/10 bg-white/[0.04] text-slate-200",
  violet: "border-violet-500/25 bg-violet-500/10 text-violet-100",
  cyan: "border-cyan-500/25 bg-cyan-500/10 text-cyan-100",
  amber: "border-amber-500/25 bg-amber-500/10 text-amber-100",
  rose: "border-rose-500/25 bg-rose-500/10 text-rose-100",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${tones[tone]} ${className}`.trim()}
    >
      {children}
    </span>
  );
}
