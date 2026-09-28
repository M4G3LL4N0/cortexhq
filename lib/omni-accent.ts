import type { OmniAccent } from "@/lib/omni-venture";

const ACCENT: Record<
  OmniAccent,
  { ring: string; text: string; bg: string; badge: string; bar: string; cta: string }
> = {
  violet: {
    ring: "ring-violet-500/20",
    text: "text-violet-300",
    bg: "bg-violet-500/10",
    badge: "text-violet-300",
    bar: "bg-violet-400",
    cta: "text-violet-300",
  },
  cyan: {
    ring: "ring-cyan-500/20",
    text: "text-cyan-300",
    bg: "bg-cyan-500/10",
    badge: "text-cyan-300",
    bar: "bg-cyan-400",
    cta: "text-cyan-300",
  },
  emerald: {
    ring: "ring-emerald-500/20",
    text: "text-emerald-300",
    bg: "bg-emerald-500/10",
    badge: "text-emerald-300",
    bar: "bg-emerald-400",
    cta: "text-emerald-300",
  },
  amber: {
    ring: "ring-amber-500/20",
    text: "text-amber-300",
    bg: "bg-amber-500/10",
    badge: "text-amber-300",
    bar: "bg-amber-400",
    cta: "text-amber-300",
  },
  rose: {
    ring: "ring-rose-500/20",
    text: "text-rose-300",
    bg: "bg-rose-500/10",
    badge: "text-rose-300",
    bar: "bg-rose-400",
    cta: "text-rose-300",
  },
};

export function omniAccent(accent: OmniAccent) {
  return ACCENT[accent];
}
