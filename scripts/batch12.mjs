// Batch 12: Ancient classics - Western & Chinese
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

// ═══ 西方史诗 ═══
add("伊利亚特", "Ἰλιάς", "荷马", "古希腊", -750, "诗歌", "史诗", 3, false, ["classics"], {
  roleInPath: "CORE", suitability: "适合对西方文学起源有兴趣的读者",
  oneSentencePositioning: "特洛伊战争第十年，阿喀琉斯的愤怒和他杀死赫克托耳的故事。",
  whyClassic: "西方文学的源头。但丁称荷马为'诗王'。它对战争、荣誉和命运的思考影响了此后三千年的西方文学。",
  whyRead: "不是历史，是一部关于愤怒和原谅的史诗。阿喀琉斯因为女俘被夺走拒绝出战，直到好友被杀才重返战场——这是一个关于骄傲代价的故事。",
  suitableFor: "适合对西方古典文学有兴趣的读者。对古希腊神话有一定了解会帮助。",
  notSuitableFor: "古代诗歌体可能让不习惯的读者觉得隔膜。大量人名和族名。",
  difficultyLevel: 3,
  difficultyReason: "古代史诗的叙事节奏和现代小说不同。众多神祇和英雄名字需要记忆。但故事线本身清楚。推荐选择好的现代译本。",
  readingPrerequisites: "不需要。对古希腊神话和特洛伊战争的基本了解会帮助。",
  readingAdvice: "不要被人物名单吓退。核心故事只有两个人：阿喀琉斯和赫克托耳。其他都是背景。",
  beginnerEntry: false,
});

add("奥德赛", "Ὀδύσσεια", "荷马", "古希腊", -720, "诗歌", "史诗", 3, false, ["classics"], {
  roleInPath: "CORE", suitability: "适合对西方文学起源有兴趣的读者",
  oneSentencePositioning: "特洛伊战后，奥德修斯在海上漂泊十年回家的故事——途中遇到独眼巨人、女巫和女妖。",
  whyClassic: "与《伊利亚特》并列西方文学两大源头。它奠定了'长途回家'的叙事原型，《尤利西斯》就是它的现代版。",
  whyRead: "比《伊利亚特》更好读——它更像冒险故事：独眼巨人、魔女喀耳刻、海妖塞壬。但它本质上是一个关于忠诚、忍耐和回家的故事。",
  suitableFor: "适合所有读者。冒险故事的外壳让入门更容易。",
  notSuitableFor: "古代诗歌体。",
  difficultyLevel: 3,
  difficultyReason: "同《伊利亚特》，古代史诗的节奏和现代小说不同。但故事性更强，更容易进入。",
  readingPrerequisites: "不需要。",
  readingAdvice: "现代译本差异很大——推荐选择散文译本而非诗体译本，会流畅很多。",
  beginnerEntry: false,
});

add("神曲", "Divina Commedia", "但丁·阿利吉耶里", "意大利", 1320, "诗歌", "史诗", 4, false, ["classics"], {
  roleInPath: "ADVANCED", suitability: "适合有古典文学阅读基础的读者",
  oneSentencePositioning: "但丁在地狱、炼狱和天堂中的旅程——他遇到了历史上的罪人、忏悔者和圣人。",
  whyClassic: "意大利文学的最高峰，中世纪文学的集大成者。它创造了'地狱九圈'的经典意象，影响了后世对死后世界的所有想象。",
  whyRead: "它不只是关于死后世界——更是对13世纪佛罗伦萨政治、教会腐败和人类命运的全面评论。每一层地狱里的人物都有真实的历史背景。",
  suitableFor: "适合对西方古典文化有兴趣的严肃读者。",
  notSuitableFor: "大量中世纪神学和历史典故，阅读门槛高。",
  difficultyLevel: 4,
  difficultyReason: "需要大量注释才能理解诗中的人物和典故。但丁的政治立场和神学背景需要了解。好的译本会提供必要的注释。",
  readingPrerequisites: "对基督教神学和中世纪意大利政治的基本了解是必要的。",
  readingAdvice: "选一个注释详细的译本。不要追求一次读懂全部——先读故事层面，以后再深入典故。",
  beginnerEntry: false,
});

add("失乐园", "Paradise Lost", "约翰·弥尔顿", "英国", 1667, "诗歌", "史诗", 4, false, ["classics"], {
  roleInPath: "ADVANCED", suitability: "适合有古典文学阅读基础的读者",
  oneSentencePositioning: "撒旦反抗上帝、引诱人类堕落的史诗——撒旦是文学史上最迷人的反派。",
  whyClassic: "英语文学最伟大的史诗。弥尔顿在失明后'口述'完成了这部十二卷的巨著。撒旦的形象比主角更令人难忘。",
  whyRead: "撒旦是这部诗真正的主角。他的台词'宁在地狱为王，不在天堂为奴'是英语文学最著名的句子之一。弥尔顿实际上创造了一个比他意图中更伟大的反英雄。",
  suitableFor: "适合对英语诗歌和基督教神话有兴趣的读者。",
  notSuitableFor: "17世纪英语诗歌对现代读者来说有语言门槛。",
  difficultyLevel: 4,
  difficultyReason: "17世纪英语词汇和句法与现代相差较大。史诗体长诗需要耐心。大量圣经和古典典故。",
  readingPrerequisites: "对圣经旧约有一定的了解。",
  readingAdvice: "撒旦的部分最好看——弥尔顿让他太迷人了，以至于后来的评论家都在争论弥尔顿到底站在哪一边。",
  beginnerEntry: false,
});

// ═══ 中国古典 ═══
add("诗经", "诗经", "佚名（采集编定）", "中国", -600, "诗歌", "诗歌总集", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合作为中国古典文学入门",
  oneSentencePositioning: "中国最早的诗歌总集，305篇——从民间情歌到宗庙颂歌。",
  whyClassic: "中国文学的源头。'风雅颂'、'赋比兴'奠定了中国诗歌的基本方法论。不读诗经就无从理解中国文学。",
  whyRead: "你以为两千多年前的诗会很难懂？不——'关关雎鸠，在河之洲。窈窕淑女，君子好逑。'今天的人一看就懂。古人和今人的情感是相通的。",
  suitableFor: "适合所有读者。篇幅短（每篇几行），可以零碎时间读。",
  notSuitableFor: "没有。",
  difficultyLevel: 2,
  difficultyReason: "每篇篇幅极短，有现代注释的版本很易读。部分涉及古代名物和制度的篇目需要注释。",
  readingPrerequisites: "不需要。",
  readingAdvice: "选一个带现代汉语翻译和注释的版本。先读'国风'部分——那是最动人的民间情歌。",
  beginnerEntry: true,
});

add("楚辞", "楚辞", "屈原等", "中国", -300, "诗歌", "诗歌集", 3, false, ["classics"], {
  roleInPath: "CORE", suitability: "适合对中国古典文学有兴趣的读者",
  oneSentencePositioning: "战国时期楚国的诗歌集——以屈原的《离骚》为代表，充满神话、香草和悲愤。",
  whyClassic: "中国浪漫主义文学的开端。与《诗经》的现实主义形成双峰并峙。屈原是中国文学史上第一位有个性的诗人。",
  whyRead: "《离骚》是一个政治理想破灭者的内心独白——他把自己比作香草，把小人比作臭草。感情之强烈、想象力之瑰丽，在先秦文学中独一无二。",
  suitableFor: "适合对中国古代文化和诗歌有兴趣的读者。",
  notSuitableFor: "大量楚地方言、神话和香草比喻需要注释。",
  difficultyLevel: 3,
  difficultyReason: "楚地方言和特殊词汇需要注释。大量的香草美人比喻有特定的政治寓意。但核心情感（理想破灭后的痛苦）是普世的。",
  readingPrerequisites: "对战国时期楚国历史有基本了解会帮助。",
  readingAdvice: "选一个有详细注释的版本。先读《离骚》的翻译部分，再慢慢对照原文。",
  beginnerEntry: false,
});

add("论语", "论语", "孔子及弟子", "中国", -400, "哲学", "语录体", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合作为中国哲学入门",
  oneSentencePositioning: "孔子和弟子们的对话记录——关于如何做人、如何治国、如何学习。",
  whyClassic: "两千多年来影响中国人最深的书。没有论语就没有'儒家'，没有儒家就没有传统中国的政治和伦理体系。",
  whyRead: "很薄，不到两万字。但'学而时习之'、'己所不欲勿施于人'、'有教无类'已经成为中国人的文化基因。读原文会惊讶地发现孔子比想象的幽默和灵活。",
  suitableFor: "适合所有读者。",
  notSuitableFor: "没有。",
  difficultyLevel: 2,
  difficultyReason: "语录体，每段极短。有现代翻译的版本可以让当代读者无障碍阅读。部分涉及古代制度的段落需注释。",
  readingPrerequisites: "不需要。",
  readingAdvice: "不要把它当成哲学著作——把它当成一个有趣的老先生的言行录。孔子经常开玩笑、批评学生、表达情感。",
  beginnerEntry: true,
});

add("庄子", "庄子", "庄周", "中国", -350, "哲学", "哲学散文", 3, false, ["classics"], {
  roleInPath: "CORE", suitability: "适合对中国哲学有兴趣的读者",
  oneSentencePositioning: "中国最自由的哲学家——他讲寓言、讲神话、讲'逍遥游'，告诉你什么叫做'自由'。",
  whyClassic: "与儒家互补的中国思想传统。如果说孔子教你如何在社会中做事，庄子教你如何在自己的内心获得自由。他的文字是所有先秦诸子中最好的。",
  whyRead: "开头就是一条名叫鲲的鱼变成大鹏鸟飞上九万里高空——庄子不是用理论说服你，而是让你在想象中体验到自由。",
  suitableFor: "适合对哲学、自由、人生意义有兴趣的读者。",
  notSuitableFor: "部分篇目抽象难懂。",
  difficultyLevel: 3,
  difficultyReason: "内篇（前7篇）是庄子本人所作，相对系统；外篇和杂篇为后学所作，质量不一。庄子的论证方式不是西方的逻辑推理，而是寓言和比喻。",
  readingPrerequisites: "不需要。",
  readingAdvice: "从第一篇《逍遥游》开始——鲲鹏的故事是庄子的核心意象。先不要管哲学解读，感受那种自由的氛围。",
  beginnerEntry: false,
});

add("史记", "史记", "司马迁", "中国", -91, "历史", "纪传体通史", 3, false, ["classics"], {
  roleInPath: "CORE", suitability: "适合对中国历史有兴趣的读者",
  oneSentencePositioning: "从黄帝到汉武帝约三千年的历史——不是枯燥的年表，而是人物的故事。",
  whyClassic: "中国史学第一书，'二十四史'之首。不仅仅是历史——也是文学。司马迁的本纪、世家、列传中的叙事技巧至今仍是写作典范。",
  whyRead: "项羽的四面楚歌、荆轲的易水告别、李广的'飞将军'传奇——司马迁写人物的能力让三千年后的我们仍然能感受到他们的温度。",
  suitableFor: "适合对中国历史有兴趣的读者。列传部分适合零散阅读。",
  notSuitableFor: "篇幅庞大（130篇），不适合从头到尾通读。",
  difficultyLevel: 3,
  difficultyReason: "文言文写作，但现代注释版可读。本纪部分涉及制度、年表较枯燥；列传部分故事性强，容易进入。",
  readingPrerequisites: "不需要。",
  readingAdvice: "不要从头读——先读列传。项羽本纪、廉颇蔺相如列传、刺客列传（荆轲）是最好看的。",
  beginnerEntry: false,
});

// ═══ 四大名著 ═══
add("红楼梦", "红楼梦", "曹雪芹", "中国", 1791, "小说", "长篇小说", 3, false, ["classics", "realism"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读耐心的读者",
  oneSentencePositioning: "一个贵族家族的由盛转衰，和一对注定不能在一起的恋人。",
  whyClassic: "中国古典小说的最高峰。'红学'是唯一一部以一部小说为研究对象的学科。它写尽了人情世故，也写透了'好就是了'的虚无。",
  whyRead: "不但因为它'伟大'——更因为它'真'。林黛玉的尖刻、贾宝玉的痴、王熙凤的精明——每个人都是活的。一百年后的人读它，仍然会发现自己在里面。",
  suitableFor: "适合所有对人情世故和中国传统文化有兴趣的读者。",
  notSuitableFor: "人物众多（400+），需要投入时间和精力。后四十回为高鹗续作，与前八十回有差距。",
  difficultyLevel: 3,
  difficultyReason: "人物关系网复杂（建议准备家族谱系图）。大量诗词曲赋可能对部分读者是障碍（可以跳过不影响情节）。",
  readingPrerequisites: "不需要。",
  readingAdvice: "前五回是全书的总纲——如果觉得难，坚持下去。从第六回刘姥姥进荣国府开始就流畅了。",
  beginnerEntry: false,
});

add("西游记", "西游记", "吴承恩", "中国", 1592, "小说", "神魔小说", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合所有读者，包括青少年",
  oneSentencePositioning: "唐僧师徒四人去西天取经——路上打了81场架。",
  whyClassic: "中国最家喻户晓的小说。孙悟空是中文世界最受欢迎的角色。它表面上是一部打怪升级的冒险小说，实际上是一个关于修心的寓言。",
  whyRead: "有趣。即使只看表面——孙悟空打妖怪——也足够好看。如果再深一点看，每一个妖怪都对应一种人性的弱点。",
  suitableFor: "适合所有读者。可以从青少年读到老。",
  notSuitableFor: "没有。",
  difficultyLevel: 2,
  difficultyReason: "章回体，每回的情节相对独立。语言半文半白，有现代注释版。故事驱动，阅读趣味强。",
  readingPrerequisites: "不需要。",
  readingAdvice: "如果不适应文言，可以选择现代白话版。核心故事是一样的。",
  beginnerEntry: true,
});

add("三国演义", "三国演义", "罗贯中", "中国", 1522, "小说", "历史小说", 2, true, ["classics"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "东汉末年三国的战争和权谋——谁统一了天下？没有人——至少不是你想的那个。",
  whyClassic: "中国最有影响力的历史小说。'三个臭皮匠顶个诸葛亮'、'说曹操曹操到'——三国已经进入了中国人的日常语言。它影响了日本、韩国的流行文化至今。",
  whyRead: "比《三国志》好看一百倍——罗贯中不是写历史，是写英雄。关羽的义、诸葛亮的智、曹操的奸——每个人物都到了极致。",
  suitableFor: "适合所有读者。对权谋和战争有兴趣的人尤其享受。",
  notSuitableFor: "历史人物众多（1000+），人名记不住。",
  difficultyLevel: 2,
  difficultyReason: "章回体，每回有悬念。语言半文半白但流畅。人物众多但核心角色不多。",
  readingPrerequisites: "不需要。",
  readingAdvice: "不用记住所有人——核心是曹操、刘备、孙权三方博弈。诸葛亮出场后故事会更精彩。",
  beginnerEntry: true,
});

add("水浒传", "水浒传", "施耐庵", "中国", 1589, "小说", "英雄传奇", 3, false, ["classics"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读耐心的读者",
  oneSentencePositioning: "108个被逼上梁山的好汉的故事——以及他们最后的悲剧结局。",
  whyClassic: "中国英雄传奇的代表作。林教头风雪山神庙、武松打虎、鲁智深倒拔垂杨柳——这些故事每一个中国人都知道。",
  whyRead: "前半部最好看——每一个好汉上山的故事都是独立的短篇佳作。后半部招安之后格调转悲，但这是作者的深意——反抗者最终的命运不是童话。",
  suitableFor: "适合喜欢英雄传奇和江湖故事的读者。",
  notSuitableFor: "暴力和血腥场景较多。对女性角色的描写有时代局限。",
  difficultyLevel: 3,
  difficultyReason: "章回体，语言半文半白。人物众多（108将加上配角数百）。结构上前半部（个人传记）比后半部（集体行动）好读。",
  readingPrerequisites: "不需要。",
  readingAdvice: "读前半部就好——林冲、武松、鲁智深、宋江各有一大段精彩故事。后半部招安后的情节可以快速读过。",
  beginnerEntry: false,
});

// ═══ 更多西方经典 ═══
add("堂吉诃德", "Don Quijote de la Mancha", "米格尔·德·塞万提斯", "西班牙", 1605, "小说", "长篇小说", 3, false, ["classics"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读耐心的读者",
  oneSentencePositioning: "一个读了太多骑士小说而疯了的老人，骑着一匹瘦马出去行侠仗义——把风车当成了巨人。",
  whyClassic: "现代小说的开端。塞万提斯之前，小说是讲述英雄冒险的故事；塞万提斯之后，小说变成对人本身的探索。",
  whyRead: "堂吉诃德不是傻——他是选择了活在一个更美好的世界里。桑丘不是笨——他是留下来陪他做梦的人。这不仅是好笑的故事，更是我该不该向现实低头的追问。",
  suitableFor: "适合对西方文学起源有兴趣的读者。",
  notSuitableFor: "篇幅长（上下卷），17世纪叙事节奏慢。",
  difficultyLevel: 3,
  difficultyReason: "篇幅是主要门槛。第一部节奏更快，第二部更哲学化。塞万提斯在第二部中使用了'元小说'技巧——书中人物读过第一部。",
  readingPrerequisites: "不需要。",
  readingAdvice: "第一部最好看——风车大战、客栈城堡、桑丘的谚语。第二部更深刻但节奏更慢。",
  beginnerEntry: false,
});

add("浮士德", "Faust", "约翰·沃尔夫冈·冯·歌德", "德国", 1808, "诗歌", "诗剧", 4, false, ["classics"], {
  roleInPath: "ADVANCED", suitability: "适合有古典文学和哲学基础的读者",
  oneSentencePositioning: "一个学者与魔鬼做交易——用灵魂换取知识、权力和青春。",
  whyClassic: "歌德用60年写成的诗剧，德意志文学的最高峰。浮士德的故事是'现代人的寓言'——永远不满足、永远渴望更多。",
  whyRead: "浮士德不是被魔鬼诱惑的受害者——他主动选择了交易。他的问题不是'太贪婪'，而是'永远追求更好'——这既是人类的伟大也是人类的悲剧。",
  suitableFor: "适合对哲学、神学和德国文学有兴趣的严肃读者。",
  notSuitableFor: "诗剧体、大量哲学讨论和古典典故。",
  difficultyLevel: 4,
  difficultyReason: "诗剧形式。涉及大量圣经、希腊神话和欧洲历史典故。哲学讨论密集。上下两部风格差异大（第一部更个人化，第二部更象征化）。",
  readingPrerequisites: "对德国浪漫主义和启蒙运动的基本了解有帮助。",
  readingAdvice: "第一部比第二部好读——浮士德和格雷琴的爱情故事是诗剧中最动人的段落之一。",
  beginnerEntry: false,
});

add("希腊悲剧选", "Greek Tragedies", "埃斯库罗斯/索福克勒斯/欧里庇得斯", "古希腊", -400, "戏剧", "悲剧", 3, false, ["classics"], {
  roleInPath: "CORE", suitability: "适合对西方戏剧起源有兴趣的读者",
  oneSentencePositioning: "索福克勒斯的《俄狄浦斯王》——他杀父娶母，但一切都不是他的错，是命运。",
  whyClassic: "西方戏剧的起源。今天所有的悲剧——从《哈姆雷特》到现代电影——都在用古希腊人发明的结构。",
  whyRead: "《俄狄浦斯王》是历史上最完美的悲剧结构——不是因为他做错了什么，而是因为他试图逃避命运的行为本身导致了命运的实现。",
  suitableFor: "适合对西方文学和戏剧有兴趣的读者。",
  notSuitableFor: "古代戏剧的形式可能让部分读者觉得隔膜。",
  difficultyLevel: 3,
  difficultyReason: "戏剧形式（角色对话+合唱）需要一定适应。但核心故事（俄狄浦斯、安提戈涅、美狄亚）清晰有力。",
  readingPrerequisites: "对古希腊神话的基本了解会帮助。",
  readingAdvice: "索福克勒斯的《俄狄浦斯王》是最好的起点——它是亚里士多德在《诗学》中反复引用的'完美悲剧'。",
  beginnerEntry: false,
});

add("坎特伯雷故事集", "The Canterbury Tales", "杰弗雷·乔叟", "英国", 1400, "诗歌", "故事集", 3, false, ["classics"], {
  roleInPath: "CORE", suitability: "适合对英国文学起源有兴趣的读者",
  oneSentencePositioning: "一群朝圣者在去坎特伯雷的路上轮流讲故事——从骑士传奇到粗俗笑话应有尽有。",
  whyClassic: "英国文学之父乔叟的代表作。它在'框架叙事'（一群人轮流讲故事）的构造下，覆盖了中世纪社会的全貌——从贵族到乞丐。",
  whyRead: "它不是'高雅文学'——里面有粗俗的笑话、不忠的妻子和精明的商人。乔叟最惊人的地方在于他让每个阶层的角色讲符合他们身份的故事——骑士讲浪漫传奇，磨坊主讲黄色笑话。",
  suitableFor: "适合对中世纪社会和英国文学有兴趣的读者。",
  notSuitableFor: "中古英语原文很难读——必须选择现代英语译本。部分故事有时代局限的价值观。",
  difficultyLevel: 3,
  difficultyReason: "中古英语与现代英语差异极大，需选择现代译本。故事之间的连接部分（朝圣者之间的互动）也很有趣。",
  readingPrerequisites: "不需要。",
  readingAdvice: "选现代英语散文译本。磨坊主的故事和巴斯妇的故事最好看——它们也是最粗俗的。",
  beginnerEntry: false,
});

fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
console.log("\nDone!");
