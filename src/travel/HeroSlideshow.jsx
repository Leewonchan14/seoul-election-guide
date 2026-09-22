import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SLIDE_MS = 6500;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * 히어로 사진 슬라이드쇼.
 * 일정 시간마다 사진이 크로스페이드로 바뀌고, 사진마다 출처 표기가 함께 바뀐다.
 * - hover / focus / 탭 비활성 / prefers-reduced-motion 이면 자동 전환을 멈춘다 (WCAG 2.2.2)
 * - 점 버튼으로 직접 이동, 일시정지 버튼 제공
 */
export function HeroSlideshow({ slides, interval = SLIDE_MS }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const autoplay = !paused && !reduced;
  const resumeAt = useRef(0);

  useEffect(() => {
    if (!autoplay) return undefined;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % slides.length),
      interval,
    );
    return () => clearInterval(timer);
  }, [autoplay, interval, slides.length]);

  // 탭이 백그라운드로 가면 멈추고, 돌아오면 처음부터 다시 돈다
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const goTo = useCallback((next) => {
    resumeAt.current = Date.now();
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  const current = slides[index];

  return (
    <div
      className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--t-line)] bg-[var(--t-surface)]"
      role="region"
      aria-roledescription="carousel"
      aria-label="시즌 풍경 사진"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative flex-1">
        {slides.map((slide, i) => (
          <figure
            key={slide.src}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 m-0 transition-opacity duration-[900ms] ease-out",
              i === index ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <img
              src={`${import.meta.env.BASE_URL}travel/assets/${slide.src}`}
              alt={slide.alt}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
              className={cn(
                "h-full min-h-[320px] w-full object-cover",
                i === index && !reduced && "kenburns",
              )}
            />
          </figure>
        ))}

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.88), rgba(0,0,0,0.38) 55%, transparent)",
          }}
        />

        <figcaption
          key={current.src}
          className="absolute inset-x-0 bottom-0 px-4 pb-4 text-[12px] text-[#e9eaec] [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]"
        >
          <span className="mono mr-2 rounded-full border border-white/25 px-2 py-0.5 text-[10.5px] uppercase tracking-[0.08em]">
            {index + 1} / {slides.length}
          </span>
          {current.place} · 사진{" "}
          <a
            href={current.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-white/35 hover:border-white/70"
          >
            {current.credit}
          </a>{" "}
          · {current.meta}
        </figcaption>

        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/15">
          {autoplay && (
            <span
              key={`${index}-${paused}`}
              className="block h-full origin-left bg-[var(--t-accent)]"
              style={{
                animation: `travel-slide-progress ${interval}ms linear both`,
              }}
            />
          )}
        </div>
      </div>

      <div className="absolute right-3 top-3 flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          aria-label={autoplay ? "사진 자동 넘김 일시정지" : "사진 자동 넘김 재생"}
          aria-pressed={!autoplay}
          onClick={() => setPaused((value) => !value)}
          className="size-8 rounded-full border border-white/25 bg-black/35 text-white backdrop-blur hover:bg-black/55 hover:text-white"
        >
          {autoplay ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
        </Button>
      </div>

      <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1.5">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${slide.place} 사진 보기`}
            aria-current={i === index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index
                ? "w-6 bg-[var(--t-accent)]"
                : "w-1.5 bg-white/45 hover:bg-white/75",
            )}
          />
        ))}
      </div>
    </div>
  );
}
