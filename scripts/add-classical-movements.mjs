// Add more classical literature movements + tag works
import fs from "fs";
const R = fs.readFileSync("lib/bookpath-data.ts", "utf-8");
const O = R.indexOf("{", R.indexOf("export const bookPathData = "));
let d = 0, E = O;
for (let i = O; i < R.length; i++) { if (R[i] === "{") d++; else if (R[i] === "}") { d--; if (d === 0) { E = i + 1; break; } } }
const D = JSON.parse(R.slice(O, E));

function mov(id, label, orig, period, region, line, features) {
  if (D.movements.some(m => m.id === id)) { console.log(`Skip ${label}: exists`); return; }
  D.movements.push({
    id, label, shortLabel: label, originalName: orig, period, region, oneLine: line,
    beginnerSummary: line, whyAppeared: "", definitionPrecise: line,
    reactsAgainst: "", keyFeatures: features, keyFigures: [], misunderstandings: [],
    importance: "", beginnerValue: "", whoShouldRead: "", limitationNote: "",
    relatedMovements: [], guideCards: [], aiGenerated: true, reviewStatus: "AI_DRAFT",
  });
  console.log(`+ ${label}`);
}

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

// ── Chinese sub-movements ──
mov("chinese-poetry", "中国诗歌", "Chinese Poetry", "公元前11世纪—现代", "中国",
  "从诗经到唐诗宋词——中国诗歌三千年。诗是中国文学的主动脉，不懂诗就不懂中国文学。",
  ["诗歌是中国文学正统","从四言到五言到七言，形式不断演变","唐诗和宋词是两座高峰"]);

mov("pre-qin-lit", "先秦文学", "Pre-Qin Literature", "公元前11世纪—前3世纪", "中国",
  "秦统一之前的中国文学——诗经、楚辞、诸子散文。中国文化的源代码都在这个时期形成。",
  ["中国文学和中国哲学的源头","诗经是中国最早的诗歌总集","诸子散文奠定了中国散文传统"]);

mov("four-great-novels", "四大名著", "Four Great Classical Novels", "14—18世纪", "中国",
  "西游记、三国演义、水浒传、红楼梦——中国古典小说的四座高峰。",
  ["每部代表一种类型：神魔、历史、英雄、世情","每一部都有数百年的阅读和改编历史","四大名著是中国流行文化的最大IP库"]);

// ── Western sub-movements ──
mov("greek-epic", "古希腊史诗", "Greek Epic", "公元前8世纪", "古希腊",
  "荷马的《伊利亚特》和《奥德赛》——西方文学真正的起点。",
  ["西方文学的最早文本","口头传统的巅峰","奠定了史诗的所有基本要素"]);

mov("greek-tragedy", "古希腊悲剧", "Greek Tragedy", "公元前5世纪", "古希腊",
  "埃斯库罗斯、索福克勒斯、欧里庇得斯——戏剧从此诞生。",
  ["戏剧作为一种独立文体的起点","奠定了悲剧结构（三部曲、歌队、命运主题）","至今未被超越的典范"]);

mov("shakespeare", "莎士比亚", "Shakespeare", "16—17世纪", "英国",
  "英语文学的最高峰。37部戏剧、154首十四行诗——一个人的作品重塑了一门语言。",
  ["英语语言被莎士比亚永久改变","创造了无数新词和新短语","戏剧涵盖悲剧、喜剧、历史剧全部类型"]);

mov("renaissance-lit", "文艺复兴文学", "Renaissance Literature", "14—17世纪", "欧洲",
  "从中世纪走向现代——但丁、塞万提斯、莎士比亚、弥尔顿。人的价值和理性被重新发现。",
  ["人文主义的核心表达","从神本转向人本","小说、悲剧、史诗全面繁荣"]);

// ── Tag works ──
// Chinese poetry
tag(["诗经","唐诗三百首","李太白集","杜工部集","东坡集"], "chinese-poetry");
// Pre-Qin
tag(["诗经","楚辞","论语","孟子","庄子","道德经","孙子兵法"], "pre-qin-lit");
// Four great novels
tag(["红楼梦","西游记","三国演义","水浒传"], "four-great-novels");
// Greek epic
tag(["伊利亚特","奥德赛"], "greek-epic");
// Greek tragedy
tag(["希腊悲剧选"], "greek-tragedy");
// Shakespeare
tag(["莎士比亚悲剧选","麦克白","罗密欧与朱丽叶","奥赛罗"], "shakespeare");
// Renaissance
tag(["神曲","堂吉诃德","浮士德","坎特伯雷故事集","失乐园","莎士比亚悲剧选"], "renaissance-lit");

fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
console.log(`\nDone! Total movements: ${D.movements.length}`);
