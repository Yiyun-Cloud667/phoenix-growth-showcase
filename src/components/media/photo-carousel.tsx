"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { JourneyPhoto } from "@/lib/types";
import { SceneArt } from "./scene-art";
import { cn } from "@/lib/utils";

/**
 * 照片轮播:自动滚动 + 手动拖拽/滑动 + 箭头 + 圆点。
 * 鼠标悬停或交互时暂停自动播放。
 */
export function PhotoCarousel({
  photos,
  className,
  intervalMs = 3200,
}: {
  photos: JourneyPhoto[];
  className?: string;
  intervalMs?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = photos.length;

  const scrollTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (child) el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  // 自动播放
  useEffect(() => {
    if (paused || n <= 1) return;
    const t = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % n;
        scrollTo(next);
        return next;
      });
    }, intervalMs);
    return () => clearInterval(t);
  }, [paused, n, intervalMs]);

  // 滚动时同步圆点
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const ch = c as HTMLElement;
      const mid = ch.offsetLeft - el.offsetLeft + ch.clientWidth / 2;
      const d = Math.abs(mid - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setIndex(best);
  };

  const go = (dir: number) => {
    const next = (index + dir + n) % n;
    setIndex(next);
    scrollTo(next);
  };

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1"
      >
        {photos.map((ph) => (
          <div key={ph.id} className="snap-center shrink-0 basis-[78%] sm:basis-[46%] lg:basis-[31.5%]">
            <SceneArt motif={ph.motif} caption={ph.caption} badge={ph.slot} className="aspect-[4/3] w-full" />
          </div>
        ))}
      </div>

      {/* 箭头 */}
      <button
        type="button"
        onClick={() => go(-1)}
        className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2 text-[var(--brand-navy)] shadow-lg ring-1 ring-black/5 transition hover:bg-white sm:flex"
        aria-label="上一张"
      >
        <ChevronLeftIcon className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2 text-[var(--brand-navy)] shadow-lg ring-1 ring-black/5 transition hover:bg-white sm:flex"
        aria-label="下一张"
      >
        <ChevronRightIcon className="size-4" />
      </button>

      {/* 圆点 */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {photos.map((ph, i) => (
          <button
            key={ph.id}
            type="button"
            onClick={() => go(i - index)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === index ? "w-6 bg-[var(--brand-orange)]" : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
            )}
            aria-label={`第 ${i + 1} 张`}
          />
        ))}
      </div>
    </div>
  );
}
