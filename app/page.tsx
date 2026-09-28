import Link from "next/link";
import { PremiumHeroVisual } from "@/components/premium/PremiumHeroVisual";
import { HeroProductPanel } from "@/components/HeroProductPanel";
import { ProductHonestyNote } from "@/components/ProductHonestyNote";
import { MarketingGraphicsStack } from "@/components/MarketingGraphicsStack";
import { ProcessFlowSection } from "@/components/ProcessFlowSection";
import { CompanyBrainPreview } from "@/components/cortex/CompanyBrainPreview";
import { HomeLivePreview } from "@/components/cortex/HomeLivePreview";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionShell } from "@/components/ui/SectionShell";
import { KissHero } from "@/components/KissHero";
import { ExpertCouncilUpgrade } from "@/components/ExpertCouncilUpgrade";
import { TrillionXV3ReadinessStrip } from "@/components/TrillionXV3ReadinessStrip";
import { DistinctVentureHero } from "@/components/visual/DistinctVentureHero";
import { DomainCommandGraphic } from "@/components/visual/DomainCommandGraphic";
import { HeroGraphicPanel } from "@/components/visual/HeroGraphicPanel";

const problemPoints = [
  "Slack threads disappear under velocity — decisions never become records.",
  "Docs go stale the week after they ship — teams still cite them in customer calls.",
  "The same debates repeat because nobody can find the last resolution.",
  "Customer feedback is scattered across tickets, calls, and CRM notes.",
  "New hires ask questions a tenured operator already answered — somewhere.",
  "Leaders lose operating context when work spans tools and time zones.",
];

const workflow = [
  { title: "Ingest", body: "Pull signals from Slack, docs, meetings, code, CRM, and support — normalized into memory objects." },
  { title: "Organize", body: "Cluster by customer, decision, project, and owner — not by whichever channel was loudest." },
  { title: "Ask", body: "Ask in plain language. CortexHQ returns the answer, the source trail, and what changed over time." },
  { title: "Verify sources", body: "Every claim links to evidence. Stale docs get flagged when they disagree with newer threads." },
  { title: "Assign next actions", body: "Owners and follow-ups are extracted so execution does not die in chat." },
  { title: "Remember decisions", body: "Decision timelines become durable operating memory — not a one-off summary." },
];

const useCases = [
  {
    title: "Founder operating memory",
    body: "Hold the company’s decision graph in one place — what changed, who approved it, and what still conflicts.",
  },
  {
    title: "Product decision retrieval",
    body: "Recover the rationale behind scope calls, pricing experiments, and roadmap bets with linked evidence.",
  },
  {
    title: "Customer feedback synthesis",
    body: "See repeating objections and signals across support, CRM, and calls — with confidence and freshness.",
  },
  {
    title: "Onboarding new hires",
    body: "Give every hire the context of a tenured operator: decisions, owners, and where truth lives today.",
  },
  {
    title: "Investor update prep",
    body: "Assemble metrics, milestones, and risks with sources so the narrative matches reality under questions.",
  },
  {
    title: "Engineering context recovery",
    body: "Reconnect promises in tickets and Slack to what shipped in GitHub — before dates drift externally.",
  },
];

const trustPoints = [
  { title: "Every answer has sources", body: "No anonymous summaries — evidence cards show where the claim came from." },
  { title: "Stale info gets flagged", body: "When a doc disagrees with newer Slack or CRM truth, CortexHQ surfaces the gap." },
  { title: "Decisions have timelines", body: "See how a decision evolved across meetings, threads, and revisions — not just the last line." },
  { title: "Owners are extracted", body: "DRIs and approvers are attached to memory objects so accountability stays visible." },
  { title: "Contradictions are surfaced", body: "Conflicting signals are shown for resolution instead of being averaged away." },
];

const faq = [
  {
    q: "Where does my data live in this demo?",
    a: "This build runs locally with simulated connectors. Nothing here reaches Slack, email, or your CRM. Advanced ingest lets you paste sample notes into the workspace simulator.",
  },
  {
    q: "How do you reduce wrong answers?",
    a: "CortexHQ is designed around source trails, confidence, and contradiction detection. When evidence is thin, the UI should say so — this demo encodes that posture in mock outputs.",
  },
  {
    q: "Which integrations ship first?",
    a: "The product direction assumes Slack, docs, meetings, GitHub, CRM, and support are the backbone. This MVP visualizes that stack without requiring paid APIs.",
  },
  {
    q: "How does team onboarding work?",
    a: "Start with department lenses and source filters, then expand connectors as trust grows. The dashboard is built to train the org on operating memory habits.",
  },
  {
    q: "What about hallucinations?",
    a: "Treat any freeform model output as guilty until tied to sources. CortexHQ’s model is: show sources first, then narrative — and flag conflicts instead of smoothing them.",
  },
];

export default function Home() {
  return (
    <div className="venture-shell venture-shell--teal-radar px-4 sm:px-6 lg:px-8">
      <DistinctVentureHero
        ventureId="cortexhq"
        displayName="Cortexhq"
        worldId="teal-radar"
        heroLayout="radar"
        headline={undefined}
        subheadline={undefined}
        
        graphic={<HeroGraphicPanel worldId="teal-radar" labels={["Cortexhq Signal","User Wedge","Launch Plan"]} />}
      />
      <DomainCommandGraphic ventureId="cortexhq" worldId="teal-radar" labels={["Cortexhq Signal","User Wedge","Launch Plan","Approval Gate","Build Status","Next Action"]} />
      <ExpertCouncilUpgrade />

<div data-stagger className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start">
          <HeroProductPanel />
          <PremiumHeroVisual className="max-lg:mt-8" />
        </div>
        {/* replaced by DomainCommandGraphic */}
    <div className="overflow-x-hidden">
      <section className="relative py-12 sm:py-16 lg:py-20" data-reveal>
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="absolute right-0 top-32 h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-3xl" />
        </div>
        <div data-stagger className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="max-w-xl lg:max-w-none">
            <Badge tone="violet">Company brain</Badge>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.35rem] lg:leading-[1.05]">
              Your company already knows the answer. CortexHQ finds it.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">
              Connect messy company knowledge into one source-backed brain for decisions, customers, projects, and
              execution. Find the answer and the source — then assign the next action.
            </p>
            <div data-stagger className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/demo" className="glow-btn inline-flex justify-center text-center">
                Run Ask the Company Brain
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/5"
              >
                Open memory dashboard
              </Link>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-slate-500">
              Simulated ingestion only — no live connectors in this MVP. For corpus-style experiments, use{" "}
              <Link href="/workspace" className="text-cyan-400 hover:underline">
                advanced ingest
              </Link>
              .
            </p>
          </div>
          <div className="min-w-0">
            <CompanyBrainPreview />
          </div>
        </div>
      </section>

      <SectionShell
        id="problem"
        eyebrow="Knowledge debt"
        title="Fragmentation is the default. Operating memory is not."
        description="Every fast team generates context faster than it records it. CortexHQ exists to stop losing decisions in Slack — and to turn scattered context into operating memory."
      >
        <div data-stagger className="grid gap-4 md:grid-cols-2">
          {problemPoints.map((p) => (
            <Card key={p} className="p-5">
              <p className="text-sm leading-relaxed text-slate-300">{p}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="workflow"
        eyebrow="How it works"
        title="From ingestion to verified execution memory"
        description="CortexHQ is not a chat app. It is the layer that connects evidence to decisions — so teams stop repeating the same questions with different answers."
      >
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflow.map((w, i) => (
            <li key={w.title} className="motion-card motion-hover-lift relative rounded-2xl border border-white/10 bg-black/25 p-5">
              <span className="text-xs font-semibold text-cyan-300/80">0{i + 1}</span>
              <p className="mt-2 text-lg font-semibold text-white">{w.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{w.body}</p>
            </li>
          ))}
        </ol>
      </SectionShell>

      <SectionShell
        id="preview"
        eyebrow="Live preview"
        title="Pick a question. Watch the memory object update."
        description="This is local mock logic with realistic demo data — tuned to show sources, confidence, contradictions, and actions the way a production brain should behave."
      >
        <HomeLivePreview />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/demo" className="glow-btn inline-flex justify-center">
            Open full interactive demo
          </Link>
          <Link href="/pricing" className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/5">
            View pricing
          </Link>
        </div>
      </SectionShell>

      <SectionShell
        id="use-cases"
        eyebrow="Use cases"
        title="Built for operators who cannot afford to lose context"
        description="From founders to chiefs of staff to engineering and GTM leaders — CortexHQ is for people who need the truth with receipts."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u) => (
            <Card key={u.title} className="p-5" glow>
              <p className="text-base font-semibold text-white">{u.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{u.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="trust"
        eyebrow="Source trust"
        title="Better than a generic chatbot — because receipts beat vibes"
        description="Chat wrappers hide uncertainty. CortexHQ is designed to make uncertainty visible: conflicts, staleness, owners, and timelines."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {trustPoints.map((t) => (
            <Card key={t.title} className="p-5 ring-1 ring-violet-500/10">
              <p className="text-lg font-semibold text-white">{t.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{t.body}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="pricing"
        eyebrow="Pricing"
        title="Start small. Scale the company graph deliberately."
        description="These tiers describe how teams adopt CortexHQ — from a solo founder brain to enterprise governance."
      >
        <div className="grid gap-4 lg:grid-cols-4">
          {[
            {
              name: "Starter",
              price: "$149/mo",
              body: "Solo founder company brain demo: one operator, curated sources, weekly decision digest export.",
            },
            {
              name: "Team",
              price: "$699/mo",
              body: "Connected team memory: shared graph, department lenses, owner queues, and contradiction alerts.",
            },
            {
              name: "Scale",
              price: "$2,400/mo",
              body: "Multi-source company graph: higher sync cadence, risk radar modules, and CS/Sales leadership views.",
            },
            {
              name: "Enterprise",
              price: "Custom",
              body: "Security review support, SSO, audit logs, retention controls, and custom connector development.",
            },
          ].map((tier) => (
            <Card key={tier.name} className="flex flex-col p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{tier.name}</p>
              <p className="mt-3 text-2xl font-bold text-cyan-300">{tier.price}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">{tier.body}</p>
              <Link
                href="/pricing"
                className="mt-6 inline-flex justify-center rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white hover:bg-white/5"
              >
                Compare on pricing page
              </Link>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="faq"
        eyebrow="FAQ"
        title="Security, accuracy, integrations, onboarding, hallucinations"
        description="Straight answers for how CortexHQ is meant to behave when the stakes are real."
      >
        <div className="motion-card motion-hover-lift divide-y divide-white/10 rounded-2xl border border-white/10 bg-black/25">
          {faq.map((item) => (
            <div key={item.q} className="p-5 sm:p-6">
              <p className="text-sm font-semibold text-white">{item.q}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.a}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <section className="py-16 sm:py-20" data-reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-violet-950/40 via-[#070a12] to-cyan-950/30 p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0 neural-grid opacity-40" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Build your company brain before context disappears.</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
              Turn scattered context into operating memory — with sources, owners, and timelines your team can trust under
              pressure.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/demo" className="glow-btn inline-flex justify-center">
                Start with the interactive demo
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/5"
              >
                Read the thesis
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ProductHonestyNote status="demo" />
    </div>
</div>
    </div>
  );
}
