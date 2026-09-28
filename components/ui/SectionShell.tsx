import type { ReactNode } from "react";

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 sm:py-20 ${className}`.trim()}>
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">{eyebrow}</p>
        ) : null}
        <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
        {description ? <p className="mt-4 text-pretty text-sm leading-relaxed text-slate-400 sm:text-base">{description}</p> : null}
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}
