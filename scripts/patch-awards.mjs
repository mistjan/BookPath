import fs from "fs";

const awards = JSON.parse(fs.readFileSync("lib/awards-data.json", "utf-8"));

const knownData = {
  "布克奖": {
    "2024": { workItems: [{ nameCn: "轨道", nameOriginal: "Orbital", country: "英国" }], authorItems: [{ nameCn: "萨曼莎·哈维", country: "英国" }], evaluationNote: "一部关于国际空间站宇航员的小说，以诗意的笔触描绘地球的壮丽与脆弱。" },
    "2023": { workItems: [{ nameCn: "先知之歌", nameOriginal: "Prophet Song", country: "爱尔兰" }], authorItems: [{ nameCn: "保罗·林奇", country: "爱尔兰" }] },
    "2022": { workItems: [{ nameCn: "七次谋杀简史", nameOriginal: "The Seven Moons of Maali Almeida", country: "斯里兰卡" }], authorItems: [{ nameCn: "谢汉·卡鲁纳蒂拉卡", country: "斯里兰卡" }] },
    "2021": { workItems: [{ nameCn: "承诺", nameOriginal: "The Promise", country: "南非" }], authorItems: [{ nameCn: "达蒙·加尔格特", country: "南非" }] },
    "2020": { workItems: [{ nameCn: "舒吉·贝恩", nameOriginal: "Shuggie Bain", country: "英国" }], authorItems: [{ nameCn: "道格拉斯·斯图尔特", country: "英国" }] },
    "2019": { workItems: [{ nameCn: "女人、女孩、其他", nameOriginal: "Girl, Woman, Other", country: "英国" }], authorItems: [{ nameCn: "伯娜丁·埃瓦里斯托", country: "英国" }] },
    "2018": { workItems: [{ nameCn: "送奶工", nameOriginal: "Milkman", country: "英国" }], authorItems: [{ nameCn: "安娜·伯恩斯", country: "英国" }] },
    "2017": { workItems: [{ nameCn: "林肯在中阴界", nameOriginal: "Lincoln in the Bardo", country: "美国" }], authorItems: [{ nameCn: "乔治·桑德斯", country: "美国" }] },
  },
  "普利策小说奖": {
    "2024": { workItems: [{ nameCn: "守夜", nameOriginal: "Night Watch", country: "美国" }], authorItems: [{ nameCn: "杰恩·安妮·菲利普斯", country: "美国" }] },
    "2023": { workItems: [{ nameCn: "恶魔铜头蛇", nameOriginal: "Demon Copperhead", country: "美国" }], authorItems: [{ nameCn: "芭芭拉·金索沃", country: "美国" }] },
    "2022": { workItems: [{ nameCn: "络新妇之理", nameOriginal: "The Netanyahus", country: "美国" }], authorItems: [{ nameCn: "约书亚·科恩", country: "美国" }] },
    "2021": { workItems: [{ nameCn: "殖民家园", nameOriginal: "The Night Watchman", country: "美国" }], authorItems: [{ nameCn: "路易丝·厄德里克", country: "美国" }] },
    "2020": { workItems: [{ nameCn: "镍币男孩", nameOriginal: "The Nickel Boys", country: "美国" }], authorItems: [{ nameCn: "科尔森·怀特黑德", country: "美国" }] },
    "2019": { workItems: [{ nameCn: "树语", nameOriginal: "The Overstory", country: "美国" }], authorItems: [{ nameCn: "理查德·鲍尔斯", country: "美国" }] },
    "2018": { workItems: [{ nameCn: "少", nameOriginal: "Less", country: "美国" }], authorItems: [{ nameCn: "安德鲁·西恩·格利尔", country: "美国" }] },
    "2017": { workItems: [{ nameCn: "地下铁道", nameOriginal: "The Underground Railroad", country: "美国" }], authorItems: [{ nameCn: "科尔森·怀特黑德", country: "美国" }] },
  },
};

let patched = 0;
for (const award of awards) {
  const known = knownData[award.slug];
  if (!known) continue;
  for (const [cycle, data] of Object.entries(known)) {
    const ed = award.awardEditions.find(e => e.awardCycle === cycle || String(e.awardYear) === cycle);
    if (!ed) continue;
    if (data.authorItems?.length && !ed.authorItems?.length) ed.authorItems = data.authorItems;
    if (data.workItems?.length && !ed.workItems?.length) ed.workItems = data.workItems;
    if (data.evaluationNote && !ed.evaluationNote) { ed.evaluationNote = data.evaluationNote; ed.status = "VERIFIED"; ed.verificationStatus = "FULL"; }
    patched++;
  }
}

fs.writeFileSync("lib/awards-data.json", JSON.stringify(awards, null, 2), "utf-8");
console.log(`Patched ${patched} editions`);
