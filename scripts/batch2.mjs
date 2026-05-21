// Batch 2: More Booker winners
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

add("弗农·上帝·利特尔", "Vernon God Little", "D.B.C.皮埃尔", "澳大利亚", 2003, "小说", "文学小说", 2, true, ["postmodernism"], {
  roleInPath: "ENTRY", suitability: "适合作为后现代小说入门",
  oneSentencePositioning: "一个德州少年被指控屠杀同学，他的故事被媒体和互联网变得面目全非。",
  whyClassic: "2003年布克奖获奖作品。以一个少年犯的视角讽刺媒体审判和互联网时代的真相扭曲。",
  whyRead: "主角弗农是个无知但不可恶的少年，他的声音非常真实。小说对媒体狂欢的讽刺在今天看来尤其精准。",
  suitableFor: "适合喜欢黑色幽默的读者。对媒体批判有兴趣的人。",
  notSuitableFor: "部分场景粗俗。",
  difficultyLevel: 2,
  difficultyReason: "语言口语化，叙事节奏快，充满少年俚语和黑色幽默。情节驱动。",
  readingPrerequisites: "不需要。",
  readingAdvice: "主角弗农的声音就是小说最大的亮点——听他说话比关注情节更重要。",
  beginnerEntry: true,
});

add("最后的命令", "Last Orders", "格雷厄姆·斯威夫特", "英国", 1996, "小说", "文学小说", 3, false, ["modernism"], {
  roleInPath: "CORE", suitability: "适合已建立阅读习惯的读者",
  oneSentencePositioning: "四个老友带着一个死者的骨灰去海边，一路上回忆交织。",
  whyClassic: "1996年布克奖获奖作品。受福克纳《我弥留之际》启发，用多视角叙事串起一个普通人一生的重量。",
  whyRead: "叙事在现在和过去之间自然切换。每个角色都有自己的视角和秘密，拼在一起才是一个完整的人。",
  suitableFor: "适合喜欢多视角叙事的读者。",
  notSuitableFor: "节奏较慢，没有强情节驱动。",
  difficultyLevel: 3,
  difficultyReason: "多视角叙事需要跟踪不同角色的声音。时间线跳跃。但每个片段的叙事本身清晰。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意每个角色的叙述风格不同。",
  beginnerEntry: false,
});

add("G.", "G.", "约翰·伯格", "英国", 1972, "小说", "实验小说", 4, false, ["postmodernism"], {
  roleInPath: "ADVANCED", suitability: "适合有丰富文学阅读经验的读者",
  oneSentencePositioning: "一个唐璜式男人在20世纪初欧洲的冒险——但小说不断停下来质问它自己。",
  whyClassic: "1972年布克奖获奖作品。伯格是最重要的艺术评论家之一，他的小说是对讲故事本身的反思。",
  whyRead: "叙述者经常跳出故事评论自己写的东西。读者不是在读故事，而是在看一个作家如何构建故事。",
  suitableFor: "适合对元小说、现代主义实验有兴趣的读者。",
  notSuitableFor: "大部分读者会感到困惑。不适合作为实验小说的起点。",
  difficultyLevel: 4,
  difficultyReason: "叙事不断被打破，没有传统情节推进。需要了解现代主义文学惯例。",
  readingPrerequisites: "建议先读过几部现代主义或后现代主义作品。",
  readingAdvice: "把它当成一个艺术家在展示创作过程，而不是一部传统小说。",
  beginnerEntry: false,
});

add("大海大海", "The Sea, the Sea", "艾瑞斯·默多克", "英国", 1978, "小说", "文学小说", 3, false, ["realism"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "一位退休戏剧导演隐居海边，以为找到了失散多年的初恋——但现实不是他写的剧本。",
  whyClassic: "1978年布克奖获奖作品。默多克是20世纪英国最重要的哲学小说家之一，这部小说探讨了自欺、执念和控制的欲望。",
  whyRead: "主角是一个控制狂——他导演了一辈子戏剧，以为也可以导演自己的人生。当他发现他无法控制他人时，故事变得既悲剧又讽刺。",
  suitableFor: "适合喜欢心理深度和角色驱动的叙事、对人际关系哲学有兴趣的读者。",
  notSuitableFor: "篇幅较长（约500页），叙事节奏慢。",
  difficultyLevel: 3,
  difficultyReason: "传统叙事结构，语言清晰。但主角的视角不可靠——读者需要自己判断事实。篇幅偏长。",
  readingPrerequisites: "不需要。",
  readingAdvice: "主角查尔斯是个不可靠叙述者——他说的每一件好事你都要怀疑。",
  beginnerEntry: false,
});

add("启蒙之旅", "Rites of Passage", "威廉·戈尔丁", "英国", 1980, "小说", "文学小说", 3, false, ["modernism"], {
  roleInPath: "CORE", suitability: "适合已建立阅读习惯的读者",
  oneSentencePositioning: "19世纪初，一个年轻贵族在驶往澳大利亚的船上经历了社会等级的残酷启蒙。",
  whyClassic: "1980年布克奖获奖作品。《蝇王》作者戈尔丁的另一部力作，以航海日记的形式写了一部关于权力和阶级的寓言。",
  whyRead: "狭小的船舱成了社会的缩影——上等人和下等人之间的鸿沟在海上被放大到极致。日记体的叙事让读者通过主角的眼睛逐渐发现真相。",
  suitableFor: "适合喜欢寓言式叙事和对社会等级有兴趣的读者。",
  notSuitableFor: "时代语言（19世纪英语风格）可能让部分读者觉得隔膜。",
  difficultyLevel: 3,
  difficultyReason: "日记体叙事，语言模仿19世纪风格。故事有清晰的推进线。主题是寓言式的，但表层叙事不难理解。篇幅短（约200页）。",
  readingPrerequisites: "对19世纪英国海军和社会阶层的基本了解有帮助。",
  readingAdvice: "注意主角的成长——标题'rites of passage'指的是成人仪式，小说本身就是一个人的精神成人礼。",
  beginnerEntry: false,
});

add("热与尘", "Heat and Dust", "露丝·贾布瓦拉", "英国/德国", 1975, "小说", "文学小说", 2, true, ["postcolonial"], {
  roleInPath: "ENTRY", suitability: "适合作为后殖民文学入门",
  oneSentencePositioning: "一个英国女人在印度探寻婆婆六十年前的往事——两段跨越时空的跨文化恋情。",
  whyClassic: "1975年布克奖获奖作品。以双线叙事连接1920年代和1970年代的印度，探讨英国殖民者在印度消失后留下的文化痕迹。",
  whyRead: "两条叙事线交替推进，相互映照。它不是宏大的殖民批判，而是通过私人的情感选择来展现文化冲突。篇幅短，故事性强。",
  suitableFor: "适合对跨文化故事有兴趣的读者。喜欢双线叙事的读者会享受。",
  notSuitableFor: "对殖民议题有强烈立场期待的读者可能会觉得不够政治。",
  difficultyLevel: 2,
  difficultyReason: "双线叙事清晰，语言流畅。故事驱动，有人物有情节。篇幅短（约180页）。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意两个时代之间的相似和差异——作者刻意让两段故事平行展开。",
  beginnerEntry: true,
});

add("自由国度", "In a Free State", "V.S.奈保尔", "英国/特立尼达", 1971, "小说", "文学小说", 3, false, ["postcolonial"], {
  roleInPath: "CORE", suitability: "适合已建立阅读习惯的读者",
  oneSentencePositioning: "一个印度裔英国人在后殖民非洲的公路上旅行，发现自己既不属于殖民者也不属于被殖民者。",
  whyClassic: "1971年布克奖获奖作品。奈保尔是诺贝尔文学奖得主，这部小说集包含一个中篇和多个短篇，主题是流散和身份。",
  whyRead: "标题本身就是一个讽刺——'自由国度'里没有人是自由的。奈保尔以冷峻的笔触描写了那些在帝国瓦解后无处归属的人。",
  suitableFor: "适合对身份政治和后殖民议题有兴趣的读者。喜欢精炼、克制冷峻文笔的人。",
  notSuitableFor: "格调冷峻疏离，不适合期望温暖故事的读者。",
  difficultyLevel: 3,
  difficultyReason: "奈保尔的文笔精确冷峻，需要读者适应。书中包含多个独立故事，结构不传统。主题需要一定的历史理解。",
  readingPrerequisites: "对二战后非洲非殖民化历史的基本了解有帮助。",
  readingAdvice: "注意奈保尔的观察方式——他不评判，只呈现。冷酷本身就是他的立场。",
  beginnerEntry: false,
});

fs.writeFileSync("lib/bookpath-data.ts", bpRaw.slice(0, oStart) + JSON.stringify(data, null, 2) + bpRaw.slice(jEnd), "utf-8");
console.log("\nDone!");
