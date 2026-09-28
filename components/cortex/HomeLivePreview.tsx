"use client";

import { useMemo, useState } from "react";
import { runCompanyBrainDemo, PRESET_DEMO_QUESTIONS } from "@/lib/company-demo-engine";
import { ContradictionPanel } from "@/components/cortex/ContradictionPanel";
import { DecisionTimeline } from "@/components/cortex/DecisionTimeline";
import { KnowledgeSourceCard } from "@/components/cortex/KnowledgeSourceCard";
import { OwnerActionQueue } from "@/components/cortex/OwnerActionQueue";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function HomeLivePreview() {
  const [q, setQ] = useState<string>(PRESET_DEMO_QUESTIONS[2]);

  const result = useMemo(
    () =>
      runCompanyBrainDemo({
        stage: "series-a",
        department: "product",
        connectedSources: ["slack", "docs", "github", "support"],
        question: q,
        urgency: "normal",
      }),
    [q],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {PRESET_DEMO_QUESTIONS.map((preset) => (
          <Button
            key={preset}
            variant={preset === q ? "primary" : "secondary"}
            type="button"
            className="w-full text-left sm:w-auto"
            onClick={() => setQ(preset)}
          >
            {preset}
          </Button>
        ))}
      </div>

      <Card className="p-5 sm:p-6" glow>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-white">Answer</p>
          <div className="flex items-center gap-2">
            <Badge tone="cyan">Interactive</Badge>
            <span className="text-xs tabular-nums text-slate-400">Confidence {result.confidence}%</span>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-200">{result.answer}</p>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {result.sources.slice(0, 2).map((s) => (
          <KnowledgeSourceCard key={s.id} card={s} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DecisionTimeline events={result.decisionTimeline.slice(0, 3)} />
        <div className="space-y-4">
          <ContradictionPanel items={result.contradictions.slice(0, 1)} />
          <OwnerActionQueue owners={result.owners.slice(0, 3)} actions={result.nextActions.slice(0, 3)} />
        </div>
      </div>
    </div>
  );
}
