"use client";

import { omniVenture } from "@/lib/omni-venture";
import { omniAccent } from "@/lib/omni-accent";

export function BeforeAfterGraphic() {
  const a = omniAccent(omniVenture.accent);

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2" aria-hidden>
      <div className="relative h-28 overflow-hidden rounded-xl border border-red-500/20 bg-red-950/30 p-3">
        <p className="text-[9px] uppercase text-red-300">Fragmented</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-8 w-12 rotate-3 rounded border border-white/10 bg-white/5"
              style={{ transform: `rotate(${(n - 2) * 4}deg) translateY(${n % 2}px)` }}
            />
          ))}
        </div>
        <svg className="absolute bottom-2 right-2 h-12 w-12 text-red-400/30" viewBox="0 0 24 24" fill="none">
          <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      </div>
      <div className={`relative h-28 overflow-hidden rounded-xl border p-3 ${a.ring} ${a.bg}`}>
        <p className={`text-[9px] uppercase ${a.text}`}>Unified</p>
        <div className="mt-3 space-y-1.5">
          {[70, 88, 55].map((w) => (
            <div key={w} className="h-2 rounded-full bg-white/10">
              <div className={`h-full rounded-full ${a.bar}`} style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
