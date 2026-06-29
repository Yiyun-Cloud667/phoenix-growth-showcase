// ============================================================================
// 凤凰成长展 · 演示数据(全部为虚构演示数据,无真实人员信息)
// 8 个小组 · 每组 2 名学员 · 分数由确定性种子生成(SSR/CSR 一致)
// ============================================================================
import type {
  AbilityDimension,
  Brand,
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
    id: "d1", day: 1, stage: "识羽破局", title: "识羽入局 · 正式开营", kicker: "DECODE",
    date: "Day 1",
    rationale:
      "正式开营第一课,先读懂报喜鸟 30 年。上午集中导入企业文化与品牌脉络;下午用一场'30 周年品牌档案解谜'把单向输入变成主动拼图,在信息不对称中练习沟通与协作。",
    keywords: ["文化", "沟通", "协作"],
    morning: { time: "09:00–12:00", title: "30 周年企业文化导入", desc: "正式开营。报喜鸟 30 年发展脉络、企业文化八大体系与多品牌矩阵集中导入。", place: "主会场" },
    afternoon: { time: "13:00–17:00", title: "小组队建 + 火凤神探手记", desc: "团队测试、神探手记复盘与盘点,解开 30 周年档案密码。", place: "分组教室" },
    evening: { time: "18:00–20:00", title: "班委 / PM 选举 + 工作安排", desc: "选举班委与四类总 PM,明确职责,布置 Vlog 任务。" },
    photos: [
      { id: "p1a", motif: "ceremony", caption: "正式开营", slot: "上午" },
      { id: "p1b", motif: "classroom", caption: "30 周年文化导入", slot: "上午" },
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
    afternoon: { time: "13:00–17:00", title: "火凤转身任务剧场", desc: "在真实职场情境卡中练习判断、沟通与取舍,完成个人火凤转身协议与 60 秒表达。", place: "情景教室" },
    evening: { time: "18:00–20:00", title: "企业年画任务发布 · 集体构思创作", desc: "发布 30 周年企业年画任务,小组集体构思主题与分工,启动创作。" },
    photos: [
      { id: "p3a", motif: "drill", caption: "军训晨练", slot: "晨练" },
      { id: "p3b", motif: "classroom", caption: "高效沟通训练", slot: "上午" },
      { id: "p3c", motif: "workshop", caption: "转身任务剧场", slot: "下午" },
      { id: "p3d", motif: "painting", caption: "企业年画任务发布", slot: "晚间" },
    ],
    accent: "#C0492B",
  },
  {
    id: "d4", day: 4, stage: "文化创新", title: "三十年画卷 · 用户洞察", kicker: "CULTURE",
    date: "Day 4",
    rationale:
      "把文化认同'画'出来,把用户需求'想'清楚。上午用企业年画完成 30 周年文化共创(承接昨晚的构思);下午导入创新设计思维,用用户画像、旅程图与 HMW 建立用户洞察;晚间围绕洞察探索解决方案——让创新从同理用户开始。",
    keywords: ["30周年", "年画", "用户洞察"],
    morning: { time: "07:00–08:00 / 09:00–12:00", title: "军训晨练 · 30周年企业年画", desc: "承接昨晚构思,8 组各绘一段,拼成 30 周年文化长卷。", place: "操场 / 创作厅" },
    afternoon: { time: "13:00–17:00", title: "创新设计思维 + 用户洞察", desc: "学习用户画像、用户旅程图与 HMW,建立对目标用户的洞察。", place: "工作坊" },
    evening: { time: "18:00–20:00", title: "探索解决方案", desc: "基于用户洞察,小组发散并探索可落地的解决方案,形成创新方向。" },
    photos: [
      { id: "p4a", motif: "drill", caption: "军训晨练", slot: "晨练" },
      { id: "p4b", motif: "painting", caption: "30周年企业年画", slot: "上午" },
      { id: "p4c", motif: "classroom", caption: "创新设计思维 · 用户洞察", slot: "下午" },
      { id: "p4d", motif: "workshop", caption: "探索解决方案", slot: "晚间" },
    ],
    accent: "#F28C28",
  },
  {
    id: "d5", day: 5, stage: "种草生长", title: "场景种草 · 内容增长", kicker: "GROWTH",
    date: "Day 5",
    rationale:
      "服装品牌的增长，正从产品卖点转向用户场景。这一天用小红书场景种草，把 Day 4 的用户洞察与解决方案转化为可传播的内容创意，让年轻员工用外部视角为品牌提出新表达。",
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

// ---- 成果展示 · 成长蓝宝书 -------------------------------------------------
// 四个主品牌,每个品牌 2 个小组(各自独立选题),所有方案围绕品牌服饰展开。
// 每组产出 6 页课题汇报(相当于 A5/PPT),最终汇集成《火凤成长蓝宝书》——
// 入职前为每个品牌写下的未来行动指南。
export const BRANDS: Brand[] = [
  { key: "saintangelo", name: "报喜鸟", en: "SAINT ANGELO", tagline: "三十而立 · 商务正装领导品牌", desc: "量体裁衣的商务正装", color: "#1B4F8A" },
  { key: "hazzys", name: "哈吉斯", en: "HAZZYS", tagline: "英伦学院 · 优雅休闲", desc: "学院风格的轻奢休闲", color: "#2E6B4F" },
  { key: "camicissima", name: "凯米切", en: "CAMICISSIMA", tagline: "意式衬衫专家 · 都市精致", desc: "意大利衬衫与都市正装", color: "#2F7DB0" },
  { key: "lafuma", name: "乐飞叶", en: "LAFUMA", tagline: "法式户外 · 自在山野", desc: "法国户外生活方式", color: "#C0612E" },
];
export const brandByKey = (k: string) => BRANDS.find((b) => b.key === k)!;

const SAP_SECTIONS = ["用户洞察", "人群与场景", "核心策略", "落地动作", "行动指南"];
function sap(
  teamId: string,
  brand: SapphireEntry["brand"],
  topic: string,
  direction: string,
  subtitle: string,
  rows: [string, string][]
): SapphireEntry {
  return {
    teamId,
    brand,
    topic,
    direction,
    pages: [
      { no: 1, kind: "封面", title: topic, body: subtitle },
      ...rows.map(([title, body], i) => ({ no: i + 2, kind: SAP_SECTIONS[i], title, body })),
    ],
  };
}

export const SAPPHIRE: SapphireEntry[] = [
  // 报喜鸟 —— t1 / t2
  sap("t1", "saintangelo", "职场新人的第一套报喜鸟西服", "职场新人第一套西服场景", "报喜鸟 · 让新人的第一印象更专业得体", [
    ["怕穿错,更怕不专业", "应届生入职前最怕'穿得不像样',却不懂版型与场合,需要被引导而非被推销。"],
    ["22–25 岁职场新人", "校招面试、入职报到、第一次正式汇报等关键场合。"],
    ["打包'第一套'解决方案", "以'第一套西服'为切口,提供版型 + 场合 + 搭配的一站式方案。"],
    ["门店新人专区", "设'新人第一套'专区 + 身材问卷 + 导购陪伴式试穿 + 入职场景搭配卡。"],
    ["30 / 60 / 90 天", "30 天上线专区话术,60 天联动校招季,90 天沉淀'第一套'内容专辑。"],
  ]),
  sap("t2", "saintangelo", "报喜鸟正装的日常化穿搭", "正装日常化穿搭", "报喜鸟 · 一件正装,穿进更多日常场景", [
    ["正装利用率太低", "正装被贴上'只在正式场合'的标签,年轻人觉得穿一次不划算。"],
    ["25–35 岁都市白领", "通勤、商务午餐、周末小聚之间的多场景切换。"],
    ["1+N 一衣多穿", "一件正装单品延展 N 套日常造型,降低'只穿一次'的心理门槛。"],
    ["搭配手册 + 混搭单品", "出'1+N'搭配手册,引入针织、休闲裤等混搭单品,门店做搭配演示。"],
    ["看连带率", "30 天出手册,60 天上通勤穿搭内容,90 天评估连带率提升。"],
  ]),
  // 哈吉斯 HAZZYS —— t3 / t4
  sap("t3", "hazzys", "HAZZYS 年轻客群进店体验升级", "门店年轻客群进店体验", "HAZZYS · 让年轻人愿意走进来、留下来", [
    ["怕被推销而不进店", "年轻顾客路过常因'怕被推销'而不进店,偏好先自由浏览再被回应。"],
    ["20–30 岁年轻客群", "逛街、约会、商场闲逛时的随机进店时机。"],
    ["把门店做成可逛的场景", "用学院风陈列与体验代替推销,让门店值得'逛与拍'。"],
    ["打卡装置 + 不打扰话术", "入口打卡装置 + 学院风搭配角 + 导购'不打扰'话术 + 自助搭配镜。"],
    ["看停留与试穿", "30 天改陈列动线,60 天试点话术,90 天看进店停留与试穿率。"],
  ]),
  sap("t4", "hazzys", "HAZZYS 从校园到职场的过渡穿搭", "品牌年轻化表达", "HAZZYS · 在学生气与职场感之间找到平衡", [
    ["既怕老气又怕不正式", "毕业生在'学生气'与'职场感'之间难找平衡。"],
    ["22–26 岁过渡人群", "实习、入职、职场第一年的过渡阶段。"],
    ["学院风做半正式过渡", "用 HAZZYS 学院风打造'半正式'造型,兼顾年轻与得体。"],
    ["半正式胶囊系列", "推半正式胶囊系列 + 过渡穿搭内容 + 校园快闪。"],
    ["看过渡人群转化", "30 天定胶囊清单,60 天校园快闪,90 天沉淀过渡穿搭内容集。"],
  ]),
  // 凯米切 Camicissima —— t5 / t6
  sap("t5", "camicissima", "凯米切衬衫的导购内容共创", "导购内容共创", "凯米切 · 让最懂衬衫的导购成为创作者", [
    ["导购专业没被用起来", "一线导购最懂衬衫版型与场合,却很少参与品牌内容创作。"],
    ["导购 × 男士顾客", "门店导购与关注穿搭的男士,线上种草到线下到店。"],
    ["把专业变成可复制内容", "把领型、面料、搭配的专业,做成可复制的短内容模板。"],
    ["人设 + 模板 + 脚本", "建导购人设 + 衬衫知识短视频模板 + 拍摄脚本 + 到店核销。"],
    ["看内容到店", "30 天选种子导购,60 天产出 10 条内容,90 天看内容到店转化。"],
  ]),
  sap("t6", "camicissima", "凯米切会员的复购与衬衫订阅", "会员复购与关系维护", "凯米切 · 把一件衬衫变成长期关系", [
    ["硬广打扰、缺专属感", "衬衫是高频消耗品,但老会员常被硬广短信打扰。"],
    ["已购会员", "换季、商务节点、重要场合前的复购时机。"],
    ["订阅 + 场景提醒", "用'衬衫订阅 + 场景提醒'经营关系,而非促销轰炸。"],
    ["尺码档案 + 关怀内容", "建专属尺码档案 + 场景化关怀内容 + 会员订阅计划。"],
    ["看复购与流失", "30 天建尺码档案,60 天试点订阅,90 天评估复购与流失。"],
  ]),
  // 乐飞叶 Lafuma —— t7 / t8
  sap("t7", "lafuma", "乐飞叶多场景户外穿搭组合", "多品牌组合推荐", "乐飞叶 · 既能上山,也能上班", [
    ["买了户外只在通勤穿", "城市人买户外装备却只在通勤穿,缺少多场景搭配指引。"],
    ["25–40 岁泛户外人群", "通勤、周末郊游、轻徒步之间的多场景切换。"],
    ["一衣多场景", "用'一衣多穿'的组合,打通户外功能与都市日常。"],
    ["组合卡 + 场景区", "出场景穿搭组合卡 + 功能讲解 + 门店'城市↔山野'搭配区。"],
    ["看连带与复购", "30 天出组合卡,60 天上场景内容,90 天看连带与复购。"],
  ]),
  sap("t8", "lafuma", "乐飞叶户外生活方式内容种草", "内容资产沉淀", "乐飞叶 · 把户外变成可向往的生活方式", [
    ["想户外但不知如何开始", "用户向往户外生活却不知如何开始,品牌的场景与故事未被讲清。"],
    ["向往自然的年轻人", "露营、徒步、城市公园等轻户外场景。"],
    ["先心动,再行动", "用真实的户外生活方式内容,带用户'先心动、再行动'。"],
    ["内容合集 + UGC", "做户外生活内容合集 + UGC 征集 + 门店体验活动。"],
    ["沉淀内容资产", "30 天定内容主题,60 天发起 UGC,90 天沉淀内容资产库。"],
  ]),
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
