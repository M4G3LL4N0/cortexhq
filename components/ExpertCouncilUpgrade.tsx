"use client";

import { expertCouncilUpgradeConfig } from "./expert-council-upgrade.config";

export type ExpertCouncilUpgradeProps = {
  productName: string;
  strengths: string[];
  improvements: string[];
  risks: string[];
  personas: string[];
  links: { href: string; label: string }[];
  className?: string;
  tone?: "dark" | "light";
};

function cx(...p: (string | false | undefined)[]) {
  return p.filter(Boolean).join(" ");
}

export function ExpertCouncilUpgrade(props: Partial<ExpertCouncilUpgradeProps> & { className?: string }) {
  const {
    productName,
    strengths,
    improvements,
    risks,
    personas,
    links,
    className = "",
    tone = "dark",
  } = { ...expertCouncilUpgradeConfig, ...props };
  const dark = tone === "dark";
  const shell = dark
    ? "border-white/10 bg-white/[0.02] text-slate-300"
    : "border-slate-200 bg-slate-50 text-slate-600";
  const title = dark ? "text-white" : "text-slate-900";
  const chip = dark
    ? "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/30 hover:text-white"
    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400";

  return (
    <section
      className={cx("expert-council-upgrade mx-auto max-w-6xl px-4 py-10 sm:px-6", className)}
      aria-labelledby="expert-council-heading"
    >
      <div className={cx("rounded-2xl border p-6 sm:p-8", shell)}>
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-400/90">
          Expert council review
        </p>
        <h2 id="expert-council-heading" className={cx("mt-2 text-xl font-semibold sm:text-2xl", title)}>
          What {productName} does well and what we are improving next
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed opacity-90">
          This section reflects a multi-lens product review: clarity, trust, conversion, and real-user
          usefulness. Demo outputs are labeled; confirm facts before acting on quotes, metrics, or advice.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div>
            <h3 className={cx("text-sm font-semibold", title)}>Strengths</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {strengths.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="text-emerald-400/90" aria-hidden>
                    +
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={cx("text-sm font-semibold", title)}>Improving next</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {improvements.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="text-cyan-400/90" aria-hidden>
                    →
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={cx("text-sm font-semibold", title)}>Watch carefully</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {risks.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="text-amber-400/90" aria-hidden>
                    !
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h3 className={cx("text-sm font-semibold", title)}>Who this is for</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {personas.map((p) => (
              <li key={p} className={cx("rounded-full border px-3 py-1 text-xs font-medium", chip)}>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {links.length > 0 ? (
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Product navigation">
            {links.map((l) => (
              <a key={l.href + l.label}
                href={l.href}
                className={cx(
                  "rounded-lg border px-3 py-2 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50",
                  chip,
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </section>
  );
}
