"use client";

import { omniVenture } from "@/lib/omni-venture";
import { omniAccent } from "@/lib/omni-accent";
import { PremiumHeroVisual } from "@/components/premium/PremiumHeroVisual";

export function HeroProductPanel() {
  const { hero, accent, name } = omniVenture;
  const a = omniAccent(accent);

  return (
    <div className="relative w-full space-y-4" aria-label={`${name} product preview`}>
      <PremiumHeroVisual />
      <div
        className={`relative rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 backdrop-blur sm:p-6 ring-1 ${a.ring}`}
      >
        <p className={`text-xs font-semibold uppercase ${a.text}`}>{hero.workspace}</p>
        <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${a.bg} ${a.badge}`}>{hero.badge}</span>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {hero.metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
              <p className="text-[10px] uppercase text-slate-500">{m.label}</p>
              <p className="mt-0.5 text-sm font-semibold text-white">{m.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-2 rounded-xl border border-white/10 bg-black/30 p-3">
          {hero.pipeline.map((step, i) => (
            <div key={step.label} className="flex items-start gap-2 text-xs text-slate-300">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[10px]">
                {i + 1}
              </span>
              <span>
                <span className="font-medium text-white">{step.label}</span>
                {step.detail ? <span className="text-slate-500"> — {step.detail}</span> : null}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[10px] text-slate-500">Sample workspace — demo data for walkthrough only.</p>
      </div>
    </div>
  );
}
