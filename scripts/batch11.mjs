// Batch 11: More missing works
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

add("杀死一只知更鸟", "To Kill a Mockingbird", "哈珀·李", "美国", 1960, "小说", "文学小说", 1, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "美国南方小镇上，一个律师为黑人辩护——通过一个8岁女孩的眼睛。",
  whyClassic: "普利策小说奖获奖作品。美国文学中被阅读最多的小说之一，也是关于种族正义最常被引用的文学作品。",
  whyRead: "从孩子的视角写种族歧视和正义，让最复杂的问题变得清澈。阿提克斯·芬奇是文学史上最受尊敬的英雄之一。",
  suitableFor: "适合所有读者，包括青少年。",
  notSuitableFor: "没有。",
  difficultyLevel: 1,
  difficultyReason: "从8岁女孩斯库特的第一人称视角叙述，语言简单而温暖。情节清楚，善恶分明。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意孩子的视角——斯库特不理解很多她看到的事情，但读者理解。这种'知道的差距'是小说力量的核心。",
  beginnerEntry: true,
});

add("麦田里的守望者", "The Catcher in the Rye", "J.D.塞林格", "美国", 1951, "小说", "成长小说", 2, true, ["modernism"], {
  roleInPath: "ENTRY", suitability: "适合所有读者，尤其是年轻人",
  oneSentencePositioning: "一个被退学的16岁少年在纽约流浪了三天——他对一切都很不爽。",
  whyClassic: "战后美国文学最具影响力的小说之一。霍尔顿·考尔菲德的声音——愤怒、天真、迷茫——成为一代又一代青少年的代言人。",
  whyRead: "它不是情节驱动的故事，而是'一个声音'。霍尔顿说的每一句话都是他——你会喜欢他、烦他、理解他。",
  suitableFor: "适合所有读者。青春期或怀念青春期的人。",
  notSuitableFor: "语言粗俗（大量脏话），对部分读者可能有冒犯。",
  difficultyLevel: 2,
  difficultyReason: "口语化第一人称叙事，语言就是少年说话的方式。没有复杂结构。篇幅适中（约250页）。",
  readingPrerequisites: "不需要。",
  readingAdvice: "霍尔顿说的每一句话都是霍尔顿——他不是作者的传声筒，他是一个真实的、矛盾的、正在长大的孩子。",
  beginnerEntry: true,
});

add("第二十二条军规", "Catch-22", "约瑟夫·海勒", "美国", 1961, "小说", "黑色幽默", 3, false, ["postmodernism"], {
  roleInPath: "CORE", suitability: "适合对黑色幽默有兴趣的读者",
  oneSentencePositioning: "二战期间，一个轰炸机飞行员想证明自己疯了以便停飞——但'第二十二条军规'说：你能证明自己疯了就说明你没疯。",
  whyClassic: "黑色幽默的巅峰之作。'第二十二条军规'已经进入英语语言——用来描述任何让你无法逃脱的荒谬困境。",
  whyRead: "它的叙事像绕口令一样重复循环，每一章从不同角度讲同一件事。不是线形故事，而是像一架失控的旋转木马。",
  suitableFor: "适合喜欢荒诞幽默的读者。对战争和官僚体制的讽刺有兴趣的人。",
  notSuitableFor: "非线形的重复叙事可能让习惯传统结构的读者沮丧。",
  difficultyLevel: 3,
  difficultyReason: "叙事结构独特——非线形、循环重复、同一事件从不同角色视角反复讲述。需要适应这种'卡农'式的叙事。",
  readingPrerequisites: "不需要。",
  readingAdvice: "如果前十页觉得困惑，正常。这部小说不是用来'按照顺序理解'的——它是用来感受的。读到后面前面会亮起来。",
  beginnerEntry: false,
});

add("达洛维夫人", "Mrs Dalloway", "弗吉尼亚·伍尔夫", "英国", 1925, "小说", "意识流小说", 3, false, ["modernism"], {
  roleInPath: "CORE", suitability: "适合对现代主义文学有兴趣的读者",
  oneSentencePositioning: "一个上流社会女性在一天内为晚宴做准备——同时，一个退伍军人在同一条街上走向自杀。",
  whyClassic: "伍尔夫最完美的意识流作品之一。一天之内，两个人的内心世界——他们从未相遇，但他们的命运在伦敦的街道上交错。",
  whyRead: "不是传统意义上的'故事'——它更接近诗歌。你进入的不是情节，是人的意识。时间在一个瞬间里无限膨胀。",
  suitableFor: "适合喜欢内心独白和心理描写的读者。对意识流技巧有兴趣的人。",
  notSuitableFor: "几乎没有外部事件。全部是内心意识流动。",
  difficultyLevel: 3,
  difficultyReason: "意识流写作需要读者适应'思绪跳跃'的叙事方式。没有传统的情节线。时间在一天之内但内容跨越数十年。",
  readingPrerequisites: "建议先读一些传统小说建立阅读基础后再进入意识流。",
  readingAdvice: "不需要每一句都'理解'。让思绪像河水一样流过你，感受它的节奏和温度。",
  beginnerEntry: false,
});

add("到灯塔去", "To the Lighthouse", "弗吉尼亚·伍尔夫", "英国", 1927, "小说", "意识流小说", 3, false, ["modernism"], {
  roleInPath: "CORE", suitability: "适合对现代主义文学有兴趣的读者",
  oneSentencePositioning: "一个家庭在苏格兰度假屋的夏日——以及十年后重返时的物是人非。",
  whyClassic: "伍尔夫最受评论家推崇的作品。它的第二部分'时光流逝'是英语文学中最优美的段落之一——只用十几页就写完了十年和一次世界大战。",
  whyRead: "它关于时间、失去和艺术如何对抗失去。核心不是'发生了什么'，而是'每个人的感受是什么'。",
  suitableFor: "适合喜欢诗意语言和心理描写的读者。",
  notSuitableFor: "几乎没有情节，全部是人物内心。",
  difficultyLevel: 3,
  difficultyReason: "同《达洛维夫人》——意识流。三个部分的时间跨度不同（一天、十年、一天）。需要读者适应情绪和视角的切换。",
  readingPrerequisites: "建议先读一些传统小说。",
  readingAdvice: "第二部分只有十几页——读慢一点，它可能是全书最美的地方。",
  beginnerEntry: false,
});

add("尤利西斯", "Ulysses", "詹姆斯·乔伊斯", "爱尔兰", 1922, "小说", "意识流小说", 5, false, ["modernism"], {
  roleInPath: "ADVANCED", suitability: "仅适合有极丰富阅读经验的读者",
  oneSentencePositioning: "1904年6月16日一天之内，三个都柏林人的漫游——对应奥德修斯的旅程。",
  whyClassic: "现代主义文学的巅峰之作。它被一些人认为是有史以来最伟大的英文小说，也被另一些人认为是完全读不懂的天书。",
  whyRead: "它重新定义了小说可以是什么。18章用了18种不同的文体——从新闻标题到戏剧剧本到女性独白到无标点意识流。最后一章莫莉的独白是文学史上最大胆的段落之一。",
  suitableFor: "适合有大量现代主义阅读经验的读者。",
  notSuitableFor: "大多数人读不完。需要投入的时间和研究远超大部分人的意愿。",
  difficultyLevel: 5,
  difficultyReason: "多种文体、大量典故（不只是荷马史诗，还有都柏林当地情况、天主教仪式、爱尔兰历史）、无标点段落。需要注释和辅助读物。",
  readingPrerequisites: "建议读过《都柏林人》和《青年艺术家的肖像》来适应乔伊斯的风格。准备一本注释。",
  readingAdvice: "不要试图'理解'每一句。像听音乐一样让它流过你。第一次读完的感受比'理解'更重要。",
  beginnerEntry: false,
});

add("都柏林人", "Dubliners", "詹姆斯·乔伊斯", "爱尔兰", 1914, "小说", "短篇小说集", 2, true, ["modernism"], {
  roleInPath: "ENTRY", suitability: "适合作为现代主义入门",
  oneSentencePositioning: "15个短篇，描绘20世纪初都柏林人的日常生活——以及他们无法逃脱的瘫痪。",
  whyClassic: "乔伊斯最'好读'的作品。每一篇都是现实主义杰作。最后一篇《死者》被公认为英语短篇小说的巅峰。",
  whyRead: "不像《尤利西斯》那样难——这些短篇是'正常'的叙事。但乔伊斯已经在这里展示了他洞察人心的能力：每一篇都击中一个隐秘的真相。",
  suitableFor: "适合所有读者。是进入乔伊斯和现代主义的最佳起点。",
  notSuitableFor: "没有。",
  difficultyLevel: 2,
  difficultyReason: "传统现实主义叙事，语言清晰。每篇独立，不需要连贯阅读。",
  readingPrerequisites: "不需要。",
  readingAdvice: "最后一篇《死者》放到最后读——它是最好的。电影《死者》也是约翰·休斯顿最好的作品之一。",
  beginnerEntry: true,
});

add("太阳照常升起", "The Sun Also Rises", "海明威", "美国", 1926, "小说", "文学小说", 2, true, ["modernism"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "一战后一群迷惘的英美年轻人在巴黎喝酒、去西班牙看奔牛节——试图找到活下去的理由。",
  whyClassic: "海明威的成名作，'迷惘的一代'的命名来源。海明威招牌式的'硬汉风格'在这部小说里就已经完全成熟。",
  whyRead: "它的语言像冰水一样干净。但在这些简洁的句子下面，是一个男人无法愈合的战争创伤——他身体上的伤对应着精神上的空洞。",
  suitableFor: "适合所有读者。对'迷惘的一代'和1920年代巴黎文化有兴趣的人。",
  notSuitableFor: "没有。",
  difficultyLevel: 2,
  difficultyReason: "海明威的语言标志性简洁。对话驱动，叙事节奏快。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意海明威没写出来的部分——主角杰克·巴恩斯的战争伤在小说里几乎不提，但不说出的东西才是重点。",
  beginnerEntry: true,
});

add("永别了，武器", "A Farewell to Arms", "海明威", "美国", 1929, "小说", "战争小说", 2, true, ["modernism"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "一战期间，一个美国救护车司机和英国护士相爱——战争最终拿走了他们的一切。",
  whyClassic: "海明威最著名的战争小说。它不只是关于战争，更是关于人在面对巨大loss时的反应。",
  whyRead: "开头和结尾——开头写士兵在雨中走过，结尾是医院走廊——是海明威最经典的'冰山'技法。",
  suitableFor: "适合所有读者。",
  notSuitableFor: "结局极其悲伤。",
  difficultyLevel: 2,
  difficultyReason: "清晰的第一人称叙事。语言简洁。情节线明确：相遇→相爱→逃离→结局。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意雨——小说从雨开始，在雨中结束。海明威用天气代替了很多情感表达。",
  beginnerEntry: true,
});

add("喧哗与骚动", "The Sound and the Fury", "威廉·福克纳", "美国", 1929, "小说", "意识流小说", 5, false, ["modernism"], {
  roleInPath: "ADVANCED", suitability: "仅适合有极丰富阅读经验的读者",
  oneSentencePositioning: "一个南方家族的没落——由四个不同的叙述者讲述，包括一个智障者。",
  whyClassic: "福克纳最重要的作品之一。开篇从智障者班吉的视角叙述——没有时间顺序、没有逻辑关联，全是感官片断。",
  whyRead: "第一部分的挑战最大（班吉的视角），但它是文学史上最勇敢的叙事实验之一。四个视角的差异本身就是小说的主题——同一个故事不同的人看到完全不同的东西。",
  suitableFor: "适合有大量现代主义阅读经验的读者。",
  notSuitableFor: "第一部分对大多数读者来说极其困难。",
  difficultyLevel: 5,
  difficultyReason: "第一部分班吉的视角完全没有时间标记。第二部分昆丁的意识流同样复杂。需要极大的耐心和反复阅读。",
  readingPrerequisites: "建议先读福克纳相对简单的作品（如《我弥留之际》）。",
  readingAdvice: "第一部分可以快速读过，不需要理解每一句。从第二部分开始会清晰很多，读完再回头重读第一部分。",
  beginnerEntry: false,
});

fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
console.log("\nDone!");
