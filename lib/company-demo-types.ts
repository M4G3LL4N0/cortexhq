export const DEMO_SOURCE_IDS = [
  "slack",
  "docs",
  "meetings",
  "github",
  "crm",
  "support",
] as const;

export type DemoSourceId = (typeof DEMO_SOURCE_IDS)[number];

export type CompanyStage = "seed" | "series-a" | "series-b" | "enterprise";

export type DepartmentFocus =
  | "product"
  | "engineering"
  | "sales"
  | "customer-success"
  | "leadership";

export type Urgency = "low" | "normal" | "high";

export type DemoSourceCard = {
  id: string;
  label: string;
  title: string;
  excerpt: string;
  confidence: number;
  stale?: boolean;
};

export type DemoDecisionEvent = {
  at: string;
  title: string;
  detail: string;
  owner?: string;
};

export type DemoContradiction = {
  topic: string;
  sideA: string;
  sideB: string;
  resolutionHint: string;
};

export type DemoOwner = {
  domain: string;
  name: string;
};

export type CompanyDemoResult = {
  queryEcho: string;
  answer: string;
  bullets: string[];
  confidence: number;
  confidenceNote: string;
  sources: DemoSourceCard[];
  decisionTimeline: DemoDecisionEvent[];
  contradictions: DemoContradiction[];
  owners: DemoOwner[];
  nextActions: string[];
};

export type CompanyDemoInput = {
  stage: CompanyStage;
  department: DepartmentFocus;
  connectedSources: DemoSourceId[];
  question: string;
  urgency: Urgency;
};
