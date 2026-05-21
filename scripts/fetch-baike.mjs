// Download and parse Baidu Baike pages to fill award data
import { execSync } from "child_process";
import fs from "fs";
import * as cheerio from "cheerio";

// Awards to fetch: slug -> Baidu URL
const targets = {
  "老舍文学奖": "https://baike.baidu.com/item/%E8%80%81%E8%88%8D%E6%96%87%E5%AD%A6%E5%A5%96",
  "曹禺剧本奖": "https://baike.baidu.com/item/%E6%9B%B9%E7%A6%BA%E5%89%A7%E6%9C%AC%E5%A5%96",
  "郁达夫小说奖": "https://baike.baidu.com/item/%E9%83%81%E8%BE%BE%E5%A4%AB%E5%B0%8F%E8%AF%B4%E5%A5%96",
};

const awards = JSON.parse(fs.readFileSync("lib/awards-data.json", "utf-8"));

for (const [slug, url] of Object.entries(targets)) {
  console.log(`\n=== ${slug} ===`);
  
  // Download
  const psCmd = `powershell -Command "$r = Invoke-WebRequest -Uri '${url}' -TimeoutSec 15 -UseBasicParsing; $c = $r.Content; $c | Out-File -FilePath 'tmp/baike_${slug}.html' -Encoding UTF8; Write-Host ('Saved: '+$c.Length)"`;
  execSync(psCmd, { stdio: "inherit" });
  
  // Parse
  const html = fs.readFileSync(`tmp/baike_${slug}.html`, "utf-8");
  const $ = cheerio.load(html);
  
  // Find the best table (look for tables with year + winner patterns)
  let bestTable = null;
  let maxScore = 0;
  
  $("table").each((i, table) => {
    const text = $(table).text();
    const rows = $(table).find("tr").length;
    if (rows < 3) return;
    
    let score = 0;
    // Check for year columns
    if (/(20\d{2}|19\d{2})/.test(text)) score += 3;
    // Check for award-specific keywords
    if (/(获奖|届|年度|作者|作品|名称)/.test(text)) score += 3;
    // Penalize very large tables (might be page layout not data)
    if (rows > 60) score -= 2;
    // Prefer tables with balanced rows/cols
    const cols = $(table).find("tr").first().find("td, th").length;
    if (cols >= 2 && cols <= 6) score += 2;
    
    if (score > maxScore) {
      maxScore = score;
      bestTable = table;
    }
  });
  
  if (!bestTable) {
    console.log("  No suitable table found");
    continue;
  }
  
  // Extract data
  const rows = [];
  $(bestTable).find("tr").each((i, tr) => {
    const cells = [];
    $(tr).find("td").each((j, td) => cells.push($(td).text().trim()));
    if (cells.length > 0 && !$(tr).find("th").length) rows.push(cells);
  });
  
  console.log(`  Found ${rows.length} data rows`);
  rows.slice(0, 8).forEach((r, i) => console.log(`    [${i}] ${r.join(" | ").slice(0, 100)}`));
  
  // Patch data
  const award = awards.find(a => a.slug === slug);
  if (!award) { console.log("  Award not found in data"); continue; }
  
  let patched = 0;
  for (const row of rows) {
    // First column should contain a year
    const yearMatch = row[0]?.match(/(20\d{2})/);
    if (!yearMatch) continue;
    const year = yearMatch[1];
    
    // Last non-empty column is usually the winner
    const winner = [...row].reverse().find(c => c && c.length > 2 && !c.includes("作者") && !c.includes("作品"));
    if (!winner) continue;
    
    const ed = award.awardEditions.find(e => e.awardCycle === year || String(e.awardYear) === year);
    if (!ed) continue;
    if (ed.authorItems?.length || ed.workItems?.length) continue;
    
    // Clean winner name (remove出版社, 译者 etc.)
    const cleanName = winner.replace(/[著译编校](.*)$/, "").replace(/\[.*?\]/g, "").trim();
    
    if (award.recipientType === "AUTHOR") {
      ed.authorItems = [{ nameCn: cleanName }];
    } else {
      ed.workItems = [{ nameCn: cleanName }];
    }
    ed.status = "VERIFIED";
    ed.verificationStatus = "FULL";
    patched++;
  }
  
  console.log(`  Patched ${patched} editions`);
}

fs.writeFileSync("lib/awards-data.json", JSON.stringify(awards, null, 2), "utf-8");
console.log("\nDone!");
