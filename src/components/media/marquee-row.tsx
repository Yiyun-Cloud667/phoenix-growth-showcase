"use client";

import { cn } from "@/lib/utils";

/**
 * 横向无限跑马灯 —— 作品自动滚动,悬停暂停,条目可点击。
 * 复制一份内容实现无缝循环。
 */
export function MarqueeRow<T>({
  items,
  renderItem,
  durationSec = 42,
  reverse = false,
  className,
  itemClassName,
}: {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  durationSec?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("marquee-paused edge-fade-x relative overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee gap-4"
        style={{
          // @ts-expect-error css var
          "--marquee-duration": `${durationSec}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((item, i) => (
          <div key={i} className={cn("shrink-0", itemClassName)} aria-hidden={i >= items.length}>
            {renderItem(item, i % items.length)}
          </div>
        ))}
      </div>
    </div>
  );
}
