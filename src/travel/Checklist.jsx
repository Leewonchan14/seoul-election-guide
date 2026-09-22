import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { RichText } from "./RichText";

export function Checklist({ items, accounts, onDark = true }) {
  return (
    <Card className="gap-0 rounded-2xl border-[var(--t-line)] bg-[var(--t-surface)] py-0 text-[var(--t-ink)] shadow-none">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-[21px] tracking-[-0.03em]">주의 · 체크</CardTitle>
        <p className="text-[13.5px] text-[var(--t-ink-3)]">
          이 다섯 가지만 지키면 헛걸음은 없다.
        </p>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <ol className="grid list-none gap-3.5 p-0 md:grid-cols-2 md:gap-x-10">
          {items.map((item, index) => (
            <li
              key={item}
              className="relative pl-[46px] text-[15px] leading-relaxed text-[var(--t-ink-2)]"
            >
              <span className="mono absolute left-0 top-0 flex h-[26px] w-8 items-center justify-center rounded-full border border-[var(--t-line)] text-[12px] text-[var(--t-accent)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <RichText text={item} />
            </li>
          ))}
        </ol>

        <Separator className="my-6 bg-[var(--t-line)]" />

        <span className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--t-ink-3)]">
          일정 원문 확인용 계정
        </span>
        <ul className="mt-2.5 grid list-none gap-2 p-0 [grid-template-columns:repeat(auto-fit,minmax(210px,1fr))]">
          {accounts.map((account) => (
            <li key={account.handle}>
              <a
                href={account.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[60px] flex-col justify-center gap-0.5 rounded-xl border border-[var(--t-line)] bg-[var(--t-surface)] px-3 py-2.5 transition hover:-translate-y-0.5 hover:border-[var(--t-accent)] hover:bg-[var(--t-accent-soft)]"
              >
                <b className="text-[13.5px] font-semibold">{account.label}</b>
                <span className="mono text-[11.5px] text-[var(--t-ink-3)]">
                  {account.handle}
                </span>
              </a>
            </li>
          ))}
          <li>
            <span
              className={cn(
                "flex min-h-[60px] flex-col justify-center gap-0.5 rounded-xl border border-[var(--t-line)] px-3 py-2.5",
                onDark ? "bg-[var(--t-surface)]" : "bg-[var(--t-surface)]",
              )}
            >
              <b className="text-[13.5px] font-semibold">웹 · 공식</b>
              <span className="mono text-[11.5px] text-[var(--t-ink-3)]">
                연합뉴스 · 경남일보 외
              </span>
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
