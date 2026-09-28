"use client";

import { omniVenture } from "@/lib/omni-venture";
import { omniAccent } from "@/lib/omni-accent";

export function SolutionPipelineGraphic() {
  const { pipeline, accent } = omniVenture;
  const a = omniAccent(accent);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
        <p className={`text-xs uppercase ${a.text}`}>{pipeline.kicker}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {pipeline.steps.map((step, i) => (
            <div key={step} className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <span className={`font-semibold ${a.text}`}>{i + 1}</span>{" "}
              <span className="text-sm text-white">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
