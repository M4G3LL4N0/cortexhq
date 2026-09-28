"use client";

import { omniVenture } from "@/lib/omni-venture";
import { omniAccent } from "@/lib/omni-accent";

export function ConversionCTAVisual() {
  const { cta, accent } = omniVenture;
  const a = omniAccent(accent);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-slate-950 to-slate-950 p-8">
        <h2 className="text-2xl font-semibold text-white">{cta.title}</h2>
        <p className="mt-2 text-sm text-slate-400">{cta.body}</p>
        <p className={`mt-6 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${a.bg} ${a.cta}`}>
          {cta.label}
        </p>
      </div>
    </section>
  );
}
