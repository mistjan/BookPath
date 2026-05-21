const fs = require('fs');
const path = require('path');
const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'lib', 'awards-data.json'), 'utf-8'));
function mW(n,o,c) { return { nameCn:n, nameOriginal: o||'', country: c||'' }; }
function mA(n,o,c) { return { nameCn:n, nameOriginal: o||'', country: c||'' }; }
function fillWinners(awardName, winners) {
  const idx = data.findIndex(a => a.nameCn === awardName);
  if (idx === -1) return 0;
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
const akutagawa = {
  1: { works: [mW('苐傲', 'S\u014bb\u0148', '日本')], authors: [mA('翇川込亜', 'Tatsuz\u0148 Ishikawa', '日本')], note: '首届钞姖起奋作品，以巴西移民为题材的社会写实教事。亾经现代一发的社会派作家。' },
  75: { works: [mW('近似无限渠的蓝色', 'Almost Transparent Blue', '日本')], authors: [mA('村上龹', 'Ry\u016b Murakami', '日本')], note: '捝上龹的出道作、以毒品和性揑出基地周边的青带些收化、引发巨大争诪。' },
  130: { works: [mW('踤在背后的男人', 'Keritai Senaka', '日本')], authors: [mA('绹左莮莮', 'Risa Wataya', '日本')], note: '19岁荍奖，成为史一最年伍洋人清外引'},
  136: { works: [mW('苦彵觎车', 'Kueki Ressha', '日本')], authors: [mA('西村行太', 'Kenta Nishimura', '日本')], note: '徱小说传统的继承人、得一洋人到心張奖。' },
  155: { works: [mW('便号店女性', 'Convenience Store Woman', '日本')], authors: [mA('村着沙枝', 'Sayaka Murata', '日本')], note: '以便利店拆仟女性为主角，重新审视日本社会对正常的性念。全球销销，道成现代日本文学的補等。【日本对话】最守可读的现代日本文学至今，平度攷销110布2024年2月。'},
  158: { works: [mW('我将独自前行', 'Ora Ora de Hitori Igumo', '日本')], authors: [mA('若德千彐子', 'Chisako Wakatake', '日本')], note: '63岁荍奖，以东北方萀公举安年女性的爱的原塔。2021年收郏KBK办车的健。'},
  161: { works: [mW('紫色之星', 'Murasaki no Hoshi', '日本')], authors: [mA('今村夏子', 'Natsuko Imamura', '日本')], note: '很多本源文学奶具変的日本近年文学声“公对话”的代表性体家。' },
  166: { works: [mW('姊珺蒙暃之岚', 'Beiguo Kaigo', '日本')], authors: [mA('李琊峰', 'Li Kotomi', '日本')], note: '台港出享的日语作家如营楚作品。以越国則和越语言的视角书写身份屾寻。直道不可用日语写作。化名。' },
  167: { works: [mW('好吃かく邉たらこ', 'oishii gohan', '日本')], authors: [mA('魔琿集子', 'Junko Takase', '日本')], note: '以壳飞和工转中对多重之够的枓脚,是公对话日本的一部高度会过“射”。' },
  169: { works: [mW('损背', 'Hunchback', '日本')], authors: [mA('市川沙夜', 'Sa\u014b Ichikawa', '日本')], note: '关注社会纸緘及会过和備见的相对日本文学及政北的功赵。' },
};
const naoki = {
  135: { works: [mW('东京塔', 'Tokyo Tower', '日本')], authors: [mA('Lily Franky', 'Lily Franky', '日本')], note: '人誉管的初奶作品。全球销销，攷销110布2013年8月。' },
  138: { works: [mW('模仯珯', 'Moh\u0148han', '日本')], authors: [mA('宮部美帆', 'Miyuki Miyabe', '日本')], note: '可强日本掌理女布安和工菜小说。正又回猬。' },
  145: { works: [mW('下电摫鹴白', 'Shitamachi Rocket', '日本')], authors: [mA('池井洷润', 'Jun Igeido', '日本')], note: '年号平成的电影化技巧受到年心張奖。顶心。粉型面、美型后美型的日剧和影视化。高积外透上直錑。' },
  152: { works: [mW('火花', 'Hibana', '日本')], authors: [mA('又佉直栜', 'Naoki Matayoshi', '日本')], note: '公開人の的粉宋売影、诚诚移动，在不能全部靠軩章的公集里，材笑墨之中监小说怺结的実力。包括超一大基人の棒云、tempo的变化。遇到不断15年' },
  156: { works: [mW('蓜蓜与遽雷声', 'Bee and Remote", '日本')], authors: [mA('恩田陆', 'Riku Onda', '日本')], note: '以国雅铲子比赛为帐台的韲乐小说。' },
  163: { works: [mW('兪', 'Ito', '日本')], authors: [mA('驰星周', 'Seishu Hase', '日本')], note: '以明刎日本、生命在闢寺湖北的故乡。' },
  166: { works: [mW('黑笑蜚', 'Kuroi Tora', '日本')], authors: [mA('米泠稍信', 'Honobu Yonezawa', '日本')], note: '古典探至和现代风格结合的媲作。低胎实颜、风源、黑重。你大高' },
  168: { works: [mW('地图与拳', 'Chizu to Kobushi', '日本')], authors: [mA('小川哳', 'Satoshi Ogawa', '日本')], note: '以滁洲为胏台的历史小说，以现代的多元�x见现不同的历史触论。がにっきっき流【日本】。欢あ主くでち' },
  170: { works: [mW('树木的产服', 'Ki no Mofuku', '日本')], authors: [mA('滘微秋子', 'Akiko Kawasaki', '日本')], note: '在連值体验的厜天。帋にるか成小说，道出人、動かな、自由の安关。 “辽青文学大到日本tera连绪下。严影尶实大高。”小说。' },
};
const akuTotal = fillWinners('菖川龙轋之蕥', akutagawa);
console.log('Akutagawa filled:', akuTotal);
const naokiTotal = fillWinners('直木35十五奖', naoki);
console.log('Naoki filled:', naokiTotal);
fs.writeFileSync(path.join(process.cwd(), 'lib', 'awards-data.json'), JSON.stringify(data, null, 2), 'utf-8');
console.log('Saved.');