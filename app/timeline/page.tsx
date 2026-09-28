"use client";

import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { useEffect, useState } from "react";

type Run = {
  id: string;
  createdAt: string;
  result: { openDecisions?: string[]; executiveLine?: string };
};

export default function TimelinePage() {
  const [runs, setRuns] = useState<Run[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/brain");
      const data = await res.json();
      setRuns(data.runs ?? []);
    }
    void load();
  }, []);

  return (
    <>
    <SubpageVisual variant="default" />
      <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">Decision memory timeline</h1>
          <p className="mt-2 max-w-xl text-sm text-slate-400">
            Open decisions captured from each brain run, ordered newest first. Assign owners in the
            workspace output and sync in your real tools of record.
          </p>
        </div>
        <Link href="/workspace" className="glow-btn">
          Add run (ingest)
        </Link>
      </header>

      <div className="space-y-0">
        {runs.length === 0 ? (
          <p className="text-sm text-slate-500">No decisions yet.</p>
        ) : (
          runs.map((run) => (
            <article key={run.id} className="relative border-l border-white/10 pl-8 pb-12 last:pb-0">
              <span className="absolute left-[-6.5px] top-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/50 ring-4 ring-[#070a12]" />
              <time className="text-xs text-slate-500">
                {new Date(run.createdAt).toLocaleString(undefined, {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </time>
              <p className="mt-1 text-sm text-violet-200">{run.result?.executiveLine}</p>
              <ul className="mt-3 space-y-2">
                {(run.result?.openDecisions ?? []).map((d) => (
                  <li
                    key={`${run.id}-${d}`}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300"
                  >
                    {d}
                  </li>
                ))}
              </ul>
              <Link
                href={`/dashboard/runs/${run.id}`}
                className="mt-2 inline-block text-xs font-semibold text-cyan-400 hover:underline"
              >
                Open run →
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  </>
  )
}
