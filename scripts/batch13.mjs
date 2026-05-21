// Batch 13: Last batch of important missing works
import fs from "fs";
const R = fs.readFileSync("lib/bookpath-data.ts", "utf-8");
const O = R.indexOf("{", R.indexOf("export const bookPathData = "));
let d = 0, E = O;
for (let i = O; i < R.length; i++) { if (R[i] === "{") d++; else if (R[i] === "}") { d--; if (d === 0) { E = i + 1; break; } } }
const D = JSON.parse(R.slice(O, E));
function add(t, o, a, c, y, cat, sub, diff, beg, m, g) {
  const slug = t.replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
  if (D.works.some((w) => w.slug === slug)) { /* console.log(`Skip ${t}`); */ return; }
  D.works.push({ id: slug, slug, titleDisplayCn: t, titleOriginal: o, authorName: a, countryOrRegion: c, firstPublishedYear: y, literaryCategory: cat, literarySubcategory: sub, workType: "长篇小说", difficultyLevel: diff, beginnerEntry: beg, movementIds: m, guideCardIds: [`guide-${slug}`] });
  D.guideCards.push({ id: `guide-${slug}`, workId: slug, title: t, ...g, aiGenerated: false, reviewStatus: "AI_DRAFT" });
  console.log(`+ ${t}`);
}

// ═══ 中国哲学 ═══
add("道德经", "道德经", "老子", "中国", -500, "哲学", "道家经典", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合作为中国哲学入门",
  oneSentencePositioning: "五千字讲透了'道可道，非常道'——中国的第一本哲学书。",
  whyClassic: "世界上译本数量仅次于圣经的著作。它用最少的字说了最多的话。'无为'、'上善若水'、'大智若愚'至今仍然是中国人理解世界的方式。",
  whyRead: "可极短（五千字），可随身携带反复读。每一章都独立，适合碎片时间。它不是逻辑论证，是格言式的诗。",
  suitableFor: "适合所有读者。不同年纪读会有不同理解。",
  notSuitableFor: "没有。",
  difficultyLevel: 2, difficultyReason: "篇幅极短，语言凝练。各章独立。需要一定的耐心反复回味，但每章本身不长。",
  readingPrerequisites: "不需要。", readingAdvice: "每天读一章（共81章）。不求一次读懂——老子是让人读一辈子的。",
  beginnerEntry: true,
});

add("孟子", "孟子", "孟子", "中国", -300, "哲学", "儒家经典", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合作为中国哲学入门",
  oneSentencePositioning: "孟子继承了孔子，但更激烈——他相信人性本善，暴君可以被推翻。",
  whyClassic: "儒家最重要的继承者。'富贵不能淫，贫贱不能移，威武不能屈'、'生于忧患死于安乐'——孟子是中国士大夫精神气节的塑造者。",
  whyRead: "比孔子更雄辩、更有气势。他的辩论充满排比和比喻，读起来很有感染力。",
  suitableFor: "适合所有读者。", notSuitableFor: "没有。",
  difficultyLevel: 2, difficultyReason: "对话体，逻辑清晰，比喻生动。",
  readingPrerequisites: "不需要。", readingAdvice: "选带翻译的版本。梁惠王章句上是最精彩的部分。",
  beginnerEntry: true,
});

add("孙子兵法", "孙子兵法", "孙武", "中国", -500, "军事", "兵书", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "不战而屈人之兵——世界上最早的兵书，也是至今仍被使用的战略经典。",
  whyClassic: "在西方，它是商界必读；在中国，它是'知己知彼百战不殆'的来源。它把战争上升到了哲学层面。",
  whyRead: "短小精悍，每一句都是高度浓缩的智慧。不只是军事——它关于竞争、博弈和如何在任何对抗中取胜。",
  suitableFor: "适合所有读者。商业、管理、战略领域的人必读。",
  notSuitableFor: "没有。",
  difficultyLevel: 2, difficultyReason: "篇幅短，语言精炼。每段独立。",
  readingPrerequisites: "不需要。", readingAdvice: "谋攻篇（'不战而屈人之兵'）和虚实篇（'避实击虚'）是最核心的两篇。",
  beginnerEntry: true,
});

add("世说新语", "世说新语", "刘义庆", "中国", 440, "文学", "笔记小说", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "魏晋名士的段子合集——最快的车、最狂的人、最冷的笑话都在这里。",
  whyClassic: "中国最有趣的古书。没有它我们就不知道魏晋风度是什么——那些'雪夜访戴'、'坦腹东床'的故事全在这里。",
  whyRead: "极短（每则几十字到几百字），但信息量极大。最适合碎片时间阅读的古书。",
  suitableFor: "适合所有读者。对魏晋历史和名士文化有兴趣的人。",
  notSuitableFor: "没有。",
  difficultyLevel: 2, difficultyReason: "各则独立。篇幅短小。现代注释版可读。",
  readingPrerequisites: "不需要。", readingAdvice: "任选一则开始——不需要从头读。",
  beginnerEntry: true,
});

add("唐诗三百首", "唐诗三百首", "蘅塘退士编", "中国", 1763, "诗歌", "诗歌选", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "77位诗人、310首诗——中国人心中'诗'的标准。",
  whyClassic: "每个中国人小时候都背过的书。唐诗是中国文学的最高成就之一。",
  whyRead: "从'床前明月光'到'春眠不觉晓'——你可能已经知道很多了。读全集会发现更多。",
  suitableFor: "适合所有读者。", notSuitableFor: "没有。",
  difficultyLevel: 2, difficultyReason: "每篇独立。有注释版可读。",
  readingPrerequisites: "不需要。", readingAdvice: "每天读一两首足矣。",
  beginnerEntry: true,
});

// 李白杜甫苏轼
add("李太白集", "李太白集", "李白", "中国", 756, "诗歌", "诗集", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "中国最天才的诗人——'天子呼来不上船，自称臣是酒中仙。'",
  whyClassic: "李白是中国诗歌想象力的极限。他的诗是自由的、狂放的、不可复制的。",
  whyRead: "读李白不需要苦读——'飞流直下三千尺'、'低头思故乡'，每一个中国人都能脱口而出。",
  suitableFor: "适合所有读者。", notSuitableFor: "没有。",
  difficultyLevel: 2, difficultyReason: "诗有注释版。",
  readingPrerequisites: "不需要。", readingAdvice: "《将进酒》一定要读——它是李白最好的诗。",
  beginnerEntry: true,
});

add("杜工部集", "杜工部集", "杜甫", "中国", 770, "诗歌", "诗集", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "中国最伟大的诗人之一——'安得广厦千万间，大庇天下寒士俱欢颜。'",
  whyClassic: "如果李白是飞在天上的，杜甫就是站在地上的。他的诗写的是战争、贫穷、离别和衰老。",
  whyRead: "读杜甫会疼——他的'朱门酒肉臭路有冻死骨'是写实的。但正是这种对苦难的直面让他伟大。",
  suitableFor: "适合所有读者。", notSuitableFor: "部分诗篇格调沉重。",
  difficultyLevel: 2, difficultyReason: "诗有注释版。",
  readingPrerequisites: "不需要。", readingAdvice: "先读他的绝句——'两个黄鹂鸣翠柳'比他的律诗好入口。",
  beginnerEntry: true,
});

add("东坡集", "东坡集", "苏轼", "中国", 1100, "诗词", "诗词文", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "中国最全才的文人——诗、词、文、书、画、美食无一不精。",
  whyClassic: "苏轼是中国文化中最受欢迎的人物。他的一生充满波折——被贬到海南——但他永远乐观。",
  whyRead: "一个人的作品里包含了'大江东去'的豪放、'十年生死两茫茫'的深情和'日啖荔枝三百颗'的吃货精神。",
  suitableFor: "适合所有读者。", notSuitableFor: "没有。",
  difficultyLevel: 2, difficultyReason: "有注释版。词比诗稍难。",
  readingPrerequisites: "不需要。", readingAdvice: "先读'念奴娇·赤壁怀古'和'水调歌头·明月几时有'。",
  beginnerEntry: true,
});

// 戏曲
add("西厢记", "西厢记", "王实甫", "中国", 1300, "戏剧", "杂剧", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "张生和崔莺莺的爱情故事——'愿天下有情人终成眷属'出自这里。",
  whyClassic: "中国古典戏曲的最高成就。它的唱词之美让同时代的人惊叹——'碧云天，黄花地'至今仍是写秋的名句。",
  whyRead: "爱情故事的核心是反叛——崔莺莺是大家闺秀，但她选择了私订终身。这是一个关于女性主动选择的故事。",
  suitableFor: "适合对中国古典爱情故事有兴趣的读者。",
  notSuitableFor: "没有。",
  difficultyLevel: 2, difficultyReason: "有现代白话译本。核心故事线清楚。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意它的结构——'长亭送别'是中国文学中最动人的离别场景之一。",
  beginnerEntry: true,
});

add("牡丹亭", "牡丹亭", "汤显祖", "中国", 1598, "戏剧", "传奇", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "一个女孩在梦中爱上了一个陌生人，因思念而死，又因为爱情死而复生。",
  whyClassic: "汤显祖的'临川四梦'之首。它的'情不知所起，一往而深'是中文世界最著名的爱情宣言之一。",
  whyRead: "它突破了生死的边界——杜丽娘因梦生情、因情而死、因爱复生。这种'情之至'的信念是中国浪漫主义的顶峰。",
  suitableFor: "适合对中国古典爱情有兴趣的读者。",
  notSuitableFor: "没有。",
  difficultyLevel: 2, difficultyReason: "有现代改编版。",
  readingPrerequisites: "不需要。",
  readingAdvice: "'惊梦'（游园惊梦）是全剧最著名的一出。",
  beginnerEntry: true,
});

// 小说
add("聊斋志异", "聊斋志异", "蒲松龄", "中国", 1679, "小说", "志怪小说", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "狐狸精、女鬼、花妖——以及她们与书生之间的爱情故事。",
  whyClassic: "中国最好的短篇小说集之一。蒲松龄用志怪的外壳写人世——那些女鬼比人更善良。",
  whyRead: "每一篇都很短（几百到几千字），但故事性极强。聂小倩、画皮、崂山道士——这些故事已经成为中国文化的一部分。",
  suitableFor: "适合所有读者。喜欢志怪和灵异故事的读者。",
  notSuitableFor: "没有。",
  difficultyLevel: 2, difficultyReason: "短篇独立。有白话译本。故事性强。",
  readingPrerequisites: "不需要。",
  readingAdvice: "先读最著名的几篇：聂小倩、画皮、崂山道士、婴宁。",
  beginnerEntry: true,
});

add("儒林外史", "儒林外史", "吴敬梓", "中国", 1750, "小说", "讽刺小说", 3, false, ["classics"], {
  roleInPath: "CORE", suitability: "适合有一定阅读耐心的读者",
  oneSentencePositioning: "一群读书人的荒诞群像——'范进中举'只是其中最出名的一个故事。",
  whyClassic: "中国讽刺文学的高峰。吴敬梓用冷峻的笔写了科举制度如何扭曲人性。'范进中举'——中举后疯了——是中国文学中最著名的讽刺场景之一。",
  whyRead: "没有核心主角，是一连串人物的登场和退场。像一部中国版的'坎特伯雷故事集'。",
  suitableFor: "适合对中国古代知识分子生态有兴趣的读者。",
  notSuitableFor: "结构松散，没有传统意义上的情节。",
  difficultyLevel: 3, difficultyReason: "人物众多且不断更换。结构不像传统小说。但每个片段本身的故事性强。",
  readingPrerequisites: "对科举制度的基本了解会帮助。",
  readingAdvice: "范进中举是最出名的一段——它位于原著的第三回左右。",
  beginnerEntry: false,
});

// 西方名著
add("巴黎圣母院", "Notre-Dame de Paris", "维克多·雨果", "法国", 1831, "小说", "历史小说", 3, false, ["romanticism"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读耐心的读者",
  oneSentencePositioning: "驼背的敲钟人卡西莫多爱上了吉ト賽女郎爱斯梅拉达——悲剧从第一页就注定了。",
  whyClassic: "雨果最著名的小说之一，也是浪漫主义文学的标志性作品。它让巴黎圣母院本身成为了一个角色。",
  whyRead: "雨果的小说不只是故事——他在其中放入了大量的历史考察和建筑学思考。但卡西莫多和爱斯梅拉达的故事本身足够动人。",
  suitableFor: "适合对法国浪漫主义文学有兴趣的读者。",
  notSuitableFor: "叙事中穿插大量历史建筑论述，部分读者可能觉得拖沓。",
  difficultyLevel: 3, difficultyReason: "雨果大量穿插巴黎历史、建筑、印刷术等论述，可跳过不影响主线。",
  readingPrerequisites: "不需要。", readingAdvice: "跳过那些关于巴黎建筑史的章节不会影响对故事的理解。",
  beginnerEntry: false,
});

add("基督山伯爵", "Le Comte de Monte-Cristo", "大仲马", "法国", 1844, "小说", "冒险小说", 2, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "一个被陷害入狱的水手越狱后找到宝藏，化身基督山伯爵向仇人一一复仇。",
  whyClassic: "史上最伟大的复仇故事。大仲马是讲故事的奇才——这部小说长达一千多页，但每一页都让人放不下。",
  whyRead: "情节密度极高——越狱、寻宝、复仇、爱情、背叛，应有尽有。基督山伯爵的复仇不是简单的'干掉他们'——他精心设计让每个人得到了最适合他们的惩罚。",
  suitableFor: "适合所有读者。喜欢复仇和冒险题材的人会沉迷。",
  notSuitableFor: "篇幅极长（1200+页）。",
  difficultyLevel: 2, difficultyReason: "语言流畅，情节驱动。篇幅长但节奏快。人物关系略复杂。",
  readingPrerequisites: "不需要。", readingAdvice: "前100页（入狱到越狱）稍微慢一点——熬过去后面一马平川。",
  beginnerEntry: true,
});

add("无名的裘德", "Jude the Obscure", "托马斯·哈代", "英国", 1895, "小说", "文学小说", 3, false, ["realism"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "一个穷苦青年渴望上大学，但阶级和命运不让他如愿。",
  whyClassic: "哈代最后一部也是最黑暗的一部小说。它出版后因为'不道德'引发了巨大争议，哈代从此不再写小说。",
  whyRead: "裘德的悲剧不在于他不够努力——他比大多数人都努力。他的悲剧在于：有些门不会因为你的努力而打开。",
  suitableFor: "适合喜欢社会批判和心理深度的读者。",
  notSuitableFor: "格调极度灰暗。结局尤其沉重。",
  difficultyLevel: 3, difficultyReason: "传统叙事结构。主题沉重。人物关系和情感复杂。",
  readingPrerequisites: "对英国维多利亚时代的社会阶层和婚姻制度有一些了解会帮助。",
  readingAdvice: "准备好会被它伤害。这不是一本让人愉快的书，但是一本让人难忘的书。",
  beginnerEntry: false,
});

// 莎士比亚
add("莎士比亚悲剧选", "Tragedies of Shakespeare", "威廉·莎士比亚", "英国", 1600, "戏剧", "悲剧", 3, false, ["classics"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读经验的读者",
  oneSentencePositioning: "哈姆雷特、麦克白、奥赛罗、李尔王——人类野心、嫉妒、犹豫和疯狂的全部样本。",
  whyClassic: "英语文学的最高峰。莎士比亚创造的词汇和短语改变了英语本身。",
  whyRead: "他不是'经典作家'——在他那个时代他是大众娱乐的提供者。他的戏剧里有鬼魂、女巫、决斗、毒药和笑料。先不要被'伟大'吓到。",
  suitableFor: "适合对西方戏剧和英语文学有兴趣的读者。",
  notSuitableFor: "伊丽莎白时代的英语对现代读者有语言门槛，需选好译本。",
  difficultyLevel: 3, difficultyReason: "语言是主要障碍（早期现代英语）。但故事结构清晰。好的译本（中文或现代英语）可以大大降低门槛。",
  readingPrerequisites: "不需要。",
  readingAdvice: "先看一部改编电影或话剧再读剧本——知道剧情后再读原文会轻松很多。",
  beginnerEntry: false,
});

add("麦克白", "Macbeth", "威廉·莎士比亚", "英国", 1606, "戏剧", "悲剧", 3, false, ["classics"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读经验的读者",
  oneSentencePositioning: "一个将军听了三个女巫的预言后杀国王夺王位——然后被自己的良心逼疯。",
  whyClassic: "莎士比亚最短也最紧凑的悲剧。'人生不过是一个行走的影子'——麦克白在最后说出的话是英语文学最著名的独白之一。",
  whyRead: "最短（约2小时演出时长），节奏最快。女巫的预言、麦克白夫人的'脱掉我女性的软弱'、班柯的鬼魂——每一幕都是经典。",
  suitableFor: "适合对莎士比亚有兴趣的入门读者（篇幅最短）。",
  notSuitableFor: "部分暴力场景（杀国王、杀班柯、杀麦克德夫妻儿）。",
  difficultyLevel: 3, difficultyReason: "莎士比亚语言。篇幅短是优势。",
  readingPrerequisites: "不需要。",
  readingAdvice: "先看一部电影版——推荐波兰斯基或库泽尔的版本。",
  beginnerEntry: false,
});

// 日本
add("源氏物语", "源氏物語", "紫式部", "日本", 1008, "小说", "物语", 3, false, ["classics"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读耐心的读者",
  oneSentencePositioning: "平安时代的天皇之子光源氏的爱情与政治生涯——世界上第一部长篇小说。",
  whyClassic: "世界上第一部长篇写实小说，比《堂吉诃德》早600年。它不仅是文学——也是研究平安时代贵族生活最重要的历史文献。",
  whyRead: "它非常'现代'——光源氏的感情纠葛、女性的心理描写、宫廷政治的微妙，今天读来完全不觉得隔膜。",
  suitableFor: "适合对日本古典文学有兴趣的读者。",
  notSuitableFor: "篇幅长（54帖），人物关系复杂，大量平安时代的宫廷习俗需要注释。",
  difficultyLevel: 3, difficultyReason: "篇幅长，人物众多，平安时代的复杂习俗需要注释。推荐选丰子恺的译本。",
  readingPrerequisites: "不需要。对日本平安时代历史的基本了解有帮助。",
  readingAdvice: "选丰子恺的中文译本。前几帖（光源氏的情史）最好看。",
  beginnerEntry: false,
});

add("平家物语", "平家物語", "佚名", "日本", 1300, "小说", "军记物语", 3, false, ["classics"], {
  roleInPath: "CORE", suitability: "适合对日本历史文学有兴趣的读者",
  oneSentencePositioning: "平家一族的兴亡——'骄奢者不久长，只如春夜之梦。'",
  whyClassic: "日本最著名的军记物语，'平家物语'的开篇是日本文学最有名的句子之一。它奠定了日本'物哀'的审美传统。",
  whyRead: "不是一个家族的兴衰史——是一曲关于'无常'的长歌。荣华之后是没落，权力之后是毁灭。这正是日本美学'物哀'的核心。",
  suitableFor: "适合对日本历史和文化有兴趣的读者。",
  notSuitableFor: "大量历史事件和人物，需要一定的日本历史知识。",
  difficultyLevel: 3, difficultyReason: "大量历史事件和人物。文体是'和汉混交文'。推荐现代译本。",
  readingPrerequisites: "对源平合战的历史有基本了解会大大帮助。",
  readingAdvice: "开篇的'祇园精舍钟声响'一定要读——它是日本文学最著名的段落之一。",
  beginnerEntry: false,
});

// 中国现当代
add("四世同堂", "四世同堂", "老舍", "中国", 1948, "小说", "现实主义小说", 2, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合作为中国现代文学入门",
  oneSentencePositioning: "北京一个胡同里四代人在抗日战争中的挣扎与坚守。",
  whyClassic: "老舍最宏大的作品。它以一座小胡同写整个民族的苦难。老舍对北京的热爱和对普通人的理解，在这部小说里达到了顶峰。",
  whyRead: "老舍写北京没人比得上——胡同里的吆喝声、鸽哨声、邻里之间的闲话，活生生的北京。在战争背景下，这些日常变得无比珍贵。",
  suitableFor: "适合所有读者。对北京文化和抗日战争历史有兴趣的人。",
  notSuitableFor: "篇幅长（三部曲）。",
  difficultyLevel: 2, difficultyReason: "语言是老舍标志性的北京口语，流畅亲切。人物众多但各有特色。",
  readingPrerequisites: "不需要。", readingAdvice: "瑞宣这个角色最接近作者本人——注意他内心的矛盾和挣扎。",
  beginnerEntry: true,
});

add("茶馆", "茶馆", "老舍", "中国", 1957, "戏剧", "话剧", 2, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "一个茶馆里，半个世纪的中国历史——三个时代，同一群人的命运。",
  whyClassic: "中国话剧的最高成就。三幕戏覆盖了从戊戌变法到抗战胜利的半个世纪。老舍用最小的空间写了最大的时代。",
  whyRead: "极短（三幕，2小时演完），但人物众多、信息量大。而且好笑——老舍的幽默在悲剧中闪闪发光。",
  suitableFor: "适合所有读者。", notSuitableFor: "没有。",
  difficultyLevel: 1, difficultyReason: "剧本形式，对话为主。篇幅短。老舍的语言口语化、幽默。",
  readingPrerequisites: "不需要。",
  readingAdvice: "如果附近有茶馆演出，一定去看——剧本的精彩在舞台上更直观。",
  beginnerEntry: true,
});

add("半生缘", "半生缘", "张爱玲", "中国", 1948, "小说", "爱情小说", 2, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "一对相爱的人因为误会和阴差阳错错过了半生——'我们回不去了。'",
  whyClassic: "张爱玲最感人的长篇，'我们回不去了'是中文小说中最令人心碎的对白之一。她写上海的爱情写出了上海的气息。",
  whyRead: "不是琼瑶式的爱情——是现实的、无奈的、带着算计和犹豫的爱情。曼桢和世钧的故事让人相信张爱玲不是在写小说，是在写人生。",
  suitableFor: "适合所有读者。对张爱玲和上海民国时期有兴趣的人。",
  notSuitableFor: "结局很伤感。",
  difficultyLevel: 2, difficultyReason: "语言流畅，叙事线清楚。张爱玲的比喻是阅读的最大享受。",
  readingPrerequisites: "不需要。",
  readingAdvice: "张爱玲的前半生和小说有重叠——了解她的身世会让阅读更有层次。",
  beginnerEntry: true,
});

add("生死场", "生死场", "萧红", "中国", 1934, "小说", "现实主义小说", 2, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合作为中国现代文学入门",
  oneSentencePositioning: "东北乡村里的人生——像畜生一样生，像畜生一样死。",
  whyClassic: "萧红的成名作，鲁迅亲自为它作序。它写的是最底层的人的生存——没有浪漫、没有英雄、只有'活着'本身。",
  whyRead: "萧红的笔触是冷的。她不煽情，只是记录。但读完你会发现那些'像麦子一样被收割'的生命让你无法忘记。",
  suitableFor: "适合对中国现代文学有兴趣的读者。",
  notSuitableFor: "格调灰暗，生存场景残酷。",
  difficultyLevel: 2, difficultyReason: "叙事碎片化但语言清晰。篇幅短。主题沉重但不影响阅读流畅性。",
  readingPrerequisites: "不需要。", readingAdvice: "鲁迅的序很短但很重要——他解释了萧红的写作意义。",
  beginnerEntry: true,
});

add("文化苦旅", "文化苦旅", "余秋雨", "中国", 1992, "散文", "文化散文", 2, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "一个人走遍中国最重要的文化遗址——从敦煌到西湖，边走边想。",
  whyClassic: "中国当代散文销量最高的作品之一。它让'文化散文'成为一个独立的写作类型。余秋雨用一种新的方式写中国文化。",
  whyRead: "适合作为中国文化的入门读物——它把历史、地理和人文融合在一起。文字流畅优雅，适合没有专业背景的普通读者。",
  suitableFor: "适合所有读者。对中国历史文化有兴趣但不知从何入手的人。",
  notSuitableFor: "部分读者认为余秋雨的写作风格过于煽情。",
  difficultyLevel: 2, difficultyReason: "散文体，每篇独立。语言流畅优美。不需要专业知识。",
  readingPrerequisites: "不需要。", readingAdvice: "'道士塔'（写敦煌的那篇）是最著名的一篇。",
  beginnerEntry: true,
});

fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
console.log("\nDone!");
