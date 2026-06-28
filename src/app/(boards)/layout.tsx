import { SectionNav } from "@/components/site/section-nav";
import { SiteFooter } from "@/components/site/site-footer";

/**
 * 板块页面共享布局:吸顶板块导航 + 页脚。
 * 五个板块(学习旅程/成果展示/学习积分/体检中心/学员心声)各为独立页面。
 */
export default function BoardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SectionNav />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
