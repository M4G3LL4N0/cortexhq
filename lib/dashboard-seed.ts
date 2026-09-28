export type DashboardDept = "all" | "product" | "engineering" | "sales" | "customer-success" | "leadership";

export type SourceId = "slack" | "docs" | "meetings" | "github" | "crm" | "support";

export type MemoryNode = {
  id: string;
  label: string;
  type: "decision" | "customer" | "risk" | "doc" | "owner";
  department: Exclude<DashboardDept, "all">;
  sources: SourceId[];
  confidence: number;
  summary: string;
  detail: string;
};

export type DashboardSeed = {
  memoryHealth: number;
  connectedSources: { id: SourceId; name: string; status: "live" | "syncing" | "paused"; lastSync: string }[];
  openDecisions: { id: string; title: string; owner: string; ageDays: number; department: Exclude<DashboardDept, "all">; sources: SourceId[] }[];
  repeatedQuestions: { q: string; count: number; department: Exclude<DashboardDept, "all"> }[];
  staleDocs: { title: string; daysStale: number; owner: string }[];
  customerSignals: { signal: string; strength: number; department: Exclude<DashboardDept, "all"> }[];
  leadershipPriorities: { item: string; owner: string }[];
  riskRadar: { risk: string; severity: "low" | "medium" | "high"; note: string; department: Exclude<DashboardDept, "all"> }[];
  graphNodes: MemoryNode[];
  recentActivity: { time: string; source: SourceId; summary: string }[];
};

export const DASHBOARD_SEED: DashboardSeed = {
  memoryHealth: 84,
  connectedSources: [
    { id: "slack", name: "Slack", status: "live", lastSync: "2m ago" },
    { id: "docs", name: "Docs", status: "syncing", lastSync: "6m ago" },
    { id: "meetings", name: "Meetings", status: "live", lastSync: "14m ago" },
    { id: "github", name: "GitHub", status: "live", lastSync: "4m ago" },
    { id: "crm", name: "CRM", status: "paused", lastSync: "1h ago" },
    { id: "support", name: "Support", status: "live", lastSync: "3m ago" },
  ],
  openDecisions: [
    {
      id: "d1",
      title: "Enterprise discount governance",
      owner: "VP Sales",
      ageDays: 3,
      department: "sales",
      sources: ["slack", "crm", "docs"],
    },
    {
      id: "d2",
      title: "SSO audit dependencies for ACME pilot",
      owner: "Tech Lead",
      ageDays: 1,
      department: "engineering",
      sources: ["github", "meetings", "slack"],
    },
    {
      id: "d3",
      title: "Onboarding step-three remediation",
      owner: "PM",
      ageDays: 5,
      department: "product",
      sources: ["support", "docs", "meetings"],
    },
    {
      id: "d4",
      title: "CS coverage model for enterprise accounts",
      owner: "Head of CS",
      ageDays: 7,
      department: "customer-success",
      sources: ["crm", "slack"],
    },
    {
      id: "d5",
      title: "Board metrics definition (NRR vs GRR)",
      owner: "Chief of Staff",
      ageDays: 2,
      department: "leadership",
      sources: ["meetings", "docs"],
    },
  ],
  repeatedQuestions: [
    { q: "What did we decide about enterprise pricing exceptions?", count: 14, department: "sales" },
    { q: "When is SSO shipping for the pilot?", count: 11, department: "customer-success" },
    { q: "Who owns onboarding drop-off metrics?", count: 9, department: "product" },
    { q: "What is the hotfix path if release CI is red?", count: 7, department: "engineering" },
    { q: "What are the top three CEO decisions this week?", count: 6, department: "leadership" },
  ],
  staleDocs: [
    { title: "Security review checklist v1", daysStale: 38, owner: "Security" },
    { title: "Sales playbook: discount policy", daysStale: 21, owner: "RevOps" },
    { title: "Product roadmap — Q2 narrative", daysStale: 12, owner: "PMM" },
  ],
  customerSignals: [
    { signal: "Security questionnaire turnaround", strength: 88, department: "customer-success" },
    { signal: "SSO date anxiety on enterprise deals", strength: 81, department: "sales" },
    { signal: "Step-three onboarding friction", strength: 76, department: "product" },
    { signal: "Release reliability concerns from CS", strength: 62, department: "customer-success" },
  ],
  leadershipPriorities: [
    { item: "Close contradictions between sales playbook and exec pricing thread", owner: "CEO" },
    { item: "Align board metrics with finance + sales ops definitions", owner: "Chief of Staff" },
    { item: "Approve senior platform hire exception with July 1 guardrail", owner: "COO" },
  ],
  riskRadar: [
    {
      risk: "Customer-facing dates ahead of engineering milestones",
      severity: "high",
      note: "Detected across CRM notes and GitHub timelines.",
      department: "sales",
    },
    {
      risk: "Stale policy docs diverging from Slack decisions",
      severity: "medium",
      note: "Discount ladder mismatch flagged.",
      department: "leadership",
    },
    {
      risk: "Activation regression after last release",
      severity: "medium",
      note: "Support cluster + product metrics agree.",
      department: "product",
    },
    {
      risk: "CI instability on release branch",
      severity: "high",
      note: "Impacts hotfix SLA; owner assigned in eng channel.",
      department: "engineering",
    },
  ],
  graphNodes: [
    {
      id: "n1",
      label: "Pricing governance",
      type: "decision",
      department: "sales",
      sources: ["slack", "crm", "docs"],
      confidence: 86,
      summary: "Conflicting discount authority between playbook and exec thread.",
      detail: "Open decision with GC + VP Sales as co-owners. Needs a single published policy.",
    },
    {
      id: "n2",
      label: "ACME pilot SSO",
      type: "customer",
      department: "engineering",
      sources: ["github", "meetings"],
      confidence: 79,
      summary: "Engineering milestone plan vs customer comms dates.",
      detail: "Pilot hinges on SAML completion and audit artifacts — link milestones to CRM.",
    },
    {
      id: "n3",
      label: "Onboarding drop-off",
      type: "risk",
      department: "product",
      sources: ["support", "docs"],
      confidence: 74,
      summary: "Step-three abandonment spike with known UX debt.",
      detail: "PM owns fix; CS using manual workaround — track until resolved.",
    },
    {
      id: "n4",
      label: "Operating memory hygiene",
      type: "owner",
      department: "leadership",
      sources: ["slack", "meetings"],
      confidence: 91,
      summary: "Chief of staff pushing canonical decision log.",
      detail: "Weekly review to attach sources and owners to top decisions.",
    },
    {
      id: "n5",
      label: "Release reliability",
      type: "risk",
      department: "engineering",
      sources: ["github", "slack"],
      confidence: 82,
      summary: "Intermittent CI failures threaten hotfix path.",
      detail: "Eng manager tracking mitigation; communicate risk to CS leads.",
    },
    {
      id: "n6",
      label: "CS enterprise coverage",
      type: "customer",
      department: "customer-success",
      sources: ["crm", "support"],
      confidence: 70,
      summary: "Accounts at risk due to slow security responses.",
      detail: "Hire plan vs finance model mismatch — leadership decision pending.",
    },
  ],
  recentActivity: [
    { time: "2m ago", source: "slack", summary: "New thread in #exec-decisions referencing discount approvals." },
    { time: "6m ago", source: "docs", summary: "Notion policy page edited — discount ladder section." },
    { time: "12m ago", source: "github", summary: "Issue #1210 updated: SAML checklist progress." },
    { time: "18m ago", source: "crm", summary: "ACME opportunity notes updated with revised close plan." },
    { time: "24m ago", source: "support", summary: "Ticket cluster tagged: security questionnaire delays." },
    { time: "31m ago", source: "meetings", summary: "Leadership sync notes ingested — three decisions pending owners." },
  ],
};

export function filterNodes(
  dept: DashboardDept,
  source: SourceId | "all",
  nodes: MemoryNode[],
): MemoryNode[] {
  return nodes.filter((n) => {
    if (dept !== "all" && n.department !== dept) return false;
    if (source !== "all" && !n.sources.includes(source)) return false;
    return true;
  });
}
