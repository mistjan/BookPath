// Batch 9: More essential missing works
import fs from "fs";
const R = fs.readFileSync("lib/bookpath-data.ts", "utf-8");
const O = R.indexOf("{", R.indexOf("export const bookPathData = "));
let d = 0, E = O;
for (let i = O; i < R.length; i++) { if (R[i] === "{") d++; else if (R[i] === "}") { d--; if (d === 0) { E = i + 1; break; } } }
const D = JSON.parse(R.slice(O, E));
function add(t, o, a, c, y, cat, sub, diff, beg, m, g) {
  const slug = t.replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
  if (D.works.some((w) => w.slug === slug)) { console.log(`Skip ${t}`); return; }
  D.works.push({ id: slug, slug, titleDisplayCn: t, titleOriginal: o, authorName: a, countryOrRegion: c, firstPublishedYear: y, literaryCategory: cat, literarySubcategory: sub, workType: "长篇小说", difficultyLevel: diff, beginnerEntry: beg, movementIds: m, guideCardIds: [`guide-${slug}`] });
  D.guideCards.push({ id: `guide-${slug}`, workId: slug, title: t, ...g, aiGenerated: false, reviewStatus: "AI_DRAFT" });
  console.log(`+ ${t}`);
}

add("地下室手记", "Записки из подполья", "陀思妥耶夫斯基", "俄国", 1864, "小说", "存在主义小说", 3, false, ["existentialism", "realism"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "一个在地下室生活了40年的男人写了一篇自我剖析——他卑微、恶毒又清醒。",
  whyClassic: "被公认为存在主义文学的先驱之作。第一部分是思想宣言，第二部分是故事。它比萨特和加缪早了将近一个世纪。",
  whyRead: "主角的自我剖析让人极度不适——但你无法否认他说的话有一部分是真相。陀思妥耶夫斯基对'理性利己主义'的批判至今没有被超越。",
  suitableFor: "适合对存在主义、心理学有兴趣的读者。",
  notSuitableFor: "主角的心理状态黑暗且自虐。",
  difficultyLevel: 3,
  difficultyReason: "第一部分是密集的哲学思考，需要慢读；第二部分是故事，更容易进入。整体需要读者对'非理性'有一定的理解意愿。",
  readingPrerequisites: "不需要。",
  readingAdvice: "如果第一部分读不进去，直接从第二部分开始，读完再回来读第一部分。",
  beginnerEntry: false,
});

add("战争与和平", "Война и мир", "列夫·托尔斯泰", "俄国", 1869, "小说", "历史小说", 4, false, ["realism"], {
  roleInPath: "ADVANCED", suitability: "适合有充足阅读时间和耐心的读者",
  oneSentencePositioning: "拿破仑战争时期，五个家族在爱情、战争和寻找人生意义之间挣扎。",
  whyClassic: "史上最伟大的长篇小说之一。用超过一千页覆盖了战争与和平、青春与衰老、生与死。它的野心是——把整个时代装进一本书。",
  whyRead: "读它不是为了完成任务，而是为了进入一个世界——你会认识皮埃尔、安德烈、娜塔莎，他们会成为你真实记忆的一部分。",
  suitableFor: "适合愿意投入大量时间的严肃读者。",
  notSuitableFor: "篇幅极长（完整版约1500页），人物众多，需要极大的时间投入。",
  difficultyLevel: 4,
  difficultyReason: "篇幅是最大挑战。大量角色（有谱系图）、多条叙事线、穿插历史论文。托尔斯泰的句子偏长，但结构清晰。",
  readingPrerequisites: "对拿破仑战争的基本历史了解有帮助。",
  readingAdvice: "不要被'史上最伟大小说'的名头吓到。把它当成一个家族故事来读——关于年轻人找对象、上战场、思考人生意义。",
  beginnerEntry: false,
});

add("红与黑", "Le Rouge et le Noir", "司汤达", "法国", 1830, "小说", "心理小说", 3, false, ["realism"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读耐心的读者",
  oneSentencePositioning: "一个野心勃勃的平民青年想靠爱情和才智爬上社会顶层——但时代不让他如愿。",
  whyClassic: "19世纪现实主义小说的奠基之作。于连·索雷尔是文学史上最复杂的角色之一——他既让人鄙视又让人同情。",
  whyRead: "于连的内心世界是这部小说的真正舞台。他不是好人，但他的处境——一个有才华的穷人必须撒谎才能生存——让人无法简单评判。",
  suitableFor: "适合喜欢心理深度和社会批判的读者。",
  notSuitableFor: "19世纪叙事节奏较慢。",
  difficultyLevel: 3,
  difficultyReason: "语言是19世纪法语小说的风格（翻译版通常不错）。心理描写密集。需要读者对当时法国社会阶层有一些理解。",
  readingPrerequisites: "对法国复辟时期（1815-1830）的社会背景有一些了解会帮助。",
  readingAdvice: "注意标题的含义——红是军装（拿破仑时代），黑是教袍（复辟时代）。于连在两个道路之间选择。",
  beginnerEntry: false,
});

add("包法利夫人", "Madame Bovary", "居斯塔夫·福楼拜", "法国", 1856, "小说", "现实主义小说", 3, false, ["realism"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读耐心的读者",
  oneSentencePositioning: "一个乡村医生的妻子被浪漫小说毁了——她以为生活应该有另一种样子。",
  whyClassic: "福楼拜用五年时间写这部小说，每一句都经过精密打磨。它被公认为最完美的法语小说之一。福楼拜说'包法利夫人就是我'——他指的不是出轨，而是对完美形式的追求。",
  whyRead: "爱玛不是坏人——她只是在一个无聊的小镇和一段平淡的婚姻里窒息。她的悲剧不在于她追求浪漫，而在于她追求的浪漫是消费品。",
  suitableFor: "适合喜欢精致文笔和心理描写的读者。",
  notSuitableFor: "叙事节奏缓慢，全书几乎没有重大事件。",
  difficultyLevel: 3,
  difficultyReason: "福楼拜的写作风格极度精密，句子结构复杂。翻译版通常保留了这种精致感。需要读者有欣赏'叙事艺术'本身的心态。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意福楼拜的'非个人化'叙事——他从不评判爱玛，只是呈现。这种克制本身就是一种立场。",
  beginnerEntry: false,
});

add("变形记", "Die Verwandlung", "弗兰茨·卡夫卡", "捷克/德语", 1915, "小说", "中篇小说", 2, true, ["modernism", "existentialism"], {
  roleInPath: "ENTRY", suitability: "适合作为现代主义文学入门",
  oneSentencePositioning: "一个推销员某天早上醒来发现自己变成了一只巨大的甲虫。",
  whyClassic: "20世纪文学最重要的开场之一。卡夫卡用一个不可能的事件写了一部最真实的小说。它被无数种方式解读——但每一种解读都没有穷尽它。",
  whyRead: "篇幅极短（不到100页），2-3小时读完。但格里高尔变成甲虫后家人的反应——从震惊到厌恶到放弃——是对'爱是否有条件'最冷峻的审视。",
  suitableFor: "适合所有层次的读者。短小精悍，适合入门现代文学。",
  notSuitableFor: "格调灰暗压抑。",
  difficultyLevel: 2,
  difficultyReason: "篇幅短，叙事冷静清晰（卡夫卡用最平静的语调讲最离奇的事）。文字本身不难。主题的深度不影响阅读的流畅性。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意卡夫卡的叙事语调——格里高尔变成甲虫后，叙述者的语气没有任何变化。这种'冷静'本身就是小说的核心。",
  beginnerEntry: true,
});

add("审判", "Der Prozess", "弗兰茨·卡夫卡", "捷克/德语", 1925, "小说", "寓言小说", 3, false, ["modernism", "existentialism"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "一个银行职员在某个早上被逮捕了——但他不知道自己犯了什么罪。",
  whyClassic: "卡夫卡最长的作品，也是最令人不安的。K被逮捕、被审判、被判刑，但他始终不知道罪名是什么。这不是司法小说，是关于存在本身的寓言。",
  whyRead: "它预见了20世纪的极权主义审判——那些'你不需要知道自己犯了什么罪，我们也不需要告诉你'的体制。但它的意义不止于此。",
  suitableFor: "适合喜欢寓言式叙事和哲学思考的读者。",
  notSuitableFor: "未完成作品（卡夫卡死后由友人整理出版），章节之间有不连贯之处。",
  difficultyLevel: 3,
  difficultyReason: "叙事虽然是线性的，但逻辑是噩梦式的——在K的世界里，现实规则不适用。需要读者接受'不解释'的叙事态度。",
  readingPrerequisites: "不需要。",
  readingAdvice: "不要试图用现实逻辑理解法庭系统——卡夫卡描写的不是司法机构，而是存在的状态。",
  beginnerEntry: false,
});

add("城堡", "Das Schloss", "弗兰茨·卡夫卡", "捷克/德语", 1926, "小说", "寓言小说", 3, false, ["modernism", "existentialism"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "一个土地测量员被召唤到城堡所属的村庄，但无论如何都无法进入城堡。",
  whyClassic: "卡夫卡最后一部未完成的长篇小说。'城堡'已经成为'可望不可即'的象征——无论是意义、救赎还是体制的许可。",
  whyRead: "K一直在努力——不断尝试、不断失败、不断调整策略。他不是卡夫卡式的被动受害者，而是一个主动的行动者——这就是为什么他的失败更令人沮丧。",
  suitableFor: "适合喜欢多义性和开放解读的读者。",
  notSuitableFor: "未完成。叙事节奏缓慢。",
  difficultyLevel: 3,
  difficultyReason: "卡夫卡式的'噩梦逻辑'——表面上是现实主义叙事，但细节不合理。需要适应这种'清醒的梦'状态。",
  readingPrerequisites: "不需要。",
  readingAdvice: "K的行动本身比结果重要——他一直在尝试进入城堡，这个'尝试'就是小说的全部。",
  beginnerEntry: false,
});

add("看不见的人", "Invisible Man", "拉尔夫·埃里森", "美国", 1952, "小说", "文学小说", 3, false, ["modernism", "postcolonial"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "一个黑人青年在种族隔离的美国寻找自己的身份——但他发现自己在白人眼中是'看不见的'。",
  whyClassic: "美国国家图书奖获奖作品，战后美国文学最重要的作品之一。不是抗议小说——远高于抗议小说。它用超现实主义手法展示种族主义的荒诞。",
  whyRead: "它不是写'黑人受到迫害'——这是我们都知道的。它写的是：当社会拒绝看见你，你如何看见自己？",
  suitableFor: "适合对种族、身份问题有兴趣的读者。",
  notSuitableFor: "部分超现实主义场景可能让习惯现实主义的读者困惑。",
  difficultyLevel: 3,
  difficultyReason: "融合了现实主义、超现实主义和表现主义风格。叙事有时是散文式的，有时是戏剧化的。需要读者接受多种叙事风格。",
  readingPrerequisites: "不需要。对美国种族隔离历史的基本了解有帮助。",
  readingAdvice: "开头的那场'战斗'是全书的关键——荒诞到了极点，但每一层荒诞都有真实的指涉。",
  beginnerEntry: false,
});

add("第二性", "Le Deuxième Sexe", "西蒙娜·波伏娃", "法国", 1949, "非虚构", "女性主义哲学", 4, false, ["existentialism"], {
  roleInPath: "ADVANCED", suitability: "适合对哲学和社会学有兴趣的读者",
  oneSentencePositioning: "女人不是天生的，而是后天变成的。",
  whyClassic: "女性主义经典中的经典。波伏娃用存在主义哲学分析了女性在历史和文化中被定义为他者的过程。'成为女人'这个概念改变了现代思想。",
  whyRead: "它不是愤怒的控诉，而是冷静的分析。波伏娃从生物学、精神分析、历史、文学等多个角度论证：女性的处境是被建构的，不是天然的。",
  suitableFor: "适合对女性主义、社会批判和存在主义哲学有兴趣的读者。",
  notSuitableFor: "篇幅极长（中文版约800页），理论性强。",
  difficultyLevel: 4,
  difficultyReason: "哲学论述密集，需要一定的阅读耐受力。大量的历史和文化案例增加了厚度但不算难懂。存在主义术语需要适应。",
  readingPrerequisites: "不对哲学有排斥心理。不需要提前了解存在主义——波伏娃会在书中解释。",
  readingAdvice: "可以从'神话'一章开始读——它对女性被塑造的形象（处女、母亲、妓女）的分析最有冲击力。",
  beginnerEntry: false,
});

add("月亮与六便士", "The Moon and Sixpence", "毛姆", "英国", 1919, "小说", "文学小说", 2, true, ["modernism"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "一个伦敦证券经纪人突然抛弃妻子去画画——原型是高更。",
  whyClassic: "毛姆最受欢迎的小说之一。以高更生平为框架的故事，讨论了一个永恒的问题：一个人有没有权利为了艺术（或任何使命）抛弃一切社会义务？",
  whyRead: "叙事流畅到一口气可以读完。主角斯特里克兰是个不讨人喜欢的人——他自私、冷酷、对家庭不负责任——但你无法不被他吸引。",
  suitableFor: "适合所有层次的读者。对'追随内心'的话题有兴趣的人。",
  notSuitableFor: "对婚姻不忠和家庭抛弃敏感的人。",
  difficultyLevel: 2,
  difficultyReason: "毛姆是'讲故事的人'——他的语言是第一要务是让读者顺畅读完。叙事有人物、有情节、有悬念。",
  readingPrerequisites: "不需要。",
  readingAdvice: "主角斯特里克兰不需要你喜欢——他接受自己不是好人。问题在于：你能完全否认他的选择吗？",
  beginnerEntry: true,
});

fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
console.log("\nDone!");
