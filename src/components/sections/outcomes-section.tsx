"use client";

import { useState } from "react";
import { PlayCircleIcon, PaletteIcon, BookOpenIcon, VideoIcon, ArrowRightIcon } from "lucide-react";
import {
  REVIEW_VIDEO,
  PAINTING_FRAGMENTS,
  SAPPHIRE,
  VLOGS,
  teamById,
} from "@/lib/data";
import type { SapphireCard } from "@/lib/types";
import { SectionShell } from "@/components/site/section-shell";
import { VideoPlaceholder } from "@/components/media/video-placeholder";
import { MarqueeRow } from "@/components/media/marquee-row";
import { PaintingPanel } from "@/components/media/painting-panel";
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

const KIND_COLOR: Record<SapphireCard["kind"], string> = {
  场景卡: "#1B4F8A",
  用户洞察卡: "#2E7D6B",
  问题定义卡: "#7A5BA6",
  创意方案卡: "#F28C28",
  内容种草卡: "#C0492B",
  行动落地卡: "#D6A94B",
};

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
              hint="8 组创新课题的成果卡集。点击查看全部课题与卡片。"
              accent="#1B4F8A"
              onClick={() => setListView("sapphire-all")}
            >
              <div className="relative h-full w-full bg-gradient-to-br from-[var(--brand-navy)] to-[var(--brand-navy-deep)]">
                <div className="absolute inset-0 brand-glow" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <BookOpenIcon className="size-8 text-[var(--brand-gold)]" />
                  <p className="mt-2 text-sm font-bold text-white">成长蓝宝书</p>
                  <p className="mt-0.5 text-[10px] tracking-[0.2em] text-[var(--brand-gold)]/80">8 课题 · 创新成果卡集</p>
                </div>
              </div>
            </CoverCard>
          }
        >
          <MarqueeRow
            items={SAPPHIRE}
            durationSec={50}
            reverse
            itemClassName="w-72"
            renderItem={(e) => {
              const team = teamById(e.teamId);
              return (
                <button
                  type="button"
                  onClick={() => setDetail({ kind: "sapphire-team", teamId: e.teamId })}
                  className={cn("card-hover flex w-72 flex-col overflow-hidden rounded-xl bg-white/[.05] p-4 text-left ring-1 ring-white/10", BAND)}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-bold text-white" style={{ background: team.color }}>
                      {team.no}
                    </span>
                    <span className="text-sm font-semibold text-white">{team.name}</span>
                  </div>
                  <p className="mt-2 line-clamp-1 text-sm font-bold text-white/90">{e.topic}</p>
                  <p className="mt-1 line-clamp-3 flex-1 text-xs leading-relaxed text-white/55">{e.cards[1].body}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {e.cards.map((c) => (
                      <span key={c.id} className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white" style={{ background: KIND_COLOR[c.kind] }}>
                        {c.kind}
                      </span>
                    ))}
                  </div>
                </button>
              );
            }}
          />
          <p className="mt-3 text-center text-xs text-white/45">← 每个小组一个课题 · 点击查看完整成果卡 →</p>
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
        <Modal open onClose={closeList} className="max-w-2xl">
          <div className="p-6">
            <span className="kicker text-[var(--brand-navy)]">SAPPHIRE BOOK</span>
            <h3 className="mt-1 text-xl font-bold text-[var(--brand-navy-deep)]">火凤成长蓝宝书 · 8 课题</h3>
            <p className="mt-1 text-sm text-foreground/55">点击任一课题查看小组完整成果卡。</p>
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {SAPPHIRE.map((e) => {
                const team = teamById(e.teamId);
                return (
                  <button key={e.teamId} type="button" onClick={() => setDetail({ kind: "sapphire-team", teamId: e.teamId })} className="card-hover rounded-xl bg-secondary p-3 text-left ring-1 ring-foreground/8">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-bold text-white" style={{ background: team.color }}>{team.no}</span>
                      <span className="text-sm font-semibold text-[var(--brand-navy-deep)]">{team.name}</span>
                    </div>
                    <p className="mt-1.5 text-[13px] font-medium text-foreground/80">{e.topic}</p>
                  </button>
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
        <Modal open onClose={closeDetail} className="max-w-lg">
          <div className="p-6">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white" style={{ background: teamById(sapphireTeam.teamId).color }}>{teamById(sapphireTeam.teamId).no}</span>
              <span className="text-sm font-semibold text-foreground/70">{teamById(sapphireTeam.teamId).name} · {teamById(sapphireTeam.teamId).en}</span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-[var(--brand-navy-deep)]">{sapphireTeam.topic}</h3>
            <div className="mt-4 space-y-3">
              {sapphireTeam.cards.map((c) => (
                <div key={c.id} className="rounded-xl bg-secondary p-4 ring-1 ring-foreground/8">
                  <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white" style={{ background: KIND_COLOR[c.kind] }}>{c.kind}</span>
                  <p className="mt-2 text-sm font-bold text-[var(--brand-navy-deep)]">{c.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-foreground/70">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
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
