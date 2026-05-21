// Generate report of authors and works missing from the library
// Output: docs/missing-entries-report.md
// Run: node scripts/missing-entries-report.mjs

import fs from "fs";

// ── Load data ──
const awards = JSON.parse(fs.readFileSync("lib/awards-data.json", "utf-8"));

const bpRaw = fs.readFileSync("lib/bookpath-data.ts", "utf-8");
const jsonStart = bpRaw.indexOf("export const bookPathData = ");
const objStart = bpRaw.indexOf("{", jsonStart);
let depth = 0, jsonEnd = objStart;
for (let i = objStart; i < bpRaw.length; i++) {
  if (bpRaw[i] === "{") depth++;
  else if (bpRaw[i] === "}") { depth--; if (depth === 0) { jsonEnd = i + 1; break; } }
}
const data = JSON.parse(bpRaw.slice(objStart, jsonEnd));
const works = data.works || [];

function slugify(t) {
  return t.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "");
}

// Only include reputable literary awards to filter out noise
const cleanAwards = new Set([
  "布克奖", "国际布克奖", "普利策小说奖", "龚古尔奖", "诺贝尔文学奖",
  "芥川龙之介奖", "直木三十五奖", "雨果奖", "星云奖", "爱伦·坡奖",
  "美国国家图书奖小说奖", "美国国家书评人协会奖小说奖",
  "塞万提斯奖", "卡夫卡奖", "都柏林文学奖",
  "费米娜奖", "勒诺多奖", "美第奇奖", "鲁迅文学奖",
  "老舍文学奖", "茅盾文学奖",
]);

function isCleanName(name) {
  if (!name || name.length < 2) return false;
  if (/^\d/.test(name)) return false;
  if (/px$/.test(name)) return false;
  if (/[<>]/.test(name)) return false;
  if (name.length > 50) return false;
  // Must contain either Chinese characters OR match common person name pattern
  const hasChinese = /[\u4e00-\u9fff]/.test(name);
  const hasWesternName = /^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/.test(name.trim());
  const hasJapaneseKana = /[\u3040-\u309f\u30a0-\u30ff]/.test(name);
  if (!hasChinese && !hasWesternName && !hasJapaneseKana) return false;
  // Filter known non-person entities
  if (/(出版社|书店|有限公司|集团|协会|委员会|学会|公司|局|社|馆|中心|文库|书房|书屋|出版|Press|Publishers|Books|House|Inc\.|Corp|Ltd|Gallery|Agency|Studio|Productions|Entertainment|Imprint|Bantam|Spectra|Vintage|Harper|Penguin|Random|Simon|Schuster|Hachette|Macmillan|Bloomsbury|Oxford|Cambridge|University|Institute|Foundation|瑟伊|阿尔班|斯托克|法亚尔|拉丰|弗拉马里翁|伽利玛|格拉塞|罗贝尔|该当なし|該当なし|互联网|IMDb|Stock|股票|Magazine|Science.Fiction)/i.test(name)) return false;
  return true;
}

// ── Collect all author names from awards ──
const awardAuthorSet = new Map();
const awardWorkSet = new Map();

for (const award of awards) {
  if (!cleanAwards.has(award.nameCn)) continue;
  for (const ed of award.awardEditions || []) {
    for (const item of ed.authorItems || []) {
      if (!isCleanName(item.nameCn)) continue;
      const key = slugify(item.nameCn);
      if (!awardAuthorSet.has(key)) {
        awardAuthorSet.set(key, { nameCn: item.nameCn, awards: [] });
      }
      awardAuthorSet.get(key).awards.push({
        awardName: award.nameCn,
        edition: ed.awardEditionLabel,
        year: ed.awardYear,
      });
    }
    for (const item of ed.workItems || []) {
      if (!isCleanName(item.nameCn)) continue;
      const key = slugify(item.nameCn);
      if (!awardWorkSet.has(key)) {
        awardWorkSet.set(key, { nameCn: item.nameCn, awards: [] });
      }
      awardWorkSet.get(key).awards.push({
        awardName: award.nameCn,
        edition: ed.awardEditionLabel,
        year: ed.awardYear,
      });
    }
  }
}

// ── Build sets of known authors/works from the library ──
const knownAuthorSlugs = new Set(works.map((w) => slugify(w.authorName)));
const knownWorkTitleSlugs = new Set(works.map((w) => slugify(w.titleDisplayCn)));

// ── Find missing ──
const missingAuthors = [];
for (const [slug, info] of awardAuthorSet) {
  if (!knownAuthorSlugs.has(slug)) {
    // Try matching by work title too (some award authors might be in work titles)
    const matchedWork = works.find((w) => slugify(w.titleDisplayCn) === slug);
    if (!matchedWork) {
      missingAuthors.push(info);
    }
  }
}

const missingWorks = [];
for (const [slug, info] of awardWorkSet) {
  if (!knownWorkTitleSlugs.has(slug)) {
    // Try matching by author name (some award works might be author names)
    const matchedAuthor = works.find((w) => slugify(w.authorName) === slug);
    if (!matchedAuthor) {
      missingWorks.push(info);
    }
  }
}

// Sort by number of appearances (keep all, not just ≥2)
const allAuthors = [...missingAuthors].sort((a, b) => b.awards.length - a.awards.length);
const allWorks = [...missingWorks].sort((a, b) => b.awards.length - a.awards.length);

// ── Generate report ──
let md = `# 缺失作者与作品报告

> 生成日期：${new Date().toISOString().slice(0, 10)}
> 来源：主要文学奖项历届数据 vs 作品库交叉检查
> 说明：仅列出知名文学奖（布克奖、普利策、诺贝尔、龚古尔、芥川奖等）中出现的缺失条目，过滤出版社等非人名数据。

---

## 总览

| 类型 | 奖项中出现 | 作品库中已有 | **缺失（≥2次）** |
|------|-----------|------------|----------------|
| 作者 | ${awardAuthorSet.size} | ${knownAuthorSlugs.size} | **${allAuthors.length}** |
| 作品 | ${awardWorkSet.size} | ${knownWorkTitleSlugs.size} | **${allWorks.length}** |

---

## 缺失作者（${allAuthors.length} 人）

> 以下作者出现在奖项数据中，但作品库中无对应作品。

`;

for (const author of allAuthors) {
  md += `### ${author.nameCn}\n\n`;
  md += `出现 ${author.awards.length} 次：\n\n`;
  for (const a of author.awards.slice(0, 5)) {
    md += `- ${a.awardName} · ${a.edition}${a.year ? `（${a.year}年）` : ""}\n`;
  }
  if (author.awards.length > 5) {
    md += `- … 及其他 ${author.awards.length - 5} 次\n`;
  }
  md += "\n";
}

// All authors listed (no truncation)

md += `---

## 缺失作品（${allWorks.length} 部）

> 以下作品出现在奖项数据中，但作品库中无对应条目。

`;

for (const work of allWorks) {
  md += `### ${work.nameCn}\n\n`;
  md += `出现 ${work.awards.length} 次：\n\n`;
  for (const a of work.awards.slice(0, 5)) {
    md += `- ${a.awardName} · ${a.edition}${a.year ? `（${a.year}年）` : ""}\n`;
  }
  if (work.awards.length > 5) {
    md += `- … 及其他 ${work.awards.length - 5} 次\n`;
  }
  md += "\n";
}

// All works listed (no truncation)

fs.writeFileSync("docs/missing-entries-report.md", md, "utf-8");
console.log(`Report generated: docs/missing-entries-report.md`);
console.log(`Missing authors: ${missingAuthors.length}`);
console.log(`Missing works: ${missingWorks.length}`);
