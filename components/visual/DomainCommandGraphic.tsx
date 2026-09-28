"use client";

export function DomainCommandGraphic({
  ventureId,
  worldId,
  labels,
  title = "Operating view",
}: {
  ventureId: string;
  worldId: string;
  labels: string[];
  title?: string;
}) {
  const items = labels.slice(0, 6);
  return (
    <section
      className={`domain-command domain-command--${worldId} my-8 min-w-0 sm:my-10`}
      aria-label={`${title} for ${ventureId}`}
    >
      <div className="domain-command__header mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] opacity-80">{title}</h2>
        <span className="domain-command__badge rounded px-2 py-0.5 text-[10px] uppercase tracking-wider">
          Sample · not live data
        </span>
      </div>
      <div className="domain-command__grid grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((label, i) => (
          <article key={label} className="domain-command__cell min-w-0 p-4">
            <p className="domain-command__label text-[10px] uppercase tracking-wider opacity-70">Module</p>
            <p className="domain-command__title mt-1 break-words text-sm font-semibold">{label}</p>
            <div className="domain-command__meter mt-3 h-1.5 w-full overflow-hidden rounded-full opacity-40">
              <div
                className="domain-command__meter-fill h-full rounded-full"
                style={{ width: `${55 + ((i * 17) % 40)}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] leading-relaxed opacity-60">Draft insight · approval required</p>
          </article>
        ))}
      </div>
    </section>
  );
}
