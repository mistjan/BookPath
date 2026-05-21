// Add classics movement + link classical works to it
import fs from "fs";
const R = fs.readFileSync("lib/bookpath-data.ts", "utf-8");
const O = R.indexOf("{", R.indexOf("export const bookPathData = "));
let d = 0, E = O;
for (let i = O; i < R.length; i++) { if (R[i] === "{") d++; else if (R[i] === "}") { d--; if (d === 0) { E = i + 1; break; } } }
const D = JSON.parse(R.slice(O, E));

// 1. Add "古典文学" movement
const classicsMovement = {
  id: "classics",
  label: "古典文学",
  shortLabel: "古典",
  kicker: "From the Beginning",
  originalName: "Classics",
  period: "公元前8世纪—19世纪",
  region: "全球",
  oneLine: "从荷马到曹雪芹——人类文明最早的故事、史诗和小说。古典文学不是博物馆里的陈列品，而是后来所有文学的源头。",
  beginnerSummary: "古典文学是后来所有文学的源代码。荷马史诗奠定了西方叙事传统，诗经开启了中国诗歌的源流，莎士比亚塑造了英语文学。",
  whyAppeared: "古典文学是各文明在口头传统向文字记录过渡时期产生的核心叙事。它们承担了记录历史、传递价值、解释世界和娱乐听众的多重功能。",
  definitionPrecise: "古典文学广义上指各文化中被公认为奠基性、在时间上较早、对后世产生持续影响的文学作品。",
  reactsAgainst: "古典文学反对的不是某一种文学风格——它在现代小说兴起之前定义了'故事应该怎么讲'。",
  keyFeatures: [
    "以史诗、悲剧、诗歌等传统文体为主",
    "通常承担记录历史、传递道德教训的功能",
    "在各自文化中被视为'经典'并被反复引用",
    "在叙事方式上奠定了后来文学的基本结构"
  ],
  keyFigures: [],
  misunderstandings: [
    "古典文学＝难读＝无聊。实际上荷马史诗是冒险故事，莎士比亚是大众娱乐，聊斋志异是鬼故事集。",
    "古典文学和现代生活无关。实际上我们今天使用的叙事结构、人物类型、情节原型大部分来自古典文学。"
  ],
  importance: "不了解古典文学，就无法真正理解后来的所有文学——因为后来的一切都是对它们的回应、改写或反叛。",
  beginnerValue: "古典文学的最佳入口不是荷马史诗全文——而是从一个现代改编或选段开始，先感受到它们为什么能活这么久。",
  whoShouldRead: "任何一个想理解文学为什么是今天这样子的读者，都应该至少接触几部核心古典作品。",
  limitationNote: "古典作品的语言和叙事节奏和现代小说差异较大，建议从篇幅短、故事性强的作品开始，不必强求一次读完《战争与和平》。",
  relatedMovements: ["realism", "modernism"],
  guideCards: [],
  aiGenerated: true,
  reviewStatus: "AI_DRAFT",
};

if (!D.movements.some(m => m.id === "classics")) {
  D.movements.push(classicsMovement);
  console.log("+ Added '古典文学' movement");
} else {
  console.log("Skip: classics movement already exists");
}

// 2. Link classical works to this movement
const classicsKeywords = ["classics"];
const classicalWorks = D.works.filter(w =>
  w.movementIds &&
  w.movementIds.some(m => classicsKeywords.includes(m))
);
console.log(`Found ${classicalWorks.length} works already tagged as classics`);

// Auto-tag works that should be classics but aren't tagged
const shouldBeClassics = [
  "伊利亚特", "奥德赛", "神曲", "失乐园", "诗经", "楚辞",
  "论语", "孟子", "道德经", "庄子", "史记", "红楼梦",
  "西游记", "三国演义", "水浒传", "金瓶梅", "封神演义",
  "堂吉诃德", "浮士德", "希腊悲剧选", "坎特伯雷故事集",
  "荷马", "莎士比亚", "唐诗三百首", "李太白集", "杜工部集",
  "东坡集", "西厢记", "牡丹亭", "聊斋志异", "儒林外史",
  "镜花缘", "海上花列传", "三言",
];

let tagged = 0;
for (const w of D.works) {
  const shouldTag = shouldBeClassics.some(name =>
    w.titleDisplayCn.includes(name) || w.titleOriginal?.includes(name)
  );
  if (shouldTag && !w.movementIds?.includes("classics")) {
    if (!w.movementIds) w.movementIds = [];
    w.movementIds.push("classics");
    tagged++;
  }
}
console.log(`Tagged ${tagged} works with classics movement`);

// 3. Add guide cards reference for movement page
const classicGuideCards = D.works
  .filter(w => w.movementIds?.includes("classics") && w.guideCardIds?.length)
  .slice(0, 20);

// 4. Update homepage gateways - check current homepage
fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
console.log("\nDone!");
