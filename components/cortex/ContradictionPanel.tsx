import { Card } from "@/components/ui/Card";
import type { DemoContradiction } from "@/lib/company-demo-types";

export function ContradictionPanel({ items }: { items: DemoContradiction[] }) {
  if (items.length === 0) {
    return (
      <Card className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contradictions</p>
        <p className="mt-2 text-sm text-slate-400">No high-confidence contradictions detected for this query pattern.</p>
      </Card>
    );
  }
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contradictions found</p>
      {items.map((c) => (
        <Card key={c.topic} className="p-4 ring-1 ring-rose-500/15" glow>
          <p className="text-sm font-semibold text-white">{c.topic}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-rose-500/5 p-3 text-xs text-rose-100/90">
              <p className="font-semibold text-rose-200/90">Signal A</p>
              <p className="mt-2 leading-relaxed text-rose-100/80">{c.sideA}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-violet-500/5 p-3 text-xs text-violet-100/90">
              <p className="font-semibold text-violet-200/90">Signal B</p>
              <p className="mt-2 leading-relaxed text-violet-100/80">{c.sideB}</p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            <span className="font-semibold text-cyan-300/90">Next step:</span> {c.resolutionHint}
          </p>
        </Card>
      ))}
    </div>
  );
}
