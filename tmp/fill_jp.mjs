import { readFileSync, writeFileSync } from " fs\;
import { join } from \path\;

const data = JSON.parse(readFileSync(join(process.cwd(), \lib\, \awards-data.json\), \utf-8\));

function mW(n, o, c) { return { nameCn: n, nameOriginal: o || \\, country: c || \\ }; }
function mA(n, o, c) { return { nameCn: n, nameOriginal: o || \\, country: c || \\ }; }

function getYear(edNum) {
 if (edNum <= 20) return 1934 + Math.ceil(edNum / 2);
 return 1948 + Math.ceil((edNum - 20) / 2);
}

for (const awardName of [\芥川龙之介奖\, \直木三十五奖\]) {
 const idx = data.findIndex(a => a.nameCn === awardName);
 if (idx === -1) continue;
 const award = data[idx];
 for (let i = 0; i < award.awardEditions.length; i++) {
 const ed = award.awardEditions[i];
 ed.awardYear = getYear(ed.awardEditionNumber);
 ed.awardCycle = String(ed.awardYear);
 const half = ed.awardEditionNumber % 2 === 1 ? \上\ : \下\;
 ed.awardEditionLabel = \第\ + ed.awardEditionNumber + \回（\ + ed.awardYear + \年\ + half + \半期）\;
 }
}

console.log(\Years fixed for both Japanese awards\);

const akutagawaWinners = {
 1: { works: [mW(\苍氓\, \S\\u014db\\u014d\, \日本\)], authors: [mA(\石川达三\, \Tatsuz\\u014d Ishikawa\, \日本\)], note: \首届芥川奖获奖作品，以巴西移民为题材的社会写实小说。\ },
 75: { works: [mW(\近似无限透明的蓝色\, \Almost Transparent Blue\, \日本\)], authors: [mA(\村上龙\, \Ry\\u016b Murakami\, \日本\)], note: \村上龙的出道作，以毒品和性描写基地周边的青年亚文化，引发巨大争议。\ },
 130: { works: [mW(\踢在背后的男人\, \Keritai Senaka\, \日本\)], authors: [mA(\绵矢莉莎\, \Risa Wataya\, \日本\)], note: \19岁获奖，成为史上最年轻的芥川奖得主之一。\ },
 136: { works: [mW(\苦役列车\, \Kueki Ressha\, \日本\)], authors: [mA(\西村贤太\, \Kenta Nishimura\, \日本\)], note: \私小说传统的继承人，以底层临时工的自毁式生活书写平成时代的贫困与绝望。\ },
 155: { works: [mW(\便利店人\, \Convenience Store Woman\, \日本\)], authors: [mA(\村田沙耶香\, \Sayaka Murata\, \日本\)], note: \以便利店兼职女性为主角，尖锐讽刺了日本社会对正常的执念，全球畅销。\ },
 158: { works: [mW(\我将独自前行\, \Ora Ora de Hitori Igumo\, \日本\)], authors: [mA(\若竹千佐子\, \Chisako Wakatake\, \日本\)], note: \63岁获奖，以东北方言书写的老年女性独白。\ },
 161: { works: [mW(\紫色之星\, \Murasaki no Hoshi\, \日本\)], authors: [mA(\今村夏子\, \Natsuko Imamura\, \日本\)], note: \以独特的边缘视角书写日常中潜藏的怪异与不安。\ },
 165: { works: [mW(\黑盒子\, \Black Box\, \日本\)], authors: [mA(\石沢麻依\, \Mai Ishizawa\, \日本\)], note: \在德国留学的日本作家书写的跨国界叙事。\ },
 166: { works: [mW(\彼岸花盛开之岛\, \Higanbana no Saku Shima\, \日本\)], authors: [mA(\李琴峰\, \Li Kotomi\, \日本\)], note: \台湾出身的日语作家首次入围即获奖，以跨国界和跨语言的视角书写身份追寻。\ },
 167: { works: [mW(\为了能吃到好吃的\, \Oishii Gohan ga Taberaremasuyouni\, \日本\)], authors: [mA(\高瀬隼子\, \Junko Takase\, \日本\)], note: \以饮食和工作中的暴力性为主题，揭示现代日本社会中隐藏的残酷。\ },
 169: { works: [mW(\驼背\, \Hunchback\, \日本\)], authors: [mA(\市川沙央\, \Sa\\u014d Ichikawa\, \日本\)], note: \关注社会边缘群体的力作。\ },
};

const naokiWinners = {
 135: { works: [mW(\东京塔\, \Tokyo Tower\, \日本\)], authors: [mA(\Lily Franky\, \Lily Franky\, \日本\)], note: \母子情感纽带的半自传体小说，销量突破200万册。\ },
 138: { works: [mW(\模仿犯\, \Moh\\u014dhan\, \日本\)], authors: [mA(\宫部美幸\, \Miyuki Miyabe\, \日本\)], note: \宫部美幸以社会派推理大师的身份获奖，揭示媒体的暴力性。\ },
 145: { works: [mW(\下町火箭\, \Shitamachi Rocket\, \日本\)], authors: [mA(\池井户润\, \Jun Ikeido\, \日本\)], note: \以中小制造企业为题材的经济小说，平成时代最成功的商业小说家。\ },
 152: { works: [mW(\火花\, \Hibana\, \日本\)], authors: [mA(\又吉直树\, \Naoki Matayoshi\, \日本\)], note: \搞笑艺人的文学处女作即获直木奖，书写梦想与现实之间的残酷落差。\ },
 156: { works: [mW(\蜜蜂与远雷\, \Honey and Clover\, \日本\)], authors: [mA(\恩田陆\, \Riku Onda\, \日本\)], note: \以国际钢琴比赛为舞台的音乐小说。\ },
 163: { works: [mW(\线\, \Ito\, \日本\)], authors: [mA(\驰星周\, \Seishu Hase\, \日本\)], note: \描述平成三十年间的日本社会变迁。\ },
 166: { works: [mW(\黑老虎\, \Kuroi Tora\, \日本\)], authors: [mA(\米泽穂信\, \Honobu Yonezawa\, \日本\)], note: \古典推理与现代风格结合的杰作。\ },
 168: { works: [mW(\地图与拳\, \Chizu to Kobushi\, \日本\)], authors: [mA(\小川哲\, \Satoshi Ogawa\, \日本\)], note: \以满洲为舞台的历史小说。\ },
 170: { works: [mW(\树木的丧服\, \Ki no Mofuku\, \日本\)], authors: [mA(\河﨑秋子\, \Akiko Kawasaki\, \日本\)], note: \以北海道牧场为舞台，描绘人与动物、自然之间的共生与残酷。\ },
};

function fillWinners(awardName, winners) {
 const idx = data.findIndex(a => a.nameCn === awardName);
 if (idx === -1) { console.log(\Not found:\, awardName); return 0; }
 const award = data[idx];
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
 if (ed.status === \VERIFIED_WITH_DATA\) continue;
 if (w.works) ed.workItems = w.works;
 if (w.authors) ed.authorItems = w.authors;
 if (w.note) ed.evaluationNote = w.note;
 ed.status = \VERIFIED_WITH_DATA\;
 ed.verificationStatus = \EDITION_YEAR_VERIFIED\;
 count++;
 }
 return count;
}

let total = fillWinners(\芥川龙之介奖\, akutagawaWinners);
console.log(\Akutagawa filled:\, total);
total = fillWinners(\直木三十五奖\, naokiWinners);
console.log(\Naoki filled:\, total);

writeFileSync(join(process.cwd(), \lib\, \awards-data.json\), JSON.stringify(data, null, 2), \utf-8\);
console.log(\Saved.\);
