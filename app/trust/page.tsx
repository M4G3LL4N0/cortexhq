import Link from "next/link";
import { FounderControlStrip } from "@/components/FounderControlStrip";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-200">
      <h1 className="text-3xl font-semibold text-white">Trust and control</h1>
      <p className="mt-4 text-slate-400 leading-relaxed">How we handle privacy, approvals, exports, and limitations. Expand with counsel-reviewed policies.</p>
      <FounderControlStrip className="mt-6" />
      <p className="mt-6 text-xs text-slate-500">Expand this page with real content. Not legal advice.</p>
      <Link href="/" className="mt-8 inline-block text-sm text-cyan-400 hover:text-cyan-300">Back to home</Link>
    </main>
  );
}
