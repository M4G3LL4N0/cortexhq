"use client";

import { GraphicsShell } from "./GraphicsShell";
import { omniVenture } from "@/lib/omni-venture";

function Card({ label, value, tone = "default" }: { label: string; value: string; tone?: "default" | "warn" | "ok" }) {
  const border =
    tone === "warn" ? "border-amber-500/30 bg-amber-500/10" : tone === "ok" ? "border-emerald-500/30 bg-emerald-500/10" : "border-white/10 bg-white/[0.04]";
  return (
    <div className={`rounded-xl border px-3 py-2 ${border}`}>
      <p className="text-[9px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-0.5 text-xs font-semibold text-white">{value}</p>
    </div>
  );
}

function FlowLine() {
  return (
    <svg className="absolute inset-0 h-full w-full text-white/20" aria-hidden>
      <path d="M24 80 C120 40, 200 120, 280 72" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
    </svg>
  );
}

export function ProofLadderHeroVisual() {
  const gates = omniVenture.pipeline.steps;
  return (
    <GraphicsShell kicker="Proof ladder" title="Validation gates">
      <div className="relative grid grid-cols-5 gap-2">
        {gates.map((g, i) => (
          <div key={g} className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/15 text-xs font-bold text-amber-200">
              {i + 1}
            </div>
            <p className="text-center text-[9px] leading-tight text-slate-400">{g}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {omniVenture.hero.metrics.map((m) => (
          <Card key={m.label} label={m.label} value={m.value} />
        ))}
      </div>
    </GraphicsShell>
  );
}

export function TasteCuratorHeroVisual() {
  return (
    <GraphicsShell kicker="Tonight" title="Curated shortlist">
      <div className="space-y-2">
        {["Chef counter · Intimate", "Listening lounge · Quiet", "Day circuit · Culture"].map((row, i) => (
          <div key={row} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 transition hover:border-amber-400/30">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-xs font-bold text-amber-200">
              {i + 1}
            </span>
            <p className="text-xs text-slate-300">{row}</p>
            <span className="ml-auto text-[10px] text-amber-300/80">Match</span>
          </div>
        ))}
      </div>
    </GraphicsShell>
  );
}

export function StorageScanHeroVisual() {
  return (
    <GraphicsShell kicker="Disk scan" title="Reclaimable space">
      <svg viewBox="0 0 320 120" className="w-full" aria-hidden>
        <defs>
          <linearGradient id="disk" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(34 211 238 / 0.5)" />
            <stop offset="100%" stopColor="rgb(59 130 246 / 0.2)" />
          </linearGradient>
        </defs>
        <ellipse cx="160" cy="60" rx="120" ry="44" fill="none" stroke="url(#disk)" strokeWidth="12" />
        <ellipse cx="160" cy="60" rx="72" ry="26" fill="rgb(15 23 42 / 0.9)" stroke="rgb(34 211 238 / 0.4)" strokeWidth="2" />
        <path d="M160 16 A44 44 0 0 1 160 104" fill="none" stroke="rgb(34 211 238)" strokeWidth="8" strokeLinecap="round" />
      </svg>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Card label="Caches" value="18 GB" />
        <Card label="Builds" value="12 GB" tone="warn" />
        <Card label="Safe" value="Low risk" tone="ok" />
      </div>
    </GraphicsShell>
  );
}

export function DevCliHeroVisual() {
  return (
    <GraphicsShell kicker="Terminal" title="devstate scan">
      <div className="rounded-xl border border-white/10 bg-black/50 p-3 font-mono text-[11px] leading-6 text-cyan-100/90">
        <p className="text-emerald-400">$ devstate scan ./my-app</p>
        <p className="text-slate-500">git: 2 untracked · 1 stash</p>
        <p className="text-slate-400">node_modules 4.2 GB · .next 890 MB</p>
        <p className="text-amber-300">→ archive 12 files · clean 5.1 GB safe</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {["scan", "save", "clean"].map((c) => (
          <span key={c} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[10px] text-cyan-200">
            {c}
          </span>
        ))}
      </div>
    </GraphicsShell>
  );
}

export function InboxTriageHeroVisual() {
  return (
    <GraphicsShell kicker="Morning brief" title="Priority stack">
      <div className="space-y-2">
        {[
          { t: "Contract redlines — urgent", tone: "warn" as const },
          { t: "Investor follow-up — waiting", tone: "default" as const },
          { t: "Newsletter — clear", tone: "ok" as const },
        ].map((row) => (
          <div key={row.t} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
            <span className={`h-2 w-2 rounded-full ${row.tone === "warn" ? "bg-amber-400" : row.tone === "ok" ? "bg-emerald-400" : "bg-violet-400"}`} />
            <p className="text-[11px] text-slate-300">{row.t}</p>
          </div>
        ))}
      </div>
    </GraphicsShell>
  );
}

export function CaseFileHeroVisual() {
  return (
    <GraphicsShell kicker="Case file" title="Timeline evidence">
      <div className="relative pl-4">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-rose-400/40" aria-hidden />
        {["Promise shift", "Pattern repeat", "Repair attempt"].map((e, i) => (
          <div key={e} className="relative mb-3 flex gap-3">
            <span className="absolute -left-4 top-1 h-2.5 w-2.5 rounded-full border-2 border-rose-400 bg-slate-950" />
            <div>
              <p className="text-[10px] text-rose-300/80">Event {i + 1}</p>
              <p className="text-xs text-slate-300">{e}</p>
            </div>
          </div>
        ))}
      </div>
    </GraphicsShell>
  );
}

export function PermitDeskHeroVisual() {
  return (
    <GraphicsShell kicker="Permit board" title="Active sites">
      <svg viewBox="0 0 300 100" className="mb-2 w-full" aria-hidden>
        <rect x="20" y="50" width="50" height="40" rx="4" fill="rgb(251 191 36 / 0.15)" stroke="rgb(251 191 36 / 0.5)" />
        <rect x="90" y="35" width="60" height="55" rx="4" fill="rgb(251 191 36 / 0.2)" stroke="rgb(251 191 36 / 0.6)" />
        <rect x="170" y="45" width="45" height="45" rx="4" fill="rgb(34 211 238 / 0.1)" stroke="rgb(34 211 238 / 0.4)" />
        <path d="M45 50 L120 40 L192 48" stroke="rgb(255 255 255 / 0.2)" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
      <div className="grid grid-cols-3 gap-2">
        <Card label="Open" value="6" />
        <Card label="Review" value="2" tone="warn" />
        <Card label="Blocked" value="1" tone="warn" />
      </div>
    </GraphicsShell>
  );
}

export function FleetCommandHeroVisual() {
  return (
    <GraphicsShell kicker="Fleet OS" title="Active units">
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="rounded-lg border border-cyan-500/25 bg-cyan-500/10 p-2 text-center">
            <div className="mx-auto mb-1 h-8 w-5 rounded-t-full border border-cyan-300/50 bg-slate-900" />
            <p className="text-[9px] text-cyan-200">R-{n}</p>
            <p className="text-[8px] text-emerald-400">live</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-slate-500">Task pack · Hotel turnover</p>
    </GraphicsShell>
  );
}

export function TerrainLabHeroVisual() {
  return (
    <GraphicsShell kicker="Terrain mesh" title="Foot placement plan">
      <svg viewBox="0 0 300 110" className="w-full" aria-hidden>
        <path d="M0 90 L60 55 L120 70 L180 40 L240 58 L300 35 L300 110 L0 110 Z" fill="rgb(16 185 129 / 0.15)" stroke="rgb(16 185 129 / 0.5)" />
        {[60, 120, 180, 240].map((x, i) => (
          <circle key={x} cx={x} cy={i % 2 ? 52 : 65} r="6" fill="rgb(16 185 129)" opacity="0.8" />
        ))}
      </svg>
      <div className="grid grid-cols-3 gap-2">
        <Card label="Slope" value="32°" />
        <Card label="Grip" value="High" tone="ok" />
        <Card label="Path" value="OK" tone="ok" />
      </div>
    </GraphicsShell>
  );
}

export function SecurityPostureHeroVisual() {
  return (
    <GraphicsShell kicker="Posture scan" title="Control coverage">
      <div className="flex items-end justify-center gap-3 px-2">
        {[40, 65, 55, 80, 72].map((h, i) => (
          <div key={i} className="w-8 rounded-t-md bg-violet-500/40 ring-1 ring-violet-400/30" style={{ height: h }} />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Card label="Critical" value="2" tone="warn" />
        <Card label="Score" value="B+" tone="ok" />
      </div>
    </GraphicsShell>
  );
}

export function RequestBoardHeroVisual() {
  return (
    <GraphicsShell kicker="Open requests" title="Quote compare">
      {["Office repaint", "HVAC service", "Logo refresh"].map((job, i) => (
        <div key={job} className="mb-2 flex items-center justify-between rounded-lg border border-white/10 px-3 py-2">
          <p className="text-xs text-slate-300">{job}</p>
          <span className="text-[10px] text-violet-300">{i === 0 ? "3 quotes" : i === 1 ? "2 quotes" : "new"}</span>
        </div>
      ))}
    </GraphicsShell>
  );
}

export function FamilyPlanHeroVisual() {
  return (
    <GraphicsShell kicker="This week" title="Shared milestones">
      <div className="grid grid-cols-2 gap-2">
        {["School forms", "Date night", "Budget review", "Family trip"].map((m) => (
          <div key={m} className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-2 py-2">
            <p className="text-[10px] text-rose-200">{m}</p>
            <p className="mt-1 text-[9px] text-slate-500">Owner assigned</p>
          </div>
        ))}
      </div>
    </GraphicsShell>
  );
}

export function LaunchStudioHeroVisual() {
  return (
    <GraphicsShell kicker="Launch studio" title="Site preview">
      <div className="rounded-lg border border-white/10 bg-black/40 p-2">
        <div className="mb-2 h-2 w-16 rounded bg-violet-500/40" />
        <div className="h-14 rounded bg-gradient-to-r from-violet-500/20 to-fuchsia-500/10" />
        <div className="mt-2 grid grid-cols-3 gap-1">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-6 rounded bg-white/5" />
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-violet-300">Idea → publish in one session</p>
    </GraphicsShell>
  );
}

export function TrainingBlockHeroVisual() {
  return (
    <GraphicsShell kicker="This block" title="Load vs recovery">
      <svg viewBox="0 0 280 80" className="w-full" aria-hidden>
        <polyline
          points="10,60 50,45 90,50 130,30 170,35 210,20 250,28"
          fill="none"
          stroke="rgb(251 191 36)"
          strokeWidth="2"
        />
        <polyline
          points="10,70 50,65 90,62 130,55 170,50 210,48 250,45"
          fill="none"
          stroke="rgb(52 211 153)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </svg>
      <div className="grid grid-cols-2 gap-2">
        <Card label="RPE" value="7.2" />
        <Card label="Recovery" value="Good" tone="ok" />
      </div>
    </GraphicsShell>
  );
}

export function RecoveryModeHeroVisual() {
  return (
    <GraphicsShell kicker="Recovery mode" title="Night spiral">
      <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3">
        <p className="text-[10px] uppercase text-emerald-300/80">Next action</p>
        <p className="mt-1 text-sm text-white">Regulate → separate facts → choose response</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-slate-400">
        <span>Trigger named</span>
        <span className="text-emerald-400">Pattern logged</span>
      </div>
    </GraphicsShell>
  );
}

export function BrandKitHeroVisual() {
  return (
    <GraphicsShell kicker="Design system" title="Token export">
      <div className="grid grid-cols-5 gap-2">
        {["#7C3AED", "#06B6D4", "#F59E0B", "#10B981", "#F43F5E"].map((c) => (
          <div key={c} className="aspect-square rounded-lg border border-white/10" style={{ background: c }} />
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <span className="rounded-md bg-white/10 px-2 py-1 text-[10px]">Button</span>
        <span className="rounded-md border border-white/20 px-2 py-1 text-[10px]">Input</span>
        <span className="rounded-md bg-violet-500/20 px-2 py-1 text-[10px] text-violet-200">Card</span>
      </div>
    </GraphicsShell>
  );
}

export function ValuesMapHeroVisual() {
  return (
    <GraphicsShell kicker="Alignment" title="Spend vs values">
      <div className="relative mx-auto h-24 w-24">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgb(16 185 129)"
            strokeWidth="10"
            strokeDasharray="175 251"
            strokeLinecap="round"
          />
        </svg>
        <p className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-emerald-300">68%</p>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-500">Aligned this month · demo</p>
    </GraphicsShell>
  );
}

export function GenericWorkspaceHeroVisual() {
  const v = omniVenture;
  return (
    <GraphicsShell kicker={v.hero.workspace} title={v.name}>
      <div className="grid grid-cols-3 gap-2">
        {v.hero.metrics.map((m) => (
          <Card key={m.label} label={m.label} value={m.value} />
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {v.hero.pipeline.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-violet-500/20 text-[10px] font-bold text-violet-200">
              {i + 1}
            </span>
            <div>
              <p className="text-xs font-medium text-white">{step.label}</p>
              {step.detail ? <p className="text-[10px] text-slate-500">{step.detail}</p> : null}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-slate-500">Sample workflow · DEMO</p>
    </GraphicsShell>
  );
}

export function VentureBoardHeroVisual() {
  return (
    <GraphicsShell kicker="Portfolio" title="Ranked bets">
      {[
        { n: "Venture A", s: "87" },
        { n: "Venture B", s: "72" },
        { n: "Venture C", s: "61" },
      ].map((v, i) => (
        <div key={v.n} className="mb-2 flex items-center gap-2">
          <span className="w-4 text-[10px] text-violet-400">{i + 1}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-violet-500/70" style={{ width: `${v.s}%` }} />
          </div>
          <span className="w-6 text-right text-[10px] text-slate-400">{v.s}</span>
        </div>
      ))}
    </GraphicsShell>
  );
}

export const HERO_VARIANT_MAP = {
  "proof-ladder": ProofLadderHeroVisual,
  "taste-curator": TasteCuratorHeroVisual,
  "storage-scan": StorageScanHeroVisual,
  "dev-cli": DevCliHeroVisual,
  "inbox-triage": InboxTriageHeroVisual,
  "case-file": CaseFileHeroVisual,
  "permit-desk": PermitDeskHeroVisual,
  "fleet-command": FleetCommandHeroVisual,
  "terrain-lab": TerrainLabHeroVisual,
  "security-posture": SecurityPostureHeroVisual,
  "request-board": RequestBoardHeroVisual,
  "family-plan": FamilyPlanHeroVisual,
  "launch-studio": LaunchStudioHeroVisual,
  "training-block": TrainingBlockHeroVisual,
  "recovery-mode": RecoveryModeHeroVisual,
  "brand-kit": BrandKitHeroVisual,
  "values-map": ValuesMapHeroVisual,
  "venture-board": VentureBoardHeroVisual,
  "workspace-default": GenericWorkspaceHeroVisual,
} as const;
