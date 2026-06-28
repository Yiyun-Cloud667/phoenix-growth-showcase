"use client";

import { useEffect, useState } from "react";

/**
 * 仅客户端渲染(挂载后)。用于包裹 Recharts,避免 SSR/CSR hydration 不一致。
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <>{mounted ? children : fallback}</>;
}
