export const DATA_SOURCES = [
  "Slack",
  "Email",
  "Docs",
  "Tickets",
  "Meetings",
  "Code",
] as const;

export type BrainInput = {
  sources: (typeof DATA_SOURCES)[number][];
  notes: string;
  question: string;
};

export type SourceCard = {
  source: string;
  title: string;
  excerpt: string;
};

export type OwnerAssignment = {
  item: string;
  owner: string;
};

export type MemoryMapNode = {
  theme: string;
  linkedSources: string[];
  weight: number;
};

export type BrainResult = {
  structuredAnswer: string[];
  sourceCards: SourceCard[];
  openDecisions: string[];
  ownerAssignments: OwnerAssignment[];
  memoryMap: MemoryMapNode[];
  executiveLine: string;
  modelVersion: string;
};
