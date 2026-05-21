// Batch 6: French literature + more missing works
import fs from "fs";

const R = fs.readFileSync("lib/bookpath-data.ts", "utf-8");
const S = R.indexOf("export const bookPathData = ");
const O = R.indexOf("{", S);
let d = 0, E = O;
for (let i = O; i < R.length; i++) { if (R[i] === "{") d++; else if (R[i] === "}") { d--; if (d === 0) { E = i + 1; break; } } }
const D = JSON.parse(R.slice(O, E));

function add(t, o, a, c, y, cat, sub, diff, beg, movs, g) {
  const slug = t.replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
  if (D.works.some((w) => w.slug === slug)) { console.log(`Skip ${t}`); return; }
  D.works.push({ id: slug, slug, titleDisplayCn: t, titleOriginal: o, authorName: a, countryOrRegion: c, firstPublishedYear: y, literaryCategory: cat, literarySubcategory: sub, workType: "长篇小说", difficultyLevel: diff, beginnerEntry: beg, movementIds: movs, guideCardIds: [`guide-${slug}`] });
  D.guideCards.push({ id: `guide-${slug}`, workId: slug, title: t, ...g, aiGenerated: false, reviewStatus: "AI_DRAFT" });
  console.log(`+ ${t}`);
}

// French classics
add("追忆似水年华", "À la recherche du temps perdu", "马塞尔·普鲁斯特", "法国", 1913, "小说", "意识流小说", 5, false, ["modernism"], {
  roleInPath: "ADVANCED", suitability: "仅适合有极丰富阅读经验的读者",
  oneSentencePositioning: "一块玛德莱娜蛋糕蘸进茶里，触发了一个人一生的记忆洪流。",
  whyClassic: "20世纪最伟大的小说之一，没有传统情节，完全由记忆、感觉和思考构成。它改变了小说可以是什么。",
  whyRead: "不是读故事，是进入一种体验。普鲁斯特对时间、记忆、嫉妒、艺术的洞察无与伦比。读普鲁斯特不是在读书，是在学习如何感受。",
  suitableFor: "适合准备投入大量时间和精力的严肃读者。",
  notSuitableFor: "七卷本、三千多页。不适合任何寻求轻松阅读的人。",
  difficultyLevel: 5,
  difficultyReason: "篇幅极长，句子可以长达一页，没有传统情节，全是内心独白和哲学反思。需要持续的耐力和专注力。",
  readingPrerequisites: "建议有五年以上严肃文学阅读经验。",
  readingAdvice: "选一个安静的时期，每天读20-30页就够了。不要急于读完——普鲁斯特是用来生活的，不是用来完成的。",
  beginnerEntry: false,
});

add("局外人", "L'Étranger", "阿尔贝·加缪", "法国/阿尔及利亚", 1942, "小说", "存在主义小说", 2, true, ["existentialism", "modernism"], {
  roleInPath: "ENTRY", suitability: "适合作为存在主义文学入口",
  oneSentencePositioning: "一个男人在母亲葬礼上没有哭，几个月后他杀了人——法庭审判的不是罪行，而是他的性格。",
  whyClassic: "加缪最著名的作品，存在主义文学的代表作。开头'今天，妈妈死了'是20世纪文学最著名的开场白之一。",
  whyRead: "篇幅极短（不到150页），1-2天可以读完。主角默尔索的冷漠不是反社会，而是对虚伪社会的诚实回应——他拒绝表演不真实的情感。",
  suitableFor: "适合所有层次的读者。对哲学有兴趣的人会发现丰富的解读空间。",
  notSuitableFor: "主角的情感冷漠可能让部分读者感到疏离。",
  difficultyLevel: 2,
  difficultyReason: "语言极度简洁（加缪刻意模仿美国硬汉小说风格），叙事线清楚：第一部分是杀人前，第二部分是审判。主题有深度但文本本身不难。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意第一部分和第二部分之间的叙事风格差异——这不是写作技巧变化，而是一个哲学设计。",
  beginnerEntry: true,
});

add("鼠疫", "La Peste", "阿尔贝·加缪", "法国/阿尔及利亚", 1947, "小说", "寓言小说", 2, true, ["existentialism", "modernism"], {
  roleInPath: "ENTRY", suitability: "适合作为存在主义文学入口",
  oneSentencePositioning: "一座城市被瘟疫封锁，不同的人以不同的方式面对这场灾难。",
  whyClassic: "加缪的另一部代表作，以鼠疫寓言纳粹占领和人类面对极端困境时的选择。在新冠疫情后读来尤其震撼。",
  whyRead: "它不只是在说疫情——它是在问：当灾难来临时，你选择逃跑、合作、逃避还是反抗？每个角色代表一种回答。",
  suitableFor: "适合所有层次的读者。对伦理选择有兴趣的人。",
  notSuitableFor: "疫情描写可能让刚经历过大流行的读者感到不适。",
  difficultyLevel: 2,
  difficultyReason: "叙事是传统线性结构，语言清晰。虽然主题哲学性强，但故事层面容易进入。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意不同角色的选择——医生里厄、记者朗贝尔、神父帕纳卢——他们各自代表了一种面对灾难的态度。",
  beginnerEntry: true,
});

add("百年孤独", "Cien años de soledad", "加西亚·马尔克斯", "哥伦比亚", 1967, "小说", "魔幻现实主义", 3, false, ["magical-realism"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读经验的读者",
  oneSentencePositioning: "马孔多小镇上布恩迪亚家族七代人的兴衰史——现实与魔幻之间的界限消失了。",
  whyClassic: "魔幻现实主义的巅峰之作，20世纪最重要的小说之一。马尔克斯1982年获诺贝尔文学奖。它让全世界知道了拉美文学大爆炸。",
  whyRead: "打开第一页就知道遇到了一个不同的作家。叙事带着一种完全自然的语调讲述最不可能的事件——人会飞上天、血会沿着街道流回家。不是'不现实'，而是'另一种现实'。",
  suitableFor: "适合想体验拉美魔幻现实主义的读者。愿意接受非传统叙事的读者。",
  notSuitableFor: "人物众多（好几代的何塞·阿尔卡蒂奥和奥雷里亚诺），需要记家族谱系。",
  difficultyLevel: 3,
  difficultyReason: "主要挑战是人物的命名（代代重复的名字）和非线性时间观。马尔克斯的语言本身是流畅优美的。",
  readingPrerequisites: "不需要。建议准备一张家族谱系图。",
  readingAdvice: "画一张家族谱系图，否则你会在一堆同名角色中迷失。接受马孔多发生的一切——不要用现实逻辑去质疑它。",
  beginnerEntry: false,
});

add("霍乱时期的爱情", "El amor en los tiempos del cólera", "加西亚·马尔克斯", "哥伦比亚", 1985, "小说", "爱情小说", 2, true, ["magical-realism"], {
  roleInPath: "ENTRY", suitability: "适合作为魔幻现实主义入门",
  oneSentencePositioning: "一个男人用51年9个月零4天等待他一生所爱的女人。",
  whyClassic: "马尔克斯本人认为这是他最好的小说。不是《百年孤独》式的魔幻巨著，而是一部关于爱情所有可能性的百科全书。",
  whyRead: "它不浪漫——至少不是通常意义上的浪漫。它让你看到爱情可以是执念、习惯、陪伴，甚至是在恶臭的河上挂着黄旗的船里。",
  suitableFor: "适合所有层次的读者。对爱情有深度思考的人。",
  notSuitableFor: "与期待浪漫爱情故事的预期可能不符。",
  difficultyLevel: 2,
  difficultyReason: "叙事是传统线性结构，语言优美但流畅。篇幅中等（约400页），但节奏舒缓。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意小说对'爱情'的多种定义——弗洛伦蒂诺等待了51年，但他同时经历了无数段关系。马尔克斯不评判，只呈现。",
  beginnerEntry: true,
});

add("第二种白色", "The Second White", "沃莱·索因卡", "尼日利亚", 1965, "小说", "文学小说", 3, false, ["postcolonial"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "尼日利亚独立前后，一个年轻人的成长与一个国家的诞生交织。",
  whyClassic: "沃莱·索因卡是非洲首位诺贝尔文学奖得主。这部小说融合了约鲁巴神话传统和西方现代主义技巧。",
  whyRead: "索因卡不是用西方小说的方式写非洲——他把约鲁巴神话、诗歌和戏剧传统融入了小说叙事。",
  suitableFor: "适合对非洲文学和后殖民文学有兴趣的读者。",
  notSuitableFor: "需要读者对非西方叙事传统有一定接受度。",
  difficultyLevel: 3,
  difficultyReason: "融合了约鲁巴口头传统和西方现代主义技巧，叙事结构独特。",
  readingPrerequisites: "不需要。对尼日利亚历史的基本了解有帮助。",
  readingAdvice: "注意神话与现实之间的边界——在索因卡的世界里，神灵是可以直接出现在日常生活中的。",
  beginnerEntry: false,
});

add("耻", "Disgrace", "J.M.库切", "南非", 1999, "小说", "文学小说", 3, false, ["realism", "postcolonial"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "一个南非白人教授在性丑闻之后逃到女儿农场，发现自己在后种族隔离时代的南非已经无处可去。",
  whyClassic: "1999年布克奖获奖作品。库切以手术刀般的精确描写了后殖民时代的身份困境、暴力和赎罪的可能。",
  whyRead: "没有一句多余的话。主角不是好人，但他的遭遇让人无法不同情。库切不提供简单的道德答案。",
  suitableFor: "适合喜欢精炼文笔和心理深度的读者。",
  notSuitableFor: "主题沉重，性暴力场景直接。",
  difficultyLevel: 3,
  difficultyReason: "篇幅短，语言精确。但主题沉重，道德立场模糊。",
  readingPrerequisites: "对南非种族隔离历史有基本了解。",
  readingAdvice: "注意小说中关于狗的线索——它们不是副线，而是理解主题的关键。",
  beginnerEntry: false,
});

// Russian classics
add("安娜·卡列尼娜", "Анна Каренина", "列夫·托尔斯泰", "俄国", 1877, "小说", "现实主义小说", 3, false, ["realism"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读耐心的读者",
  oneSentencePositioning: "一个贵族女性为了爱情放弃婚姻和社会地位，最终走向毁灭。",
  whyClassic: "托尔斯泰最伟大的作品之一，'幸福的家庭都是相似的，不幸的家庭各有各的不幸'是文学史上最著名的开篇之一。",
  whyRead: "它不只是关于安娜和渥伦斯基的婚外情——另一条线列文的故事同样重要。托尔斯泰对婚姻、信仰、农业和死亡都有想说的事。",
  suitableFor: "适合喜欢19世纪现实主义小说的读者。",
  notSuitableFor: "篇幅长（约800页），人物多。",
  difficultyLevel: 3,
  difficultyReason: "传统叙事结构，语言清晰。双线叙事（安娜线和列文线）互相补充。篇幅是主要门槛。",
  readingPrerequisites: "不需要。",
  readingAdvice: "不要只读安娜线——列文线在很多人看来才是托尔斯泰真正想说的。",
  beginnerEntry: false,
});

add("罪与罚", "Преступление и наказание", "陀思妥耶夫斯基", "俄国", 1866, "小说", "心理小说", 3, false, ["realism"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读耐心的读者",
  oneSentencePositioning: "一个穷学生认为自己有权利杀死一个老妇人——然后必须面对自己良心的审判。",
  whyClassic: "陀思妥耶夫斯基最广为人知的作品。对人类心理的深度挖掘前无古人。它问了一个至今无人能完美回答的问题：如果上帝不存在，一切都被允许吗？",
  whyRead: "它不像19世纪的小说，更像一部犯罪心理惊悚片。凶手从一开始就知道，悬念不在于'谁干的'，而在于'他会被发现吗以及他自己能承受吗'。",
  suitableFor: "适合喜欢心理深度的读者。对犯罪和伦理有兴趣的人。",
  notSuitableFor: "篇幅长，心理描写密集，节奏不快。",
  difficultyLevel: 3,
  difficultyReason: "叙事是传统的。主要挑战在于主角拉斯柯尔尼科夫密集的内心独白和心理挣扎。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意小说中的'巧合'——陀思妥耶夫斯基用大量'巧合'推动情节，这不是写作缺陷，而是他关于'命运'的观点。",
  beginnerEntry: false,
});

fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
console.log("\nDone!");
