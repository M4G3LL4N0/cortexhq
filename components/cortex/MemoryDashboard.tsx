"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MemoryGraph } from "@/components/cortex/MemoryGraph";
import { MemoryHealthScore } from "@/components/cortex/MemoryHealthScore";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Metric } from "@/components/ui/Metric";
import { Tabs, type TabItem } from "@/components/ui/Tabs";
import { DASHBOARD_SEED, filterNodes, type DashboardDept, type SourceId } from "@/lib/dashboard-seed";

const DEPT_TABS: TabItem[] = [
  { id: "all", label: "All" },
  { id: "product", label: "Product" },
  { id: "engineering", label: "Engineering" },
  { id: "sales", label: "Sales" },
  { id: "customer-success", label: "CS" },
  { id: "leadership", label: "Leadership" },
];

const SOURCE_FILTERS: { id: SourceId | "all"; label: string }[] = [
  { id: "all", label: "All sources" },
  { id: "slack", label: "Slack" },
  { id: "docs", label: "Docs" },
  { id: "meetings", label: "Meetings" },
  { id: "github", label: "GitHub" },
  { id: "crm", label: "CRM" },
  { id: "support", label: "Support" },
];

export function MemoryDashboard() {
  const [dept, setDept] = useState<DashboardDept>("all");
  const [source, setSource] = useState<SourceId | "all">("all");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(DASHBOARD_SEED.graphNodes[0]?.id ?? null);

  const filteredNodes = useMemo(() => filterNodes(dept, source, DASHBOARD_SEED.graphNodes), [dept, source]);
  const selectedNode = DASHBOARD_SEED.graphNodes.find((n) => n.id === selectedNodeId) ?? null;

  const openDecisions = DASHBOARD_SEED.openDecisions.filter((d) => {
    if (dept !== "all" && d.department !== dept) return false;
    if (source !== "all" && !d.sources.includes(source)) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">Operating memory</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Company memory dashboard</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
            Simulated telemetry across Slack, docs, meetings, GitHub, CRM, and support. Filter by department and source,
            then click a graph node to inspect the memory object behind it.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:brightness-110"
          >
            Open interactive demo
          </Link>
          <Link
            href="/workspace"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/5"
          >
            Advanced ingest
          </Link>
        </div>
      </header>

      <MemoryHealthScore score={DASHBOARD_SEED.memoryHealth} />

      <Tabs tabs={DEPT_TABS} active={dept} onChange={(id) => setDept(id as DashboardDept)} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Source filter</p>
        <div className="flex flex-wrap gap-2">
          {SOURCE_FILTERS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSource(s.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                source === s.id
                  ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-50"
                  : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <Card className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">Knowledge graph</p>
              <Badge tone="violet">{filteredNodes.length} nodes</Badge>
            </div>
            <p className="mt-2 text-xs text-slate-500">Click a node to open the detail panel.</p>
            <div className="mt-4 hidden md:block">
              <MemoryGraph
                variant="dashboard"
                nodes={filteredNodes.length ? filteredNodes : DASHBOARD_SEED.graphNodes}
                selectedId={selectedNodeId}
                onSelect={(id) => setSelectedNodeId(id)}
              />
            </div>
            <div className="mt-4 md:hidden">
              <MemoryGraph
                variant="dashboard"
                nodes={filteredNodes.length ? filteredNodes : DASHBOARD_SEED.graphNodes}
                selectedId={selectedNodeId}
                onSelect={(id) => setSelectedNodeId(id)}
                simplify
              />
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            <Metric label="Open decisions" value={openDecisions.length} hint="Filtered by department and source." />
            <Metric
              label="Repeated questions (7d)"
              value={DASHBOARD_SEED.repeatedQuestions.length}
              hint="Captured from Slack and CS bots — demo counts."
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-4 sm:p-5">
              <p className="text-sm font-semibold text-white">Connected sources</p>
              <ul className="mt-4 space-y-3">
                {DASHBOARD_SEED.connectedSources.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-300">{s.name}</span>
                    <span className="flex items-center gap-2">
                      <Badge tone={s.status === "live" ? "cyan" : s.status === "syncing" ? "amber" : "neutral"}>
                        {s.status}
                      </Badge>
                      <span className="text-xs text-slate-500">{s.lastSync}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-4 sm:p-5">
              <p className="text-sm font-semibold text-white">Recent source activity</p>
              <ul className="mt-4 space-y-3 text-sm">
                {DASHBOARD_SEED.recentActivity.map((a) => (
                  <li key={`${a.time}-${a.summary}`} className="rounded-xl border border-white/10 bg-black/25 px-3 py-2">
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                      <span className="uppercase tracking-wide text-cyan-300/80">{a.source}</span>
                      <span>{a.time}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-300">{a.summary}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        <aside className="space-y-4">
          <Card className="p-4 sm:p-5 ring-1 ring-cyan-500/10">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Detail panel</p>
            {selectedNode ? (
              <>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-white">{selectedNode.label}</h2>
                  <Badge tone="violet">{selectedNode.type}</Badge>
                </div>
                <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">
                  Department · {selectedNode.department.replaceAll("-", " ")}
                </p>
                <p className="mt-3 text-sm text-slate-300">{selectedNode.summary}</p>
                <p className="mt-3 text-xs leading-relaxed text-slate-500">{selectedNode.detail}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedNode.sources.map((sid) => (
                    <Badge key={sid} tone="cyan">
                      {sid}
                    </Badge>
                  ))}
                  <span className="ml-auto text-xs tabular-nums text-slate-400">Confidence {selectedNode.confidence}%</span>
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm text-slate-500">Select a node on the graph.</p>
            )}
          </Card>

          <Card className="p-4 sm:p-5">
            <p className="text-sm font-semibold text-white">Open decisions</p>
            <ul className="mt-4 space-y-3">
              {openDecisions.map((d) => (
                <li key={d.id} className="rounded-xl border border-white/10 bg-black/25 p-3">
                  <p className="text-sm font-medium text-white">{d.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Owner {d.owner} · {d.ageDays}d open
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-4 sm:p-5">
            <p className="text-sm font-semibold text-white">Repeated questions</p>
            <ul className="mt-4 space-y-3 text-sm">
              {DASHBOARD_SEED.repeatedQuestions
                .filter((rq) => dept === "all" || rq.department === dept)
                .map((rq) => (
                  <li key={rq.q} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                    <p className="text-slate-200">{rq.q}</p>
                    <p className="mt-1 text-xs text-slate-500">{rq.count} repeats · {rq.department}</p>
                  </li>
                ))}
            </ul>
          </Card>

          <Card className="p-4 sm:p-5">
            <p className="text-sm font-semibold text-white">Stale docs</p>
            <ul className="mt-4 space-y-2 text-sm">
              {DASHBOARD_SEED.staleDocs.map((d) => (
                <li key={d.title} className="flex items-center justify-between gap-2 text-slate-300">
                  <span>{d.title}</span>
                  <span className="text-xs text-amber-300/90">{d.daysStale}d</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-4 sm:p-5">
            <p className="text-sm font-semibold text-white">Customer signals</p>
            <ul className="mt-4 space-y-3">
              {DASHBOARD_SEED.customerSignals
                .filter((c) => dept === "all" || c.department === dept)
                .map((c) => (
                  <li key={c.signal}>
                    <div className="flex items-center justify-between gap-2 text-sm text-slate-200">
                      <span>{c.signal}</span>
                      <span className="text-xs tabular-nums text-cyan-300/90">{c.strength}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                        style={{ width: `${c.strength}%` }}
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </Card>

          <Card className="p-4 sm:p-5">
            <p className="text-sm font-semibold text-white">Leadership priorities</p>
            <ul className="mt-4 space-y-3 text-sm">
              {DASHBOARD_SEED.leadershipPriorities.map((p) => (
                <li key={p.item} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                  <p className="text-slate-200">{p.item}</p>
                  <p className="mt-1 text-xs text-cyan-300/90">{p.owner}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-4 sm:p-5">
            <p className="text-sm font-semibold text-white">Risk radar</p>
            <ul className="mt-4 space-y-3">
              {DASHBOARD_SEED.riskRadar
                .filter((r) => dept === "all" || r.department === dept)
                .map((r) => (
                  <li key={r.risk} className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-white">{r.risk}</p>
                      <Badge tone={r.severity === "high" ? "rose" : r.severity === "medium" ? "amber" : "neutral"}>
                        {r.severity}
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{r.note}</p>
                  </li>
                ))}
            </ul>
          </Card>
        </aside>
      </div>

    </div>
  );
}
