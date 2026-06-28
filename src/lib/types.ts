// ============================================================================
// 凤凰成长展 · 数据类型
// 报喜鸟 2026 火凤管培生训练营 · 结营成果展示平台
// ============================================================================

export type DiscType = "D" | "I" | "S" | "C";

/** 积分类别(对应开营集训积分规则:四大板块) */
export type PointCategory = "纪律" | "学习" | "活动" | "班级职务";

export interface Member {
  id: string;
  name: string;
  teamId: string;
  /** 组内角色(火凤六角色) */
  role: string;
  points: number;
  /** 积分明细(各类别得分,合计 = points) */
  pointDetail: Record<PointCategory, number>;
  /** 体检站得分 */
  checkup: {
    nest: number; // 火凤筑巢 /20
    culture: number; // 文化应知应会 /30
    mindmap: number; // 学习思维导图 /20
    scenario: number; // 情境 /30
    total: number; // /100
    disc: DiscType; // DISC 主型(不计分)
  };
  /** 一句金句 */
  quote: string;
}

export interface Team {
  id: string;
  no: number;
  name: string;
  en: string;
  slogan: string;
  /** 研究课题 */
  topic: string;
  color: string;
  points: number;
  progress: number;
  memberIds: string[];
}

export interface JourneyDay {
  id: string;
  day: number; // 0..7
  stage: string; // 阶段名
  title: string; // 当日标题
  kicker: string; // 英文小标
  /** 设计理由:为什么这样设计 */
  rationale: string;
  date: string;
  keywords: string[];
  morning: { time: string; title: string; desc: string; place: string };
  afternoon: { time: string; title: string; desc: string; place: string };
  /** 晚间共创活动 */
  evening: { time: string; title: string; desc: string };
  /** 当日照片(占位场景) */
  photos: JourneyPhoto[];
  accent: string;
}

export interface JourneyPhoto {
  id: string;
  /** 场景母题,决定占位插画 */
  motif: PhotoMotif;
  caption: string;
  slot: "晨练" | "上午" | "下午" | "晚间";
}

export type PhotoMotif =
  | "drill" // 军训晨练
  | "icebreak" // 破冰
  | "classroom" // 课堂
  | "workshop" // 工作坊/共创
  | "store" // 门店观察
  | "painting" // 企业年画
  | "content" // 内容种草
  | "roadshow" // 路演
  | "checkup" // 体检
  | "nest" // 火凤筑巢
  | "ceremony"; // 发布/结营

// ---- 成果展示 ----------------------------------------------------------

export interface ReviewVideo {
  title: string;
  subtitle: string;
  duration: string;
  poster: PhotoMotif; // motif key for poster scene
}

/** 企业年画碎片(8 个小组各画整幅画的一块,4列×2行拼成完整画作) */
export interface PaintingFragment {
  id: string;
  teamId: string;
  teamName: string; // 绘制该块的小组
  index: number; // 1..8 拼图顺序(上排 1-4,下排 5-8)
  seg: string; // 位置,如 "上排 · 第 1 块"
  title: string; // 该块画面内容标题
  text: string; // 该块画面解读 + 小组创作说明
}

/** 蓝宝书:四个主品牌(每品牌 2 个小组,各自独立选题) */
export type BrandKey = "saintangelo" | "hazzys" | "camicissima" | "lafuma";

export interface Brand {
  key: BrandKey;
  name: string; // 报喜鸟
  en: string; // SAINT ANGELO
  tagline: string; // 一句品牌定位
  desc: string; // 品类说明
  color: string;
}

/** 蓝宝书一页(6~8 页组成一份课题汇报,相当于 A5/PPT) */
export interface SapphirePage {
  no: number;
  kind: string; // 封面 / 用户洞察 / 人群与场景 / 核心策略 / 落地动作 / 行动指南
  title: string;
  body: string;
}

/** 一个小组的蓝宝书课题(基于所属品牌,自选具体话题) */
export interface SapphireEntry {
  teamId: string;
  brand: BrandKey;
  topic: string; // 该组自定的具体话题
  direction: string; // 参考的创新课题方向
  pages: SapphirePage[]; // 6~8 页
}

/** 小组 VLOG */
export interface TeamVlog {
  id: string;
  teamId: string;
  title: string;
  duration: string;
  intro: string;
  motif: PhotoMotif;
}

// ---- 体检中心 ----------------------------------------------------------

export interface AbilityDimension {
  key: string;
  name: string;
  classAvg: number; // 0..100
}

export interface CheckupStationMeta {
  key: "nest" | "culture" | "mindmap" | "scenario";
  name: string;
  max: number;
  desc: string;
}

// ---- 学员心声 ----------------------------------------------------------

export interface Wish {
  id: string;
  text: string;
  author: string; // 仅小组标签,无真实姓名
  hue: number;
}

export interface InterviewClip {
  id: string;
  title: string;
  speaker: string;
  motif: PhotoMotif;
  quote: string;
}
