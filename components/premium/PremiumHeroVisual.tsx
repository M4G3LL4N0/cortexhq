"use client";

import { premiumVisual } from "@/lib/premium-visual";
import { HERO_VARIANT_MAP } from "./hero-variants";

export function PremiumHeroVisual({ className = "" }: { className?: string }) {
  const Variant = HERO_VARIANT_MAP[premiumVisual.variant];
  if (!Variant) return null;
  return (
    <div className={`premium-hero-visual transition-transform duration-500 hover:scale-[1.01] ${className}`.trim()}>
      <Variant />
    </div>
  );
}
