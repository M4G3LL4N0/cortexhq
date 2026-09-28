"use client";

import { useMemo, useState } from "react";
import { ContradictionPanel } from "@/components/cortex/ContradictionPanel";
import { DecisionTimeline } from "@/components/cortex/DecisionTimeline";
import { OwnerActionQueue } from "@/components/cortex/OwnerActionQueue";
import { SourceTrail } from "@/components/cortex/SourceTrail";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { runCompanyBrainDemo, PRESET_DEMO_QUESTIONS } from "@/lib/company-demo-engine";
import type {
  CompanyDemoInput,
  CompanyStage,
  DepartmentFocus,
  DemoSourceId,
  Urgency,
} from "@/lib/company-demo-types";

const STAGES: { id: CompanyStage; label: string }[] = [
  { id: "seed", label: "Seed" },
  { id: "series-a", label: "Series A" },
  { id: "series-b", label: "Series B" },
  { id: "enterprise", label: "Enterprise pilot" },
];

const DEPTS: { id: DepartmentFocus; label: string }[] = [
  { id: "product", label: "Product" },
  { id: "engineering", label: "Engineering" },
  { id: "sales", label: "Sales" },
  { id: "customer-success", label: "Customer success" },
  { id: "leadership", label: "Leadership" },
];

const SOURCE_TOGGLES: { id: DemoSourceId; label: string }[] = [
  { id: "slack", label: "Slack" },
  { id: "docs", label: "Docs" },
  { id: "meetings", label: "Meetings" },
  { id: "github", label: "GitHub" },
  { id: "crm", label: "CRM" },
  { id: "support", label: "Support tickets" },
];

const URGENCY: { id: Urgency; label: string }[] = [
  { id: "low", label: "Low" },
  { id: "normal", label: "Normal" },
  { id: "high", label: "High" },
];

const defaultInput: CompanyDemoInput = {
  stage: "series-a",
  department: "leadership",
  connectedSources: ["slack", "docs", "meetings", "github", "crm", "support"],
  question: PRESET_DEMO_QUESTIONS[0],
  urgency: "normal",
};

export function AskCompanyDemo() {
  const [input, setInput] = useState<CompanyDemoInput>(defaultInput);
  const [questionCustom, setQuestionCustom] = useState("");

  const activeQuestion = questionCustom.trim().length >= 8 ? questionCustom.trim() : input.question;

  const result = useMemo(
    () =>
      runCompanyBrainDemo({
        ...input,
        question: activeQuestion,
      }),
    [input, activeQuestion],
  );

  function toggleSource(id: DemoSourceId) {
    setInput((prev) => {
      const has = prev.connectedSources.includes(id);
      const next = has ? prev.connectedSources.filter((s) => s !== id) : [...prev.connectedSources, id];
      return { ...prev, connectedSources: next.length ? next : prev.connectedSources };
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <Card className="space-y-6 p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Ask the Company Brain</h2>
          <p className="mt-2 text-sm text-slate-400">
            Local mock logic only — tune stage, department, connectors, and urgency to see how CortexHQ would assemble
            source-backed answers, timelines, and actions.
          </p>
        </div>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wide text-slate-500">Company stage</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {STAGES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setInput((p) => ({ ...p, stage: s.id }))}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  input.stage === s.id
                    ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-50"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wide text-slate-500">Department focus</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {DEPTS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setInput((p) => ({ ...p, department: d.id }))}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  input.department === d.id
                    ? "border-violet-400/50 bg-violet-500/15 text-violet-50"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wide text-slate-500">Connected sources</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {SOURCE_TOGGLES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => toggleSource(s.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  input.connectedSources.includes(s.id)
                    ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-50"
                    : "border-white/10 bg-white/[0.03] text-slate-500 hover:border-white/20"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wide text-slate-500">Demo questions</legend>
          <div className="mt-3 flex flex-col gap-2">
            {PRESET_DEMO_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => {
                  setQuestionCustom("");
                  setInput((p) => ({ ...p, question: q }));
                }}
                className={`rounded-xl border px-3 py-2 text-left text-xs leading-relaxed transition sm:text-sm ${
                  activeQuestion === q && questionCustom.trim().length < 8
                    ? "border-violet-400/40 bg-violet-500/10 text-white"
                    : "border-white/10 bg-black/20 text-slate-300 hover:border-white/20"
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block text-sm font-medium text-slate-300">
          Or ask freeform (min 8 characters)
          <textarea
            value={questionCustom}
            onChange={(e) => setQuestionCustom(e.target.value)}
            placeholder="What did leadership decide about hiring exceptions?"
            className="mt-2 min-h-24 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none ring-cyan-500/20 focus:border-cyan-500/40 focus:ring-4"
          />
        </label>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wide text-slate-500">Urgency</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {URGENCY.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setInput((p) => ({ ...p, urgency: u.id }))}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  input.urgency === u.id
                    ? "border-amber-400/40 bg-amber-500/10 text-amber-50"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20"
                }`}
              >
                {u.label}
              </button>
            ))}
          </div>
        </fieldset>

        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            setInput(defaultInput);
            setQuestionCustom("");
          }}
        >
          Reset demo
        </Button>
      </Card>

      <div className="space-y-4">
        <Card className="p-5 sm:p-6" glow>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="cyan">Generated answer</Badge>
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] tabular-nums text-slate-300">
              Confidence {result.confidence}%
            </span>
          </div>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-100">{result.answer}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            {result.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-violet-400">▹</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">{result.confidenceNote}</p>
        </Card>

        <SourceTrail sources={result.sources} />
        <DecisionTimeline events={result.decisionTimeline} />
        <ContradictionPanel items={result.contradictions} />
        <OwnerActionQueue owners={result.owners} actions={result.nextActions} />
      </div>
    </div>
  );
}
