import { cn } from "@/lib/utils";

export function SourceChips({ label, sources, className }) {
  if (!sources?.length) return null;
  return (
    <div className={cn("mt-4", className)}>
      <span className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--t-ink-3)]">
        {label}
      </span>
      <ul className="mt-2.5 grid list-none gap-2 p-0 [grid-template-columns:repeat(auto-fit,minmax(210px,1fr))]">
        {sources.map((source) => (
          <li key={`${source.label}-${source.handle}`}>
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[60px] flex-col justify-center gap-0.5 rounded-xl border border-[var(--t-line)] bg-[var(--t-surface)] px-3 py-2.5 transition hover:-translate-y-0.5 hover:border-[var(--t-accent)] hover:bg-[var(--t-accent-soft)]"
              >
                <b className="text-[13.5px] font-semibold">{source.label}</b>
                <span className="mono text-[11.5px] text-[var(--t-ink-3)]">
                  {source.handle}
                </span>
              </a>
            ) : (
              <span className="flex min-h-[60px] flex-col justify-center gap-0.5 rounded-xl border border-[var(--t-line)] bg-[var(--t-surface)] px-3 py-2.5">
                <b className="text-[13.5px] font-semibold">{source.label}</b>
                <span className="mono text-[11.5px] text-[var(--t-ink-3)]">
                  {source.handle}
                </span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
