import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));
const readJsonArray = (path) => {
  const value = readJson(path);
  if (!Array.isArray(value)) throw new Error(`${path} must contain a JSON array.`);
  return value;
};

const movementSource = readJsonArray("library/movements/bookpath_movements.generated.json");
const readingPathDir = "library/reading path";
const readingPathSourceFiles = readdirSync(join(root, readingPathDir))
  .filter((file) => file.endsWith(".generated.json"))
  .sort((left, right) => {
    if (left === "bookpath_reading_paths.generated.json") return -1;
    if (right === "bookpath_reading_paths.generated.json") return 1;
    return left.localeCompare(right, "zh-CN");
  })
  .map((file) => `${readingPathDir}/${file}`);
const pathSource = readingPathSourceFiles.flatMap(readJsonArray);
const guideSource = readJsonArray("library/work guide/bookpath_work_guides.generated.json");

function stripBookMarks(value) {
  return String(value || "").replace(/^《|》$/g, "").trim();
}

function displayTitle(value) {
  const title = stripBookMarks(value);
  return title ? `《${title}》` : "";
}

function asciiSlug(value, fallback) {
  const ascii = String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return ascii || fallback;
}

function uniqueSlug(base, used) {
  let slug = base;
  let index = 2;
  while (used.has(slug)) {
    slug = `${base}-${index}`;
    index += 1;
  }
  used.add(slug);
  return slug;
}

const movementIdByName = new Map();
const usedMovementIds = new Set();

const movements = movementSource.map((movement, index) => {
  const id = uniqueSlug(asciiSlug(movement.nameOriginal, `movement-${index + 1}`), usedMovementIds);
  movementIdByName.set(movement.nameCn, id);
  return {
    id,
    label: movement.nameCn,
    shortLabel: movement.nameCn.replace(/文学$/, ""),
    kicker: `Movement ${String(index + 1).padStart(2, "0")}`,
    originalName: movement.nameOriginal || movement.nameCn,
    period: movement.period || "待补充",
    region: movement.region || "待补充",
    oneLine: movement.introForBeginner,
    beginnerSummary: movement.introForBeginner,
    whyAppeared: movement.historicalContext || movement.definitionPrecise || movement.introForBeginner,
    definitionPrecise: movement.definitionPrecise || "",
    reactsAgainst: movement.reactsAgainst || "",
    keyFeatures: movement.keyFeatures || [],
    misunderstandings: movement.commonMisunderstandings || [],
    commonMisunderstandings: movement.commonMisunderstandings || [],
    beginnerWarning: movement.beginnerWarning || "建议先从入口作品开始，再进入核心和进阶作品。",
    importance: movement.importance || "",
    relatedMovements: movement.relatedMovements || [],
    feedbackOptions: ["我会先读这本", "我还是不知道先读哪本", "我想看另一个流派"],
    aiGenerated: true,
    reviewStatus: "AI_DRAFT",
    sourceRecommendedWorks: movement.recommendedWorks || []
  };
});
const movementIdByShortLabel = new Map(movements.map((movement) => [movement.shortLabel, movement.id]));

const guideByTitle = new Map();
for (const item of guideSource) {
  const translated = stripBookMarks(item.work?.titleTranslatedCn);
  const original = stripBookMarks(item.work?.titleOriginal);
  if (translated) guideByTitle.set(translated, item);
  if (original) guideByTitle.set(original, item);
}

const usedWorkIds = new Set();
const worksByKey = new Map();
const workKeyByTitle = new Map();

function classifyWork({ movements: movementNames = [], titleTranslatedCn = "", workType = "" }) {
  const joined = movementNames.join(" ");
  if (joined.includes("戏剧") || workType === "DRAMA") return ["戏剧", joined.includes("荒诞") ? "荒诞派戏剧" : "戏剧文学"];
  if (joined.includes("诗歌")) return ["诗歌", "诗歌"];
  if (joined.includes("散文") || joined.includes("非虚构") || joined.includes("纪实")) return ["散文", joined.includes("纪实") ? "纪实文学" : "散文"];
  const subtypePriority = [
    "推理小说",
    "本格推理",
    "硬汉派侦探小说",
    "犯罪小说",
    "科幻文学",
    "硬科幻",
    "软科幻",
    "赛博朋克",
    "魔幻现实主义",
    "现实主义",
    "自然主义",
    "批判现实主义",
    "意识流",
    "存在主义文学",
    "后现代主义",
    "黑色幽默",
    "女性主义文学",
    "后殖民文学",
    "哥特小说",
    "成长小说",
    "乡土文学",
    "城市文学",
    "短篇小说",
    "历史写作",
    "战争文学",
    "儿童文学",
    "寓言文学"
  ];
  const hit = subtypePriority.find((name) => joined.includes(name));
  const normalized = {
    科幻文学: "科幻小说",
    赛博朋克: "科幻小说 / 赛博朋克",
    硬科幻: "硬科幻",
    软科幻: "软科幻",
    现代主义: "现代主义小说",
    意识流: "意识流小说",
    存在主义文学: "存在主义小说",
    后现代主义: "后现代小说",
    魔幻现实主义: "魔幻现实主义小说",
    黑色幽默: "黑色幽默小说",
    女性主义文学: "女性主义小说",
    后殖民文学: "后殖民小说",
    现实主义: "现实主义小说",
    自然主义: "自然主义小说",
    批判现实主义: "批判现实主义小说",
    短篇小说: "短篇小说",
    哥特小说: "哥特小说",
    推理小说: "推理小说",
    本格推理: "本格推理",
    硬汉派侦探小说: "硬汉派侦探小说"
  };
  return ["小说", normalized[hit] || (titleTranslatedCn.includes("诗") ? "诗体小说" : "文学小说")];
}

const authorRegionHints = new Map(
  Object.entries({
    "鲁迅": "中国",
    "巴金": "中国",
    "茅盾": "中国",
    "老舍": "中国",
    "沈从文": "中国",
    "萧红": "中国",
    "张爱玲": "中国",
    "钱锺书": "中国",
    "莫言": "中国",
    "余华": "中国",
    "王小波": "中国",
    "王安忆": "中国",
    "苏童": "中国",
    "阿城": "中国",
    "韩少功": "中国",
    "贾平凹": "中国",
    "路遥": "中国",
    "陈忠实": "中国",
    "迟子建": "中国",
    "刘慈欣": "中国",
    "刘震云": "中国",
    "毕飞宇": "中国",
    "汪曾祺": "中国",
    "徐则臣": "中国",
    "张炜": "中国",
    "李洱": "中国",
    "阿来": "中国",
    "金宇澄": "中国",
    "刘心武": "中国",
    "古华": "中国",
    "卢新华": "中国",
    "夏目漱石": "日本",
    "芥川龙之介": "日本",
    "川端康成": "日本",
    "太宰治": "日本",
    "三岛由纪夫": "日本",
    "大江健三郎": "日本",
    "安部公房": "日本",
    "村上春树": "日本",
    "村田沙耶香": "日本",
    "小川洋子": "日本",
    "谷崎润一郎": "日本",
    "东野圭吾": "日本",
    "松本清张": "日本",
    "岛田庄司": "日本",
    "京极夏彦": "日本",
    "宫部美雪": "日本",
    "绫辻行人": "日本",
    "韩江": "韩国",
    "丹尼尔·笛福": "英国",
    "乔治·奥威尔": "英国",
    "乔治·艾略特": "英国",
    "乔纳森·斯威夫特": "爱尔兰 / 英国",
    "夏洛蒂·勃朗特": "英国",
    "艾米莉·勃朗特": "英国",
    "查尔斯·狄更斯": "英国",
    "托马斯·哈代": "英国",
    "E·M·福斯特": "英国",
    "弗吉尼亚·伍尔夫": "英国",
    "威廉·戈尔丁": "英国",
    "石黑一雄": "英国",
    "希拉里·曼特尔": "英国",
    "奥斯卡·王尔德": "爱尔兰",
    "詹姆斯·乔伊斯": "爱尔兰",
    "萨缪尔·贝克特": "爱尔兰",
    "布拉姆·斯托克": "爱尔兰",
    "威尔基·柯林斯": "英国",
    "阿瑟·柯南·道尔": "英国",
    "柯南·道尔": "英国",
    "J·R·R·托尔金": "英国",
    "J·K·罗琳": "英国",
    "C·S·刘易斯": "英国",
    "玛丽·雪莱": "英国",
    "阿道司·赫胥黎": "英国",
    "阿瑟·C·克拉克": "英国",
    "威廉·莎士比亚": "英国",
    "莎士比亚": "英国",
    "马克·吐温": "美国",
    "杰克·伦敦": "美国",
    "F·斯科特·菲茨杰拉德": "美国",
    "菲茨杰拉德": "美国",
    "欧内斯特·海明威": "美国",
    "海明威": "美国",
    "威廉·福克纳": "美国",
    "约翰·斯坦贝克": "美国",
    "J·D·塞林格": "美国",
    "哈珀·李": "美国",
    "托妮·莫里森": "美国",
    "艾丽斯·沃克": "美国",
    "科马克·麦卡锡": "美国",
    "唐娜·塔特": "美国",
    "雷·布拉德伯里": "美国",
    "菲利普·K·迪克": "美国",
    "厄休拉·K·勒古恩": "美国",
    "厄休拉·勒古恩": "美国",
    "库尔特·冯内古特": "美国",
    "弗兰克·赫伯特": "美国",
    "达希尔·哈米特": "美国",
    "雷蒙德·钱德勒": "美国",
    "帕特里夏·海史密斯": "美国",
    "杜鲁门·卡波特": "美国",
    "斯蒂芬·金": "美国",
    "阿瑟·米勒": "美国",
    "艾米莉·狄金森": "美国",
    "惠特曼": "美国",
    "艾萨克·阿西莫夫": "美国",
    "安迪·威尔": "美国",
    "奥克塔维娅·巴特勒": "美国",
    "金·斯坦利·罗宾逊": "美国",
    "埃德加·爱伦·坡": "美国",
    "奥诺雷·德·巴尔扎克": "法国",
    "巴尔扎克": "法国",
    "司汤达": "法国",
    "维克多·雨果": "法国",
    "居斯塔夫·福楼拜": "法国",
    "福楼拜": "法国",
    "埃米尔·左拉": "法国",
    "让-保罗·萨特": "法国",
    "阿尔贝·加缪": "法国",
    "安托万·德·圣-埃克苏佩里": "法国",
    "圣埃克苏佩里": "法国",
    "夏尔·波德莱尔": "法国",
    "兰波": "法国",
    "安德烈·布勒东": "法国",
    "娜塔莉·萨洛特": "法国",
    "阿兰·罗伯-格里耶": "法国",
    "米歇尔·布托尔": "法国",
    "列夫·托尔斯泰": "俄国",
    "费奥多尔·陀思妥耶夫斯基": "俄国",
    "陀思妥耶夫斯基": "俄国",
    "契诃夫": "俄国",
    "米哈伊尔·布尔加科夫": "俄罗斯",
    "布尔加科夫": "俄罗斯",
    "亚历山大·索尔仁尼琴": "俄罗斯",
    "索尔仁尼琴": "俄罗斯",
    "伊塔洛·卡尔维诺": "意大利",
    "翁贝托·埃科": "意大利",
    "普里莫·莱维": "意大利",
    "米格尔·德·塞万提斯": "西班牙",
    "豪尔赫·路易斯·博尔赫斯": "阿根廷",
    "胡利奥·科塔萨尔": "阿根廷",
    "罗贝托·波拉尼奥": "智利",
    "聂鲁达": "智利",
    "加西亚·马尔克斯": "哥伦比亚",
    "伊莎贝尔·阿连德": "智利",
    "胡安·鲁尔福": "墨西哥",
    "若泽·萨拉马戈": "葡萄牙",
    "赫尔曼·黑塞": "德国 / 瑞士",
    "约翰·沃尔夫冈·冯·歌德": "德国",
    "歌德": "德国",
    "君特·格拉斯": "德国",
    "弗兰茨·卡夫卡": "捷克 / 德语",
    "阿尔弗雷德·德布林": "德国",
    "温弗里德·塞巴尔德": "德国",
    "托马斯·曼": "德国",
    "易卜生": "挪威",
    "斯坦尼斯瓦夫·莱姆": "波兰",
    "维托尔德·贡布罗维奇": "波兰",
    "钦努阿·阿契贝": "尼日利亚",
    "奇玛曼达·恩戈齐·阿迪契": "尼日利亚",
    "阿兰达蒂·洛伊": "印度",
    "萨尔曼·拉什迪": "英国 / 印度",
    "裘帕·拉希莉": "美国 / 印度",
    "玛格丽特·阿特伍德": "加拿大",
    "迈克尔·翁达杰": "加拿大",
    "布莱恩·奥尔迪斯": "英国"
  })
);

function inferCountryOrRegion(input) {
  const explicit = input.countryOrRegion || input.country;
  if (explicit) return explicit;
  const author = input.authorName || input.author || input.authorNameCn || "";
  return authorRegionHints.get(author) || "待补充";
}

function upsertWork(input) {
  const original = stripBookMarks(input.titleOriginal);
  const translated = stripBookMarks(input.titleTranslatedCn);
  const key = `${original || translated}::${translated || original}`;
  if (!original && !translated) return null;
  if (worksByKey.has(key)) return worksByKey.get(key);

  const [literaryCategory, literarySubcategory] = classifyWork(input);
  const id = uniqueSlug(asciiSlug(original || translated, `work-${worksByKey.size + 1}`), usedWorkIds);
  const work = {
    id,
    slug: id,
    titleOriginal: original || translated,
    titleTranslatedCn: translated || null,
    titleDisplayCn: displayTitle(translated || original),
    authorName: input.authorName || input.author || input.authorNameCn || "待补充",
    originalLanguage: input.originalLanguage || null,
    countryOrRegion: inferCountryOrRegion(input),
    firstPublishedYear: input.firstPublishedYear || input.year || null,
    workType: input.workType || (literaryCategory === "戏剧" ? "DRAMA" : "NOVEL"),
    literaryCategory,
    literarySubcategory,
    movementIds: [],
    guideCardIds: [],
    beginnerEntry: Boolean(input.beginnerEntry),
    difficultyLevel: input.difficultyLevel || 3
  };
  worksByKey.set(key, work);
  if (original) workKeyByTitle.set(original, key);
  if (translated) workKeyByTitle.set(translated, key);
  return work;
}

for (const item of guideSource) {
  const movementNames = item.work?.movements || [];
  const work = upsertWork({
    ...item.work,
    authorName: item.work?.author,
    firstPublishedYear: item.work?.year,
    movements: movementNames,
    difficultyLevel: item.guideCard?.difficultyLevel,
    beginnerEntry: item.guideCard?.beginnerEntry
  });
  if (!work) continue;
  for (const name of movementNames) {
    const movementId = movementIdByName.get(name);
    if (movementId && !work.movementIds.includes(movementId)) work.movementIds.push(movementId);
  }
}

for (const movement of movementSource) {
  const movementId = movementIdByName.get(movement.nameCn);
  for (const item of movement.recommendedWorks || []) {
    const work = upsertWork({
      ...item,
      authorName: item.authorNameCn,
      movements: [movement.nameCn],
      difficultyLevel: item.difficultyLevel,
      beginnerEntry: item.role === "ENTRY"
    });
    if (work && movementId && !work.movementIds.includes(movementId)) work.movementIds.push(movementId);
  }
}

for (const path of pathSource) {
  for (const step of path.steps || []) {
    upsertWork({
      ...step,
      movements: [],
      difficultyLevel: step.roleInPath === "ENTRY" ? 1 : step.roleInPath === "FOUNDATION" ? 2 : 3
    });
  }
}

function findWork(titleOriginal, titleTranslatedCn) {
  const translated = stripBookMarks(titleTranslatedCn);
  const original = stripBookMarks(titleOriginal);
  return worksByKey.get(workKeyByTitle.get(translated)) || worksByKey.get(workKeyByTitle.get(original)) || null;
}

const guideCards = [];
for (const item of guideSource) {
  const work = findWork(item.work?.titleOriginal, item.work?.titleTranslatedCn);
  if (!work) continue;
  const guideId = `${work.id}-guide`;
  work.guideCardIds.push(guideId);
  work.beginnerEntry = work.beginnerEntry || Boolean(item.guideCard?.beginnerEntry);
  work.difficultyLevel = Math.min(work.difficultyLevel || 5, item.guideCard?.difficultyLevel || 3);
  guideCards.push({
    id: guideId,
    workId: work.id,
    oneSentencePositioning: item.guideCard?.oneSentencePositioning || "",
    whyClassic: item.guideCard?.whyClassic || "",
    whyRead: item.guideCard?.whyRead || "",
    suitableFor: item.guideCard?.suitableFor || "",
    notSuitableFor: item.guideCard?.notSuitableFor || "",
    difficultyLevel: item.guideCard?.difficultyLevel || work.difficultyLevel || 3,
    difficultyReason: item.guideCard?.difficultyReason || "",
    readingPrerequisites: item.guideCard?.readingPrerequisites || "",
    readingAdvice: item.guideCard?.readingAdvice || "",
    beginnerEntry: Boolean(item.guideCard?.beginnerEntry),
    nextWorks: item.guideCard?.nextWorks || [],
    easierAlternatives: item.guideCard?.easierAlternatives || [],
    advancedAlternatives: item.guideCard?.advancedAlternatives || [],
    aiGenerated: true,
    reviewStatus: "AI_DRAFT"
  });
}

const pathRoles = ["ENTRY", "FOUNDATION", "CORE", "ADVANCED", "EXPANSION"];

const usedReadingPathSlugs = new Set();
const readingPaths = pathSource.map((path, index) => {
  const slug = uniqueSlug(asciiSlug(path.title, `path-${index + 1}`), usedReadingPathSlugs);
  const pathBaseName = path.title.replace(/文学入门$/, "").replace(/入门$/, "");
  const movementId = movementIdByName.get(path.title)
    || movementIdByName.get(pathBaseName)
    || movementIdByName.get(`${pathBaseName}文学`)
    || movementIdByShortLabel.get(pathBaseName)
    || null;
  const type = path.title.includes("奖") ? "AWARD" : path.title.includes("外国") || path.title.includes("中国") ? "REGION" : path.title.includes("推理") || path.title.includes("科幻") || path.title.includes("哥特") ? "GENRE" : "BEGINNER";
  const steps = (path.steps || []).map((step, stepIndex) => {
    const work = findWork(step.titleOriginal, step.titleTranslatedCn);
    return {
      id: `${slug}-step-${step.stepOrder || stepIndex + 1}`,
      pathId: `${slug}-path`,
      workId: work?.id || null,
      titleOriginal: stripBookMarks(step.titleOriginal),
      titleTranslatedCn: stripBookMarks(step.titleTranslatedCn),
      title: displayTitle(step.titleTranslatedCn || step.titleOriginal),
      summary: step.reason,
      order: step.stepOrder || stepIndex + 1,
      stepOrder: step.stepOrder || stepIndex + 1,
      roleInPath: step.roleInPath || pathRoles[Math.min(stepIndex, pathRoles.length - 1)],
      reason: step.reason,
      skippable: Boolean(step.skipAllowed),
      skipAllowed: Boolean(step.skipAllowed),
      alternativeTitle: step.alternativeTitle || "",
      work: work || null
    };
  });
  return {
    id: `${slug}-path`,
    slug,
    title: path.title,
    description: path.description,
    intro: path.description,
    targetReader: path.targetReader || "中文文学读者",
    type,
    pathType: type,
    movementId,
    difficultyStart: path.difficultyStart || 1,
    difficultyEnd: path.difficultyEnd || 5,
    difficultyRange: `${path.difficultyStart || 1}-${path.difficultyEnd || 5}`,
    workCount: steps.length,
    estimatedBookCount: steps.length,
    steps,
    aiGenerated: true,
    reviewStatus: "AI_DRAFT"
  };
});

for (const movement of movements) {
  const sourceWorks = movement.sourceRecommendedWorks || [];
  const pathId = `${movement.id}-recommended-path`;
  const movementCards = sourceWorks.map((item, index) => {
    const work = findWork(item.titleOriginal, item.titleTranslatedCn);
    const guide = guideByTitle.get(stripBookMarks(item.titleTranslatedCn)) || guideByTitle.get(stripBookMarks(item.titleOriginal));
    return {
      id: `${movement.id}-guide-${index + 1}`,
      movementId: movement.id,
      pathId,
      workId: work?.id || null,
      role: `${item.role || pathRoles[Math.min(index, pathRoles.length - 1)]} / ${index === 0 ? "第一本" : "推荐"}`,
      roleInPath: item.role || pathRoles[Math.min(index, pathRoles.length - 1)],
      title: displayTitle(item.titleTranslatedCn || item.titleOriginal),
      suitability: item.reason || guide?.guideCard?.suitableFor || "适合按路径阅读。",
      nextStep: sourceWorks[index + 1] ? `下一步读${displayTitle(sourceWorks[index + 1].titleTranslatedCn || sourceWorks[index + 1].titleOriginal)}` : "读完后可进入相邻流派或更高难度作品。",
      caution: (item.difficultyLevel || 3) >= 5,
      difficultyLevel: item.difficultyLevel || guide?.guideCard?.difficultyLevel || 3,
      beginnerEntry: item.role === "ENTRY" || (item.difficultyLevel || 3) <= 2,
      details: {
        "这本书在流派里的角色": item.reason || guide?.guideCard?.oneSentencePositioning || "",
        "读前最好知道": guide?.guideCard?.readingPrerequisites || movement.beginnerWarning,
        "为什么排在这个顺序": item.reason || "按入口、基础、核心、进阶的顺序安排。",
        "读完下一步去哪": sourceWorks[index + 1] ? displayTitle(sourceWorks[index + 1].titleTranslatedCn || sourceWorks[index + 1].titleOriginal) : "进入相关路径或相邻流派。"
      }
    };
  });
  movement.guideCards = movementCards;
  movement.pathId = pathId;
  movement.pathSteps = movementCards.map((card, index) => ({
    id: `${movement.id}-step-${index + 1}`,
    movementId: movement.id,
    pathId,
    workId: card.workId,
    title: card.title,
    summary: card.suitability,
    order: index + 1,
    roleInPath: card.roleInPath,
    skippable: index >= 3
  }));
  movement.representativeWorksCount = movementCards.length;
  movement.beginnerFriendly = movementCards.some((card) => card.beginnerEntry) ? "有低门槛入口" : "建议按路径进入";
  delete movement.sourceRecommendedWorks;
}

const works = [...worksByKey.values()].map((work) => ({
  ...work,
  movementIds: work.movementIds.length ? work.movementIds : []
}));

const awards = [
  {
    id: "nobel-literature",
    slug: "nobel-literature",
    titleCn: "诺贝尔文学奖",
    originalName: "Nobel Prize in Literature",
    countryOrRegion: "国际",
    awardType: "综合文学奖",
    beginnerValue: "适合作为外围发现线索，不直接等同于入门顺序"
  },
  {
    id: "booker-prize",
    slug: "booker-prize",
    titleCn: "布克奖",
    originalName: "The Booker Prize",
    countryOrRegion: "英国 / 英语世界",
    awardType: "小说奖",
    beginnerValue: "适合发现当代英语小说，但需要配合难度判断"
  },
  {
    id: "mao-dun-literature-prize",
    slug: "mao-dun-literature-prize",
    titleCn: "茅盾文学奖",
    originalName: "Mao Dun Literature Prize",
    countryOrRegion: "中国",
    awardType: "长篇小说奖",
    beginnerValue: "适合理解中国当代长篇小说，但仍需要难度和题材筛选"
  }
];

const bookPathData = {
  version: "0.3.0-library-import",
  scope: "literature-and-literature-adjacent",
  importedFrom: {
    movements: "library/movements/bookpath_movements.generated.json",
    readingPaths: readingPathSourceFiles,
    workGuides: "library/work guide/bookpath_work_guides.generated.json"
  },
  movements,
  works,
  guideCards,
  readingPaths,
  awards,
  feedbackOptions: ["我会先读这本", "我还是不知道先读哪本", "我想看另一个流派"]
};

const output = `export const bookPathData = ${JSON.stringify(bookPathData, null, 2)} as const;\n\nexport type BookPathData = typeof bookPathData;\nexport type Movement = BookPathData["movements"][number];\nexport type Work = BookPathData["works"][number];\nexport type ReadingPath = BookPathData["readingPaths"][number];\nexport type Award = BookPathData["awards"][number];\n`;

writeFileSync(join(root, "lib/bookpath-data.ts"), output, "utf8");

console.log(`Imported ${movements.length} movements, ${works.length} works, ${guideCards.length} guides, ${readingPaths.length} reading paths.`);
