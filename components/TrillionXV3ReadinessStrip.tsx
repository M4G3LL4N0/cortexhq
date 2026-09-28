"use client";

import Link from "next/link";

type Props = { productName?: string; buildStatus?: string; className?: string };

export function TrillionXV3ReadinessStrip({
  productName = "This product",
  buildStatus = "UNKNOWN",
  className = "",
}: Props) {
  const buildOk = buildStatus === "PASS";
  return (
    <aside
      className={`mx-auto max-w-6xl px-4 py-4 sm:px-6 ${className}`.trim()}
      role="note"
      aria-label="Launch readiness"
    >
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-700/80 bg-slate-900/50 px-4 py-3 text-xs text-slate-400">
        <span className="font-medium text-slate-200">{productName} · v3 readiness</span>
        <span
          className={
            buildOk
              ? "rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-200"
              : "rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-amber-200"
          }
        >
          Build: {buildStatus}
        </span>
        <span className="text-slate-500">·</span>
        <span>Policy drafts · approval before publish</span>
        <Link href="/trust" className="text-cyan-400 hover:text-cyan-300">
          Trust
        </Link>
        <Link href="/docs" className="text-cyan-400 hover:text-cyan-300">
          Docs
        </Link>
        <span className="hidden text-slate-600 sm:inline">See TRILLIONX_V3_STATUS.md</span>
      </div>
    </aside>
  );
}
