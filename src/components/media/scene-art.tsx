import type { PhotoMotif } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * 场景占位插画(自绘 SVG,品牌化 duotone)。
 * 用于学习旅程照片墙 / 视频海报 / 作品封面 —— 高级、统一、明确为演示占位。
 */

type Palette = { from: string; to: string; ink: string; glow: string };

const PALETTES: Record<PhotoMotif, Palette> = {
  drill: { from: "#0B1F3A", to: "#1B4F8A", ink: "#0A1830", glow: "#F2A93B" },
  icebreak: { from: "#15324f", to: "#2A6F97", ink: "#0c2238", glow: "#F28C28" },
  classroom: { from: "#10243f", to: "#28507e", ink: "#0b1c33", glow: "#D6A94B" },
  workshop: { from: "#173a33", to: "#2E7D6B", ink: "#0e251f", glow: "#F2C84B" },
  store: { from: "#3a1f16", to: "#9c4a2c", ink: "#2a140d", glow: "#F2C06B" },
  painting: { from: "#3a2410", to: "#C0772B", ink: "#2a1908", glow: "#F6D88A" },
  content: { from: "#2c1840", to: "#7A5BA6", ink: "#1d0f2d", glow: "#F2A0C0" },
  roadshow: { from: "#0c1f3a", to: "#2A6F97", ink: "#081627", glow: "#F2A93B" },
  checkup: { from: "#10243f", to: "#1B4F8A", ink: "#0a1a30", glow: "#56C2A0" },
  nest: { from: "#3a1414", to: "#B23A48", ink: "#2a0e10", glow: "#F2A93B" },
  ceremony: { from: "#0B1F3A", to: "#10325f", ink: "#081627", glow: "#F2C84B" },
};

function Figures({ n, y, color, scale = 1 }: { n: number; y: number; color: string; scale?: number }) {
  const gap = 360 / (n + 1);
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const x = 20 + gap * (i + 1);
        const h = 30 * scale + (i % 2) * 6;
        return (
          <g key={i} transform={`translate(${x} ${y})`} fill={color}>
            <circle cx="0" cy={-h} r={7 * scale} />
            <path d={`M ${-9 * scale} ${4} Q 0 ${-h + 4} ${9 * scale} 4 L ${7 * scale} ${14} L ${-7 * scale} 14 Z`} />
          </g>
        );
      })}
    </g>
  );
}

function MotifBody({ motif, p }: { motif: PhotoMotif; p: Palette }) {
  switch (motif) {
    case "drill":
      return (
        <g>
          <circle cx="320" cy="70" r="34" fill={p.glow} opacity="0.85" />
          <circle cx="320" cy="70" r="54" fill={p.glow} opacity="0.18" />
          <rect x="0" y="232" width="400" height="68" fill={p.ink} opacity="0.55" />
          <Figures n={6} y={232} color={p.ink} />
        </g>
      );
    case "icebreak":
      return (
        <g>
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const cx = 200 + Math.cos(a) * 92;
            const cy = 155 + Math.sin(a) * 70;
            return <line key={i} x1="200" y1="155" x2={cx} y2={cy} stroke={p.glow} strokeWidth="1.4" opacity="0.45" />;
          })}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const cx = 200 + Math.cos(a) * 92;
            const cy = 155 + Math.sin(a) * 70;
            return <circle key={i} cx={cx} cy={cy} r="11" fill={i % 2 ? p.glow : "#fff"} opacity="0.9" />;
          })}
          <circle cx="200" cy="155" r="16" fill="#fff" opacity="0.95" />
        </g>
      );
    case "classroom":
      return (
        <g>
          <rect x="120" y="40" width="200" height="118" rx="6" fill={p.ink} opacity="0.6" stroke={p.glow} strokeWidth="2" />
          <rect x="138" y="58" width="120" height="10" rx="5" fill={p.glow} opacity="0.8" />
          <rect x="138" y="80" width="164" height="7" rx="3.5" fill="#fff" opacity="0.4" />
          <rect x="138" y="98" width="150" height="7" rx="3.5" fill="#fff" opacity="0.3" />
          <Figures n={5} y={250} color={p.ink} scale={0.9} />
        </g>
      );
    case "workshop":
      return (
        <g>
          <ellipse cx="200" cy="205" rx="150" ry="40" fill={p.ink} opacity="0.5" />
          {[
            [120, 150, 18], [250, 140, -10], [180, 120, 6], [300, 165, 14], [90, 178, -8],
          ].map(([x, y, r], i) => (
            <rect key={i} x={x} y={y} width="46" height="40" rx="4" fill={i % 2 ? p.glow : "#fff"} opacity="0.92" transform={`rotate(${r} ${x + 23} ${y + 20})`} />
          ))}
          <Figures n={4} y={250} color={p.ink} scale={0.85} />
        </g>
      );
    case "store":
      return (
        <g>
          <rect x="60" y="120" width="280" height="150" fill={p.ink} opacity="0.5" />
          <path d="M 50 120 L 350 120 L 330 86 L 70 86 Z" fill={p.glow} opacity="0.85" />
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={i} x={62 + i * 40} y="120" width="20" height="22" fill={i % 2 ? "#fff" : p.ink} opacity="0.7" />
          ))}
          {[110, 200, 290].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="150" x2={x} y2="160" stroke="#fff" strokeWidth="2" opacity="0.7" />
              <path d={`M ${x - 16} 200 Q ${x} 158 ${x + 16} 200 Z`} fill="#fff" opacity="0.8" />
            </g>
          ))}
        </g>
      );
    case "painting":
      return (
        <g>
          <rect x="70" y="56" width="260" height="170" rx="6" fill="#fff" opacity="0.92" />
          <rect x="70" y="56" width="260" height="170" rx="6" fill="none" stroke={p.glow} strokeWidth="4" />
          <path d="M 96 180 Q 150 90 200 150 T 304 120" fill="none" stroke={p.to} strokeWidth="8" opacity="0.85" strokeLinecap="round" />
          <circle cx="150" cy="110" r="16" fill={p.glow} opacity="0.8" />
          <rect x="250" y="150" width="44" height="44" rx="4" fill={p.to} opacity="0.5" />
          <rect x="196" y="226" width="8" height="60" fill={p.ink} opacity="0.7" />
        </g>
      );
    case "content":
      return (
        <g>
          <rect x="150" y="44" width="100" height="200" rx="16" fill={p.ink} opacity="0.65" stroke={p.glow} strokeWidth="2.5" />
          <rect x="162" y="60" width="76" height="96" rx="6" fill={p.to} opacity="0.6" />
          <path d="M 200 150 l 28 -16 v 32 z" fill="#fff" opacity="0.95" />
          <path d="M 186 184 c -8 -12 -26 -2 -16 12 c 4 6 16 14 16 14 s 12 -8 16 -14 c 10 -14 -8 -24 -16 -12 z" fill={p.glow} />
          <rect x="162" y="208" width="60" height="8" rx="4" fill="#fff" opacity="0.5" />
        </g>
      );
    case "roadshow":
      return (
        <g>
          <ellipse cx="200" cy="262" rx="170" ry="34" fill={p.ink} opacity="0.55" />
          <path d="M 120 60 L 200 40 L 280 60 L 250 96 L 150 96 Z" fill={p.glow} opacity="0.22" />
          <rect x="184" y="150" width="32" height="80" rx="4" fill={p.ink} opacity="0.8" />
          <g transform="translate(200 130)" fill={p.glow}>
            <circle cx="0" cy="-16" r="11" />
            <path d="M -16 8 Q 0 -12 16 8 L 12 22 L -12 22 Z" />
          </g>
          <rect x="150" y="226" width="100" height="8" rx="4" fill={p.glow} opacity="0.7" />
        </g>
      );
    case "checkup":
      return (
        <g>
          {(() => {
            const cx = 200, cy = 150, R = 86;
            const pts = Array.from({ length: 6 }).map((_, i) => {
              const a = -Math.PI / 2 + (i / 6) * Math.PI * 2;
              return [cx + Math.cos(a) * R, cy + Math.sin(a) * R];
            });
            const inner = Array.from({ length: 6 }).map((_, i) => {
              const a = -Math.PI / 2 + (i / 6) * Math.PI * 2;
              const r = R * (0.5 + ((i * 37) % 40) / 100);
              return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
            });
            return (
              <g>
                <polygon points={pts.map((q) => q.join(",")).join(" ")} fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.35" />
                <polygon points={pts.map((q) => [cx + (q[0] - cx) * 0.6, cy + (q[1] - cy) * 0.6].join(",")).join(" ")} fill="none" stroke="#fff" strokeWidth="1" opacity="0.25" />
                <polygon points={inner.map((q) => q.join(",")).join(" ")} fill={p.glow} opacity="0.45" stroke={p.glow} strokeWidth="2" />
              </g>
            );
          })()}
        </g>
      );
    case "nest":
      return (
        <g>
          <ellipse cx="200" cy="266" rx="150" ry="28" fill={p.ink} opacity="0.5" />
          {[0, 1, 2, 3].map((r) => (
            <rect key={r} x={150 - r * 4} y={232 - r * 40} width={100 + r * 8} height="14" rx="3" fill={r % 2 ? p.glow : "#fff"} opacity="0.85" transform={`rotate(${r % 2 ? 3 : -3} 200 ${238 - r * 40})`} />
          ))}
          <line x1="120" y1="232" x2="150" y2="112" stroke={p.glow} strokeWidth="4" opacity="0.7" />
          <line x1="280" y1="232" x2="250" y2="112" stroke={p.glow} strokeWidth="4" opacity="0.7" />
          <circle cx="210" cy="96" r="13" fill="#fff" />
        </g>
      );
    case "ceremony":
      return (
        <g>
          <path d="M 0 250 Q 200 200 400 250 L 400 300 L 0 300 Z" fill={p.ink} opacity="0.5" />
          {Array.from({ length: 26 }).map((_, i) => {
            const x = (i * 53) % 400;
            const y = 30 + ((i * 71) % 170);
            const c = [p.glow, "#fff", p.to][i % 3];
            return <rect key={i} x={x} y={y} width="7" height="11" rx="2" fill={c} opacity="0.85" transform={`rotate(${(i * 40) % 360} ${x} ${y})`} />;
          })}
          <g transform="translate(200 168)" fill={p.glow}>
            <circle cx="0" cy="-20" r="13" />
            <path d="M -20 6 Q 0 -16 20 6 L 16 24 L -16 24 Z" />
          </g>
        </g>
      );
  }
}

export function SceneArt({
  motif,
  caption,
  badge,
  className,
  rounded = "rounded-xl",
}: {
  motif: PhotoMotif;
  caption?: string;
  badge?: string;
  className?: string;
  rounded?: string;
}) {
  const p = PALETTES[motif];
  const gid = `g-${motif}`;
  return (
    <div className={cn("relative overflow-hidden film-grain vignette select-none", rounded, className)}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full block">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={p.from} />
            <stop offset="1" stopColor={p.to} />
          </linearGradient>
          <radialGradient id={`${gid}-l`} cx="0.7" cy="0.18" r="0.9">
            <stop offset="0" stopColor={p.glow} stopOpacity="0.35" />
            <stop offset="0.5" stopColor={p.glow} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#${gid})`} />
        <rect width="400" height="300" fill={`url(#${gid}-l)`} />
        <MotifBody motif={motif} p={p} />
      </svg>

      {badge && (
        <span className="absolute left-3 top-3 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white/90 backdrop-blur-sm">
          {badge}
        </span>
      )}
      <span className="absolute right-3 top-3 rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-medium tracking-[0.2em] text-white/80 backdrop-blur-sm">
        DEMO
      </span>
      {caption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pb-3 pt-8">
          <span className="text-[13px] font-medium text-white drop-shadow">{caption}</span>
        </div>
      )}
    </div>
  );
}
