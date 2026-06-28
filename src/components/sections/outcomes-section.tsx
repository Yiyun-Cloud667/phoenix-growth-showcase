"use client";

import { useState } from "react";
import {
  PlayCircleIcon,
  PaletteIcon,
  BookOpenIcon,
  VideoIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  REVIEW_VIDEO,
  PAINTING_FRAGMENTS,
  SAPPHIRE,
  BRANDS,
  brandByKey,
  VLOGS,
  teamById,
} from "@/lib/data";
import type { SapphireEntry } from "@/lib/types";
import { SectionShell } from "@/components/site/section-shell";
import { VideoPlaceholder } from "@/components/media/video-placeholder";
import { MarqueeRow } from "@/components/media/marquee-row";
import { PaintingPanel } from "@/components/media/painting-panel";
import { BrandArt } from "@/components/media/brand-art";
import { SceneArt } from "@/components/media/scene-art";
import { Modal } from "@/components/ui-bits/modal";
import { cn } from "@/lib/utils";

/** 列表层:展示某一成果线的全部作品 */
type ListKind = "painting-all" | "sapphire-all" | "vlog-all";
/** 详情层:单个作品(叠加在列表层之上,关闭后退回列表) */
type Detail =
  | { kind: "fragment"; id: string }
  | { kind: "sapphire-team"; teamId: string }
  | { kind: "vlog"; id: string };

/** 统一媒体带高度(封面与滚动条等高) */
const BAND = "h-56";

/** 左侧封面卡(海报式,与右侧滚动条等高) */
function CoverCard({
  icon,
  label,
  title,
  hint,
  children,
  onClick,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  hint: string;
  children: React.ReactNode;
  onClick: () => void;
  accent: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("card-hover group relative block w-full overflow-hidden rounded-2xl text-left ring-1 ring-white/10", BAND)}
    >
      <div className="absolute inset-0">{children}</div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="mb-1 flex items-center gap-1.5" style={{ color: accent }}>
          {icon}
          <span className="kicker">{label}</span>
        </div>
        <p className="text-lg font-bold leading-snug text-white">{title}</p>
        <p className="mt-0.5 line-clamp-1 text-xs text-white/60">{hint}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--brand-gold)]">
          查看全部
          <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  );
}

/** 行:左封面(定宽) + 右滚动条(填充剩余),整体等高 */
function RowFrame({
  cover,
  children,
}: {
  cover: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
      <div className="lg:w-80 xl:w-[22rem] lg:shrink-0">{cover}</div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function OutcomesSection() {
  const [listView, setListView] = useState<ListKind | null>(null);
  const [detail, setDetail] = useState<Detail | null>(null);

  return (
    <SectionShell
      id="outcomes"
      index="02"
      kicker="OUTCOMES GALLERY"
      title="四项成果展示"
      desc="整体回顾视频、30 周年企业年画、成长蓝宝书与小组学习 Vlog —— 八天旅程沉淀下来的可展示、可传播、可留存的成果资产。"
      tone="dark"
      firstSection
    >
      {/* 回顾视频 */}
      <div className="mb-12">
        <VideoPlaceholder
          motif={REVIEW_VIDEO.poster}
          title={REVIEW_VIDEO.title}
          subtitle={REVIEW_VIDEO.subtitle}
          duration={REVIEW_VIDEO.duration}
          autoplay
          className="shadow-2xl shadow-[var(--brand-navy)]/20"
        />
      </div>

      <div className="space-y-12">
        {/* 行一:企业年画 */}
        <RowFrame
          cover={
            <CoverCard
              icon={<PaletteIcon className="size-3.5" />}
              label="ENTERPRISE PAINTING"
              title="30 周年企业年画"
              hint="8 个小组各画一块,拼成完整画作。点击查看完整画作与每块解读。"
              accent="#F28C28"
              onClick={() => setListView("painting-all")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/painting/full.png" alt="30 周年企业年画 · 完整画作" className="h-full w-full bg-white object-cover" />
            </CoverCard>
          }
        >
          <MarqueeRow
            items={PAINTING_FRAGMENTS}
            durationSec={48}
            itemClassName="w-44"
            renderItem={(f) => (
              <button
                type="button"
                onClick={() => setDetail({ kind: "fragment", id: f.id })}
                className={cn("card-hover block w-44 overflow-hidden rounded-xl ring-1 ring-white/10", BAND)}
              >
                <PaintingPanel fragment={f} className="h-full w-full" />
              </button>
            )}
          />
          <p className="mt-3 text-center text-xs text-white/45">← 自动滚动 · 每块由一个小组绘制 · 点击查看该块解读 →</p>
        </RowFrame>

        {/* 行二:成长蓝宝书 */}
        <RowFrame
          cover={
            <CoverCard
              icon={<BookOpenIcon className="size-3.5" />}
              label="SAPPHIRE BOOK"
              title="火凤成长蓝宝书"
              hint="4 主品牌 · 8 组课题 · 入职前的品牌行动指南"
              accent="#1B4F8A"
              onClick={() => setListView("sapphire-all")}
            >
              <div className="relative h-full w-full bg-gradient-to-br from-[var(--brand-navy)] to-[var(--brand-navy-deep)]">
                <div className="absolute inset-0 brand-glow" />
                <BookOpenIcon className="absolute right-3 top-3 size-7 text-[var(--brand-gold)]/70" />
                <div className="absolute left-4 top-4 flex flex-col gap-1">
                  {BRANDS.map((b) => (
                    <span key={b.key} className="w-fit rounded px-1.5 py-0.5 text-[9px] font-semibold text-white" style={{ background: b.color }}>
                      {b.name}
                    </span>
                  ))}
                </div>
              </div>
            </CoverCard>
          }
        >
          <MarqueeRow
            items={SAPPHIRE}
            durationSec={52}
            reverse
            itemClassName="w-72"
            renderItem={(e) => {
              const team = teamById(e.teamId);
              const brand = brandByKey(e.brand);
              return (
                <button
                  type="button"
                  onClick={() => setDetail({ kind: "sapphire-team", teamId: e.teamId })}
                  className={cn("card-hover flex w-72 flex-col overflow-hidden rounded-xl bg-white/[.05] text-left ring-1 ring-white/10", BAND)}
                >
                  <div className="relative h-24 w-full shrink-0">
                    <BrandArt brand={e.brand} en={brand.en} showLabel={false} className="h-full w-full" rounded="rounded-none" />
                    <span className="absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: brand.color }}>
                      {brand.name}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: team.color }} />
                      <span className="text-[12px] font-semibold text-white">{team.name}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 flex-1 text-sm font-bold text-white/90">{e.topic}</p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="truncate text-[11px] text-white/45">参考 · {e.direction}</span>
                      <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-[var(--brand-gold)]">{e.pages.length} 页</span>
                    </div>
                  </div>
                </button>
              );
            }}
          />
          <p className="mt-3 text-center text-xs text-white/45">← 4 主品牌 · 每品牌 2 组各自选题 · 点击翻阅 6 页课题汇报 →</p>
        </RowFrame>

        {/* 行三:学习 Vlog */}
        <RowFrame
          cover={
            <CoverCard
              icon={<VideoIcon className="size-3.5" />}
              label="LEARNING VLOG"
              title="小组学习 Vlog"
              hint="8 个小组的影像学习成果。点击查看全部 Vlog。"
              accent="#C0492B"
              onClick={() => setListView("vlog-all")}
            >
              <SceneArt motif="ceremony" className="h-full w-full" rounded="rounded-none" />
              <span className="absolute inset-0 flex items-center justify-center">
                <PlayCircleIcon className="size-12 text-white/90 drop-shadow" />
              </span>
            </CoverCard>
          }
        >
          <MarqueeRow
            items={VLOGS}
            durationSec={46}
            itemClassName="w-80"
            renderItem={(v) => {
              const team = teamById(v.teamId);
              return (
                <button
                  type="button"
                  onClick={() => setDetail({ kind: "vlog", id: v.id })}
                  className={cn("card-hover flex w-80 flex-col overflow-hidden rounded-xl bg-white/[.05] text-left ring-1 ring-white/10", BAND)}
                >
                  <div className="relative w-full flex-1">
                    <SceneArt motif={v.motif} className="h-full w-full" rounded="rounded-none" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <PlayCircleIcon className="size-10 text-white/90 drop-shadow" />
                    </span>
                    <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white tnum">{v.duration}</span>
                  </div>
                  <div className="shrink-0 p-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: team.color }} />
                      <span className="text-[11px] text-white/55">{team.name}</span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm font-bold text-white">{v.title}</p>
                  </div>
                </button>
              );
            }}
          />
          <p className="mt-3 text-center text-xs text-white/45">← 自动滚动 · 点击播放小组 Vlog →</p>
        </RowFrame>
      </div>

      {/* ===== 模态层:列表层 + 叠加的详情层 ===== */}
      <OutcomeModals
        listView={listView}
        detail={detail}
        setListView={setListView}
        setDetail={setDetail}
      />
    </SectionShell>
  );
}

function OutcomeModals({
  listView,
  detail,
  setListView,
  setDetail,
}: {
  listView: ListKind | null;
  detail: Detail | null;
  setListView: (v: ListKind | null) => void;
  setDetail: (v: Detail | null) => void;
}) {
  const closeList = () => setListView(null);
  const closeDetail = () => setDetail(null);

  const fragment = detail?.kind === "fragment" ? PAINTING_FRAGMENTS.find((x) => x.id === detail.id)! : null;
  const sapphireTeam = detail?.kind === "sapphire-team" ? SAPPHIRE.find((x) => x.teamId === detail.teamId)! : null;
  const vlog = detail?.kind === "vlog" ? VLOGS.find((x) => x.id === detail.id)! : null;

  return (
    <>
      {/* ===== 列表层:全部作品 ===== */}
      {listView === "painting-all" && (
        <Modal open onClose={closeList} className="max-w-4xl">
          <div className="p-6">
            <span className="kicker text-[var(--brand-orange)]">ENTERPRISE PAINTING · 完整画作</span>
            <h3 className="mt-1 text-xl font-bold text-[var(--brand-navy-deep)]">报喜鸟 30 周年企业年画</h3>
            <p className="mt-1 text-sm text-foreground/55">8 个小组各绘一段,上四下四拼成完整 30 周年画作。点击任意一段查看解读。</p>
            <div className="mt-4 grid grid-cols-4 overflow-hidden rounded-xl ring-1 ring-foreground/10">
              {PAINTING_FRAGMENTS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setDetail({ kind: "fragment", id: f.id })}
                  className="group relative aspect-[536/758]"
                >
                  <PaintingPanel fragment={f} showLabel={false} className="h-full w-full" />
                  <span className="absolute inset-0 bg-[var(--brand-orange)]/0 transition-colors group-hover:bg-[var(--brand-orange)]/12" />
                  <span className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/35 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {f.index}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/75 to-transparent px-2 pb-1.5 pt-6 text-[11px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {f.title}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-foreground/45">上 4 · 下 4 拼成完整画作 · 每组负责一段 · 悬停查看 · 点击看解读</p>
          </div>
        </Modal>
      )}

      {listView === "sapphire-all" && (
        <Modal open onClose={closeList} className="max-w-3xl">
          <div className="p-6">
            <span className="kicker text-[var(--brand-navy)]">SAPPHIRE BOOK · 蓝宝书</span>
            <h3 className="mt-1 text-xl font-bold text-[var(--brand-navy-deep)]">4 主品牌 · 8 组课题</h3>
            <p className="mt-1 text-sm leading-relaxed text-foreground/55">
              每个主品牌由 2 个小组各自独立选题(围绕品牌服饰展开),最终汇集成入职前为各品牌写下的《行动指南》。点击任一课题翻阅其 6 页汇报。
            </p>
            <div className="mt-4 space-y-3">
              {BRANDS.map((b) => {
                const entries = SAPPHIRE.filter((e) => e.brand === b.key);
                return (
                  <div key={b.key} className="overflow-hidden rounded-xl ring-1 ring-foreground/8">
                    <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: `color-mix(in oklab, ${b.color} 14%, transparent)` }}>
                      <span className="flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-bold text-white" style={{ background: b.color }}>{b.name[0]}</span>
                      <span className="text-sm font-bold text-[var(--brand-navy-deep)]">{b.name}</span>
                      <span className="truncate text-[11px] text-foreground/45">{b.en} · {b.tagline}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5 p-3 sm:grid-cols-2">
                      {entries.map((e) => {
                        const team = teamById(e.teamId);
                        return (
                          <button key={e.teamId} type="button" onClick={() => setDetail({ kind: "sapphire-team", teamId: e.teamId })} className="card-hover rounded-lg bg-secondary p-3 text-left ring-1 ring-foreground/8">
                            <div className="flex items-center gap-1.5">
                              <span className="h-2.5 w-2.5 rounded-full" style={{ background: team.color }} />
                              <span className="text-[12px] font-semibold text-[var(--brand-navy-deep)]">{team.name}</span>
                              <span className="ml-auto rounded-full bg-foreground/8 px-1.5 py-0.5 text-[10px] text-foreground/50">{e.pages.length} 页</span>
                            </div>
                            <p className="mt-1 text-[13px] font-medium text-foreground/80">{e.topic}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      )}

      {listView === "vlog-all" && (
        <Modal open onClose={closeList} className="max-w-3xl">
          <div className="p-6">
            <span className="kicker text-[var(--brand-orange)]">LEARNING VLOG</span>
            <h3 className="mt-1 text-xl font-bold text-[var(--brand-navy-deep)]">8 个小组学习 Vlog</h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {VLOGS.map((v) => {
                const team = teamById(v.teamId);
                return (
                  <button key={v.id} type="button" onClick={() => setDetail({ kind: "vlog", id: v.id })} className="card-hover overflow-hidden rounded-xl bg-secondary text-left ring-1 ring-foreground/8">
                    <div className="relative aspect-video w-full">
                      <SceneArt motif={v.motif} className="h-full w-full" rounded="rounded-none" />
                      <span className="absolute inset-0 flex items-center justify-center"><PlayCircleIcon className="size-9 text-white/90" /></span>
                    </div>
                    <div className="p-3">
                      <span className="text-[11px] text-foreground/50">{team.name}</span>
                      <p className="line-clamp-1 text-sm font-bold text-[var(--brand-navy-deep)]">{v.title}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Modal>
      )}

      {/* ===== 详情层:单个作品(叠加在列表层之上,关闭后退回列表) ===== */}
      {fragment && (
        <Modal open onClose={closeDetail} className="max-w-md">
          <div className="flex items-center justify-center rounded-t-2xl bg-white p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/painting/tile-${fragment.index}.png`} alt={fragment.title} className="max-h-[42vh] w-auto object-contain" />
          </div>
          <div className="p-6">
            <span className="kicker text-[var(--brand-orange)]">{fragment.seg}</span>
            <h3 className="mt-1 text-xl font-bold text-[var(--brand-navy-deep)]">{fragment.title}</h3>
            <div className="mt-2 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white" style={{ background: teamById(fragment.teamId).color }}>{teamById(fragment.teamId).no}</span>
              <span className="text-xs text-foreground/55">由 {fragment.teamName} 绘制 · 拼图第 {fragment.index} 块 / 共 8 块</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/75">{fragment.text}</p>
            {listView !== "painting-all" && (
              <button type="button" onClick={() => { setDetail(null); setListView("painting-all"); }} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-orange)]">
                查看完整画作 <ArrowRightIcon className="size-3.5" />
              </button>
            )}
          </div>
        </Modal>
      )}

      {sapphireTeam && (
        <Modal open onClose={closeDetail} className="max-w-2xl">
          <SapphireReport entry={sapphireTeam} />
        </Modal>
      )}

      {vlog && (
        <Modal open onClose={closeDetail} className="max-w-2xl">
          <div className="p-5">
            <VideoPlaceholder motif={vlog.motif} title={vlog.title} subtitle={`${teamById(vlog.teamId).name} · 学习 Vlog`} duration={vlog.duration} />
            <div className="mt-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: teamById(vlog.teamId).color }} />
              <span className="text-sm font-semibold text-foreground/70">{teamById(vlog.teamId).name}</span>
              <span className="text-xs text-foreground/40">· {teamById(vlog.teamId).topic}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">{vlog.intro}</p>
          </div>
        </Modal>
      )}
    </>
  );
}

/** 蓝宝书课题汇报:6 页(A5/PPT)翻阅器 */
function SapphireReport({ entry }: { entry: SapphireEntry }) {
  const [i, setI] = useState(0);
  const team = teamById(entry.teamId);
  const brand = brandByKey(entry.brand);
  const n = entry.pages.length;
  const page = entry.pages[i];
  const isCover = page.kind === "封面";

  return (
    <div className="p-6">
      {/* 页眉:品牌 + 小组 + 页码 */}
      <div className="flex items-center gap-2">
        <span className="rounded-md px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: brand.color }}>{brand.name}</span>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: team.color }} />
        <span className="text-sm font-semibold text-foreground/70">{team.name}</span>
        <span className="tnum ml-auto text-xs text-foreground/45">{i + 1} / {n}</span>
      </div>
      <p className="mt-2 text-[11px] text-foreground/45">课题 · {entry.topic}　|　参考方向 · {entry.direction}</p>

      {/* A5/PPT 页面 */}
      <div key={i} className="rise-in mt-3 overflow-hidden rounded-xl ring-1 ring-foreground/10">
        <div className="h-1.5 w-full" style={{ background: brand.color }} />
        <div className="relative min-h-[240px] bg-white p-6" style={{ borderLeft: `3px solid ${brand.color}` }}>
          <span className="big-num pointer-events-none absolute right-4 top-2 text-6xl text-foreground/[0.05]">
            {String(page.no).padStart(2, "0")}
          </span>
          {isCover ? (
            <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
              <span className="text-[11px] font-semibold tracking-[0.28em]" style={{ color: brand.color }}>{brand.en}</span>
              <h3 className="mt-3 text-2xl font-bold leading-snug text-[var(--brand-navy-deep)]">{entry.topic}</h3>
              <p className="mt-3 max-w-md text-sm text-foreground/60">{page.body}</p>
              <p className="mt-4 text-[11px] text-foreground/40">{team.name} · 蓝宝书课题汇报 · 共 {n} 页</p>
            </div>
          ) : (
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white" style={{ background: brand.color }}>
                {String(page.no).padStart(2, "0")} · {page.kind}
              </span>
              <p className="mt-3 text-lg font-bold text-[var(--brand-navy-deep)]">{page.title}</p>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-foreground/75">{page.body}</p>
            </div>
          )}
          <span className="absolute bottom-3 right-4 text-[10px] tracking-wide text-foreground/30">A5 · 第 {page.no} 页</span>
        </div>
      </div>

      {/* 翻页 */}
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={i === 0}
          className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-[13px] font-medium text-foreground/70 ring-1 ring-foreground/10 transition disabled:opacity-35"
        >
          <ChevronLeftIcon className="size-4" /> 上一页
        </button>
        <div className="flex items-center gap-1.5">
          {entry.pages.map((p, idx) => (
            <button
              key={p.no}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`第 ${p.no} 页`}
              className={cn("h-1.5 rounded-full transition-all", idx === i ? "w-5" : "w-1.5 bg-foreground/20 hover:bg-foreground/40")}
              style={idx === i ? { background: brand.color } : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setI((v) => Math.min(n - 1, v + 1))}
          disabled={i === n - 1}
          className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-[13px] font-medium text-foreground/70 ring-1 ring-foreground/10 transition disabled:opacity-35"
        >
          下一页 <ChevronRightIcon className="size-4" />
        </button>
      </div>
      <p className="mt-3 text-center text-[11px] text-foreground/40">《火凤成长蓝宝书》· {brand.name} · {team.name} 课题汇报</p>
    </div>
  );
}
