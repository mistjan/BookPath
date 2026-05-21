const fs = require('fs');
const path = require('path');

const awardsPath = path.join(process.cwd(), 'lib', 'awards-data.json');
const winnersPath = path.join(process.cwd(), 'tmp', 'jp_winners.json');

const awards = JSON.parse(fs.readFileSync(awardsPath, 'utf-8'));
const jpWinners = JSON.parse(fs.readFileSync(winnersPath, 'utf-8'));

function fillWinners(awardName, winners) {
  const idx = awards.findIndex(a => a.nameCn === awardName);
  if (idx === -1) { console.log('Not found:', awardName); return 0; }
  const award = awards[idx];
  let count = 0;
  const numToIdx = {};
  for (let i = 0; i < award.awardEditions.length; i++) {
    numToIdx[award.awardEditions[i].awardEditionNumber] = i;
  }
  for (const [numStr, w] of Object.entries(winners)) {
    const num = Number(numStr);
    const i = numToIdx[num];
    if (i === undefined) continue;
    const ed = award.awardEditions[i];
    if (ed.status === 'VERIFIED_WITH_DATA') continue;
    if (w.works) ed.workItems = w.works;
    if (w.authors) ed.authorItems = w.authors;
    if (w.note) ed.evaluationNote = w.note;
    ed.status = 'VERIFIED_WITH_DATA';
    ed.verificationStatus = 'EDITION_YEAR_VERIFIED';
    count++;
  }
  return count;
}

const akTotal = fillWinners('芥川龙之介奖', jpWinners.akutagawa);
console.log('Akutagawa filled:', akTotal);
const nkTotal = fillWinners('直木三十五奖', jpWinners.naoki);
console.log('Naoki filled:', nkTotal);

fs.writeFileSync(awardsPath, JSON.stringify(awards, null, 2), 'utf-8');
console.log('Saved.');