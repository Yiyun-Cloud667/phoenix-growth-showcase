"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { ActivityIcon, UsersIcon, UserIcon, LayersIcon, ChevronRightIcon } from "lucide-react";
import {
  MEMBERS,
  TEAMS,
  CHECKUP_STATIONS,
  DISC_META,
  discDistribution,
  membersOfTeam,
  teamById,
  OVERVIEW,
} from "@/lib/data";
import type { Member } from "@/lib/types";
import { SectionShell } from "@/components/site/section-shell";
import { Modal } from "@/components/ui-bits/modal";
import { ClientOnly } from "@/components/charts/client-only";
import { cn } from "@/lib/utils";

const DISC_ORDER = ["D", "I", "S", "C"] as const;
const DISC_COLOR: Record<string, string> = {
  D: "var(--disc-d)",
  I: "var(--disc-i)",
  S: "var(--disc-s)",
  C: "var(--disc-c)",
};
type Level = "class" | "team" | "person";
const STATION_KEYS = ["culture", "scenario", "nest", "mindmap"] as const;

function stationAvg(key: "nest" | "culture" | "mindmap" | "scenario") {
  return Math.round(MEMBERS.reduce((s, m) => s + m.checkup[key], 0) / MEMBERS.length);
}
function teamCheckup(teamId: string) {
  const ms = membersOfTeam(teamId);
  const avg = (k: "nest" | "culture" | "mindmap" | "scenario") =>
    Math.round((ms.reduce((s, m) => s + m.checkup[k], 0) / ms.length) * 10) / 10;
  const total = Math.round(ms.reduce((s, m) => s + m.checkup.total, 0) / ms.length);
  return { culture: avg("culture"), scenario: avg("scenario"), nest: avg("nest"), mindmap: avg("mindmap"), total };
}

export function CheckupSection() {
  const [level, setLevel] = useState<Level>("class");
  const [member, setMember] = useState<Member | null>(null);
  const [teamModal, setTeamModal] = useState<string | null>(null);

  const best = [...MEMBERS].sort((a, b) => b.checkup.total - a.checkup.total)[0];
  const dist = discDistribution();
  const topDisc = DISC_ORDER.reduce((a, b) => (dist[b] > dist[a] ? b : a), "D" as (typeof DISC_ORDER)[number]);

  const LEVELS: { key: Level; label: string; icon: typeof UsersIcon }[] = [
    { key: "class", label: "班级总览", icon: LayersIcon },
    { key: "team", label: "小组评分", icon: UsersIcon },
    { key: "person", label: "个人成绩", icon: UserIcon },
  ];

  return (
    <SectionShell
      id="checkup"
      index="04"
      kicker="GROWTH CHECK-UP"
      title="成长体检中心"
      desc="以游戏化、任务化方式完成综合验收。总分 100 分(文化应知应会 30 · 情境 30 · 火凤筑巢 20 · 学习思维导图 20),另附 DISC 行为风格(不计分),并可下钻到班级 / 小组 / 个人三级。"
      tone="dark"
      firstSection
    >
      {/* 顶部 KPI */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "班级平均总分", value: OVERVIEW.avgCheckup, suffix: "/100", accent: "text-[var(--brand-gold)]" },
          { label: "体检完成率", value: 100, suffix: "%", accent: "text-[var(--brand-orange)]" },
          { label: "最高个人分", value: best.checkup.total, suffix: "/100", accent: "text-white" },
          { label: "主导行为风格", value: `${topDisc} 型`, suffix: DISC_META[topDisc].name.split(" ")[0], accent: "text-white" },
        ].map((k) => (
          <div key={k.label} className="rounded-2xl bg-white/[.05] p-4 ring-1 ring-white/10">
            <p className="text-xs text-white/55">{k.label}</p>
            <p className={cn("big-num mt-1 text-3xl", k.accent)}>{k.value}</p>
            <p className="text-[11px] text-white/40">{k.suffix}</p>
          </div>
        ))}
      </div>

      {/* 三级切换 */}
      <div className="mb-8 inline-flex rounded-full bg-white/[.06] p-1 ring-1 ring-white/10">
        {LEVELS.map((l) => {
          const Icon = l.icon;
          const on = level === l.key;
          return (
            <button
              key={l.key}
              type="button"
              onClick={() => setLevel(l.key)}
              className={cn(
                "relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                on ? "text-white" : "text-white/55 hover:text-white/80"
              )}
            >
              {on && <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-gold)]" />}
              <Icon className="relative size-4" />
              <span className="relative">{l.label}</span>
            </button>
          );
        })}
      </div>

      {level === "class" && <ClassView dist={dist} />}
      {level === "team" && <TeamView onPick={setTeamModal} />}
      {level === "person" && <PersonView onPick={setMember} />}

      {teamModal && (
        <CheckupTeamModal
          teamId={teamModal}
          onClose={() => setTeamModal(null)}
          onPickMember={(m) => setMember(m)}
        />
      )}
      {/* 成员明细:叠加在小组弹窗之上,关闭后退回小组成员界面 */}
      {member && <CheckupModal member={member} onClose={() => setMember(null)} />}
    </SectionShell>
  );
}

/* ---------------- 班级总览 ---------------- */
function ClassView({ dist }: { dist: Record<string, number> }) {
  const discData = DISC_ORDER.map((d) => ({ name: d, value: dist[d], color: DISC_COLOR[d] }));
  // 四项体检维度(班级均分,按各自满分归一化到 0-100 以便雷达对比)
  const stationData = CHECKUP_STATIONS.map((st) => {
    const raw = stationAvg(st.key);
    return { name: st.name, value: Math.round((raw / st.max) * 100), raw, max: st.max };
  });

  return (
    <div className="rise-in space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* DISC */}
        <div className="lg:col-span-5">
          <div className="h-full rounded-2xl bg-white/[.04] p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-2">
              <ActivityIcon className="size-5 text-[var(--brand-gold)]" />
              <h3 className="text-lg font-bold text-white">班级 DISC 行为画像</h3>
            </div>
            <p className="mt-0.5 text-xs text-white/50">不计分 · 了解团队行为风格构成</p>
            <div className="mt-3 grid grid-cols-2 items-center gap-4">
              <div className="h-40">
                <ClientOnly fallback={<div className="h-full w-full animate-pulse rounded-full bg-white/5" />}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={discData} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="92%" paddingAngle={3} strokeWidth={0}>
                        {discData.map((d) => (
                          <Cell key={d.name} fill={d.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v, n) => [`${v} 人`, `${n}型`]} contentStyle={{ borderRadius: 10, border: "none", fontSize: 12, background: "#0B1F3A", color: "#fff" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </ClientOnly>
              </div>
              <div className="space-y-2">
                {DISC_ORDER.map((d) => (
                  <div key={d} className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white" style={{ background: DISC_COLOR[d] }}>{d}</span>
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-white">{DISC_META[d].name.split(" ")[0]}</p>
                      <p className="truncate text-[10px] text-white/45">{DISC_META[d].trait}</p>
                    </div>
                    <span className="tnum ml-auto text-sm font-bold text-[var(--brand-gold)]">{dist[d]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 四项体检维度雷达 */}
        <div className="lg:col-span-7">
          <div className="h-full rounded-2xl bg-white/[.04] p-6 ring-1 ring-white/10">
            <h3 className="text-lg font-bold text-white">四项体检维度 · 班级总览</h3>
            <p className="mt-0.5 text-xs text-white/50">文化应知应会 30 · 情境 30 · 火凤筑巢 20 · 学习思维导图 20 · 满分 100</p>
            <div className="mt-2 h-64">
              <ClientOnly fallback={<div className="h-full w-full animate-pulse rounded-lg bg-white/5" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={stationData} outerRadius="70%">
                    <PolarGrid stroke="rgba(255,255,255,.15)" />
                    <PolarAngleAxis dataKey="name" tick={{ fill: "rgba(255,255,255,.75)", fontSize: 12 }} />
                    <Radar dataKey="value" stroke="#F28C28" fill="#F28C28" fillOpacity={0.35} />
                    <Tooltip
                      formatter={(_v, _n, p) => {
                        const d = (p as { payload?: { raw?: number; max?: number } })?.payload;
                        return [`${d?.raw ?? ""} / ${d?.max ?? ""} 分`, "班级均分"];
                      }}
                      contentStyle={{ borderRadius: 10, border: "none", fontSize: 12, background: "#0B1F3A", color: "#fff" }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>

      {/* 各站平均分 */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CHECKUP_STATIONS.map((st) => {
          const avg = stationAvg(st.key);
          return (
            <div key={st.key} className="rounded-2xl bg-white/[.04] p-5 ring-1 ring-white/10">
              <p className="text-[13px] font-semibold text-white">{st.name}</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="big-num text-3xl text-[var(--brand-gold)]">{avg}</span>
                <span className="text-xs text-white/40">/ {st.max}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full rounded-full bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-gold)]" style={{ width: `${(avg / st.max) * 100}%` }} />
              </div>
              <p className="mt-2 text-[10px] leading-snug text-white/45">{st.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- 小组评分 ---------------- */
const MEDAL = ["#D6A94B", "#B9C2CE", "#C58A5B"];

function TeamView({ onPick }: { onPick: (teamId: string) => void }) {
  const rows = TEAMS.map((t) => ({ team: t, ...teamCheckup(t.id) })).sort((a, b) => b.total - a.total);
  return (
    <div className="rise-in overflow-hidden rounded-2xl bg-white/[.04] ring-1 ring-white/10">
      {/* 表头 */}
      <div className="grid grid-cols-[44px_1.4fr_repeat(4,1fr)_1.3fr_28px] items-center gap-2 border-b border-white/10 px-4 py-3 text-[11px] font-semibold tracking-wide text-white/45 sm:px-5">
        <span>排名</span>
        <span>小组</span>
        <span className="text-center">文化·30</span>
        <span className="text-center">情境·30</span>
        <span className="text-center">筑巢·20</span>
        <span className="text-center">导图·20</span>
        <span className="text-right">总分·100</span>
        <span />
      </div>
      {rows.map((r, i) => (
        <button
          key={r.team.id}
          type="button"
          onClick={() => onPick(r.team.id)}
          className="grid w-full grid-cols-[44px_1.4fr_repeat(4,1fr)_1.3fr_28px] items-center gap-2 border-b border-white/[.06] px-4 py-3 text-left transition-colors last:border-0 hover:bg-white/[.06] sm:px-5"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold" style={{ background: i < 3 ? MEDAL[i] : "rgba(255,255,255,.08)", color: i < 3 ? "#0B1F3A" : "rgba(255,255,255,.6)" }}>
            {i + 1}
          </span>
          <span className="flex items-center gap-2 truncate">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: r.team.color }} />
            <span className="truncate text-sm font-semibold text-white">{r.team.name}</span>
          </span>
          <span className="tnum text-center text-sm text-white/80">{r.culture}</span>
          <span className="tnum text-center text-sm text-white/80">{r.scenario}</span>
          <span className="tnum text-center text-sm text-white/80">{r.nest}</span>
          <span className="tnum text-center text-sm text-white/80">{r.mindmap}</span>
          <span className="flex items-center justify-end gap-2">
            <span className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-white/10 sm:block">
              <span className="block h-full rounded-full" style={{ width: `${r.total}%`, background: r.team.color }} />
            </span>
            <span className="tnum w-9 text-right text-base font-bold text-[var(--brand-gold)]">{r.total}</span>
          </span>
          <ChevronRightIcon className="size-4 justify-self-end text-white/35" />
        </button>
      ))}
      <p className="px-5 py-3 text-[11px] text-white/40">小组得分为组内成员平均；点击任一小组查看组内成员得分。</p>
    </div>
  );
}

/* 小组下钻:组内成员得分 */
function CheckupTeamModal({ teamId, onClose, onPickMember }: { teamId: string; onClose: () => void; onPickMember: (m: Member) => void }) {
  const team = teamById(teamId);
  const ms = [...membersOfTeam(teamId)].sort((a, b) => b.checkup.total - a.checkup.total);
  const tc = teamCheckup(teamId);
  const rank = [...TEAMS].map((t) => ({ id: t.id, total: teamCheckup(t.id).total })).sort((a, b) => b.total - a.total).findIndex((x) => x.id === teamId) + 1;

  return (
    <Modal open onClose={onClose} className="max-w-lg">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl text-base font-bold text-white" style={{ background: team.color }}>{team.no}</span>
          <div>
            <h3 className="text-xl font-bold text-[var(--brand-navy-deep)]">{team.name}</h3>
            <p className="text-xs text-foreground/55">{team.topic}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="big-num text-2xl text-[var(--brand-orange)]">{tc.total}</p>
            <p className="text-[11px] text-foreground/45">组均分 · 第 {rank} 名</p>
          </div>
        </div>

        {/* 小组各站均分 */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {CHECKUP_STATIONS.map((st) => (
            <div key={st.key} className="rounded-lg bg-secondary p-2 text-center ring-1 ring-foreground/8">
              <p className="text-[10px] text-foreground/50">{st.name}</p>
              <p className="tnum mt-0.5 text-sm font-bold text-[var(--brand-navy)]">
                {tc[st.key]}<span className="text-[10px] font-normal text-foreground/40">/{st.max}</span>
              </p>
            </div>
          ))}
        </div>

        {/* 组内成员 */}
        <p className="mt-5 mb-2 text-xs font-semibold tracking-wide text-foreground/50">组内成员得分(点击查看明细)</p>
        <div className="space-y-2">
          {ms.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onPickMember(m)}
              className="flex w-full items-center gap-3 rounded-xl bg-secondary p-3 text-left ring-1 ring-foreground/8 transition-colors hover:bg-foreground/[.06]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: team.color }}>{m.name[0]}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[var(--brand-navy-deep)]">
                  {m.name}
                  {i === 0 && <span className="ml-2 rounded bg-[var(--brand-gold)]/15 px-1.5 py-0.5 text-[10px] font-medium text-[var(--brand-gold)]">组内最高</span>}
                </p>
                <p className="text-[11px] text-foreground/50">{m.role} · 文化{m.checkup.culture} 情境{m.checkup.scenario} 筑巢{m.checkup.nest} 导图{m.checkup.mindmap}</p>
              </div>
              <span className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded text-[9px] font-bold text-white" style={{ background: DISC_COLOR[m.checkup.disc] }}>{m.checkup.disc}</span>
                <span className="tnum text-base font-bold text-[var(--brand-orange)]">{m.checkup.total}</span>
                <ChevronRightIcon className="size-4 text-foreground/30" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}

/* ---------------- 个人成绩 ---------------- */
function PersonView({ onPick }: { onPick: (m: Member) => void }) {
  const rows = TEAMS.flatMap((t) => membersOfTeam(t.id)).sort((a, b) => b.checkup.total - a.checkup.total);
  return (
    <div className="rise-in overflow-hidden rounded-2xl bg-white/[.04] ring-1 ring-white/10">
      <div className="grid grid-cols-[40px_1.2fr_1fr_repeat(4,0.8fr)_1fr_56px] items-center gap-2 border-b border-white/10 px-4 py-3 text-[11px] font-semibold tracking-wide text-white/45 sm:px-5">
        <span>#</span>
        <span>学员</span>
        <span>小组</span>
        <span className="text-center">文化</span>
        <span className="text-center">情境</span>
        <span className="text-center">筑巢</span>
        <span className="text-center">导图</span>
        <span className="text-right">总分</span>
        <span className="text-center">风格</span>
      </div>
      {rows.map((m, i) => {
        const team = teamById(m.teamId);
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onPick(m)}
            className="grid w-full grid-cols-[40px_1.2fr_1fr_repeat(4,0.8fr)_1fr_56px] items-center gap-2 border-b border-white/[.06] px-4 py-3 text-left transition-colors last:border-0 hover:bg-white/[.05] sm:px-5"
          >
            <span className="tnum text-xs text-white/40">{i + 1}</span>
            <span className="flex items-center gap-2 truncate">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: team.color }}>{m.name[0]}</span>
              <span className="truncate text-sm font-semibold text-white">{m.name}</span>
            </span>
            <span className="truncate text-xs text-white/55">{team.name}</span>
            <span className="tnum text-center text-sm text-white/80">{m.checkup.culture}</span>
            <span className="tnum text-center text-sm text-white/80">{m.checkup.scenario}</span>
            <span className="tnum text-center text-sm text-white/80">{m.checkup.nest}</span>
            <span className="tnum text-center text-sm text-white/80">{m.checkup.mindmap}</span>
            <span className="tnum text-right text-base font-bold text-[var(--brand-gold)]">{m.checkup.total}</span>
            <span className="flex justify-center">
              <span className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold text-white" style={{ background: DISC_COLOR[m.checkup.disc] }}>{m.checkup.disc}</span>
            </span>
          </button>
        );
      })}
      <p className="px-5 py-3 text-[11px] text-white/40">点击任一学员查看成绩构成与行为风格 · 共 {rows.length} 人</p>
    </div>
  );
}

/* ---------------- 个人明细弹窗 ---------------- */
function CheckupModal({ member, onClose }: { member: Member; onClose: () => void }) {
  const team = teamById(member.teamId);
  const c = member.checkup;
  const rows = CHECKUP_STATIONS.map((st) => ({ name: st.name, val: c[st.key], max: st.max }));
  const disc = DISC_META[c.disc];

  return (
    <Modal open onClose={onClose} className="max-w-md">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold text-white" style={{ background: team.color }}>{member.name[0]}</span>
          <div>
            <h3 className="text-xl font-bold text-[var(--brand-navy-deep)]">{member.name}</h3>
            <p className="text-xs text-foreground/55">{team.name} · {member.role}</p>
          </div>
          <div className="ml-auto flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              <svg width={72} height={72} className="-rotate-90">
                <circle cx={36} cy={36} r={32} fill="none" stroke="rgba(11,31,58,.1)" strokeWidth="6" />
                <circle cx={36} cy={36} r={32} fill="none" stroke={team.color} strokeWidth="6" strokeLinecap="round" strokeDasharray={2 * Math.PI * 32} strokeDashoffset={2 * Math.PI * 32 * (1 - c.total / 100)} />
              </svg>
              <div className="absolute text-center">
                <span className="big-num block text-lg text-[var(--brand-navy-deep)]">{c.total}</span>
                <span className="text-[9px] text-foreground/45">/100</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          {rows.map((r) => (
            <div key={r.name} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-[13px] text-foreground/70">{r.name}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-foreground/8">
                <span className="block h-full rounded-full bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-gold)]" style={{ width: `${(r.val / r.max) * 100}%` }} />
              </div>
              <span className="tnum w-12 shrink-0 text-right text-[13px] font-semibold text-[var(--brand-navy)]">{r.val}/{r.max}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl p-4 ring-1 ring-foreground/8" style={{ background: `color-mix(in oklab, ${disc.color} 10%, transparent)` }}>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white" style={{ background: disc.color }}>{c.disc}</span>
            <div>
              <p className="text-sm font-bold text-[var(--brand-navy-deep)]">{disc.name}</p>
              <p className="text-[11px] text-foreground/55">{disc.trait}</p>
            </div>
            <span className="ml-auto rounded-full bg-foreground/5 px-2 py-0.5 text-[10px] font-medium text-foreground/50">DISC · 不计分</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
