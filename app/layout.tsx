import type { Metadata } from "next";
import { VentureSignature } from "@/components/VentureSignature";
import Link from "next/link";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { MotionBoot } from "@/components/motion/MotionBoot";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/favicon.svg?v=2", type: "image/svg+xml", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=2" }],
  },
  manifest: "/site.webmanifest?v=2",
  title: "CortexHQ — Company brain",
  description:
    "Source-backed company memory: decisions, owners, timelines, and next actions — ask your company anything with receipts.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="premium-motion">
      <body className="min-h-screen bg-[#070a12] text-slate-100 antialiased">
        <MotionBoot />
        <div className="motion-nav"><SiteNav /></div>
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 sm:pt-8">{children}</div>
        <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-500">
          CortexHQ MVP — simulated connectors. No live Slack, email, or customer data access.{" "}
          <Link className="text-cyan-500 hover:underline" href="/workspace">
            Advanced ingest
          </Link>
          .
        </footer>
      
        <VentureSignature tone="dark" variant="ai" />
      </body>
    </html>
  );
}
