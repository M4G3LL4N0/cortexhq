"use client";

import { useEffect, useMemo, useState } from "react";
import type { MemoryNode } from "@/lib/dashboard-seed";

type Props = {
  variant: "hero" | "dashboard";
  nodes?: MemoryNode[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  simplify?: boolean;
};

const HERO_NODES = [
  { id: "h1", x: 70, y: 60, label: "Pricing" },
  { id: "h2", x: 300, y: 55, label: "SSO" },
  { id: "h3", x: 200, y: 140, label: "Pilot" },
  { id: "h4", x: 95, y: 190, label: "CRM" },
  { id: "h5", x: 310, y: 185, label: "Docs" },
];

export function MemoryGraph({ variant, nodes = [], selectedId, onSelect, simplify }: Props) {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPulse((p) => (p + 1) % 1000), 3200);
    return () => clearInterval(t);
  }, []);

  const layout = useMemo(() => {
    if (variant === "hero") {
      return HERO_NODES.map((n) => ({ id: n.id, label: n.label, x: n.x, y: n.y }));
    }
    const positions: Record<string, { x: number; y: number }> = {};
    nodes.forEach((n, i) => {
      const angle = (i / Math.max(nodes.length, 1)) * Math.PI * 2;
      const r = 95;
      positions[n.id] = {
        x: 200 + Math.cos(angle) * r,
        y: 130 + Math.sin(angle) * r,
      };
    });
    return nodes.map((n) => ({
      id: n.id,
      label: n.label.slice(0, 18),
      x: positions[n.id]?.x ?? 200,
      y: positions[n.id]?.y ?? 130,
      node: n,
    }));
  }, [variant, nodes]);

  if (simplify) {
    if (variant === "hero") {
      return (
        <ul className="grid gap-2 sm:grid-cols-2">
          {HERO_NODES.map((n) => (
            <li key={n.id} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
              <span className="font-semibold text-cyan-300/90">Node</span> · {n.label}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <ul className="grid gap-2 sm:grid-cols-2">
        {nodes.map((n) => (
          <li key={n.id} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
            <span className="font-semibold text-cyan-300/90">Node</span> · {n.label}
          </li>
        ))}
      </ul>
    );
  }

  const links =
    variant === "hero"
      ? [
          ["h1", "h3"],
          ["h2", "h3"],
          ["h3", "h4"],
          ["h3", "h5"],
          ["h1", "h4"],
        ]
      : nodes.length > 1
        ? nodes.slice(0, -1).map((n, i) => [n.id, nodes[(i + 1) % nodes.length].id] as [string, string])
        : [];

  const byId = Object.fromEntries(layout.map((l) => [l.id, l]));

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      <div className="pointer-events-none absolute inset-0 neural-grid opacity-50" />
      <svg viewBox="0 0 400 260" className="h-auto w-full" role="img" aria-label="Memory graph preview">
        <defs>
          <linearGradient id="edgeGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(139,92,246,0.35)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.35)" />
          </linearGradient>
        </defs>
        {links.map(([a, b], i) => {
          const pa = byId[a];
          const pb = byId[b];
          if (!pa || !pb) return null;
          const dash = `${8 + (i % 3)} ${6 + (pulse % 4)}`;
          return (
            <line
              key={`${a}-${b}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke="url(#edgeGrad)"
              strokeWidth={1.25}
              strokeDasharray={dash}
              className="memory-edge"
            />
          );
        })}
        {layout.map((n) => {
          const active = selectedId === n.id;
          return (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={active ? 22 : 18}
                fill="rgba(15,23,42,0.85)"
                stroke={active ? "rgba(34,211,238,0.9)" : "rgba(139,92,246,0.55)"}
                strokeWidth={active ? 2 : 1.2}
                className="cursor-pointer transition"
                onClick={() => onSelect?.(n.id)}
              />
              <text
                x={n.x}
                y={n.y + 4}
                textAnchor="middle"
                fill="rgba(226,232,240,0.95)"
                fontSize="10"
                fontWeight={600}
                className="pointer-events-none select-none"
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
