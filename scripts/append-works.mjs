// Batch append works to library
// node scripts/append-works.mjs
import fs from "fs";

const bpRaw = fs.readFileSync("lib/bookpath-data.ts", "utf-8");
const jsonStart = bpRaw.indexOf("export const bookPathData = ");
const objStart = bpRaw.indexOf("{", jsonStart);
let depth = 0, jsonEnd = objStart;
for (let i = objStart; i < bpRaw.length; i++) {
  if (bpRaw[i] === "{") depth++;
  else if (bpRaw[i] === "}") { depth--; if (depth === 0) { jsonEnd = i + 1; break; } }
}
const data = JSON.parse(bpRaw.slice(objStart, jsonEnd));

const entries = [];

function add(titleCn, titleOrig, author, country, year, cat, subcat, diff, beginner, movements, guideData) {
  const slug = titleCn.replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
  const id = slug;
  if (data.works.some((w) => w.slug === slug)) {
    console.log(`Skipping ${titleCn}: already exists`);
    return;
  }
  const work = {
    id, slug,
    titleDisplayCn: titleCn,
    titleOriginal: titleOrig,
    authorName: author,
    countryOrRegion: country,
    firstPublishedYear: year,
    literaryCategory: cat,
    literarySubcategory: subcat,
    workType: "长篇小说",
    difficultyLevel: diff,
    beginnerEntry: beginner,
    movementIds: movements,
    guideCardIds: [`guide-${id}`],
  };
  const guide = {
    id: `guide-${id}`,
    workId: id,
    title: titleCn,
    ...guideData,
    aiGenerated: false,
    reviewStatus: "AI_DRAFT",
  };
  data.works.push(work);
  data.guideCards.push(guide);
  console.log(`Added: ${titleCn}`);
}

// ═══ Batch: Booker + Pulitzer winners ═══

add("辛德勒的方舟", "Schindler's Ark", "托马斯·肯尼利", "澳大利亚", 1982,
  "小说", "历史小说", 3, false, ["realism"], {
  roleInPath: "CORE", suitability: "适合已有历史小说阅读经验的读者",
  oneSentencePositioning: "一个纳粹党员利用战争经济发家，又在最后一刻拯救了一千多名犹太人。",
  whyClassic: "1982年布克奖获奖作品，改编为电影《辛德勒的名单》。它是非虚构小说的代表作——基于真实人物，用小说手法组织叙事。",
  whyRead: "它提供了一个理解大屠杀的独特角度：不是从受害者视角，而是从一个机会主义德国商人的视角。故事的核心问题从开头就扣住读者——这个人什么时候会变？",
  suitableFor: "适合对二战历史有兴趣的读者。看过电影再读小说会有更丰富的体验。",
  notSuitableFor: "对大屠杀题材敏感的读者需谨慎。",
  difficultyLevel: 3,
  difficultyReason: "叙事是传统线性结构，语言平实。篇幅约400页。历史背景本身沉重，但叙事方式不晦涩。人物较多。",
  readingPrerequisites: "对二战和纳粹德国历史的基本了解有助于进入故事。",
  readingAdvice: "注意主角辛德勒的灰色地带——他不是传统意义上的英雄，这才是小说最有价值的地方。",
  beginnerEntry: false,
});

add("耻", "Disgrace", "J.M.库切", "南非", 1999,
  "小说", "文学小说", 3, false, ["realism", "postcolonial"], {
  roleInPath: "CORE", suitability: "适合已接触过严肃文学的读者",
  oneSentencePositioning: "一个南非白人教授在性丑闻后逃到乡下女儿农场，发现自己和女儿在后种族隔离时代的南非都成了边缘人。",
  whyClassic: "1999年布克奖获奖作品。在极克制的篇幅里讨论了后殖民时代的身份、暴力、赎罪和人与动物的关系。没有一句多余的话。",
  whyRead: "叙事冷静到近乎冷酷，但每一段都承载着重量。它不提供简单的道德判断——主角不是好人，但他的遭遇让人无法不同情。",
  suitableFor: "适合喜欢心理深度、对后殖民议题有兴趣、欣赏精炼文笔的读者。篇幅短（约220页）。",
  notSuitableFor: "不适合期望好人战胜困难叙事的读者。性暴力场景有直接描写。",
  difficultyLevel: 3,
  difficultyReason: "篇幅短，语言精确不晦涩。但主题沉重，道德立场暧昧不明，需要读者有独立思考的意愿。",
  readingPrerequisites: "对南非种族隔离历史的基本了解有帮助。",
  readingAdvice: "注意库切对动物的描写——小说中关于狗的线索不是副线，而是理解主题的关键。",
  beginnerEntry: false,
});

add("奥斯卡与露辛达", "Oscar and Lucinda", "彼得·凯里", "澳大利亚", 1988,
  "小说", "文学小说", 3, false, ["postmodernism"], {
  roleInPath: "CORE", suitability: "适合喜欢独特叙事风格的读者",
  oneSentencePositioning: "一个赌徒牧师和一个女玻璃商跨越半个地球的爱情赌局。",
  whyClassic: "1988年布克奖获奖作品。融合冒险、爱情、赌博和宗教讽刺，叙事充满19世纪小说的风味又不失现代感。",
  whyRead: "角色极其鲜活——奥斯卡是一个患有赌瘾的圣公会牧师，这种矛盾本身就充满故事性。叙事风格像是狄更斯被赋予了现代节奏。",
  suitableFor: "适合喜欢独特叙事声音、对历史小说有兴趣的读者。",
  notSuitableFor: "叙事节奏有时松散，不适合期望紧凑情节的读者。",
  difficultyLevel: 3,
  difficultyReason: "语言风格模仿维多利亚小说，有特定的时代语调。叙事中有大量旁白和插话。情节线索较多。",
  readingPrerequisites: "不需要。对19世纪英国国教和澳洲殖民地历史的基本了解有帮助。",
  readingAdvice: "享受叙述者的声音——这个讲故事的人本身就是小说最大的魅力之一。",
  beginnerEntry: false,
});

add("凯利帮真史", "True History of the Kelly Gang", "彼得·凯里", "澳大利亚", 2001,
  "小说", "历史小说", 3, false, ["postmodernism"], {
  roleInPath: "CORE", suitability: "适合对澳大利亚文学有兴趣的读者",
  oneSentencePositioning: "澳洲传奇绿林好汉凯利帮的自述——用他本人的口语写成。",
  whyClassic: "2001年布克奖获奖作品。用令人震撼的不标准英语写了一个强盗的告白，既是一部历史冒险小说，也是对殖民叙事的颠覆。",
  whyRead: "叙事语言是最大的亮点——凯利帮的口语充满语法错误和拼写变异，但这种不标准恰恰传递了人物的真实声音。读起来像是一份压在箱底多年的手稿。",
  suitableFor: "适合对澳洲历史有兴趣的读者。",
  notSuitableFor: "非标准叙事语言可能让部分读者不适应。",
  difficultyLevel: 3,
  difficultyReason: "叙事语言故意不标准（拼写、语法变异），需要适应。但故事本身是冒险叙事，情节推进快。",
  readingPrerequisites: "对澳洲殖民历史的基本了解有帮助。",
  readingAdvice: "不要被非标准拼写吓退——把这当成凯利本人在对你说话。",
  beginnerEntry: false,
});

add("微物之神", "The God of Small Things", "阿兰达蒂·洛伊", "印度", 1997,
  "小说", "文学小说", 4, false, ["postmodernism", "postcolonial"], {
  roleInPath: "ADVANCED", suitability: "适合已有丰富文学阅读经验的读者",
  oneSentencePositioning: "一对印度双胞胎的童年如何被种姓制度和家族秘密摧毁。",
  whyClassic: "1997年布克奖获奖作品。以极诗意的语言和碎片化叙事，展示种姓制度如何渗透到最亲密的家庭关系中。",
  whyRead: "语言密度极高，每一页都有可以停下来品味的地方。它不是线形讲故事，而是像剥洋葱一样一层层揭开一个夏天的悲剧。",
  suitableFor: "适合喜欢精致语言和复杂叙事的读者。对印度社会有兴趣的人会获得很深的体验。",
  notSuitableFor: "不适合初学者。碎片化叙事、时间跳跃、文化特定细节多。",
  difficultyLevel: 4,
  difficultyReason: "非线性叙事，时间在1993年和1969年之间跳跃。语言诗性、密度高。包含大量印度南方的文化细节。",
  readingPrerequisites: "建议有10部以上严肃文学的阅读经验。对印度种姓制度的基本了解有帮助。",
  readingAdvice: "第一次读时不要强求理清所有时间线。让语言带你走。列一个人物关系表会很有帮助。",
  beginnerEntry: false,
});

add("白老虎", "The White Tiger", "阿拉文德·阿迪加", "印度", 2008,
  "小说", "文学小说", 2, true, ["realism", "postcolonial"], {
  roleInPath: "ENTRY", suitability: "适合作为后殖民小说入门",
  oneSentencePositioning: "一个印度穷小子用七晚给中国总理写信，讲述自己如何从一个底层司机变成成功企业家——以及他为此杀了谁。",
  whyClassic: "2008年布克奖获奖作品。以黑色幽默揭示现代印度的另一面：不是软件园和外包中心，而是黑暗、腐败、种姓压迫。",
  whyRead: "像一个犯罪故事一样吸引人。叙事节奏快，语言辛辣幽默。读者会在笑过之后发现自己被带入了不道德的立场。",
  suitableFor: "适合喜欢黑色幽默和社会讽刺的读者。想了解当代印度另一面的人会收获丰富。",
  notSuitableFor: "主角是杀人犯叙述者，读者会发现自己忍不住同情他。",
  difficultyLevel: 2,
  difficultyReason: "叙事是线性倒叙，语言直接有力，充满口语化表达。故事性强，悬念驱动。",
  readingPrerequisites: "不需要。",
  readingAdvice: "主角巴尔拉姆是一个不可靠叙述者——相信他说的每一句话，也要怀疑他说的每一句话。",
  beginnerEntry: true,
});

add("恶棍来访", "A Visit from the Goon Squad", "珍妮弗·伊根", "美国", 2010,
  "小说", "实验小说", 3, false, ["postmodernism"], {
  roleInPath: "CORE", suitability: "适合对实验性叙事有兴趣的读者",
  oneSentencePositioning: "13个相互关联的短篇，跨越40年，人物在不同篇章中以主配角身份轮转。",
  whyClassic: "2011年普利策小说奖获奖作品。用碎片化短篇结构写成，有一章完全用PPT格式展示。它对小说还能怎么讲做出了激进但成功的实验。",
  whyRead: "每一章都可以当作独立短篇来读，但连起来会拼出一幅更大的图景。关于时间如何改变人——每个角色年轻时都以为自己是主角，最终发现只是群演。",
  suitableFor: "适合喜欢实验性叙事、对音乐行业文化有兴趣的读者。",
  notSuitableFor: "不适合期望传统线性叙事的读者。人物众多。",
  difficultyLevel: 3,
  difficultyReason: "结构是主要门槛。章节独立，时间跳跃，需读者自己拼凑。但每章本身的叙事是清晰流畅的。",
  readingPrerequisites: "不需要。对朋克摇滚文化有一些了解会增添乐趣。",
  readingAdvice: "一章一章地读，读到后面会有不断啊原来是他惊喜时刻。",
  beginnerEntry: false,
});

add("长路", "The Road", "科马克·麦卡锡", "美国", 2006,
  "小说", "末世小说", 3, false, [], {
  roleInPath: "CORE", suitability: "适合已建立阅读习惯的读者",
  oneSentencePositioning: "末日之后，一对父子在灰烬覆盖的美国大地上向南跋涉。",
  whyClassic: "2007年普利策小说奖获奖作品。极简的语言制造了一种灰烬般的阅读体验。被广泛认为是21世纪最重要的美国小说之一。",
  whyRead: "极简的语言制造了寒冷、饥饿和绝望的氛围。但它又是一部关于父爱的故事——在世界彻底失败的设定下，父亲对孩子的责任变得极其纯粹和震撼。",
  suitableFor: "适合喜欢沉重严肃题材的读者。",
  notSuitableFor: "格调整体灰暗绝望，不适合情绪低落时阅读。",
  difficultyLevel: 3,
  difficultyReason: "语言本身简单。但麦卡锡独特的标点风格（无引号、无章节分割）需要适应。情感强度高。篇幅适中（约280页）。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意麦卡锡不使用引号——对话和叙述混在一起。这种没有边界的风格本身就是小说世界观的一部分。",
  beginnerEntry: false,
});



// ═══ Write back ═══
const jsonStr = JSON.stringify(data, null, 2);
fs.writeFileSync("lib/bookpath-data.ts", bpRaw.slice(0, objStart) + jsonStr + bpRaw.slice(jsonEnd), "utf-8");
console.log("\nDone!");
