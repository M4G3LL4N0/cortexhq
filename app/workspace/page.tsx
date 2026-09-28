"use client";

import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DATA_SOURCES, type BrainInput, type BrainResult } from "@/lib/types";

const defaultNotes = `Product sync: enterprise pilot needs SSO by Friday. Sales thread mentions ACME wants volume pricing for 500 seats. Engineering blocked on flaky CI for release branch. Customer success flagged onboarding drop-off after step 3.`;

const defaultQuestion = `What are the top risks blocking the enterprise pilot and who should own the next actions?`;

export default function WorkspacePage() {
  const router = useRouter();
  const [sources, setSources] = useState<BrainInput["sources"]>(["Slack", "Tickets", "Meetings"]);
  const [notes, setNotes] = useState(defaultNotes);
  const [question, setQuestion] = useState(defaultQuestion);
  const [result, setResult] = useState<BrainResult | null>(null);
  const [runId, setRunId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function toggleSource(s: (typeof DATA_SOURCES)[number]) {
    setSources((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sources.length === 0) {
      alert("Select at least one data source.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/brain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sources, notes, question }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setResult(data.result);
      setRunId(data.id);
    } catch (err) {
      console.error(err);
      alert("Could not run company brain.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <SubpageVisual variant="dashboard" />
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <section className="glass p-6 sm:p-8">
        <h1 className="text-xl font-semibold text-white sm:text-2xl">Knowledge ingestion simulator</h1>
        <p className="mt-2 text-sm text-slate-400">
          Prefer the full guided experience first:{" "}
          <Link className="text-cyan-400 hover:underline" href="/demo">
            Ask the Company Brain
          </Link>
          . This path is for pasting a richer internal corpus and running the Prisma-backed simulator.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-6">
          <fieldset>
            <legend className="text-sm font-medium text-slate-300">Data sources</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {DATA_SOURCES.map((s) => (
                <label
                  key={s}
                  className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    sources.includes(s)
                      ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-100"
                      : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={sources.includes(s)}
                    onChange={() => toggleSource(s)}
                  />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block text-sm font-medium text-slate-300">
            Sample company notes
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2 min-h-40 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none ring-cyan-500/20 focus:border-cyan-500/40 focus:ring-4"
            />
          </label>

          <label className="block text-sm font-medium text-slate-300">
            Ask the company
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-2 min-h-20 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none ring-violet-500/20 focus:border-violet-500/40 focus:ring-4"
            />
          </label>

          <button type="submit" disabled={loading} className="glow-btn disabled:opacity-50">
            {loading ? "Querying…" : "Run company brain"}
          </button>
        </form>
      </section>

      <section className="glass p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-white">Structured answer</h2>
        {!result ? (
          <p className="mt-4 text-sm text-slate-500">Run a query to see answers, sources, decisions, and memory map.</p>
        ) : (
          <div className="mt-4 space-y-6">
            <p className="text-sm font-medium text-violet-200">{result.executiveLine}</p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
              {result.structuredAnswer.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <div>
              <h3 className="text-sm font-semibold text-white">Source cards</h3>
              <ul className="mt-2 space-y-2">
                {result.sourceCards.map((c) => (
                  <li
                    key={`${c.source}-${c.title}`}
                    className="rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-xs text-slate-300"
                  >
                    <span className="font-semibold text-cyan-300">{c.source}</span> · {c.title}
                    <p className="mt-1 text-slate-400">{c.excerpt}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-white">Open decisions</h3>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-400">
                  {result.openDecisions.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Owners</h3>
                <ul className="mt-2 space-y-1 text-xs text-slate-400">
                  {result.ownerAssignments.map((o) => (
                    <li key={o.item} className="rounded-lg bg-white/5 px-2 py-1">
                      <span className="text-slate-200">{o.item}</span> →{" "}
                      <span className="text-cyan-300">{o.owner}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Company memory map</h3>
              <div className="mt-3 space-y-2">
                {result.memoryMap.map((m) => (
                  <div
                    key={m.theme}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs"
                  >
                    <span className="font-medium text-slate-200">{m.theme}</span>
                    <span className="text-slate-500">{m.linkedSources.join(" · ")}</span>
                    <span className="tabular-nums text-violet-300">{Math.round(m.weight * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
            {runId ? (
              <button
                type="button"
                onClick={() => router.push(`/dashboard/runs/${runId}`)}
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white hover:bg-white/5"
              >
                Open run detail
              </button>
            ) : null}
          </div>
        )}
      </section>
    </div>
  </>
  )
}
