export type OmniAccent = "violet" | "cyan" | "emerald" | "amber" | "rose";

export type OmniVentureConfig = {
  name: string;
  accent: OmniAccent;
  hero: {
    workspace: string;
    badge: string;
    metrics: { label: string; value: string }[];
    pipeline: { label: string; detail?: string }[];
  };
  problem: { title: string; before: string[]; after: string[] };
  pipeline: { kicker: string; steps: string[] };
  features: { title: string; items: { title: string; body: string }[] };
  workflow: { title: string; steps: { title: string; body: string }[] };
  trust: { title: string; cards: { t: string; d: string }[] };
  cta: { title: string; body: string; label: string };
};

export const omniVenture: OmniVentureConfig = {
  "name": "Cortexhq",
  "accent": "violet",
  "hero": {
    "workspace": "Cortexhq command",
    "badge": "Early MVP · demo data",
    "metrics": [
      {
        "label": "Stage",
        "value": "MVP"
      },
      {
        "label": "Proof",
        "value": "Local"
      },
      {
        "label": "Mode",
        "value": "Demo"
      }
    ],
    "pipeline": [
      {
        "label": "Capture",
        "detail": "Inputs from your workflow"
      },
      {
        "label": "Analyze",
        "detail": "Structured pass, labeled"
      },
      {
        "label": "Decide",
        "detail": "Clear next action"
      },
      {
        "label": "Export",
        "detail": "Shareable outcome"
      }
    ]
  },
  "problem": {
    "title": "Teams lose time on workflow without proof",
    "before": [
      "Scattered tools",
      "No audit trail",
      "Generic AI answers"
    ],
    "after": [
      "One labeled workflow",
      "Exportable result",
      "Honest demo boundaries"
    ]
  },
  "pipeline": {
    "kicker": "Core loop",
    "steps": [
      "Input",
      "Process",
      "Output",
      "Act"
    ]
  },
  "features": {
    "title": "What Cortexhq delivers",
    "items": [
      {
        "title": "Focused wedge",
        "body": "Slow workflow decisions without a clear audit trail (HYPOTHESIS)"
      },
      {
        "title": "Labeled demo",
        "body": "Sample metrics marked DEMO until verified."
      },
      {
        "title": "Export path",
        "body": "One outcome you can share with stakeholders."
      },
      {
        "title": "Built to ship",
        "body": "Next.js MVP in the Noaerth portfolio."
      }
    ]
  },
  "workflow": {
    "title": "How it works",
    "steps": [
      {
        "title": "Start with context",
        "body": "Name the user, pain, and desired outcome."
      },
      {
        "title": "Run the workflow",
        "body": "Complete the core path on the live site."
      },
      {
        "title": "Review labels",
        "body": "Separate demo data from verified proof."
      },
      {
        "title": "Export or act",
        "body": "Save, share, or schedule the next step."
      }
    ]
  },
  "trust": {
    "title": "Trust boundaries",
    "cards": [
      {
        "t": "Demo data",
        "d": "Marketing previews use sample data unless labeled otherwise."
      },
      {
        "t": "No fake traction",
        "d": "We do not claim revenue or users without proof."
      },
      {
        "t": "Early product",
        "d": "Capabilities evolve; check release notes."
      }
    ]
  },
  "cta": {
    "title": "Try the wedge",
    "body": "Complete one labeled workflow on the demo path.",
    "label": "Open product →"
  }
} satisfies OmniVentureConfig;
