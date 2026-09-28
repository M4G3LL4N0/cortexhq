"use client";

import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { useEffect, useState } from "react";
import type { BrainInput, BrainResult } from "@/lib/types";

type Run = { id: string; createdAt: string; inputs: BrainInput; result: BrainResult };

export default function RunDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [run, setRun] = useState<Run | null>(null);

  useEffect(() => {
    async function load() {
      const { id } = await params;
      const res = await fetch(`/api/brain/${id}`);
      const data = (await res.json()) as { run?: Run };
      if (data.run) setRun(data.run as Run);
    }
    void load();
  }, [params]);

  if (!run) {
    return <p className="text-slate-500">Loading run…</p>;
  }

  const { result: r, inputs } = run;

  return (
    <>
    <SubpageVisual variant="dashboard" />
      <div className="space-y-8">
      <Link href="/dashboard" className="text-sm font-medium text-cyan-400 hover:underline">
        ← Dashboard
      </Link>
      <header className="glass p-6 sm:p-8">
        <p className="text-xs text-slate-500">
          {new Date(run.createdAt).toLocaleString()} · {r.modelVersion}
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-white">Run detail</h1>
        <p className="mt-2 text-sm text-violet-200">{r.executiveLine}</p>
        <p className="mt-4 text-sm text-slate-400">
          <span className="font-medium text-slate-300">Question:</span> {inputs.question}
        </p>
        <p className="mt-2 text-xs text-slate-500">Sources: {inputs.sources.join(", ")}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="glass p-6">
          <h2 className="text-sm font-semibold text-white">Structured answer</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
            {r.structuredAnswer.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
        <section className="glass p-6">
          <h2 className="text-sm font-semibold text-white">Source cards</h2>
          <ul className="mt-3 space-y-2">
            {r.sourceCards.map((c) => (
              <li key={`${c.source}-${c.title}`} className="rounded-lg border border-white/10 bg-black/30 p-3 text-xs text-slate-400">
                <span className="font-semibold text-cyan-300">{c.source}</span> — {c.title}
                <p className="mt-1">{c.excerpt}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="glass p-6">
        <h2 className="text-sm font-semibold text-white">Memory map</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {r.memoryMap.map((m) => (
            <div key={m.theme} className="rounded-xl border border-violet-500/20 bg-violet-950/30 p-4 text-center">
              <p className="text-sm font-medium text-white">{m.theme}</p>
              <p className="mt-2 text-xs text-slate-400">{m.linkedSources.join(" · ")}</p>
              <p className="mt-2 text-lg font-bold text-cyan-300">{Math.round(m.weight * 100)}%</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  </>
  )
}
