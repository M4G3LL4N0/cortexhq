"use client";

/** Inline SVG/CSS hero graphic — unique per layout world */
export function HeroGraphicPanel({ worldId, labels }: { worldId: string; labels: string[] }) {
  const a = labels[0] ?? "Signal";
  const b = labels[1] ?? "Queue";
  const c = labels[2] ?? "Status";

  return (
    <div
      className={`hero-graphic hero-graphic--${worldId} relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-xl border p-3 sm:p-4 md:mx-0 md:aspect-square`}
    >
      <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id={`hg-${worldId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect width="400" height="320" fill={`url(#hg-${worldId})`} rx="12" />
        <rect x="24" y="28" width="160" height="12" rx="4" fill="currentColor" opacity="0.35" />
        <rect x="24" y="52" width="240" height="8" rx="3" fill="currentColor" opacity="0.2" />
        <rect x="24" y="100" width="352" height="72" rx="8" fill="currentColor" opacity="0.08" stroke="currentColor" strokeOpacity="0.2" />
        <text x="40" y="128" fill="currentColor" fontSize="11" opacity="0.7">
          {a}
        </text>
        <text x="40" y="152" fill="currentColor" fontSize="10" opacity="0.5">
          {b} → {c}
        </text>
        <circle cx="320" cy="240" r="36" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
        <path d="M320 204 A36 36 0 0 1 352 240" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <p className="absolute bottom-2 right-2 rounded bg-black/40 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white/80 sm:bottom-3 sm:right-3">
        Product preview
      </p>
    </div>
  );
}
