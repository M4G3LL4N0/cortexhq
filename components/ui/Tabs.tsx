"use client";

import type { ReactNode } from "react";

export type TabItem = { id: string; label: string };

export function Tabs({
  tabs,
  active,
  onChange,
  className = "",
}: {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={`flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/25 p-1 ${className}`.trim()}
    >
      {tabs.map((t) => {
        const selected = t.id === active;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(t.id)}
            className={`rounded-xl px-3 py-2 text-xs font-semibold transition sm:text-sm ${
              selected
                ? "bg-gradient-to-r from-violet-600/90 to-cyan-600/80 text-white shadow-lg shadow-violet-900/30"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({ id, activeId, children }: { id: string; activeId: string; children: ReactNode }) {
  if (id !== activeId) return null;
  return <div role="tabpanel">{children}</div>;
}
