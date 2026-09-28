"use client";

import { omniVenture } from "@/lib/omni-venture";
import { omniAccent } from "@/lib/omni-accent";
import { BeforeAfterGraphic } from "@/components/premium/BeforeAfterGraphic";

export function ProblemContrastSection() {
  const { problem, accent } = omniVenture;
  const a = omniAccent(accent);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-semibold text-white">{problem.title}</h2>
      <BeforeAfterGraphic />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-red-500/20 bg-red-950/20 p-6">
          <p className="text-xs uppercase text-red-300">Before</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            {problem.before.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={`rounded-2xl border p-6 ${a.ring} ${a.bg}`}>
          <p className={`text-xs uppercase ${a.text}`}>After {omniVenture.name}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {problem.after.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
