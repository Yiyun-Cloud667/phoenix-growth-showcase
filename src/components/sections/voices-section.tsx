"use client";

import { useState } from "react";
import { QuoteIcon, HeartIcon, PlayCircleIcon } from "lucide-react";
import { INTERVIEWS, WISHES } from "@/lib/data";
import type { Wish } from "@/lib/types";
import { SectionShell } from "@/components/site/section-shell";
import { VideoPlaceholder } from "@/components/media/video-placeholder";
import { SceneArt } from "@/components/media/scene-art";
import { MarqueeRow } from "@/components/media/marquee-row";
import { cn } from "@/lib/utils";

function WishNote({ wish, rotate }: { wish: Wish; rotate: number }) {
  const bg = `hsl(${wish.hue} 80% 92%)`;
  const edge = `hsl(${wish.hue} 70% 80%)`;
  const ink = `hsl(${wish.hue} 45% 28%)`;
  return (
    <div
      className="wish-note w-64 shrink-0"
      style={{ background: bg, boxShadow: `0 10px 24px -14px hsl(${wish.hue} 50% 40% / .5)`, transform: `rotate(${rotate}deg)` }}
    >
      <p className="text-[13.5px]" style={{ color: ink }}>{wish.text}</p>
      <div className="mt-2 flex items-center gap-1.5 border-t pt-2" style={{ borderColor: edge }}>
        <HeartIcon className="size-3" style={{ color: ink, opacity: 0.7 }} fill="currentColor" />
        <span className="text-[11px] font-medium" style={{ color: ink, opacity: 0.7 }}>{wish.author}</span>
      </div>
    </div>
  );
}

export function VoicesSection() {
  const [active, setActive] = useState(0);
  const clip = INTERVIEWS[active];

  const rows = [0, 1, 2].map((r) => WISHES.filter((_, i) => i % 3 === r));
  const rotations = [-2, 1.5, -1, 2, -1.5, 1];

  return (
    <SectionShell
      id="voices"
      index="05"
      kicker="LEARNER VOICES"
      title="学员心声"
      desc="镜头里的火凤风采,便利贴上的成长心愿 —— 八天旅程留下的最真实回响。"
      tone="dark"
      firstSection
    >
      {/* 采访视频 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <VideoPlaceholder
            key={clip.id}
            motif={clip.motif}
            title={clip.title}
            subtitle={clip.speaker}
            duration="01:30"
            className="shadow-2xl shadow-black/30"
          />
          <div className="mt-3 flex items-start gap-2 rounded-xl bg-white/[.05] p-4 ring-1 ring-white/10">
            <QuoteIcon className="size-5 shrink-0 text-[var(--brand-gold)]" />
            <p className="text-sm italic leading-relaxed text-white/80">{clip.quote}</p>
          </div>
        </div>

        <div className="lg:col-span-4">
          <p className="mb-3 text-sm font-semibold text-white/70">更多采访 · 火凤风采</p>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {INTERVIEWS.map((it, i) => (
              <button
                key={it.id}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "group flex items-center gap-3 overflow-hidden rounded-xl p-2 text-left ring-1 transition-all",
                  i === active ? "bg-white/12 ring-[var(--brand-gold)]/40" : "bg-white/[.04] ring-white/10 hover:bg-white/[.08]"
                )}
              >
                <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-lg">
                  <SceneArt motif={it.motif} className="h-full w-full" rounded="rounded-none" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <PlayCircleIcon className="size-5 text-white/90" />
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-white">{it.title}</p>
                  <p className="truncate text-[11px] text-white/50">{it.speaker}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 心愿墙 */}
      <div className="mt-12">
        <div className="mb-5 flex items-center justify-center gap-2 text-center">
          <HeartIcon className="size-4 text-[var(--brand-orange)]" fill="currentColor" />
          <h3 className="text-lg font-bold text-white">火凤心愿墙</h3>
          <span className="text-xs text-white/45">滚动的成长心愿 · 悬停暂停</span>
        </div>
        <div className="space-y-4">
          {rows.map((row, ri) => (
            <MarqueeRow
              key={ri}
              items={row}
              durationSec={[64, 78, 58][ri]}
              reverse={ri === 1}
              renderItem={(w, i) => <WishNote wish={w} rotate={rotations[(ri * 2 + i) % rotations.length]} />}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
