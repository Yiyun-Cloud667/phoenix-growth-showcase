import type { NextConfig } from "next";

/**
 * 凤凰成长展 — 报喜鸟 2026 火凤管培生训练营 · 结营成果展示平台
 * 纯前端 mock 数据,无服务端;使用静态导出,可托管到任意静态服务器。
 * 如需部署到子路径,设置 basePath 即可(同时配合 assetPrefix)。
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
