import { cn } from "@/lib/utils";

/**
 * 凤凰销售 Phoenix Retail 品牌标识
 * - mark: 仅火凤图形
 * - full: 图形 + 文字(竖向锁定)
 * - lockup: 横向锁定(图形 + 文案),用于各板块页眉
 * tone: gold(金,适配深浅底) / white(描白,深底强对比)
 */
export function PhoenixLogo({
  variant = "lockup",
  tone = "gold",
  className,
  markClassName,
  showTagline = true,
}: {
  variant?: "mark" | "full" | "lockup";
  tone?: "gold" | "white";
  className?: string;
  markClassName?: string;
  showTagline?: boolean;
}) {
  const markSrc = "/brand/phoenix-mark.png";

  if (variant === "mark") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={markSrc}
        alt="凤凰销售 Phoenix Retail"
        className={cn("object-contain select-none", className)}
        draggable={false}
      />
    );
  }

  if (variant === "full") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={tone === "white" ? "/brand/phoenix-logo-white.png" : "/brand/phoenix-logo-full.png"}
        alt="凤凰销售 Phoenix Retail"
        className={cn("object-contain select-none", className)}
        draggable={false}
      />
    );
  }

  // lockup — 横向:火凤图形 + 中英文
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={markSrc}
        alt=""
        aria-hidden
        className={cn("h-9 w-auto object-contain select-none drop-shadow-[0_2px_6px_rgba(214,169,75,.35)]", markClassName)}
        draggable={false}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[15px] font-bold tracking-[0.18em]",
            tone === "white" ? "text-white" : "text-[var(--brand-gold)]"
          )}
        >
          凤凰销售
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1 text-[9px] font-medium tracking-[0.32em] uppercase",
              tone === "white" ? "text-white/55" : "text-[var(--brand-gold)]/70"
            )}
          >
            Phoenix Retail
          </span>
        )}
      </span>
    </div>
  );
}
