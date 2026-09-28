"use client";

import type { ReactNode } from "react";
import { omniAccent } from "@/lib/omni-accent";
import { omniVenture } from "@/lib/omni-venture";

type Props = {
  children: ReactNode;
  kicker?: string;
  title?: string;
  className?: string;
};

export function GraphicsShell({ children, kicker, title, className = "" }: Props) {
  const a = omniAccent(omniVenture.accent);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`pointer-events-none absolute -inset-8 rounded-[2.5rem] opacity-60 blur-3xl ${a.bg}`}
        aria-hidden
      />
      <div
        className={`relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-4 shadow-2xl ring-1 backdrop-blur-md sm:p-5 ${a.ring}`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />
        {(kicker || title) && (
          <div className="relative mb-4 flex flex-wrap items-center gap-2">
            {kicker ? (
              <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${a.text}`}>{kicker}</p>
            ) : null}
            {title ? <p className="text-sm font-medium text-white">{title}</p> : null}
          </div>
        )}
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
