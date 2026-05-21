// BookPath Content Quality Audit v2
// Uses proper JSON extraction from bookpath-data.ts
// Run: node scripts/content-audit.mjs

import fs from "fs";

// --- Load awards data ---
const awardsData = JSON.parse(fs.readFileSync("lib/awards-data.json", "utf-8"));

// --- Extract bookPathData as JSON from the TypeScript file ---
const bpRaw = fs.readFileSync("lib/bookpath-data.ts", "utf-8");

// Find the start of the JSON object (after "export const bookPathData = ")
const jsonStart = bpRaw.indexOf("export const bookPathData = ");
const objStart = bpRaw.indexOf("{", jsonStart);

// Find the matching closing brace (before type definitions)
// Walk through the file character by character to handle nested braces
let depth = 0;
let jsonEnd = objStart;
for (let i = objStart; i < bpRaw.length; i++) {
  if (bpRaw[i] === "{") depth++;
  else if (bpRaw[i] === "}") {
    depth--;
    if (depth === 0) { jsonEnd = i + 1; break; }
  }
}

const jsonStr = bpRaw.slice(objStart, jsonEnd);
let bpData;
try {
  bpData = JSON.parse(jsonStr);
} catch (e) {
  console.error("JSON parse failed:", e.message);
  // Try to fix common issues
  const cleaned = jsonStr
    .replace(/\/\/.*$/gm, "")          // remove single-line comments
    .replace(/,\s*}/g, "}")            // trailing commas in objects
    .replace(/,\s*\]/g, "]");          // trailing commas in arrays
  try {
    bpData = JSON.parse(cleaned);
  } catch (e2) {
    console.error("JSON parse failed even after cleanup:", e2.message);
    process.exit(1);
  }
}

const { movements, works, guideCards, readingPaths } = bpData;
const workArr = works || [];
const guideArr = guideCards || [];
const movementArr = movements || [];
const pathArr = readingPaths || [];

// --- Audit ---
console.log(`\n${"=".repeat(54)}`);
console.log(`  BookPath 内容质量审计报告`);
console.log(`${"=".repeat(54)}`);

// 1. Works
const totalWorks = workArr.length;
const withOriginal = workArr.filter((w) => w.titleOriginal && w.titleOriginal !== "待补充").length;
const withYear = workArr.filter((w) => w.firstPublishedYear != null).length;
const withType = workArr.filter((w) => w.workType && w.workType !== "待补充").length;
const withCategory = workArr.filter((w) => w.literaryCategory && w.literaryCategory !== "待补充").length;
const beginnerFriendly = workArr.filter((w) => w.beginnerEntry).length;

console.log(`\n📚 作品 (${totalWorks})`);
console.log(`   ├─ 原名完整     ${withOriginal}/${totalWorks}  (${Math.round(withOriginal/totalWorks*100)}%)`);
console.log(`   ├─ 首版年份     ${withYear}/${totalWorks}  (${Math.round(withYear/totalWorks*100)}%)`);
console.log(`   ├─ 作品类型     ${withType}/${totalWorks}`);
console.log(`   ├─ 文学大类     ${withCategory}/${totalWorks}`);
console.log(`   └─ 新手友好     ${beginnerFriendly}/${totalWorks}  (${Math.round(beginnerFriendly/totalWorks*100)}%)`);

// 2. Guide Cards
const totalGuides = guideArr.length;
const fields = ["oneSentencePositioning", "whyClassic", "whyRead", "suitableFor",
                 "notSuitableFor", "difficultyReason", "readingPrerequisites", "readingAdvice"];
let pendingCount = 0;
for (const g of guideArr) {
  for (const f of fields) {
    if (g[f] === "待确认" || g[f] === "待补充") pendingCount++;
  }
}
const fieldsPerGuide = fields.length;
const totalFieldSlots = totalGuides * fieldsPerGuide;
const filledSlots = totalFieldSlots - pendingCount;

console.log(`\n📋 导读卡 (${totalGuides})`);
console.log(`   ├─ 总字段位     ${totalFieldSlots}`);
console.log(`   ├─ 已填         ${filledSlots}  (${Math.round(filledSlots/totalFieldSlots*100)}%)`);
console.log(`   ├─ 待确认       ${pendingCount}`);
console.log(`   └─ 完成度       ${Math.round(filledSlots/totalFieldSlots * 100)}%`);

// 3. Awards
const totalEditions = awardsData.reduce((s, a) => s + a.awardEditions.length, 0);
const withEval = awardsData.reduce((s, a) => s + a.awardEditions.filter((e) => e.evaluationNote).length, 0);
const withAuthorItems = awardsData.reduce((s, a) => s + a.awardEditions.filter((e) => e.authorItems?.length > 0).length, 0);
const withWorkItems = awardsData.reduce((s, a) => s + a.awardEditions.filter((e) => e.workItems?.length > 0).length, 0);
const missingScope = awardsData.filter((a) => !a.scopeNote).length;
const missingWho = awardsData.filter((a) => !a.whoShouldRead).length;

console.log(`\n🏆 奖项 (${awardsData.length})`);
console.log(`   ├─ 历届总数     ${totalEditions}`);
console.log(`   ├─ 有简评       ${withEval}  (${Math.round(withEval/totalEditions*100)}%)`);
console.log(`   ├─ 有获奖作者   ${withAuthorItems}  (${Math.round(withAuthorItems/totalEditions*100)}%)`);
console.log(`   ├─ 有获奖作品   ${withWorkItems}  (${Math.round(withWorkItems/totalEditions*100)}%)`);
console.log(`   ├─ 无任何数据   ${totalEditions - withEval}`);
console.log(`   ├─ 缺范围说明   ${missingScope}/${awardsData.length}`);
console.log(`   └─ 缺适合谁     ${missingWho}/${awardsData.length}`);

// 4. Movements
console.log(`\n🏷️ 流派 (${movementArr.length})`);
const mWithDef = movementArr.filter((m) => m.definitionPrecise && m.definitionPrecise !== "待确认").length;
const mWithWhy = movementArr.filter((m) => m.whyAppeared && m.whyAppeared !== "待确认").length;
console.log(`   ├─ 有精确定义   ${mWithDef}/${movementArr.length}`);
console.log(`   └─ 有出现原因   ${mWithWhy}/${movementArr.length}`);

// 5. Reading Paths
console.log(`\n🗺️ 阅读路径 (${pathArr.length})`);
const pWithIntro = pathArr.filter((p) => p.intro && p.intro !== "待确认").length;
const pWithTarget = pathArr.filter((p) => p.targetReader && p.targetReader !== "待确认").length;
console.log(`   ├─ 有简介       ${pWithIntro}/${pathArr.length}`);
console.log(`   └─ 有目标读者   ${pWithTarget}/${pathArr.length}`);

// 6. Cross-reference
console.log(`\n🔍 奖项→作品库交叉检查`);
function slugify(t) {
  return t.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "");
}
const awardAuthors = new Set();
const awardWorks = new Set();
awardsData.forEach((a) =>
  a.awardEditions.forEach((e) => {
    (e.authorItems || []).forEach((ai) => awardAuthors.add(ai.nameCn));
    (e.workItems || []).forEach((wi) => awardWorks.add(wi.nameCn));
  })
);
const workAuthorNames = new Set(workArr.map((w) => w.authorName));
const workTitleNames = new Set(workArr.map((w) => w.titleDisplayCn));

const missingAuthors = [...awardAuthors].filter((n) => {
  const s = slugify(n);
  return ![...workAuthorNames].some((wn) => slugify(wn) === s);
});
const missingWorks = [...awardWorks].filter((n) => {
  const s = slugify(n);
  return ![...workTitleNames].some((tn) => slugify(tn) === s);
});

console.log(`   ├─ 缺失作者     ${missingAuthors.length}/${awardAuthors.size}`);
console.log(`   ├─ 缺失作品     ${missingWorks.length}/${awardWorks.size}`);
if (missingAuthors.length > 0) {
  console.log(`   └─ 缺失作者例   ${missingAuthors.slice(0, 12).join("、")}`);
}
if (missingWorks.length > 0) {
  console.log(`   └─ 缺失作品例   ${missingWorks.slice(0, 8).map((n) => n.slice(0, 30)).join("、")}`);
}

// --- 综合评分 ---
console.log(`\n${"=".repeat(54)}`);
console.log(`  综合质量评估`);
console.log(`${"=".repeat(54)}`);

const dims = [
  { label: "作品基础信息", pct: Math.round(((withOriginal/totalWorks) + (withYear/totalWorks)) / 2 * 100) },
  { label: "导读卡完整度", pct: Math.round(filledSlots/totalFieldSlots * 100) },
  { label: "奖项历届数据", pct: Math.round(withEval/totalEditions * 100) },
  { label: "流派定义",     pct: Math.round(mWithDef/movementArr.length * 100) },
  { label: "路径说明",     pct: Math.round(pWithIntro/pathArr.length * 100) },
];

for (const d of dims) {
  const bar = "█".repeat(Math.round(d.pct / 10)) + "░".repeat(10 - Math.round(d.pct / 10));
  console.log(`  ${d.label.padEnd(14)} ${bar} ${d.pct}%`);
}

const overall = Math.round(dims.reduce((s, d) => s + d.pct, 0) / dims.length);
console.log(`  ${"综合".padEnd(14)} ${"█".repeat(Math.round(overall/10)) + "░".repeat(10-Math.round(overall/10))} ${overall}%`);
console.log("");
