import { Badge } from "@/components/ui/Badge";
import type { DemoSourceCard } from "@/lib/company-demo-types";

export function KnowledgeSourceCard({ card }: { card: DemoSourceCard }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-black/40 p-4">
      <div className="pointer-events-none absolute inset-0 opacity-40 neural-lines" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-300/90">{card.label}</p>
          <p className="mt-1 text-sm font-medium text-white">{card.title}</p>
        </div>
        <Badge tone={card.stale ? "amber" : "cyan"}>{card.stale ? "Stale" : `${card.confidence}%`}</Badge>
      </div>
      <p className="relative mt-3 text-xs leading-relaxed text-slate-400">{card.excerpt}</p>
    </div>
  );
}
