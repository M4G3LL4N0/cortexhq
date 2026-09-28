import { MemoryDashboard } from "@/components/cortex/MemoryDashboard";

export const metadata = {
  title: "Memory dashboard — CortexHQ",
  description: "Company memory dashboard: health score, sources, risks, graph, and activity — interactive demo data.",
};

export default function DashboardPage() {
  return <MemoryDashboard />;
}
