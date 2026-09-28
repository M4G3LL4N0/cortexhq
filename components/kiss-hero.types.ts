export type KissHeroConfig = {
  productName: string;
  kicker?: string;
  headline: string;
  subheadline: string;
  demoNote?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  diagram: {
    input: { label: string; detail: string };
    engine: { label: string; detail: string };
    outputs: { label: string; detail: string }[];
  };
  steps: { title: string; text: string }[];
  outcomes: { title: string; text: string }[];
  before: string[];
  after: string[];
  audience?: { center: string; roles: string[] };
  tone?: "dark" | "light";
};
