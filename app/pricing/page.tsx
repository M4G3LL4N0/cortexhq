import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Pricing — CortexHQ",
  description: "Starter, Team, Scale, and Enterprise pricing for CortexHQ company memory.",
};

const tiers = [
  {
    name: "Starter",
    price: "$149/mo",
    who: "Solo founder / operator",
    bullets: [
      "Single-seat company brain workspace",
      "Weekly digest of decisions + owners (export)",
      "Up to three simulated connectors active",
    ],
  },
  {
    name: "Team",
    price: "$699/mo",
    who: "10–50 people",
    bullets: [
      "Shared memory graph + department lenses",
      "Contradiction alerts + owner queues",
      "Unlimited demo-mode queries inside your tenant",
    ],
  },
  {
    name: "Scale",
    price: "$2,400/mo",
    who: "50–250 people",
    bullets: [
      "Multi-source graph at higher sync cadence",
      "Risk radar + customer signal modules",
      "CS and sales leadership dashboards included",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    who: "Security-first teams",
    bullets: [
      "SSO, audit logs, retention controls, VPC options",
      "Custom connectors and data residency planning",
      "Named support for rollout + governance design",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
    <SubpageVisual variant="pricing" />
      <div className="space-y-10">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">Pricing</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Buy memory depth, not seat inflation</h1>
        <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
          CortexHQ pricing maps to how seriously you treat operating memory — from a solo founder brain to enterprise
          governance. Numbers here package the product story for evaluation; this MVP remains local and simulated.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-4">
        {tiers.map((t) => (
          <Card key={t.name} className="flex flex-col p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.name}</p>
            <p className="mt-3 text-3xl font-bold text-cyan-300">{t.price}</p>
            <p className="mt-2 text-xs text-slate-500">{t.who}</p>
            <ul className="mt-5 flex-1 list-disc space-y-2 pl-5 text-sm text-slate-400">
              {t.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <Link
              href="/demo"
              className="mt-8 inline-flex justify-center rounded-full border border-white/15 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
            >
              Start with the demo
            </Link>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <p className="text-sm font-semibold text-white">Procurement notes</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Enterprise pricing assumes security review cycles, SSO, and audit requirements. If you are evaluating CortexHQ
          alongside internal knowledge programs, use the demo outputs as a conversation script for how source-backed
          memory should behave inside your guardrails.
        </p>
      </Card>
    </div>
  </>
  )
}
