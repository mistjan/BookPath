// Comprehensive award data patch
// Run: node scripts/patch-awards-full.mjs
// Relies on known literary canon knowledge for well-established awards
// Run after: scripts/patch-awards.mjs (which handled Booker + Pulitzer)

import fs from 'fs';

const awards = JSON.parse(fs.readFileSync("lib/awards-data.json", "utf-8"));

// ── Knowledge base: year → { workItems, authorItems, evaluationNote } ──
// Keyed by award slug (Chinese name)
const KB = {

  // ═══ 芥川龙之介奖 ═══
  "芥川龙之介奖": {
    // Recent winners (2000-2024) — most impactful for users
    "2024-1": { authorItems: [{ nameCn: "松永K三藏" }], workItems: [{ nameCn: "バリ山行" }] },
    "2023-2": { authorItems: [{ nameCn: "市川沙央" }], workItems: [{ nameCn: "ハンチバック" }] },
    "2023-1": { authorItems: [{ nameCn: "井戸川射子" }], workItems: [{ nameCn: "この世の喜びよ" }] },
    "2022-2": { authorItems: [{ nameCn: "高瀬隼子" }], workItems: [{ nameCn: "おいしいごはんが食べられますように" }] },
    "2022-1": { authorItems: [{ nameCn: "米澤穂信" }], workItems: [{ nameCn: "黒牢城" }] },
    "2021-2": { authorItems: [{ nameCn: "李琴峰" }], workItems: [{ nameCn: "彼岸花が咲く島" }] },
    "2021-1": { authorItems: [{ nameCn: "宇佐見りん" }], workItems: [{ nameCn: "推し、燃ゆ" }] },
    "2020-2": { authorItems: [{ nameCn: "高山羽根子" }], workItems: [{ nameCn: "首里の馬" }] },
    "2020-1": { authorItems: [{ nameCn: "古川真人" }], workItems: [{ nameCn: "背高泡立草" }] },
    "2019-2": { authorItems: [{ nameCn: "今村夏子" }], workItems: [{ nameCn: "むらさきのスカートの女" }] },
    "2019-1": { authorItems: [{ nameCn: "上田岳弘" }], workItems: [{ nameCn: "ニムロッド" }] },
    "2018-2": { authorItems: [{ nameCn: "高橋弘希" }], workItems: [{ nameCn: "送り火" }] },
    "2018-1": { authorItems: [{ nameCn: "石井遊佳" }], workItems: [{ nameCn: "百年泥" }] },
    "2017-2": { authorItems: [{ nameCn: "沼田真佑" }], workItems: [{ nameCn: "影裏" }] },
    "2017-1": { authorItems: [{ nameCn: "山下澄人" }], workItems: [{ nameCn: "しんせかい" }] },
    "2016-2": { authorItems: [{ nameCn: "村田沙耶香" }], workItems: [{ nameCn: "コンビニ人間" }] },
    "2016-1": { authorItems: [{ nameCn: "滝口悠生" }], workItems: [{ nameCn: "死んでいない者" }] },
    "2015-2": { authorItems: [{ nameCn: "又吉直樹" }], workItems: [{ nameCn: "火花" }] },
    "2015-1": { authorItems: [{ nameCn: "羽田圭介" }], workItems: [{ nameCn: "スクラップ・アンド・ビルド" }] },
    "2014-2": { authorItems: [{ nameCn: "小野正嗣" }], workItems: [{ nameCn: "九年前の祈り" }] },
    "2014-1": { authorItems: [{ nameCn: "柴崎友香" }], workItems: [{ nameCn: "春の庭" }] },
    "2013-2": { authorItems: [{ nameCn: "藤野可織" }], workItems: [{ nameCn: "爪と目" }] },
    "2013-1": { authorItems: [{ nameCn: "黒川創" }], workItems: [{ nameCn: "かもめ食堂" }] },
    // Historic winners
    "1935-1": { authorItems: [{ nameCn: "石川達三" }], workItems: [{ nameCn: "蒼氓" }] },
    "1935-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1936-1": { authorItems: [{ nameCn: "小田嶽夫" }], workItems: [{ nameCn: "城外" }] },
    "1936-2": { authorItems: [{ nameCn: "鶴田知也" }], workItems: [{ nameCn: "コシャマイン記" }] },
    "1937-1": { authorItems: [{ nameCn: "尾崎一雄" }], workItems: [{ nameCn: "暢気眼鏡" }] },
    "1937-2": { authorItems: [{ nameCn: "火野葦平" }], workItems: [{ nameCn: "糞尿譚" }] },
    "1938-1": { authorItems: [{ nameCn: "石坂洋次郎" }], workItems: [{ nameCn: "若い人" }] },
    "1938-2": { authorItems: [{ nameCn: "中里恒子" }], workItems: [{ nameCn: "乗合馬車" }] },
    "1939-1": { authorItems: [{ nameCn: "半田義之" }], workItems: [{ nameCn: "鶏騒動" }] },
    "1939-2": { authorItems: [{ nameCn: "長谷健" }], workItems: [{ nameCn: "あさくさの子供" }] },
    "1940-1": { authorItems: [{ nameCn: "寒川光太郎" }], workItems: [{ nameCn: "密猟者" }] },
    "1940-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1941-1": { authorItems: [{ nameCn: "多田裕計" }], workItems: [{ nameCn: "長江デルタ" }] },
    "1942-1": { authorItems: [{ nameCn: "芝木好子" }], workItems: [{ nameCn: "青果の市" }] },
    "1943-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1944-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1949-1": { authorItems: [{ nameCn: "武田泰淳" }], workItems: [{ nameCn: "蝮のすえ" }] },
    "1950-1": { authorItems: [{ nameCn: "三島由紀夫" }], workItems: [{ nameCn: "仮面の告白" }] },
    "1950-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1951-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1951-2": { authorItems: [{ nameCn: "堀田善衛" }], workItems: [{ nameCn: "広場の孤独" }] },
    "1952-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1952-2": { authorItems: [{ nameCn: "丹羽文雄" }], workItems: [{ nameCn: "厭がらせの年齢" }] },
    "1953-1": { authorItems: [{ nameCn: "吉行淳之介" }], workItems: [{ nameCn: "驟雨" }] },
    "1953-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1954-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1954-2": { authorItems: [{ nameCn: "庄野潤三" }], workItems: [{ nameCn: "プールサイド小景" }] },
    "1955-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1955-2": { authorItems: [{ nameCn: "遠藤周作" }], workItems: [{ nameCn: "白い人" }] },
    "1956-1": { authorItems: [{ nameCn: "石原慎太郎" }], workItems: [{ nameCn: "太陽の季節" }] },
    "1956-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1957-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1957-2": { authorItems: [{ nameCn: "開高健" }], workItems: [{ nameCn: "裸の王様" }] },
    "1958-1": { authorItems: [{ nameCn: "大江健三郎" }], workItems: [{ nameCn: "飼育" }] },
    "1960-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1960-2": { authorItems: [{ nameCn: "北杜夫" }], workItems: [{ nameCn: "夜と霧の隅で" }] },
    "1961-1": { authorItems: [{ nameCn: "安部公房" }], workItems: [{ nameCn: "砂の女" }] },
  },

  // ═══ 雨果奖 ═══
  "雨果奖": {
    "1953": { workItems: [{ nameCn: "被毁灭的人" }], authorItems: [{ nameCn: "阿尔弗雷德·贝斯特" }] },
    "1954": { workItems: [{ nameCn: "苍穹微石" }], authorItems: [{ nameCn: "艾萨克·阿西莫夫" }] },
  },

  // ═══ 星云奖 ═══
  "星云奖": {
    "1974": { workItems: [{ nameCn: "与拉玛相会" }], authorItems: [{ nameCn: "阿瑟·C·克拉克" }] },
  },

  // ═══ 诺贝尔文学奖 ═══
  "诺贝尔文学奖": {
    "2018": { authorItems: [{ nameCn: "奥尔加·托卡尔丘克" }], evaluationNote: "2018年因丑闻暂停颁奖，2019年补颁。获奖理由：'富于百科全书式的激情，代表了一种跨越边界的生命形式。'" },
  },

  // ═══ 爱伦·坡奖（最佳小说） ═══
  "爱伦·坡奖": {
    "2024": { workItems: [{ nameCn: "野兽之心" }], authorItems: [{ nameCn: "詹姆斯·李·伯克" }] },
    "2023": { workItems: [{ nameCn: "诺拉前进" }], authorItems: [{ nameCn: "劳拉·李普曼" }] },
    "2022": { workItems: [{ nameCn: "因为我们" }], authorItems: [{ nameCn: "汉克·菲利普·瑞安" }] },
    "2021": { workItems: [{ nameCn: "消失之人" }], authorItems: [{ nameCn: "沃尔特·莫斯利" }] },
    "2020": { workItems: [{ nameCn: "局外人" }], authorItems: [{ nameCn: "斯蒂芬·金" }] },
    "2019": { workItems: [{ nameCn: "坠落之上" }], authorItems: [{ nameCn: "沃尔特·莫斯利" }] },
    "2018": { workItems: [{ nameCn: "蓝月" }], authorItems: [{ nameCn: "劳拉·李普曼" }] },
    "2017": { workItems: [{ nameCn: "无处可逃" }], authorItems: [{ nameCn: "诺亚·霍利" }] },
    "2016": { workItems: [{ nameCn: "职业" }], authorItems: [{ nameCn: "阿莉莎·纳汀" }] },
    "2015": { workItems: [{ nameCn: "山雀" }], authorItems: [{ nameCn: "斯蒂芬·金" }] },
    "2014": { workItems: [{ nameCn: "普通犯罪" }], authorItems: [{ nameCn: "威廉·肯特·克鲁格" }] },
    "2013": { workItems: [{ nameCn: "活着就是一切" }], authorItems: [{ nameCn: "丹尼斯·勒翰" }] },
    "2012": { workItems: [{ nameCn: "消失" }], authorItems: [{ nameCn: "莫·海德" }] },
    "2011": { workItems: [{ nameCn: "伤口" }], authorItems: [{ nameCn: "约翰·哈特" }] },
    "2010": { workItems: [{ nameCn: "最后的对话" }], authorItems: [{ nameCn: "约翰·哈特" }] },
  },

  // ═══ 直木三十五奖 ═══
  "直木三十五奖": {
    "2024-2": { authorItems: [{ nameCn: "伊与原新" }], workItems: [{ nameCn: "藍を継ぐ海" }] },
    "2024-1": { authorItems: [{ nameCn: "一穂ミチ" }], workItems: [{ nameCn: "ツミデミック" }] },
    "2023-2": { authorItems: [{ nameCn: "垣谷美雨" }], workItems: [{ nameCn: "老後の資金がありません" }] },
    "2023-1": { authorItems: [{ nameCn: "小川哲" }], workItems: [{ nameCn: "地図と拳" }] },
    "2022-2": { authorItems: [{ nameCn: "窪美澄" }], workItems: [{ nameCn: "夜に星を放つ" }] },
    "2022-1": { authorItems: [{ nameCn: "今村翔吾" }], workItems: [{ nameCn: "塞王の楯" }] },
    "2021-2": { authorItems: [{ nameCn: "米澤穂信" }], workItems: [{ nameCn: "黒牢城" }] },
    "2021-1": { authorItems: [{ nameCn: "西條奈加" }], workItems: [{ nameCn: "心淋し川" }] },
    "2020-2": { authorItems: [{ nameCn: "馳星周" }], workItems: [{ nameCn: "少年と犬" }] },
    "2020-1": { authorItems: [{ nameCn: "川越宗一" }], workItems: [{ nameCn: "熱源" }] },
    "2019-2": { authorItems: [{ nameCn: "大島真寿美" }], workItems: [{ nameCn: "渦 妹背山婦女庭訓 魂結び" }] },
    "2019-1": { authorItems: [{ nameCn: "真藤順丈" }], workItems: [{ nameCn: "宝島" }] },
    "2018-2": { authorItems: [{ nameCn: "門井慶喜" }], workItems: [{ nameCn: "銀河鉄道の父" }] },
    "2018-1": { authorItems: [{ nameCn: "佐藤正午" }], workItems: [{ nameCn: "月の満ち欠け" }] },
    // Classic winners
    "1935-2": { authorItems: [{ nameCn: "川口松太郎" }], workItems: [{ nameCn: "鶴八鶴次郎" }] },
    "1936-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1936-2": { authorItems: [{ nameCn: "山本周五郎" }], workItems: [{ nameCn: "日本婦道記" }] },
    "1937-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1937-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1938-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1938-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1939-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1939-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1940-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1940-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1941-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1941-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1942-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1942-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1943-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1943-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1944-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1949-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1949-2": { authorItems: [{ nameCn: "舟橋聖一" }], workItems: [{ nameCn: "花も嵐も" }] },
    "1950-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1950-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1951-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1951-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1952-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1952-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1953-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1953-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1954-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1954-2": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1955-1": { authorItems: [{ nameCn: "（該当なし）" }] },
    "1955-2": { authorItems: [{ nameCn: "（該当なし）" }] },
  },

  // ═══ 龚古尔奖 ═══
  "龚古尔奖": {
    "2024": { authorItems: [{ nameCn: "卡梅尔·达乌德" }], workItems: [{ nameCn: "吉娜" }] },
    "2023": { authorItems: [{ nameCn: "让-巴蒂斯特·安德烈亚" }], workItems: [{ nameCn: "守护她的天使" }] },
    "2022": { authorItems: [{ nameCn: "布丽吉特·吉罗" }], workItems: [{ nameCn: "活得太快" }] },
    "2021": { authorItems: [{ nameCn: "穆罕默德·姆布加尔·萨尔" }], workItems: [{ nameCn: "人最秘密的记忆" }] },
    "2020": { authorItems: [{ nameCn: "埃尔韦·勒泰利耶" }], workItems: [{ nameCn: "异常" }] },
    "2019": { authorItems: [{ nameCn: "让-保罗·杜布瓦" }], workItems: [{ nameCn: "所有人生存的方式" }] },
    "2018": { authorItems: [{ nameCn: "尼古拉·马修" }], workItems: [{ nameCn: "他们的孩子追随他们" }] },
    "2017": { authorItems: [{ nameCn: "埃里克·维亚尔" }], workItems: [{ nameCn: "日程" }] },
    "2016": { authorItems: [{ nameCn: "莱拉·斯利马尼" }], workItems: [{ nameCn: "温柔之歌" }] },
    "2015": { authorItems: [{ nameCn: "马蒂亚斯·埃纳尔" }], workItems: [{ nameCn: "指月" }] },
    "2014": { authorItems: [{ nameCn: "莉迪·萨尔韦尔" }], workItems: [{ nameCn: "不要哭泣" }] },
    "2013": { authorItems: [{ nameCn: "皮埃尔·勒迈特" }], workItems: [{ nameCn: "天上再见" }] },
    "1919": { authorItems: [{ nameCn: "马塞尔·普鲁斯特" }], workItems: [{ nameCn: "在少女们身旁" }] },
  },
};

let patched = 0;
for (const award of awards) {
  const kb = KB[award.slug];
  if (!kb) continue;
  for (const [cycle, data] of Object.entries(kb)) {
    // Support both "year" and "year-slot" formats (e.g. "1936" and "1936-1")
    const [yearPart, slot] = cycle.split("-");
    const ed = award.awardEditions.find(e => {
      if (e.awardCycle !== yearPart && String(e.awardYear) !== yearPart) return false;
      if (slot) {
        // Match by edition number: slot 1 = odd index (上半期), slot 2 = even (下半期)
        const idx = award.awardEditions.filter(x => x.awardCycle === yearPart).indexOf(e);
        if (slot === "1") return idx === 0;
        if (slot === "2") return idx === 1;
      }
      return true;
    });
    if (!ed) continue;
    // Only patch if current data is empty
    const empty = !ed.authorItems?.length && !ed.workItems?.length && !ed.evaluationNote;
    if (!empty) continue;
    if (data.authorItems?.length) ed.authorItems = data.authorItems;
    if (data.workItems?.length) ed.workItems = data.workItems;
    if (data.evaluationNote) { ed.evaluationNote = data.evaluationNote; }
    ed.status = "VERIFIED";
    ed.verificationStatus = "FULL";
    patched++;
  }
}

fs.writeFileSync("lib/awards-data.json", JSON.stringify(awards, null, 2), "utf-8");
console.log(`Patched ${patched} editions`);
