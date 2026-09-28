import { Badge } from "@/components/ui/Badge";
import type { DemoDecisionEvent } from "@/lib/company-demo-types";

export function DecisionTimeline({ events }: { events: DemoDecisionEvent[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Decision history</p>
      <ul className="mt-4 space-y-4">
        {events.map((e) => (
          <li key={`${e.at}-${e.title}`} className="flex gap-4">
            <div className="w-24 shrink-0 text-xs text-slate-500">{e.at}</div>
            <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-white">{e.title}</p>
                {e.owner ? <Badge tone="violet">{e.owner}</Badge> : null}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{e.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
