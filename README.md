# 火凤成长展 · 凤凰成长展示平台

> 报喜鸟 2026 火凤管培生训练营 · **结营成果展示平台**
> 主题：三十而立 · 火凤新生　｜　品牌：凤凰销售 Phoenix Retail

一个面向结营汇报场景的高保真前端展示平台。访客从「培训介绍」首屏进入，向下进入「学习旅程」，并可在右上角板块导航中快速切换其余小板块。全部为**虚构演示数据**（8 个小组、每组 2 名学员、分数随机生成），无真实人员信息、无服务端。

---

## 一、平台结构（6 屏）

| # | 板块 | 路由 | 说明 |
|---|---|---|---|
| 首屏 | **培训介绍** | `/` | 凤凰销售 Logo、总体定位（优势探索→职场转身→高效执行）、项目结构机制（1×2×3×4×6 公式）、方案原图、底部「开始学习旅程」按钮 |
| 01 | **学习旅程** | `/experience#journey` | 8 天时间轴（Day0 归巢入营 → Day7 振翅发布），每日命题 / 为什么这样设计 / 上午下午课程 / 晚间共创 / 当日照片（自动滚动 + 手动滑动） |
| 02 | **成果展示** | `/experience#outcomes` | 顶部回顾视频（静音自动播放，点击出声）；企业年画（完整长卷 + 碎片点击看文字）、成长蓝宝书（课题卡）、小组 VLOG。每行左 1/4 封面（点开看全部）+ 右 3/4 滚动作品条（点开看详情） |
| 03 | **学习积分** | `/experience#points` | 团队总榜；按小组查看组内排名；点击成员看个人积分明细雷达图与分项条 |
| 04 | **体检中心** | `/experience#checkup` | 班级 DISC 行为画像、六项能力雷达、各体检站均分（文化30 / 情境30 / 火凤筑巢20 / 思维导图20 = 100，DISC 不计分）、个人成绩（点击看构成） |
| 05 | **学员心声** | `/experience#voices` | 顶部学员采访视频（可切换）、火凤心愿墙（滚动便利贴弹幕） |

导航：首屏默认进入；`/experience` 顶部吸顶导航可在 5 个小板块间快速切换，并随时「返回首页」。凤凰销售 Logo 出现在每个板块页眉。

---

## 二、技术栈

- **Next.js 16**（App Router · Turbopack · 静态导出 `output: "export"`）
- **React 19.2** · **TypeScript**
- **Tailwind CSS v4** + shadcn/ui 基元（`@base-ui/react`）
- **Recharts**（雷达图 / 环形图）
- **lucide-react** 图标
- 数据：`src/lib/data.ts` 确定性种子数据（mulberry32 PRNG，保证 SSR/CSR 一致）

## 三、目录

```
src/
  app/
    page.tsx              首屏 · 培训介绍
    experience/page.tsx   小板块集合页（5 个 section）
    layout.tsx · globals.css
  components/
    brand/                凤凰销售 Logo
    site/                 吸顶导航 / 板块外壳 / 页脚
    sections/             5 个板块组件
    media/                场景插画 / 视频占位 / 照片轮播 / 跑马灯 / 年画长卷
    charts/ ui-bits/ ui/  图表挂载 / 模态框 / shadcn 基元
  lib/                    types.ts · data.ts · utils.ts
public/
  brand/                  凤凰销售 logo（透明底 mark / 全标 / 描白）
  ppt/                    项目方案原图（定位 / 公式 / 旅程 / 日程 / 积分）
```

## 四、本地运行

```bash
npm install      # 安装依赖（首次）
npm run dev      # 开发服务器 → http://localhost:3000
npm run build    # 生产构建（静态导出到 out/）
```

> 说明：默认首页即「培训介绍」。如需部署到子路径，在 `next.config.ts` 中设置 `basePath` / `assetPrefix`。

## 五、演示与可替换项

- **视频**：回顾视频 / VLOG / 采访均为「高级播放器占位」组件（`media/video-placeholder.tsx`），接入真实视频时把海报区替换为 `<video src>` 即可。
- **照片**：学习旅程的当日影像为自绘品牌化 SVG 场景占位（`media/scene-art.tsx`），可替换为真实照片。
- **数据**：8 个小组名称、学员、分数、积分明细、体检成绩、心愿等均在 `src/lib/data.ts`，日程 / 任务可随后续跟进调整。
- **Logo**：源文件为「凤凰销售-源文件.ai」，已转换为 `public/brand/` 下多种透明底 PNG。

本平台为演示 Demo，全部数据均为虚构演示数据，人物与分数不代表真实信息。
