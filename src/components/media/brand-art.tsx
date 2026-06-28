import type { BrandKey } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * 品牌风格插画占位(原创服饰意象,非官方图素材)。
 * 用于蓝宝书四个主品牌的配图;后续可替换为品牌官方图(放到 public/brands/ 并改 src 即可)。
 */
type Palette = { from: string; to: string; ink: string; accent: string };

const PALETTES: Record<BrandKey, Palette> = {
  saintangelo: { from: "#15385f", to: "#0a1c33", ink: "#cfe0f5", accent: "#D6A94B" },
  hazzys: { from: "#1f4a37", to: "#0d2318", ink: "#d3eada", accent: "#E0C36B" },
  camicissima: { from: "#1d4d70", to: "#0c2536", ink: "#d8ecf8", accent: "#ffffff" },
  lafuma: { from: "#6b3a1e", to: "#2a160b", ink: "#f3ddc9", accent: "#F2A93B" },
};

function Motif({ brand, p }: { brand: BrandKey; p: Palette }) {
  const s = { stroke: p.ink, strokeWidth: 3, fill: "none", strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  switch (brand) {
    case "saintangelo": // 商务西装
      return (
        <g>
          <g {...s}>
            <path d="M150 82 L122 250 M250 82 L278 250" />
            <path d="M150 82 L200 112 L250 82" />
            <path d="M200 112 L176 214 M200 112 L224 214" />
            <path d="M150 82 L168 230 M250 82 L232 230" opacity="0.5" />
          </g>
          <path d="M200 116 L192 206 L208 206 Z" fill={p.accent} opacity="0.9" />
          <circle cx="200" cy="220" r="3.5" fill={p.ink} />
          <circle cx="200" cy="236" r="3.5" fill={p.ink} />
        </g>
      );
    case "hazzys": // 学院针织(菱格)
      return (
        <g>
          <g {...s}>
            <path d="M150 96 L128 128 L150 146 L150 244 L250 244 L250 146 L272 128 L250 96" />
            <path d="M178 98 Q200 124 222 98" />
          </g>
          {[-1, 1].map((dx) =>
            [0, 1].map((dy) => (
              <path
                key={`${dx}-${dy}`}
                d={`M${200 + dx * 26} ${168 + dy * 40} l16 -20 l16 20 l-16 20 Z`}
                transform={`translate(${dx < 0 ? -32 : -16}, 0)`}
                fill="none"
                stroke={p.accent}
                strokeWidth="2"
                opacity="0.75"
              />
            ))
          )}
        </g>
      );
    case "camicissima": // 衬衫领 + 门襟纽扣
      return (
        <g>
          <g {...s}>
            <path d="M150 90 L126 250 M250 90 L274 250" />
            <path d="M150 90 L200 108 L250 90" />
            <path d="M200 108 L182 138 L200 150 L218 138 Z" />
            <path d="M200 150 L200 244" />
          </g>
          {[170, 196, 222].map((y) => (
            <circle key={y} cx="200" cy={y} r="3.4" fill={p.accent} />
          ))}
        </g>
      );
    case "lafuma": // 户外:山峰 + 拉链/帽
      return (
        <g>
          <path d="M96 236 L158 150 L196 196 L250 128 L312 236 Z" fill="none" stroke={p.ink} strokeWidth="3" strokeLinejoin="round" />
          <path d="M250 128 L236 150 L258 158 Z" fill={p.accent} opacity="0.9" />
          <g stroke={p.ink} strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M180 96 Q200 78 220 96" />
            <path d="M200 84 L200 168" strokeDasharray="4 7" />
          </g>
          <circle cx="200" cy="96" r="4" fill={p.accent} />
        </g>
      );
  }
}

export function BrandArt({
  brand,
  name,
  en,
  className,
  showLabel = true,
  rounded = "rounded-xl",
}: {
  brand: BrandKey;
  name?: string;
  en?: string;
  className?: string;
  showLabel?: boolean;
  rounded?: string;
}) {
  const p = PALETTES[brand];
  const gid = `ba-${brand}`;
  return (
    <div className={cn("relative overflow-hidden film-grain select-none", rounded, className)}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="block h-full w-full">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={p.from} />
            <stop offset="1" stopColor={p.to} />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#${gid})`} />
        {en && (
          <text x="200" y="160" textAnchor="middle" fontSize="46" fontWeight="800" fill={p.ink} opacity="0.06" letterSpacing="4">
            {en}
          </text>
        )}
        <Motif brand={brand} p={p} />
      </svg>
      <span className="absolute right-3 top-3 rounded-full bg-white/12 px-2 py-0.5 text-[9px] font-medium tracking-[0.2em] text-white/75 backdrop-blur-sm">
        DEMO 配图
      </span>
      {showLabel && (name || en) && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-3 pt-10">
          {en && <p className="text-[10px] font-semibold tracking-[0.22em]" style={{ color: p.accent }}>{en}</p>}
          {name && <p className="text-sm font-bold text-white">{name}</p>}
        </div>
      )}
    </div>
  );
}
