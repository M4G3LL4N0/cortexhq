import Link from "next/link";

export const metadata = {
  title: "Investor — Cortexhq",
  description: "Investor for Cortexhq.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-semibold sm:text-3xl">Investor</h1>
      <p className="mt-4 text-sm leading-relaxed opacity-80 sm:text-base">
        This page is live so navigation and portfolio links do not 404. Expand with product-specific content when ready.
      </p>
      <p className="mt-4 text-xs opacity-60">Demo-labeled outputs where applicable · founder approval before publish.</p>
      <Link href="/" className="mt-8 inline-block min-h-11 text-sm underline-offset-4 hover:underline">
        Back to home
      </Link>
    </main>
  );
}
