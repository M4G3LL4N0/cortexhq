import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-200">
      <p className="text-xs uppercase tracking-widest text-cyan-400/80">How it works</p>
      <h1 className="mt-3 text-3xl font-semibold text-white">How it works</h1>
      <p className="mt-4 text-slate-400 leading-relaxed">Step-by-step overview of the product flow. The homepage KISS section is the primary explainer.</p>
      <p className="mt-6 text-xs text-slate-500">
        Demo and sample outputs are for planning only. Not professional advice.
      </p>
      <Link href="/" className="mt-8 inline-block text-sm text-cyan-400 hover:text-cyan-300">
        Back to home
      </Link>
    </main>
  );
}
