import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroSlideshow } from "./HeroSlideshow";
import { PlaceCard } from "./PlaceCard";
import { SeasonTimeline } from "./SeasonTimeline";
import { Checklist } from "./Checklist";
import { SourceChips } from "./SourceChips";
import {
  checklist,
  credits,
  hero,
  heroSlides,
  marquee,
  officialAccounts,
  sections,
  timeline,
} from "./data";

const THEME_KEY = "travel-theme";

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || "dark";
    } catch {
      return "dark";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);
  return [theme, setTheme];
}

function RailNav({ active }) {
  const items = useMemo(
    () => [
      { id: "calendar", label: "캘린더" },
      ...sections.map((section) => ({
        id: section.id,
        label: section.title.split(" ")[0],
      })),
      { id: "tips", label: "주의 · 체크" },
    ],
    [],
  );

  return (
    <nav className="ml-auto flex gap-1 overflow-x-auto [mask-image:linear-gradient(90deg,#000_calc(100%-18px),transparent)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13.5px] text-[var(--t-ink-2)] transition hover:bg-[var(--t-surface-2)] hover:text-[var(--t-ink)]",
            active === item.id &&
              "bg-[var(--t-accent-soft)] text-[var(--t-accent)] hover:bg-[var(--t-accent-soft)] hover:text-[var(--t-accent)]",
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

function SectionHead({ title, sub, count }) {
  return (
    <div className="sticky top-16 z-10 -mx-[clamp(18px,3.4vw,56px)] mb-5 border-b border-[var(--t-line)] bg-[color-mix(in_srgb,var(--t-bg)_88%,transparent)] px-[clamp(18px,3.4vw,56px)] py-3.5 backdrop-blur-md max-sm:static">
      <div className="flex flex-wrap items-baseline gap-4">
        <h2 className="text-[clamp(22px,2.5vw,34px)] font-extrabold tracking-[-0.035em]">
          {title}
        </h2>
        <span className="mono ml-auto rounded-full border border-[var(--t-line)] px-2.5 py-1 text-[12px] text-[var(--t-ink-2)]">
          {count}곳
        </span>
      </div>
      <p className="mt-1 text-[13.5px] text-[var(--t-ink-3)]">{sub}</p>
    </div>
  );
}

export default function TravelGuide() {
  const [theme, setTheme] = useTheme();
  const [active, setActive] = useState("calendar");

  useEffect(() => {
    const ids = ["calendar", ...sections.map((s) => s.id), "tips"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const marqueeItems = [...marquee, ...marquee];

  return (
    <div className={cn("travel min-h-screen", theme === "light" && "light")}>
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-[var(--t-line)] bg-[color-mix(in_srgb,var(--t-bg)_78%,transparent)] backdrop-blur-xl">
        <div className="mx-auto flex h-full w-full max-w-[1320px] items-center gap-5 px-[clamp(18px,3.4vw,56px)]">
          <div className="whitespace-nowrap text-[15.5px] font-bold tracking-[-0.02em]">
            10 · 11 · 12월 여행지
            <em className="ml-2 text-[13px] font-medium not-italic text-[var(--t-ink-3)]">
              목적별 26곳
            </em>
          </div>
          <RailNav active={active} />
          <Button
            variant="outline"
            size="icon"
            aria-label="라이트/다크 전환"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="size-[34px] shrink-0 rounded-full border-[var(--t-line)] bg-transparent text-[var(--t-ink-2)] hover:bg-[var(--t-surface-2)] hover:text-[var(--t-ink)]"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        </div>
        <div className="progress absolute -bottom-px left-0 h-0.5 w-full bg-[var(--t-accent)]" />
      </header>

      <main className="pt-16">
        {/* hero */}
        <section className="mx-auto w-full max-w-[1320px] px-[clamp(18px,3.4vw,56px)] pb-8 pt-[clamp(64px,10vw,120px)]">
          <div className="grid items-stretch gap-[clamp(24px,4vw,64px)] lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <span className="mono inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-[var(--t-ink-3)]">
                <i className="block size-1.5 rounded-full bg-[var(--t-accent)]" />
                {hero.eyebrow}
              </span>
              <h1 className="mt-[18px] flex flex-wrap gap-x-[0.34em] gap-y-[0.12em] text-[clamp(34px,4.6vw,64px)] font-extrabold leading-[1.04] tracking-[-0.045em]">
                {hero.headline.map((item) => (
                  <span key={item.word} className="whitespace-nowrap">
                    <em
                      className={cn(
                        "not-italic",
                        item.season === 10 && "text-[var(--t-oct)]",
                        item.season === 11 && "text-[var(--t-nov)]",
                        item.season === 12 && "text-[var(--t-dec)]",
                      )}
                    >
                      {item.season}
                    </em>{" "}
                    {item.word}
                  </span>
                ))}
              </h1>
              <p className="mt-[22px] max-w-[46ch] text-[clamp(15px,1.3vw,17.5px)] leading-relaxed text-[var(--t-ink-2)]">
                {hero.lede}
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {hero.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="min-w-[132px] rounded-xl border border-[var(--t-line)] bg-[var(--t-surface)] px-3.5 py-2.5"
                  >
                    <b className="mono block text-[20px] tracking-[-0.02em]">{stat.value}</b>
                    <span className="text-[12.5px] text-[var(--t-ink-3)]">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <HeroSlideshow slides={heroSlides} />
          </div>
        </section>

        {/* marquee */}
        <div className="marquee overflow-hidden border-y border-[var(--t-line)] bg-[var(--t-surface)]">
          <div className="marquee-track">
            {marqueeItems.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="mono inline-flex items-center gap-2.5 whitespace-nowrap px-6 py-3.5 text-[13px] text-[var(--t-ink-2)] after:block after:size-1 after:shrink-0 after:rounded-full after:bg-[var(--t-accent)] after:content-['']"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* calendar */}
        <section
          id="calendar"
          className="mx-auto w-full max-w-[1320px] scroll-mt-20 px-[clamp(18px,3.4vw,56px)] pt-[clamp(46px,6vw,88px)]"
        >
          <SectionHead
            title="시즌 캘린더"
            sub="2026년 9월 15일부터 2027년 1월 31일까지"
            count="10개 일정"
          />
          <SeasonTimeline rows={timeline} />
        </section>

        {/* content sections */}
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mx-auto w-full max-w-[1320px] scroll-mt-20 px-[clamp(18px,3.4vw,56px)] pt-[clamp(46px,6vw,88px)]"
          >
            <SectionHead
              title={section.title}
              sub={section.sub}
              count={section.cards.length}
            />
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-4">
              {section.cards.map((card) => (
                <PlaceCard key={card.title} card={card} />
              ))}
            </div>
            <SourceChips label="참고 링크" sources={section.sources} />
          </section>
        ))}

        {/* checklist */}
        <section
          id="tips"
          className="mx-auto w-full max-w-[1320px] scroll-mt-20 px-[clamp(18px,3.4vw,56px)] pt-[clamp(46px,6vw,88px)]"
        >
          <Checklist items={checklist} accounts={officialAccounts} />
        </section>

        <div className="mx-auto w-full max-w-[1320px] px-[clamp(18px,3.4vw,56px)]">
          <p className="mt-9 max-w-[80ch] text-[12.5px] leading-relaxed text-[var(--t-ink-3)]">
            {credits}
          </p>
          <footer className="mt-[clamp(50px,6vw,90px)] flex flex-wrap justify-between gap-5 border-t border-[var(--t-line)] pt-5 text-[12.5px] text-[var(--t-ink-3)]">
            <span>2026년 9월 정리 · 인스타 리스트 계정 20여 곳과 웹 보도 참고</span>
            <span className="mono flex items-center gap-1.5">
              <a
                href={import.meta.env.BASE_URL}
                className="inline-flex items-center gap-1 hover:text-[var(--t-ink-2)]"
              >
                선거안내 홈
                <ChevronRight className="size-3.5" />
              </a>
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}
