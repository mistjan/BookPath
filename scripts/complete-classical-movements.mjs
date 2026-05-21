// Complete classical movements + add basic entries for missing works
import fs from "fs";
const R = fs.readFileSync("lib/bookpath-data.ts", "utf-8");
const O = R.indexOf("{", R.indexOf("export const bookPathData = "));
let d = 0, E = O;
for (let i = O; i < R.length; i++) { if (R[i] === "{") d++; else if (R[i] === "}") { d--; if (d === 0) { E = i + 1; break; } } }
const D = JSON.parse(R.slice(O, E));

// Helper: add basic work (no guide card)
function addWork(t, o, a, c, y, cat, sub, diff, beg, movs) {
  const slug = t.replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
  if (D.works.some(w => w.slug === slug)) { return false; }
  D.works.push({
    id: slug, slug, titleDisplayCn: t, titleOriginal: o, authorName: a,
    countryOrRegion: c, firstPublishedYear: y, literaryCategory: cat, literarySubcategory: sub,
    workType: "长篇小说", difficultyLevel: diff, beginnerEntry: beg,
    movementIds: movs, guideCardIds: [],
  });
  return true;
}

// Helper: add movement with full info
function mov(id, label, orig, period, region, line, summary, whyAppeared, definition, features, importance, beginnerValue) {
  if (D.movements.some(m => m.id === id)) { console.log(`Skip ${label}: exists`); return; }
  D.movements.push({
    id, label, shortLabel: label, originalName: orig, period, region,
    oneLine: line, beginnerSummary: summary, whyAppeared, definitionPrecise: definition,
    reactsAgainst: "", keyFeatures: features, keyFigures: [], misunderstandings: [],
    importance, beginnerValue, whoShouldRead: "", limitationNote: "",
    relatedMovements: [], guideCards: [], aiGenerated: true, reviewStatus: "AI_DRAFT",
  });
  console.log(`+ Movement: ${label}`);
}

// Helper: tag works
function tag(workNames, movId) {
  let n = 0;
  for (const w of D.works) {
    const name = w.titleDisplayCn.replace(/[《》]/g, "");
    if (workNames.includes(name) && !w.movementIds?.includes(movId)) {
      if (!w.movementIds) w.movementIds = [];
      w.movementIds.push(movId);
      n++;
    }
  }
  if (n) console.log(`  → ${movId}: tagged ${n} works`);
}

// ═══ 1. Japanese classics movement ═══
mov("japanese-classics", "日本古典文学", "Japanese Classics", "8—19世纪", "日本",
  "从源氏物语到平家物语——日本文学从平安时代的优雅到江户时代的市井。",
  "日本古典文学以平安时代的女流文学（源氏物语、枕草子）达到高峰，经历中世的军记物语（平家物语），到江户时代的町人文学。",
  "日本文学在吸收中国文学影响的同时走出了独特的道路——物哀、幽玄、侘寂等美学概念都源自这个时期的文学实践。",
  "日本古典文学指明治维新（1868年）以前创作的日本文学作品，包括和歌、物语、随笔、军记物语、俳谐和戏剧。",
  ["平安时代女流文学达到极高成就","物哀（もののあはれ）是日本美学的核心概念","和歌、俳句等短诗形式高度发达"],
  "不读日本古典文学就无法理解'物哀'是什么——川端康成、三岛由纪夫、村上春树的根都在这里。",
  "从最短的俳句入手（芭蕉的'古池や'），或从故事性最强的平家物语开始。");

// ═══ 2. Add basic works: Greek tragedies ═══
addWork("俄狄浦斯王", "Οἰδίπους Τύραννος", "索福克勒斯", "古希腊", -430, "戏剧", "悲剧", 3, false, ["greek-tragedy","western-classics"]);
addWork("安提戈涅", "Ἀντιγόνη", "索福克勒斯", "古希腊", -441, "戏剧", "悲剧", 3, false, ["greek-tragedy","western-classics"]);
addWork("美狄亚", "Μήδεια", "欧里庇得斯", "古希腊", -431, "戏剧", "悲剧", 3, false, ["greek-tragedy","western-classics"]);
addWork("阿伽门农", "Ἀγαμέμνων", "埃斯库罗斯", "古希腊", -458, "戏剧", "悲剧", 3, false, ["greek-tragedy","western-classics"]);
addWork("普罗米修斯被缚", "Προμηθεὺς Δεσμώτης", "埃斯库罗斯", "古希腊", -460, "戏剧", "悲剧", 3, false, ["greek-tragedy","western-classics"]);
addWork("酒神的女信徒", "Βάκχαι", "欧里庇得斯", "古希腊", -405, "戏剧", "悲剧", 3, false, ["greek-tragedy","western-classics"]);

// ═══ 3. Add basic works: Greek epics ═══
addWork("埃涅阿斯纪", "Aeneis", "维吉尔", "古罗马", -19, "诗歌", "史诗", 3, false, ["greek-epic","western-classics"]);
addWork("神谱", "Θεογονία", "赫西俄德", "古希腊", -700, "诗歌", "史诗", 3, false, ["greek-epic","western-classics"]);
addWork("阿尔戈英雄纪", "Ἀργοναυτικά", "阿波罗尼奥斯", "古希腊", -250, "诗歌", "史诗", 3, false, ["greek-epic","western-classics"]);

// ═══ 4. Add basic works: More Japanese classics ═══
addWork("枕草子", "枕草子", "清少纳言", "日本", 1002, "散文", "随笔", 2, true, ["japanese-classics"]);
addWork("竹取物语", "竹取物語", "佚名", "日本", 900, "小说", "物语", 2, true, ["japanese-classics"]);
addWork("伊势物语", "伊勢物語", "佚名", "日本", 950, "小说", "物语", 2, true, ["japanese-classics"]);
addWork("方丈记", "方丈記", "鸭长明", "日本", 1212, "散文", "随笔", 2, true, ["japanese-classics"]);
addWork("徒然草", "徒然草", "吉田兼好", "日本", 1330, "散文", "随笔", 2, true, ["japanese-classics"]);
addWork("雨月物语", "雨月物語", "上田秋成", "日本", 1776, "小说", "志怪小说", 3, false, ["japanese-classics"]);

// ═══ 5. Tag existing works to Japanese classics ═══
tag(["源氏物语","平家物语"], "japanese-classics");

console.log("\nDone!");
console.log(`Works: ${D.works.length}, Movements: ${D.movements.length}`);

fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
