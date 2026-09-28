"use client";

/** Universal founder-control microcopy — approval before external action. */
export function FounderControlStrip({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`rounded-xl border border-amber-500/20 bg-amber-950/20 px-4 py-3 text-xs leading-relaxed text-amber-100/90 ${className}`.trim()}
      role="note"
    >
      <strong className="font-semibold text-amber-200">Founder control:</strong> Drafts stay private until
      you approve. Publishing, billing, deployment, and external messages require your explicit permission.
      Demo outputs are labeled and are not production claims.
    </aside>
  );
}
