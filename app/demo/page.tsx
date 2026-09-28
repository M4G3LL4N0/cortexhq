import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { AskCompanyDemo } from "@/components/cortex/AskCompanyDemo";
import { SectionShell } from "@/components/ui/SectionShell";

export const metadata = {
  title: "Ask the Company Brain — CortexHQ",
  description: "Interactive demo: stage, department, sources, urgency, and source-backed answers with timelines and actions.",
};

export default function DemoPage() {
  return (
    <>
    <SubpageVisual variant="demo" />
      <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">Interactive demo</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Ask the Company Brain</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          CortexHQ connects evidence across Slack, docs, meetings, GitHub, CRM, and support. This page runs entirely on
          local mock logic — no paid APIs — so you can feel how answers, sources, and contradictions should line up in a
          production deployment.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/dashboard" className="text-cyan-400 hover:underline">
            Memory dashboard →
          </Link>
          <Link href="/workspace" className="text-slate-400 hover:text-white hover:underline">
            Advanced ingest (paste corpus) →
          </Link>
        </div>
      </header>

      <AskCompanyDemo />

      <SectionShell
        title="What you are seeing"
        description="The demo is intentionally opinionated: it always returns sources, a confidence posture, a decision trail, contradictions when patterns match, owners, and recommended next actions."
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "Question patterns map to realistic internal debates (pricing, SSO, risks, eng/sales promises, CEO focus).",
            "Turning off a connector removes it from the source trail — grounding tightens when evidence thins.",
            "Urgency adjusts confidence calibration in the mock to mirror recency-weighted retrieval.",
          ].map((t) => (
            <li key={t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
              {t}
            </li>
          ))}
        </ul>
      </SectionShell>
    </div>
  </>
  )
}
