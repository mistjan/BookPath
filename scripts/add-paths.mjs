// Add reading paths for newly added works
import fs from "fs";
const R = fs.readFileSync("lib/bookpath-data.ts", "utf-8");
const O = R.indexOf("{", R.indexOf("export const bookPathData = "));
let d = 0, E = O;
for (let i = O; i < R.length; i++) { if (R[i] === "{") d++; else if (R[i] === "}") { d--; if (d === 0) { E = i + 1; break; } } }
const D = JSON.parse(R.slice(O, E));

function wid(t) {
  const slug = t.replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
  const found = D.works.find(w => w.slug === slug || w.titleDisplayCn === t);
  return found ? found.id : slug;
}

function addPath(slug, title, type, intro, target, diff, steps) {
  if (D.readingPaths.some(p => p.slug === slug)) { console.log(`Skip ${title}`); return; }
  D.readingPaths.push({
    id: slug, slug, title, description: intro, intro, targetReader: target,
    type, pathType: type, movementId: "",
    difficultyRange: diff, difficultyStart: parseInt(diff), difficultyEnd: parseInt(diff),
    workCount: steps.length, estimatedBookCount: steps.length,
    steps: steps.map((s, i) => ({
      id: `step-${slug}-${i + 1}`, workId: wid(s.work), title: s.work, roleInPath: s.role,
      reason: s.reason,
      ...(s.caution ? { caution: true, skipAllowed: true } : {}),
      work: { slug: wid(s.work) },
    })),
    aiGenerated: false, reviewStatus: "AI_DRAFT",
  });
  console.log(`+ ${title}`);
}

// ═══ 1. 中国古典文学入门 ═══
addPath("chinese-classics-intro", "中国古典文学入门", "BEGINNER",
  "从诗经到红楼梦——三千年中国文学的精华路线。不追求全面，只走一条'你最需要知道'的主线。",
  "想了解中国古典文学但不知从何入手的读者。", "1-3", [
  { work: "诗经", role: "ENTRY", reason: "中国文学从这里开始。'关关雎鸠'三千年后还在被人读——先感受它为什么能活这么久。" },
  { work: "论语", role: "ENTRY", reason: "塑造了中国文人精神的书。不长，像一个智慧老人的语录，随时可以翻开读几条。" },
  { work: "史记", role: "FOUNDATION", reason: "中国历史写作的巅峰。先读列传部分——项羽、荆轲、廉颇蔺相如——司马迁写人物比小说家还精彩。" },
  { work: "唐诗三百首", role: "FOUNDATION", reason: "中国诗歌的黄金时代。每天读一两首，三个月读完。不用分析，先感受语言之美。" },
  { work: "水浒传", role: "CORE", reason: "中国英雄传奇的代表。林冲风雪山神庙、武松打虎、鲁智深倒拔垂杨柳——这些故事构成了中国人的集体记忆。" },
  { work: "红楼梦", role: "CORE", reason: "中国古典小说的最高峰。它写尽了一个大家族的兴衰和一群年轻人的命运。四百多个人物，每一个都活着。" },
]);

// ═══ 2. 古希腊罗马经典入门 ═══
addPath("greek-classics-intro", "古希腊经典入门", "BEGINNER",
  "西方文明的源头——史诗、悲剧和哲学。了解这些才能真正理解后来的整个西方文学。",
  "想了解西方文学起源、对古希腊文化有兴趣的读者。", "2-4", [
  { work: "伊利亚特", role: "ENTRY", reason: "西方文学从头到尾就是一部'讲人的故事'——阿喀琉斯的愤怒、赫克托耳的尊严，三千年后仍然动人心魄。" },
  { work: "奥德赛", role: "ENTRY", reason: "比《伊利亚特》更好读——冒险、怪物、海妖、回家的旅程。'奥德赛'本身已经成为'漫长回家路'的代名词。" },
  { work: "希腊悲剧选", role: "CORE", reason: "俄狄浦斯王的悲剧结构完美到亚里士多德把它当作范例。索福克勒斯告诉你——命运不以人的意志为转移。" },
  { work: "奥德赛", role: "ADVANCED", reason: "第一次读完史诗后重读第二遍——你会发现它不只是冒险故事，还是关于身份、记忆和回家的哲学。" },
]);

// ═══ 3. 法国文学经典入门 ═══
addPath("french-literature-intro", "法国文学入门", "BEGINNER",
  "从19世纪现实主义到20世纪存在主义——法国文学最重要的作品路线。",
  "想系统了解法国文学的读者。", "2-4", [
  { work: "基督山伯爵", role: "ENTRY", reason: "史上最好看的复仇故事之一。大仲马证明了'好看'和'文学'可以是一回事。从这部进入法国文学毫无压力。" },
  { work: "红与黑", role: "FOUNDATION", reason: "于连·索雷尔是文学史上最复杂的角色之一——他不是好人，但你是他的同谋。司汤达用一个人的内心戏写了一个时代。" },
  { work: "包法利夫人", role: "CORE", reason: "福楼拜用五年时间打磨这本小说，每一句都精密如钟表。爱玛的悲剧——把虚构的生活当作真正的标准——比任何时代都更切题。" },
  { work: "悲惨世界", role: "CORE", reason: "雨果的史诗。冉阿让从苦役犯到善人的一生，是19世纪最动人的救赎故事。篇幅长但值得。" },
  { work: "局外人", role: "ADVANCED", reason: "加缪用不到150页写出了存在主义的核心。默尔索不是冷漠——他只是拒绝表演。'在母亲葬礼上没有哭'就被判了死刑。" },
]);

// ═══ 4. 俄国文学经典入门 ═══
addPath("russian-literature-intro", "俄国文学入门", "BEGINNER",
  "俄国文学以'厚重'著称——不是因为它沉闷，而是因为它从来不回避最重要的问题。",
  "想了解俄国文学但怕'太沉重'的读者。", "2-5", [
  { work: "变形记", role: "ENTRY", reason: "卡夫卡虽然用德语写作，但他的影响遍及中东欧文学，包括俄国。极短——两小时读完——让你感受'人变成甲虫后家人如何对待他'的冷峻。" },
  { work: "罪与罚", role: "CORE", reason: "陀思妥耶夫斯基最'好读'的长篇——一个大学生杀了人后如何面对自己的良心。悬念从头保持到尾，不是'谁是凶手'而是'他能承受吗'。" },
  { work: "安娜·卡列尼娜", role: "CORE", reason: "托尔斯泰比陀氏更'正常'——他的小说是19世纪俄国社会的全景图。安娜的故事让人心碎，列文的故事让人思考。" },
  { work: "战争与和平", role: "ADVANCED", reason: "最后挑战这一部——不是因为它最难懂，而是因为它最长。把它当作五个家族的编年史来读，不要被'伟大'吓到。" },
]);

// ═══ 5. 英国文学经典入门 ═══
addPath("british-literature-intro", "英国文学入门", "BEGINNER",
  "从莎士比亚到伍尔夫——英语文学的核心路线。",
  "想了解英国文学的读者。", "2-4", [
  { work: "罗密欧与朱丽叶", role: "ENTRY", reason: "莎士比亚最好的入口——故事谁都知道，语言又美。先看电影再读剧本更轻松。" },
  { work: "傲慢与偏见", role: "FOUNDATION", reason: "简·奥斯汀让小说变得'有意思'——她的对白机智到让人嫉妒。不只是爱情故事，更是对阶级和婚姻的犀利观察。" },
  { work: "简爱", role: "CORE", reason: "勃朗特姐妹给英国文学带来了另一种声音——女性的、热烈的、不屈服的。简爱告诉罗切斯特'我们的灵魂是平等的'——1847年没有人这样写。" },
  { work: "达洛维夫人", role: "ADVANCED", reason: "伍尔夫把小说变成了诗。一天之内，一个女人的意识流动——没有情节，但比有情节的小说包含得更多。" },
]);

// ═══ 6. 莎士比亚入门 ═══
addPath("shakespeare-intro", "莎士比亚入门", "BEGINNER",
  "四个悲剧，一个喜剧——莎士比亚最精华的作品路线。不用怕'古英语'——好的译本让你直接感受到他为什么伟大。",
  "想读莎士比亚但不知道从哪部开始的读者。", "2-3", [
  { work: "罗密欧与朱丽叶", role: "ENTRY", reason: "故事最熟悉，阅读障碍最小。先看电影（1996年莱昂纳多版）再读剧本。" },
  { work: "麦克白", role: "FOUNDATION", reason: "莎士比亚最短的悲剧。三个女巫、一个野心勃勃的将军、一个比他更狠的妻子——情节紧凑到两小时演完。" },
  { work: "哈姆雷特", role: "CORE", reason: "莎士比亚最伟大的作品。'生存还是毁灭'是英语文学最著名的句子。先知道剧情再读——你的任务是理解他为什么犹豫。" },
  { work: "李尔王", role: "ADVANCED", reason: "一位暴怒的老国王，三个女儿，一场荒野上的暴风雨——这是莎士比亚最黑暗、最令人不安的悲剧。适合有阅读经验的读者。" },
  { work: "奥赛罗", role: "ADVANCED", reason: "伊阿古用语言摧毁了一个人——不是用刀剑。莎士比亚对嫉妒的理解让四百年后的心理小说都显得多余。" },
]);

// ═══ 7. 日本文学经典入门 ═══
addPath("japanese-literature-intro", "日本文学入门", "BEGINNER",
  "从平安时代到现代——日本文学的静谧与暴烈。",
  "想了解日本文学的读者。", "2-4", [
  { work: "我是猫", role: "ENTRY", reason: "夏目漱石的这只猫是整个日本文学里最好笑的叙述者之一。用猫的眼睛看明治时期的知识分子——幽默、犀利、毫无压力。" },
  { work: "雪国", role: "FOUNDATION", reason: "川端康成用最少的字写了最浓的意境。读日本文学如果不读川端，就像读俄国文学不读托尔斯泰。" },
  { work: "罗生门", role: "CORE", reason: "芥川龙之介的短篇可以在半小时内读完——但它会在脑子里留三天。同一个事件，不同的人说出完全不同的'真相'。" },
  { work: "挪威的森林", role: "CORE", reason: "村上春树最'正常'的一部小说——没有超现实、没有会说话的猫、只有青春期的爱情和死亡。想了解村上从这部开始。" },
  { work: "人间失格", role: "ADVANCED", reason: "太宰治用生命写的书——完稿后自杀。主角说'我不配做人'——这部小说不是让人'舒服'的，但它是了解日本'私小说'传统绝不会绕过的作品。" },
]);

// ═══ 8. 拉美文学经典入门 ═══
addPath("latin-american-literature-intro", "拉美文学入门", "BEGINNER",
  "拉美文学不是'魔幻'——他们的现实本来就很魔幻。从马尔克斯开始，到波拉尼奥结束。",
  "想了解拉美文学的读者。", "2-5", [
  { work: "霍乱时期的爱情", role: "ENTRY", reason: "比《百年孤独》好入口。它是一本关于爱情所有可能性的百科全书——不浪漫，但真实。" },
  { work: "百年孤独", role: "CORE", reason: "魔幻现实主义的高峰。打开第一页就能感受到一个不同的叙事声音——用最自然的语气讲最不可能的事。" },
  { work: "佩德罗·巴拉莫", role: "CORE", reason: "极短（不到150页），但重读一遍会发现完全不同的东西。活人和死人的声音混在一起——这是魔幻现实主义真正的起点。" },
  { work: "荒野侦探", role: "ADVANCED", reason: "波拉尼奥用50多个人的证词拼出了一个故事——读者是唯一能看见全貌的人。篇幅长、人物多、但值得。" },
]);

// ═══ 9. 中国诗歌入门 ═══
addPath("chinese-poetry-intro", "中国诗歌入门", "BEGINNER",
  "从诗经到苏轼——中国三千年诗歌的精选路线。不需要专业知识，只需要感受语言之美。",
  "想了解中国古典诗歌但不知从何入手的读者。", "1-2", [
  { work: "诗经", role: "ENTRY", reason: "中国最早的诗歌。'昔我往矣，杨柳依依'——两千多年前的人和我们有一样的感情。先读'国风'部分（民间情歌）。" },
  { work: "唐诗三百首", role: "CORE", reason: "唐诗是中国诗歌的巅峰。每天读一两首，不用分析——'床前明月光'之所以好不需要教授告诉你。" },
  { work: "李太白集", role: "CORE", reason: "李白是飞在天上的诗人。'天子呼来不上船'——他活出了中国人最羡慕的自由。" },
  { work: "杜工部集", role: "CORE", reason: "杜甫是站在地上的诗人。李白是天才，杜甫是'地才'——他的'朱门酒肉臭路有冻死骨'是用脚走出来的。" },
  { work: "东坡集", role: "ADVANCED", reason: "苏轼是一个你可以交朋友的人——他太有趣了。'大江东去'的豪放和'十年生死两茫茫'的深情出现在同一个人笔下。" },
]);

// ═══ 10. 中国四大名著入门 ═══
addPath("four-great-novels", "中国四大名著", "GENRE",
  "四大名著是中国古典小说的四座高峰——它们各自代表了一种类型、一种世界观。",
  "想了解中国古典小说最高成就的读者。", "2-3", [
  { work: "西游记", role: "ENTRY", reason: "最好入口的一部。孙悟空打妖怪的故事从8岁到80岁都能读。表面是打怪升级，内里是修心之旅。" },
  { work: "三国演义", role: "FOUNDATION", reason: "中国最有影响力的历史小说。关羽的义、诸葛亮的智、曹操的奸——每个人物都到了极致。也是权谋爱好者的盛宴。" },
  { work: "水浒传", role: "CORE", reason: "英雄传奇的代表。一百零八将被逼上梁山的故事。前半部（个人传记部分）比后半部更好看。" },
  { work: "红楼梦", role: "CORE", reason: "四大名著中文学成就最高的一部。它不靠情节取胜——它靠的是'真'。林黛玉的尖刻、贾宝玉的痴、王熙凤的精明——每一个人都是活的。" },
]);

fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
console.log(`Done! Total reading paths: ${D.readingPaths.length}`);
