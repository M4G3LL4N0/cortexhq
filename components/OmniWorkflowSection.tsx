"use client";

import { omniVenture } from "@/lib/omni-venture";
import { omniAccent } from "@/lib/omni-accent";

export function OmniWorkflowSection() {
  const { workflow, accent } = omniVenture;
  const a = omniAccent(accent);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="omni-workflow-title">
      <h2 id="omni-workflow-title" className="text-2xl font-semibold text-white">
        {workflow.title}
      </h2>
      <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {workflow.steps.map((step, i) => (
          <li key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <span
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-sm font-semibold text-white ${a.bg}`}
            >
              {i + 1}
            </span>
            <h3 className="mt-4 font-medium text-white">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
