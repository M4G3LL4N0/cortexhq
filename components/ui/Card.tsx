import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/40 backdrop-blur-md ${
        glow ? "ring-1 ring-cyan-500/15 shadow-cyan-500/5" : ""
      } ${className}`.trim()}
    >
      {children}
    </div>
  );
}
