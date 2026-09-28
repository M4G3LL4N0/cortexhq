import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { Card } from "@/components/ui/Card";
import { SectionShell } from "@/components/ui/SectionShell";

export const metadata = {
  title: "Sources — CortexHQ",
  description: "How CortexHQ treats Slack, docs, meetings, GitHub, CRM, and support as evidence — not noise.",
};

const sources = [
  {
    name: "Slack",
    body: "Fast decisions and debates live here first. CortexHQ extracts decision candidates, owners, and contradictions before they scroll away.",
  },
  {
    name: "Docs",
    body: "Policies and PRDs are long-lived — and often stale. CortexHQ flags when docs diverge from newer threads or CRM reality.",
  },
  {
    name: "Meetings",
    body: "Notes capture intent and nuance. CortexHQ links meeting takeaways to tickets, deals, and engineering milestones.",
  },
  {
    name: "GitHub",
    body: "Shipping truth lives in issues and PRs. CortexHQ connects customer-facing promises to what actually merged.",
  },
  {
    name: "CRM",
    body: "Opportunity notes encode what was promised externally. CortexHQ treats CRM as a first-class evidence surface.",
  },
  {
    name: "Support",
    body: "Tickets show repeating pain. CortexHQ clusters themes and routes them to product and CS leadership views.",
  },
];

export default function SourcesPage() {
  return (
    <>
    <SubpageVisual variant="default" />
      <div className="space-y-12">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">Sources</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Evidence surfaces, normalized into memory</h1>
        <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
          CortexHQ is built on a simple rule: if it cannot be tied to a source, it does not belong in operating memory. Each
          connector contributes cards with confidence, freshness, and linkage into decisions and owners.
        </p>
        <Link href="/demo" className="inline-flex text-sm font-semibold text-cyan-400 hover:underline">
          See sources in the interactive demo →
        </Link>
      </header>

      <SectionShell
        eyebrow="Model"
        title="Ingest → organize → verify"
        description="Ingestion is not copying files. It is turning raw events into memory objects your leadership can trust."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {sources.map((s) => (
            <Card key={s.name} className="p-5" glow>
              <p className="text-lg font-semibold text-white">{s.name}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <Card className="p-6">
        <p className="text-sm font-semibold text-white">Trust signals in the UI</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Source cards carry confidence scores and staleness warnings. Contradictions appear when two high-trust surfaces
          disagree — because hiding conflict creates more knowledge debt, not less.
        </p>
      </Card>
    </div>
  </>
  )
}
