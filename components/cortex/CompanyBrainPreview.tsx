"use client";

import { useMemo } from "react";
import { ContradictionPanel } from "@/components/cortex/ContradictionPanel";
import { DecisionTimeline } from "@/components/cortex/DecisionTimeline";
import { MemoryGraph } from "@/components/cortex/MemoryGraph";
import { OwnerActionQueue } from "@/components/cortex/OwnerActionQueue";
import { SourceTrail } from "@/components/cortex/SourceTrail";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { runCompanyBrainDemo } from "@/lib/company-demo-engine";

export function CompanyBrainPreview() {
  const demo = useMemo(
    () =>
      runCompanyBrainDemo({
        stage: "series-b",
        department: "leadership",
        connectedSources: ["slack", "docs", "meetings", "crm"],
        question: "What did we decide about enterprise pricing?",
        urgency: "normal",
      }),
    [],
  );

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-500/15 blur-3xl" />
      <Card className="relative overflow-hidden p-4 sm:p-6" glow>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Command query</p>
            <p className="mt-1 text-sm font-medium text-white sm:text-base">{demo.queryEcho}</p>
          </div>
          <Badge tone="violet">Live preview</Badge>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.06] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-cyan-200/90">Answer</span>
                <span className="rounded-full bg-black/30 px-2 py-0.5 text-[11px] tabular-nums text-cyan-100">
                  Confidence {demo.confidence}%
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">{demo.answer}</p>
              <ul className="mt-4 space-y-2 text-xs text-slate-400">
                {demo.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-0.5 text-cyan-400">▹</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <SourceTrail sources={demo.sources.slice(0, 3)} />
          </div>
          <div className="space-y-4">
            <MemoryGraph variant="hero" />
            <DecisionTimeline events={demo.decisionTimeline.slice(0, 3)} />
            <ContradictionPanel items={demo.contradictions.slice(0, 1)} />
            <OwnerActionQueue owners={demo.owners} actions={demo.nextActions} />
          </div>
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-slate-500">{demo.confidenceNote}</p>
      </Card>
    </div>
  );
}
