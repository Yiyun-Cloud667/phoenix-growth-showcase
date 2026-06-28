"use client";

import { useState } from "react";
import { PlayIcon, PauseIcon, Volume2Icon, VolumeXIcon, Maximize2Icon } from "lucide-react";
import type { PhotoMotif } from "@/lib/types";
import { SceneArt } from "./scene-art";
import { cn } from "@/lib/utils";

/**
 * 高级视频播放器占位 —— demo 阶段不依赖真实视频文件。
 * - autoplay: 进入即"静音自动播放"(回顾视频),点击出声
 * - 否则:点击播放
 * 真实视频接入只需把海报区替换为 <video src> 即可。
 */
export function VideoPlaceholder({
  motif,
  title,
  subtitle,
  duration = "00:00",
  autoplay = false,
  className,
  aspect = "aspect-video",
  compact = false,
}: {
  motif: PhotoMotif;
  title: string;
  subtitle?: string;
  duration?: string;
  autoplay?: boolean;
  className?: string;
  aspect?: string;
  compact?: boolean;
}) {
  const [playing, setPlaying] = useState(autoplay);
  const [muted, setMuted] = useState(true);
  const [hint, setHint] = useState(autoplay);

  return (
    <div className={cn("group relative overflow-hidden rounded-2xl ring-1 ring-white/12 bg-[var(--brand-navy-deep)]", aspect, className)}>
      <button
        type="button"
        onClick={() => {
          if (muted) {
            setMuted(false);
            setPlaying(true);
            setHint(false);
          } else {
            setPlaying((v) => !v);
          }
        }}
        className="absolute inset-0 h-full w-full cursor-pointer"
        aria-label={muted ? "点击开启声音播放" : playing ? "暂停" : "播放"}
      >
        <SceneArt motif={motif} className="h-full w-full" rounded="rounded-none" />
        <span className="pointer-events-none absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
      </button>

      {/* 中央播放/暂停 */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            "flex items-center justify-center rounded-full bg-white/14 ring-1 ring-white/30 backdrop-blur-md transition-all duration-300",
            compact ? "h-12 w-12" : "h-16 w-16",
            playing && !hint ? "scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100" : "scale-100 opacity-100"
          )}
        >
          {playing ? (
            <PauseIcon className={cn("text-white", compact ? "size-5" : "size-7")} />
          ) : (
            <PlayIcon className={cn("translate-x-0.5 text-white", compact ? "size-5" : "size-7")} fill="currentColor" />
          )}
        </span>
      </div>

      {/* 顶部标题 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 bg-gradient-to-b from-black/55 to-transparent px-4 pb-8 pt-3">
        <div className="min-w-0">
          <p className={cn("truncate font-semibold text-white drop-shadow", compact ? "text-sm" : "text-base")}>{title}</p>
          {subtitle && !compact && <p className="mt-0.5 truncate text-xs text-white/70">{subtitle}</p>}
        </div>
        {autoplay && hint && (
          <span className="shrink-0 rounded-full bg-[var(--brand-orange)]/90 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white">
            静音播放中 · 点击出声
          </span>
        )}
      </div>

      {/* 底部控制条 */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/65 to-transparent px-4 pb-3 pt-8">
        <button
          type="button"
          onClick={() => setPlaying((v) => !v)}
          className="text-white/90 transition-colors hover:text-white"
          aria-label={playing ? "暂停" : "播放"}
        >
          {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" fill="currentColor" />}
        </button>

        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/25">
          <span
            className={cn(
              "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-gold)]",
              playing ? "video-progress" : ""
            )}
            style={playing ? undefined : { width: "32%" }}
          />
        </div>

        <span className="tnum text-[11px] text-white/80">{duration}</span>

        <button
          type="button"
          onClick={() => setMuted((v) => !v)}
          className="text-white/90 transition-colors hover:text-white"
          aria-label={muted ? "取消静音" : "静音"}
        >
          {muted ? <VolumeXIcon className="size-4" /> : <Volume2Icon className="size-4" />}
        </button>
        <button type="button" className="text-white/80 transition-colors hover:text-white" aria-label="全屏">
          <Maximize2Icon className="size-4" />
        </button>
      </div>

      <style>{`
        @keyframes video-progress-kf { from { width: 6%; } to { width: 100%; } }
        .video-progress { animation: video-progress-kf 18s linear infinite; }
      `}</style>
    </div>
  );
}
