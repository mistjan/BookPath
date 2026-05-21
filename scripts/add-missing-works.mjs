// Batch add missing works + guide cards to the library
// Run: node scripts/add-missing-works.mjs
// Adds works that exist in award data but are missing from the works library

import fs from "fs";

// ── Load current data ──
const bpRaw = fs.readFileSync("lib/bookpath-data.ts", "utf-8");
const jsonStart = bpRaw.indexOf("export const bookPathData = ");
const objStart = bpRaw.indexOf("{", jsonStart);
let depth = 0, jsonEnd = objStart;
for (let i = objStart; i < bpRaw.length; i++) {
  if (bpRaw[i] === "{") depth++;
  else if (bpRaw[i] === "}") { depth--; if (depth === 0) { jsonEnd = i + 1; break; } }
}
const data = JSON.parse(bpRaw.slice(objStart, jsonEnd));

// ── Works to add ──
// Format: { work fields, guideCard fields }
const newEntries = [
  // ═══ 布克奖获奖作品 ═══
  {
    work: {
      id: "midnights-children",
      slug: "midnights-children",
      titleDisplayCn: "午夜之子",
      titleOriginal: "Midnight's Children",
      authorName: "萨尔曼·鲁西迪",
      countryOrRegion: "英国/印度",
      firstPublishedYear: 1981,
      literaryCategory: "小说",
      literarySubcategory: "魔幻现实主义",
      workType: "长篇小说",
      difficultyLevel: 4,
      beginnerEntry: false,
      movementIds: ["magical-realism", "postcolonial"],
    },
    guide: {
      roleInPath: "CORE",
      suitability: "建议已有魔幻现实主义阅读经验后再读",
      oneSentencePositioning: "以印度独立为背景，用魔幻现实主义手法将个人命运与国家历史交织在一起。",
      whyClassic: "1981年布克奖获奖作品，1993年和2008年两次被选为'布克奖之布克奖'（布克奖50年最佳小说）。它重新定义了英语小说叙事的可能性，将印度次大陆的现代史转化为一个家庭的魔幻寓言。",
      whyRead: "它提供了理解印度独立以来复杂历史的文学入口——不是通过教科书，而是通过一个和印度同一天出生的男孩的神奇人生。叙事密度极高，语言充满活力。",
      suitableFor: "适合有一定魔幻现实主义阅读基础、对印度历史和文化感兴趣、喜欢密集叙事的读者。",
      notSuitableFor: "不适合完全没接触过魔幻现实主义或非线性叙事的读者。篇幅较长（500+页），人物众多。",
      difficultyLevel: 4,
      difficultyReason: "叙事非线形、人物关系复杂、大量印度历史和文化典故需要背景理解。鲁西迪的语言密度高，包含多种语言游戏。",
      readingPrerequisites: "建议先读过《百年孤独》或其他魔幻现实主义作品，对印度近代史（独立、印巴分治）有基本了解。",
      readingAdvice: "不必强求一次读懂所有隐喻。先跟着故事走，感受语言的力量。建议配合印度近代史年表阅读。",
      beginnerEntry: false,
    },
  },
  {
    work: {
      id: "the-english-patient",
      slug: "the-english-patient",
      titleDisplayCn: "英国病人",
      titleOriginal: "The English Patient",
      authorName: "迈克尔·翁达杰",
      countryOrRegion: "加拿大",
      firstPublishedYear: 1992,
      literaryCategory: "小说",
      literarySubcategory: "文学小说",
      workType: "长篇小说",
      difficultyLevel: 3,
      beginnerEntry: false,
      movementIds: ["postmodernism"],
    },
    guide: {
      roleInPath: "CORE",
      suitability: "适合已养成文学阅读习惯的读者",
      oneSentencePositioning: "二战废墟中，四个受伤的人在意大利修道院里拼凑记忆与身份。",
      whyClassic: "1992年布克奖获奖作品，2018年被选为'金布克奖'（布克奖50周年最佳小说）。它将战争创伤、殖民历史和个人的爱情故事以碎片化叙事融合，是后殖民文学的代表作之一。",
      whyRead: "它不按时间顺序讲故事，而是像拼图一样慢慢展开四个角色的过去。翁达杰的语言是诗性的——他不是在叙述，而是在描绘记忆的质感。",
      suitableFor: "适合喜欢诗意语言、非线性叙事、对二战和殖民历史有兴趣的读者。",
      notSuitableFor: "不适合期望线性情节、快节奏故事或明确结局的读者。战争场景有直接的残酷描写。",
      difficultyLevel: 3,
      difficultyReason: "碎片化叙事需要读者自己拼凑情节。语言偏诗性，并非直白叙述。但篇幅适中（约300页），人物关系不复杂。",
      readingPrerequisites: "不需要特殊知识储备。对二战北非战场的基本了解有助于进入氛围。",
      readingAdvice: "注意四个叙述者的切换。如果觉得散乱，可以当作诗集来读——先感受语言，情节自然会浮现。",
      beginnerEntry: false,
    },
  },
  {
    work: {
      id: "the-remains-of-the-day",
      slug: "the-remains-of-the-day",
      titleDisplayCn: "长日将尽",
      titleOriginal: "The Remains of the Day",
      authorName: "石黑一雄",
      countryOrRegion: "英国/日本",
      firstPublishedYear: 1989,
      literaryCategory: "小说",
      literarySubcategory: "文学小说",
      workType: "长篇小说",
      difficultyLevel: 2,
      beginnerEntry: true,
      movementIds: ["modernism"],
    },
    guide: {
      roleInPath: "ENTRY",
      suitability: "适合作为现代主义/文学小说入口",
      oneSentencePositioning: "一个英国老管家在自驾旅行中回忆自己的一生，逐渐意识到他为了职业尊严牺牲了什么。",
      whyClassic: "1989年布克奖获奖作品。石黑一雄以极克制的第一人称叙事，让读者从一个不可靠叙述者的自述中读到比他说出来的更多的东西。这是'少即是多'叙事的典范。",
      whyRead: "表面上是一个老管家的旅行见闻，实际上是对帝国黄昏、个人忠诚与道德盲区的深刻反思。它让读者自己发现叙述者在回避什么——这种阅读体验本身就是一种教育。",
      suitableFor: "适合喜欢细腻心理描写、对英国历史和阶级制度有兴趣、愿意从字里行间读故事的读者。篇幅适中（约250页）。",
      notSuitableFor: "不适合期望快节奏、强情节或明确戏剧冲突的读者。叙事冷静克制，没有激烈场面。",
      difficultyLevel: 2,
      difficultyReason: "叙事线索清晰：一次驾车旅行串联回忆。语言平实流畅，没有复杂词汇或句式。深层主题（自欺、忠诚、帝国衰落）需要一定的生活阅历才能充分体会，但故事表层很容易进入。",
      readingPrerequisites: "不需要特殊知识储备。对二战前英国贵族庄园文化有一些了解会有帮助，但不是必须。",
      readingAdvice: "注意叙述者说的话和他没说的话之间的差距。老管家史蒂文斯的克制本身就是故事的核心——他越平静，越值得关注。",
      beginnerEntry: true,
    },
  },
  {
    work: {
      id: "life-of-pi",
      slug: "life-of-pi",
      titleDisplayCn: "少年Pi的奇幻漂流",
      titleOriginal: "Life of Pi",
      authorName: "扬·马特尔",
      countryOrRegion: "加拿大",
      firstPublishedYear: 2001,
      literaryCategory: "小说",
      literarySubcategory: "冒险/寓言",
      workType: "长篇小说",
      difficultyLevel: 2,
      beginnerEntry: true,
      movementIds: [],
    },
    guide: {
      roleInPath: "ENTRY",
      suitability: "适合作为文学阅读入口，情节吸引人",
      oneSentencePositioning: "一个印度少年和一只孟加拉虎在救生艇上共处227天的故事。",
      whyClassic: "2002年布克奖获奖作品。它在冒险故事的外壳下包裹着一个关于信仰、生存和叙事的哲学寓言。表面上是'少年与虎海上漂流'，实际上在追问：你相信哪个版本的故事？",
      whyRead: "故事性极强，容易进入，但读完会让你思考。它在冒险、奇幻和哲学之间取得了罕见的平衡——既可以当作精彩的海难生存故事读，也可以当作关于信仰的隐喻。",
      suitableFor: "适合所有层次的读者。喜欢冒险故事的人可以享受表层叙事，愿意深读的人可以探讨宗教和哲学层面。",
      notSuitableFor: "可能有动物死亡场景，对动物受苦敏感的读者需要注意。",
      difficultyLevel: 2,
      difficultyReason: "叙事主线清楚（海上漂流），语言直接生动。哲学宗教讨论部分集中在结尾，读者可以选择读到什么深度。整体阅读门槛低。",
      readingPrerequisites: "不需要任何知识储备。",
      readingAdvice: "先当作冒险故事读，享受它。读完后再想想第二个版本的故事——那是作者真正想让你思考的问题。",
      beginnerEntry: true,
    },
  },
  {
    work: {
      id: "the-sense-of-an-ending",
      slug: "the-sense-of-an-ending",
      titleDisplayCn: "终结的感觉",
      titleOriginal: "The Sense of an Ending",
      authorName: "朱利安·巴恩斯",
      countryOrRegion: "英国",
      firstPublishedYear: 2011,
      literaryCategory: "小说",
      literarySubcategory: "文学小说",
      workType: "长篇小说",
      difficultyLevel: 2,
      beginnerEntry: true,
      movementIds: ["postmodernism"],
    },
    guide: {
      roleInPath: "ENTRY",
      suitability: "适合作为后现代小说入口",
      oneSentencePositioning: "一个退休男人在收到一笔意外遗产后，被迫重新审视年轻时一段模糊记忆。",
      whyClassic: "2011年布克奖获奖作品。篇幅仅150页，是布克奖历史上最短的获奖小说之一。它在极短的篇幅内探讨了记忆的不可靠性和自我欺骗的主题。",
      whyRead: "篇幅短、叙事直接，但内涵丰富。它展示了小说如何用最简单的故事讨论最复杂的问题——我们如何编造自己的过去。",
      suitableFor: "适合阅读时间有限、但想接触严肃文学主题的读者。对心理学和记忆主题有兴趣的人会特别喜欢。",
      notSuitableFor: "不适合期望大情节或众多人物的读者。故事平静，没有戏剧性事件。",
      difficultyLevel: 2,
      difficultyReason: "篇幅极短（150页），叙事流畅。主题需要一些生活阅历才能充分体会，但故事本身容易理解。",
      readingPrerequisites: "不需要。",
      readingAdvice: "注意第一部分的校园生活和第二部分之间的时间跳跃。关键信息隐藏在日常细节中。读完后值得重读一遍。",
      beginnerEntry: true,
    },
  },

  // ═══ 永远的战争 ═══
  {
    work: {
      id: "the-forever-war",
      slug: "the-forever-war",
      titleDisplayCn: "永远的战争",
      titleOriginal: "The Forever War",
      authorName: "乔·霍尔德曼",
      countryOrRegion: "美国",
      firstPublishedYear: 1974,
      literaryCategory: "小说",
      literarySubcategory: "科幻小说",
      workType: "长篇小说",
      difficultyLevel: 2,
      beginnerEntry: true,
      movementIds: ["science-fiction"],
    },
    guide: {
      roleInPath: "ENTRY",
      suitability: "适合作为科幻小说入门",
      oneSentencePositioning: "一名士兵参加星际战争，每次任务回来地球都过去了数十年。",
      whyClassic: "1975年同时获得雨果奖和星云奖，是科幻史上极少数双料获奖作品之一。它以科幻的外壳探讨了战争、军队体制和回家困境——本质上是越战一代的寓言。",
      whyRead: "故事线清楚：入伍→训练→参战→回家。但每次任务归来，地球社会都变得更陌生。这种'回家比战场更可怕'的体验，是其他战争文学很少触及的。",
      suitableFor: "适合喜欢科幻设定的普通读者。对军事SF有兴趣的读者会特别喜欢。篇幅适中（约250页）。",
      notSuitableFor: "不适合完全排斥军事题材的读者。",
      difficultyLevel: 2,
      difficultyReason: "叙事是线性时间顺序，语言直白。科幻设定（超光速旅行、时间膨胀）是常见的SF元素，不需要专业知识。深层主题需要一些生活阅历，但故事本身很容易进入。",
      readingPrerequisites: "不需要。对狭义相对论的时间膨胀效应有基本了解会更好，但不是必须。",
      readingAdvice: "注意主角每次回家时地球社会的变化——这是小说的核心，比战斗场景更重要。",
      beginnerEntry: true,
    },
  },

  // ═══ 安德的游戏 ═══
  {
    work: {
      id: "enders-game",
      slug: "enders-game",
      titleDisplayCn: "安德的游戏",
      titleOriginal: "Ender's Game",
      authorName: "奥森·斯科特·卡德",
      countryOrRegion: "美国",
      firstPublishedYear: 1985,
      literaryCategory: "小说",
      literarySubcategory: "科幻小说",
      workType: "长篇小说",
      difficultyLevel: 2,
      beginnerEntry: true,
      movementIds: ["science-fiction"],
    },
    guide: {
      roleInPath: "ENTRY",
      suitability: "适合作为科幻小说入门，青少年也可读",
      oneSentencePositioning: "一个天才儿童被送到太空军事学校，以为自己是在玩游戏，实际上在指挥一场真实的战争。",
      whyClassic: "1986年同时获得雨果奖和星云奖。它以一个孩子的视角探讨了暴力、共情和道德责任——读者会被带入主角的困境，最后才发现自己被作者引导着接受了多么残酷的设定。",
      whyRead: "叙事节奏极好，让人放不下。主角是个孩子，但他的处境和选择涉及成人世界的复杂伦理问题。悬念保持到最后。",
      suitableFor: "适合所有层次的读者，包括青少年。喜欢战略游戏、对心理学有兴趣的读者会特别投入。",
      notSuitableFor: "对暴力敏感或期望纯温情故事的读者需要注意——结局有道德冲击。",
      difficultyLevel: 2,
      difficultyReason: "语言流畅，故事驱动，阅读体验接近通俗小说。角色主要是孩子，对话自然。伦理思考部分融入情节，不突兀。",
      readingPrerequisites: "不需要。",
      readingAdvice: "不要提前知道结局。跟着主角一起发现真相——这种'发现'本身就是小说设计的一部分。",
      beginnerEntry: true,
    },
  },

  // ═══ 人世间 ═══
  {
    work: {
      id: "ren-shi-jian",
      slug: "ren-shi-jian",
      titleDisplayCn: "人世间",
      titleOriginal: "人世间",
      authorName: "梁晓声",
      countryOrRegion: "中国",
      firstPublishedYear: 2017,
      literaryCategory: "小说",
      literarySubcategory: "现实主义小说",
      workType: "长篇小说",
      difficultyLevel: 2,
      beginnerEntry: true,
      movementIds: ["realism"],
    },
    guide: {
      roleInPath: "ENTRY",
      suitability: "适合作为中国当代文学入口",
      oneSentencePositioning: "一个东北工人家庭五十年的生活变迁。",
      whyClassic: "2019年茅盾文学奖获奖作品。它用三代人的命运串起了中国从文革到新世纪的社会变革，是近十年最重要的现实主义长篇小说之一。",
      whyRead: "它写的是普通人——不是英雄或精英，而是东北老工业区的工人、教师和小生意人。这种'普通人视角'让当代读者更容易理解父母一辈的处境和选择。",
      suitableFor: "适合想了解中国当代社会变迁的读者。对家族史、年代叙事有兴趣的人会喜欢。叙事亲切，没有阅读门槛。",
      notSuitableFor: "篇幅较长（三卷本），不适合只想快速阅读的读者。",
      difficultyLevel: 2,
      difficultyReason: "语言平实流畅，时间线清晰，人物关系不复杂。虽然篇幅长，但叙事驱动，容易跟进。",
      readingPrerequisites: "不需要。对中国当代史（文革、改革开放）的基本了解有助于理解背景。",
      readingAdvice: "可以当作一个家庭的编年史来读。注意每个年代的社会氛围变化——这是小说的真正主角。",
      beginnerEntry: true,
    },
  },

  // ═══ 普利策小说奖 ═══
  {
    work: {
      id: "the-goldfinch",
      slug: "the-goldfinch",
      titleDisplayCn: "金翅雀",
      titleOriginal: "The Goldfinch",
      authorName: "唐娜·塔特",
      countryOrRegion: "美国",
      firstPublishedYear: 2013,
      literaryCategory: "小说",
      literarySubcategory: "成长小说",
      workType: "长篇小说",
      difficultyLevel: 3,
      beginnerEntry: false,
      movementIds: ["realism"],
    },
    guide: {
      roleInPath: "CORE",
      suitability: "适合已有长篇阅读习惯的读者",
      oneSentencePositioning: "一个男孩在博物馆爆炸中失去了母亲，却偷走了一幅名画——这个决定影响了他此后的人生。",
      whyClassic: "2014年普利策小说奖获奖作品。它将古典的成长小说传统与当代纽约和欧洲的艺术世界结合，用一个惊悚情节的外壳包裹了一个关于美、 loss 和救赎的严肃主题。",
      whyRead: "叙事能力极强——塔特能用几百页篇幅让你完全沉浸在主角的世界里。它既有文学奖作品应有的深度，又有让人放不下的情节张力。",
      suitableFor: "适合不害怕长篇（约800页）、喜欢沉浸式阅读体验、对艺术和纽约生活感兴趣的读者。",
      notSuitableFor: "篇幅极长，不适合阅读时间有限或耐心不足的读者。某些部分节奏较慢。",
      difficultyLevel: 3,
      difficultyReason: "篇幅长（约800页）是主要门槛。语言是流畅的当代英语/中文叙事，没有复杂句式。结构是传统的线性叙事。深度主题（艺术与 loss、命运与选择）需要读者有一定思考意愿。",
      readingPrerequisites: "不需要艺术史知识。小说本身会交代所需的背景。",
      readingAdvice: "前100页是故事的关键——熬过开头博物馆爆炸的场景，就会进入一个充满悬念的叙事。把它当作一本「有文学分量的畅销书」来读。",
      beginnerEntry: false,
    },
  },
];

// ── Append to data ──
let addedWorks = 0;
let addedGuides = 0;

for (const entry of newEntries) {
  // Check if already exists
  if (data.works.some((w) => w.slug === entry.work.slug)) {
    console.log(`Skipping ${entry.work.slug}: already exists`);
    continue;
  }

  const workId = entry.work.id;
  const guideId = `guide-${workId}`;

  // Add work
  data.works.push({
    ...entry.work,
    id: workId,
    guideCardIds: [guideId],
  });
  addedWorks++;

  // Add guide card
  data.guideCards.push({
    id: guideId,
    workId: workId,
    title: entry.work.titleDisplayCn,
    ...entry.guide,
    aiGenerated: false,
    reviewStatus: "AI_DRAFT",
  });
  addedGuides++;
}

// ── Write back ──
const jsonStr = JSON.stringify(data, null, 2);
const before = bpRaw.slice(0, objStart);
const after = bpRaw.slice(jsonEnd);
fs.writeFileSync("lib/bookpath-data.ts", before + jsonStr + after, "utf-8");

console.log(`\nAdded ${addedWorks} works + ${addedGuides} guide cards`);
console.log(`Total works: ${data.works.length}`);
console.log(`Total guide cards: ${data.guideCards.length}`);
