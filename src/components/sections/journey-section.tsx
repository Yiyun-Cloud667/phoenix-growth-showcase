"use client";

import { useState } from "react";
import { SparklesIcon, SunIcon, CompassIcon } from "lucide-react";
import { JOURNEY } from "@/lib/data";
import { SectionShell } from "@/components/site/section-shell";
import { PhotoCarousel } from "@/components/media/photo-carousel";
import { cn } from "@/lib/utils";

function CourseCard({
  tag,
  time,
  title,
  desc,
  place,
  accent,
}: {
  tag: string;
  time: string;
  title: string;
  desc: string;
  place?: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl bg-white/[.05] p-4 ring-1 ring-white/10 transition-colors hover:bg-white/[.08]">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span
          className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white"
          style={{ background: accent }}
        >
          {tag}
        </span>
        <span className="tnum text-[11px] text-white/50">{time}</span>
      </div>
      <p className="text-[15px] font-semibold text-white">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-white/60">{desc}</p>
      {place && <p className="mt-2 text-[11px] tracking-wide text-[var(--brand-gold)]/80">📍 {place}</p>}
    </div>
  );
}

export function JourneySection() {
  const [active, setActive] = useState(0);
  const day = JOURNEY[active];

  return (
    <SectionShell
      id="journey"
      index="01"
      kicker="GROWTH JOURNEY"
      title="火凤八阶成长旅程"
      desc="从归巢入营到振翅发布,八天一条完整的火凤成长故事线。每一天都有清晰的阶段命题、课程设计与晚间共创。"
      tone="dark"
      firstSection
    >
      {/* 时间轴 stepper */}
      <div className="no-scrollbar -mx-2 mb-10 overflow-x-auto overflow-y-visible px-2 pb-3 pt-4">
        <div className="relative flex min-w-[760px] items-start justify-between gap-1">
          <div className="absolute left-0 right-0 top-[18px] h-0.5 bg-gradient-to-r from-[var(--brand-navy-soft)] via-[var(--brand-orange)] to-[var(--brand-gold)] opacity-40" />
          {JOURNEY.map((d, i) => {
            const on = i === active;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setActive(i)}
                className="group relative z-10 flex flex-1 flex-col items-center gap-2"
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ring-2 transition-all",
                    on
                      ? "scale-110 text-white ring-white/40"
                      : "bg-[var(--brand-navy-deep)] text-white/55 ring-white/15 group-hover:text-white/80"
                  )}
                  style={on ? { background: d.accent } : undefined}
                >
                  {d.day}
                </span>
                <span
                  className={cn(
                    "whitespace-nowrap text-[12px] font-medium transition-colors",
                    on ? "text-white" : "text-white/45 group-hover:text-white/70"
                  )}
                >
                  {d.stage}
                </span>
                <span className="text-[10px] tracking-wide text-white/30">Day {d.day}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 选中日详情 */}
      <div key={day.id} className="rise-in grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* 左:阶段命题 + 设计理由 */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl bg-white/[.04] p-6 ring-1 ring-white/10">
            <div
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-2xl"
              style={{ background: day.accent }}
            />
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="kicker text-[var(--brand-gold)]">{day.kicker}</span>
                <span className="text-white/30">·</span>
                <span className="text-xs text-white/50">{day.date}</span>
              </div>
              <h3 className="mt-3 text-2xl font-bold text-white">{day.title}</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {day.keywords.map((k) => (
                  <span key={k} className="rounded-full bg-white/8 px-2.5 py-0.5 text-[11px] text-white/70 ring-1 ring-white/10">
                    {k}
                  </span>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-[var(--brand-orange)]/10 p-4 ring-1 ring-[var(--brand-orange)]/20">
                <div className="mb-1.5 flex items-center gap-2 text-[var(--brand-orange)]">
                  <CompassIcon className="size-4" />
                  <span className="text-xs font-bold tracking-wide">为什么这样设计</span>
                </div>
                <p className="text-[13px] leading-relaxed text-white/75">{day.rationale}</p>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl bg-white/[.04] p-3 ring-1 ring-white/10">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: `${day.accent}33` }}>
                  <SparklesIcon className="size-5" style={{ color: day.accent }} />
                </span>
                <div>
                  <p className="text-[11px] text-white/45">本阶段命题</p>
                  <p className="text-sm font-semibold text-white">{day.stage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右:课程安排 + 晚间共创 */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <CourseCard tag="上午" time={day.morning.time} title={day.morning.title} desc={day.morning.desc} place={day.morning.place} accent={day.accent} />
            <CourseCard tag="下午" time={day.afternoon.time} title={day.afternoon.title} desc={day.afternoon.desc} place={day.afternoon.place} accent={day.accent} />
          </div>
          <div className="mt-3 rounded-xl bg-gradient-to-r from-white/[.07] to-white/[.02] p-4 ring-1 ring-white/10">
            <div className="mb-1.5 flex items-center gap-2">
              <SunIcon className="size-4 text-[var(--brand-gold)]" />
              <span className="rounded-full bg-[var(--brand-gold)]/20 px-2.5 py-0.5 text-[11px] font-semibold text-[var(--brand-gold)]">
                晚间共创
              </span>
              <span className="tnum text-[11px] text-white/45">{day.evening.time}</span>
            </div>
            <p className="text-[15px] font-semibold text-white">{day.evening.title}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-white/60">{day.evening.desc}</p>
          </div>
        </div>
      </div>

      {/* 当日照片墙 */}
      <div className="mt-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-4 w-1 rounded-full" style={{ background: day.accent }} />
          <span className="text-sm font-semibold text-white/85">当日影像</span>
          <span className="text-[11px] text-white/40">自动滚动 · 可手动滑动</span>
        </div>
        <PhotoCarousel key={day.id} photos={day.photos} />
      </div>
    </SectionShell>
  );
}
