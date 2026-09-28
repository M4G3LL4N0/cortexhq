import type {
  CompanyDemoInput,
  CompanyDemoResult,
  DemoContradiction,
  DemoDecisionEvent,
  DemoOwner,
  DemoSourceCard,
  DemoSourceId,
} from "./company-demo-types";

const SOURCE_META: Record<
  DemoSourceId,
  { label: string; thread: (i: number) => string }
> = {
  slack: {
    label: "Slack",
    thread: (i) => `#exec-decisions · thread ${i + 1}`,
  },
  docs: {
    label: "Docs",
    thread: (i) => `Notion · PRD / policy · v${i + 1}`,
  },
  meetings: {
    label: "Meetings",
    thread: (i) => `Granola notes · QBR prep · ${i + 1}`,
  },
  github: {
    label: "GitHub",
    thread: (i) => `org/core · issue #${1200 + i}`,
  },
  crm: {
    label: "CRM",
    thread: (i) => `Salesforce · opportunity notes · ${i + 1}`,
  },
  support: {
    label: "Support",
    thread: (i) => `Zendesk · ticket cluster · ${i + 1}`,
  },
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function hasSource(connected: DemoSourceId[], id: DemoSourceId) {
  return connected.includes(id);
}

function pickSources(connected: DemoSourceId[], prefer: DemoSourceId[], count: number): DemoSourceId[] {
  const ordered = [...prefer.filter((p) => hasSource(connected, p)), ...connected];
  const seen = new Set<DemoSourceId>();
  const out: DemoSourceId[] = [];
  for (const id of ordered) {
    if (!seen.has(id)) {
      seen.add(id);
      out.push(id);
      if (out.length >= count) break;
    }
  }
  while (out.length < count && connected.length > 0) {
    const id = connected[out.length % connected.length];
    if (!seen.has(id)) {
      seen.add(id);
      out.push(id);
    } else break;
  }
  return out.slice(0, Math.min(count, Math.max(1, connected.length || 1)));
}

function buildCards(
  connected: DemoSourceId[],
  prefer: DemoSourceId[],
  excerpts: string[],
  baseConfidence: number,
): DemoSourceCard[] {
  const ids = pickSources(connected, prefer, 4);
  return ids.map((id, i) => {
    const meta = SOURCE_META[id];
    const stale = id === "docs" && excerpts[i]?.length > 80;
    return {
      id: `${id}-${i}`,
      label: meta.label,
      title: meta.thread(i),
      excerpt: excerpts[i % excerpts.length] ?? `Retrieved excerpt from ${meta.label} ingestion.`,
      confidence: clamp(baseConfidence + (i === 0 ? 6 : i === 1 ? 2 : -4) + (stale ? -8 : 0), 52, 96),
      stale,
    };
  });
}

function urgencyBoost(u: CompanyDemoInput["urgency"]) {
  if (u === "high") return 4;
  if (u === "low") return -3;
  return 0;
}

function stageNote(stage: CompanyDemoInput["stage"]) {
  switch (stage) {
    case "seed":
      return "Stage calibration: seed — fewer systems, higher variance in how decisions are recorded.";
    case "series-a":
      return "Stage calibration: Series A — decisions split across Slack, docs, and customer calls.";
    case "series-b":
      return "Stage calibration: Series B — multiple owners, more CRM + support corroboration.";
    case "enterprise":
      return "Stage calibration: enterprise motion — security review threads and procurement notes weigh heavier.";
    default:
      return "";
  }
}

function normalizeQuestion(q: string) {
  return q.trim().toLowerCase();
}

type PatternKey =
  | "pricing"
  | "objections"
  | "risks"
  | "eng-sales"
  | "ceo-focus"
  | "default";

function classifyQuestion(q: string): PatternKey {
  const n = normalizeQuestion(q);
  if (n.includes("pricing") || n.includes("price") || n.includes("enterprise")) return "pricing";
  if (n.includes("objection") || n.includes("customers") || n.includes("customer")) return "objections";
  if (n.includes("risk") || n.includes("unresolved")) return "risks";
  if (n.includes("engineering") && n.includes("sales")) return "eng-sales";
  if (n.includes("ceo") || n.includes("focus") || n.includes("week")) return "ceo-focus";
  return "default";
}

export const PRESET_DEMO_QUESTIONS = [
  "What did we decide about pricing?",
  "What customer objections keep repeating?",
  "Which product risks are unresolved?",
  "What did engineering promise sales?",
  "What should the CEO focus on this week?",
] as const;

export function runCompanyBrainDemo(input: CompanyDemoInput): CompanyDemoResult {
  const connected = input.connectedSources.length > 0 ? input.connectedSources : (["slack", "docs"] as DemoSourceId[]);
  const pattern = classifyQuestion(input.question);
  const urgencyAdj = urgencyBoost(input.urgency);
  const baseConf = clamp(78 + urgencyAdj + (connected.length >= 4 ? 3 : 0), 58, 92);

  const deptLine = (() => {
    switch (input.department) {
      case "product":
        return "Department lens: product — prioritizing roadmap commitments and customer evidence.";
      case "engineering":
        return "Department lens: engineering — prioritizing delivery promises, incidents, and tech debt signals.";
      case "sales":
        return "Department lens: sales — prioritizing deal blockers, pricing posture, and competitive talk-tracks.";
      case "customer-success":
        return "Department lens: customer success — prioritizing renewals, onboarding friction, and support themes.";
      case "leadership":
        return "Department lens: leadership — prioritizing operating cadence, capital allocation, and org risk.";
      default:
        return "";
    }
  })();

  const timelines: Record<PatternKey, DemoDecisionEvent[]> = {
    pricing: [
      {
        at: "2026-05-02",
        title: "Pilot discount approved",
        detail: "15% pilot discount for logos with public case study commitment.",
        owner: "CEO",
      },
      {
        at: "2026-05-06",
        title: "Annual prepay motion",
        detail: "Finance asked for net-30 exception only when ARR > $120k.",
        owner: "CFO",
      },
      {
        at: "2026-05-09",
        title: "Enterprise list price guardrail",
        detail: "List price holds unless VP Sales + CEO both approve in writing.",
        owner: "VP Sales",
      },
    ],
    objections: [
      {
        at: "2026-04-20",
        title: "Security questionnaire backlog",
        detail: "Customers waiting >10 days on Infosec answers — CS flagged churn risk.",
        owner: "Head of CS",
      },
      {
        at: "2026-05-01",
        title: "SSO timing debate",
        detail: "Sales promised 'this quarter' while eng estimated six weeks after audit.",
        owner: "CTO",
      },
    ],
    risks: [
      {
        at: "2026-04-28",
        title: "Flaky CI on release branch",
        detail: "Release branch failing intermittently — blocks hotfix SLA.",
        owner: "Eng Manager",
      },
      {
        at: "2026-05-07",
        title: "Onboarding drop-off",
        detail: "Step 3 abandonment up 18% week over week.",
        owner: "PM",
      },
    ],
    "eng-sales": [
      {
        at: "2026-05-04",
        title: "SSO by Friday (pilot)",
        detail: "Engineering committed SAML SSO for ACME pilot go-live.",
        owner: "Tech Lead",
      },
      {
        at: "2026-05-08",
        title: "Volume pricing exploration",
        detail: "Sales requested 500-seat modeling; product asked for margin guardrails.",
        owner: "Head of Product",
      },
    ],
    "ceo-focus": [
      {
        at: "2026-05-10",
        title: "Board prep",
        detail: "NRR narrative + enterprise pipeline concentration to address.",
        owner: "Chief of Staff",
      },
      {
        at: "2026-05-11",
        title: "Hiring freeze exception",
        detail: "One senior platform hire approved if start date before July 1.",
        owner: "COO",
      },
    ],
    default: [
      {
        at: "2026-05-05",
        title: "Operating review",
        detail: "Weekly leadership sync captured decisions across GTM and product.",
        owner: "Chief of Staff",
      },
      {
        at: "2026-05-11",
        title: "Customer advisory",
        detail: "Top accounts asked for clearer roadmap communication.",
        owner: "VP Product",
      },
    ],
  };

  const contradictions: Record<PatternKey, DemoContradiction[]> = {
    pricing: [
      {
        topic: "Discount authority",
        sideA: "Sales playbook: AE can approve 10% without exec.",
        sideB: "Exec thread: discounts >8% require CEO in enterprise segment.",
        resolutionHint: "Reconcile in CRM policy doc and post the final rule in #pricing.",
      },
    ],
    objections: [
      {
        topic: "SSO delivery date",
        sideA: "Deal notes: 'SSO live end of quarter.'",
        sideB: "Eng estimate: six weeks post-security audit completion.",
        resolutionHint: "Publish a single externally safe date range with dependencies listed.",
      },
    ],
    risks: [
      {
        topic: "Pilot readiness",
        sideA: "GTM: pilot can start with manual provisioning.",
        sideB: "Eng: automated provisioning required for SLA.",
        resolutionHint: "Define a temporary runbook and exit criteria for manual mode.",
      },
    ],
    "eng-sales": [
      {
        topic: "Custom integration scope",
        sideA: "Sales proposed bespoke webhook bridge.",
        sideB: "Eng standard is supported API + batch export only.",
        resolutionHint: "Create a deal desk checklist that blocks non-standard scopes at quote stage.",
      },
    ],
    "ceo-focus": [
      {
        topic: "Headcount plan",
        sideA: "Finance model assumes flat hiring in CS.",
        sideB: "CS leadership requested two additional CSMs for enterprise accounts.",
        resolutionHint: "Align on account coverage ratios using current ARR bands.",
      },
    ],
    default: [
      {
        topic: "Single source of truth",
        sideA: "Notion PRD states MVP slice for May.",
        sideB: "All-hands deck mentions full platform bet.",
        resolutionHint: "Update the public narrative to match the committed scope or revise scope explicitly.",
      },
    ],
  };

  const owners: Record<PatternKey, DemoOwner[]> = {
    pricing: [
      { domain: "Deal desk policy", name: "VP Sales" },
      { domain: "Contract terms", name: "GC" },
      { domain: "Packaging & packaging SKUs", name: "Head of Product" },
    ],
    objections: [
      { domain: "Security review SLA", name: "CISO" },
      { domain: "Customer comms", name: "Head of CS" },
    ],
    risks: [
      { domain: "Release reliability", name: "CTO" },
      { domain: "Activation metrics", name: "PM" },
    ],
    "eng-sales": [
      { domain: "SSO delivery", name: "Tech Lead" },
      { domain: "Revenue commitments", name: "VP Sales" },
    ],
    "ceo-focus": [
      { domain: "Board narrative", name: "CEO" },
      { domain: "Operating plan", name: "Chief of Staff" },
    ],
    default: [
      { domain: "Decision hygiene", name: "Chief of Staff" },
      { domain: "Customer truth", name: "Head of CS" },
    ],
  };

  const answers: Record<
    PatternKey,
    { answer: string; bullets: string[]; prefer: DemoSourceId[]; excerpts: string[] }
  > = {
    pricing: {
      answer:
        "Enterprise pricing is anchored on list with controlled exceptions. The latest operating decision is a VP Sales + CEO dual approval for any discount that breaks the list-price guardrail, with finance enforcing net-30 exceptions only above $120k ARR.",
      bullets: [
        "Pilot motion can include up to a 15% discount when paired with a public case study commitment.",
        "Annual prepay is preferred; net-30 is an exception tied to deal size.",
        "If your CRM notes disagree with the exec thread, treat the exec thread as authoritative until finance updates the playbook.",
      ],
      prefer: ["slack", "docs", "crm", "meetings"],
      excerpts: [
        "List price holds in enterprise unless VP Sales + CEO both approve in writing — posted in #exec-decisions.",
        "Notion policy page v3.2: pilot discount ladder and case study quid pro quo.",
        "CRM opportunity ACME: AE notes request 18% — flagged as above current threshold.",
        "QBR prep notes: CFO wants stronger prepay mix to reduce collections load.",
      ],
    },
    objections: {
      answer:
        "The objections that keep surfacing are security review latency, SSO timing uncertainty, and onboarding friction after step three. Support tickets and CS notes agree on the security backlog; the tension is between promised customer dates and engineering dependencies.",
      bullets: [
        "Security questionnaire turnaround is a repeated escalation in Zendesk and CS threads.",
        "SSO commitments appear in sales notes before eng estimates are captured — that mismatch is the top contradiction.",
        "Onboarding telemetry shows step-three drop-off; product has a fix in review, but CS is already compensating manually.",
      ],
      prefer: ["support", "crm", "slack", "meetings"],
      excerpts: [
        "Zendesk cluster: 'waiting on security answers' appears in 14 tickets this month.",
        "Salesforce: enterprise deals stalling at Infosec stage with average 11-day wait.",
        "Slack #customer-success: 'we keep promising dates we cannot hit on SSO.'",
        "Meeting notes: Head of CS proposes interim security packet to buy time.",
      ],
    },
    risks: {
      answer:
        "Unresolved product and delivery risks cluster around release reliability and activation. Engineering is tracking intermittent CI failures on the release branch, while product is watching onboarding abandonment — both are open with owners, but timelines are not yet aligned in one decision record.",
      bullets: [
        "Release branch CI instability threatens hotfix SLA — owner is Eng Manager with a mitigation plan in flight.",
        "Activation risk: step-three abandonment spiked; PM owns instrumentation and UX remediation.",
        "No single signed decision ties GTM promises to the engineering mitigation dates — that is the operating gap.",
      ],
      prefer: ["github", "slack", "docs", "meetings"],
      excerpts: [
        "GitHub issue #1204: release workflow flaky on cache step — intermittent failures.",
        "Slack #engineering: hotfix SLA at risk if branch stays red through Thursday.",
        "Notion PRD: onboarding step 3 experiment backlog prioritized behind SSO work.",
        "Leadership sync notes: ask for explicit risk owners on revenue-critical paths.",
      ],
    },
    "eng-sales": {
      answer:
        "Engineering committed SAML SSO for the ACME pilot on an aggressive timeline, while sales continues to explore volume pricing for a 500-seat expansion. The operating memory shows engineering delivery promises are tracked in GitHub and tech-lead threads; sales commitments live in CRM notes and need explicit linkage to eng capacity.",
      bullets: [
        "SSO for pilot: committed with dependency on security audit artifacts — Tech Lead is DRI.",
        "Volume pricing: modeled in CRM but requires margin guardrails from product before quoting.",
        "Next step is to attach engineering milestones to the opportunity record so customer-facing dates are source-backed.",
      ],
      prefer: ["github", "crm", "slack", "meetings"],
      excerpts: [
        "GitHub issue #1210: SAML SSO checklist for ACME pilot — target Friday.",
        "Salesforce ACME opp: AE asks for 500-seat price curve with nonprofit clause.",
        "Slack thread: sales asks for 'same-day' hotfix promise — eng pushes back on scope.",
        "Meeting notes: align customer comms to milestone-based dates, not aspirational closes.",
      ],
    },
    "ceo-focus": {
      answer:
        "This week’s CEO focus should be tightening the revenue narrative ahead of board prep, resolving the hiring exception for a senior platform engineer, and forcing a single source of truth on enterprise pricing exceptions. Signals from leadership notes and chief-of-staff threads agree those three items dominate the calendar.",
      bullets: [
        "Board prep: emphasize NRR quality and pipeline concentration — finance and sales threads partially disagree on definitions; pick one.",
        "Hiring: one platform engineer exception is approved with a July 1 start guardrail — ensure recruiting and eng onboarding are aligned.",
        "Pricing governance: reconcile sales playbook vs exec thread so AEs stop working from conflicting rules.",
      ],
      prefer: ["meetings", "slack", "docs", "crm"],
      excerpts: [
        "Chief of staff notes: board deck draft due Wednesday; need consistent NRR story.",
        "Slack #leadership: CEO wants contradictions on discount policy closed before QBR.",
        "Notion: operating plan lists three CEO-level decisions awaiting sign-off.",
        "CRM: two enterprise deals hinge on answers the CEO can unblock in one session.",
      ],
    },
    default: {
      answer:
        "Across your connected sources, CortexHQ would assemble a source-backed brief: extract the decision trail, name owners, surface contradictions, and propose next actions. Paste a richer internal corpus in the advanced ingest view to tighten grounding; this demo answer is pattern-matched to your question and connector set.",
      bullets: [
        "Every bullet should trace to a source card with confidence and freshness signals.",
        "If sources disagree, CortexHQ surfaces the contradiction instead of averaging them away.",
        "Owners and next actions are extracted so work does not die in chat.",
      ],
      prefer: ["slack", "docs", "meetings", "github"],
      excerpts: [
        "Slack: fragmented decisions across channels — leadership asks for a canonical log.",
        "Docs: policies drift from what sales communicates on calls.",
        "Meetings: action items captured but not linked to tickets.",
        "GitHub: engineering reality is documented, but not always reflected in GTM promises.",
      ],
    },
  };

  const pack = answers[pattern];
  const cards = buildCards(connected, pack.prefer, pack.excerpts, baseConf);

  const nextActions: Record<PatternKey, string[]> = {
    pricing: [
      "Publish the authoritative discount ladder in Notion and pin it in #pricing.",
      "Reconcile CRM discount requests above 8% with written CEO + VP Sales approvals.",
      "Add a deal-desk step that blocks quotes when sources disagree on net terms.",
    ],
    objections: [
      "Set a 5-day SLA for security questionnaire first responses with a public owner.",
      "Replace single-date SSO promises with milestone-based customer comms.",
      "Ship onboarding step-three fix or publish a temporary guided workaround.",
    ],
    risks: [
      "Stabilize release CI and define a hotfix bypass path with explicit risk acceptance.",
      "Instrument step-three funnel with owner-reviewed daily dashboard for two weeks.",
      "Create one leadership decision record tying GTM dates to engineering milestones.",
    ],
    "eng-sales": [
      "Link GitHub SSO milestones to the ACME opportunity and customer success plan.",
      "Run a margin-gated pricing model before any 500-seat quote leaves deal desk.",
      "Add a sales engineering checkpoint for non-standard integration asks.",
    ],
    "ceo-focus": [
      "Run a 30-minute decision session on discount governance with VP Sales, CFO, and GC.",
      "Finalize board metrics definitions with finance and sales ops in one shared doc.",
      "Confirm recruiting pipeline dates against the July 1 hiring guardrail.",
    ],
    default: [
      "Pick three decisions to log with owners, sources, and dates this week.",
      "Connect the highest-variance sources first — usually Slack + CRM + support.",
      "Review contradictions flagged by CortexHQ before the next leadership sync.",
    ],
  };

  const avgConf =
    cards.length > 0 ? Math.round(cards.reduce((s, c) => s + c.confidence, 0) / cards.length) : baseConf;

  const confidenceNote = [
    stageNote(input.stage),
    deptLine,
    input.urgency === "high" ? "Urgency: high — confidence favors recency-weighted sources." : null,
    cards.some((c) => c.stale) ? "Stale signal: at least one doc excerpt may be behind live Slack/CRM truth." : null,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    queryEcho: input.question,
    answer: pack.answer,
    bullets: pack.bullets,
    confidence: clamp(avgConf + (pattern === "default" ? -6 : 0), 55, 94),
    confidenceNote,
    sources: cards,
    decisionTimeline: timelines[pattern],
    contradictions: contradictions[pattern],
    owners: owners[pattern],
    nextActions: nextActions[pattern],
  };
}
