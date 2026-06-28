"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 轻量模态框 —— 全样式可控,支持 ESC / 点击遮罩关闭 / 锁滚动。
 */
export function Modal({
  open,
  onClose,
  children,
  className,
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-[#06122a]/70 backdrop-blur-sm"
        style={{ animation: "modal-fade .2s ease both" }}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={cn(
          "relative z-10 max-h-[88vh] w-full max-w-lg overflow-y-auto scrollbar-elegant rounded-2xl bg-card text-card-foreground shadow-2xl ring-1 ring-foreground/10",
          className
        )}
        style={{ animation: "modal-pop .26s cubic-bezier(.22,1,.36,1) both" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground"
          aria-label="关闭"
        >
          <XIcon className="size-4" />
        </button>
        {children}
      </div>
      <style>{`
        @keyframes modal-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-pop { from { opacity: 0; transform: translateY(14px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>,
    document.body
  );
}
