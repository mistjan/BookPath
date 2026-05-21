// Batch 3: Chinese awards + Hugo/Nebula
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

// Chinese awards
add("牵风记", "牵风记", "徐怀中", "中国", 2018, "小说", "现实主义小说", 2, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合作为中国当代文学入口",
  oneSentencePositioning: "一个军旅女性和三个男人在战争与和平年代的命运交织。",
  whyClassic: "2019年茅盾文学奖获奖作品。以战争为背景写人性的韧性和美，语言精致，是中国当代军旅文学的重要收获。",
  whyRead: "它不是传统战争小说——重心不在战场而在人物之间细腻的情感关系。徐怀中的文笔在老一辈作家里独树一帜，简洁有力。",
  suitableFor: "适合对中国当代文学、军旅题材有兴趣的读者。篇幅适中。",
  notSuitableFor: "节奏较慢，不适合期望快节奏战争叙事的读者。",
  difficultyLevel: 2,
  difficultyReason: "语言精炼流畅，叙事线清楚。人物关系不复杂。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意小说对女性心理的刻画——这是它超越一般军旅题材的地方。",
  beginnerEntry: true,
});

add("北上", "北上", "徐则臣", "中国", 2018, "小说", "历史小说", 2, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合作为中国当代文学入口",
  oneSentencePositioning: "京杭大运河的前世今生——一条河连接了跨越百年的家族命运。",
  whyClassic: "2019年茅盾文学奖获奖作品。以运河为线索串起多个时代的故事，是中国近年来历史与地域书写的重要作品。",
  whyRead: "既有历史小说的厚重感，又有侦探小说的悬念结构。故事在1901年和2014年之间穿梭，两个时代的故事相互呼应。",
  suitableFor: "适合对历史小说有兴趣的读者。对京杭大运河和中国近代史有兴趣的人会特别喜欢。",
  notSuitableFor: "双线叙事需要一定的阅读耐心。",
  difficultyLevel: 2,
  difficultyReason: "双线叙事清晰，每个时代的故事独立可读。语言流畅平实。",
  readingPrerequisites: "对中国近代史的基本了解有助于进入故事。",
  readingAdvice: "可以只读一条线，也可以交叉读。两条线最终会汇合。",
  beginnerEntry: true,
});

add("主角", "主角", "陈彦", "中国", 2018, "小说", "现实主义小说", 2, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合作为中国当代文学入口",
  oneSentencePositioning: "一个秦腔女演员从底层成为主角的40年人生。",
  whyClassic: "2019年茅盾文学奖获奖作品。以秦腔戏曲行业为背景，写一个人的成长也写一种传统艺术的兴衰。",
  whyRead: "叙事扎实——主角忆秦娥的成长故事本身就是一部好看的励志小说。同时它提供了秦腔这个冷门行业的大量丰富细节。",
  suitableFor: "适合喜欢人物驱动故事的读者。对传统戏曲和中国社会变迁有兴趣的人。",
  notSuitableFor: "长篇（约800页），需要阅读耐心。",
  difficultyLevel: 2,
  difficultyReason: "叙事是传统线性成长故事，语言平实。虽然篇幅长但故事驱动。",
  readingPrerequisites: "不需要。",
  readingAdvice: "把它当作一个人的传记来读。秦腔的细节是点缀，核心是一个人的成长。",
  beginnerEntry: true,
});

add("应物兄", "应物兄", "李洱", "中国", 2018, "小说", "文学小说", 3, false, ["realism"], {
  roleInPath: "CORE", suitability: "适合已有文学阅读习惯的读者",
  oneSentencePositioning: "一个知识分子在当代中国的学术体制、家庭关系和历史记忆之间周旋。",
  whyClassic: "2019年茅盾文学奖获奖作品。以近90万字的篇幅描绘了中国当代知识分子的群像，被称为中国版的《围城》。",
  whyRead: "信息量极大——涉及儒学、学术界生态、官场、家庭等多个维度。它是理解当代中国知识分子处境的一面镜子。",
  suitableFor: "适合对中国当代知识分子命运有兴趣的读者。喜欢大量细节和旁征博引的读者。",
  notSuitableFor: "篇幅极长（近900页），信息密度高，不适合零散时间阅读。",
  difficultyLevel: 3,
  difficultyReason: "篇幅长、人物多、涉及大量学术和文化引用。语言本身不晦涩，但需要读者有兴趣去消化其中的知识密度。",
  readingPrerequisites: "对中国当代学术体制和儒家文化有一定了解会帮助阅读。",
  readingAdvice: "不一定要读懂所有典故。把它当作一幅当代中国的浮世绘来读。",
  beginnerEntry: false,
});

// Hugo/Nebula winners
add("石头天空", "The Stone Sky", "N.K.杰米辛", "美国", 2017, "小说", "科幻小说", 3, false, ["science-fiction"], {
  roleInPath: "CORE", suitability: "适合已有科幻阅读经验的读者",
  oneSentencePositioning: "一个母亲和女儿在即将毁灭的世界中各自寻找拯救彼此的方式。",
  whyClassic: "2018年雨果奖获奖作品，是连续三年获得雨果奖的'破碎地球'三部曲的终章。杰米辛是首位连续三年获得雨果奖的黑人作家。",
  whyRead: "架构宏大，设定独特——地球本身变成了一个有意识的实体。第二人称叙事部分大胆而成功。母女关系的情感核心令人动容。",
  suitableFor: "适合喜欢宏大世界观设定的科幻读者。",
  notSuitableFor: "建议先读三部曲前两部。不适合SF新手。",
  difficultyLevel: 3,
  difficultyReason: "复杂的科幻设定（地球有机化、第二人称叙事、非线性时间）。需要先了解系列背景。",
  readingPrerequisites: "建议先读三部曲前两部《第五季》《方尖碑之门》。",
  readingAdvice: "注意第二人称叙事的段落——这是全书的精华。",
  beginnerEntry: false,
});

add("流浪者", "The Wanderer", "弗里茨·莱伯", "美国", 1964, "小说", "科幻小说", 2, true, ["science-fiction"], {
  roleInPath: "ENTRY", suitability: "适合作为科幻小说入门",
  oneSentencePositioning: "一个神秘的新行星闯入太阳系，引发全球混乱。",
  whyClassic: "1965年雨果奖获奖作品。传统硬科幻的代表作，以多个角色的视角展示一个天文事件对人类社会的影响。",
  whyRead: "多视角叙事展示全球反应——科学家、政客、普通人各怀心思。故事紧张，像灾难片一样吸引人。",
  suitableFor: "适合喜欢硬科幻和灾难叙事的读者。",
  notSuitableFor: "对1960年代科幻写作风格不习惯的读者可能觉得节奏偏慢。",
  difficultyLevel: 2,
  difficultyReason: "叙事直接，语言不复杂。多视角但每条线都清楚。科幻设定基于天文学，容易理解。",
  readingPrerequisites: "不需要。",
  readingAdvice: "把它当作一部天文灾难片来读。",
  beginnerEntry: true,
});

add("黑暗的左手", "The Left Hand of Darkness", "厄休拉·勒古恩", "美国", 1969, "小说", "科幻小说", 3, false, ["science-fiction"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读经验的读者",
  oneSentencePositioning: "一个地球使者前往一个性别流动的星球，试图说服当地人加入星际联盟。",
  whyClassic: "1970年雨果奖和星云奖双料获奖作品。勒古恩在科幻框架下探讨了性别、政治和文化差异，是女性主义SF的奠基之作。",
  whyRead: "它让读者思考：如果性别不是固定的二元，社会会是什么样？不是通过理论文章，而是通过一个具体的、陌生又可信的世界。",
  suitableFor: "适合对社会学SF有兴趣的读者。对人类学和性别议题有兴趣的人。",
  notSuitableFor: "叙事节奏偏慢，以人类学考察笔记的形式推进。",
  difficultyLevel: 3,
  difficultyReason: "叙事风格类似人类学考察报告，不是传统情节驱动。设定的理解和接受（流动性别社会）需要读者有一定的开放心态。",
  readingPrerequisites: "不需要硬科幻知识。建议对社会学和人类学有兴趣。",
  readingAdvice: "不要急于理解'性别'的问题——先接受这个设定，故事自然会引导你思考。",
  beginnerEntry: false,
});

add("神经漫游者", "Neuromancer", "威廉·吉布森", "美国/加拿大", 1984, "小说", "科幻小说", 3, false, ["science-fiction"], {
  roleInPath: "CORE", suitability: "适合对赛博朋克有兴趣的读者",
  oneSentencePositioning: "一个被淘汰的黑客被雇佣进行最后一次网络入侵。",
  whyClassic: "1985年雨果奖和星云奖双料获奖作品。开创了赛博朋克流派，创造了'赛博空间'这个词，直接影响了《黑客帝国》。",
  whyRead: "它预言了互联网、虚拟现实和人工智能的很多方面，即使在今天读起来仍然前卫。叙事像黑客行动本身一样快速密集。",
  suitableFor: "适合对赛博朋克文化、科技未来有兴趣的读者。",
  notSuitableFor: "语言密度高、术语多，需要耐心适应。",
  difficultyLevel: 3,
  difficultyReason: "吉布森的写作风格是'扔读者进深水区'——不解释术语，直接使用。前50页可能会困惑，之后会逐渐理解这个世界的语言。",
  readingPrerequisites: "对计算机和网络文化的基本了解有帮助。",
  readingAdvice: "前100页坚持住——如果你能熬过开头的术语轰炸，后面会越来越顺畅。",
  beginnerEntry: false,
});

add("沙丘", "Dune", "弗兰克·赫伯特", "美国", 1965, "小说", "科幻小说", 3, false, ["science-fiction"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读耐心的读者",
  oneSentencePositioning: "在沙漠星球上，一个少年的家族被夺走一切，他必须在当地土著和星际政治之间找到自己的道路。",
  whyClassic: "1966年雨果奖和星云奖双料获奖作品。科幻史上销量最高的作品之一，对生态学、宗教、政治和英雄主义的探讨影响了后世无数作品。",
  whyRead: "世界建构极其庞大——生态、政治、宗教、科技、历史全部自成体系。它不是一个简单的英雄冒险故事，而是对'救世主叙事'的复杂反思。",
  suitableFor: "适合喜欢宏大世界观和深度政治描写的读者。",
  notSuitableFor: "篇幅长（约600页），设定复杂，不适合想快速阅读的读者。",
  difficultyLevel: 3,
  difficultyReason: "大量的自创术语和复杂的世界建构需要投入注意力。书中包含词汇表，可以随时查阅。叙事本身是传统英雄旅程，容易跟进。",
  readingPrerequisites: "不需要特殊知识。准备接受一个有完整生态和历史的虚构世界。",
  readingAdvice: "不要试图一次性记住所有术语。书中附有词汇表，遇到不认识的词可以查阅。先关注故事，设定会自然展开。",
  beginnerEntry: false,
});

fs.writeFileSync("lib/bookpath-data.ts", bpRaw.slice(0, oStart) + JSON.stringify(data, null, 2) + bpRaw.slice(jEnd), "utf-8");
console.log("\nDone!");
