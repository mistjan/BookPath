import fs from "fs";
const R = fs.readFileSync("lib/bookpath-data.ts", "utf-8");
const O = R.indexOf("{", R.indexOf("export const bookPathData = "));
let d = 0, E = O;
for (let i = O; i < R.length; i++) { if (R[i] === "{") d++; else if (R[i] === "}") { d--; if (d === 0) { E = i + 1; break; } } }
const D = JSON.parse(R.slice(O, E));

function setWarning(id, text) {
  const m = D.movements.find(x => x.id === id);
  if (!m) return console.log("Not found:", id);
  m.beginnerWarning = text;
  console.log("✅", id);
}

// These all have the generic "可以先从情节清楚..." template
const generic = [
  ["cyberpunk", "赛博朋克以密集的未来设定著称，如果觉得《神经漫游者》太硬，可以从《银翼杀手》电影入门再读小说，或者从《钻石年代》这类更接近成长故事的赛博朋克开始。"],
  ["science-fiction", "科幻的范围极广，不要从太空歌剧或硬科幻的经典开始。建议从《火星救援》（幽默务实）或《永恒的战争》（战争反思）这些更接近普通人体验的作品入手。"],
  ["detective-fiction-mystery", "古典本格推理适合喜欢解谜的读者，从阿加莎·克里斯蒂的《无人生还》或《东方快车谋杀案》开始——节奏快、诡计清晰，是体验推理乐趣的最佳入口。"],
  ["gothic-fiction", "哥特小说喜欢营造气氛而不是推进情节，如果觉得《奥特朗托堡》太老派，试试《螺丝在拧紧》或《山屋惊魂》——气氛大于故事，关键是感受而不是理解。"],
  ["drama", "戏剧是用来演的不是用来看的。建议先找NT Live或B站上的演出录像，再读剧本。从《推销员之死》或《玩偶之家》开始——剧情紧凑，两小时就能看完。"],
  ["short-story", "短篇不需要从头到尾按顺序读。选最吸引你的篇目先读。卡佛的《大教堂》、博尔赫斯的《虚构集》、科塔萨尔的《动物寓言集》都是每一篇独立的杰作。"],
  ["children-s-literature", "童书不是'幼稚'的代名词——《爱丽丝漫游奇境》是语言游戏，《地海巫师》是成长寓言。从这些开始，它们用最简单的语言讲最不简单的事。"],
  ["fantasy-literature", "奇幻最容易踩的坑是直接挑战《魔戒》或《权力的游戏》——世界观太庞大。从《地海巫师》或《哈利·波特与魔法石》开始——魔法世界足够迷人，门槛却低得多。"],
  ["horror-literature", "恐怖文学不是比谁的血腥更刺激。从《螺丝在拧紧》（心理恐怖）或《闪灵》（封闭空间的崩溃）开始——好的恐怖让你怕的不是怪物，是你自己。"],
  ["crime-fiction", "犯罪小说不只是找凶手。社会派从《点与线》开始——铁道时刻表推理的巅峰。冷硬派从《马耳他之鹰》开始——硬汉侦探的原型。"],
  ["hardboiled-detective-fiction", "冷硬派的魅力不在诡计在氛围。从钱德勒的《长眠不醒》开始——马洛第一次出场。不要纠结于谁是凶手，享受洛杉矶的夜色和尖刻的对白就够了。"],
  ["social-school-mystery", "社会派推理的重点不是'谁干的'而是'为什么'。从松本清张的《砂器》或《点与线》开始——动机比诡计更重要。"],
  ["honmaku-mystery", "本格推理的核心是公平游戏——线索都摆在你面前。从绫辻行人的《十角馆事件》或阿加莎的《无人生还》开始——挑战自己能不能比侦探先找到答案。"],
  ["golden-age-science-fiction", "黄金时代科幻的设定在今天可能已经过时，但在当时是革命性的。读的时候请调整预期——重要的不是科学准确性，而是那种'仰望星空'的姿态。从阿西莫夫的《我，机器人》开始。"],
  ["new-wave-science-fiction", "新浪潮科幻不关心火箭飞船，关心的是人的内心。从《莱博维茨的赞歌》或《黑暗的左手》开始——它们更像是披着科幻外衣的哲学小说。"],
  ["hard-science-fiction", "硬科幻的核心是科学本身的魅力。从《火星救援》（喜剧本色）或《与拉玛相会》（纯粹的探索好奇）开始——不需要物理学学位也能享受。"],
  ["soft-science-fiction", "软科幻不写物理写社会。从《1984》或《美丽新世界》开始——它们是科幻，但读起来更像对当下世界的隐喻。"],
  ["steampunk", "蒸汽朋克的美学比情节更吸引人。从《差分机》（蒸汽朋克的奠基作）开始——如果维多利亚时代有了计算机，世界会变成什么样？这是一个前提设定大于故事本身的类型。"],
  ["i-novel", "私小说要求读者接受'作者把自己的不堪写出来'这个前提。从太宰治的《人间失格》或田山花袋的《蒲团》开始——它们短，而且会让你不适。不适是正常的。"],
  ["satirical-literature", "讽刺文学有强烈的时代背景，读之前先了解它讽刺的对象是谁。从《动物农场》开始——它短、狠、不需要任何背景知识就能看懂。"],
  ["campus-novel", "校园小说的乐趣在认出身边的原型。从《幸运的吉姆》开始——英国学院喜剧的标杆。中国的校园文学起步较晚，但这不代表没有好作品。"],
  ["allegorical-literature", "寓言文学不是在讲一个故事——是在讲一个道理。从《动物农场》开始——你会在每一页认出它对应了什么历史事件。"],
  ["psychological-novel", "心理小说不依赖情节推进——依赖的是人物内心的变化。从《局外人》开始（篇幅短，第一人称），再尝试《罪与罚》（长篇，但心理密度极高）。"],
];

generic.forEach(([id, text]) => setWarning(id, text));

fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
console.log("\nDone! Updated generic beginnerWarning values.");
