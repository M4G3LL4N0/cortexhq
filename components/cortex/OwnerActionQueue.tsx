import { Card } from "@/components/ui/Card";
import type { DemoOwner } from "@/lib/company-demo-types";

export function OwnerActionQueue({
  owners,
  actions,
}: {
  owners: DemoOwner[];
  actions: string[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Owners</p>
        <ul className="mt-4 space-y-3">
          {owners.map((o) => (
            <li key={`${o.domain}-${o.name}`} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-sm text-slate-300">{o.domain}</span>
              <span className="text-xs font-semibold text-cyan-300">{o.name}</span>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Recommended next actions</p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-300">
          {actions.map((a) => (
            <li key={a} className="leading-relaxed">
              {a}
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
