import { readFileSync, writeFileSync } from " fs\;
import { join } from \path\;

const DATA_PATH = join(process.cwd(), \lib\, \awards-data.json\);
const data = JSON.parse(readFileSync(DATA_PATH, \utf-8\));

function findAward(nameCn) {
 const idx = data.findIndex(a => a.nameCn === nameCn);
 if (idx === -1) throw new Error(Award not found: );
 return { award: data[idx], idx };
}

function fillEdition(award, editionIdx, { workItems = [], authorItems = [], evaluationNote = \\ }) {
 const ed = award.awardEditions[editionIdx];
 if (!ed) return false;
 if (workItems.length > 0) ed.workItems = workItems;
 if (authorItems.length > 0) ed.authorItems = authorItems;
 if (evaluationNote) ed.evaluationNote = evaluationNote;
 ed.status = \VERIFIED_WITH_DATA\;
 ed.verificationStatus = \EDITION_YEAR_VERIFIED\;
 return true;
}

function fillAwardByName(nameCn, winnersByYear) {
 const { award } = findAward(nameCn);
 let filled = 0;
 const winnerYears = new Set(Object.keys(winnersByYear).map(Number));
 
 for (let i = 0; i < award.awardEditions.length; i++) {
 const ed = award.awardEditions[i];
 if (ed.status === \VERIFIED_WITH_DATA\) continue;
 if (!winnerYears.has(ed.awardYear)) continue;
 
 const w = winnersByYear[ed.awardYear];
 if (!w) continue;
 
 const workItems = w.work ? [{ nameCn: w.work.nameCn, nameOriginal: w.work.nameOriginal || \\, country: w.work.country || \\ }] : [];
 const authorItems = w.author ? [{ nameCn: w.author.nameCn, nameOriginal: w.author.nameOriginal || \\, country: w.author.country || \\ }] : [];
 
 fillEdition(award, i, { workItems, authorItems, evaluationNote: w.note || \\ });
 filled++;
 }
 return filled;
}

// ============ 普利策小说奖 (Pulitzer Prize for Fiction) ============
const pulitzerWinners = {
 1917: { author: { nameCn: \\, nameOriginal: \\, country: \\ }, note: \\ },
 1918: { work: { nameCn: \他的家族\, nameOriginal: \His Family\, country: \美国\ }, author: { nameCn: \欧内斯特·普尔\, nameOriginal: \Ernest Poole\, country: \美国\ }, note: \早期普利策小说奖作品，关注纽约社会变迁中的家庭叙事。\ },
 1919: { work: { nameCn: \安伯森情史\, nameOriginal: \The Magnificent Ambersons\, country: \美国\ }, author: { nameCn: \布思·塔金顿\, nameOriginal: \Booth Tarkington\, country: \美国\ }, note: \描写美国镀金时代家族兴衰的经典之作，后被奥逊·威尔斯改编为电影。\ },
 1920: { author: { nameCn: \\, nameOriginal: \\, country: \\ }, note: \\ },
 1921: { work: { nameCn: \纯真年代\, nameOriginal: \The Age of Innocence\, country: \美国\ }, author: { nameCn: \伊迪丝·华顿\, nameOriginal: \Edith Wharton\, country: \美国\ }, note: \首位获得普利策小说奖的女性作家，精妙刻画了19世纪纽约上流社会的虚伪与束缚。\ },
 1922: { work: { nameCn: \艾丽斯·亚当斯\, nameOriginal: \Alice Adams\, country: \美国\ }, author: { nameCn: \布思·塔金顿\, nameOriginal: \Booth Tarkington\, country: \美国\ }, note: \塔金顿第二次获奖，描写中产阶级少女在社会阶层中的挣扎。\ },
 1923: { work: { nameCn: \最好的岁月\, nameOriginal: \One of Ours\, country: \美国\ }, author: { nameCn: \薇拉·凯瑟\, nameOriginal: \Willa Cather\, country: \美国\ }, note: \以一战为背景，探讨美国中西部青年在战争中的精神追寻。\ },
 1925: { work: { nameCn: \如此辽阔\, nameOriginal: \So Big\, country: \美国\ }, author: { nameCn: \埃德娜·费伯\, nameOriginal: \Edna Ferber\, country: \美国\ }, note: \讲述一位坚韧女性在芝加哥郊区的奋斗故事，歌颂平凡生活中的伟大。\ },
 1926: { work: { nameCn: \箭匠\, nameOriginal: \Arrowsmith\, country: \美国\ }, author: { nameCn: \辛克莱·刘易斯\, nameOriginal: \Sinclair Lewis\, country: \美国\ }, note: \刘易斯后来拒绝普利策奖（但接受了诺贝尔奖），小说讽刺了美国医学界的商业化。\ },
 1929: { work: { nameCn: \红女绿男\, nameOriginal: \Scarlet Sister Mary\, country: \美国\ }, author: { nameCn: \朱莉娅·彼得金\, nameOriginal: \Julia Peterkin\, country: \美国\ }, note: \以南方非裔社区为背景，描绘了一个黑人女性的生命历程。\ },
 1932: { work: { nameCn: \大地\, nameOriginal: \The Good Earth\, country: \美国\ }, author: { nameCn: \赛珍珠\, nameOriginal: \Pearl S. Buck\, country: \美国\ }, note: \赛珍珠以中国农民生活为题材的杰作，后来还获得了诺贝尔文学奖。\ },
 1937: { work: { nameCn: \飘\, nameOriginal: \Gone with the Wind\, country: \美国\ }, author: { nameCn: \玛格丽特·米切尔\, nameOriginal: \Margaret Mitchell\, country: \美国\ }, note: \美国文学史上最畅销的小说之一，以南北战争为背景的史诗爱情故事。\ },
 1939: { work: { nameCn: \鹿苑长春\, nameOriginal: \The Yearling\, country: \美国\ }, author: { nameCn: \玛乔丽·金南·罗林斯\, nameOriginal: \Marjorie Kinnan Rawlings\, country: \美国\ }, note: \描写佛罗里达荒野中一个男孩与一只小鹿的成长故事。\ },
 1948: { work: { nameCn: \黄金时代的故事\, nameOriginal: \Tales of the South Pacific\, country: \美国\ }, author: { nameCn: \詹姆斯·米切纳\, nameOriginal: \James A. Michener\, country: \美国\ }, note: \以二战南太平洋战场为背景的短篇集，后来改编为音乐剧《南太平洋》。\ },
 1953: { work: { nameCn: \老人与海\, nameOriginal: \The Old Man and the Sea\, country: \美国\ }, author: { nameCn: \欧内斯特·海明威\, nameOriginal: \Ernest Hemingway\, country: \美国\ }, note: \海明威最著名的中篇小说，次年获得诺贝尔文学奖，展现了人在绝境中的尊严。\ },
 1961: { work: { nameCn: \杀死一只知更鸟\, nameOriginal: \To Kill a Mockingbird\, country: \美国\ }, author: { nameCn: \哈珀·李\, nameOriginal: \Harper Lee\, country: \美国\ }, note: \现代美国文学的基石之作，以儿童视角审视种族不公与道德勇气。\ },
};

// Fill Pulitzer
let totalFilled = 0;
Object.entries(pulitzerWinners).forEach(([year, w]) => {
 const { award } = findAward(\普利策小说奖\);
 for (let i = 0; i < award.awardEditions.length; i++) {
 const ed = award.awardEditions[i];
 if (ed.status === \VERIFIED_WITH_DATA\) continue;
 if (ed.awardYear !== Number(year)) continue;
 const workItems = w.work ? [{ nameCn: w.work.nameCn, nameOriginal: w.work.nameOriginal || \\, country: w.work.country || \\ }] : [];
 const authorItems = w.author ? [{ nameCn: w.author.nameCn, nameOriginal: w.author.nameOriginal || \\, country: w.author.country || \\ }] : [];
 fillEdition(award, i, { workItems, authorItems, evaluationNote: w.note || \\ });
 totalFilled++;
 }
});

console.log(Filled Pulitzer editions);

writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), \utf-8\);
console.log(\Saved.\);
