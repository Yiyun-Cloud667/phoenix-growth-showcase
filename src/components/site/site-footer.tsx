import Link from "next/link";
import { PhoenixLogo } from "@/components/brand/phoenix-logo";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-screen-2xl px-6 py-12 sm:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <PhoenixLogo variant="full" tone="gold" className="h-20 w-auto" />
          <div className="cut-line h-px w-40 opacity-50" />
          <p className="max-w-xl text-sm leading-relaxed text-white/55">
            报喜鸟 2026 火凤管培生训练营 · 结营成果展示平台
            <br />
            八天成长旅程 · 四项成果 · 火凤积分 · 成长体检
          </p>
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="rounded-full bg-white/8 px-6 py-2 text-sm font-medium text-white/85 ring-1 ring-white/15 transition-colors hover:bg-white/14"
            >
              返回首页
            </Link>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-white/30">
            本平台为演示 Demo · 全部数据均为虚构演示数据,人物与分数不代表真实信息
            <br />
            网站开发方 · 凤凰销售 Phoenix Retail｜如遇问题,请联系管理员
          </p>
        </div>
      </div>
    </footer>
  );
}
