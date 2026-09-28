"use client";

import type { KissHeroConfig } from "./kiss-hero.types";
import { kissHeroConfig } from "./kiss-hero.config";

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

const dark = {
  section: "border-b border-white/10 bg-gradient-to-b from-slate-900/80 via-slate-950/40 to-transparent",
  kicker: "text-cyan-300/90",
  h1: "text-white",
  sub: "text-slate-400",
  card: "border-white/10 bg-white/[0.03] text-slate-300",
  cardTitle: "text-white",
  engine: "border-cyan-400/30 bg-cyan-500/10 text-cyan-100",
  line: "bg-gradient-to-r from-cyan-500/50 to-violet-500/50",
  before: "border-white/10 bg-red-950/20",
  after: "border-white/10 bg-emerald-950/20",
  orbit: "border-white/10 bg-white/[0.02]",
  btnPrimary: "bg-cyan-500 text-slate-950 hover:bg-cyan-400",
  btnSecondary: "border border-white/20 text-slate-200 hover:bg-white/10",
};

const light = {
  section: "border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white",
  kicker: "text-cyan-700",
  h1: "text-slate-900",
  sub: "text-slate-600",
  card: "border-slate-200 bg-white text-slate-600 shadow-sm",
  cardTitle: "text-slate-900",
  engine: "border-cyan-600/30 bg-cyan-50 text-cyan-900",
  line: "bg-gradient-to-r from-cyan-500/40 to-violet-500/40",
  before: "border-slate-200 bg-slate-50",
  after: "border-emerald-200 bg-emerald-50/80",
  orbit: "border-slate-200 bg-slate-50",
  btnPrimary: "bg-slate-900 text-white hover:bg-slate-800",
  btnSecondary: "border border-slate-300 text-slate-700 hover:bg-slate-100",
};

export function KissHero({ config = kissHeroConfig }: { config?: KissHeroConfig }) {
  const t = config.tone === "light" ? light : dark;

  return (
    <div className={cx("kiss-hero relative overflow-hidden", t.section)} id="kiss-hero">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      <section className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          {config.kicker ? (
            <p className={cx("text-[11px] font-medium uppercase tracking-[0.22em]", t.kicker)}>
              {config.kicker}
            </p>
          ) : null}
          <h1 className={cx("mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.12]", t.h1)}>
            {config.headline}
          </h1>
          <p className={cx("mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg", t.sub)}>
            {config.subheadline}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={config.primaryCta.href}
              className={cx("inline-flex min-h-11 items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60", t.btnPrimary)}
            >
              {config.primaryCta.label}
            </a>
            <a href={config.secondaryCta.href}
              className={cx("inline-flex min-h-11 items-center justify-center rounded-xl px-6 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40", t.btnSecondary)}
            >
              {config.secondaryCta.label}
            </a>
          </div>
          {config.demoNote ? (
            <p className="mt-4 text-xs text-slate-500">{config.demoNote}</p>
          ) : null}
        </div>

        {/* Product diagram */}
        <div className="relative mx-auto mt-12 max-w-4xl" aria-label="How the product works">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className={cx("rounded-2xl border p-4 md:text-right", t.card)}>
              <p className={cx("text-xs font-medium uppercase tracking-wider opacity-70")}>You bring</p>
              <p className={cx("mt-1 text-lg font-semibold", t.cardTitle)}>{config.diagram.input.label}</p>
              <p className="mt-1 text-sm opacity-80">{config.diagram.input.detail}</p>
            </div>
            <div className="hidden flex-col items-center gap-1 md:flex" aria-hidden>
              <div className={cx("h-px w-12", t.line)} />
              <span className="text-[10px] uppercase tracking-widest text-slate-500">flows to</span>
              <div className={cx("rounded-xl border px-4 py-3 text-center text-sm font-semibold", t.engine)}>
                {config.diagram.engine.label}
              </div>
              <span className="text-[10px] uppercase tracking-widest text-slate-500">delivers</span>
              <div className={cx("h-px w-12", t.line)} />
            </div>
            <div className="md:hidden">
              <div className={cx("my-2 mx-auto h-8 w-px", t.line)} />
              <p className={cx("text-center text-sm font-semibold", t.cardTitle)}>{config.diagram.engine.label}</p>
              <div className={cx("my-2 mx-auto h-8 w-px", t.line)} />
            </div>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-1 md:gap-2">
              {config.diagram.outputs.map((out) => (
                <div key={out.label} className={cx("rounded-2xl border p-3", t.card)}>
                  <p className={cx("font-semibold", t.cardTitle)}>{out.label}</p>
                  <p className="mt-0.5 text-xs opacity-80">{out.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-16" id="kiss-how-it-works">
          <h2 className={cx("text-center text-sm font-semibold uppercase tracking-[0.2em]", t.kicker)}>
            How it works
          </h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {config.steps.map((step, i) => (
              <li key={step.title} className={cx("rounded-2xl border p-4", t.card)}>
                <span className={cx("text-xs font-bold", t.kicker)}>Step {i + 1}</span>
                <h3 className={cx("mt-2 font-semibold", t.cardTitle)}>{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-90">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* What you get */}
        <div className="mt-16">
          <h2 className={cx("text-center text-sm font-semibold uppercase tracking-[0.2em]", t.kicker)}>
            What you get
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {config.outcomes.map((o) => (
              <li key={o.title} className={cx("rounded-2xl border p-4", t.card)}>
                <h3 className={cx("font-semibold", t.cardTitle)}>{o.title}</h3>
                <p className="mt-1.5 text-sm opacity-90">{o.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Before / after */}
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <div className={cx("rounded-2xl border p-5", t.before)}>
            <h3 className={cx("text-sm font-semibold uppercase tracking-wide", t.cardTitle)}>Before</h3>
            <ul className="mt-3 space-y-2 text-sm opacity-90">
              {config.before.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-slate-500" aria-hidden>
                    —
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className={cx("rounded-2xl border p-5", t.after)}>
            <h3 className={cx("text-sm font-semibold uppercase tracking-wide", t.cardTitle)}>After</h3>
            <ul className="mt-3 space-y-2 text-sm opacity-90">
              {config.after.map((a) => (
                <li key={a} className="flex gap-2">
                  <span className="text-emerald-500/80" aria-hidden>
                    +
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Who it is for */}
        {config.audience ? (
          <div className={cx("mt-16 rounded-2xl border p-6 sm:p-8", t.orbit)}>
            <h2 className={cx("text-center text-sm font-semibold uppercase tracking-[0.2em]", t.kicker)}>
              Who it is for
            </h2>
            <p className={cx("mx-auto mt-4 max-w-md text-center text-lg font-medium", t.cardTitle)}>
              {config.audience.center}
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {config.audience.roles.map((role) => (
                <li
                  key={role}
                  className={cx("rounded-full border px-3 py-1 text-xs font-medium", t.card)}
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </div>
  );
}
