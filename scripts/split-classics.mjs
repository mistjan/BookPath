// Split classics movement into Chinese + Western
import fs from "fs";
const R = fs.readFileSync("lib/bookpath-data.ts", "utf-8");
const O = R.indexOf("{", R.indexOf("export const bookPathData = "));
let d = 0, E = O;
for (let i = O; i < R.length; i++) { if (R[i] === "{") d++; else if (R[i] === "}") { d--; if (d === 0) { E = i + 1; break; } } }
const D = JSON.parse(R.slice(O, E));

// Helper
function hasMov(w, id) { return w.movementIds && w.movementIds.includes(id); }

// 1. Remove old "classics" movement
const oldIdx = D.movements.findIndex(m => m.id === "classics");
if (oldIdx >= 0) {
  D.movements.splice(oldIdx, 1);
  console.log("Removed old '古典文学' movement");
}

// 2. Define which works belong where
const chineseTitles = [
  "诗经","楚辞","论语","庄子","史记","红楼梦","西游记","三国演义","水浒传",
  "道德经","孟子","孙子兵法","世说新语","唐诗三百首",
  "李太白集","杜工部集","东坡集",
  "西厢记","牡丹亭",
  "聊斋志异","儒林外史","金瓶梅","三言","封神演义","镜花缘","海上花列传"
];
const westernTitles = [
  "伊利亚特","奥德赛","神曲","失乐园","堂吉诃德","浮士德",
  "希腊悲剧选","坎特伯雷故事集",
  "莎士比亚悲剧选","麦克白","罗密欧与朱丽叶","奥赛罗"
];
const japaneseTitles = ["源氏物语","平家物语"];

// 3. Retag works
let cnTagged = 0, weTagged = 0;
for (const w of D.works) {
  const name = w.titleDisplayCn.replace(/[《》]/g, "");
  if (chineseTitles.includes(name) && !hasMov(w, "chinese-classics")) {
    if (!w.movementIds) w.movementIds = [];
    w.movementIds.push("chinese-classics");
    cnTagged++;
  }
  if (westernTitles.includes(name) && !hasMov(w, "western-classics")) {
    if (!w.movementIds) w.movementIds = [];
    w.movementIds.push("western-classics");
    weTagged++;
  }
  // Remove old classics tag
  if (w.movementIds) {
    w.movementIds = w.movementIds.filter(m => m !== "classics");
  }
}
console.log(`Tagged ${cnTagged} Chinese classics, ${weTagged} Western classics`);

// 4. Add Chinese classics movement
D.movements.push({
  id: "chinese-classics", label: "中国古典文学", shortLabel: "中国古典",
  originalName: "Chinese Classics",
  period: "公元前11世纪—18世纪", region: "中国",
  oneLine: "从诗经到红楼梦——三千年中国文学的脉络。不是博物馆里的陈列品，而是今天中国人文化基因的来源。",
  beginnerSummary: "诗经的'关关雎鸠'、唐诗的'床前明月光'、四大名著里的孙悟空和诸葛亮——这些是中国人的文化母语。",
  whyAppeared: "中国古典文学从先秦的诸子散文和诗歌发端，经过汉赋、唐诗、宋词、元曲到明清小说，形成了绵延三千年的独立文学传统。",
  definitionPrecise: "中国古典文学指1919年五四运动以前的中国文学作品，涵盖诗歌、散文、小说、戏曲等主要文体。",
  reactsAgainst: "",
  keyFeatures: ["诗歌传统贯穿始终，从诗经到唐诗宋词是中国文学的主线", "散文（古文）长期是正统文学形式", "小说和戏曲在后期崛起，吸收了口头传统的手法"],
  keyFigures: [],
  misunderstandings: ["古典都是用文言写的，普通人读不了——其实诗经、唐诗、四大名著都有白话译本", "古典文学和现代生活无关——今人的情感和古人是相通的"],
  importance: "不读中国古典文学，就无法理解中国文化的底层逻辑——从日常语言中的成语到待人接物的方式，处处是古典的痕迹。",
  beginnerValue: "从最容易进入的西游记或唐诗三百首开始，不要一上来就读史记或楚辞。",
  whoShouldRead: "任何想理解中国文化传统和自己日常语言来源的人。",
  limitationNote: "",
  relatedMovements: ["realism"],
  guideCards: [],
  aiGenerated: true, reviewStatus: "AI_DRAFT",
});

// 5. Add Western classics movement
D.movements.push({
  id: "western-classics", label: "西方古典文学", shortLabel: "西方古典",
  originalName: "Western Classics",
  period: "公元前8世纪—17世纪", region: "欧洲",
  oneLine: "从荷马史诗到莎士比亚——西方文学的三千年源头。不读它们就看不懂后来所有的西方文学。",
  beginnerSummary: "荷马史诗奠定了西方叙事传统，希腊悲剧开创了戏剧，莎士比亚塑造了英语文学。",
  whyAppeared: "西方古典文学源于古希腊的口头史诗传统，经过罗马文学的继承、中世纪宗教文学的演变，到文艺复兴时期达到新的高峰。",
  definitionPrecise: "西方古典文学广义上指古希腊罗马时期至17世纪的欧洲经典文学作品，包括史诗、悲剧、喜剧、抒情诗和早期小说。",
  reactsAgainst: "",
  keyFeatures: ["以史诗和戏剧为核心文体", "深受古希腊罗马神话和圣经影响", "文艺复兴后开始关注人的主体性"],
  keyFigures: [],
  misunderstandings: ["古典文学＝难读＝过时——但荷马史诗是冒险故事，但丁写的是政治讽刺，莎士比亚是大娱乐家"],
  importance: "不了解西方古典文学，就不知道后来所有文学在回应什么。乔伊斯的《尤利西斯》是对荷马的致敬，现代小说叙事结构很多来自希腊悲剧。",
  beginnerValue: "从罗密欧与朱丽叶（故事熟悉）或奥德赛（冒险情节）开始，不要一上来就读失乐园。",
  whoShouldRead: "任何想理解西方文学和文化的人。",
  limitationNote: "",
  relatedMovements: ["modernism"],
  guideCards: [],
  aiGenerated: true, reviewStatus: "AI_DRAFT",
});

console.log(`Total movements: ${D.movements.length}`);

// 6. Update homepage links (web and mobile later)
fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
console.log("Done!");
