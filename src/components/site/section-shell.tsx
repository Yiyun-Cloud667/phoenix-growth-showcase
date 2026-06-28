import { PhoenixLogo } from "@/components/brand/phoenix-logo";
import { cn } from "@/lib/utils";

/**
 * 板块外壳:统一页眉(凤凰标记 + 序号 + kicker + 标题),深/浅底交替。
 * 保证「凤凰销售 logo 在每个板块都出现」与整体节奏不割裂。
 */
export function SectionShell({
  id,
  index,
  kicker,
  title,
  desc,
  tone = "dark",
  firstSection = false,
  children,
  className,
  contentClassName,
}: {
  id: string;
  index: string;
  kicker: string;
  title: React.ReactNode;
  desc?: React.ReactNode;
  tone?: "dark" | "light";
  firstSection?: boolean;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20",
        dark ? "bg-stage" : "bg-paper",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-screen-2xl px-5 pb-16 sm:px-8 lg:pb-24",
          firstSection ? "pt-28 lg:pt-36" : "pt-16 lg:pt-24",
          contentClassName
        )}
      >
        {/* 页眉 */}
        <div className="mb-10 flex flex-col gap-5 lg:mb-14">
          <div className="flex items-center justify-between gap-4">
            <span
              className={cn(
                "kicker",
                dark ? "text-[var(--brand-gold)]" : "text-[var(--brand-orange)]"
              )}
            >
              {kicker}
            </span>
            <PhoenixLogo
              tone={dark ? "white" : "gold"}
              showTagline={false}
              className="opacity-90"
              markClassName="h-6"
            />
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-baseline gap-4">
                <span
                  className={cn(
                    "big-num text-3xl lg:text-4xl",
                    dark ? "text-white/15" : "text-[var(--brand-navy)]/12"
                  )}
                >
                  {index}
                </span>
                <h2
                  className={cn(
                    "text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl",
                    dark ? "text-white" : "text-[var(--brand-navy-deep)]"
                  )}
                >
                  {title}
                </h2>
              </div>
              {desc && (
                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed lg:text-base",
                    dark ? "text-white/60" : "text-[var(--brand-navy)]/60"
                  )}
                >
                  {desc}
                </p>
              )}
            </div>
          </div>
          <div className={cn("h-px w-full", dark ? "cut-line opacity-50" : "cut-line")} />
        </div>

        {children}
      </div>
    </section>
  );
}
