import type { PaintingFragment } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * 企业年画碎片:真实画作切片(4列×2行中的一块,index 1-8)。
 * 8 块按网格无缝拼接 = 完整 30 周年文化长卷。
 */
export function PaintingPanel({
  fragment,
  className,
  showLabel = true,
  seam = false,
}: {
  fragment: PaintingFragment;
  className?: string;
  showLabel?: boolean;
  seam?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-white", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/painting/tile-${fragment.index}.png`}
        alt={`${fragment.title} · 第 ${fragment.index} 段`}
        className="h-full w-full select-none object-cover"
        draggable={false}
      />

      {showLabel && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-10">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-[var(--brand-gold)]">{fragment.teamName} 绘制</p>
          <p className="text-sm font-bold text-white">{fragment.title}</p>
        </div>
      )}
      {showLabel && (
        <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-[11px] font-bold text-white/90 backdrop-blur-sm">
          {fragment.index}
        </span>
      )}
      {seam && <span className="pointer-events-none absolute inset-y-0 right-0 w-px bg-[var(--brand-line)]/30" />}
    </div>
  );
}
