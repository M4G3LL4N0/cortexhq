"use client";

import { omniAccent } from "@/lib/omni-accent";
import { omniVenture } from "@/lib/omni-venture";

export function FeatureMiniVisual({ index }: { index: number }) {
  const a = omniAccent(omniVenture.accent);
  const patterns = [
    "M4 20 L12 8 L20 14 L28 4",
    "M6 18 C14 6, 22 22, 30 10",
    "M8 16 L16 16 L16 8 L24 8",
    "M4 12 H28 M16 4 V20",
  ];
  const d = patterns[index % patterns.length];

  return (
    <div className={`mb-4 flex h-16 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent ${a.bg}`}>
      <svg viewBox="0 0 32 24" className={`h-10 w-14 ${a.text}`} aria-hidden>
        <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="12" r="2" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
  );
}
