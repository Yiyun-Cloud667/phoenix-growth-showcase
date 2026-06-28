"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon } from "lucide-react";
import { PhoenixLogo } from "@/components/brand/phoenix-logo";
import { cn } from "@/lib/utils";

/** 五个独立板块页面 */
export const SECTIONS = [
  { href: "/journey", label: "学习旅程", en: "Journey" },
  { href: "/outcomes", label: "成果展示", en: "Outcomes" },
  { href: "/points", label: "学习积分", en: "Points" },
  { href: "/checkup", label: "体检中心", en: "Check-up" },
  { href: "/voices", label: "学员心声", en: "Voices" },
] as const;

const normPath = (p: string) => p.replace(/\/+$/, "") || "/";

export function SectionNav() {
  const pathname = usePathname();
  const current = normPath(pathname ?? "/");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-3"
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-5">
        <div
          className={cn(
            "flex items-center justify-between gap-3 rounded-2xl px-3 py-2 transition-all duration-300 sm:px-4",
            scrolled
              ? "glass bg-[var(--brand-navy-deep)]/85 shadow-lg shadow-black/20"
              : "glass bg-[var(--brand-navy-deep)]/60"
          )}
        >
          {/* 左:品牌 */}
          <Link href="/" className="flex shrink-0 items-center" aria-label="返回首页">
            <PhoenixLogo tone="white" showTagline={false} className="gap-2" markClassName="h-7" />
          </Link>

          {/* 中:板块切换(独立页面) */}
          <nav className="no-scrollbar -mx-1 flex flex-1 items-center justify-center gap-0.5 overflow-x-auto px-1">
            {SECTIONS.map((s) => {
              const active = current === normPath(s.href);
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium tracking-wide transition-all sm:px-3.5",
                    active ? "text-white" : "text-white/55 hover:text-white/85"
                  )}
                >
                  {active && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-gold)] shadow-lg shadow-[var(--brand-orange)]/30 ring-1 ring-white/20" />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    {s.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* 右:返回首页 */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-medium text-white/90 ring-1 ring-white/15 transition-colors hover:bg-white/16"
          >
            <HomeIcon className="size-3.5" />
            <span className="hidden sm:inline">返回首页</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
