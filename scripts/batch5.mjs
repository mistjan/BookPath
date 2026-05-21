// Batch 5: More missing works
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

// Nobel laureates missing from library
add("雪国", "雪国", "川端康成", "日本", 1948, "小说", "文学小说", 2, true, ["modernism"], {
  roleInPath: "ENTRY", suitability: "适合作为日本文学入口",
  oneSentencePositioning: "一个东京男人在雪国温泉旅馆与两个女人的情感纠葛。",
  whyClassic: "川端康成诺贝尔奖代表作。以极简的笔触写尽了日本之美——雪、镜、灯火、女人的肌肤。每一页都像一幅水墨画。",
  whyRead: "篇幅极短（不到200页），但意境深远。川端写人物不用心理描写，而是通过季节、光影和动作来暗示内心。",
  suitableFor: "适合喜欢日本美学和含蓄叙事的读者。",
  notSuitableFor: "叙事极淡，几乎没有情节，不适合追求故事性的读者。",
  difficultyLevel: 2,
  difficultyReason: "篇幅短，语言简洁。但叙事需要读者感受而非理解，'什么都没说但又说了一切'的风格可能让习惯情节驱动的读者不适应。",
  readingPrerequisites: "不需要。",
  readingAdvice: "不要追问'然后呢'——感受每一页的氛围。雪、镜、火、女人的触感就是全部。",
  beginnerEntry: true,
});

add("古都", "古都", "川端康成", "日本", 1962, "小说", "文学小说", 2, true, ["modernism"], {
  roleInPath: "ENTRY", suitability: "适合作为日本文学入口",
  oneSentencePositioning: "京都一对双胞胎姐妹出生时被分离，多年后在古城樱花下重逢。",
  whyClassic: "川端康成获诺贝尔奖时被提及的作品之一。以京都四季为背景，写血缘、身份和传统日本的消逝。",
  whyRead: "比《雪国》更温暖。京都的古寺、祭典、和服、樱花不只是背景——它们是故事的一部分。",
  suitableFor: "适合喜欢日本文化的读者。比《雪国》更容易进入。",
  notSuitableFor: "节奏慢。",
  difficultyLevel: 2,
  difficultyReason: "语言清晰，叙事线简单（姐妹寻亲）。",
  readingPrerequisites: "不需要。",
  readingAdvice: "当作京都游记来读——古都本身就是主角之一。",
  beginnerEntry: true,
});

add("金阁寺", "金阁寺", "三岛由纪夫", "日本", 1956, "小说", "文学小说", 3, false, ["modernism"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "一个口吃的年轻僧侣被金阁寺的美折磨到无法忍受，决定烧掉它。",
  whyClassic: "基于真实事件（1950年金阁寺纵火案），三岛由纪夫以极致的心理描写探讨了美与毁灭的关系。日本文学史上最重要的作品之一。",
  whyRead: "它不是犯罪纪实，而是一个哲学寓言——如果美让人无法自由生活，摧毁美是不是一种解放？主角的内心世界令人不安又着迷。",
  suitableFor: "适合喜欢心理深度和哲学主题的读者。对日本美学和生死观有兴趣的人。",
  notSuitableFor: "主角的心理状态黑暗且极端，不适合寻求温暖读物的读者。",
  difficultyLevel: 3,
  difficultyReason: "三岛的写作风格是精密的、哲理性的，句式长且复杂。主角的心理活动密度极高，需要读者持续投入注意力。",
  readingPrerequisites: "不需要。对日本传统美学（如'物哀'）有一些了解会帮助理解。",
  readingAdvice: "金阁寺在小说里不是一个建筑，而是一个'观念'。理解这一点就读懂了全书。",
  beginnerEntry: false,
});

add("假面的告白", "假面的告白", "三岛由纪夫", "日本", 1949, "小说", "文学小说", 3, false, ["modernism"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "一个年轻人对自己真实欲望的艰难告白——在一个不允许他做自己的时代。",
  whyClassic: "三岛由纪夫的成名作，带有强烈的自传色彩。它坦诚地探索了同性恋欲望在一个压抑社会中的表达，以及'扮演正常人'的心理代价。",
  whyRead: "它不是忏悔录，而是对'假面'的精密分析——我们戴着的面具和面具下的脸，哪个才是真实的？",
  suitableFor: "适合对身份认同、性别议题有兴趣的读者。",
  notSuitableFor: "对同性恋题材不适应的读者。",
  difficultyLevel: 3,
  difficultyReason: "三岛的语言精密而繁复。主题沉重，需要读者有一定的心理承受力。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意三岛如何描述'假面'——他不仅是在说性取向，也是在说每个人在社会中的表演。",
  beginnerEntry: false,
});

add("挪威的森林", "Norwegian Wood", "村上春树", "日本", 1987, "小说", "文学小说", 2, true, ["postmodernism"], {
  roleInPath: "ENTRY", suitability: "适合作为村上春树入门",
  oneSentencePositioning: "一个大学生在1960年代东京的两个女孩之间摇摆，同时面对好友自杀的创伤。",
  whyClassic: "村上春树最接近现实主义的一部作品，也是他最畅销的小说。它让整整一代亚洲年轻人认识村上春树，也是日本文学走向世界的标志性作品。",
  whyRead: "比村上的其他作品更'正常'——没有会说话的猫、没有下到井底的神奇旅行。但它有村上独特的氛围：孤独、爵士乐、啤酒和青春期的无力感。",
  suitableFor: "适合所有层次的读者，尤其是年轻人。青春期和初恋的题材容易引发共鸣。",
  notSuitableFor: "自杀和精神疾病等沉重话题贯穿全书。",
  difficultyLevel: 2,
  difficultyReason: "叙事是线性回忆，语言流畅平实，没有复杂结构。情感深度自然浮现，不需要额外知识。",
  readingPrerequisites: "不需要。",
  readingAdvice: "这是村上最不一样的作品。如果你喜欢这部再试他的其他小说——会发现完全不同的世界。",
  beginnerEntry: true,
});

add("且听风吟", "Hear the Wind Sing", "村上春树", "日本", 1979, "小说", "文学小说", 2, true, ["postmodernism"], {
  roleInPath: "ENTRY", suitability: "适合作为村上春树入门",
  oneSentencePositioning: "一个大学生在1970年代神户的夏日碎片——喝啤酒、听爵士、和一个缺小指的女孩聊天。",
  whyClassic: "村上春树的处女作，获群像新人奖，从此开启了他的写作生涯。它确立了村上的风格：极简、疏离、充满流行文化引用。",
  whyRead: "非常薄（中文版不到100页），1-2小时就能读完。但它已经包含了村上后来所有小说的DNA——孤独的男主角、消失的女人、爵士乐、啤酒、猫。",
  suitableFor: "适合想了解村上春树起点的人。碎片时间友好。",
  notSuitableFor: "几乎没有情节，不追求故事性。",
  difficultyLevel: 2,
  difficultyReason: "篇幅极短，叙事碎片化但每一段本身清楚。语言简洁。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意到它的碎片感是刻意为之的——村上在模仿他当时喜欢的美国硬汉小说风格。",
  beginnerEntry: true,
});

add("海边的卡夫卡", "Kafka on the Shore", "村上春树", "日本", 2002, "小说", "魔幻现实主义", 3, false, ["postmodernism", "magical-realism"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读经验的读者",
  oneSentencePositioning: "一个离家出走的少年和一个能与猫对话的老人在两个平行的世界中寻找命运的交点。",
  whyClassic: "村上春树最具代表性的作品之一，两条看似无关的叙事线最终精密地交织在一起。它包含了村上宇宙的全部元素：猫、鱼、音乐、隐喻和超现实。",
  whyRead: "一条线是15岁少年卡夫卡的出走，一条线是老人中田的流浪。两条线各自精彩，在终点不可思议地交汇。它既是成长小说，也是超现实冒险。",
  suitableFor: "适合已经熟悉村上风格或愿意接受超现实设定的读者。",
  notSuitableFor: "超现实元素（鱼从天上掉下来、与猫对话）可能让部分读者觉得荒诞。",
  difficultyLevel: 3,
  difficultyReason: "双线叙事、超现实设定、大量的隐喻和文学引用（卡夫卡、希腊神话）。需要读者接受'不解释'的叙事态度。",
  readingPrerequisites: "不需要。读过一些村上的作品会更容易进入他的世界观。",
  readingAdvice: "两条线交替读，不要跳着只看一条。接受那些'不解释'的超现实事件——它们不需要有现实解释。",
  beginnerEntry: false,
});

add("我是猫", "我是猫", "夏目漱石", "日本", 1905, "小说", "讽刺小说", 2, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合作为日本近代文学入口",
  oneSentencePositioning: "一只猫用他的眼睛观察主人和朋友们——一群自命不凡的知识分子的日常生活。",
  whyClassic: "夏目漱石的处女作，日本近代文学最经典的作品之一。以猫的视角讽刺日本明治时期的知识分子，幽默而犀利。",
  whyRead: "叙述者是一只猫——这一设定本身就充满趣味。他鄙视主人又离不开主人，这种复杂关系让人在笑的同时思考人与人的关系。",
  suitableFor: "适合所有层次的读者。喜欢幽默讽刺的读者会特别喜欢。",
  notSuitableFor: "叙事松散，没有核心情节，不适合追求故事驱动的读者。",
  difficultyLevel: 2,
  difficultyReason: "语言流畅幽默，以猫的口吻写就，亲切自然。需要一点耐心接受'没有情节'的散文式叙事。",
  readingPrerequisites: "不需要。",
  readingAdvice: "不要把它当作小说来读——当作一本猫的日记来读。每一章都是独立的观察随笔。",
  beginnerEntry: true,
});

add("罗生门", "罗生门", "芥川龙之介", "日本", 1915, "小说", "短篇小说", 2, true, ["modernism"], {
  roleInPath: "ENTRY", suitability: "适合作为日本近代文学入口",
  oneSentencePositioning: "一个被主人赶出家门的仆人在罗生门下躲雨，面临'饿死还是做盗贼'的选择。",
  whyClassic: "芥川龙之介是日本短篇小说的巅峰，以其名字命名的'芥川奖'是日本最重要的文学奖。'罗生门'一词已成为'各说各话'的代名词。",
  whyRead: "极短（半小时可读完），但分量极重。一个简单的道德困境被推到极限后，人性的黑暗面暴露无遗。",
  suitableFor: "适合所有读者。短小精悍，适合碎片时间。",
  notSuitableFor: "格调黑暗，不适合寻求轻松读物的读者。",
  difficultyLevel: 2,
  difficultyReason: "篇幅极短，语言直接。主题黑暗但叙事清楚。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意最后一句——它改变了整个故事的意义。",
  beginnerEntry: true,
});

add("人间失格", "人间失格", "太宰治", "日本", 1948, "小说", "文学小说", 3, false, ["modernism"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读经验的读者",
  oneSentencePositioning: "一个认为自己'不配做人'的男人的自我毁灭之路。",
  whyClassic: "太宰治最具自传性的作品，也是他自杀前的绝笔。战后日本文学的代表作，'丧文化'的鼻祖。",
  whyRead: "它让人不安——主角的自我厌恶和自我毁灭没有任何掩饰。但它又让人着迷，因为那种'我不配活着'的感觉比大多数人愿意承认的更普遍。",
  suitableFor: "适合喜欢暗黑心理描写的读者。对日本战后精神和存在主义有兴趣的人。",
  notSuitableFor: "格调极度灰暗，不适合情绪低落时阅读。可能触发自我否定情绪。",
  difficultyLevel: 3,
  difficultyReason: "语言不复杂，但情感强度极高。主角的心理状态黑暗而真实，阅读过程本身是一种情感消耗。",
  readingPrerequisites: "不需要。对日本战后社会氛围有一些了解有助于理解时代背景。",
  readingAdvice: "这是一本需要安全阅读环境的小说。不要一口气读完，留出消化情绪的空间。",
  beginnerEntry: false,
});

fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
console.log("\nDone!");
