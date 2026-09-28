/** TrillionX motion tokens — import in client components if needed */
export const motion = {
  duration: {
    instant: 100,
    fast: 180,
    normal: 300,
    slow: 600,
    cinematic: 900,
  },
  ease: {
    premiumOut: "cubic-bezier(0.16, 1, 0.3, 1)",
    premiumInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  },
  distance: {
    revealSmall: 12,
    revealMedium: 24,
    revealLarge: 48,
  },
  scale: {
    hover: 1.015,
    press: 0.985,
    revealFrom: 0.98,
  },
} as const;
