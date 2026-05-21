import { awards, movements, readingPaths, works } from "@bookpath/content";

export interface AuthorBio {
  name: string;
  born?: string;
  died?: string;
  nationality: string;
  description: string;
  whyImportant: string;
  recommendedFor: string;
}

/** Convert text to a URL-safe ID for author/work linking */
export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "");
}

/** Find a work whose display/original title matches a given name */
export function findWorkByName(name: string) {
  return works.find(
    (w) => w.titleDisplayCn === name || w.titleOriginal === name || (w as any).titleTranslatedCn === name
  ) ?? null;
}

export type SearchScope = "all" | "works" | "movements" | "paths" | "awards";
export type ReadingPathType = "BEGINNER" | "GENRE" | "REGION" | "AWARD";
export type WorkFilterInput = {
  query?: string;
  category?: string;
  subcategory?: string;
  difficulty?: string | number;
  region?: string;
  country?: string;
  movement?: string;
  beginner?: "" | "yes" | "no" | string;
  sort?: "year-asc" | "year-desc" | "difficulty" | "title";
};

export const pathGroups = [
  {
    id: "BEGINNER",
    label: "入门路径",
    description: "从可进入性开始，帮助读者完成第一组文学经验。"
  },
  {
    id: "GENRE",
    label: "体裁路径",
    description: "从科幻、推理等体裁进入，连接文学大类和下属子类。"
  },
  {
    id: "REGION",
    label: "地区路径",
    description: "按地区、语言传统和阅读距离组织作品。"
  },
  {
    id: "AWARD",
    label: "奖项路径",
    description: "把奖项作为发现线索，而不是把获奖等同于适合入门。"
  }
] as const;

export function getMovementById(id: string) {
  return movements.find((movement) => movement.id === id) ?? null;
}

export function getWorkById(id: string) {
  return works.find((work) => work.id === id) ?? null;
}

export function getReadingPathBySlug(slug: string) {
  return readingPaths.find((path) => path.slug === slug || path.id === slug) ?? null;
}

export function getAwardById(id: string) {
  return awards.find((award) => award.id === id) ?? null;
}

export function beginnerWorks(limit?: number) {
  const result = works.filter((work) => work.beginnerEntry);
  return typeof limit === "number" ? result.slice(0, limit) : result;
}

export function beginnerFriendlyWorks(limit?: number) {
  const result = works.filter((work) => work.difficultyLevel <= 2);
  return typeof limit === "number" ? result.slice(0, limit) : result;
}

export function movementName(id: string) {
  return getMovementById(id)?.label ?? id;
}

export function pathsByType(type: string) {
  return readingPaths.filter((path) => path.type === type);
}

export function firstPathByType(type: string) {
  return pathsByType(type)[0] ?? readingPaths[0] ?? null;
}

export function pathGroupCounts() {
  return pathGroups.map((group) => ({
    ...group,
    count: pathsByType(group.id).length
  }));
}

export function workSearchText(work: (typeof works)[number]) {
  return [
    (work as any).titleOriginal,
    (work as any).titleTranslatedCn ?? "",
    work.titleDisplayCn,
    work.authorName,
    work.countryOrRegion,
    work.literaryCategory,
    work.literarySubcategory,
    ...work.movementIds.map(movementName)
  ].join(" ");
}

export function filterWorks(filters: WorkFilterInput = {}) {
  const query = filters.query?.trim().toLowerCase() ?? "";
  const category = filters.category ?? "";
  const subcategory = filters.subcategory ?? "";
  const difficulty = filters.difficulty ? String(filters.difficulty) : "";
  const region = filters.region ?? "";
  const country = filters.country ?? "";
  const movement = filters.movement ?? "";
  const beginner = filters.beginner ?? "";

  const filtered = works.filter((work) => {
    if (query && !workSearchText(work).toLowerCase().includes(query)) return false;
    if (category && work.literaryCategory !== category) return false;
    if (subcategory && work.literarySubcategory !== subcategory) return false;
    if (difficulty && String(work.difficultyLevel) !== difficulty) return false;
    if (region && work.countryOrRegion !== region) return false;
    if (country && work.countryOrRegion !== country) return false;
    if (movement && !(work.movementIds as readonly string[]).includes(movement)) return false;
    if (beginner === "yes" && !work.beginnerEntry) return false;
    if (beginner === "no" && work.beginnerEntry) return false;
    return true;
  });

  const sort = filters.sort ?? "year-desc";
  return [...filtered].sort((a, b) => {
    switch (sort) {
      case "year-asc":
        return (a.firstPublishedYear ?? 9999) - (b.firstPublishedYear ?? 9999);
      case "year-desc":
        return (b.firstPublishedYear ?? 0) - (a.firstPublishedYear ?? 0);
      case "difficulty":
        return a.difficultyLevel - b.difficultyLevel;
      case "title":
        return a.titleDisplayCn.localeCompare(b.titleDisplayCn, "zh-CN");
      default:
        return 0;
    }
  });
}

export function countBy<T extends string>(items: readonly T[]) {
  return items.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] ?? 0) + 1;
    return acc;
  }, {});
}

export function topEntries(counts: Record<string, number>, limit = 12) {
  return Object.entries(counts)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], "zh-CN"))
    .slice(0, limit);
}

export function workFilterFacets(limit = 12) {
  const categoryEntries = topEntries(countBy(works.map((work) => work.literaryCategory)), limit);
  const subcategoryEntries = topEntries(countBy(works.map((work) => work.literarySubcategory)), 16);
  const regionEntries = topEntries(countBy(works.map((work) => work.countryOrRegion).filter((item) => item !== "待补充")), limit);
  const movementEntries = movements
    .map((item) => [item.id, movementName(item.id), works.filter((work) => (work.movementIds as readonly string[]).includes(item.id)).length] as const)
    .filter((item) => item[2] > 0)
    .sort((left, right) => right[2] - left[2])
    .slice(0, limit);

  return {
    categoryEntries,
    subcategoryEntries,
    regionEntries,
    movementEntries,
    categoryCount: new Set(works.map((work) => work.literarySubcategory)).size
  };
}

export function searchBookPath(query: string, scope: SearchScope = "all") {
  const normalized = query.trim().toLowerCase();
  const empty = { movements: [], works: [], readingPaths: [], awards: [] };
  if (!normalized) return empty;

  const result = {
    movements: movements.filter((item) =>
      [
        item.label,
        item.originalName,
        item.period,
        item.region,
        item.oneLine,
        item.definitionPrecise,
        item.whyAppeared,
        item.reactsAgainst,
        item.keyFeatures.join(" "),
        item.relatedMovements.join(" ")
      ].join(" ").toLowerCase().includes(normalized)
    ),
    works: works.filter((item) =>
      [
        (item as any).titleOriginal,
        (item as any).titleTranslatedCn ?? "",
        item.titleDisplayCn,
        item.authorName,
        item.countryOrRegion,
        item.literaryCategory,
        item.literarySubcategory
      ].join(" ").toLowerCase().includes(normalized)
    ),
    readingPaths: readingPaths.filter((item) =>
      [
        item.title,
        item.description,
        item.targetReader,
        item.type,
        item.difficultyRange,
        item.steps.map((step) => `${(step as any).titleOriginal} ${(step as any).titleTranslatedCn} ${step.reason}`).join(" ")
      ].join(" ").toLowerCase().includes(normalized)
    ),
    awards: awards.filter((item) =>
      [
        item.titleCn,
        item.originalName,
        item.countryOrRegion,
        item.awardType,
        item.beginnerValue
      ].join(" ").toLowerCase().includes(normalized)
    )
  };

  return {
    movements: scope === "all" || scope === "movements" ? result.movements : [],
    works: scope === "all" || scope === "works" ? result.works : [],
    readingPaths: scope === "all" || scope === "paths" ? result.readingPaths : [],
    awards: scope === "all" || scope === "awards" ? result.awards : []
  };
}



export const authorBios: Record<string, AuthorBio> = {
  "荷马": {
    name: "荷马",
    nationality: "古希腊",
    description: "古希腊盲诗人，西方文学的开端。《伊利亚特》和《奥德赛》据传为他的作品。关于荷马是否存在、是一个人还是一群诗人，学术界争论了两千年。",
    whyImportant: "荷马史诗是西方文学真正的源头。从维吉尔到但丁，从乔伊斯到科恩——三千年来每一个重要的西方作家都在和荷马对话。不读荷马就不知道'史诗'是什么。",
    recommendedFor: "适合对西方文学起源有兴趣的读者。如果觉得史诗太长，可以先读现代改写版。",
  },
  "莎士比亚": {
    name: "威廉·莎士比亚",
    nationality: "英国",
    born: "1564",
    died: "1616",
    description: "英语文学的最高峰。37部戏剧、154首十四行诗。演员出身，生前已是伦敦最受欢迎的剧作家。死后被尊为'艾文河的天鹅'，影响力远超所有同行。",
    whyImportant: "莎士比亚不是书架上落灰的经典——在他那个时代他是大众娱乐的提供者。他创造的词汇和短语改变了英语本身。没有他就没有现代英语文学。",
    recommendedFor: "适合所有读者。先看一部改编电影，再读剧本——知道剧情后再读原文会轻松很多。",
  },
  "老子": {
    name: "老子", nationality: "中国",
    description: "春秋时期思想家，道家学派创始人。据传曾任周朝守藏室之史，后西出函谷关，应关令尹喜之请写下《道德经》五千言，之后不知所踪。",
    whyImportant: "《道德经》是世界上译本数量仅次于《圣经》的著作。'道可道非常道''上善若水''无为而治'——这些概念两千五百年来塑造了中国人理解世界的方式。",
    recommendedFor: "适合所有读者。篇幅极短（五千字），适合反复读。不同年纪读会有不同理解。",
  },
  "孔子": {
    name: "孔子", nationality: "中国", born: "-551", died: "-479",
    description: "春秋时期思想家、教育家，儒家学派创始人。首开私学之风，有弟子三千。晚年整理六经。被后世尊为'至圣先师'。",
    whyImportant: "孔子是中国文化的塑造者。'己所不欲勿施于人''有教无类''学而不思则罔'——这些观念两千多年来一直是中国人的伦理准则。",
    recommendedFor: "适合所有读者。选带翻译的版本，先读学而篇和为政篇。",
  },
  "屈原": {
    name: "屈原", nationality: "中国", born: "-340", died: "-278",
    description: "战国时期楚国诗人、政治家。因政治理想破灭，投汨罗江自尽。端午节据说就是为了纪念他。",
    whyImportant: "中国第一位有个性的诗人。《离骚》是中国文学史上第一篇以个人为主角的长诗。他开创了'香草美人'的诗歌传统。",
    recommendedFor: "适合对中国古典诗歌有兴趣的读者。选带详细注释的版本。",
  },
  "李白": {
    name: "李白", nationality: "中国", born: "701", died: "762",
    description: "唐代诗人，被后人尊为'诗仙'。一生好酒、好剑、好游历。曾入翰林院，但因性格放旷不受约束，赐金放还。",
    whyImportant: "中国诗歌想象力的极限。'飞流直下三千尺''轻舟已过万重山''天子呼来不上船'——李白把中文的可能性发挥到了极致。",
    recommendedFor: "适合所有读者。李白的诗不需要解读——直接读就能感受到语言的美。",
  },
  "杜甫": {
    name: "杜甫", nationality: "中国", born: "712", died: "770",
    description: "唐代诗人，被后人尊为'诗圣'。一生颠沛流离，亲眼目睹了安史之乱给人民带来的苦难。他的诗被称为'诗史'。",
    whyImportant: "如果说李白是天才，杜甫就是'地才'——他的每一字都是苦吟出来的。'朱门酒肉臭路有冻死骨''安得广厦千万间'——他替普通人说话。",
    recommendedFor: "适合所有读者。先读他的绝句（两个黄鹂鸣翠柳）再读律诗。",
  },
  "苏轼": {
    name: "苏轼", nationality: "中国", born: "1037", died: "1101",
    description: "北宋文学家、书画家、美食家。号东坡居士。一生被贬谪三次——最远到海南——但从未失去对生活的热爱。",
    whyImportant: "中国最全才的文人和最受欢迎的灵魂。'大江东去'的豪放和'十年生死两茫茫'的深情出现在同一个人笔下。他发明的东坡肉到今天还是家常菜。",
    recommendedFor: "适合所有读者。先读'念奴娇·赤壁怀古'和'水调歌头·明月几时有'。",
  },
  "曹雪芹": {
    name: "曹雪芹", nationality: "中国", born: "1715", died: "1763",
    description: "清代小说家。出身贵族家庭，幼年家道中落。在北京西郊的贫困中写作《红楼梦》，'批阅十载，增删五次'。未完成即辞世。",
    whyImportant: "《红楼梦》是中国古典小说的高峰，'红学'是唯一以一部小说命名的学科。曹雪芹写了四百多个人物，没有一个重复的。",
    recommendedFor: "适合已有一定阅读耐心的读者。人物众多（建议准备谱系图），但值得投入。前五回是总纲，第六回开始流畅。",
  },
  "鲁迅": {
    name: "鲁迅", nationality: "中国", born: "1881", died: "1936",
    description: "中国现代文学之父。原名周树人，弃医从文。代表作《狂人日记》《阿Q正传》。他的杂文以犀利著称，今天读来仍然有战斗力。",
    whyImportant: "鲁迅是中国现代文学的起点。他第一个用白话文写出有分量的文学作品。他塑造的'阿Q'是中国人自我认识的重要镜子。",
    recommendedFor: "适合所有读者。先读《呐喊》和《彷徨》中的短篇小说，再读杂文。",
  },
  "老舍": {
    name: "老舍", nationality: "中国", born: "1899", died: "1966",
    description: "中国现代小说家、剧作家。北京人，用北京话写北京。代表作《骆驼祥子》《四世同堂》《茶馆》。1966年被迫害致死。",
    whyImportant: "老舍写北京没人比得上——胡同里的吆喝声、鸽哨声、邻里之间的闲话，活生生的北京。他的幽默是含着泪的。",
    recommendedFor: "适合所有读者。《茶馆》最短但最精炼，三幕写尽半个世纪的中国。",
  },
  "加西亚·马尔克斯": {
    name: "加西亚·马尔克斯", nationality: "哥伦比亚", born: "1927", died: "2014",
    description: "哥伦比亚作家，1982年诺贝尔文学奖得主。拉美文学大爆炸的核心人物。记者出身，晚年与癌症抗争多年。",
    whyImportant: "《百年孤独》让全世界知道拉美文学不需要模仿欧洲——他们有属于自己的叙事声音。马尔克斯把'魔幻现实主义'变成了一张拉丁美洲的文化名片。",
    recommendedFor: "想感受'另一种叙事声音'的读者。如果《百年孤独》人物太多记不住，可以从《霍乱时期的爱情》开始。",
  },
  "博尔赫斯": {
    name: "豪尔赫·路易斯·博尔赫斯", nationality: "阿根廷", born: "1899", died: "1986",
    description: "阿根廷作家、诗人、图书馆馆长。晚年失明，但依然写作。他的短篇小说改变了全世界对'小说能是什么'的理解。",
    whyImportant: "博尔赫斯把小说变成了哲学思想实验——'如果世界是一本书，读者是谁？'他的每一篇短篇都是一个观念的迷宫。",
    recommendedFor: "适合喜欢智力游戏的读者。先读《小径分岔的花园》和《阿莱夫》。",
  },
  "村上春树": {
    name: "村上春树", nationality: "日本", born: "1949",
    description: "日本当代作家。29岁那年看棒球赛时突然决定写小说。处女作《且听风吟》获群像新人奖。长年陪跑诺贝尔文学奖。",
    whyImportant: "村上春树是让西方读者喜欢上日本文学的作家。他的小说充满爵士乐、猫、意大利面和超现实事件。他用最轻盈的语言写最沉重的主题。",
    recommendedFor: "从《挪威的森林》开始——这是他最'正常'的小说。喜欢后再试他的超现实作品。",
  },
  "川端康成": {
    name: "川端康成", nationality: "日本", born: "1899", died: "1972",
    description: "日本作家，1968年诺贝尔文学奖得主。以极致的日本美学——'物哀'——征服了世界。1972年自杀身亡。",
    whyImportant: "川端康成用最少的字写了最浓的意境。他的小说像日本庭院——留白比填充更重要。他是日本文学走向世界的标志性人物。",
    recommendedFor: "先读《雪国》——它是最能代表川端风格的作品。篇幅短，但值得重读。",
  },
  "三岛由纪夫": {
    name: "三岛由纪夫", nationality: "日本", born: "1925", died: "1970",
    description: "日本作家、剧作家。两次入围诺贝尔文学奖。1970年率私人武装闯入自卫队基地发表演说后切腹自杀。",
    whyImportant: "三岛是日本文学中最极端的声音——他迷恋死亡、武士道和肉体美。他的写作和死亡方式一样令人震惊。",
    recommendedFor: "建议先读《金阁寺》——它集中体现了三岛的核心主题：美与毁灭的关系。",
  },
  "太宰治": {
    name: "太宰治", nationality: "日本", born: "1909", died: "1948",
    description: "日本作家，无赖派文学的代表。一生多次自杀未遂，1948年与情人投水自尽。遗作《人间失格》是他的自传性绝笔。",
    whyImportant: "太宰治不是'丧'——他是太敏感了以至于无法在世界中生存。《人间失格》让人不安，因为它说出了很多人不敢说的感受。",
    recommendedFor: "适合在情绪稳定时阅读。读完如果觉得压抑，请记住——这不代表生活没有希望。",
  },
  "普鲁斯特": {
    name: "马塞尔·普鲁斯特", nationality: "法国", born: "1871", died: "1922",
    description: "法国作家。因哮喘病在封闭的房间中度过生命最后十五年，用这段时间写出了《追忆似水年华》。",
    whyImportant: "普鲁斯特改变了小说——他不讲故事，他追踪意识的流动。'一块玛德莱娜蛋糕蘸进茶里'引发的回忆是20世纪文学最著名的段落之一。",
    recommendedFor: "准备好投入大量时间再开始。每天读20-30页即可。不要急于读完——普鲁斯特是用来生活的。",
  },
  "加缪": {
    name: "阿尔贝·加缪", nationality: "法国/阿尔及利亚", born: "1913", died: "1960",
    description: "法国作家、哲学家，1957年诺贝尔文学奖得主。44岁死于车祸。他的作品关注'荒谬'——人在没有上帝的世界里如何生活。",
    whyImportant: "加缪是'荒谬哲学'最清晰的表达者。他的小说比萨特的哲学著作好读，因为他用故事而不是理论来传达思想。",
    recommendedFor: "从《局外人》开始（不到150页）。如果不适应默尔索的冷漠，再试《鼠疫》。",
  },
  "托尔斯泰": {
    name: "列夫·托尔斯泰", nationality: "俄国", born: "1828", died: "1910",
    description: "俄国作家、思想家。出身贵族但晚年追求平民生活。82岁时离家出走，病逝于小火车站。",
    whyImportant: "托尔斯泰的小说不是'读'的——是'活'的。他的角色比真实的人更真实。他是现实主义小说的顶峰。",
    recommendedFor: "从《安娜·卡列尼娜》开始——它比《战争与和平》短，同样伟大。",
  },
  "陀思妥耶夫斯基": {
    name: "费奥多尔·陀思妥耶夫斯基", nationality: "俄国", born: "1821", died: "1881",
    description: "俄国作家。因参与地下政治活动被判死刑，在行刑前最后一刻被改判流放。在西伯利亚服了四年苦役。这段经历彻底改变了他的写作。",
    whyImportant: "陀思妥耶夫斯基对人类心理黑暗面的挖掘前无古人。尼采说他是'唯一让我学到东西的心理学家'。",
    recommendedFor: "从《罪与罚》开始。它像犯罪小说一样有悬念——不是'谁干的'（一开始就知道），而是'他能承受吗'。",
  },
  "卡夫卡": {
    name: "弗兰茨·卡夫卡", nationality: "捷克/德语", born: "1883", died: "1924",
    description: "捷克裔德语作家。白天是保险公司职员，晚上写作。去世前嘱托好友布罗德烧掉所有手稿——布罗德没有照做，而是出版了它们。",
    whyImportant: "卡夫卡的作品预见了20世纪的官僚主义恐怖。'卡夫卡式'已经成为日常语言——用来描述那种荒诞、压抑、找不到原因却无处可逃的处境。",
    recommendedFor: "从《变形记》开始——极短（不到100页），是进入卡夫卡世界最好的入口。",
  },
  "马尔克斯": {
    name: "加西亚·马尔克斯", nationality: "哥伦比亚", born: "1927", died: "2014",
    description: "哥伦比亚作家，1982年诺贝尔文学奖得主。拉美文学大爆炸的核心人物。记者出身。",
    whyImportant: "《百年孤独》让全世界认识了拉美文学的独特魅力。马尔克斯的叙事声音像在讲一个早就知道的故事——这种'事先知道'的语调本身就是魔幻现实主义的一部分。",
    recommendedFor: "先读《霍乱时期的爱情》，再挑战《百年孤独》。",
  },
  "福楼拜": {
    name: "居斯塔夫·福楼拜", nationality: "法国", born: "1821", died: "1880",
    description: "法国作家。用五年时间写《包法利夫人》，每一句都反复打磨。是'小说的艺术'的完美主义者。",
    whyImportant: "福楼拜是现代小说的奠基人之一。他创立了'非个人化叙事'——叙述者不评判角色，只呈现。这个原则影响了此后所有的小说写作。",
    recommendedFor: "适合对小说技法有兴趣的读者。《包法利夫人》值得读至少两遍。",
  },
  "雨果": {
    name: "维克多·雨果", nationality: "法国", born: "1802", died: "1885",
    description: "法国作家、诗人、剧作家。法国浪漫主义的旗手。政治上流亡多年。逝世后灵柩在凯旋门下停灵一夜，超过两百万人参加葬礼。",
    whyImportant: "雨果是法国文学中'容量'最大的作家——他的小说不只是故事，还是历史、建筑、政治的百科全书。《悲惨世界》是19世纪最伟大的社会小说。",
    recommendedFor: "喜欢宏大叙事的读者。从《巴黎圣母院》开始（篇幅较短），再读《悲惨世界》。",
  },
  "大仲马": {
    name: "亚历山大·大仲马", nationality: "法国", born: "1802", died: "1870",
    description: "法国作家。有非洲血统（祖母是海地黑人奴隶）。一生写了超过300部作品，是最高产的经典作家之一。",
    whyImportant: "大仲马证明了'好看'和'文学'可以是同一件事。《基督山伯爵》是有史以来最伟大的复仇故事——一千多页没有一页无聊。",
    recommendedFor: "适合所有读者。从《基督山伯爵》开始——它可能是史上最好读的经典长篇小说。",
  },
  "歌德": {
    name: "约翰·沃尔夫冈·冯·歌德", nationality: "德国", born: "1749", died: "1832",
    description: "德国作家、诗人、科学家、政治家。德国文学的第一人。用60年写成《浮士德》。他的兴趣和研究范围涵盖了文学、哲学、自然科学、绘画等几乎所有领域。",
    whyImportant: "歌德是德意志文化精神的化身。《浮士德》不是一部作品——它是一个人用一生思考留下的痕迹。",
    recommendedFor: "适合有古典文学和哲学基础的读者。从《少年维特的烦恼》开始——它比《浮士德》好入口。",
  },
  "但丁": {
    name: "但丁·阿利吉耶里", nationality: "意大利", born: "1265", died: "1321",
    description: "意大利诗人，意大利语的奠基人之一。因政治斗争被流放，终生未能返回佛罗伦萨。在流放中写成了《神曲》。",
    whyImportant: "《神曲》用意大利俗语写成而不是拉丁文——这一选择让意大利语成为了文学语言。它创造的地狱九圈形象至今主导着西方人对死后世界的想象。",
    recommendedFor: "需要耐心和注释的读者。选一个注释详细的译本，不要追求一次读懂全部。",
  },
  "塞万提斯": {
    name: "米格尔·德·塞万提斯", nationality: "西班牙", born: "1547", died: "1616",
    description: "西班牙作家。参加过勒班陀海战并失去左手。曾被海盗俘虏五年。晚年贫困，却在监狱中构思出了《堂吉诃德》。",
    whyImportant: "《堂吉诃德》被公认为现代小说的开端。在此之前的文学讲的是英雄的冒险——塞万提斯开始写'人'：一个读了太多骑士小说的老人出门行侠仗义，把风车当成了巨人。",
    recommendedFor: "从第一部开始读（风车大战、客栈城堡都在第一部）。第二部更深刻但节奏更慢。",
  },
};

export { setStorageBackend, storage } from "./services/storage";
export type { StorageBackend } from "./services/storage";
export { isFavorited, toggleFavorite, getAllFavorites, removeFavorite } from "./services/favorites";
export { setStatus, getStatus, removeStatus, getAllReading, statusLabel, allStatuses } from "./services/reading";
export type { ReadingStatus } from "./services/reading";
export { getTheme, setTheme } from "./services/theme";
export type { ThemeMode } from "./services/theme";
export { isFirstLaunch, markOnboardingComplete } from "./services/onboarding";
export { cacheData, getCachedData, clearCache } from "./services/cache";

export function countSearchResults(results: ReturnType<typeof searchBookPath>) {
  return results.movements.length + results.works.length + results.readingPaths.length + results.awards.length;
}
