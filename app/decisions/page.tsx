import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { Card } from "@/components/ui/Card";
import { SectionShell } from "@/components/ui/SectionShell";

export const metadata = {
  title: "Decisions — CortexHQ",
  description: "Decision trails, owners, and how CortexHQ remembers what the company decided — with sources.",
};

export default function DecisionsPage() {
  return (
    <>
    <SubpageVisual variant="default" />
      <div className="space-y-12">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">Decisions</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Decision memory is a system, not a meeting note</h1>
        <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
          CortexHQ tracks decisions as timelines: what changed, who approved it, which sources support the current state,
          and what still conflicts. The goal is to stop repeating debates because nobody can find the last resolution.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/timeline" className="text-cyan-400 hover:underline">
            Open run-backed timeline →
          </Link>
          <Link href="/demo" className="text-slate-400 hover:text-white hover:underline">
            Explore contradictions in the demo →
          </Link>
        </div>
      </header>

      <SectionShell
        eyebrow="Principles"
        title="What a decision object contains"
        description="Every durable decision should be answerable in the same shape: narrative, evidence, owners, and next actions."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Timeline", body: "Ordered events across Slack, meetings, and docs — not a single static summary." },
            { title: "Owners", body: "DRIs and approvers are explicit so execution survives calendar churn." },
            { title: "Contradictions", body: "When sources disagree, CortexHQ surfaces the tension for resolution." },
          ].map((b) => (
            <Card key={b.title} className="p-5">
              <p className="text-base font-semibold text-white">{b.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{b.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <Card className="p-6">
        <p className="text-sm font-semibold text-white">Try it in the product paths</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          The interactive demo generates decision timelines from mock logic. The timeline route lists open decisions captured
          from stored brain runs when you use advanced ingest.
        </p>
      </Card>
    </div>
  </>
  )
}
