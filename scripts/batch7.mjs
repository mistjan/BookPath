// Batch 7: More classics
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

add("1984", "Nineteen Eighty-Four", "乔治·奥威尔", "英国", 1949, "小说", "反乌托邦小说", 2, true, ["dystopian"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "在一个极权社会中，一个男人试图通过爱情和记忆保持自己的人性。",
  whyClassic: "反乌托邦三部曲之一，'老大哥在看着你'、'思想警察'、'双重思想'已经进入日常语言。它不只是一部小说，而是对极权主义最有力的文学控诉。",
  whyRead: "读完会让你重新审视'真相'这个词。在'后真相'时代，奥威尔对语言如何被用来控制思想的洞察比任何时候都更切题。",
  suitableFor: "适合所有读者。对政治和权力有兴趣的人尤其必要。",
  notSuitableFor: "格调灰暗压抑。",
  difficultyLevel: 2,
  difficultyReason: "语言直接，叙事线性，情节驱动。主题深度不影响阅读流畅性。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意附录'新话的原则'——它是全书的重要组成部分，不是在凑字数。",
  beginnerEntry: true,
});

add("动物农场", "Animal Farm", "乔治·奥威尔", "英国", 1945, "小说", "寓言小说", 1, true, ["dystopian"], {
  roleInPath: "ENTRY", suitability: "适合所有读者，包括青少年",
  oneSentencePositioning: "一群动物赶走人类自己管理农场，但新的统治者比人类更坏。",
  whyClassic: "20世纪最著名的政治寓言。用动物故事讲苏联历史，'所有动物平等，但有些动物比其他动物更平等'成为经典名句。",
  whyRead: "极短（不到100页），2-3小时读完。每一章对应苏联历史的一个阶段。即使不知道历史背景，它也是一个关于权力腐化的好故事。",
  suitableFor: "适合所有读者，包括青少年。也是了解政治寓言的绝佳入门。",
  notSuitableFor: "没有。",
  difficultyLevel: 1,
  difficultyReason: "篇幅极短，语言简单到孩子都能读懂。寓言式叙事，每章都有明确的情节推进。",
  readingPrerequisites: "不需要。",
  readingAdvice: "如果了解苏联历史（十月革命、斯大林时期），会发现每一章都是一个历史事件的寓言。但如果不知道也不影响理解核心寓言。",
  beginnerEntry: true,
});

add("美丽新世界", "Brave New World", "奥尔德斯·赫胥黎", "英国", 1932, "小说", "反乌托邦小说", 2, true, ["dystopian"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "在这个'完美'的未来世界里，所有人都在出生前被设计好等级，没有痛苦但也没有自由。",
  whyClassic: "与《1984》并列为反乌托邦两大经典。如果说奥威尔担心的是强制，赫胥黎担心的则是享乐——人们会因为太幸福而自愿放弃自由。",
  whyRead: "在'快乐'这个话题上，赫胥黎的预见比奥威尔更准确——我们不是被暴力控制的，而是被消费和娱乐控制的。",
  suitableFor: "适合所有读者。对科技伦理和社会控制有兴趣的人。",
  notSuitableFor: "部分性描写在时代背景下是挑衅性的。",
  difficultyLevel: 2,
  difficultyReason: "语言流畅，叙事有清晰的情节线。虽然涉及优生学、条件反射等概念，但赫胥黎解释得很清楚。",
  readingPrerequisites: "不需要。",
  readingAdvice: "和《1984》对比着读更有意思——一个用痛苦统治，一个用快乐统治。",
  beginnerEntry: true,
});

add("瓦尔登湖", "Walden", "亨利·梭罗", "美国", 1854, "非虚构", "自然文学", 2, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "一个人跑到湖边独自生活了两年，然后写了一本书告诉你为什么你应该活得简单。",
  whyClassic: "自然文学的开创之作，影响了托尔斯泰、甘地、马丁·路德·金等无数人。梭罗关于'简化简化再简化'的主张在消费主义时代尤其响亮。",
  whyRead: "不是荒野生存指南，而是一份关于如何生活的哲学宣言。它不厚，但每一页都有让人停下来想一会儿的东西。",
  suitableFor: "适合对简单生活、自然和哲学有兴趣的读者。在城市里感到疲惫的人。",
  notSuitableFor: "不是故事书，是散文集。没有情节推进。",
  difficultyLevel: 2,
  difficultyReason: "语言优美但清晰。各章相对独立，可以跳跃阅读。部分涉及19世纪美国的社会背景，但核心信息跨越时代。",
  readingPrerequisites: "不需要。",
  readingAdvice: "不要一口气读完。每天读一章，然后想一想——梭罗说的'自愿贫穷'在今天是什么意思。",
  beginnerEntry: true,
});

add("傲慢与偏见", "Pride and Prejudice", "简·奥斯汀", "英国", 1813, "小说", "爱情小说", 2, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "一个聪明但傲慢的先生，一个有偏见但勇敢的小姐——他们需要克服的不仅是对方，更是自己的性格缺陷。",
  whyClassic: "奥斯汀最受欢迎的作品，也是英语文学中最完美的喜剧小说之一。它不只是浪漫爱情故事，更是对阶级、婚姻和女性处境的犀利观察。",
  whyRead: "200年来为什么一直有人在读？因为它有趣——奥斯汀的对白机智到令人嫉妒。而且它说的不是'嫁个有钱人'，而是'不要嫁给自己不尊重的人'。",
  suitableFor: "适合所有读者。喜欢机智对白和社会观察的读者会特别享受。",
  notSuitableFor: "节奏偏慢，以对话和社交场景为主。",
  difficultyLevel: 2,
  difficultyReason: "语言清晰流畅。奥斯汀的讽刺和机智需要一点阅读敏感度，但故事本身很容易进入。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意奥斯汀的讽刺——第一句话'一个有钱的单身汉必定需要一位妻子'就是一个反讽，不是真心话。",
  beginnerEntry: true,
});

add("简爱", "Jane Eyre", "夏洛蒂·勃朗特", "英国", 1847, "小说", "成长小说", 2, true, ["realism"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "一个孤儿院出身的贫穷家庭教师爱上庄园主人后，发现他阁楼上藏着一个疯狂的秘密。",
  whyClassic: "英国文学最经典的小说之一。简爱是第一人称女性叙事的先驱——她不是等待被拯救的公主，而是一个知道自己的价值、拒绝在不平等条件下接受爱情的独立女性。",
  whyRead: "既是一个哥特爱情故事（有秘密、有疯女人、有午夜火灾），也是一个女性独立宣言。简爱对罗切斯特说的'我虽然穷不美但我们的灵魂是平等的'至今仍有力量。",
  suitableFor: "适合所有读者。对女性文学、爱情小说有兴趣的人。",
  notSuitableFor: "节奏偏慢，以第一人称内心独白为主。",
  difficultyLevel: 2,
  difficultyReason: "第一人称叙事，语言流畅。故事性强，有悬念有情感。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意阁楼上的伯莎·梅森——后来的女性主义者认为她不是疯子，而是被压抑的女性的象征。",
  beginnerEntry: true,
});

add("呼啸山庄", "Wuthering Heights", "艾米莉·勃朗特", "英国", 1847, "小说", "文学小说", 3, false, ["modernism"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读经验的读者",
  oneSentencePositioning: "一个被收养的弃儿和养父家的女儿之间毁灭性的爱情——它毁掉了两代人。",
  whyClassic: "英国文学中最极端、最暴烈的爱情故事。它让同时代人震惊——没有道德教训、没有好人坏人、只有无法控制的情感。弗吉尼亚·伍尔夫说它是'唯一一部让人嫉妒的小说'。",
  whyRead: "读它不是享受，而是一种被卷入风暴的体验。所有角色都不'可爱'，但他们身上有一种原始的生命力。",
  suitableFor: "适合喜欢强烈情感和复杂叙事的读者。",
  notSuitableFor: "几乎所有角色都让人不舒服。不是传统意义上的'好故事'。",
  difficultyLevel: 3,
  difficultyReason: "双重视角叙事（洛克伍德和内莉·迪恩）和一个嵌套的倒叙结构。角色关系复杂（两代人同名）。语言偏19世纪。",
  readingPrerequisites: "建议先读过一些19世纪小说以适应该时代的叙事节奏。",
  readingAdvice: "画一张家族谱系图——两代人的名字相似，容易混淆。",
  beginnerEntry: false,
});

add("了不起的盖茨比", "The Great Gatsby", "F·斯科特·菲茨杰拉德", "美国", 1925, "小说", "文学小说", 2, true, ["modernism"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "一个神秘富翁在长岛举办盛大派对，只为吸引对岸的绿灯下那一个女人。",
  whyClassic: "美国文学史上被阅读最广泛的小说之一。它捕捉了'爵士时代'的华丽与空虚，也是对美国梦最深刻的解剖。",
  whyRead: "篇幅极短（不到200页），1-2天可以读完。但每一页都经得起重读。菲茨杰拉德的语言像水晶一样透明而坚硬。",
  suitableFor: "适合所有层次的读者。对美国社会和美国梦有兴趣的人。",
  notSuitableFor: "没有。",
  difficultyLevel: 2,
  difficultyReason: "篇幅短，叙事线性（尼克的第一人称回忆）。语言优美但清晰。象征丰富但不难识别。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意绿灯、艾克堡医生的眼睛和东卵西卵之间的地理差异——菲茨杰拉德在每一页都放了一个象征。",
  beginnerEntry: true,
});

add("老人与海", "The Old Man and the Sea", "海明威", "美国", 1952, "小说", "中篇小说", 1, true, ["modernism"], {
  roleInPath: "ENTRY", suitability: "适合所有读者",
  oneSentencePositioning: "一个老渔夫在海上与大鱼搏斗了三天三夜，最后只带回来一副骨架。",
  whyClassic: "海明威获诺贝尔文学奖的代表作。'冰山理论'的完美体现——文字只露出水面八分之一，水下八分之七靠读者感受。",
  whyRead: "极短（不到100页），语言极简。但读完会让你想很久。它是关于失败、尊严和一个人如何面对自己的极限。",
  suitableFor: "适合所有读者，包括青少年。",
  notSuitableFor: "没有。",
  difficultyLevel: 1,
  difficultyReason: "词汇和句式都非常简单（海明威刻意用有限的词汇量写作）。情节单一：老人、海、鱼。初一学生都能读懂。",
  readingPrerequisites: "不需要。",
  readingAdvice: "注意海明威的叙事克制——老人几次提到'要是那孩子在就好了'，但海明威不解释，只重复。这种重复本身就是情感。",
  beginnerEntry: true,
});

add("丧钟为谁而鸣", "For Whom the Bell Tolls", "海明威", "美国", 1940, "小说", "战争小说", 3, false, ["modernism"], {
  roleInPath: "CORE", suitability: "适合已有一定阅读耐心的读者",
  oneSentencePositioning: "一个美国志愿者在西班牙内战期间负责炸毁一座桥，任务中的三天是他一生最浓缩的时刻。",
  whyClassic: "海明威最重要的长篇小说。以西班牙内战为背景，写一个人在面对死亡时的思考。'没有人是一座孤岛'即出自此书。",
  whyRead: "三天的时间跨度写了近500页。每一分钟都在倒数——炸桥任务定了，读者知道会死，但怎么走向那个结局才是重点。",
  suitableFor: "适合喜欢战争文学和存在主义主题的读者。",
  notSuitableFor: "篇幅长，部分段落节奏较慢（主角的回忆和思考）。",
  difficultyLevel: 3,
  difficultyReason: "海明威在这部小说中用了大量西班牙语夹杂和'thou'古英语变体，形成一种特殊的语言质感。篇幅较长。",
  readingPrerequisites: "对西班牙内战的基本历史了解有助于进入。",
  readingAdvice: "注意海明威对'the earth'的描写——他对土地的感情是理解这部小说的钥匙。",
  beginnerEntry: false,
});

fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
console.log("\nDone!");
