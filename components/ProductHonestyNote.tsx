"use client";

type Props = {
  className?: string;
  status?: "demo" | "early-mvp" | "pilot";
};

const COPY = {
  demo: "Early MVP. Numbers and outputs on this site use sample data unless labeled otherwise.",
  "early-mvp": "Early MVP. We are validating with real users before claiming production outcomes.",
  pilot: "Pilot stage. Capabilities vary by environment; contact us before relying on this for operations.",
};

export function ProductHonestyNote({ className = "", status = "demo" }: Props) {
  return (
    <p
      role="note"
      className={`mt-6 max-w-2xl text-xs leading-relaxed text-white/45 ${className}`.trim()}
    >
      {COPY[status]}
    </p>
  );
}
