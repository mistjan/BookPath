// Batch 4: More Booker winners + SF + Chinese
import fs from "fs";

const bpRaw = fs.readFileSync("lib/bookpath-data.ts", "utf-8");
const jStart = bpRaw.indexOf("export const bookPathData = ");
const oStart = bpRaw.indexOf("{", jStart);
let d = 0, jEnd = oStart;
for (let i = oStart; i < bpRaw.length; i++) { if (bpRaw[i] === "{") d++; else if (bpRaw[i] === "}") { d--; if (d === 0) { jEnd = i + 1; break; } } }
const data = JSON.parse(bpRaw.slice(oStart, jEnd));

function add(t, o, a, c, y, cat, sub, diff, beg, movs, g) {
  const slug = t.replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
  if (data.works.some((w) => w.slug === slug)) { console.log(`Skip ${t}`); return; }
  data.works.push({ id: slug, slug, titleDisplayCn: t, titleOriginal: o, authorName: a, countryOrRegion: c, firstPublishedYear: y, literaryCategory: cat, literarySubcategory: sub, workType: "长篇小说", difficultyLevel: diff, beginnerEntry: beg, movementIds: movs, guideCardIds: [`guide-${slug}`] });
  data.guideCards.push({ id: `guide-${slug}`, workId: slug, title: t, ...g, aiGenerated: false, reviewStatus: "AI_DRAFT" });
  console.log(`+ ${t}`);
}

// Booker winners
add("盲刺客", "The Blind Assassin", "玛格丽特·阿特伍德", "加拿大", 2000, "小说", "文学小说", 3, false, ["modernism", "postmodernism"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读经验的读者",
  oneSentencePositioning: "一个老妇人在回忆中揭开妹妹的死因——故事里套着故事里套着故事。",
  whyClassic: "2000年布克奖获奖作品。阿特伍德是加拿大最有国际声誉的作家，这部小说以嵌套叙事结构著称——小说中的人物写了一部科幻小说，那部小说又映射着现实。",
  whyRead: "三层叙事结构像俄罗斯套娃，每一层都揭示新信息。阿特伍德对记忆、阶级和女性命运的洞察力在这部作品里达到巅峰。",
  suitableFor: "适合喜欢复杂叙事结构和心理深度的读者。对女性题材有兴趣的人。",
  notSuitableFor: "嵌套叙事可能让不习惯的读者感到困惑。",
  difficultyLevel: 3,
  difficultyReason: "嵌套叙事（现实故事中的小说中的故事）需要读者注意层级切换。但每层叙事本身是清晰的。篇幅中等（约500页）。",
  readingPrerequisites: "不需要。建议对20世纪加拿大社会有一点了解。",
  readingAdvice: "注意书中那部'科幻小说'的内容——它不是副线，而是理解主线秘密的关键。",
  beginnerEntry: false,
});

add("美丽线条", "The Line of Beauty", "艾伦·霍林赫斯特", "英国", 2004, "小说", "文学小说", 3, false, ["modernism"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "1980年代，一个年轻同性恋者在撒切尔时代的英国上层社会中寻找爱与美。",
  whyClassic: "2004年布克奖获奖作品。以Henry James式的精致文笔写了一部'同性恋者的《了不起的盖茨比》'，描绘了1980年代英国的政治、阶级和欲望。",
  whyRead: "主角尼克向上攀附的过程既迷人又令人不安。霍林赫斯特的文笔精雕细琢，每一句都值得停下来看一遍。",
  suitableFor: "适合喜欢精致文笔和社会观察的读者。对1980年代英国政治和LGBTQ题材有兴趣的人。",
  notSuitableFor: "同性恋场景有直接描写。叙事节奏偏慢。",
  difficultyLevel: 3,
  difficultyReason: "文笔精致复杂（模仿Henry James的风格），需要一定的文学阅读经验。叙事不是强情节驱动，而是观察驱动。",
  readingPrerequisites: "对撒切尔时代的英国政治有一些了解会有帮助。",
  readingAdvice: "注意小说中的'美'和'道德'之间的张力——标题本身就在说美可能是危险的。",
  beginnerEntry: false,
});

add("海", "The Sea", "约翰·班维尔", "爱尔兰", 2005, "小说", "文学小说", 3, false, ["modernism"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "一个丧妻的中年男人回到童年度假的海边小镇，记忆如潮水般涌来。",
  whyClassic: "2005年布克奖获奖作品。班维尔以极诗意的语言写了一个关于记忆、loss和时间的沉思。篇幅短但密度高。",
  whyRead: "语言极其优美——班维尔的文笔常被拿来与纳博科夫比较。故事是关于一个人如何被记忆折磨，又靠记忆活下去。",
  suitableFor: "适合喜欢诗意语言和心理描写的读者。篇幅短（约200页），适合集中阅读。",
  notSuitableFor: "几乎没有情节推进，全部是内心独白和回忆。不适合期望故事性的读者。",
  difficultyLevel: 3,
  difficultyReason: "语言密度高，句式复杂。全部是意识流和回忆，没有情节驱动。需要读者喜欢语言本身胜过故事。",
  readingPrerequisites: "建议有文学阅读经验。",
  readingAdvice: "把它当作一首长诗来读。不要追问然后呢——问现在是什么感受。",
  beginnerEntry: false,
});

add("聚会", "The Gathering", "安妮·恩赖特", "爱尔兰", 2007, "小说", "文学小说", 3, false, ["modernism"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "一个爱尔兰妇女在哥哥自杀后开始追溯家族三代人的秘密。",
  whyClassic: "2007年布克奖获奖作品。恩赖特以尖锐而幽默的笔触书写家庭创伤和记忆。叙事碎片化，语言精准。",
  whyRead: "主角的内心声音非常独特——她愤怒、刻薄、悲伤但又充满爱。小说不是线形讲述，而是像记忆本身一样跳跃。",
  suitableFor: "适合喜欢心理深度和独特叙事声音的读者。",
  notSuitableFor: "碎片化叙事不适合追求传统故事的读者。格调整体暗沉。",
  difficultyLevel: 3,
  difficultyReason: "碎片化叙事，时间在现在和过去之间跳跃。需要读者自己拼凑完整图景。语言本身不晦涩。",
  readingPrerequisites: "不需要。",
  readingAdvice: "接受碎片化——记忆本身就是不连贯的。故事会慢慢自己组装起来。",
  beginnerEntry: false,
});

add("狼厅", "Wolf Hall", "希拉里·曼特尔", "英国", 2009, "小说", "历史小说", 3, false, ["realism"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读耐心的读者",
  oneSentencePositioning: "克伦威尔——一个铁匠的儿子如何成为亨利八世最有权力的臣僚。",
  whyClassic: "2009年布克奖获奖作品，曼特尔是首位两度获得布克奖的女作家。她以'现在时'写历史小说，让读者身临其境地走进都铎王朝。",
  whyRead: "它不是传统的历史小说——曼特尔用现在时态写作，让读者感觉事件正在眼前发生。克伦威尔不是通常意义上的英雄，但他的智慧和生存能力令人着迷。",
  suitableFor: "适合对英国历史有兴趣的读者。喜欢政治权谋和人物传记的人。",
  notSuitableFor: "篇幅较长（约650页），人物众多（有家族谱系图）。需要一定的阅读投入。",
  difficultyLevel: 3,
  difficultyReason: "语言不晦涩，但曼特尔用'他'来指代克伦威尔（即使在同一段落中有其他男性角色时），需要读者保持注意力来区分指代。",
  readingPrerequisites: "对都铎王朝和亨利八世的基本历史了解有帮助。书前有人物列表，可随时参考。",
  readingAdvice: "书前的人物列表是你的好朋友。曼特尔用'他'指代克伦威尔，注意上下文来判断谁是谁。",
  beginnerEntry: false,
});

add("提堂", "Bring Up the Bodies", "希拉里·曼特尔", "英国", 2012, "小说", "历史小说", 3, false, ["realism"], {
  roleInPath: "CORE", suitability: "适合已读完《狼厅》的读者",
  oneSentencePositioning: "安妮·博林的垮台——通过克伦威尔的眼睛。",
  whyClassic: "2012年布克奖获奖作品，曼特尔凭同一三部曲中的两部先后获奖。比《狼厅》节奏更快，事件更集中。",
  whyRead: "紧凑地聚焦于安妮·博林失宠的几个月。读者知道结局，但曼特尔让你通过克伦威尔的视角见证这个'必然'的悲剧如何一步步实施。",
  suitableFor: "建议先读《狼厅》。对都铎王朝和宫廷阴谋有兴趣的人。",
  notSuitableFor: "不适合没读过《狼厅》的读者——直接读这部会缺上下文。",
  difficultyLevel: 3,
  difficultyReason: "同《狼厅》的写作风格。篇幅比《狼厅》短（约400页），事件更集中。",
  readingPrerequisites: "必须先读《狼厅》。",
  readingAdvice: "注意曼特尔如何处理一个'已知结局'的故事——知道安妮会死，但读的时候仍然感到紧张。",
  beginnerEntry: false,
});

add("发光体", "The Luminaries", "埃莉诺·卡顿", "新西兰", 2013, "小说", "历史小说", 4, false, ["postmodernism"], {
  roleInPath: "ADVANCED", suitability: "适合有丰富阅读经验和耐心的读者",
  oneSentencePositioning: "1866年新西兰淘金热，12个男人在一家酒店里讲述一个复杂的秘密。",
  whyClassic: "2013年布克奖获奖作品，卡顿以28岁成为史上最年轻的布克奖得主。832页的巨著以星象图为结构，每一章篇幅递减。",
  whyRead: "结构本身就是一个壮举——开篇第一章占全书三分之一，之后每章长度减半，最后只剩一句话。它是维多利亚小说和实验叙事的结合体。",
  suitableFor: "适合喜欢挑战性阅读的读者。对维多利亚小说和实验结构都有兴趣的人。",
  notSuitableFor: "篇幅极长（832页），开头第一章就占了近300页。需要极大的阅读耐心。",
  difficultyLevel: 4,
  difficultyReason: "篇幅是主要门槛。开篇第一章密度极高，12个角色同时出场。星象图结构需要读者理解作者的意图。语言模仿19世纪风格。",
  readingPrerequisites: "建议有阅读维多利亚小说的经验。",
  readingAdvice: "第一章是最大的挑战——熬过去后面会越来越快（因为章节越来越短）。利用书前的人物列表。",
  beginnerEntry: false,
});

add("林肯在中阴界", "Lincoln in the Bardo", "乔治·桑德斯", "美国", 2017, "小说", "实验小说", 3, false, ["postmodernism"], {
  roleInPath: "CORE", suitability: "适合对实验叙事有兴趣的读者",
  oneSentencePositioning: "林肯总统在儿子葬礼当夜进入墓地，亡灵们围绕着他讨论生死。",
  whyClassic: "2017年布克奖获奖作品。以藏传佛教的'中阴'概念为框架，全部由亡灵们的对话和历史引文构成，形式极为大胆。",
  whyRead: "它由几百个碎片组成——历史文献片段和亡灵们的对话交替出现。一开始像大杂烩，但读到后面会发现这些碎片拼成了一个极其感人的故事。",
  suitableFor: "适合喜欢实验形式的读者。对生死议题有兴趣的人。",
  notSuitableFor: "碎片化形式不适合习惯传统叙事的读者。",
  difficultyLevel: 3,
  difficultyReason: "形式独特——全部由碎片构成，没有传统叙述。但每个碎片本身短小易读。整体阅读体验像是听一个多声部合唱。",
  readingPrerequisites: "不需要。对林肯和美国内战的历史基本了解有助于理解背景。",
  readingAdvice: "刚开始可能觉得乱。接受它——这些亡灵的声音你不需要分辨谁是谁，让它们像音乐一样流过。",
  beginnerEntry: false,
});

// More SF winners
add("海伯利安的陨落", "The Fall of Hyperion", "丹·西蒙斯", "美国", 1990, "小说", "科幻小说", 3, false, ["science-fiction"], {
  roleInPath: "CORE", suitability: "适合已有科幻阅读经验的读者",
  oneSentencePositioning: "朝圣者们到达时间之墓，发现他们的故事远比想象的更加交织。",
  whyClassic: "1991年雨果奖获奖作品。《海伯利安》系列的终章（四部曲的第二部），以乔叟《坎特伯雷故事集》为结构框架，将太空歌剧提升到文学层面。",
  whyRead: "每一段朝圣者的故事都是不同科幻风格的杰作——有的像战争史诗，有的像AI哲学，有的像爱情悲剧。它证明了科幻可以是伟大的文学。",
  suitableFor: "适合喜欢太空歌剧和复杂世界建构的读者。",
  notSuitableFor: "建议先读第一部《海伯利安》。对纯文学科幻有兴趣的人更合适。",
  difficultyLevel: 3,
  difficultyReason: "复杂的宇宙架构和多时间线叙事。故事套故事的'坎特伯雷'结构。",
  readingPrerequisites: "建议先读《海伯利安》第一部。",
  readingAdvice: "这部是四部曲的第二部，必须先读第一部。",
  beginnerEntry: false,
});

// More Chinese winners
add("生命册", "生命册", "李佩甫", "中国", 2012, "小说", "现实主义小说", 2, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合作为中国当代文学入口",
  oneSentencePositioning: "一个从农村走出来的知识分子的灵魂自省。",
  whyClassic: "2015年茅盾文学奖获奖作品。以一个人在城乡之间的挣扎，书写了中国城市化进程中一代人的精神史。",
  whyRead: "它不是简单的'农村人进城'故事——主角的内心冲突远比这复杂。小说结构独特，以'忏悔录'的形式展开。",
  suitableFor: "适合对中国城市化和社会变迁有兴趣的读者。",
  notSuitableFor: "叙事节奏较慢，心理描写多。",
  difficultyLevel: 2,
  difficultyReason: "语言流畅，叙事以第一人称展开，亲切自然。",
  readingPrerequisites: "不需要。",
  readingAdvice: "主角的自我剖析是理解小说的关键——注意他对自己动机的不停追问。",
  beginnerEntry: true,
});

add("湖光山色", "湖光山色", "周大新", "中国", 2006, "小说", "现实主义小说", 2, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合作为中国当代文学入口",
  oneSentencePositioning: "一个乡村女性在旅游开发浪潮中的命运起伏。",
  whyClassic: "2008年茅盾文学奖获奖作品。以丹江口水库边的乡村为背景，写中国农村在现代化冲击下的变迁。",
  whyRead: "主角暖暖是近年来中国文学中令人印象深刻的女性形象之一。她不是被动的受害者，而是在时代浪潮中主动选择自己的路。",
  suitableFor: "适合对中国农村变迁有兴趣的读者。",
  notSuitableFor: "节奏较慢。",
  difficultyLevel: 2,
  difficultyReason: "语言平实，叙事流畅，人物关系清楚。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意主角暖暖的选择——她在每一个节点都有主动的判断，不是被时代推着走。",
  beginnerEntry: true,
});

fs.writeFileSync("lib/bookpath-data.ts", bpRaw.slice(0, oStart) + JSON.stringify(data, null, 2) + bpRaw.slice(jEnd), "utf-8");
console.log("\nDone!");
