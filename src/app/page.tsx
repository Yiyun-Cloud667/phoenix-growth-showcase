import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowDownIcon,
  TargetIcon,
  CompassIcon,
  FlameIcon,
} from "lucide-react";
import { PhoenixLogo } from "@/components/brand/phoenix-logo";
import { BrandDivider } from "@/components/site/brand-divider";

const KPIS = [
  { v: "30", k: "周年节点", s: "1996 → 2026" },
  { v: "8", k: "天成长旅程", s: "归巢 → 振翅" },
  { v: "8", k: "学习小组", s: "课题共创" },
  { v: "4", k: "项核心成果", s: "可展示可留存" },
];

const LADDER = [
  { icon: TargetIcon, title: "优势探索", sub: "认识自己 · 看见天赋", desc: "通过优势工作坊与个人说明书，让每个人看清自己的天赋区与协作方式。" },
  { icon: CompassIcon, title: "职场转身", sub: "融入组织 · 完成转身", desc: "在真实职场情境中练习判断、表达与取舍，完成从校园人到职业人的转身。" },
  { icon: FlameIcon, title: "高效执行", sub: "创造价值 · 行动交付", desc: "把观察、洞察与创意，淬炼成可展示、可落地的成果，并形成行动承诺。" },
];

const FORMULA = [
  { n: "一", label: "条主线", items: ["三十而立 · 火凤新生"] },
  { n: "两", label: "类学习", items: ["文化与认同", "业务与创新"] },
  { n: "三", label: "套机制", items: ["火凤积分", "班级总 PM", "火凤成长舱"] },
  { n: "四", label: "项成果", items: ["企业年画", "成长蓝宝书", "学习 Vlog", "成长体检"] },
  { n: "六", label: "项能力", items: ["文化认同", "职业转身", "沟通协作", "用户洞察", "创新表达", "行动交付"] },
];

export default function LandingPage() {
  return (
    <div className="relative">
      {/* 整页融合长底图(单层,无分区块交接硬边) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,#0b2143 0%,#0a1c39 26%,#0a1a31 52%,#0a1b35 76%,#081627 100%)",
          }}
        />
        <div
          className="absolute -right-[8%] top-[1%] h-[60vh] w-[55vw] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(242,140,40,.16), transparent 72%)" }}
        />
        <div
          className="absolute -left-[12%] top-[40%] h-[58vh] w-[55vw] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(27,79,138,.36), transparent 72%)" }}
        />
        <div
          className="absolute bottom-[4%] right-[4%] h-[52vh] w-[50vw] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(214,169,75,.10), transparent 72%)" }}
        />
      </div>

      {/* 顶栏 */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-5 py-5 sm:px-8">
          <PhoenixLogo tone="white" />
          <Link
            href="/journey"
            className="flex items-center gap-1.5 rounded-full bg-white/8 px-4 py-2 text-sm font-medium text-white/85 ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/14"
          >
            开启学习旅程 <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vw] w-[80vw] max-w-[900px] -translate-x-1/2 -translate-y-[58%] rounded-full bg-[radial-gradient(closest-side,rgba(242,140,40,.16),transparent_70%)] glow-breathe" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-28 text-center">
          {/* 凤凰图形 */}
          <PhoenixLogo
            variant="mark"
            className="mb-7 h-24 w-auto drop-shadow-[0_8px_30px_rgba(214,169,75,.45)] sm:h-28"
          />

          <p className="kicker mb-4 text-[var(--brand-gold)]">
            SAINT ANGELO · PHOENIX RETAIL · 2026
          </p>
          <h1 className="text-4xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
            报喜鸟 2026
            <br />
            火凤管培生训练营
          </h1>
          <p className="mt-5 text-xl font-semibold sm:text-2xl">
            <span className="text-gradient-fire">三十而立 · 火凤新生</span>
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65">
            借报喜鸟成立 30 周年节点，为新一届火凤管培生设计的八天线下成长旅程。
            <br className="hidden sm:inline" />
            从文化认同到创新共创，完成从校园人到新职业人的第一次集体亮相。
          </p>

          {/* KPI */}
          <div className="mt-10 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {KPIS.map((kpi) => (
              <div key={kpi.k} className="glass rounded-2xl px-3 py-4">
                <p className="big-num text-3xl text-[var(--brand-orange)] sm:text-4xl">{kpi.v}</p>
                <p className="mt-1 text-[13px] font-medium text-white/85">{kpi.k}</p>
                <p className="mt-0.5 text-[10px] tracking-wide text-white/40">{kpi.s}</p>
              </div>
            ))}
          </div>

          {/* 滚动提示 */}
          <a href="#positioning" className="mt-12 flex flex-col items-center gap-2 text-white/50 transition-colors hover:text-white/80">
            <span className="text-xs tracking-[0.25em]">向下了解项目</span>
            <ArrowDownIcon className="size-5 animate-bounce" />
          </a>
        </div>
      </section>

      {/* 金色虚线分隔:hero → 总体定位 */}
      <BrandDivider className="py-10 sm:py-12" />

      {/* ============ 总体定位 ============ */}
      <section id="positioning" className="relative scroll-mt-16">
        <div className="mx-auto max-w-screen-2xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="kicker text-[var(--brand-gold)]">POSITIONING · 总体定位</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              报喜鸟 30 周年新管培生
              <span className="text-gradient-fire"> 成长共创营</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              不只是一段入职培训，而是一场围绕文化认同、职场转身、业务理解、用户观察与创新共创的完整成长旅程。
            </p>
          </div>

          {/* 成长阶梯 */}
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {LADDER.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="card-hover relative overflow-hidden rounded-2xl bg-white/[.04] p-6 ring-1 ring-white/10"
                >
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-[var(--brand-orange)]/20 to-[var(--brand-gold)]/10 blur-2xl" />
                  <div className="relative flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--brand-orange)] to-[var(--brand-gold)] text-white shadow-lg shadow-[var(--brand-orange)]/25">
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--brand-gold)]">STEP {i + 1}</span>
                      <p className="text-xl font-bold text-white">{step.title}</p>
                    </div>
                  </div>
                  <p className="relative mt-3 text-sm font-semibold text-white/85">{step.sub}</p>
                  <p className="relative mt-1.5 text-[13px] leading-relaxed text-white/55">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 项目结构机制 ============ */}
      <section className="relative">
        <div className="mx-auto max-w-screen-2xl px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="kicker text-[var(--brand-gold)]">PROGRAM STRUCTURE · 项目结构机制</span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">设计公式</h2>
            <p className="max-w-2xl text-base text-white/60">
              一条主线 × 两类学习 × 三套机制 × 四项成果 × 六项能力，构成完整的火凤成长闭环。
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-3">
            {FORMULA.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-3 rounded-2xl bg-white/[.04] p-5 ring-1 ring-white/10 transition-colors hover:bg-white/[.07] sm:flex-row sm:items-center"
              >
                <div className="flex shrink-0 items-baseline gap-2 sm:w-40">
                  <span className="big-num text-4xl text-[var(--brand-orange)]">{row.n}</span>
                  <span className="text-lg font-semibold text-white">{row.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {row.items.map((it) => (
                    <span key={it} className="rounded-full bg-white/8 px-3.5 py-1.5 text-[13px] font-medium text-white/85 ring-1 ring-white/10">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 底部 CTA → 学习旅程 ============ */}
      <section className="relative overflow-hidden">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-24 pt-4 text-center lg:pb-32">
          <PhoenixLogo variant="mark" className="mb-6 h-16 w-auto opacity-90 glow-breathe" />
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            八天火凤成长旅程
            <br />
            <span className="text-gradient-fire">即将启程</span>
          </h2>
          <p className="mt-5 max-w-xl text-base text-white/60">
            进入结营看板，沿着学习旅程、成果展示、火凤积分、成长体检与学员心声，看见每一只火凤的振翅。
          </p>
          <Link
            href="/journey"
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-gold)] px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-[var(--brand-orange)]/30 transition-all hover:shadow-[var(--brand-orange)]/50"
          >
            开始学习旅程
            <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1.5" />
          </Link>
          <p className="mt-8 text-[11px] leading-relaxed text-white/30">
            本平台为演示 Demo · 数据均为虚构演示数据 · 网站开发方 · 凤凰销售 Phoenix Retail
          </p>
        </div>
      </section>
    </div>
  );
}
