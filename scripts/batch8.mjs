// Batch 8: SF classics + more
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

add("银河系漫游指南", "The Hitchhiker's Guide to the Galaxy", "道格拉斯·亚当斯", "英国", 1979, "小说", "科幻喜剧", 1, true, ["science-fiction"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "地球被拆了，一个普通人搭上外星人的飞船开始了一场荒唐的星际旅行。",
  whyClassic: "史上最好笑的科幻小说。它证明科幻可以不只是严肃的科技预言，也可以是最疯狂的喜剧。'42'已经成为流行文化符号。",
  whyRead: "从头笑到尾。亚当斯的幽默是一种英国式的荒诞——如果宇宙毫无意义，那最好的回应就是开它的玩笑。",
  suitableFor: "适合所有读者，尤其是想轻松进入科幻类型的人。",
  notSuitableFor: "对英式荒诞幽默不感冒的读者可能get不到。",
  difficultyLevel: 1,
  difficultyReason: "语言轻松幽默，情节荒诞但容易跟进。每个章节都很短。不需要任何科学知识。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意那条毛巾——它真的有用。",
  beginnerEntry: true,
});

add("基地", "Foundation", "艾萨克·阿西莫夫", "美国", 1951, "小说", "科幻小说", 3, false, ["science-fiction"], {
  roleInPath: "CORE", suitability: "适合对科幻有兴趣的读者",
  oneSentencePositioning: "一个数学家预测银河帝国即将崩溃，他创建了一个'基地'来保存文明的火种。",
  whyClassic: "雨果奖'史上最佳系列'。阿西莫夫用'心理史学'（用数学预测历史）的设定，开创了'社会科幻'子类别。",
  whyRead: "不是传统的人物驱动小说——主角更像是'文明'本身。时间跨度数百年，角色不断更替，只有基地持续存在。这种写法在当时是革命性的。",
  suitableFor: "适合喜欢大历史框架和社会学思考的读者。",
  notSuitableFor: "人物塑造较薄弱，以观念和情节推动。",
  difficultyLevel: 3,
  difficultyReason: "叙事跨越多世纪和角色，需要适应'没有固定主角'的叙事方式。对话密集，解释性强。",
  readingPrerequisites: "不需要。",
  readingAdvice: "不要期待单一主角——基地本身才是真正的主角。",
  beginnerEntry: false,
});

add("我，机器人", "I, Robot", "艾萨克·阿西莫夫", "美国", 1950, "小说", "科幻小说", 2, true, ["science-fiction"], {
  roleInPath: "ENTRY", suitability: "适合作为科幻入门",
  oneSentencePositioning: "一组关于机器人的短篇故事，探讨机器人三定律在现实中的各种意外。",
  whyClassic: "阿西莫夫提出了'机器人三定律'，成为后来所有AI伦理讨论的基础框架。这部短篇集比任何哲学论文都更生动地展示了伦理规则的漏洞。",
  whyRead: "每一个短篇都是一个思想实验：如果机器人被命令保护人类，但保护的方式伤害了人类，该怎么办？",
  suitableFor: "适合所有读者。对AI和科技伦理有兴趣的人。",
  notSuitableFor: "没有。",
  difficultyLevel: 2,
  difficultyReason: "短篇形式，每个故事独立。语言清晰。不需要技术背景。",
  readingPrerequisites: "不需要。",
  readingAdvice: "每读完一个故事停下来想想——阿西莫夫不是在预测未来，而是在测试伦理规则的边界。",
  beginnerEntry: true,
});

add("与拉玛相会", "Rendezvous with Rama", "阿瑟·C·克拉克", "英国", 1973, "小说", "科幻小说", 2, true, ["science-fiction"], {
  roleInPath: "ENTRY", suitability: "适合作为科幻入门",
  oneSentencePositioning: "一个圆柱形外星飞船进入太阳系，人类派探险队进入其中探索。",
  whyClassic: "雨果奖和星云奖双料获奖作品。硬科幻的极致——全篇是人类探索一个未知结构的记录，没有外星人出现，没有冲突，只有纯然的探索之乐。",
  whyRead: "它展示了科幻最纯粹的魅力：不是人类之间的战争，而是面对完全陌生的东西时纯粹的智识好奇。",
  suitableFor: "适合喜欢硬科幻和探索主题的读者。",
  notSuitableFor: "没有传统的人物冲突或戏剧性事件。",
  difficultyLevel: 2,
  difficultyReason: "叙事是线性的探索记录，语言清晰。不需要高深科学知识（克拉克解释得很清楚）。",
  readingPrerequisites: "不需要。",
  readingAdvice: "放慢速度，和探险队一起发现拉玛的每一个新区域——'发现'本身就是全部乐趣。",
  beginnerEntry: true,
});

add("童年的终结", "Childhood's End", "阿瑟·C·克拉克", "英国", 1953, "小说", "科幻小说", 2, true, ["science-fiction"], {
  roleInPath: "ENTRY", suitability: "适合作为科幻入门",
  oneSentencePositioning: "外星人降临地球，带来了和平与繁荣——但他们的真正目的在几代之后才显露。",
  whyClassic: "克拉克最受推崇的作品之一。它颠覆了'外星人入侵'的套路——来的不是侵略者，而是管理者。但他们的善意背后有一个让人类必须付出终极代价的安排。",
  whyRead: "不像传统科幻——它更像一个哲学寓言。外星人的形象（有角、有尾、有翅膀）刻意呼应了西方文化中的恶魔形象，这一设计本身就是一种评论。",
  suitableFor: "适合喜欢思想实验型科幻的读者。",
  notSuitableFor: "格调从平和逐渐走向悲壮。",
  difficultyLevel: 2,
  difficultyReason: "叙事推进清晰，语言流畅。主题深刻但小说本身不难读。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意外星人为什么选择那个形象出现——这个选择本身就是小说最重要的线索之一。",
  beginnerEntry: true,
});

add("火星救援", "The Martian", "安迪·威尔", "美国", 2011, "小说", "科幻小说", 2, true, ["science-fiction"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "一个宇航员被留在火星上，他必须用自己的植物学和化学知识活到下一次任务到达。",
  whyClassic: "自出版现象级成功后被改编为电影。它证明科幻可以既科学严谨又有趣到让人笑出声。",
  whyRead: "主角马克·沃特尼用第一人称日志记录他的火星求生——他的幽默感在绝境中不仅合理而且感染力极强。你会学到如何在火星上种土豆。",
  suitableFor: "适合所有读者。对科学有兴趣的人尤其享受。",
  notSuitableFor: "部分科学解释可能对文科读者略显密集。",
  difficultyLevel: 2,
  difficultyReason: "主角的日志风格口语化、幽默。科学内容解释得很清楚。情节驱动，悬念强。",
  readingPrerequisites: "不需要。",
  readingAdvice: "主角会在日志里用括号写吐槽——那是最好的部分。",
  beginnerEntry: true,
});

add("三体", "三体", "刘慈欣", "中国", 2006, "小说", "科幻小说", 3, false, ["science-fiction"], {
  roleInPath: "CORE", suitability: "适合对科幻有兴趣的读者",
  oneSentencePositioning: "一个在文革中受到迫害的女天文学家向宇宙发送了信号，收到了不该收到的回复。",
  whyClassic: "雨果奖获奖作品，中国科幻的里程碑。刘慈欣以前所未有的尺度思考宇宙文明之间的关系——'黑暗森林'法则已经进入流行文化。",
  whyRead: "它把中国当代历史、物理学前沿和宇宙社会学编织在一起。独特的'文革叙事'作为科幻的前提设定，是只有中国作家才能写出的角度。",
  suitableFor: "适合喜欢硬科幻和大尺度叙事的读者。对宇宙学有兴趣的人。",
  notSuitableFor: "开头文革叙事可能让部分读者觉得沉重。科学概念密集。",
  difficultyLevel: 3,
  difficultyReason: "大量物理学和宇宙学概念（三体问题、量子纠缠等）对部分读者有门槛。但刘慈欣用故事把这些概念讲得很清楚。",
  readingPrerequisites: "对基础物理学概念有兴趣会帮助阅读。",
  readingAdvice: "第一部可能觉得节奏偏慢——它在铺垫。第三部《死神永生》才是真正的巅峰。",
  beginnerEntry: false,
});

add("黑暗森林", "黑暗森林", "刘慈欣", "中国", 2008, "小说", "科幻小说", 3, false, ["science-fiction"], {
  roleInPath: "CORE", suitability: "建议先读《三体》",
  oneSentencePositioning: "人类面临三体文明的入侵，唯一的希望是一个'面壁者'的疯狂计划。",
  whyClassic: "《三体》三部曲第二部，被许多读者认为是三部曲中最强的一部。'黑暗森林'理论是整个系列的核心概念。",
  whyRead: "'面壁者'和'破壁人'的设定本身就是一种精彩的思想游戏。罗辑这个角色从玩世不恭到承担人类命运的转变极具感染力。",
  suitableFor: "适合已读完《三体》的读者。",
  notSuitableFor: "不适合没读过第一部的读者。",
  difficultyLevel: 3,
  difficultyReason: "同第一部，大量物理学概念。黑暗森林理论的推导过程需要耐心跟随。",
  readingPrerequisites: "必须读过《三体》（第一部）。",
  readingAdvice: "面壁者罗辑的策略——他一直到最后才揭示——是三部曲中最精彩的逆转之一。",
  beginnerEntry: false,
});

// More Chinese literature
add("繁花", "繁花", "金宇澄", "中国", 2012, "小说", "文学小说", 3, false, ["modernism"], {
  roleInPath: "CORE", suitability: "适合对沪语文学有兴趣的读者",
  oneSentencePositioning: "上海的街头巷尾——从1960年代到1990年代，一群人的命运如繁花开落。",
  whyClassic: "茅盾文学奖获奖作品。全篇用沪语写就，是中国方言文学的重要突破。它被改编为电视剧后引发全国性关注。",
  whyRead: "语言是最大特色——沪语的节奏和质感为故事赋予了一种独特的'上海味道'。叙事不聚焦于一个人，而是像漫步在上海弄堂里，看到不同人家的窗口。",
  suitableFor: "适合对上海文化和方言有兴趣的读者。",
  notSuitableFor: "沪语叙事对非吴语区读者可能有一定阅读障碍。人物众多。",
  difficultyLevel: 3,
  difficultyReason: "沪语方言写作需要非吴语区读者花时间适应。人物众多，关系网复杂。叙事非线形，在1960和1990年代之间跳跃。",
  readingPrerequisites: "对上海话有一些了解会帮助。",
  readingAdvice: "上海话部分如果读不懂可以跳过对话——故事的脉络仍然清楚。",
  beginnerEntry: false,
});

add("秦腔", "秦腔", "贾平凹", "中国", 2005, "小说", "现实主义小说", 3, false, ["realism"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "陕西一个乡村在城市化浪潮中的日常生活——一场葬礼和一场婚礼之间，一个时代结束了。",
  whyClassic: "茅盾文学奖获奖作品。贾平凹用极度密实的细节描写了中国乡村在现代化冲击下的瓦解。'秦腔'既是陕西地方戏曲，也是乡村最后的叹息。",
  whyRead: "它没有核心情节——像是日记一样记录一个村庄一年里的日常。这种'无事'本身就是在说一件事：传统乡村生活正在消失。",
  suitableFor: "适合对中国乡村和社会变迁有兴趣的读者。",
  notSuitableFor: "没有核心情节，人物众多，需要极大的阅读耐心。",
  difficultyLevel: 3,
  difficultyReason: "叙事没有传统的情节线，像流水账一样记录日常生活。大量陕西地方文化和方言细节。人物众多。",
  readingPrerequisites: "不需要。对中国农村生活有一些了解会帮助进入。",
  readingAdvice: "不要寻找主线——把它当作一次驻村体验，每一天都是村民的日常。",
  beginnerEntry: false,
});

fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
console.log("\nDone!");
