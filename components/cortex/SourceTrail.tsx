import { KnowledgeSourceCard } from "@/components/cortex/KnowledgeSourceCard";
import type { DemoSourceCard } from "@/lib/company-demo-types";

export function SourceTrail({ sources }: { sources: DemoSourceCard[] }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Source trail</p>
        <span className="text-[11px] text-slate-500">Newest corroboration first</span>
      </div>
      <ol className="relative space-y-3 border-l border-white/10 pl-4">
        {sources.map((s, i) => (
          <li key={s.id} className="relative">
            <span className="absolute -left-[21px] top-4 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/40 ring-4 ring-[#070a12]" />
            <div className="translate-y-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">Step {i + 1}</div>
            <KnowledgeSourceCard card={s} />
          </li>
        ))}
      </ol>
    </div>
  );
}
