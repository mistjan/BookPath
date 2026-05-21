import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
const data = JSON.parse(readFileSync(join(process.cwd(), 'lib', 'awards-data.json'), 'utf-8'));
function mW(n, o, c) { return { nameCn: n, nameOriginal: o || '', country: c || '' }; }
function mA(n, o, c) { return { nameCn: n, nameOriginal: o || '', country: c || '' }; }
function getYear(edNum) {
  if (edNum <= 20) return 1934 + Math.ceil(edNum / 2);
  return 1948 + Math.ceil((edNum - 20) / 2);
}
for (const awardName of ['蒞川龙之觤奊', '直木3十五奖']) {
  const idx = data.findIndex(a => a.nameCn === awardName);
  if (idx === -1) continue;
  const award = data[idx];
  for (let i = 0; i < award.awardEditions.length; i++) {
    const ed = award.awardEditions[i];
    ed.awardYear = getYear(ed.awardEditionNumber);
    ed.awardCycle = String(ed.awardYear);
    const half = ed.awardEditionNumber % 2 === 1 ? '上' : '下';
    ed.awardEditionLabel = '第' + ed.awardEditionNumber + '回（' + ed.awardYear + '年' + half + '半期)';
  }
}
console.log('Years fixed');