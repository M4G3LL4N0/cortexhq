import type { BrainInput, BrainResult, MemoryMapNode, OwnerAssignment, SourceCard } from "./types";

const MODEL_VERSION = "cortexhq-demo-1.0.0";

function sentences(text: string): string[] {
  return text
    .split(/[\n.]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 8)
    .slice(0, 12);
}

function pickExcerpts(notes: string, count: number): string[] {
  const s = sentences(notes);
  return s.slice(0, Math.min(count, s.length));
}

export function runBrain(input: BrainInput): BrainResult {
  const excerpts = pickExcerpts(input.notes, 4);
  const q = input.question.toLowerCase();

  const structuredAnswer = [
    `Grounded read: your question (“${input.question.slice(0, 120)}${input.question.length > 120 ? "…" : ""}”) maps to ${input.sources.length} connected sources in this demo workspace.`,
    excerpts[0]
      ? `Closest note signal: ${excerpts[0].slice(0, 220)}${excerpts[0].length > 220 ? "…" : ""}`
      : "Add richer notes to improve answer grounding in this simulator.",
    q.includes("who") || q.includes("owner")
      ? "Ownership: assign named DRI per decision thread; unresolved owners create execution drag."
      : "Next step: validate assumptions in the next leadership sync with linked evidence cards.",
    "CortexHQ demo does not access real Slack/email — it simulates retrieval cards from your pasted corpus.",
  ];

  const sourceCards: SourceCard[] = input.sources.map((source, i) => ({
    source,
    title: `${source} — retrieved thread ${i + 1}`,
    excerpt: excerpts[i % Math.max(1, excerpts.length)] ?? `Sample excerpt from ${source} ingestion.`,
  }));

  const openDecisions = [
    "Pricing experiment scope: ship MVP slice vs full platform bet?",
    "Enterprise security review: SOC2 timeline vs revenue commit?",
    "Hiring: senior platform engineer vs contractor surge for Q3?",
  ];

  const ownerAssignments: OwnerAssignment[] = [
    { item: "Pricing experiment scope", owner: "CEO + Head of Product" },
    { item: "Security review timeline", owner: "CTO + Security Lead" },
    { item: "Hiring plan Q3", owner: "COO + Eng Manager" },
  ];

  const memoryMap: MemoryMapNode[] = [
    {
      theme: "Customer & revenue",
      linkedSources: input.sources.filter((s) => ["Slack", "Email", "Meetings"].includes(s)),
      weight: 0.36,
    },
    {
      theme: "Build & delivery",
      linkedSources: input.sources.filter((s) => ["Tickets", "Code", "Docs"].includes(s)),
      weight: 0.39,
    },
    {
      theme: "Leadership cadence",
      linkedSources: input.sources.filter((s) => ["Meetings", "Slack", "Email"].includes(s)),
      weight: 0.25,
    },
  ].filter((m) => m.linkedSources.length > 0);

  const memoryMapFinal =
    memoryMap.length > 0
      ? memoryMap
      : [{ theme: "Workspace", linkedSources: [...input.sources], weight: 1 }];

  const executiveLine = `Company brain snapshot: ${input.sources.join(", ")} sources indexed; ${openDecisions.length} open decisions tracked with DRIs.`;

  return {
    structuredAnswer,
    sourceCards,
    openDecisions,
    ownerAssignments,
    memoryMap: memoryMapFinal,
    executiveLine,
    modelVersion: MODEL_VERSION,
  };
}
