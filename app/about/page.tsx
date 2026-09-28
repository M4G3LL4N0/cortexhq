import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { Card } from "@/components/ui/Card";
import { SectionShell } from "@/components/ui/SectionShell";

export const metadata = {
  title: "About — CortexHQ",
  description: "CortexHQ is operating memory for the company: source-backed answers, decision timelines, and next actions.",
};

export default function AboutPage() {
  return (
    <>
    <SubpageVisual variant="about" />
      <div className="space-y-12">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">About CortexHQ</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Operating memory for companies that move fast.</h1>
        <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
          CortexHQ is a company brain: it connects the messy knowledge scattered across Slack, email, docs, tickets,
          meetings, GitHub, CRM notes, customer calls, and internal decisions into one living memory system. The promise is
          simple — ask your company anything and get the answer, the source, the decision history, and the next action.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/demo" className="glow-btn inline-flex justify-center">
            Try the interactive demo
          </Link>
          <Link href="/sources" className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/5">
            How sources work
          </Link>
        </div>
      </header>

      <SectionShell
        eyebrow="Thesis"
        title="Knowledge debt compounds in silence"
        description="Teams do not fail because they lack intelligence. They fail because nobody can find the last decision, the customer truth, or the owner — under time pressure."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-5">
            <p className="text-lg font-semibold text-white">Not a chat app</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Chat is ephemeral. CortexHQ is built around durable memory objects: decisions, owners, evidence, and change
              over time.
            </p>
          </Card>
          <Card className="p-5">
            <p className="text-lg font-semibold text-white">Not a search bar</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Search returns documents. CortexHQ returns answers with receipts — and tells you when sources disagree.
            </p>
          </Card>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Who it is for"
        title="Leaders who feel context slipping through the cracks"
        description="Founders, chiefs of staff, product and engineering leaders, and GTM operators who need a serious intelligence layer — not another wrapper."
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "Founders and CEOs who need an honest operating picture under board questions.",
            "Chiefs of staff translating leadership intent into durable records.",
            "Product and engineering leaders reconciling roadmap reality with customer commitments.",
            "Sales and CS leaders who need repeating objections and deal risks in one place.",
          ].map((item) => (
            <li key={item} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300">
              {item}
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell
        eyebrow="This MVP"
        title="What is real in this build"
        description="CortexHQ here is a product prototype: polished UI, local mock intelligence, optional Prisma-backed runs in the workspace path, and zero live connector access."
      >
        <Card className="p-5 sm:p-6">
          <p className="text-sm leading-relaxed text-slate-300">
            Use <Link className="text-cyan-400 hover:underline" href="/demo">Ask the Company Brain</Link> for the full
            interactive surface, <Link className="text-cyan-400 hover:underline" href="/dashboard">the memory dashboard</Link>{" "}
            for operating telemetry, and <Link className="text-cyan-400 hover:underline" href="/workspace">advanced ingest</Link>{" "}
            when you want to paste a corpus and run the Prisma-backed simulator.
          </p>
        </Card>
      </SectionShell>
    </div>
  </>
  )
}
