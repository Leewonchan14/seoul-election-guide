import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ASPECT = {
  1: "aspect-[16/11]",
  2: "aspect-[16/9]",
  4: "aspect-[21/9]",
};

const SPAN = {
  1: "col-span-1",
  2: "col-span-1 md:col-span-2",
  4: "col-span-1 md:col-span-2 lg:col-span-4",
};

const SEASON_CLASS = {
  10: "text-[var(--t-oct)]",
  11: "text-[var(--t-nov)]",
  12: "text-[var(--t-dec)]",
};

export function PlaceCard({ card }) {
  return (
    <Card
      className={cn(
        "travel-card gap-0 overflow-hidden rounded-2xl border-[var(--t-line)] bg-[var(--t-surface)] py-0 text-[var(--t-ink)] shadow-none transition-[transform,border-color,background] duration-200 hover:-translate-y-0.5 hover:border-[var(--t-line-2)] hover:bg-[var(--t-surface-2)]",
        SPAN[card.span] ?? SPAN[1],
      )}
    >
      {card.images.map((image, i) => (
        <figure key={image.src} className="group m-0 overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}travel/assets/${image.src}`}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className={cn(
              "w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]",
              ASPECT[card.span] ?? ASPECT[1],
            )}
          />
          {card.credits[i] && (
            <figcaption className="px-5 pt-2 text-xs leading-relaxed text-[var(--t-ink-3)]">
              {card.credits[i].url ? (
                <>
                  사진{" "}
                  <a
                    href={card.credits[i].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-[var(--t-line)] hover:text-[var(--t-ink-2)]"
                  >
                    {card.credits[i].label}
                  </a>
                  {card.credits[i].meta ? ` · ${card.credits[i].meta}` : ""}
                </>
              ) : (
                <>
                  사진 {card.credits[i].label}
                  {card.credits[i].meta ? ` · ${card.credits[i].meta}` : ""}
                </>
              )}
            </figcaption>
          )}
        </figure>
      ))}

      <CardContent className="flex flex-1 flex-col gap-2 px-5 pb-6 pt-5">
        <span
          className={cn(
            "mono flex items-center gap-2 text-[11px] uppercase tracking-[0.06em]",
            SEASON_CLASS[card.season],
          )}
        >
          <i className="block size-[7px] rounded-full bg-current" />
          {card.season}월
        </span>

        <h3
          className={cn(
            "font-bold leading-tight tracking-[-0.03em]",
            card.span === 1 ? "text-[19px]" : "text-[22px]",
          )}
        >
          {card.title}
        </h3>

        <span className="mono text-[12.5px] text-[var(--t-ink-2)]">{card.when}</span>

        {card.desc && (
          <p className="text-[14.5px] leading-relaxed text-[var(--t-ink-2)]">{card.desc}</p>
        )}

        {card.facts.length > 0 && (
          <ul className="mt-auto grid gap-1.5 border-t border-[var(--t-line)] pt-3 text-[13.5px] text-[var(--t-ink-2)]">
            {card.facts.map((fact) => (
              <li key={fact} className="flex gap-2">
                <i className="mt-[9px] block size-[5px] shrink-0 rounded-full bg-[var(--t-ink-3)]" />
                <span>
                  {fact.split("사전예약 필수").length === 2 ? (
                    <>
                      <Badge
                        variant="outline"
                        className="mr-1.5 border-[var(--t-accent)] align-middle text-[11.5px] text-[var(--t-accent)]"
                      >
                        사전예약 필수
                      </Badge>
                      {fact.replace("사전예약 필수", "").trim()}
                    </>
                  ) : (
                    fact
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
