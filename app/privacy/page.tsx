import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-300">
      <p className="text-xs uppercase tracking-wider text-amber-400/90">Policy draft — not legal advice</p>
      <h1 className="mt-4 text-3xl font-semibold text-white">Privacy</h1>
      <p className="mt-6 leading-relaxed text-slate-400">We collect only what is needed to run the product. You can export or delete your data where account features exist. Nothing is published without your approval.</p>
      <p className="mt-6 text-sm text-slate-500">Review with counsel before relying on this page.</p>
      <Link href="/" className="mt-8 inline-block text-sm text-cyan-400 hover:text-cyan-300">Back to home</Link>
    </main>
  );
}
