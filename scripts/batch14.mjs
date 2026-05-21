// Batch 14: Final batch of important missing works
import fs from "fs";
const R = fs.readFileSync("lib/bookpath-data.ts", "utf-8");
const O = R.indexOf("{", R.indexOf("export const bookPathData = "));
let d = 0, E = O;
for (let i = O; i < R.length; i++) { if (R[i] === "{") d++; else if (R[i] === "}") { d--; if (d === 0) { E = i + 1; break; } } }
const D = JSON.parse(R.slice(O, E));

let added = 0;
function add(t, o, a, c, y, cat, sub, diff, beg, m, g) {
  const slug = t.replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
  if (D.works.some((w) => w.slug === slug)) return;
  D.works.push({ id: slug, slug, titleDisplayCn: t, titleOriginal: o, authorName: a, countryOrRegion: c, firstPublishedYear: y, literaryCategory: cat, literarySubcategory: sub, workType: "长篇小说", difficultyLevel: diff, beginnerEntry: beg, movementIds: m, guideCardIds: [`guide-${slug}`] });
  D.guideCards.push({ id: `guide-${slug}`, workId: slug, title: t, ...g, aiGenerated: false, reviewStatus: "AI_DRAFT" });
  added++; console.log(`+ ${t}`);
}

// ═══ 中国古典小说 ═══
add("金瓶梅", "金瓶梅", "兰陵笑笑生", "中国", 1610, "小说", "世情小说", 4, false, ["classics"], {
  roleInPath: "ADVANCED", suitability: "适合有大量阅读经验的成人读者",
  oneSentencePositioning: "一个商人、他的六个妻妾和他们的欲望——中国第一部由作者独立创作的长篇小说。",
  whyClassic: "中国古典小说的另一座高峰。没有金瓶梅就没有红楼梦。它第一次把目光投向日常生活的阴暗面——贪婪、淫欲、嫉妒和死亡。",
  whyRead: "它打破了'好人好报'的小说传统。西门庆做尽坏事却活着，正直的人却被陷害。这种'不公正'的结局在当时是革命性的。",
  suitableFor: "适合对中国古典小说发展史有兴趣的严肃读者。",
  notSuitableFor: "大量直白的性描写。不是青少年读物。",
  difficultyLevel: 4, difficultyReason: "大量性描写可能分散注意力。人物关系复杂。方言词汇需要注释。但叙事本身是传统章回体。",
  readingPrerequisites: "建议先读过一些古典小说。",
  readingAdvice: "如果觉得性描写过于密集，可以选择洁本。核心价值在社会描写而非色情。",
  beginnerEntry: false,
});

add("三言", "三言", "冯梦龙", "中国", 1627, "小说", "话本小说集", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "120个宋代和明代的故事——从爱情到公案，从神仙到市井，无所不包。",
  whyClassic: "'三言'（喻世明言、警世通言、醒世恒言）是中国古代短篇小说的巅峰。'杜十娘怒沉百宝箱'、'白娘子永镇雷峰塔'都是中国人耳熟能详的故事。",
  whyRead: "每一个故事都独立完整，最适合碎片时间阅读。冯梦龙不仅是收集者——他对这些故事进行了大量改写。",
  suitableFor: "适合所有读者。喜欢短篇故事的人。",
  notSuitableFor: "部分故事有时代局限的价值观。",
  difficultyLevel: 2, difficultyReason: "各篇独立。有白话版本。故事性强。",
  readingPrerequisites: "不需要。",
  readingAdvice: "先读最著名的几篇：杜十娘怒沉百宝箱、白蛇传的原始版本、乔太守乱点鸳鸯谱。",
  beginnerEntry: true,
});

add("封神演义", "封神演义", "许仲琳", "中国", 1567, "小说", "神魔小说", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "商周更替之际——神仙们分成两派打架，凡人只是他们的棋子。",
  whyClassic: "在哪吒、姜子牙、妲己这些名字背后，就是《封神演义》。它创造了一个完整的中国神仙谱系。",
  whyRead: "人物比三国还多、法宝比漫威还炫。哪吒（莲花化身）、杨戬（三只眼）、土行孙（遁地术）——每一个角色都有独特的设定。",
  suitableFor: "适合喜欢神话题材的读者。",
  notSuitableFor: "没有。",
  difficultyLevel: 2, difficultyReason: "章回体。故事性强。",
  readingPrerequisites: "不需要。",
  readingAdvice: "可以先看电视剧或动画了解核心人物——哪吒和姜子牙。",
  beginnerEntry: true,
});

add("镜花缘", "镜花缘", "李汝珍", "中国", 1828, "小说", "讽刺小说", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "唐敖游历海外奇国——两面国、大人国、无肠国——每一个国家都是对人类社会的一种讽刺。",
  whyClassic: "中国文学中最有趣的讽刺作品之一。作者借海外奇国的设定，讽刺了清朝社会的各种弊端。",
  whyRead: "想象力和幽默感并存。两面国的人各有两张脸、大人国的人脚下踩着云彩、无肠国的人用食物循环——每一个设定都让人会心一笑。",
  suitableFor: "适合所有读者。",
  notSuitableFor: "后半部才艺展示部分（论学）较枯燥。",
  difficultyLevel: 2, difficultyReason: "前半部轻松有趣。后半部学术性较强可跳过。",
  readingPrerequisites: "不需要。",
  readingAdvice: "读前半部就好——后半部大量论学段落可以跳读。",
  beginnerEntry: true,
});

add("海上花列传", "海上花列传", "韩邦庆", "中国", 1892, "小说", "吴语小说", 3, false, ["classics"], {
  roleInPath: "CORE", suitability: "适合对晚清上海文化有兴趣的读者",
  oneSentencePositioning: "上海租界的妓院——以及围绕她们展开的人情世故。",
  whyClassic: "吴语小说的代表作。张爱玲对它推崇备至，亲自将其翻译为国语。它用最日常的对话写出了最复杂的世故。",
  whyRead: "表面写的是妓院，实际写的是晚清上海的人情网。每一个人都不是简单的善恶可以概括的。",
  suitableFor: "适合对晚清文化和张爱玲有兴趣的读者。",
  notSuitableFor: "吴语方言对部分读者有障碍。张爱玲有国语译本。",
  difficultyLevel: 3, difficultyReason: "人物众多（100+），关系网复杂。吴语方言需选对译本。",
  readingPrerequisites: "不需要。",
  readingAdvice: "选张爱玲的国语译本。注意人物关系图——这在读的过程中很有帮助。",
  beginnerEntry: false,
});

// ═══ 西方 ═══
add("罗密欧与朱丽叶", "Romeo and Juliet", "威廉·莎士比亚", "英国", 1597, "戏剧", "悲剧", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "两个敌对家族的年轻人相爱了——他们只用了五天就走完了一生。",
  whyClassic: "史上最有名的爱情故事。'罗密欧与朱丽叶'本身已经成了'悲剧恋人'的代名词。",
  whyRead: "它不只是爱情故事——它在说仇恨比爱更有破坏力。五天之内，六个年轻人死了。这一切始于一场没人在意的世仇。",
  suitableFor: "适合所有读者。",
  notSuitableFor: "没有。",
  difficultyLevel: 2, difficultyReason: "莎士比亚的语言，但这个故事太有名了——即使不太理解每一句台词也知道发生了什么。",
  readingPrerequisites: "不需要。",
  readingAdvice: "先看电影（泽菲雷利的1968版或莱昂纳多的1996版都可以），再读剧本。",
  beginnerEntry: true,
});

add("奥赛罗", "Othello", "威廉·莎士比亚", "英国", 1603, "戏剧", "悲剧", 3, false, ["classics"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读经验的读者",
  oneSentencePositioning: "一个摩尔人将军被自己的旗手用语言摧毁了婚姻和生命。",
  whyClassic: "莎士比亚最紧凑、最令人不安的悲剧之一。反派伊阿古是文学史上最纯粹的恶人——他的作恶不需要理由。",
  whyRead: "伊阿古的恶毒在于他用的武器只是语言。他让奥赛罗相信妻子不忠，全程没有伪造任何证据——只是暗示、暗示、再暗示。",
  suitableFor: "适合对心理学和语言操控有兴趣的读者。",
  notSuitableFor: "嫉妒和暴力的主题可能让部分读者不适。",
  difficultyLevel: 3, difficultyReason: "莎士比亚语言。需要理解伊阿古的动机——或者说他'没有动机'这件事本身就是重点。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意伊阿古的独白——他在每一段独白里都对观众坦白自己的计划，但奥赛罗听不到。",
  beginnerEntry: false,
});

add("九三年", "Quatrevingt-treize", "维克多·雨果", "法国", 1874, "小说", "历史小说", 3, false, ["romanticism"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读经验的读者",
  oneSentencePositioning: "法国大革命最血腥的一年——一个父亲必须在革命原则和救女儿的命之间做选择。",
  whyClassic: "雨果最后一部小说。在仁慈与革命原则之间、在人性与意识形态之间——雨果给出的答案当时被两边的人攻击。",
  whyRead: "它问了一个不可能回答的问题：为了'正确的事业'可以牺牲多少人性？雨果的答案是'一个都不行'——这个答案在革命时期是危险的。",
  suitableFor: "适合对法国大革命和道德困境有兴趣的读者。",
  notSuitableFor: "对法国大革命不了解的读者可能觉得历史背景隔膜。",
  difficultyLevel: 3, difficultyReason: "大量法国大革命历史背景需要一定的了解。但雨果的叙事驱动，人物关系清晰。",
  readingPrerequisites: "对法国大革命的基本了解是必要的。",
  readingAdvice: "小说的核心是最后几十页——那个'仁慈vs原则'的选择。前面的历史描写都是去往这一刻的铺垫。",
  beginnerEntry: false,
});

add("三个火枪手", "Les Trois Mousquetaires", "大仲马", "法国", 1844, "小说", "冒险小说", 2, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "年轻人达达尼昂来到巴黎加入火枪队，和三个火枪手成了朋友——'人人为我，我为人人'。",
  whyClassic: "大仲马最受欢迎的小说。'人人为我，我为人人'成为世界名言。它定义了侠义冒险小说的标准。",
  whyRead: "节奏极快——阴谋、决斗、爱情、政治、背叛，每一章都有事发生。达达尼昂和阿多斯、波尔多斯、阿拉米斯的友谊让人羡慕。",
  suitableFor: "适合所有读者。",
  notSuitableFor: "没有。",
  difficultyLevel: 2, difficultyReason: "情节驱动，节奏轻快。语言直白。",
  readingPrerequisites: "不需要。",
  readingAdvice: "米莱狄是文学史上最迷人的女反派之一——注意她的每一个出场。",
  beginnerEntry: true,
});

add("茶花女", "La Dame aux Camélias", "小仲马", "法国", 1848, "小说", "爱情小说", 2, true, ["romanticism"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "一个巴黎名妓和一个年轻贵族之间的爱情——以及为了他的家族而牺牲的结局。",
  whyClassic: "小仲马以自己的亲身经历写成。威尔第改编的歌剧《茶花女》让它举世闻名。它重塑了欧洲人对'妓女'的看法。",
  whyRead: "不是那种'名妓从良'的童话——玛格丽特知道自己不会幸福，但她还是选择了爱。她的牺牲不是因为道德压力，而是因为爱得太深。",
  suitableFor: "适合所有读者。",
  notSuitableFor: "结局非常伤感。",
  difficultyLevel: 2, difficultyReason: "第一人称叙事。语言流畅。篇幅短（约200页）。",
  readingPrerequisites: "不需要。",
  readingAdvice: "如果读完后被感动，可以去看威尔第的歌剧《茶花女》——它的音乐同样动人。",
  beginnerEntry: true,
});

add("约翰·克利斯朵夫", "Jean-Christophe", "罗曼·罗兰", "法国", 1912, "小说", "长篇小说", 4, false, ["realism"], {
  roleInPath: "ADVANCED", suitability: "适合有长时间阅读投入的读者",
  oneSentencePositioning: "一个德国音乐家的成长与奋斗——从童年到死亡，一个人与整个世界的对抗。",
  whyClassic: "罗曼·罗兰获诺贝尔文学奖的代表作。一部'音乐小说'——它的节奏像交响乐一样有四个乐章。影响了中国几代知识分子。",
  whyRead: "约翰·克利斯朵夫不是天才就是疯子——他拒绝向任何他不认可的东西低头。他的朋友、敌人、爱人一个个离开他，但他从未妥协。",
  suitableFor: "适合喜欢人物传记式长篇的读者。对音乐有兴趣的人会额外享受。",
  notSuitableFor: "篇幅极长（四大卷），叙事节奏慢。",
  difficultyLevel: 4, difficultyReason: "篇幅是最大挑战。大量的音乐讨论和哲学思考。但核心是一个人的成长故事，结构是线性的。",
  readingPrerequisites: "对古典音乐有一些了解会帮助但不是必须。",
  readingAdvice: "傅雷的中文译本是最好的。把它当作一个人的传记来读——克利斯朵夫的一生本身就是一部交响曲。",
  beginnerEntry: false,
});

add("大师与玛格丽特", "Мастер и Маргарита", "米哈伊尔·布尔加科夫", "俄国/苏联", 1967, "小说", "魔幻现实主义", 3, false, ["magical-realism", "modernism"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读经验的读者",
  oneSentencePositioning: "魔鬼带着一只会说话的猫来到斯大林时代的莫斯科——同时，耶稣在两千年前的耶路撒冷受审。",
  whyClassic: "20世纪最重要的俄语小说之一。布尔加科夫在苏联书报审查下写了12年，死后26年才得以出版。两条叙事线——讽刺现实的和讲述圣经故事的——在结尾精妙地交汇。",
  whyRead: "沃兰德（魔鬼）的莫斯科之旅是全书最好看的部分——魔术表演让女人们自己飞起来换衣服、会说话的猫用冲锋枪扫射。撒旦在斯大林时代的莫斯科制造了一场狂欢。",
  suitableFor: "适合喜欢魔幻现实主义和讽刺的读者。",
  notSuitableFor: "两条叙事线之间的切换可能让部分读者困惑。",
  difficultyLevel: 3, difficultyReason: "双线叙事（莫斯科故事和耶路撒冷故事）交替推进。部分章节涉及苏联时代的具体讽刺，不了解背景会损失一些阅读乐趣。",
  readingPrerequisites: "对斯大林时代的苏联社会有基本了解会帮助。",
  readingAdvice: "前半部可能觉得松散——坚持住。两条线在最后汇合的时候会让整本书的意义浮现出来。",
  beginnerEntry: false,
});

add("静静的顿河", "Тихий Дон", "肖洛霍夫", "俄国/苏联", 1928, "小说", "史诗小说", 4, false, ["realism"], {
  roleInPath: "ADVANCED", suitability: "适合有长时间阅读投入的读者",
  oneSentencePositioning: "顿河畔一个哥萨克家族在第一次世界大战和内战中的命运。",
  whyClassic: "肖洛霍夫获诺贝尔文学奖的作品。1965年诺奖颁奖词说它'在史诗般的叙述中展现了俄罗斯民族生活的历史层面'。",
  whyRead: "哥萨克是一个特殊的群体——既不是农民也不是军人，而是两者都是。格里高利的悲剧在于：他一直在寻找自己的位置，但历史没有给他选择的权利。",
  suitableFor: "适合喜欢宏大史诗叙事的读者。",
  notSuitableFor: "篇幅极长（四大卷），大量哥萨克文化细节。",
  difficultyLevel: 4, difficultyReason: "篇幅是主要门槛。大量哥萨克方言和文化习俗。战争场景和日常场景交替。",
  readingPrerequisites: "对俄国内战（红军vs白军）的历史有基本了解。",
  readingAdvice: "格里高利的感情线（阿克西尼娅和娜塔莉亚之间）可以作为锚点——理解了他的情感选择就读懂了他在历史中的困境。",
  beginnerEntry: false,
});

fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
console.log(`Done! Added ${added} works. Total: ${D.works.length}`);
