"use client";

import { useState } from "react";
import { expansionOSConfig } from "./expansion-os.config";

type Tab = "overview" | "memory" | "agents" | "launch";

function cx(...p: (string | false | undefined)[]) {
  return p.filter(Boolean).join(" ");
}

function StatusPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-slate-400">
      {label}
    </span>
  );
}

export function ExpansionOSPanel(props: Partial<typeof expansionOSConfig> & { className?: string }) {
  const cfg = { ...expansionOSConfig, ...props };
  const [tab, setTab] = useState<Tab>("overview");
  const [advanced, setAdvanced] = useState(false);

  return (
    <section
      className={cx("expansion-os mx-auto max-w-6xl px-4 py-10 sm:px-6", cfg.className)}
      aria-labelledby="expansion-os-heading"
    >
      <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-950/30 to-slate-950/40 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-violet-300/90">
              TrillionX expansion OS
            </p>
            <h2 id="expansion-os-heading" className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              {cfg.productName}: ship now, build next, stay honest
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
              Preview workspace modules — memory, agents, launch kit. Private drafts until you approve.
              Demo labels on sample outputs. Nothing public without you.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAdvanced((v) => !v)}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/5"
          >
            {advanced ? "Simple view" : "Advanced view"}
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2" role="tablist">
          {(
            [
              ["overview", "Overview"],
              ["memory", "Memory"],
              ["agents", "Agents"],
              ["launch", "Launch kit"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cx(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition",
                tab === id
                  ? "bg-violet-500/20 text-violet-100 border border-violet-400/30"
                  : "border border-white/10 text-slate-400 hover:text-white",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {cfg.scores.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">{s.label}</p>
                <p className="mt-1 text-2xl font-semibold text-white">{s.score}</p>
                <p className="mt-1 text-xs text-slate-500">{s.note}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "memory" && (
          <div className="mt-6 space-y-3">
            <StatusPill label="Preview · private draft" />
            <div className="grid gap-3 sm:grid-cols-2">
              {cfg.memoryCards.map((c) => (
                <div key={c.title} className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-medium text-white">{c.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{c.body}</p>
                  <div className="mt-2">
                    <StatusPill label={c.status} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500">
              Full persistence: PLANNED — connect workspace DB when ready. Export anytime when live.
            </p>
          </div>
        )}

        {tab === "agents" && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cfg.agents.map((a) => (
              <div key={a.role} className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-white">{a.role}</p>
                  <StatusPill label={a.status} />
                </div>
                <p className="mt-2 text-xs text-slate-500">{a.task}</p>
                <p className="mt-2 text-[10px] text-amber-200/80">Needs your approval before external action</p>
              </div>
            ))}
          </div>
        )}

        {tab === "launch" && (
          <div className="mt-6 space-y-3">
            <ul className="space-y-2 text-sm text-slate-400">
              {cfg.launchChecklist.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-violet-400">○</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500">
              Full launch kit: see <code className="text-violet-300">EXPANSION_TRILLIONX_REPORT.md</code> in this repo.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
          {cfg.links.map((l) => (
            <a key={l.href}
              href={l.href as string}
              className="rounded-lg border border-white/15 px-4 py-2 text-xs font-medium text-slate-200 hover:border-violet-400/40 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        {advanced && (
          <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 text-xs text-slate-500">
            <p className="font-medium text-slate-400">Ship now / Build next / Avoid</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              {cfg.roadmap.shipNow.map((x) => (
                <li key={x}>Now: {x}</li>
              ))}
              {cfg.roadmap.buildNext.map((x) => (
                <li key={x}>Next: {x}</li>
              ))}
              {cfg.roadmap.avoid.map((x) => (
                <li key={x}>Avoid: {x}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
