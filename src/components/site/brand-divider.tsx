import { PhoenixLogo } from "@/components/brand/phoenix-logo";
import { cn } from "@/lib/utils";

/**
 * 品牌金色虚线分隔:两端渐隐 + 中心火凤标记。
 * 用于区块之间的精致分割,金色与品牌强调色呼应。
 */
export function BrandDivider({ className }: { className?: string }) {
  return (
    <div className={cn("relative z-10 mx-auto flex w-full max-w-2xl items-center gap-4 px-6", className)}>
      <span className="brand-dash h-px flex-1 [mask-image:linear-gradient(90deg,transparent,#000_60%)]" />
      <span className="flex shrink-0 items-center gap-2.5 text-[var(--brand-gold)]">
        <span className="h-1.5 w-1.5 rotate-45 bg-[var(--brand-gold)]/55" />
        <PhoenixLogo variant="mark" className="h-5 w-auto opacity-80" />
        <span className="h-1.5 w-1.5 rotate-45 bg-[var(--brand-gold)]/55" />
      </span>
      <span className="brand-dash h-px flex-1 [mask-image:linear-gradient(90deg,#000_40%,transparent)]" />
    </div>
  );
}
