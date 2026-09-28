"use client";

import { omniVenture } from "@/lib/omni-venture";
import { FeatureMiniVisual } from "@/components/premium/FeatureMiniVisual";

export function FeatureVisualGrid() {
  const { features } = omniVenture;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-semibold text-white">{features.title}</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.items.map((item, index) => (
          <article
            key={item.title}
            className="group rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-white/20 hover:bg-slate-900/80"
          >
            <FeatureMiniVisual index={index} />
            <h3 className="font-medium text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
