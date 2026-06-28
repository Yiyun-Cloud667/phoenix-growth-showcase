import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "火凤成长展 · 报喜鸟 2026 火凤管培生训练营",
  description:
    "报喜鸟 2026 火凤管培生训练营结营成果展示平台 · 凤凰销售 Phoenix Retail。八天成长旅程、四项成果、火凤积分与成长体检的完整数字看板。",
  icons: { icon: "/brand/phoenix-mark.png" },
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth" className="h-full antialiased">
      <body className="min-h-full text-foreground">
        {children}
      </body>
    </html>
  );
}
