"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
} from "recharts";
import { TrophyIcon, ChevronRightIcon } from "lucide-react";
import { TEAMS, MEMBERS, membersOfTeam, teamById } from "@/lib/data";
import type { Member, PointCategory } from "@/lib/types";
import { SectionShell } from "@/components/site/section-shell";
import { Modal } from "@/components/ui-bits/modal";
import { ClientOnly } from "@/components/charts/client-only";
import { cn } from "@/lib/utils";

const CAT_MAX: Record<PointCategory, number> = {
  纪律: 90,
  学习: 180,
  活动: 150,
  班级职务: 100,
};
const CATS: PointCategory[] = ["纪律", "学习", "活动", "班级职务"];
const MEDAL = ["#D6A94B", "#B9C2CE", "#C58A5B"];

export function PointsSection() {
  const [teamId, setTeamId] = useState(TEAMS[0].id);
  const [member, setMember] = useState<Member | null>(null);

  const teamsRanked = [...TEAMS].sort((a, b) => b.points - a.points);
  const maxTeam = teamsRanked[0].points;
  const selTeam = teamById(teamId);
  const teamMembers = [...membersOfTeam(teamId)].sort((a, b) => b.points - a.points);
  const maxMemberPts = Math.max(...MEMBERS.map((m) => m.points));

  return (
    <SectionShell
      id="points"
      index="03"
      kicker="GROWTH POINTS"
      title="火凤学习积分"
      desc="个人火凤值 + 小组火凤值的双轨积分。团队总榜、组内排名与个人积分明细,完整呈现八天的努力与贡献。"
      tone="dark"
      firstSection
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* 团队总榜 */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-white/[.04] p-6 ring-1 ring-white/10">
            <div className="mb-5 flex items-center gap-2">
              <TrophyIcon className="size-5 text-[var(--brand-gold)]" />
              <h3 className="text-lg font-bold text-white">团队学习积分总榜</h3>
            </div>
            <div className="space-y-2.5">
              {teamsRanked.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTeamId(t.id)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors",
                    t.id === teamId ? "bg-white/10 ring-1 ring-white/20" : "hover:bg-white/[.06]"
                  )}
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      background: i < 3 ? MEDAL[i] : "rgba(255,255,255,.08)",
                      color: i < 3 ? "#0B1F3A" : "rgba(255,255,255,.6)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-sm font-semibold text-white">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.color }} />
                        {t.name}
                        <span className="text-[11px] font-normal text-white/40">{t.topic}</span>
                      </span>
                      <span className="tnum shrink-0 text-sm font-bold text-[var(--brand-gold)]">{t.points}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <span
                        className="block h-full rounded-full transition-all duration-700"
                        style={{ width: `${(t.points / maxTeam) * 100}%`, background: t.color }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 组内个人排名 */}
        <div className="lg:col-span-5">
          <div className="h-full rounded-2xl bg-white/[.04] p-6 ring-1 ring-white/10">
            <h3 className="text-lg font-bold text-white">个人学习积分</h3>
            <p className="mt-0.5 text-xs text-white/50">选择小组查看组内排名,点击成员查看积分明细</p>

            {/* 小组选择 */}
            <div className="no-scrollbar mt-4 flex gap-1.5 overflow-x-auto pb-1">
              {TEAMS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTeamId(t.id)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium transition-all",
                    t.id === teamId ? "text-white" : "bg-white/[.06] text-white/55 hover:text-white/80"
                  )}
                  style={t.id === teamId ? { background: t.color } : undefined}
                >
                  {t.name}
                </button>
              ))}
            </div>

            {/* 课题 */}
            <div className="mt-4 rounded-lg bg-white/[.04] px-3 py-2 text-[12px] text-white/60">
              研究课题 · <span className="text-white/85">{selTeam.topic}</span>
            </div>

            {/* 成员 */}
            <div className="mt-3 space-y-2.5">
              {teamMembers.map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMember(m)}
                  className="card-hover flex w-full items-center gap-3 rounded-xl bg-white/[.05] p-3 text-left ring-1 ring-white/10"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: selTeam.color }}
                  >
                    {m.name[0]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">
                        {m.name} <span className="ml-1 text-[11px] font-normal text-white/45">{m.role}</span>
                      </span>
                      <span className="tnum text-sm font-bold text-[var(--brand-gold)]">{m.points}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <span
                        className="block h-full rounded-full"
                        style={{ width: `${(m.points / maxMemberPts) * 100}%`, background: selTeam.color }}
                      />
                    </div>
                  </div>
                  <span className="flex items-center gap-0.5 text-[11px] text-white/45">
                    {i === 0 && <TrophyIcon className="size-3.5 text-[var(--brand-gold)]" />}
                    明细 <ChevronRightIcon className="size-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {member && <MemberPointModal member={member} onClose={() => setMember(null)} />}
    </SectionShell>
  );
}

function MemberPointModal({ member, onClose }: { member: Member; onClose: () => void }) {
  const team = teamById(member.teamId);
  const radarData = CATS.map((c) => ({
    cat: c,
    value: Math.round((member.pointDetail[c] / CAT_MAX[c]) * 100),
    raw: member.pointDetail[c],
  }));

  return (
    <Modal open onClose={onClose} className="max-w-lg">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white" style={{ background: team.color }}>
            {member.name[0]}
          </span>
          <div>
            <h3 className="text-xl font-bold text-[var(--brand-navy-deep)]">{member.name}</h3>
            <p className="text-xs text-foreground/55">{team.name} · {member.role}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="big-num text-2xl text-[var(--brand-orange)]">{member.points}</p>
            <p className="text-[11px] text-foreground/45">火凤值</p>
          </div>
        </div>

        {/* 雷达 */}
        <div className="mt-4 h-56 w-full rounded-xl bg-secondary p-2 ring-1 ring-foreground/8">
          <ClientOnly fallback={<div className="h-full w-full animate-pulse rounded-lg bg-foreground/5" />}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke="rgba(11,31,58,.15)" />
                <PolarAngleAxis dataKey="cat" tick={{ fill: "var(--brand-navy)", fontSize: 12 }} />
                <Radar dataKey="value" stroke={team.color} fill={team.color} fillOpacity={0.35} />
                <Tooltip
                  formatter={(_v, _n, p) => [`${(p as { payload?: { raw?: number } })?.payload?.raw ?? ""} 分`, "得分"]}
                  contentStyle={{ borderRadius: 10, border: "1px solid rgba(11,31,58,.1)", fontSize: 12 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </ClientOnly>
        </div>

        {/* 明细列表 */}
        <div className="mt-4 space-y-2">
          <p className="text-xs font-semibold tracking-wide text-foreground/50">积分明细</p>
          {CATS.map((c) => (
            <div key={c} className="flex items-center gap-3">
              <span className="w-16 shrink-0 text-[13px] text-foreground/70">{c}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-foreground/8">
                <span className="block h-full rounded-full" style={{ width: `${(member.pointDetail[c] / CAT_MAX[c]) * 100}%`, background: team.color }} />
              </div>
              <span className="tnum w-10 shrink-0 text-right text-[13px] font-semibold text-[var(--brand-navy)]">{member.pointDetail[c]}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg bg-[var(--brand-orange)]/8 p-3 text-[13px] italic leading-relaxed text-foreground/70 ring-1 ring-[var(--brand-orange)]/15">
          “{member.quote}”
        </div>
      </div>
    </Modal>
  );
}
