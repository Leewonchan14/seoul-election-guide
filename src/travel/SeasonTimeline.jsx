import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const BAR_CLASS = {
  oct: "bg-[var(--t-oct)]",
  nov: "bg-[var(--t-nov)]",
  dec: "bg-[var(--t-dec)]",
};

const MONTH_TICKS = [
  { left: 11.6, label: "10월" },
  { left: 34.1, label: "11월" },
  { left: 55.8, label: "12월" },
  { left: 78.3, label: "1월" },
];

export function SeasonTimeline({ rows }) {
  return (
    <Card className="gap-0 rounded-2xl border-[var(--t-line)] bg-[var(--t-surface)] py-0 text-[var(--t-ink)] shadow-none">
      <CardHeader className="px-6 pt-6">
        <p className="text-[13.5px] text-[var(--t-ink-3)]">
          막대 위치가 곧 절정 구간. 세로선은 월 경계다.
        </p>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="mb-2 grid grid-cols-[118px_1fr] items-end gap-3.5 md:grid-cols-[170px_1fr_200px]">
          <span className="mono pb-1 text-[11.5px] text-[var(--t-ink-3)]">9월 하순</span>
          <span className="relative col-start-2 h-[22px] border-b border-[var(--t-line)]">
            {MONTH_TICKS.map((tick) => (
              <b
                key={tick.label}
                style={{ left: `${tick.left}%` }}
                className="mono absolute bottom-1.5 -translate-x-1/2 text-[11.5px] font-normal text-[var(--t-ink-3)]"
              >
                {tick.label}
                <i className="absolute left-1/2 top-3.5 block h-2 w-px bg-[var(--t-line-2)]" />
              </b>
            ))}
          </span>
        </div>

        <div className="grid gap-1.5">
          {rows.map((row) => (
            <div
              key={row.name}
              className="grid grid-cols-[118px_1fr] items-center gap-3.5 md:grid-cols-[170px_1fr_200px]"
            >
              <span className="truncate text-[13.5px] text-[var(--t-ink-2)]">
                {row.name}
              </span>
              <span
                className="relative h-3.5 pr-1"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,transparent 11.5%,var(--t-line) 11.5%,var(--t-line) calc(11.5% + 1px),transparent calc(11.5% + 1px),transparent 34%,var(--t-line) 34%,var(--t-line) calc(34% + 1px),transparent calc(34% + 1px),transparent 55.7%,var(--t-line) 55.7%,var(--t-line) calc(55.7% + 1px),transparent calc(55.7% + 1px),transparent 78.2%,var(--t-line) 78.2%,var(--t-line) calc(78.2% + 1px),transparent calc(78.2% + 1px))",
                }}
              >
                <i
                  className={cn(
                    "absolute top-px h-3 rounded-full",
                    BAR_CLASS[row.season] ?? BAR_CLASS.oct,
                  )}
                  style={{ left: `${row.left}%`, width: `${row.width}%` }}
                />
              </span>
              <span className="mono col-start-2 truncate text-[12px] text-[var(--t-ink-3)] md:col-start-3">
                {row.period}
              </span>
            </div>
          ))}
        </div>

        <div className="mono mt-5 flex flex-wrap gap-[18px] text-[11.5px] text-[var(--t-ink-3)]">
          {[
            ["10월", "var(--t-oct)"],
            ["11월", "var(--t-nov)"],
            ["12월", "var(--t-dec)"],
          ].map(([label, color]) => (
            <span key={label} className="flex items-center">
              <i
                className="mr-2 inline-block size-[9px] rounded-full"
                style={{ background: color }}
              />
              {label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
