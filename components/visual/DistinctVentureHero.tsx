"use client";

import type { ReactNode } from "react";

const LAYOUTS: Record<string, string> = {
  editorial: "grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center",
  "split-grid": "grid gap-8 lg:grid-cols-2 lg:gap-12",
  terminal: "space-y-6",
  "soft-stack": "flex flex-col gap-8 lg:flex-row lg:items-center",
  "industrial-band": "relative overflow-hidden rounded-sm border-2 p-8 md:p-12",
  bento: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
  mosaic: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
  "apple-reveal": "mx-auto max-w-4xl space-y-6 text-center",
  "playful-stack": "space-y-8 text-center",
  "luxury-split": "grid gap-12 border-b pb-16 lg:grid-cols-[1fr_1.2fr] lg:items-end",
  radar: "grid gap-6 lg:grid-cols-[1fr_1.4fr]",
  "archive-columns": "columns-1 gap-8 md:columns-2",
  landscape: "grid gap-8 lg:grid-cols-[1.2fr_0.8fr]",
  "community-grid": "grid gap-4 sm:grid-cols-2",
  tactical: "space-y-6 border-l-4 pl-6 md:pl-10",
  observatory: "grid gap-10 xl:grid-cols-[0.9fr_1.1fr]",
};

export function DistinctVentureHero({
  ventureId,
  displayName,
  worldId,
  heroLayout,
  kicker,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  graphic,
}: {
  ventureId: string;
  displayName: string;
  worldId: string;
  heroLayout: string;
  kicker?: string;
  headline?: string;
  subheadline?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  graphic?: ReactNode;
}) {
  const layout = LAYOUTS[heroLayout] ?? LAYOUTS["split-grid"];

  return (
    <section
      className={`distinct-hero distinct-hero--${worldId} ${layout} min-w-0 py-10 sm:py-12 md:py-16`}
      data-venture={ventureId}
      aria-labelledby="distinct-hero-heading"
    >
      <div className="distinct-hero__copy min-w-0 space-y-5">
        <p className="distinct-hero__kicker text-xs font-semibold uppercase tracking-[0.2em]">
          {kicker ?? displayName}
        </p>
        <h1
          id="distinct-hero-heading"
          className="distinct-hero__title text-balance break-words text-2xl font-semibold leading-tight sm:text-3xl md:text-5xl"
        >
          {headline ?? `A distinct ${displayName} experience`}
        </h1>
        {subheadline ? (
          <p className="distinct-hero__sub max-w-2xl text-sm leading-relaxed opacity-90 sm:text-base md:text-lg">
            {subheadline}
          </p>
        ) : null}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {primaryCta ? (
            <a
              href={primaryCta.href}
              className="distinct-hero__cta-primary inline-flex min-h-11 w-full items-center justify-center px-5 py-2.5 text-sm font-semibold sm:w-auto"
            >
              {primaryCta.label}
            </a>
          ) : null}
          {secondaryCta ? (
            <a
              href={secondaryCta.href}
              className="distinct-hero__cta-secondary inline-flex min-h-11 w-full items-center justify-center px-5 py-2.5 text-sm font-medium sm:w-auto"
            >
              {secondaryCta.label}
            </a>
          ) : null}
        </div>
        <p className="text-[11px] leading-relaxed opacity-60">Demo-labeled outputs · founder approval before publish</p>
      </div>
      {graphic ? <div className="distinct-hero__graphic order-last min-w-0 w-full lg:order-none">{graphic}</div> : null}
    </section>
  );
}
