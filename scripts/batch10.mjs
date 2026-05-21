// Batch 10: South American + more classics
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

add("佩德罗·巴拉莫", "Pedro Páramo", "胡安·鲁尔福", "墨西哥", 1955, "小说", "魔幻现实主义", 3, false, ["magical-realism"], {
  roleInPath: "CORE", suitability: "适合对魔幻现实主义有兴趣的读者",
  oneSentencePositioning: "一个男人前往鬼城寻找父亲——但他自己可能也是鬼。",
  whyClassic: "魔幻现实主义的奠基之作，比《百年孤独》早12年。马尔克斯说如果没有鲁尔福，他可能永远找不到自己的写作方向。",
  whyRead: "极短（不到150页），但读一遍远远不够。死人活人混在一起说话，不分彼此。这种'边界消失'的叙事后来成为拉美文学的标准技法。",
  suitableFor: "适合对魔幻现实主义起源有兴趣的读者。",
  notSuitableFor: "死人活人混同的叙事可能让部分读者困惑。",
  difficultyLevel: 3,
  difficultyReason: "叙事在活人和死人之间无缝切换，需要读者自己判断谁是生者。碎片化结构。篇幅短但密度高。",
  readingPrerequisites: "不需要。",
  readingAdvice: "读完一遍后立刻重读第二遍——你会发现第一遍以为懂了的很多地方其实没懂。",
  beginnerEntry: false,
});

add("跳房子", "Rayuela", "胡利奥·科塔萨尔", "阿根廷", 1963, "小说", "实验小说", 4, false, ["postmodernism", "magical-realism"], {
  roleInPath: "ADVANCED", suitability: "适合有丰富阅读经验的读者",
  oneSentencePositioning: "一部可以按两种顺序读的小说——正常顺序或者按照作者另设的'跳房子'顺序。",
  whyClassic: "拉美文学大爆炸中最具实验性的作品之一。作者提供了一套'跳房子'阅读顺序——读者在章节之间跳跃，像游戏一样。",
  whyRead: "它是关于选择的小说——不仅是角色的选择，也是读者的选择。你可以按顺序读得到一个故事，也可以按'跳房子'顺序读得到另一个完全不同的体验。",
  suitableFor: "适合喜欢实验性叙事的读者。",
  notSuitableFor: "不适合不习惯实验叙事的读者。第二部分（'跳房子'部分）包含大量非常规材料。",
  difficultyLevel: 4,
  difficultyReason: "核心难度在于结构和阅读方式。可选章节包含报纸剪报、哲学笔记等非常规材料。需要读者积极参与文本的构建。",
  readingPrerequisites: "建议先读过一些现代主义/后现代主义作品。",
  readingAdvice: "第一次读建议按'跳房子'顺序读——虽然更麻烦，但那是科塔萨尔的设计。",
  beginnerEntry: false,
});

add("荒野侦探", "Los detectives salvajes", "罗贝托·波拉尼奥", "智利", 1998, "小说", "文学小说", 4, false, ["postmodernism"], {
  roleInPath: "ADVANCED", suitability: "适合有丰富阅读经验和耐心的读者",
  oneSentencePositioning: "一群年轻的诗人在墨西哥沙漠中寻找一位消失的女诗人——这个故事由50多个角色的证词拼成。",
  whyClassic: "21世纪初最重要的西语小说之一。波拉尼奥用50多个不同角色的独白拼出一幅拉美文艺青年的群像。",
  whyRead: "叙事方式像拼图——每个证人只看到故事的一部分。读者是唯一的能看见全貌的人。青春的激情、失败和遗忘构成了小说的基调。",
  suitableFor: "适合喜欢拼图式叙事和对拉美文学有兴趣的读者。",
  notSuitableFor: "篇幅长，角色众多（50+），多人称叙事需要大量注意力。",
  difficultyLevel: 4,
  difficultyReason: "50多个角色的独白，没有核心主角。第二部分由大量短章节构成，时间跨度20年。需要读者有拼接碎片的能力。",
  readingPrerequisites: "建议有大量文学阅读经验。",
  readingAdvice: "不要试图记住每个人——让他们像流水一样经过你。某些角色只出现一次，但他们留下的印象会持续。",
  beginnerEntry: false,
});

add("2666", "2666", "罗贝托·波拉尼奥", "智利", 2004, "小说", "文学小说", 5, false, ["postmodernism"], {
  roleInPath: "ADVANCED", suitability: "仅适合有极丰富阅读经验的读者",
  oneSentencePositioning: "五个看似独立的章节——一位寻找作家的评论家、一位生病的哲学家、一位美国记者、一系列妇女谋杀案——最终指向一个叫圣特莱莎的墨西哥边境城市。",
  whyClassic: "波拉尼奥的遗作，900多页的巨制。被许多评论家认为是21世纪最伟大的西语小说。它以一部未完成的杰作的身份进入了文学经典。",
  whyRead: "它包含了20世纪所有重要的主题：极权主义、暴力、文学、疯狂、爱情和死亡。四个互不相干的故事最终汇聚成一本关于evil的百科全书。",
  suitableFor: "适合准备投入巨大阅读时间和精力的严肃读者。",
  notSuitableFor: "篇幅极长，妇女谋杀案部分包含大量暴力描写，阅读体验极其沉重。",
  difficultyLevel: 5,
  difficultyReason: "900+页的篇幅，五个半独立的部分，数百个角色。第四部分（罪行）以警察报告方式列举数百起妇女谋杀案，阅读体验极度残酷。",
  readingPrerequisites: "建议先读《荒野侦探》熟悉波拉尼奥的风格。",
  readingAdvice: "第四部分（罪行）是最难熬的——它用干巴巴的警察报告语气一桩一桩列举谋杀案。这种重复本身就是意义。",
  beginnerEntry: false,
});

add("荒野之死", "La muerte de Artemio Cruz", "卡洛斯·富恩特斯", "墨西哥", 1962, "小说", "文学小说", 4, false, ["postmodernism", "magical-realism"], {
  roleInPath: "ADVANCED", suitability: "适合有丰富阅读经验的读者",
  oneSentencePositioning: "一个墨西哥革命时期的大亨在病床上回望一生——用第一、第二、第三人称交替叙述。",
  whyClassic: "拉美文学大爆炸的代表作之一。富恩特斯用一个人在死亡边缘的意识流，讲述了墨西哥革命如何被背叛的历史。",
  whyRead: "三种人称的切换不只是技巧展示——第一人称是'我'的体验，第二人称是'我'对自己的审判，第三人称是社会眼中的'他'。一个人分裂成了三个人。",
  suitableFor: "适合对拉美文学和政治有兴趣的读者。",
  notSuitableFor: "三种人称叙事切换需要高度注意力。",
  difficultyLevel: 4,
  difficultyReason: "三种人称和多个时间线在章节之间切换，需要读者主动拼凑。大量墨西哥革命背景知识隐含在叙事中。",
  readingPrerequisites: "对墨西哥革命（1910-1920）的基本历史了解会极大帮助。",
  readingAdvice: "注意人称切换的模式——富恩特斯在不同人称之间切换不是随机的，每一种人称对应一种叙事距离。",
  beginnerEntry: false,
});

add("最明净的地区", "La región más transparente", "卡洛斯·富恩特斯", "墨西哥", 1958, "小说", "文学小说", 4, false, ["postmodernism"], {
  roleInPath: "ADVANCED", suitability: "适合有丰富阅读经验的读者",
  oneSentencePositioning: "墨西哥城——它的过去和现在、富人和穷人、西班牙殖民遗产和原住民文化——通过数十个角色的声音呈现。",
  whyClassic: "富恩特斯的成名作，拉美文学大爆炸的开端之一。它把整座墨西哥城放进了一部小说。",
  whyRead: "它是一部城市的小说——城市本身就是主角。数十个角色来自不同阶层，他们的声音交织在一起形成了城市的合唱。",
  suitableFor: "适合对拉美城市文化有兴趣的读者。",
  notSuitableFor: "角色众多，阅读门槛高。",
  difficultyLevel: 4,
  difficultyReason: "多声部叙事，大量角色之间快速切换。需要读者对墨西哥历史和文化有一定了解。",
  readingPrerequisites: "对墨西哥历史和西班牙殖民遗产有基本了解。",
  readingAdvice: "不要寻找主线——这部小说本身就是一座城市，你走在街上听到不同的声音。",
  beginnerEntry: false,
});

add("总统先生", "El Señor Presidente", "米格尔·安赫尔·阿斯图里亚斯", "危地马拉", 1946, "小说", "文学小说", 3, false, ["magical-realism"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "在一个独裁统治下的中美洲国家，恐惧像空气一样无处不在。",
  whyClassic: "阿斯图里亚斯是诺贝尔文学奖得主。这部小说是拉美'独裁者小说'流派的先声，融合了超现实主义和原住民神话。",
  whyRead: "它不直接写独裁者——而是写独裁统治下普通人的心理。恐惧如何扭曲人与人之间的关系，如何让爱变成背叛。",
  suitableFor: "适合对拉美政治文学有兴趣的读者。",
  notSuitableFor: "格调压抑。",
  difficultyLevel: 3,
  difficultyReason: "融合超现实主义风格和玛雅神话元素，叙事不是纯现实主义。但核心故事线清晰。",
  readingPrerequisites: "不需要。对中美洲政治历史有一些了解会帮助。",
  readingAdvice: "注意阿斯图里亚斯如何在现实和神话之间切换——这种'魔幻'不是逃离现实，而是理解现实的另一种方式。",
  beginnerEntry: false,
});

add("迷宫中的将军", "El general en su laberinto", "加西亚·马尔克斯", "哥伦比亚", 1989, "小说", "历史小说", 3, false, ["magical-realism"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "西蒙·玻利瓦尔——解放了半个南美大陆的人——在生命的最后七天沿着马格达莱纳河旅行。",
  whyClassic: "马尔克斯写玻利瓦尔——两个都是拉美最著名的名字。这不是纪念碑式的英雄传记，而是一个疲惫的老人在生命最后时刻的旅程。",
  whyRead: "它拆解了英雄神话。玻利瓦尔在小说里不是铜像，是一个发烧、呕吐、被人抬着走的老人。但正是在这种脆弱中，他的伟大更加真实。",
  suitableFor: "适合对拉美历史有兴趣的读者。",
  notSuitableFor: "需要对西蒙·玻利瓦尔和拉美独立运动有基本了解。",
  difficultyLevel: 3,
  difficultyReason: "涉及大量拉美独立战争的历史人物和事件。叙事是线性的（七天旅程），但历史背景复杂。",
  readingPrerequisites: "对西蒙·玻利瓦尔和拉美19世纪独立运动的历史了解是必要的。",
  readingAdvice: "读之前花10分钟了解一下玻利瓦尔的一生和他的政治理想——这会极大丰富阅读体验。",
  beginnerEntry: false,
});

add("大教堂", "大教堂", "雷蒙德·卡佛", "美国", 1983, "小说", "短篇小说集", 2, true, ["modernism"], {
  roleInPath: "ENTRY", suitability: "适合作为短篇小说入门",
  oneSentencePositioning: "普通人生活中的决定性时刻——失业、酗酒、破碎的婚姻和偶然的救赎。",
  whyClassic: "卡佛是'极简主义'风格的代表。他用最简单的话写最复杂的情感。他的小说像冰——越冷越锋利。",
  whyRead: "每一篇都很短（3-10页），但卡佛有本事在这么短的篇幅里让你完全进入一个人的生活。他不是在讲故事，是在打开一扇窗。",
  suitableFor: "适合所有读者。短小精悍，适合碎片时间。",
  notSuitableFor: "格调偏灰暗（失业、酗酒、家庭破碎）。",
  difficultyLevel: 2,
  difficultyReason: "语言极简，句子短，词汇简单。但'水面下的冰山'需要读者有感受力。",
  readingPrerequisites: "不需要。",
  readingAdvice: "读卡佛的窍门是：注意他没写的部分，比写出来的多得多。",
  beginnerEntry: true,
});

add("当我们谈论爱情时我们在谈论什么", "What We Talk About When We Talk About Love", "雷蒙德·卡佛", "美国", 1981, "小说", "短篇小说集", 2, true, ["modernism"], {
  roleInPath: "ENTRY", suitability: "适合作为短篇小说入门",
  oneSentencePositioning: "两对夫妇在餐桌上边喝酒边谈论爱情——越谈越不确定。",
  whyClassic: "卡佛最著名的一部集子。标题篇是极简主义小说的典范——四个人在餐桌上说话，没有事件发生，但读完你觉得经历了什么重要的事。",
  whyRead: "标题篇本身就是教学级的短篇。两对夫妇在喝酒聊天，谈论'爱是什么'，然后发现每个人说的好像都不是同一件事。",
  suitableFor: "适合所有读者，尤其适合学习写作的人。",
  notSuitableFor: "没有。",
  difficultyLevel: 2,
  difficultyReason: "叙事极度精简，对话为主。篇幅极短。深层含义需要感受，但表层容易进入。",
  readingPrerequisites: "不需要。",
  readingAdvice: "标题篇值得反复读。注意卡佛删掉了什么——他的编辑戈登·利什大量删减了他的原稿，结果就是这种'留白'的风格。",
  beginnerEntry: true,
});

fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
console.log("\nDone!");
