// ============================================================================
// 凤凰成长展 · 演示数据(全部为虚构演示数据,无真实人员信息)
// 8 个小组 · 每组 2 名学员 · 分数由确定性种子生成(SSR/CSR 一致)
// ============================================================================
import type {
  AbilityDimension,
  CheckupStationMeta,
  InterviewClip,
  JourneyDay,
  Member,
  PaintingFragment,
  PointCategory,
  ReviewVideo,
  SapphireEntry,
  Team,
  TeamVlog,
  Wish,
} from "./types";

// ---- 确定性伪随机(mulberry32) --------------------------------------------
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const ri = (rng: () => number, min: number, max: number) =>
  Math.floor(rng() * (max - min + 1)) + min;

// ---- 8 个小组 --------------------------------------------------------------
const TEAM_DEFS: Omit<Team, "points" | "progress" | "memberIds">[] = [
  { id: "t1", no: 1, name: "栖梧队", en: "PERCH", slogan: "良禽择木，栖于梧桐", topic: "职场新人第一套西服场景", color: "#1B4F8A" },
  { id: "t2", no: 2, name: "鸣谦队", en: "HUMBLE", slogan: "谦谦其鸣，温润有声", topic: "正装日常化穿搭", color: "#2E7D6B" },
  { id: "t3", no: 3, name: "焕新队", en: "RENEW", slogan: "破旧立新，焕然一新", topic: "30周年品牌年轻化表达", color: "#F28C28" },
  { id: "t4", no: 4, name: "凌霄队", en: "SOAR", slogan: "直上凌霄，不止于此", topic: "门店年轻客群进店体验", color: "#C0492B" },
  { id: "t5", no: 5, name: "灼华队", en: "BLOOM", slogan: "灼灼其华，向新而生", topic: "导购内容共创", color: "#7A5BA6" },
  { id: "t6", no: 6, name: "衔光队", en: "GLEAM", slogan: "衔光而行，温暖相随", topic: "会员复购与关系维护", color: "#D6A94B" },
  { id: "t7", no: 7, name: "启明队", en: "DAWN", slogan: "启明在东，先行一步", topic: "多品牌组合推荐", color: "#2A6F97" },
  { id: "t8", no: 8, name: "燎原队", en: "SPARK", slogan: "星火虽微，可以燎原", topic: "总部学习内容资产", color: "#B23A48" },
];

const MEMBER_NAMES = [
  "顾屿", "沈砚", "陈书宁", "林越", "苏晚", "周珩", "何洲", "唐宁",
  "江璃", "罗砚之", "白川", "夏苕", "温言", "卢澄", "孟昭", "韦拾",
];
const ROLE_PAIRS = [
  ["领航官", "成果官"], ["文化官", "影像官"], ["洞察官", "种草官"], ["领航官", "文化官"],
  ["种草官", "成果官"], ["洞察官", "影像官"], ["领航官", "种草官"], ["文化官", "成果官"],
];
const QUOTES = [
  "把每一次模糊任务，都先问清再出发。",
  "门店里蹲下来,才看见真正的顾客。",
  "原来一件西服,藏着三十年的功夫。",
  "我学会了先讲事实,再讲观点。",
  "种草不是套路,是把场景说到心里。",
  "复盘那一刻,才知道自己长在哪。",
  "团队的分,比我个人的分更让我骄傲。",
  "敢上台讲,本身就是一次转身。",
  "把痛点写成 HMW,问题忽然有了方向。",
  "镜头记录的,是我们回不去的七天。",
  "第一次被叫'同事',而不是'同学'。",
  "数据会说话,前提是你愿意去问。",
  "30/60/90 天,我给自己写下了承诺。",
  "协作的关键,是先听懂别人的'内心OS'。",
  "把好创意,落到一张可执行的卡片上。",
  "结营不是结束,是火凤真正起飞的开始。",
];

const CATS: PointCategory[] = ["纪律", "学习", "活动", "班级职务"];

function buildMembers(): Member[] {
  const members: Member[] = [];
  TEAM_DEFS.forEach((team, ti) => {
    for (let k = 0; k < 2; k++) {
      const idx = ti * 2 + k;
      const rng = mulberry32(20260700 + idx * 97);
      const detail: Record<PointCategory, number> = {
        纪律: ri(rng, 42, 90),
        学习: ri(rng, 88, 178),
        活动: ri(rng, 64, 150),
        班级职务: ri(rng, 24, 100),
      };
      const points = CATS.reduce((s, c) => s + detail[c], 0);
      const nest = ri(rng, 12, 20);
      const culture = ri(rng, 21, 30);
      const mindmap = ri(rng, 12, 20);
      const scenario = ri(rng, 19, 30);
      const disc = (["D", "I", "S", "C"] as const)[ri(rng, 0, 3)];
      members.push({
        id: `u${idx + 1}`,
        name: MEMBER_NAMES[idx],
        teamId: team.id,
        role: ROLE_PAIRS[ti][k],
        points,
        pointDetail: detail,
        checkup: { nest, culture, mindmap, scenario, total: nest + culture + mindmap + scenario, disc },
        quote: QUOTES[idx],
      });
    }
  });
  return members;
}

export const MEMBERS: Member[] = buildMembers();

export const TEAMS: Team[] = TEAM_DEFS.map((t, i) => {
  const rng = mulberry32(515 + i * 131);
  const memberIds = MEMBERS.filter((m) => m.teamId === t.id).map((m) => m.id);
  return {
    ...t,
    points: ri(rng, 760, 1480),
    progress: ri(rng, 82, 100),
    memberIds,
  };
}).sort((a, b) => a.no - b.no);

export const teamById = (id: string) => TEAMS.find((t) => t.id === id)!;
export const membersOfTeam = (id: string) => MEMBERS.filter((m) => m.teamId === id);

// ---- 8 天火凤成长旅程 ------------------------------------------------------
export const JOURNEY: JourneyDay[] = [
  {
    id: "d0", day: 0, stage: "归巢入营", title: "火凤归巢 · 破冰启程", kicker: "ICE-BREAK",
    date: "Day 0",
    rationale:
      "入营第一夜先建立连接与归属。陌生到熟悉,需要一个低压力、强互动的破冰场,让 60 名管培生从'我'变成'我们',为后续 7 天的高强度共创打下信任底座。",
    keywords: ["破冰", "团队", "归属"],
    morning: { time: "全天抵达", title: "学员报到 · 入住分组", desc: "领取火凤护照、激活展示账号、认领小组与桌牌。", place: "温州总部 · 训练营基地" },
    afternoon: { time: "傍晚", title: "团队融合破冰", desc: "Bingo 找同伴、第一印象互评,快速打破壁垒。", place: "多功能厅" },
    evening: { time: "19:00–20:30", title: "归巢之夜 · 第一印象", desc: "小组组名、口号与桌旗共创,完成火凤身份的第一次集体亮相。" },
    photos: [
      { id: "p0a", motif: "icebreak", caption: "Bingo 找同伴", slot: "下午" },
      { id: "p0b", motif: "icebreak", caption: "第一印象互评", slot: "下午" },
      { id: "p0c", motif: "workshop", caption: "组名口号共创", slot: "晚间" },
      { id: "p0d", motif: "ceremony", caption: "火凤护照领取", slot: "上午" },
    ],
    accent: "#1B4F8A",
  },
  {
    id: "d1", day: 1, stage: "识羽破局", title: "识羽入局 · 神探手记", kicker: "DECODE",
    date: "Day 1",
    rationale:
      "用一场'30 周年品牌档案解谜'代替单向宣讲,让学员在信息不对称中练习沟通框架。读懂报喜鸟,不靠背诵,而靠主动拼图——这正是职业人最重要的破局能力。",
    keywords: ["文化", "沟通", "协作"],
    morning: { time: "07:00–08:00 / 09:00–12:00", title: "军训晨练 · 任务发布", desc: "晨练塑纪律;上午发布四项成果任务与积分规则。", place: "操场 / 主会场" },
    afternoon: { time: "13:00–17:00", title: "小组队建 + 火凤神探手记", desc: "团队测试、神探手记复盘与盘点,解开 30 周年档案密码。", place: "分组教室" },
    evening: { time: "18:00–20:00", title: "班委 / PM 选举 + 工作安排", desc: "选举班委与四类总 PM,明确职责,布置 Vlog 任务。" },
    photos: [
      { id: "p1a", motif: "drill", caption: "军训晨练", slot: "晨练" },
      { id: "p1b", motif: "classroom", caption: "任务发布", slot: "上午" },
      { id: "p1c", motif: "workshop", caption: "火凤神探手记", slot: "下午" },
      { id: "p1d", motif: "workshop", caption: "班委 / PM 选举", slot: "晚间" },
    ],
    accent: "#2A6F97",
  },
  {
    id: "d2", day: 2, stage: "优势探索", title: "优势探索 · 个人说明书", kicker: "STRENGTHS",
    date: "Day 2",
    rationale:
      "在认识组织之后，先认识自己。通过优势探索工作坊与个人说明书 IDP，让每位学员看清自己的天赋区与协作方式，团队分工因此从'拍脑袋'走向'按优势'。",
    keywords: ["优势", "自我认知", "IDP"],
    morning: { time: "07:00–08:00 / 09:00–12:00", title: "军训晨练 · 优势探索工作坊", desc: "识别个人优势主题,理解差异如何成为团队互补。", place: "操场 / 工作坊" },
    afternoon: { time: "13:00–17:00", title: "优势在团队中的应用", desc: "把个人优势映射到小组角色与任务分工。", place: "分组教室" },
    evening: { time: "18:00–20:00", title: "个人说明书 IDP 共创", desc: "产出一页'个人说明书',写下使用我的方式与成长目标。" },
    photos: [
      { id: "p2a", motif: "drill", caption: "军训晨练", slot: "晨练" },
      { id: "p2b", motif: "classroom", caption: "优势探索工作坊", slot: "上午" },
      { id: "p2c", motif: "workshop", caption: "优势分工演练", slot: "下午" },
      { id: "p2d", motif: "workshop", caption: "个人说明书共创", slot: "晚间" },
    ],
    accent: "#2E7D6B",
  },
  {
    id: "d3", day: 3, stage: "转身立约", title: "火凤转身 · 高效沟通", kicker: "TURNING",
    date: "Day 3",
    rationale:
      "校园人到职业人的转身，难在判断、表达与取舍。Day 3 以开放情景任务剧场代替传统职业化课程，让学员在冲突情境中练习高效沟通，并立下属于自己的火凤转身协议。",
    keywords: ["判断", "表达", "转身"],
    morning: { time: "07:00–08:00 / 09:00–12:00", title: "军训晨练 · 高效沟通", desc: "整顿与高效沟通训练,建立向上与平级的表达框架。", place: "操场 / 主会场" },
    afternoon: { time: "13:00–17:00", title: "火凤转身任务剧场", desc: "在真实职场情境卡中练习判断、沟通与协作取舍。", place: "情景教室" },
    evening: { time: "18:00–20:00", title: "个人火凤转身协议", desc: "完成 60 秒结构化表达稿与 30/60/90 天行动承诺。" },
    photos: [
      { id: "p3a", motif: "drill", caption: "军训晨练", slot: "晨练" },
      { id: "p3b", motif: "classroom", caption: "高效沟通训练", slot: "上午" },
      { id: "p3c", motif: "workshop", caption: "转身任务剧场", slot: "下午" },
      { id: "p3d", motif: "workshop", caption: "转身协议立约", slot: "晚间" },
    ],
    accent: "#C0492B",
  },
  {
    id: "d4", day: 4, stage: "文化创新", title: "三十年画卷 · 门店观察", kicker: "CULTURE",
    date: "Day 4",
    rationale:
      "把文化认同'画'出来、把用户洞察'走'出来。上午用企业年画完成 30 周年文化共创，下午导入创新设计思维，傍晚走进温州真实门店——让创新从同理用户开始。",
    keywords: ["30周年", "年画", "门店"],
    morning: { time: "07:00–08:00 / 09:00–12:00", title: "军训晨练 · 30周年企业年画", desc: "8 组各绘一段发展节点,拼成 30 周年文化长卷。", place: "操场 / 创作厅" },
    afternoon: { time: "13:00–17:00", title: "创新设计思维 + 门店观察模块", desc: "学习用户画像、旅程图与 HMW,准备门店观察清单。", place: "工作坊" },
    evening: { time: "18:00–20:00", title: "温州门店观察任务", desc: "走进真实门店,记录触点、痛点与一条可验证的 HMW。" },
    photos: [
      { id: "p4a", motif: "drill", caption: "军训晨练", slot: "晨练" },
      { id: "p4b", motif: "painting", caption: "30周年企业年画", slot: "上午" },
      { id: "p4c", motif: "classroom", caption: "创新设计思维", slot: "下午" },
      { id: "p4d", motif: "store", caption: "温州门店观察", slot: "晚间" },
    ],
    accent: "#F28C28",
  },
  {
    id: "d5", day: 5, stage: "种草生长", title: "场景种草 · 内容增长", kicker: "GROWTH",
    date: "Day 5",
    rationale:
      "服装品牌的增长，正从产品卖点转向用户场景。这一天用小红书场景种草，把 Day 4 的门店洞察转化为可传播的内容创意，让年轻员工用外部视角为品牌提出新表达。",
    keywords: ["场景", "内容", "增长"],
    morning: { time: "07:00–08:00 / 09:00–12:00", title: "军训晨练 · 场景种草课", desc: "小红书场景种草与服装品牌全域增长视角。", place: "操场 / 主会场" },
    afternoon: { time: "13:00–17:00", title: "爆款内容创作实操", desc: "标题、封面、脚本与转化路径的实战演练。", place: "内容工坊" },
    evening: { time: "18:00–20:00", title: "小组种草创意卡共创", desc: "每组产出一张报喜鸟种草创意卡,关联创新课题。" },
    photos: [
      { id: "p5a", motif: "drill", caption: "军训晨练", slot: "晨练" },
      { id: "p5b", motif: "content", caption: "场景种草课", slot: "上午" },
      { id: "p5c", motif: "content", caption: "爆款内容实操", slot: "下午" },
      { id: "p5d", motif: "workshop", caption: "种草创意卡共创", slot: "晚间" },
    ],
    accent: "#7A5BA6",
  },
  {
    id: "d6", day: 6, stage: "淬炼成册", title: "成果淬炼 · 蓝宝书", kicker: "FORGE",
    date: "Day 6",
    rationale:
      "把七天的观察、洞察与创意，淬炼成可展示、可留存的成果。创新成果卡工作坊 + 成长蓝宝书整合，让零散的想法收口为体系化的小组方案，并完成结营彩排。",
    keywords: ["创新", "共创", "交付"],
    morning: { time: "07:00–08:00 / 09:00–12:00", title: "军训晨练 · 成果卡工作坊", desc: "课题校准与问题定义,统一成果卡模板。", place: "操场 / 工作坊" },
    afternoon: { time: "13:00–17:00", title: "成果卡打磨 + 预路演", desc: "完成创意方案与落地卡,导师反馈后定稿。", place: "工作坊" },
    evening: { time: "18:00–20:00", title: "成长蓝宝书整合 · 结营彩排", desc: "总 PM 汇总蓝宝书,统一风格,进行结营彩排。" },
    photos: [
      { id: "p6a", motif: "drill", caption: "军训晨练", slot: "晨练" },
      { id: "p6b", motif: "workshop", caption: "成果卡工作坊", slot: "上午" },
      { id: "p6c", motif: "roadshow", caption: "预路演反馈", slot: "下午" },
      { id: "p6d", motif: "workshop", caption: "蓝宝书整合", slot: "晚间" },
    ],
    accent: "#2E7D6B",
  },
  {
    id: "d7", day: 7, stage: "振翅发布", title: "成长体检 · 振翅发布", kicker: "TAKEOFF",
    date: "Day 7",
    rationale:
      "成长需要被看见、被记录、被延续。最后一天以成长体检中心完成综合验收，火凤筑巢挑战检验团队协作，成果发布会让七天旅程在领导与同伴面前集体亮相。",
    keywords: ["体检", "成果", "发布"],
    morning: { time: "09:00–12:00", title: "成长体检中心", desc: "文化、思维导图、情境与 DISC 站点轮转,完成个人体检。", place: "体检中心" },
    afternoon: { time: "13:00–17:00", title: "火凤筑巢挑战 + 成果发布会", desc: "团队建筑挑战,年画揭幕、蓝宝书发布与八组路演。", place: "发布会主舞台" },
    evening: { time: "结营收束", title: "表彰 · 结营仪式", desc: "优秀个人 / 小组 / PM 表彰,领导寄语,火凤振翅。" },
    photos: [
      { id: "p7a", motif: "checkup", caption: "成长体检中心", slot: "上午" },
      { id: "p7b", motif: "nest", caption: "火凤筑巢挑战", slot: "下午" },
      { id: "p7c", motif: "roadshow", caption: "八组成果路演", slot: "下午" },
      { id: "p7d", motif: "ceremony", caption: "结营发布与表彰", slot: "晚间" },
    ],
    accent: "#D6A94B",
  },
];

// ---- 成果展示 · 回顾视频 ---------------------------------------------------
export const REVIEW_VIDEO: ReviewVideo = {
  title: "火凤成长旅程 · 八天回顾",
  subtitle: "报喜鸟 2026 火凤管培生训练营 · 项目纪实片",
  duration: "06:18",
  poster: "ceremony",
};

// ---- 成果展示 · 企业年画(8 碎片拼成 30 周年长卷) ---------------------------
// 一整幅「三十而立 · 火凤新生」线稿,按 4 列 × 2 行切成 8 块,每个小组负责其中一块。
export const PAINTING_FRAGMENTS: PaintingFragment[] = [
  { id: "f1", teamId: "t1", teamName: "栖梧队", index: 1, seg: "上排 · 第 1 块", title: "品牌标识与主题题字", text: "画卷起笔处——凤凰销售标识与「三十而立 · 火凤新生」主题题字,为整幅作品定下基调。栖梧队负责开篇这一块,落定品牌与主题。" },
  { id: "f2", teamId: "t2", teamName: "鸣谦队", index: 2, seg: "上排 · 第 2 块", title: "主题延展与留白起势", text: "题字向右舒展,留白处祥云与飘带渐起,承接主题、引向城市与火凤。鸣谦队负责让相邻画面自然过渡、气韵贯通。" },
  { id: "f3", teamId: "t3", teamName: "焕新队", index: 3, seg: "上排 · 第 3 块", title: "匠心高楼", text: "一座拔节而起的现代大厦,呼应报喜鸟的智造根基与向上之势。焕新队以利落线条勾勒楼宇的挺拔与精密。" },
  { id: "f4", teamId: "t4", teamName: "凌霄队", index: 4, seg: "上排 · 第 4 块", title: "火凤腾跃", text: "火凤振翅、直上凌霄,是整幅画的精神象征。凌霄队以繁复的羽翼线条,画出火凤新生的昂扬姿态。" },
  { id: "f5", teamId: "t5", teamName: "灼华队", index: 5, seg: "下排 · 第 1 块", title: "城市天际线", text: "多座城市地标连成一线,寓意报喜鸟与时代同行的全国版图。灼华队让群楼错落、虚实相生,稳住下半幅的左侧根基。" },
  { id: "f6", teamId: "t6", teamName: "衔光队", index: 6, seg: "下排 · 第 2 块", title: "飘带与纽扣", text: "飞舞的布料飘带与纽扣,把服饰的手艺感织入画面。衔光队以流畅曲线连接天际线与门店,串起整段叙事。" },
  { id: "f7", teamId: "t7", teamName: "启明队", index: 7, seg: "下排 · 第 3 块", title: "门店橱窗", text: "大厦楼基化作明亮的门店橱窗,橱窗里是认真选衣的顾客身影。启明队画出品牌与用户相遇的温度。" },
  { id: "f8", teamId: "t8", teamName: "燎原队", index: 8, seg: "下排 · 第 4 块", title: "皮尺收尾", text: "火凤尾羽与皮尺、纽扣在画尾交汇,呼应「量体裁衣」的匠心,为长卷收束。燎原队以细腻收尾,让整幅画首尾呼应。" },
];

// ---- 成果展示 · 成长蓝宝书(每组课题卡片) ----------------------------------
function cards(teamId: string, scene: string, insight: string, idea: string): SapphireEntry["cards"] {
  return [
    { id: `${teamId}-c1`, teamId, kind: "场景卡", title: "真实场景", body: scene },
    { id: `${teamId}-c2`, teamId, kind: "用户洞察卡", title: "用户洞察", body: insight },
    { id: `${teamId}-c3`, teamId, kind: "创意方案卡", title: "创意方案", body: idea },
  ];
}
export const SAPPHIRE: SapphireEntry[] = [
  { teamId: "t1", topic: "职场新人第一套西服场景", cards: cards("t1", "应届生入职前,为第一份正式工作挑选人生第一套西服。", "他们怕'穿得像爸爸',更怕在重要场合显得不专业;需要被引导而非被推销。", "推出'第一套报喜鸟'场景化推荐:身材问卷 + 场合搭配 + 导购陪伴式服务。") },
  { teamId: "t2", topic: "正装日常化穿搭", cards: cards("t2", "年轻白领希望一套正装能从通勤穿到周末小聚。", "正装被贴上'只在正式场合'的标签,日常利用率低,性价比感知差。", "1+N 风格搭配内容:一件单品延展多套日常造型,降低正装的'场景门槛'。") },
  { teamId: "t3", topic: "30周年品牌年轻化表达", cards: cards("t3", "30 周年节点,品牌故事需要被年轻消费者看懂、愿意分享。", "宏大叙事难共情,年轻人更吃'可参与、可玩梗、可晒'的轻表达。", "30 周年小红书内容主题 + 门店陈列互动装置,把历史变成可打卡的体验。") },
  { teamId: "t4", topic: "门店年轻客群进店体验", cards: cards("t4", "年轻顾客路过门店,进店、停留、试穿或转身离开的关键几分钟。", "压迫式导购让人想逃;年轻客群偏好先自由浏览,再被恰当回应。", "门店触点优化卡 + 导购'不打扰'话术,把进店率转化为停留与试穿。") },
  { teamId: "t5", topic: "导购内容共创", cards: cards("t5", "一线导购最懂顾客,却很少参与品牌内容创作。", "导购有真实素材与信任关系,缺的是人设、模板与表达方法。", "导购人设 + 短内容模板 + 拍摄脚本,让门店成为内容种草的源头。") },
  { teamId: "t6", topic: "会员复购与关系维护", cards: cards("t6", "沉睡老会员在换季与节点时本可被自然唤醒。", "硬广式短信易被忽略;会员更在意被记得的细节与专属感。", "会员内容触达节奏 + 门店专属活动,把'促销提醒'升级为'关系经营'。") },
  { teamId: "t7", topic: "多品牌组合推荐", cards: cards("t7", "同一个消费者在通勤、商务、休闲间切换多种生活场景。", "用户并不按品牌思考,而按场景思考;品牌矩阵的价值未被讲清。", "多品牌穿搭组合 + 场景地图,用一个人的一天串起矩阵的协同价值。") },
  { teamId: "t8", topic: "总部学习内容资产", cards: cards("t8", "管培生在温州总部的所学所见,本身就是优质传播素材。", "学习过程若不沉淀,珍贵的'第一视角'内容会随结营流失。", "'火凤看报喜鸟'内容合集:把参访与学习转化为可复用的品牌内容资产。") },
];

// ---- 成果展示 · 小组 VLOG --------------------------------------------------
export const VLOGS: TeamVlog[] = [
  { id: "v1", teamId: "t1", title: "栖梧 · 第一套西服的重量", duration: "02:41", intro: "从拘谨到笃定,记录我们读懂'第一套西服'背后的职业仪式感。", motif: "store" },
  { id: "v2", teamId: "t2", title: "鸣谦 · 把正装穿进日常", duration: "02:18", intro: "一周的穿搭实验,我们让正装从会议室走向街头与周末。", motif: "content" },
  { id: "v3", teamId: "t3", title: "焕新 · 三十而新", duration: "03:02", intro: "用年轻人的语言重讲 30 周年,门店打卡装置的诞生全过程。", motif: "painting" },
  { id: "v4", teamId: "t4", title: "凌霄 · 进店的那几分钟", duration: "02:55", intro: "蹲守门店一整天,我们读懂了年轻顾客进店与离开的心理。", motif: "store" },
  { id: "v5", teamId: "t5", title: "灼华 · 导购也是创作者", duration: "02:33", intro: "和一线导购一起写脚本、拍内容,门店里长出了第一条种草视频。", motif: "content" },
  { id: "v6", teamId: "t6", title: "衔光 · 唤醒沉睡的会员", duration: "02:47", intro: "从一条被忽略的短信出发,我们重新设计了会员的被记得感。", motif: "workshop" },
  { id: "v7", teamId: "t7", title: "启明 · 一个人的一天", duration: "03:11", intro: "用一天的生活场景,串起报喜鸟多品牌矩阵的协同价值。", motif: "roadshow" },
  { id: "v8", teamId: "t8", title: "燎原 · 火凤看报喜鸟", duration: "02:59", intro: "把总部参访的第一视角,沉淀成可传播的品牌内容合集。", motif: "ceremony" },
];

// ---- 体检中心 -------------------------------------------------------------
export const CHECKUP_STATIONS: CheckupStationMeta[] = [
  { key: "culture", name: "文化应知应会", max: 30, desc: "企业文化、30 周年与品牌矩阵的理解" },
  { key: "scenario", name: "情境", max: 30, desc: "真实职场情境中的判断、沟通与协作" },
  { key: "nest", name: "火凤筑巢", max: 20, desc: "团队建筑挑战中的分工、成本与执行" },
  { key: "mindmap", name: "学习思维导图", max: 20, desc: "个人复盘、知识结构与学习转化" },
];

export const ABILITIES: AbilityDimension[] = [
  { key: "culture", name: "文化认同", classAvg: 88 },
  { key: "turn", name: "职业转身", classAvg: 84 },
  { key: "collab", name: "沟通协作", classAvg: 86 },
  { key: "insight", name: "用户洞察", classAvg: 82 },
  { key: "express", name: "创新表达", classAvg: 85 },
  { key: "deliver", name: "行动交付", classAvg: 83 },
];

export const DISC_META: Record<string, { name: string; trait: string; color: string }> = {
  D: { name: "支配型 Dominance", trait: "目标导向 · 果断推进", color: "var(--disc-d)" },
  I: { name: "影响型 Influence", trait: "热情表达 · 善于感染", color: "var(--disc-i)" },
  S: { name: "稳健型 Steadiness", trait: "沉稳可靠 · 重视协作", color: "var(--disc-s)" },
  C: { name: "谨慎型 Compliance", trait: "严谨细致 · 数据驱动", color: "var(--disc-c)" },
};

export function discDistribution() {
  const dist: Record<string, number> = { D: 0, I: 0, S: 0, C: 0 };
  MEMBERS.forEach((m) => (dist[m.checkup.disc] += 1));
  return dist;
}

// ---- 学员心声 · 心愿墙 -----------------------------------------------------
export const WISHES: Wish[] = [
  { id: "w1", text: "愿三年后回看今天,依然记得火凤起飞的勇气。", author: "栖梧队", hue: 38 },
  { id: "w2", text: "希望把门店里学到的'蹲下来看顾客',带进每一次工作。", author: "凌霄队", hue: 205 },
  { id: "w3", text: "想成为那个先把任务问清楚的人。", author: "鸣谦队", hue: 160 },
  { id: "w4", text: "愿我们的种草创意,真的有一天上了门店。", author: "灼华队", hue: 280 },
  { id: "w5", text: "30 周年遇见报喜鸟,下一个 30 年我也在。", author: "焕新队", hue: 30 },
  { id: "w6", text: "谢谢同组的你,让我敢上台讲第一次。", author: "启明队", hue: 200 },
  { id: "w7", text: "把蓝宝书里的承诺,慢慢兑现。", author: "衔光队", hue: 46 },
  { id: "w8", text: "星火虽微,愿与伙伴一起燎原。", author: "燎原队", hue: 350 },
  { id: "w9", text: "愿自己永远保持对用户的好奇心。", author: "凌霄队", hue: 210 },
  { id: "w10", text: "希望下次 Vlog,镜头里的我更自信。", author: "焕新队", hue: 34 },
  { id: "w11", text: "把'内心OS'说出来,原来沟通会更轻松。", author: "鸣谦队", hue: 158 },
  { id: "w12", text: "愿做一只敢于转身的火凤。", author: "栖梧队", hue: 42 },
  { id: "w13", text: "记得筑巢那晚,我们为一个钢球欢呼。", author: "燎原队", hue: 348 },
  { id: "w14", text: "愿把优势用在对的地方,也尊重别人的不同。", author: "灼华队", hue: 276 },
  { id: "w15", text: "30/60/90 天,我会按计划长大。", author: "启明队", hue: 198 },
  { id: "w16", text: "希望成为顾客愿意信任的那个人。", author: "衔光队", hue: 48 },
  { id: "w17", text: "谢谢温州的七天,认识了更好的自己。", author: "栖梧队", hue: 36 },
  { id: "w18", text: "愿我们的创意,被业务真正用起来。", author: "凌霄队", hue: 208 },
  { id: "w19", text: "把热爱穿在身上,把专业做进细节。", author: "鸣谦队", hue: 164 },
  { id: "w20", text: "火凤新生,未来可期。", author: "焕新队", hue: 28 },
];

// ---- 学员心声 · 采访视频 ---------------------------------------------------
export const INTERVIEWS: InterviewClip[] = [
  { id: "i1", title: "我的火凤转身", speaker: "栖梧队 · 学员采访", motif: "classroom", quote: "最大的改变,是学会先问清楚再行动。" },
  { id: "i2", title: "门店给我的一课", speaker: "凌霄队 · 学员采访", motif: "store", quote: "蹲下来,才看见真正的顾客。" },
  { id: "i3", title: "从同学到同事", speaker: "焕新队 · 学员采访", motif: "workshop", quote: "第一次被叫'同事',那一刻我长大了。" },
  { id: "i4", title: "团队的力量", speaker: "燎原队 · 学员采访", motif: "nest", quote: "团队的分,比我个人的分更让我骄傲。" },
];

// ---- 总览指标 -------------------------------------------------------------
export const OVERVIEW = {
  learners: 16,
  teams: 8,
  days: 8,
  outcomes: 4,
  get avgPoints() {
    return Math.round(MEMBERS.reduce((s, m) => s + m.points, 0) / MEMBERS.length);
  },
  get avgCheckup() {
    return Math.round(MEMBERS.reduce((s, m) => s + m.checkup.total, 0) / MEMBERS.length);
  },
};
