# BookPath 统一生成名称注册表

用途：统一给 AI 批量生成流派、作品导读卡、阅读路径。  
本文件中的字段名必须和三个提示词文档中的变量名保持一致。

---

## 1. 字段统一规则

### 1.1 流派生成输入

必须使用：

```json
{
  "movementName": "现代主义"
}
```

### 1.2 作品导读卡生成输入

必须使用：

```json
{
  "titleOriginal": "L'Étranger",
  "titleTranslatedCn": "局外人",
  "author": "阿尔贝·加缪",
  "year": 1942,
  "movements": ["存在主义文学", "荒诞派", "现代主义"]
}
```

### 1.3 阅读路径生成输入

必须使用：

```json
{
  "pathTitle": "现代主义文学入门",
  "targetReader": "想理解 20 世纪文学变化，但不想一上来读高难度长篇的中文读者",
  "works": []
}
```

### 1.4 名称一致性要求

1. `movementName` 必须与作品条目中的 `movements` 值一致。
2. 阅读路径中的 `works[].titleOriginal` 必须与作品导读卡中的 `titleOriginal` 一致。
3. 阅读路径中的 `works[].titleTranslatedCn` 必须与作品导读卡中的 `titleTranslatedCn` 一致。
4. 中文原作可以让 `titleOriginal` 与 `titleTranslatedCn` 相同。
5. 不确定信息不得硬填，后续应使用“待确认”。

---

## 2. 流派生成队列

> 字段：`movementName`

| movementName | nameOriginal | category | period | region | priority |
|---|---|---|---|---|---|
| 现实主义 | Realism | 文学流派 | 19世纪至今 | 欧洲、俄国、中国等 | 基础 |
| 自然主义 | Naturalism | 文学流派 | 19世纪后期 | 法国、欧洲、美国 | 基础 |
| 批判现实主义 | Critical Realism | 文学流派 | 19世纪 | 欧洲、俄国、中国 | 基础 |
| 现代主义 | Modernism | 文学流派 | 19世纪末至20世纪中期 | 欧洲、北美、世界范围 | 核心 |
| 意识流 | Stream of Consciousness | 写作技法/流派 | 20世纪上半叶 | 英国、法国、美国等 | 核心 |
| 存在主义文学 | Existentialist Literature | 文学思潮 | 20世纪 | 法国、欧洲 | 核心 |
| 荒诞派 | Theatre/Literature of the Absurd | 文学/戏剧流派 | 20世纪中期 | 欧洲 | 核心 |
| 魔幻现实主义 | Magic Realism | 文学流派 | 20世纪 | 拉丁美洲、世界范围 | 核心 |
| 拉美文学爆炸 | Latin American Boom | 文学现象 | 20世纪60—70年代 | 拉丁美洲 | 核心 |
| 后现代主义 | Postmodernism | 文学流派/思潮 | 20世纪中后期 | 欧美、世界范围 | 核心 |
| 黑色幽默 | Black Humor | 文学风格/流派 | 20世纪中期 | 美国、欧洲 | 核心 |
| 垮掉的一代 | Beat Generation | 文学群体 | 20世纪50年代 | 美国 | 扩展 |
| 肮脏现实主义 | Dirty Realism | 文学风格 | 20世纪后期 | 美国 | 扩展 |
| 女性主义文学 | Feminist Literature | 文学思潮 | 20世纪至今 | 世界范围 | 核心 |
| 后殖民文学 | Postcolonial Literature | 文学思潮 | 20世纪中后期至今 | 亚非拉、英语世界 | 核心 |
| 赛博朋克 | Cyberpunk | 类型文学流派 | 20世纪80年代至今 | 美国、日本、世界范围 | 核心 |
| 科幻文学 | Science Fiction | 类型文学 | 19世纪至今 | 世界范围 | 核心 |
| 推理小说 | Detective Fiction / Mystery | 类型文学 | 19世纪至今 | 世界范围 | 核心 |
| 中国现代文学 | Modern Chinese Literature | 文学时期 | 1917—1949 | 中国 | 核心 |
| 中国当代文学 | Contemporary Chinese Literature | 文学时期 | 1949至今 | 中国 | 核心 |
| 中国先锋文学 | Chinese Avant-garde Literature | 文学流派 | 20世纪80年代以来 | 中国大陆 | 核心 |
| 新写实小说 | New Realist Fiction | 文学流派 | 20世纪80年代末至90年代 | 中国大陆 | 核心 |
| 寻根文学 | Root-seeking Literature | 文学流派 | 20世纪80年代 | 中国大陆 | 核心 |
| 伤痕文学 | Scar Literature | 文学流派 | 20世纪70年代末至80年代初 | 中国大陆 | 基础 |
| 反乌托邦文学 | Dystopian Literature | 类型/主题文学 | 20世纪至今 | 世界范围 | 核心 |
| 乌托邦文学 | Utopian Literature | 类型/主题文学 | 16世纪至今 | 世界范围 | 扩展 |
| 哥特小说 | Gothic Fiction | 类型文学 | 18世纪末至今 | 英国、欧洲、美国 | 扩展 |
| 浪漫主义 | Romanticism | 文学流派 | 18世纪末至19世纪上半叶 | 欧洲 | 基础 |
| 象征主义 | Symbolism | 文学流派 | 19世纪后期 | 法国、欧洲 | 扩展 |
| 唯美主义 | Aestheticism | 文学思潮 | 19世纪后期 | 英国、法国 | 扩展 |
| 表现主义 | Expressionism | 文学/艺术流派 | 20世纪初 | 德国、欧洲 | 扩展 |
| 超现实主义 | Surrealism | 文学/艺术流派 | 20世纪初 | 法国、欧洲 | 扩展 |
| 新小说 | Nouveau Roman | 文学流派 | 20世纪中期 | 法国 | 进阶 |
| 元小说 | Metafiction | 写作形式 | 20世纪中后期 | 欧美、世界范围 | 进阶 |
| 新新闻主义 | New Journalism | 非虚构写作 | 20世纪60—70年代 | 美国 | 扩展 |
| 非虚构写作 | Creative Nonfiction | 写作类型 | 20世纪至今 | 世界范围 | 基础 |
| 纪实文学 | Documentary Literature | 写作类型 | 20世纪至今 | 世界范围、中国 | 基础 |
| 历史写作 | History Writing | 阅读门类 | 古代至今 | 世界范围 | 基础 |
| 哲学入门 | Philosophy Introduction | 阅读门类 | 古代至今 | 世界范围 | 基础 |
| 社会学入门 | Sociology Introduction | 阅读门类 | 19世纪至今 | 世界范围 | 基础 |
| 心理学入门 | Psychology Introduction | 阅读门类 | 19世纪至今 | 世界范围 | 基础 |
| 诗歌入门 | Poetry Introduction | 阅读门类 | 古代至今 | 世界范围 | 基础 |
| 戏剧文学 | Drama | 文学类型 | 古代至今 | 世界范围 | 基础 |
| 短篇小说 | Short Story | 文学类型 | 19世纪至今 | 世界范围 | 基础 |
| 成长小说 | Bildungsroman | 类型/结构 | 18世纪至今 | 欧洲、世界范围 | 基础 |
| 家族史诗 | Family Saga | 叙事类型 | 19世纪至今 | 世界范围 | 扩展 |
| 战争文学 | War Literature | 主题文学 | 古代至今 | 世界范围 | 扩展 |
| 城市文学 | Urban Literature | 主题文学 | 19世纪至今 | 世界范围 | 扩展 |
| 乡土文学 | Rural Literature | 主题文学 | 20世纪至今 | 中国、世界范围 | 扩展 |
| 儿童文学 | Children's Literature | 文学类型 | 19世纪至今 | 世界范围 | 基础 |
| 奇幻文学 | Fantasy Literature | 类型文学 | 19世纪至今 | 世界范围 | 基础 |
| 恐怖文学 | Horror Literature | 类型文学 | 18世纪至今 | 世界范围 | 扩展 |
| 犯罪小说 | Crime Fiction | 类型文学 | 19世纪至今 | 世界范围 | 基础 |
| 硬汉派侦探小说 | Hardboiled Detective Fiction | 类型文学 | 20世纪 | 美国 | 扩展 |
| 社会派推理 | Social School Mystery | 类型文学 | 20世纪 | 日本、中国等 | 扩展 |
| 本格推理 | Honmaku Mystery | 类型文学 | 20世纪 | 日本 | 扩展 |
| 科幻黄金时代 | Golden Age Science Fiction | 类型文学阶段 | 20世纪30—50年代 | 美国、英语世界 | 扩展 |
| 新浪潮科幻 | New Wave Science Fiction | 类型文学阶段 | 20世纪60—70年代 | 英国、美国 | 扩展 |
| 硬科幻 | Hard Science Fiction | 类型文学风格 | 20世纪至今 | 世界范围 | 扩展 |
| 软科幻 | Soft Science Fiction | 类型文学风格 | 20世纪至今 | 世界范围 | 扩展 |
| 蒸汽朋克 | Steampunk | 类型文学风格 | 20世纪后期至今 | 世界范围 | 扩展 |
| 气候小说 | Climate Fiction | 类型/主题文学 | 21世纪 | 世界范围 | 扩展 |
| 生态文学 | Ecological Literature | 主题文学 | 20世纪至今 | 世界范围 | 扩展 |
| 移民文学 | Immigrant Literature | 主题文学 | 20世纪至今 | 世界范围 | 扩展 |
| 创伤文学 | Trauma Literature | 主题文学 | 20世纪至今 | 世界范围 | 扩展 |
| 大屠杀文学 | Holocaust Literature | 主题文学 | 20世纪至今 | 欧洲、世界范围 | 进阶 |
| 日本私小说 | I-novel | 文学类型 | 20世纪 | 日本 | 扩展 |
| 日本无赖派 | Buraiha | 文学流派 | 20世纪中期 | 日本 | 扩展 |
| 芥川奖文学 | Akutagawa Prize Literature | 奖项阅读门类 | 20世纪至今 | 日本 | 扩展 |
| 直木奖文学 | Naoki Prize Literature | 奖项阅读门类 | 20世纪至今 | 日本 | 扩展 |
| 茅盾文学奖阅读 | Mao Dun Literature Prize Reading | 奖项阅读门类 | 20世纪80年代至今 | 中国 | 扩展 |
| 鲁迅文学奖阅读 | Lu Xun Literature Prize Reading | 奖项阅读门类 | 20世纪90年代至今 | 中国 | 扩展 |
| 诺贝尔文学奖阅读 | Nobel Literature Reading | 奖项阅读门类 | 1901年至今 | 世界范围 | 核心 |
| 布克奖阅读 | Booker Prize Reading | 奖项阅读门类 | 1969年至今 | 英语世界 | 扩展 |
| 雨果奖阅读 | Hugo Award Reading | 奖项阅读门类 | 1953年至今 | 科幻/奇幻世界 | 扩展 |
| 小说入门 | Fiction Introduction | 阅读门类 | 古代至今 | 世界范围 | 基础 |
| 讽刺文学 | Satirical Literature | 文学类型/风格 | 古代至今 | 世界范围 | 基础 |
| 日本现代文学 | Modern Japanese Literature | 文学时期/门类 | 20世纪至今 | 日本 | 扩展 |
| 校园小说 | Campus Novel | 类型文学 | 20世纪至今 | 世界范围 | 扩展 |
| 寓言文学 | Allegorical Literature | 文学类型/叙事方式 | 古代至今 | 世界范围 | 基础 |
| 美学小说 | Aesthetic Novel | 阅读门类 | 19世纪至今 | 世界范围 | 扩展 |
| 心理小说 | Psychological Novel | 文学类型 | 19世纪至今 | 世界范围 | 基础 |

---

## 3. 流派生成 JSONL

可逐行喂给 AI 或脚本。

```jsonl
{"movementName": "现实主义"}
{"movementName": "自然主义"}
{"movementName": "批判现实主义"}
{"movementName": "现代主义"}
{"movementName": "意识流"}
{"movementName": "存在主义文学"}
{"movementName": "荒诞派"}
{"movementName": "魔幻现实主义"}
{"movementName": "拉美文学爆炸"}
{"movementName": "后现代主义"}
{"movementName": "黑色幽默"}
{"movementName": "垮掉的一代"}
{"movementName": "肮脏现实主义"}
{"movementName": "女性主义文学"}
{"movementName": "后殖民文学"}
{"movementName": "赛博朋克"}
{"movementName": "科幻文学"}
{"movementName": "推理小说"}
{"movementName": "中国现代文学"}
{"movementName": "中国当代文学"}
{"movementName": "中国先锋文学"}
{"movementName": "新写实小说"}
{"movementName": "寻根文学"}
{"movementName": "伤痕文学"}
{"movementName": "反乌托邦文学"}
{"movementName": "乌托邦文学"}
{"movementName": "哥特小说"}
{"movementName": "浪漫主义"}
{"movementName": "象征主义"}
{"movementName": "唯美主义"}
{"movementName": "表现主义"}
{"movementName": "超现实主义"}
{"movementName": "新小说"}
{"movementName": "元小说"}
{"movementName": "新新闻主义"}
{"movementName": "非虚构写作"}
{"movementName": "纪实文学"}
{"movementName": "历史写作"}
{"movementName": "哲学入门"}
{"movementName": "社会学入门"}
{"movementName": "心理学入门"}
{"movementName": "诗歌入门"}
{"movementName": "戏剧文学"}
{"movementName": "短篇小说"}
{"movementName": "成长小说"}
{"movementName": "家族史诗"}
{"movementName": "战争文学"}
{"movementName": "城市文学"}
{"movementName": "乡土文学"}
{"movementName": "儿童文学"}
{"movementName": "奇幻文学"}
{"movementName": "恐怖文学"}
{"movementName": "犯罪小说"}
{"movementName": "硬汉派侦探小说"}
{"movementName": "社会派推理"}
{"movementName": "本格推理"}
{"movementName": "科幻黄金时代"}
{"movementName": "新浪潮科幻"}
{"movementName": "硬科幻"}
{"movementName": "软科幻"}
{"movementName": "蒸汽朋克"}
{"movementName": "气候小说"}
{"movementName": "生态文学"}
{"movementName": "移民文学"}
{"movementName": "创伤文学"}
{"movementName": "大屠杀文学"}
{"movementName": "日本私小说"}
{"movementName": "日本无赖派"}
{"movementName": "芥川奖文学"}
{"movementName": "直木奖文学"}
{"movementName": "茅盾文学奖阅读"}
{"movementName": "鲁迅文学奖阅读"}
{"movementName": "诺贝尔文学奖阅读"}
{"movementName": "布克奖阅读"}
{"movementName": "雨果奖阅读"}
{"movementName": "小说入门"}
{"movementName": "讽刺文学"}
{"movementName": "日本现代文学"}
{"movementName": "校园小说"}
{"movementName": "寓言文学"}
{"movementName": "美学小说"}
{"movementName": "心理小说"}
```

---

## 4. 作品导读卡生成队列

> 字段：`titleOriginal`、`titleTranslatedCn`、`author`、`year`、`movements`

| titleOriginal | titleTranslatedCn | author | year | movements |
|---|---|---:|---:|---|
| Don Quijote de la Mancha | 堂吉诃德 | 米格尔·德·塞万提斯 | 1605 | 现实主义、小说入门 |
| Robinson Crusoe | 鲁滨逊漂流记 | 丹尼尔·笛福 | 1719 | 现实主义、成长小说 |
| Gulliver's Travels | 格列佛游记 | 乔纳森·斯威夫特 | 1726 | 讽刺文学、奇幻文学 |
| Faust | 浮士德 | 约翰·沃尔夫冈·冯·歌德 | 1808 | 浪漫主义、戏剧文学 |
| Frankenstein; or, The Modern Prometheus | 弗兰肯斯坦 | 玛丽·雪莱 | 1818 | 哥特小说、科幻文学 |
| Le Rouge et le Noir | 红与黑 | 司汤达 | 1830 | 现实主义、成长小说 |
| Eugénie Grandet | 欧也妮·葛朗台 | 奥诺雷·德·巴尔扎克 | 1833 | 现实主义、批判现实主义 |
| Le Père Goriot | 高老头 | 奥诺雷·德·巴尔扎克 | 1835 | 现实主义、批判现实主义 |
| The Pickwick Papers | 匹克威克外传 | 查尔斯·狄更斯 | 1837 | 现实主义、批判现实主义 |
| Oliver Twist | 雾都孤儿 | 查尔斯·狄更斯 | 1838 | 现实主义、批判现实主义 |
| A Christmas Carol | 圣诞颂歌 | 查尔斯·狄更斯 | 1843 | 现实主义、短篇小说 |
| Jane Eyre | 简·爱 | 夏洛蒂·勃朗特 | 1847 | 现实主义、女性主义文学、成长小说 |
| Wuthering Heights | 呼啸山庄 | 艾米莉·勃朗特 | 1847 | 哥特小说、浪漫主义 |
| Madame Bovary | 包法利夫人 | 居斯塔夫·福楼拜 | 1857 | 现实主义、自然主义 |
| A Tale of Two Cities | 双城记 | 查尔斯·狄更斯 | 1859 | 现实主义、历史写作 |
| Great Expectations | 远大前程 | 查尔斯·狄更斯 | 1861 | 现实主义、成长小说 |
| Les Misérables | 悲惨世界 | 维克多·雨果 | 1862 | 浪漫主义、现实主义 |
| Crime and Punishment | 罪与罚 | 费奥多尔·陀思妥耶夫斯基 | 1866 | 现实主义、存在主义文学 |
| War and Peace | 战争与和平 | 列夫·托尔斯泰 | 1869 | 现实主义、战争文学、家族史诗 |
| Middlemarch | 米德尔马契 | 乔治·艾略特 | 1871 | 现实主义、女性主义文学 |
| Anna Karenina | 安娜·卡列尼娜 | 列夫·托尔斯泰 | 1877 | 现实主义 |
| The Brothers Karamazov | 卡拉马佐夫兄弟 | 费奥多尔·陀思妥耶夫斯基 | 1880 | 现实主义、存在主义文学、哲学入门 |
| The Adventures of Huckleberry Finn | 哈克贝利·费恩历险记 | 马克·吐温 | 1884 | 现实主义、成长小说 |
| Germinal | 萌芽 | 埃米尔·左拉 | 1885 | 自然主义、现实主义 |
| The Strange Case of Dr Jekyll and Mr Hyde | 化身博士 | 罗伯特·路易斯·史蒂文森 | 1886 | 哥特小说、科幻文学 |
| The Picture of Dorian Gray | 道林·格雷的画像 | 奥斯卡·王尔德 | 1890 | 唯美主义、哥特小说 |
| Tess of the d'Urbervilles | 德伯家的苔丝 | 托马斯·哈代 | 1891 | 现实主义、自然主义 |
| The Yellow Wallpaper | 黄色墙纸 | 夏洛特·珀金斯·吉尔曼 | 1892 | 女性主义文学、短篇小说 |
| The Time Machine | 时间机器 | 赫伯特·乔治·威尔斯 | 1895 | 科幻文学、反乌托邦文学 |
| Dracula | 德古拉 | 布拉姆·斯托克 | 1897 | 哥特小说、恐怖文学 |
| Heart of Darkness | 黑暗的心 | 约瑟夫·康拉德 | 1899 | 现代主义、后殖民文学 |
| The Hound of the Baskervilles | 巴斯克维尔的猎犬 | 阿瑟·柯南·道尔 | 1902 | 推理小说 |
| The Call of the Wild | 野性的呼唤 | 杰克·伦敦 | 1903 | 自然主义、现实主义 |
| The Jungle | 屠场 | 厄普顿·辛克莱 | 1906 | 自然主义、现实主义 |
| A Room with a View | 看得见风景的房间 | E·M·福斯特 | 1908 | 现代主义、现实主义 |
| Kokoro | 心 | 夏目漱石 | 1914 | 日本现代文学、心理小说 |
| Rashōmon | 罗生门 | 芥川龙之介 | 1915 | 短篇小说、日本现代文学 |
| The Metamorphosis | 变形记 | 弗兰茨·卡夫卡 | 1915 | 现代主义、荒诞派 |
| A Portrait of the Artist as a Young Man | 一个青年艺术家的画像 | 詹姆斯·乔伊斯 | 1916 | 现代主义、成长小说 |
| Winesburg, Ohio | 小城畸人 | 舍伍德·安德森 | 1919 | 现代主义、短篇小说 |
| The Age of Innocence | 纯真年代 | 伊迪丝·华顿 | 1920 | 现实主义、女性主义文学 |
| Siddhartha | 悉达多 | 赫尔曼·黑塞 | 1922 | 现代主义、哲学入门 |
| Ulysses | 尤利西斯 | 詹姆斯·乔伊斯 | 1922 | 现代主义、意识流 |
| 呐喊 | 呐喊 | 鲁迅 | 1923 | 中国现代文学、短篇小说 |
| Mrs Dalloway | 达洛维夫人 | 弗吉尼亚·伍尔夫 | 1925 | 现代主义、意识流、女性主义文学 |
| The Great Gatsby | 了不起的盖茨比 | F·斯科特·菲茨杰拉德 | 1925 | 现代主义、现实主义 |
| The Trial | 审判 | 弗兰茨·卡夫卡 | 1925 | 现代主义、荒诞派 |
| The Castle | 城堡 | 弗兰茨·卡夫卡 | 1926 | 现代主义、荒诞派 |
| The Murder of Roger Ackroyd | 罗杰疑案 | 阿加莎·克里斯蒂 | 1926 | 推理小说、本格推理 |
| 彷徨 | 彷徨 | 鲁迅 | 1926 | 中国现代文学、短篇小说 |
| Steppenwolf | 荒原狼 | 赫尔曼·黑塞 | 1927 | 现代主义、存在主义文学 |
| To the Lighthouse | 到灯塔去 | 弗吉尼亚·伍尔夫 | 1927 | 现代主义、意识流、女性主义文学 |
| A Farewell to Arms | 永别了，武器 | 欧内斯特·海明威 | 1929 | 现代主义、战争文学 |
| The Sound and the Fury | 喧哗与骚动 | 威廉·福克纳 | 1929 | 现代主义、意识流 |
| The Maltese Falcon | 马耳他之鹰 | 达希尔·哈米特 | 1930 | 推理小说、硬汉派侦探小说 |
| Brave New World | 美丽新世界 | 阿道司·赫胥黎 | 1932 | 反乌托邦文学、科幻文学 |
| 子夜 | 子夜 | 茅盾 | 1933 | 中国现代文学、现实主义 |
| 家 | 家 | 巴金 | 1933 | 中国现代文学、现实主义 |
| Tender Is the Night | 夜色温柔 | F·斯科特·菲茨杰拉德 | 1934 | 现代主义 |
| The Postman Always Rings Twice | 邮差总按两遍铃 | 詹姆斯·M·凯恩 | 1934 | 犯罪小说、硬汉派侦探小说 |
| 边城 | 边城 | 沈从文 | 1934 | 中国现代文学、乡土文学 |
| 故事新编 | 故事新编 | 鲁迅 | 1936 | 中国现代文学、短篇小说、后现代主义 |
| 骆驼祥子 | 骆驼祥子 | 老舍 | 1936 | 中国现代文学、现实主义 |
| The Hobbit | 霍比特人 | J·R·R·托尔金 | 1937 | 奇幻文学 |
| Their Eyes Were Watching God | 他们眼望上苍 | 佐拉·尼尔·赫斯顿 | 1937 | 女性主义文学、后殖民文学 |
| Nausea | 恶心 | 让-保罗·萨特 | 1938 | 存在主义文学、现代主义 |
| The Big Sleep | 长眠不醒 | 雷蒙德·钱德勒 | 1939 | 推理小说、硬汉派侦探小说 |
| The Grapes of Wrath | 愤怒的葡萄 | 约翰·斯坦贝克 | 1939 | 现实主义、批判现实主义 |
| The Stranger | 局外人 | 阿尔贝·加缪 | 1942 | 存在主义文学、荒诞派、现代主义 |
| 呼兰河传 | 呼兰河传 | 萧红 | 1942 | 中国现代文学、乡土文学、女性主义文学 |
| The Little Prince | 小王子 | 安托万·德·圣-埃克苏佩里 | 1943 | 儿童文学、哲学入门 |
| 倾城之恋 | 倾城之恋 | 张爱玲 | 1943 | 中国现代文学、女性主义文学 |
| 金锁记 | 金锁记 | 张爱玲 | 1943 | 中国现代文学、女性主义文学 |
| Ficciones | 虚构集 | 豪尔赫·路易斯·博尔赫斯 | 1944 | 后现代主义、魔幻现实主义、短篇小说 |
| Animal Farm | 动物农场 | 乔治·奥威尔 | 1945 | 反乌托邦文学、讽刺文学 |
| The Plague | 鼠疫 | 阿尔贝·加缪 | 1947 | 存在主义文学、荒诞派 |
| 围城 | 围城 | 钱锺书 | 1947 | 中国现代文学、讽刺文学 |
| Ningen Shikkaku | 人间失格 | 太宰治 | 1948 | 日本无赖派、存在主义文学 |
| The Makioka Sisters | 细雪 | 谷崎润一郎 | 1948 | 日本现代文学、现实主义 |
| Yukiguni | 雪国 | 川端康成 | 1948 | 日本现代文学、诺贝尔文学奖阅读 |
| Nineteen Eighty-Four | 一九八四 | 乔治·奥威尔 | 1949 | 反乌托邦文学、科幻文学 |
| The Aleph | 阿莱夫 | 豪尔赫·路易斯·博尔赫斯 | 1949 | 后现代主义、魔幻现实主义、短篇小说 |
| Molloy | 莫洛伊 | 萨缪尔·贝克特 | 1951 | 荒诞派、现代主义 |
| The Catcher in the Rye | 麦田里的守望者 | J·D·塞林格 | 1951 | 现代主义、成长小说 |
| Invisible Man | 看不见的人 | 拉尔夫·埃里森 | 1952 | 后殖民文学、现代主义 |
| The Old Man and the Sea | 老人与海 | 欧内斯特·海明威 | 1952 | 现代主义、诺贝尔文学奖阅读 |
| Fahrenheit 451 | 华氏451度 | 雷·布拉德伯里 | 1953 | 科幻文学、反乌托邦文学 |
| Waiting for Godot | 等待戈多 | 萨缪尔·贝克特 | 1953 | 荒诞派、戏剧文学 |
| Lord of the Flies | 蝇王 | 威廉·戈尔丁 | 1954 | 现代主义、反乌托邦文学 |
| The Lord of the Rings | 魔戒 | J·R·R·托尔金 | 1954 | 奇幻文学 |
| Lolita | 洛丽塔 | 弗拉基米尔·纳博科夫 | 1955 | 后现代主义、现代主义 |
| The Talented Mr. Ripley | 天才雷普利 | 帕特里夏·海史密斯 | 1955 | 犯罪小说、推理小说 |
| Kinkakuji | 金阁寺 | 三岛由纪夫 | 1956 | 日本现代文学、美学小说 |
| On the Road | 在路上 | 杰克·凯鲁亚克 | 1957 | 垮掉的一代、现代主义 |
| Things Fall Apart | 瓦解 | 钦努阿·阿契贝 | 1958 | 后殖民文学、现实主义 |
| The Tin Drum | 铁皮鼓 | 君特·格拉斯 | 1959 | 魔幻现实主义、后现代主义 |
| To Kill a Mockingbird | 杀死一只知更鸟 | 哈珀·李 | 1960 | 现实主义、成长小说 |
| Catch-22 | 第二十二条军规 | 约瑟夫·海勒 | 1961 | 黑色幽默、战争文学 |
| Solaris | 索拉里斯星 | 斯坦尼斯瓦夫·莱姆 | 1961 | 科幻文学、哲学入门 |
| One Day in the Life of Ivan Denisovich | 伊凡·杰尼索维奇的一天 | 亚历山大·索尔仁尼琴 | 1962 | 现实主义、纪实文学 |
| The Man in the High Castle | 高堡奇人 | 菲利普·K·迪克 | 1962 | 科幻文学、反乌托邦文学 |
| The Woman in the Dunes | 砂女 | 安部公房 | 1962 | 存在主义文学、荒诞派、日本现代文学 |
| Cat's Cradle | 猫的摇篮 | 库尔特·冯内古特 | 1963 | 黑色幽默、后现代主义、科幻文学 |
| Hopscotch | 跳房子 | 胡利奥·科塔萨尔 | 1963 | 拉美文学爆炸、后现代主义 |
| The Bell Jar | 钟形罩 | 西尔维娅·普拉斯 | 1963 | 女性主义文学、现代主义 |
| A Personal Matter | 个人的体验 | 大江健三郎 | 1964 | 日本现代文学、存在主义文学 |
| Dune | 沙丘 | 弗兰克·赫伯特 | 1965 | 科幻文学、生态文学 |
| In Cold Blood | 冷血 | 杜鲁门·卡波特 | 1966 | 新新闻主义、非虚构写作、犯罪小说 |
| Wide Sargasso Sea | 藻海无边 | 简·里斯 | 1966 | 后殖民文学、女性主义文学 |
| Cien años de soledad | 百年孤独 | 加西亚·马尔克斯 | 1967 | 魔幻现实主义、拉美文学爆炸 |
| The Master and Margarita | 大师和玛格丽特 | 米哈伊尔·布尔加科夫 | 1967 | 魔幻现实主义、现代主义 |
| Do Androids Dream of Electric Sheep? | 仿生人会梦见电子羊吗？ | 菲利普·K·迪克 | 1968 | 科幻文学、赛博朋克 |
| Slaughterhouse-Five | 五号屠场 | 库尔特·冯内古特 | 1969 | 黑色幽默、后现代主义、战争文学 |
| The Left Hand of Darkness | 黑暗的左手 | 厄休拉·K·勒古恩 | 1969 | 科幻文学、女性主义文学、软科幻 |
| The Bluest Eye | 最蓝的眼睛 | 托妮·莫里森 | 1970 | 女性主义文学、后殖民文学 |
| The Lathe of Heaven | 天钧 | 厄休拉·K·勒古恩 | 1971 | 科幻文学、软科幻 |
| Invisible Cities | 看不见的城市 | 伊塔洛·卡尔维诺 | 1972 | 后现代主义、元小说 |
| The Dispossessed | 一无所有 | 厄休拉·K·勒古恩 | 1974 | 科幻文学、乌托邦文学 |
| The Dead Father | 死父 | 唐纳德·巴塞尔姆 | 1975 | 后现代主义、黑色幽默 |
| Interview with the Vampire | 夜访吸血鬼 | 安妮·赖斯 | 1976 | 哥特小说、恐怖文学 |
| Song of Solomon | 所罗门之歌 | 托妮·莫里森 | 1977 | 后殖民文学、魔幻现实主义 |
| If on a winter's night a traveler | 如果在冬夜，一个旅人 | 伊塔洛·卡尔维诺 | 1979 | 后现代主义、元小说 |
| The Name of the Rose | 玫瑰的名字 | 翁贝托·埃科 | 1980 | 后现代主义、推理小说、元小说 |
| 受戒 | 受戒 | 汪曾祺 | 1980 | 中国当代文学、短篇小说 |
| 黄油烙饼 | 黄油烙饼 | 汪曾祺 | 1980 | 中国当代文学、短篇小说 |
| Midnight's Children | 午夜之子 | 萨尔曼·拉什迪 | 1981 | 后殖民文学、魔幻现实主义 |
| The Color Purple | 紫颜色 | 艾丽斯·沃克 | 1982 | 女性主义文学、后殖民文学 |
| The House of the Spirits | 幽灵之家 | 伊莎贝尔·阿连德 | 1982 | 魔幻现实主义、女性主义文学 |
| 人生 | 人生 | 路遥 | 1982 | 现实主义、中国当代文学 |
| Neuromancer | 神经漫游者 | 威廉·吉布森 | 1984 | 赛博朋克、科幻文学 |
| 棋王 | 棋王 | 阿城 | 1984 | 寻根文学、中国当代文学 |
| Love in the Time of Cholera | 霍乱时期的爱情 | 加西亚·马尔克斯 | 1985 | 魔幻现实主义、拉美文学爆炸 |
| The Handmaid's Tale | 使女的故事 | 玛格丽特·阿特伍德 | 1985 | 女性主义文学、反乌托邦文学 |
| 小鲍庄 | 小鲍庄 | 王安忆 | 1985 | 寻根文学、中国当代文学 |
| 古船 | 古船 | 张炜 | 1986 | 中国当代文学、现实主义 |
| 平凡的世界 | 平凡的世界 | 路遥 | 1986 | 现实主义、中国当代文学、茅盾文学奖阅读 |
| 红高粱家族 | 红高粱家族 | 莫言 | 1986 | 寻根文学、魔幻现实主义、中国当代文学 |
| Beloved | 宠儿 | 托妮·莫里森 | 1987 | 后殖民文学、女性主义文学、创伤文学 |
| Norwegian Wood | 挪威的森林 | 村上春树 | 1987 | 日本现代文学、成长小说 |
| The Remains of the Day | 长日将尽 | 石黑一雄 | 1989 | 后殖民文学、现实主义 |
| Possession | 占有 | A·S·拜厄特 | 1990 | 后现代主义、女性主义文学 |
| 妻妾成群 | 妻妾成群 | 苏童 | 1990 | 中国先锋文学、中国当代文学 |
| American Psycho | 美国精神病人 | 布莱特·伊斯顿·埃利斯 | 1991 | 后现代主义、黑色幽默 |
| 米 | 米 | 苏童 | 1991 | 中国先锋文学、中国当代文学 |
| Snow Crash | 雪崩 | 尼尔·斯蒂芬森 | 1992 | 赛博朋克、科幻文学 |
| The Secret History | 秘史 | 唐娜·塔特 | 1992 | 犯罪小说、校园小说 |
| 黄金时代 | 黄金时代 | 王小波 | 1992 | 中国当代文学、黑色幽默 |
| 废都 | 废都 | 贾平凹 | 1993 | 中国当代文学、城市文学 |
| 活着 | 活着 | 余华 | 1993 | 中国先锋文学、中国当代文学 |
| 白鹿原 | 白鹿原 | 陈忠实 | 1993 | 中国当代文学、家族史诗、茅盾文学奖阅读 |
| The Memory Police | 密闭的时间 | 小川洋子 | 1994 | 反乌托邦文学、日本现代文学 |
| The Wind-Up Bird Chronicle | 奇鸟行状录 | 村上春树 | 1994 | 后现代主义、魔幻现实主义 |
| Blindness | 失明症漫记 | 若泽·萨拉马戈 | 1995 | 寓言文学、后现代主义 |
| The Rings of Saturn | 土星之环 | 温弗里德·塞巴尔德 | 1995 | 非虚构写作、后现代主义 |
| 许三观卖血记 | 许三观卖血记 | 余华 | 1995 | 中国先锋文学、中国当代文学 |
| 长恨歌 | 长恨歌 | 王安忆 | 1995 | 中国当代文学、城市文学、茅盾文学奖阅读 |
| Infinite Jest | 无尽的玩笑 | 大卫·福斯特·华莱士 | 1996 | 后现代主义、黑色幽默 |
| 马桥词典 | 马桥词典 | 韩少功 | 1996 | 寻根文学、后现代主义 |
| The God of Small Things | 微物之神 | 阿兰达蒂·洛伊 | 1997 | 后殖民文学、女性主义文学 |
| 我的精神家园 | 我的精神家园 | 王小波 | 1997 | 非虚构写作、中国当代文学 |
| The Hours | 时时刻刻 | 迈克尔·坎宁安 | 1998 | 后现代主义、女性主义文学 |
| 尘埃落定 | 尘埃落定 | 阿来 | 1998 | 中国当代文学、寻根文学、茅盾文学奖阅读 |
| Austerlitz | 奥斯特利茨 | 温弗里德·塞巴尔德 | 2001 | 创伤文学、后现代主义 |
| Kafka on the Shore | 海边的卡夫卡 | 村上春树 | 2002 | 后现代主义、魔幻现实主义 |
| 2666 | 2666 | 罗贝托·波拉尼奥 | 2004 | 后现代主义、拉美文学爆炸 |
| Never Let Me Go | 别让我走 | 石黑一雄 | 2005 | 科幻文学、反乌托邦文学 |
| 兄弟 | 兄弟 | 余华 | 2005 | 中国当代文学、黑色幽默 |
| 秦腔 | 秦腔 | 贾平凹 | 2005 | 中国当代文学、乡土文学、茅盾文学奖阅读 |
| 额尔古纳河右岸 | 额尔古纳河右岸 | 迟子建 | 2005 | 中国当代文学、生态文学、茅盾文学奖阅读 |
| The Road | 路 | 科马克·麦卡锡 | 2006 | 反乌托邦文学、生态文学 |
| The Three-Body Problem | 三体 | 刘慈欣 | 2006 | 科幻文学、硬科幻 |
| The Brief Wondrous Life of Oscar Wao | 奥斯卡·瓦奥短暂而奇妙的一生 | 朱诺·迪亚斯 | 2007 | 后殖民文学、魔幻现实主义 |
| The Vegetarian | 素食者 | 韩江 | 2007 | 女性主义文学、创伤文学 |
| 推拿 | 推拿 | 毕飞宇 | 2008 | 中国当代文学、茅盾文学奖阅读 |
| Wolf Hall | 狼厅 | 希拉里·曼特尔 | 2009 | 历史写作、布克奖阅读 |
| 一句顶一万句 | 一句顶一万句 | 刘震云 | 2009 | 中国当代文学、新写实小说、茅盾文学奖阅读 |
| 蛙 | 蛙 | 莫言 | 2009 | 中国当代文学、茅盾文学奖阅读 |
| The Sense of an Ending | 终结的感觉 | 朱利安·巴恩斯 | 2011 | 后现代主义、布克奖阅读 |
| 繁花 | 繁花 | 金宇澄 | 2012 | 中国当代文学、城市文学、茅盾文学奖阅读 |
| Convenience Store Woman | 人间便利店 | 村田沙耶香 | 2016 | 日本现代文学、女性主义文学 |
| The Underground Railroad | 地下铁道 | 科尔森·怀特黑德 | 2016 | 后殖民文学、魔幻现实主义 |
| 北上 | 北上 | 徐则臣 | 2018 | 中国当代文学、茅盾文学奖阅读 |
| 应物兄 | 应物兄 | 李洱 | 2018 | 中国当代文学、茅盾文学奖阅读 |
| Klara and the Sun | 克拉拉与太阳 | 石黑一雄 | 2021 | 科幻文学、软科幻 |

---

## 5. 作品导读卡生成 JSONL

可逐行喂给 AI 或脚本。

```jsonl
{"titleOriginal": "Don Quijote de la Mancha", "titleTranslatedCn": "堂吉诃德", "author": "米格尔·德·塞万提斯", "year": 1605, "movements": ["现实主义", "小说入门"]}
{"titleOriginal": "Robinson Crusoe", "titleTranslatedCn": "鲁滨逊漂流记", "author": "丹尼尔·笛福", "year": 1719, "movements": ["现实主义", "成长小说"]}
{"titleOriginal": "Gulliver's Travels", "titleTranslatedCn": "格列佛游记", "author": "乔纳森·斯威夫特", "year": 1726, "movements": ["讽刺文学", "奇幻文学"]}
{"titleOriginal": "Faust", "titleTranslatedCn": "浮士德", "author": "约翰·沃尔夫冈·冯·歌德", "year": 1808, "movements": ["浪漫主义", "戏剧文学"]}
{"titleOriginal": "Frankenstein; or, The Modern Prometheus", "titleTranslatedCn": "弗兰肯斯坦", "author": "玛丽·雪莱", "year": 1818, "movements": ["哥特小说", "科幻文学"]}
{"titleOriginal": "Le Rouge et le Noir", "titleTranslatedCn": "红与黑", "author": "司汤达", "year": 1830, "movements": ["现实主义", "成长小说"]}
{"titleOriginal": "Eugénie Grandet", "titleTranslatedCn": "欧也妮·葛朗台", "author": "奥诺雷·德·巴尔扎克", "year": 1833, "movements": ["现实主义", "批判现实主义"]}
{"titleOriginal": "Le Père Goriot", "titleTranslatedCn": "高老头", "author": "奥诺雷·德·巴尔扎克", "year": 1835, "movements": ["现实主义", "批判现实主义"]}
{"titleOriginal": "The Pickwick Papers", "titleTranslatedCn": "匹克威克外传", "author": "查尔斯·狄更斯", "year": 1837, "movements": ["现实主义", "批判现实主义"]}
{"titleOriginal": "Oliver Twist", "titleTranslatedCn": "雾都孤儿", "author": "查尔斯·狄更斯", "year": 1838, "movements": ["现实主义", "批判现实主义"]}
{"titleOriginal": "A Christmas Carol", "titleTranslatedCn": "圣诞颂歌", "author": "查尔斯·狄更斯", "year": 1843, "movements": ["现实主义", "短篇小说"]}
{"titleOriginal": "Jane Eyre", "titleTranslatedCn": "简·爱", "author": "夏洛蒂·勃朗特", "year": 1847, "movements": ["现实主义", "女性主义文学", "成长小说"]}
{"titleOriginal": "Wuthering Heights", "titleTranslatedCn": "呼啸山庄", "author": "艾米莉·勃朗特", "year": 1847, "movements": ["哥特小说", "浪漫主义"]}
{"titleOriginal": "Madame Bovary", "titleTranslatedCn": "包法利夫人", "author": "居斯塔夫·福楼拜", "year": 1857, "movements": ["现实主义", "自然主义"]}
{"titleOriginal": "A Tale of Two Cities", "titleTranslatedCn": "双城记", "author": "查尔斯·狄更斯", "year": 1859, "movements": ["现实主义", "历史写作"]}
{"titleOriginal": "Great Expectations", "titleTranslatedCn": "远大前程", "author": "查尔斯·狄更斯", "year": 1861, "movements": ["现实主义", "成长小说"]}
{"titleOriginal": "Les Misérables", "titleTranslatedCn": "悲惨世界", "author": "维克多·雨果", "year": 1862, "movements": ["浪漫主义", "现实主义"]}
{"titleOriginal": "Crime and Punishment", "titleTranslatedCn": "罪与罚", "author": "费奥多尔·陀思妥耶夫斯基", "year": 1866, "movements": ["现实主义", "存在主义文学"]}
{"titleOriginal": "War and Peace", "titleTranslatedCn": "战争与和平", "author": "列夫·托尔斯泰", "year": 1869, "movements": ["现实主义", "战争文学", "家族史诗"]}
{"titleOriginal": "Middlemarch", "titleTranslatedCn": "米德尔马契", "author": "乔治·艾略特", "year": 1871, "movements": ["现实主义", "女性主义文学"]}
{"titleOriginal": "Anna Karenina", "titleTranslatedCn": "安娜·卡列尼娜", "author": "列夫·托尔斯泰", "year": 1877, "movements": ["现实主义"]}
{"titleOriginal": "The Brothers Karamazov", "titleTranslatedCn": "卡拉马佐夫兄弟", "author": "费奥多尔·陀思妥耶夫斯基", "year": 1880, "movements": ["现实主义", "存在主义文学", "哲学入门"]}
{"titleOriginal": "The Adventures of Huckleberry Finn", "titleTranslatedCn": "哈克贝利·费恩历险记", "author": "马克·吐温", "year": 1884, "movements": ["现实主义", "成长小说"]}
{"titleOriginal": "Germinal", "titleTranslatedCn": "萌芽", "author": "埃米尔·左拉", "year": 1885, "movements": ["自然主义", "现实主义"]}
{"titleOriginal": "The Strange Case of Dr Jekyll and Mr Hyde", "titleTranslatedCn": "化身博士", "author": "罗伯特·路易斯·史蒂文森", "year": 1886, "movements": ["哥特小说", "科幻文学"]}
{"titleOriginal": "The Picture of Dorian Gray", "titleTranslatedCn": "道林·格雷的画像", "author": "奥斯卡·王尔德", "year": 1890, "movements": ["唯美主义", "哥特小说"]}
{"titleOriginal": "Tess of the d'Urbervilles", "titleTranslatedCn": "德伯家的苔丝", "author": "托马斯·哈代", "year": 1891, "movements": ["现实主义", "自然主义"]}
{"titleOriginal": "The Yellow Wallpaper", "titleTranslatedCn": "黄色墙纸", "author": "夏洛特·珀金斯·吉尔曼", "year": 1892, "movements": ["女性主义文学", "短篇小说"]}
{"titleOriginal": "The Time Machine", "titleTranslatedCn": "时间机器", "author": "赫伯特·乔治·威尔斯", "year": 1895, "movements": ["科幻文学", "反乌托邦文学"]}
{"titleOriginal": "Dracula", "titleTranslatedCn": "德古拉", "author": "布拉姆·斯托克", "year": 1897, "movements": ["哥特小说", "恐怖文学"]}
{"titleOriginal": "Heart of Darkness", "titleTranslatedCn": "黑暗的心", "author": "约瑟夫·康拉德", "year": 1899, "movements": ["现代主义", "后殖民文学"]}
{"titleOriginal": "The Hound of the Baskervilles", "titleTranslatedCn": "巴斯克维尔的猎犬", "author": "阿瑟·柯南·道尔", "year": 1902, "movements": ["推理小说"]}
{"titleOriginal": "The Call of the Wild", "titleTranslatedCn": "野性的呼唤", "author": "杰克·伦敦", "year": 1903, "movements": ["自然主义", "现实主义"]}
{"titleOriginal": "The Jungle", "titleTranslatedCn": "屠场", "author": "厄普顿·辛克莱", "year": 1906, "movements": ["自然主义", "现实主义"]}
{"titleOriginal": "A Room with a View", "titleTranslatedCn": "看得见风景的房间", "author": "E·M·福斯特", "year": 1908, "movements": ["现代主义", "现实主义"]}
{"titleOriginal": "Kokoro", "titleTranslatedCn": "心", "author": "夏目漱石", "year": 1914, "movements": ["日本现代文学", "心理小说"]}
{"titleOriginal": "Rashōmon", "titleTranslatedCn": "罗生门", "author": "芥川龙之介", "year": 1915, "movements": ["短篇小说", "日本现代文学"]}
{"titleOriginal": "The Metamorphosis", "titleTranslatedCn": "变形记", "author": "弗兰茨·卡夫卡", "year": 1915, "movements": ["现代主义", "荒诞派"]}
{"titleOriginal": "A Portrait of the Artist as a Young Man", "titleTranslatedCn": "一个青年艺术家的画像", "author": "詹姆斯·乔伊斯", "year": 1916, "movements": ["现代主义", "成长小说"]}
{"titleOriginal": "Winesburg, Ohio", "titleTranslatedCn": "小城畸人", "author": "舍伍德·安德森", "year": 1919, "movements": ["现代主义", "短篇小说"]}
{"titleOriginal": "The Age of Innocence", "titleTranslatedCn": "纯真年代", "author": "伊迪丝·华顿", "year": 1920, "movements": ["现实主义", "女性主义文学"]}
{"titleOriginal": "Siddhartha", "titleTranslatedCn": "悉达多", "author": "赫尔曼·黑塞", "year": 1922, "movements": ["现代主义", "哲学入门"]}
{"titleOriginal": "Ulysses", "titleTranslatedCn": "尤利西斯", "author": "詹姆斯·乔伊斯", "year": 1922, "movements": ["现代主义", "意识流"]}
{"titleOriginal": "呐喊", "titleTranslatedCn": "呐喊", "author": "鲁迅", "year": 1923, "movements": ["中国现代文学", "短篇小说"]}
{"titleOriginal": "Mrs Dalloway", "titleTranslatedCn": "达洛维夫人", "author": "弗吉尼亚·伍尔夫", "year": 1925, "movements": ["现代主义", "意识流", "女性主义文学"]}
{"titleOriginal": "The Great Gatsby", "titleTranslatedCn": "了不起的盖茨比", "author": "F·斯科特·菲茨杰拉德", "year": 1925, "movements": ["现代主义", "现实主义"]}
{"titleOriginal": "The Trial", "titleTranslatedCn": "审判", "author": "弗兰茨·卡夫卡", "year": 1925, "movements": ["现代主义", "荒诞派"]}
{"titleOriginal": "The Castle", "titleTranslatedCn": "城堡", "author": "弗兰茨·卡夫卡", "year": 1926, "movements": ["现代主义", "荒诞派"]}
{"titleOriginal": "The Murder of Roger Ackroyd", "titleTranslatedCn": "罗杰疑案", "author": "阿加莎·克里斯蒂", "year": 1926, "movements": ["推理小说", "本格推理"]}
{"titleOriginal": "彷徨", "titleTranslatedCn": "彷徨", "author": "鲁迅", "year": 1926, "movements": ["中国现代文学", "短篇小说"]}
{"titleOriginal": "Steppenwolf", "titleTranslatedCn": "荒原狼", "author": "赫尔曼·黑塞", "year": 1927, "movements": ["现代主义", "存在主义文学"]}
{"titleOriginal": "To the Lighthouse", "titleTranslatedCn": "到灯塔去", "author": "弗吉尼亚·伍尔夫", "year": 1927, "movements": ["现代主义", "意识流", "女性主义文学"]}
{"titleOriginal": "A Farewell to Arms", "titleTranslatedCn": "永别了，武器", "author": "欧内斯特·海明威", "year": 1929, "movements": ["现代主义", "战争文学"]}
{"titleOriginal": "The Sound and the Fury", "titleTranslatedCn": "喧哗与骚动", "author": "威廉·福克纳", "year": 1929, "movements": ["现代主义", "意识流"]}
{"titleOriginal": "The Maltese Falcon", "titleTranslatedCn": "马耳他之鹰", "author": "达希尔·哈米特", "year": 1930, "movements": ["推理小说", "硬汉派侦探小说"]}
{"titleOriginal": "Brave New World", "titleTranslatedCn": "美丽新世界", "author": "阿道司·赫胥黎", "year": 1932, "movements": ["反乌托邦文学", "科幻文学"]}
{"titleOriginal": "子夜", "titleTranslatedCn": "子夜", "author": "茅盾", "year": 1933, "movements": ["中国现代文学", "现实主义"]}
{"titleOriginal": "家", "titleTranslatedCn": "家", "author": "巴金", "year": 1933, "movements": ["中国现代文学", "现实主义"]}
{"titleOriginal": "Tender Is the Night", "titleTranslatedCn": "夜色温柔", "author": "F·斯科特·菲茨杰拉德", "year": 1934, "movements": ["现代主义"]}
{"titleOriginal": "The Postman Always Rings Twice", "titleTranslatedCn": "邮差总按两遍铃", "author": "詹姆斯·M·凯恩", "year": 1934, "movements": ["犯罪小说", "硬汉派侦探小说"]}
{"titleOriginal": "边城", "titleTranslatedCn": "边城", "author": "沈从文", "year": 1934, "movements": ["中国现代文学", "乡土文学"]}
{"titleOriginal": "故事新编", "titleTranslatedCn": "故事新编", "author": "鲁迅", "year": 1936, "movements": ["中国现代文学", "短篇小说", "后现代主义"]}
{"titleOriginal": "骆驼祥子", "titleTranslatedCn": "骆驼祥子", "author": "老舍", "year": 1936, "movements": ["中国现代文学", "现实主义"]}
{"titleOriginal": "The Hobbit", "titleTranslatedCn": "霍比特人", "author": "J·R·R·托尔金", "year": 1937, "movements": ["奇幻文学"]}
{"titleOriginal": "Their Eyes Were Watching God", "titleTranslatedCn": "他们眼望上苍", "author": "佐拉·尼尔·赫斯顿", "year": 1937, "movements": ["女性主义文学", "后殖民文学"]}
{"titleOriginal": "Nausea", "titleTranslatedCn": "恶心", "author": "让-保罗·萨特", "year": 1938, "movements": ["存在主义文学", "现代主义"]}
{"titleOriginal": "The Big Sleep", "titleTranslatedCn": "长眠不醒", "author": "雷蒙德·钱德勒", "year": 1939, "movements": ["推理小说", "硬汉派侦探小说"]}
{"titleOriginal": "The Grapes of Wrath", "titleTranslatedCn": "愤怒的葡萄", "author": "约翰·斯坦贝克", "year": 1939, "movements": ["现实主义", "批判现实主义"]}
{"titleOriginal": "The Stranger", "titleTranslatedCn": "局外人", "author": "阿尔贝·加缪", "year": 1942, "movements": ["存在主义文学", "荒诞派", "现代主义"]}
{"titleOriginal": "呼兰河传", "titleTranslatedCn": "呼兰河传", "author": "萧红", "year": 1942, "movements": ["中国现代文学", "乡土文学", "女性主义文学"]}
{"titleOriginal": "The Little Prince", "titleTranslatedCn": "小王子", "author": "安托万·德·圣-埃克苏佩里", "year": 1943, "movements": ["儿童文学", "哲学入门"]}
{"titleOriginal": "倾城之恋", "titleTranslatedCn": "倾城之恋", "author": "张爱玲", "year": 1943, "movements": ["中国现代文学", "女性主义文学"]}
{"titleOriginal": "金锁记", "titleTranslatedCn": "金锁记", "author": "张爱玲", "year": 1943, "movements": ["中国现代文学", "女性主义文学"]}
{"titleOriginal": "Ficciones", "titleTranslatedCn": "虚构集", "author": "豪尔赫·路易斯·博尔赫斯", "year": 1944, "movements": ["后现代主义", "魔幻现实主义", "短篇小说"]}
{"titleOriginal": "Animal Farm", "titleTranslatedCn": "动物农场", "author": "乔治·奥威尔", "year": 1945, "movements": ["反乌托邦文学", "讽刺文学"]}
{"titleOriginal": "The Plague", "titleTranslatedCn": "鼠疫", "author": "阿尔贝·加缪", "year": 1947, "movements": ["存在主义文学", "荒诞派"]}
{"titleOriginal": "围城", "titleTranslatedCn": "围城", "author": "钱锺书", "year": 1947, "movements": ["中国现代文学", "讽刺文学"]}
{"titleOriginal": "Ningen Shikkaku", "titleTranslatedCn": "人间失格", "author": "太宰治", "year": 1948, "movements": ["日本无赖派", "存在主义文学"]}
{"titleOriginal": "The Makioka Sisters", "titleTranslatedCn": "细雪", "author": "谷崎润一郎", "year": 1948, "movements": ["日本现代文学", "现实主义"]}
{"titleOriginal": "Yukiguni", "titleTranslatedCn": "雪国", "author": "川端康成", "year": 1948, "movements": ["日本现代文学", "诺贝尔文学奖阅读"]}
{"titleOriginal": "Nineteen Eighty-Four", "titleTranslatedCn": "一九八四", "author": "乔治·奥威尔", "year": 1949, "movements": ["反乌托邦文学", "科幻文学"]}
{"titleOriginal": "The Aleph", "titleTranslatedCn": "阿莱夫", "author": "豪尔赫·路易斯·博尔赫斯", "year": 1949, "movements": ["后现代主义", "魔幻现实主义", "短篇小说"]}
{"titleOriginal": "Molloy", "titleTranslatedCn": "莫洛伊", "author": "萨缪尔·贝克特", "year": 1951, "movements": ["荒诞派", "现代主义"]}
{"titleOriginal": "The Catcher in the Rye", "titleTranslatedCn": "麦田里的守望者", "author": "J·D·塞林格", "year": 1951, "movements": ["现代主义", "成长小说"]}
{"titleOriginal": "Invisible Man", "titleTranslatedCn": "看不见的人", "author": "拉尔夫·埃里森", "year": 1952, "movements": ["后殖民文学", "现代主义"]}
{"titleOriginal": "The Old Man and the Sea", "titleTranslatedCn": "老人与海", "author": "欧内斯特·海明威", "year": 1952, "movements": ["现代主义", "诺贝尔文学奖阅读"]}
{"titleOriginal": "Fahrenheit 451", "titleTranslatedCn": "华氏451度", "author": "雷·布拉德伯里", "year": 1953, "movements": ["科幻文学", "反乌托邦文学"]}
{"titleOriginal": "Waiting for Godot", "titleTranslatedCn": "等待戈多", "author": "萨缪尔·贝克特", "year": 1953, "movements": ["荒诞派", "戏剧文学"]}
{"titleOriginal": "Lord of the Flies", "titleTranslatedCn": "蝇王", "author": "威廉·戈尔丁", "year": 1954, "movements": ["现代主义", "反乌托邦文学"]}
{"titleOriginal": "The Lord of the Rings", "titleTranslatedCn": "魔戒", "author": "J·R·R·托尔金", "year": 1954, "movements": ["奇幻文学"]}
{"titleOriginal": "Lolita", "titleTranslatedCn": "洛丽塔", "author": "弗拉基米尔·纳博科夫", "year": 1955, "movements": ["后现代主义", "现代主义"]}
{"titleOriginal": "The Talented Mr. Ripley", "titleTranslatedCn": "天才雷普利", "author": "帕特里夏·海史密斯", "year": 1955, "movements": ["犯罪小说", "推理小说"]}
{"titleOriginal": "Kinkakuji", "titleTranslatedCn": "金阁寺", "author": "三岛由纪夫", "year": 1956, "movements": ["日本现代文学", "美学小说"]}
{"titleOriginal": "On the Road", "titleTranslatedCn": "在路上", "author": "杰克·凯鲁亚克", "year": 1957, "movements": ["垮掉的一代", "现代主义"]}
{"titleOriginal": "Things Fall Apart", "titleTranslatedCn": "瓦解", "author": "钦努阿·阿契贝", "year": 1958, "movements": ["后殖民文学", "现实主义"]}
{"titleOriginal": "The Tin Drum", "titleTranslatedCn": "铁皮鼓", "author": "君特·格拉斯", "year": 1959, "movements": ["魔幻现实主义", "后现代主义"]}
{"titleOriginal": "To Kill a Mockingbird", "titleTranslatedCn": "杀死一只知更鸟", "author": "哈珀·李", "year": 1960, "movements": ["现实主义", "成长小说"]}
{"titleOriginal": "Catch-22", "titleTranslatedCn": "第二十二条军规", "author": "约瑟夫·海勒", "year": 1961, "movements": ["黑色幽默", "战争文学"]}
{"titleOriginal": "Solaris", "titleTranslatedCn": "索拉里斯星", "author": "斯坦尼斯瓦夫·莱姆", "year": 1961, "movements": ["科幻文学", "哲学入门"]}
{"titleOriginal": "One Day in the Life of Ivan Denisovich", "titleTranslatedCn": "伊凡·杰尼索维奇的一天", "author": "亚历山大·索尔仁尼琴", "year": 1962, "movements": ["现实主义", "纪实文学"]}
{"titleOriginal": "The Man in the High Castle", "titleTranslatedCn": "高堡奇人", "author": "菲利普·K·迪克", "year": 1962, "movements": ["科幻文学", "反乌托邦文学"]}
{"titleOriginal": "The Woman in the Dunes", "titleTranslatedCn": "砂女", "author": "安部公房", "year": 1962, "movements": ["存在主义文学", "荒诞派", "日本现代文学"]}
{"titleOriginal": "Cat's Cradle", "titleTranslatedCn": "猫的摇篮", "author": "库尔特·冯内古特", "year": 1963, "movements": ["黑色幽默", "后现代主义", "科幻文学"]}
{"titleOriginal": "Hopscotch", "titleTranslatedCn": "跳房子", "author": "胡利奥·科塔萨尔", "year": 1963, "movements": ["拉美文学爆炸", "后现代主义"]}
{"titleOriginal": "The Bell Jar", "titleTranslatedCn": "钟形罩", "author": "西尔维娅·普拉斯", "year": 1963, "movements": ["女性主义文学", "现代主义"]}
{"titleOriginal": "A Personal Matter", "titleTranslatedCn": "个人的体验", "author": "大江健三郎", "year": 1964, "movements": ["日本现代文学", "存在主义文学"]}
{"titleOriginal": "Dune", "titleTranslatedCn": "沙丘", "author": "弗兰克·赫伯特", "year": 1965, "movements": ["科幻文学", "生态文学"]}
{"titleOriginal": "In Cold Blood", "titleTranslatedCn": "冷血", "author": "杜鲁门·卡波特", "year": 1966, "movements": ["新新闻主义", "非虚构写作", "犯罪小说"]}
{"titleOriginal": "Wide Sargasso Sea", "titleTranslatedCn": "藻海无边", "author": "简·里斯", "year": 1966, "movements": ["后殖民文学", "女性主义文学"]}
{"titleOriginal": "Cien años de soledad", "titleTranslatedCn": "百年孤独", "author": "加西亚·马尔克斯", "year": 1967, "movements": ["魔幻现实主义", "拉美文学爆炸"]}
{"titleOriginal": "The Master and Margarita", "titleTranslatedCn": "大师和玛格丽特", "author": "米哈伊尔·布尔加科夫", "year": 1967, "movements": ["魔幻现实主义", "现代主义"]}
{"titleOriginal": "Do Androids Dream of Electric Sheep?", "titleTranslatedCn": "仿生人会梦见电子羊吗？", "author": "菲利普·K·迪克", "year": 1968, "movements": ["科幻文学", "赛博朋克"]}
{"titleOriginal": "Slaughterhouse-Five", "titleTranslatedCn": "五号屠场", "author": "库尔特·冯内古特", "year": 1969, "movements": ["黑色幽默", "后现代主义", "战争文学"]}
{"titleOriginal": "The Left Hand of Darkness", "titleTranslatedCn": "黑暗的左手", "author": "厄休拉·K·勒古恩", "year": 1969, "movements": ["科幻文学", "女性主义文学", "软科幻"]}
{"titleOriginal": "The Bluest Eye", "titleTranslatedCn": "最蓝的眼睛", "author": "托妮·莫里森", "year": 1970, "movements": ["女性主义文学", "后殖民文学"]}
{"titleOriginal": "The Lathe of Heaven", "titleTranslatedCn": "天钧", "author": "厄休拉·K·勒古恩", "year": 1971, "movements": ["科幻文学", "软科幻"]}
{"titleOriginal": "Invisible Cities", "titleTranslatedCn": "看不见的城市", "author": "伊塔洛·卡尔维诺", "year": 1972, "movements": ["后现代主义", "元小说"]}
{"titleOriginal": "The Dispossessed", "titleTranslatedCn": "一无所有", "author": "厄休拉·K·勒古恩", "year": 1974, "movements": ["科幻文学", "乌托邦文学"]}
{"titleOriginal": "The Dead Father", "titleTranslatedCn": "死父", "author": "唐纳德·巴塞尔姆", "year": 1975, "movements": ["后现代主义", "黑色幽默"]}
{"titleOriginal": "Interview with the Vampire", "titleTranslatedCn": "夜访吸血鬼", "author": "安妮·赖斯", "year": 1976, "movements": ["哥特小说", "恐怖文学"]}
{"titleOriginal": "Song of Solomon", "titleTranslatedCn": "所罗门之歌", "author": "托妮·莫里森", "year": 1977, "movements": ["后殖民文学", "魔幻现实主义"]}
{"titleOriginal": "If on a winter's night a traveler", "titleTranslatedCn": "如果在冬夜，一个旅人", "author": "伊塔洛·卡尔维诺", "year": 1979, "movements": ["后现代主义", "元小说"]}
{"titleOriginal": "The Name of the Rose", "titleTranslatedCn": "玫瑰的名字", "author": "翁贝托·埃科", "year": 1980, "movements": ["后现代主义", "推理小说", "元小说"]}
{"titleOriginal": "受戒", "titleTranslatedCn": "受戒", "author": "汪曾祺", "year": 1980, "movements": ["中国当代文学", "短篇小说"]}
{"titleOriginal": "黄油烙饼", "titleTranslatedCn": "黄油烙饼", "author": "汪曾祺", "year": 1980, "movements": ["中国当代文学", "短篇小说"]}
{"titleOriginal": "Midnight's Children", "titleTranslatedCn": "午夜之子", "author": "萨尔曼·拉什迪", "year": 1981, "movements": ["后殖民文学", "魔幻现实主义"]}
{"titleOriginal": "The Color Purple", "titleTranslatedCn": "紫颜色", "author": "艾丽斯·沃克", "year": 1982, "movements": ["女性主义文学", "后殖民文学"]}
{"titleOriginal": "The House of the Spirits", "titleTranslatedCn": "幽灵之家", "author": "伊莎贝尔·阿连德", "year": 1982, "movements": ["魔幻现实主义", "女性主义文学"]}
{"titleOriginal": "人生", "titleTranslatedCn": "人生", "author": "路遥", "year": 1982, "movements": ["现实主义", "中国当代文学"]}
{"titleOriginal": "Neuromancer", "titleTranslatedCn": "神经漫游者", "author": "威廉·吉布森", "year": 1984, "movements": ["赛博朋克", "科幻文学"]}
{"titleOriginal": "棋王", "titleTranslatedCn": "棋王", "author": "阿城", "year": 1984, "movements": ["寻根文学", "中国当代文学"]}
{"titleOriginal": "Love in the Time of Cholera", "titleTranslatedCn": "霍乱时期的爱情", "author": "加西亚·马尔克斯", "year": 1985, "movements": ["魔幻现实主义", "拉美文学爆炸"]}
{"titleOriginal": "The Handmaid's Tale", "titleTranslatedCn": "使女的故事", "author": "玛格丽特·阿特伍德", "year": 1985, "movements": ["女性主义文学", "反乌托邦文学"]}
{"titleOriginal": "小鲍庄", "titleTranslatedCn": "小鲍庄", "author": "王安忆", "year": 1985, "movements": ["寻根文学", "中国当代文学"]}
{"titleOriginal": "古船", "titleTranslatedCn": "古船", "author": "张炜", "year": 1986, "movements": ["中国当代文学", "现实主义"]}
{"titleOriginal": "平凡的世界", "titleTranslatedCn": "平凡的世界", "author": "路遥", "year": 1986, "movements": ["现实主义", "中国当代文学", "茅盾文学奖阅读"]}
{"titleOriginal": "红高粱家族", "titleTranslatedCn": "红高粱家族", "author": "莫言", "year": 1986, "movements": ["寻根文学", "魔幻现实主义", "中国当代文学"]}
{"titleOriginal": "Beloved", "titleTranslatedCn": "宠儿", "author": "托妮·莫里森", "year": 1987, "movements": ["后殖民文学", "女性主义文学", "创伤文学"]}
{"titleOriginal": "Norwegian Wood", "titleTranslatedCn": "挪威的森林", "author": "村上春树", "year": 1987, "movements": ["日本现代文学", "成长小说"]}
{"titleOriginal": "The Remains of the Day", "titleTranslatedCn": "长日将尽", "author": "石黑一雄", "year": 1989, "movements": ["后殖民文学", "现实主义"]}
{"titleOriginal": "Possession", "titleTranslatedCn": "占有", "author": "A·S·拜厄特", "year": 1990, "movements": ["后现代主义", "女性主义文学"]}
{"titleOriginal": "妻妾成群", "titleTranslatedCn": "妻妾成群", "author": "苏童", "year": 1990, "movements": ["中国先锋文学", "中国当代文学"]}
{"titleOriginal": "American Psycho", "titleTranslatedCn": "美国精神病人", "author": "布莱特·伊斯顿·埃利斯", "year": 1991, "movements": ["后现代主义", "黑色幽默"]}
{"titleOriginal": "米", "titleTranslatedCn": "米", "author": "苏童", "year": 1991, "movements": ["中国先锋文学", "中国当代文学"]}
{"titleOriginal": "Snow Crash", "titleTranslatedCn": "雪崩", "author": "尼尔·斯蒂芬森", "year": 1992, "movements": ["赛博朋克", "科幻文学"]}
{"titleOriginal": "The Secret History", "titleTranslatedCn": "秘史", "author": "唐娜·塔特", "year": 1992, "movements": ["犯罪小说", "校园小说"]}
{"titleOriginal": "黄金时代", "titleTranslatedCn": "黄金时代", "author": "王小波", "year": 1992, "movements": ["中国当代文学", "黑色幽默"]}
{"titleOriginal": "废都", "titleTranslatedCn": "废都", "author": "贾平凹", "year": 1993, "movements": ["中国当代文学", "城市文学"]}
{"titleOriginal": "活着", "titleTranslatedCn": "活着", "author": "余华", "year": 1993, "movements": ["中国先锋文学", "中国当代文学"]}
{"titleOriginal": "白鹿原", "titleTranslatedCn": "白鹿原", "author": "陈忠实", "year": 1993, "movements": ["中国当代文学", "家族史诗", "茅盾文学奖阅读"]}
{"titleOriginal": "The Memory Police", "titleTranslatedCn": "密闭的时间", "author": "小川洋子", "year": 1994, "movements": ["反乌托邦文学", "日本现代文学"]}
{"titleOriginal": "The Wind-Up Bird Chronicle", "titleTranslatedCn": "奇鸟行状录", "author": "村上春树", "year": 1994, "movements": ["后现代主义", "魔幻现实主义"]}
{"titleOriginal": "Blindness", "titleTranslatedCn": "失明症漫记", "author": "若泽·萨拉马戈", "year": 1995, "movements": ["寓言文学", "后现代主义"]}
{"titleOriginal": "The Rings of Saturn", "titleTranslatedCn": "土星之环", "author": "温弗里德·塞巴尔德", "year": 1995, "movements": ["非虚构写作", "后现代主义"]}
{"titleOriginal": "许三观卖血记", "titleTranslatedCn": "许三观卖血记", "author": "余华", "year": 1995, "movements": ["中国先锋文学", "中国当代文学"]}
{"titleOriginal": "长恨歌", "titleTranslatedCn": "长恨歌", "author": "王安忆", "year": 1995, "movements": ["中国当代文学", "城市文学", "茅盾文学奖阅读"]}
{"titleOriginal": "Infinite Jest", "titleTranslatedCn": "无尽的玩笑", "author": "大卫·福斯特·华莱士", "year": 1996, "movements": ["后现代主义", "黑色幽默"]}
{"titleOriginal": "马桥词典", "titleTranslatedCn": "马桥词典", "author": "韩少功", "year": 1996, "movements": ["寻根文学", "后现代主义"]}
{"titleOriginal": "The God of Small Things", "titleTranslatedCn": "微物之神", "author": "阿兰达蒂·洛伊", "year": 1997, "movements": ["后殖民文学", "女性主义文学"]}
{"titleOriginal": "我的精神家园", "titleTranslatedCn": "我的精神家园", "author": "王小波", "year": 1997, "movements": ["非虚构写作", "中国当代文学"]}
{"titleOriginal": "The Hours", "titleTranslatedCn": "时时刻刻", "author": "迈克尔·坎宁安", "year": 1998, "movements": ["后现代主义", "女性主义文学"]}
{"titleOriginal": "尘埃落定", "titleTranslatedCn": "尘埃落定", "author": "阿来", "year": 1998, "movements": ["中国当代文学", "寻根文学", "茅盾文学奖阅读"]}
{"titleOriginal": "Austerlitz", "titleTranslatedCn": "奥斯特利茨", "author": "温弗里德·塞巴尔德", "year": 2001, "movements": ["创伤文学", "后现代主义"]}
{"titleOriginal": "Kafka on the Shore", "titleTranslatedCn": "海边的卡夫卡", "author": "村上春树", "year": 2002, "movements": ["后现代主义", "魔幻现实主义"]}
{"titleOriginal": "2666", "titleTranslatedCn": "2666", "author": "罗贝托·波拉尼奥", "year": 2004, "movements": ["后现代主义", "拉美文学爆炸"]}
{"titleOriginal": "Never Let Me Go", "titleTranslatedCn": "别让我走", "author": "石黑一雄", "year": 2005, "movements": ["科幻文学", "反乌托邦文学"]}
{"titleOriginal": "兄弟", "titleTranslatedCn": "兄弟", "author": "余华", "year": 2005, "movements": ["中国当代文学", "黑色幽默"]}
{"titleOriginal": "秦腔", "titleTranslatedCn": "秦腔", "author": "贾平凹", "year": 2005, "movements": ["中国当代文学", "乡土文学", "茅盾文学奖阅读"]}
{"titleOriginal": "额尔古纳河右岸", "titleTranslatedCn": "额尔古纳河右岸", "author": "迟子建", "year": 2005, "movements": ["中国当代文学", "生态文学", "茅盾文学奖阅读"]}
{"titleOriginal": "The Road", "titleTranslatedCn": "路", "author": "科马克·麦卡锡", "year": 2006, "movements": ["反乌托邦文学", "生态文学"]}
{"titleOriginal": "The Three-Body Problem", "titleTranslatedCn": "三体", "author": "刘慈欣", "year": 2006, "movements": ["科幻文学", "硬科幻"]}
{"titleOriginal": "The Brief Wondrous Life of Oscar Wao", "titleTranslatedCn": "奥斯卡·瓦奥短暂而奇妙的一生", "author": "朱诺·迪亚斯", "year": 2007, "movements": ["后殖民文学", "魔幻现实主义"]}
{"titleOriginal": "The Vegetarian", "titleTranslatedCn": "素食者", "author": "韩江", "year": 2007, "movements": ["女性主义文学", "创伤文学"]}
{"titleOriginal": "推拿", "titleTranslatedCn": "推拿", "author": "毕飞宇", "year": 2008, "movements": ["中国当代文学", "茅盾文学奖阅读"]}
{"titleOriginal": "Wolf Hall", "titleTranslatedCn": "狼厅", "author": "希拉里·曼特尔", "year": 2009, "movements": ["历史写作", "布克奖阅读"]}
{"titleOriginal": "一句顶一万句", "titleTranslatedCn": "一句顶一万句", "author": "刘震云", "year": 2009, "movements": ["中国当代文学", "新写实小说", "茅盾文学奖阅读"]}
{"titleOriginal": "蛙", "titleTranslatedCn": "蛙", "author": "莫言", "year": 2009, "movements": ["中国当代文学", "茅盾文学奖阅读"]}
{"titleOriginal": "The Sense of an Ending", "titleTranslatedCn": "终结的感觉", "author": "朱利安·巴恩斯", "year": 2011, "movements": ["后现代主义", "布克奖阅读"]}
{"titleOriginal": "繁花", "titleTranslatedCn": "繁花", "author": "金宇澄", "year": 2012, "movements": ["中国当代文学", "城市文学", "茅盾文学奖阅读"]}
{"titleOriginal": "Convenience Store Woman", "titleTranslatedCn": "人间便利店", "author": "村田沙耶香", "year": 2016, "movements": ["日本现代文学", "女性主义文学"]}
{"titleOriginal": "The Underground Railroad", "titleTranslatedCn": "地下铁道", "author": "科尔森·怀特黑德", "year": 2016, "movements": ["后殖民文学", "魔幻现实主义"]}
{"titleOriginal": "北上", "titleTranslatedCn": "北上", "author": "徐则臣", "year": 2018, "movements": ["中国当代文学", "茅盾文学奖阅读"]}
{"titleOriginal": "应物兄", "titleTranslatedCn": "应物兄", "author": "李洱", "year": 2018, "movements": ["中国当代文学", "茅盾文学奖阅读"]}
{"titleOriginal": "Klara and the Sun", "titleTranslatedCn": "克拉拉与太阳", "author": "石黑一雄", "year": 2021, "movements": ["科幻文学", "软科幻"]}
```

---

## 6. 阅读路径生成队列

> 字段：`pathTitle`、`targetReader`、`works`

| pathTitle | targetReader | works 数量 |
|---|---|---:|
| 现代主义文学入门 | 想理解 20 世纪文学变化，但不想一上来读高难度长篇的中文读者 | 7 |
| 意识流文学入门 | 想理解心理时间、意识流动和非线性叙事的进阶读者 | 5 |
| 存在主义文学入门 | 想通过小说理解荒诞、自由、责任和现代人处境的读者 | 6 |
| 荒诞派文学入门 | 想理解荒诞感、无意义处境和反传统戏剧/小说的读者 | 6 |
| 魔幻现实主义入门 | 想理解现实、神话、历史创伤和魔幻叙事如何共存的读者 | 6 |
| 拉美文学爆炸入门 | 想从代表性作品理解拉美 20 世纪文学高峰的读者 | 5 |
| 后现代主义文学入门 | 想理解元小说、碎片化、互文和叙事实验的读者 | 6 |
| 黑色幽默入门 | 想读荒诞、讽刺、战争和现代制度批判的读者 | 6 |
| 女性主义文学入门 | 想从文学理解女性经验、性别结构和身体处境的读者 | 7 |
| 后殖民文学入门 | 想理解殖民历史、身份、语言和文化断裂的读者 | 6 |
| 赛博朋克入门 | 想理解高科技、低生活、资本城市和数字身份的读者 | 3 |
| 科幻文学入门 | 想从容易进入的作品理解科幻文学核心问题的读者 | 8 |
| 反乌托邦文学入门 | 想读权力、控制、技术和社会制度想象的读者 | 7 |
| 推理小说入门 | 想从经典侦探、硬汉派和社会派理解推理类型的读者 | 6 |
| 硬汉派侦探小说入门 | 想读冷峻城市、犯罪气息和美国硬汉侦探传统的读者 | 3 |
| 哥特小说入门 | 想理解恐怖、古堡、欲望、禁忌和现代恐怖源流的读者 | 5 |
| 外国文学新手入门 | 想从较容易进入的外国经典开始读的中文读者 | 7 |
| 诺贝尔文学奖入门 | 想从诺奖作家中选择较容易进入作品的读者 | 7 |
| 布克奖阅读入门 | 想通过布克奖理解英语小说当代表达的读者 | 5 |
| 中国现代文学入门 | 想理解五四以来中文现代文学形成过程的读者 | 7 |
| 鲁迅作品入门 | 想进入鲁迅小说和现代中文文学起点的读者 | 3 |
| 中国现当代文学入门 | 想从中国现代到当代建立基本阅读路径的读者 | 8 |
| 中国先锋文学入门 | 想理解 1980 年代以来叙事实验和历史暴力书写的读者 | 6 |
| 寻根文学入门 | 想理解 1980 年代文学如何重新寻找民间、历史和地域文化的读者 | 5 |
| 新写实小说入门 | 想理解日常生活、普通人困境和反英雄叙事的读者 | 3 |
| 茅盾文学奖入门 | 想从中国长篇小说奖项中选择可进入作品的读者 | 7 |
| 日本现代文学入门 | 想从日本现代小说进入孤独、伦理、美学和战后精神经验的读者 | 7 |
| 短篇小说入门 | 想通过短篇理解现代小说技巧和文学密度的读者 | 7 |
| 非虚构写作入门 | 想理解事实、叙事、现场和作者立场如何结合的读者 | 3 |
| 哲学感小说入门 | 想通过小说而非理论书进入哲学问题的读者 | 6 |

---

## 7. 阅读路径生成 JSONL

可逐行喂给 AI 或脚本。

```jsonl
{"pathTitle": "现代主义文学入门", "targetReader": "想理解 20 世纪文学变化，但不想一上来读高难度长篇的中文读者", "works": [{"titleOriginal": "The Metamorphosis", "titleTranslatedCn": "变形记", "author": "弗兰茨·卡夫卡", "year": 1915, "movements": ["现代主义", "荒诞派"]}, {"titleOriginal": "The Stranger", "titleTranslatedCn": "局外人", "author": "阿尔贝·加缪", "year": 1942, "movements": ["存在主义文学", "荒诞派", "现代主义"]}, {"titleOriginal": "A Portrait of the Artist as a Young Man", "titleTranslatedCn": "一个青年艺术家的画像", "author": "詹姆斯·乔伊斯", "year": 1916, "movements": ["现代主义", "成长小说"]}, {"titleOriginal": "Mrs Dalloway", "titleTranslatedCn": "达洛维夫人", "author": "弗吉尼亚·伍尔夫", "year": 1925, "movements": ["现代主义", "意识流", "女性主义文学"]}, {"titleOriginal": "To the Lighthouse", "titleTranslatedCn": "到灯塔去", "author": "弗吉尼亚·伍尔夫", "year": 1927, "movements": ["现代主义", "意识流", "女性主义文学"]}, {"titleOriginal": "The Sound and the Fury", "titleTranslatedCn": "喧哗与骚动", "author": "威廉·福克纳", "year": 1929, "movements": ["现代主义", "意识流"]}, {"titleOriginal": "Ulysses", "titleTranslatedCn": "尤利西斯", "author": "詹姆斯·乔伊斯", "year": 1922, "movements": ["现代主义", "意识流"]}]}
{"pathTitle": "意识流文学入门", "targetReader": "想理解心理时间、意识流动和非线性叙事的进阶读者", "works": [{"titleOriginal": "Mrs Dalloway", "titleTranslatedCn": "达洛维夫人", "author": "弗吉尼亚·伍尔夫", "year": 1925, "movements": ["现代主义", "意识流", "女性主义文学"]}, {"titleOriginal": "To the Lighthouse", "titleTranslatedCn": "到灯塔去", "author": "弗吉尼亚·伍尔夫", "year": 1927, "movements": ["现代主义", "意识流", "女性主义文学"]}, {"titleOriginal": "A Portrait of the Artist as a Young Man", "titleTranslatedCn": "一个青年艺术家的画像", "author": "詹姆斯·乔伊斯", "year": 1916, "movements": ["现代主义", "成长小说"]}, {"titleOriginal": "The Sound and the Fury", "titleTranslatedCn": "喧哗与骚动", "author": "威廉·福克纳", "year": 1929, "movements": ["现代主义", "意识流"]}, {"titleOriginal": "Ulysses", "titleTranslatedCn": "尤利西斯", "author": "詹姆斯·乔伊斯", "year": 1922, "movements": ["现代主义", "意识流"]}]}
{"pathTitle": "存在主义文学入门", "targetReader": "想通过小说理解荒诞、自由、责任和现代人处境的读者", "works": [{"titleOriginal": "The Stranger", "titleTranslatedCn": "局外人", "author": "阿尔贝·加缪", "year": 1942, "movements": ["存在主义文学", "荒诞派", "现代主义"]}, {"titleOriginal": "The Plague", "titleTranslatedCn": "鼠疫", "author": "阿尔贝·加缪", "year": 1947, "movements": ["存在主义文学", "荒诞派"]}, {"titleOriginal": "Nausea", "titleTranslatedCn": "恶心", "author": "让-保罗·萨特", "year": 1938, "movements": ["存在主义文学", "现代主义"]}, {"titleOriginal": "Steppenwolf", "titleTranslatedCn": "荒原狼", "author": "赫尔曼·黑塞", "year": 1927, "movements": ["现代主义", "存在主义文学"]}, {"titleOriginal": "The Woman in the Dunes", "titleTranslatedCn": "砂女", "author": "安部公房", "year": 1962, "movements": ["存在主义文学", "荒诞派", "日本现代文学"]}, {"titleOriginal": "The Brothers Karamazov", "titleTranslatedCn": "卡拉马佐夫兄弟", "author": "费奥多尔·陀思妥耶夫斯基", "year": 1880, "movements": ["现实主义", "存在主义文学", "哲学入门"]}]}
{"pathTitle": "荒诞派文学入门", "targetReader": "想理解荒诞感、无意义处境和反传统戏剧/小说的读者", "works": [{"titleOriginal": "The Metamorphosis", "titleTranslatedCn": "变形记", "author": "弗兰茨·卡夫卡", "year": 1915, "movements": ["现代主义", "荒诞派"]}, {"titleOriginal": "The Trial", "titleTranslatedCn": "审判", "author": "弗兰茨·卡夫卡", "year": 1925, "movements": ["现代主义", "荒诞派"]}, {"titleOriginal": "Waiting for Godot", "titleTranslatedCn": "等待戈多", "author": "萨缪尔·贝克特", "year": 1953, "movements": ["荒诞派", "戏剧文学"]}, {"titleOriginal": "The Plague", "titleTranslatedCn": "鼠疫", "author": "阿尔贝·加缪", "year": 1947, "movements": ["存在主义文学", "荒诞派"]}, {"titleOriginal": "The Woman in the Dunes", "titleTranslatedCn": "砂女", "author": "安部公房", "year": 1962, "movements": ["存在主义文学", "荒诞派", "日本现代文学"]}, {"titleOriginal": "Molloy", "titleTranslatedCn": "莫洛伊", "author": "萨缪尔·贝克特", "year": 1951, "movements": ["荒诞派", "现代主义"]}]}
{"pathTitle": "魔幻现实主义入门", "targetReader": "想理解现实、神话、历史创伤和魔幻叙事如何共存的读者", "works": [{"titleOriginal": "The House of the Spirits", "titleTranslatedCn": "幽灵之家", "author": "伊莎贝尔·阿连德", "year": 1982, "movements": ["魔幻现实主义", "女性主义文学"]}, {"titleOriginal": "Cien años de soledad", "titleTranslatedCn": "百年孤独", "author": "加西亚·马尔克斯", "year": 1967, "movements": ["魔幻现实主义", "拉美文学爆炸"]}, {"titleOriginal": "Love in the Time of Cholera", "titleTranslatedCn": "霍乱时期的爱情", "author": "加西亚·马尔克斯", "year": 1985, "movements": ["魔幻现实主义", "拉美文学爆炸"]}, {"titleOriginal": "The Master and Margarita", "titleTranslatedCn": "大师和玛格丽特", "author": "米哈伊尔·布尔加科夫", "year": 1967, "movements": ["魔幻现实主义", "现代主义"]}, {"titleOriginal": "Midnight's Children", "titleTranslatedCn": "午夜之子", "author": "萨尔曼·拉什迪", "year": 1981, "movements": ["后殖民文学", "魔幻现实主义"]}, {"titleOriginal": "The Tin Drum", "titleTranslatedCn": "铁皮鼓", "author": "君特·格拉斯", "year": 1959, "movements": ["魔幻现实主义", "后现代主义"]}]}
{"pathTitle": "拉美文学爆炸入门", "targetReader": "想从代表性作品理解拉美 20 世纪文学高峰的读者", "works": [{"titleOriginal": "Ficciones", "titleTranslatedCn": "虚构集", "author": "豪尔赫·路易斯·博尔赫斯", "year": 1944, "movements": ["后现代主义", "魔幻现实主义", "短篇小说"]}, {"titleOriginal": "Hopscotch", "titleTranslatedCn": "跳房子", "author": "胡利奥·科塔萨尔", "year": 1963, "movements": ["拉美文学爆炸", "后现代主义"]}, {"titleOriginal": "Cien años de soledad", "titleTranslatedCn": "百年孤独", "author": "加西亚·马尔克斯", "year": 1967, "movements": ["魔幻现实主义", "拉美文学爆炸"]}, {"titleOriginal": "Love in the Time of Cholera", "titleTranslatedCn": "霍乱时期的爱情", "author": "加西亚·马尔克斯", "year": 1985, "movements": ["魔幻现实主义", "拉美文学爆炸"]}, {"titleOriginal": "2666", "titleTranslatedCn": "2666", "author": "罗贝托·波拉尼奥", "year": 2004, "movements": ["后现代主义", "拉美文学爆炸"]}]}
{"pathTitle": "后现代主义文学入门", "targetReader": "想理解元小说、碎片化、互文和叙事实验的读者", "works": [{"titleOriginal": "Ficciones", "titleTranslatedCn": "虚构集", "author": "豪尔赫·路易斯·博尔赫斯", "year": 1944, "movements": ["后现代主义", "魔幻现实主义", "短篇小说"]}, {"titleOriginal": "Invisible Cities", "titleTranslatedCn": "看不见的城市", "author": "伊塔洛·卡尔维诺", "year": 1972, "movements": ["后现代主义", "元小说"]}, {"titleOriginal": "If on a winter's night a traveler", "titleTranslatedCn": "如果在冬夜，一个旅人", "author": "伊塔洛·卡尔维诺", "year": 1979, "movements": ["后现代主义", "元小说"]}, {"titleOriginal": "The Name of the Rose", "titleTranslatedCn": "玫瑰的名字", "author": "翁贝托·埃科", "year": 1980, "movements": ["后现代主义", "推理小说", "元小说"]}, {"titleOriginal": "Slaughterhouse-Five", "titleTranslatedCn": "五号屠场", "author": "库尔特·冯内古特", "year": 1969, "movements": ["黑色幽默", "后现代主义", "战争文学"]}, {"titleOriginal": "Infinite Jest", "titleTranslatedCn": "无尽的玩笑", "author": "大卫·福斯特·华莱士", "year": 1996, "movements": ["后现代主义", "黑色幽默"]}]}
{"pathTitle": "黑色幽默入门", "targetReader": "想读荒诞、讽刺、战争和现代制度批判的读者", "works": [{"titleOriginal": "Cat's Cradle", "titleTranslatedCn": "猫的摇篮", "author": "库尔特·冯内古特", "year": 1963, "movements": ["黑色幽默", "后现代主义", "科幻文学"]}, {"titleOriginal": "Slaughterhouse-Five", "titleTranslatedCn": "五号屠场", "author": "库尔特·冯内古特", "year": 1969, "movements": ["黑色幽默", "后现代主义", "战争文学"]}, {"titleOriginal": "Catch-22", "titleTranslatedCn": "第二十二条军规", "author": "约瑟夫·海勒", "year": 1961, "movements": ["黑色幽默", "战争文学"]}, {"titleOriginal": "The Master and Margarita", "titleTranslatedCn": "大师和玛格丽特", "author": "米哈伊尔·布尔加科夫", "year": 1967, "movements": ["魔幻现实主义", "现代主义"]}, {"titleOriginal": "兄弟", "titleTranslatedCn": "兄弟", "author": "余华", "year": 2005, "movements": ["中国当代文学", "黑色幽默"]}, {"titleOriginal": "黄金时代", "titleTranslatedCn": "黄金时代", "author": "王小波", "year": 1992, "movements": ["中国当代文学", "黑色幽默"]}]}
{"pathTitle": "女性主义文学入门", "targetReader": "想从文学理解女性经验、性别结构和身体处境的读者", "works": [{"titleOriginal": "Jane Eyre", "titleTranslatedCn": "简·爱", "author": "夏洛蒂·勃朗特", "year": 1847, "movements": ["现实主义", "女性主义文学", "成长小说"]}, {"titleOriginal": "The Yellow Wallpaper", "titleTranslatedCn": "黄色墙纸", "author": "夏洛特·珀金斯·吉尔曼", "year": 1892, "movements": ["女性主义文学", "短篇小说"]}, {"titleOriginal": "Mrs Dalloway", "titleTranslatedCn": "达洛维夫人", "author": "弗吉尼亚·伍尔夫", "year": 1925, "movements": ["现代主义", "意识流", "女性主义文学"]}, {"titleOriginal": "The Bell Jar", "titleTranslatedCn": "钟形罩", "author": "西尔维娅·普拉斯", "year": 1963, "movements": ["女性主义文学", "现代主义"]}, {"titleOriginal": "The Handmaid's Tale", "titleTranslatedCn": "使女的故事", "author": "玛格丽特·阿特伍德", "year": 1985, "movements": ["女性主义文学", "反乌托邦文学"]}, {"titleOriginal": "The Vegetarian", "titleTranslatedCn": "素食者", "author": "韩江", "year": 2007, "movements": ["女性主义文学", "创伤文学"]}, {"titleOriginal": "The Color Purple", "titleTranslatedCn": "紫颜色", "author": "艾丽斯·沃克", "year": 1982, "movements": ["女性主义文学", "后殖民文学"]}]}
{"pathTitle": "后殖民文学入门", "targetReader": "想理解殖民历史、身份、语言和文化断裂的读者", "works": [{"titleOriginal": "Things Fall Apart", "titleTranslatedCn": "瓦解", "author": "钦努阿·阿契贝", "year": 1958, "movements": ["后殖民文学", "现实主义"]}, {"titleOriginal": "Wide Sargasso Sea", "titleTranslatedCn": "藻海无边", "author": "简·里斯", "year": 1966, "movements": ["后殖民文学", "女性主义文学"]}, {"titleOriginal": "Midnight's Children", "titleTranslatedCn": "午夜之子", "author": "萨尔曼·拉什迪", "year": 1981, "movements": ["后殖民文学", "魔幻现实主义"]}, {"titleOriginal": "The God of Small Things", "titleTranslatedCn": "微物之神", "author": "阿兰达蒂·洛伊", "year": 1997, "movements": ["后殖民文学", "女性主义文学"]}, {"titleOriginal": "The Remains of the Day", "titleTranslatedCn": "长日将尽", "author": "石黑一雄", "year": 1989, "movements": ["后殖民文学", "现实主义"]}, {"titleOriginal": "The Brief Wondrous Life of Oscar Wao", "titleTranslatedCn": "奥斯卡·瓦奥短暂而奇妙的一生", "author": "朱诺·迪亚斯", "year": 2007, "movements": ["后殖民文学", "魔幻现实主义"]}]}
{"pathTitle": "赛博朋克入门", "targetReader": "想理解高科技、低生活、资本城市和数字身份的读者", "works": [{"titleOriginal": "Do Androids Dream of Electric Sheep?", "titleTranslatedCn": "仿生人会梦见电子羊吗？", "author": "菲利普·K·迪克", "year": 1968, "movements": ["科幻文学", "赛博朋克"]}, {"titleOriginal": "Neuromancer", "titleTranslatedCn": "神经漫游者", "author": "威廉·吉布森", "year": 1984, "movements": ["赛博朋克", "科幻文学"]}, {"titleOriginal": "Snow Crash", "titleTranslatedCn": "雪崩", "author": "尼尔·斯蒂芬森", "year": 1992, "movements": ["赛博朋克", "科幻文学"]}]}
{"pathTitle": "科幻文学入门", "targetReader": "想从容易进入的作品理解科幻文学核心问题的读者", "works": [{"titleOriginal": "The Time Machine", "titleTranslatedCn": "时间机器", "author": "赫伯特·乔治·威尔斯", "year": 1895, "movements": ["科幻文学", "反乌托邦文学"]}, {"titleOriginal": "Frankenstein; or, The Modern Prometheus", "titleTranslatedCn": "弗兰肯斯坦", "author": "玛丽·雪莱", "year": 1818, "movements": ["哥特小说", "科幻文学"]}, {"titleOriginal": "Fahrenheit 451", "titleTranslatedCn": "华氏451度", "author": "雷·布拉德伯里", "year": 1953, "movements": ["科幻文学", "反乌托邦文学"]}, {"titleOriginal": "Solaris", "titleTranslatedCn": "索拉里斯星", "author": "斯坦尼斯瓦夫·莱姆", "year": 1961, "movements": ["科幻文学", "哲学入门"]}, {"titleOriginal": "Dune", "titleTranslatedCn": "沙丘", "author": "弗兰克·赫伯特", "year": 1965, "movements": ["科幻文学", "生态文学"]}, {"titleOriginal": "The Left Hand of Darkness", "titleTranslatedCn": "黑暗的左手", "author": "厄休拉·K·勒古恩", "year": 1969, "movements": ["科幻文学", "女性主义文学", "软科幻"]}, {"titleOriginal": "Neuromancer", "titleTranslatedCn": "神经漫游者", "author": "威廉·吉布森", "year": 1984, "movements": ["赛博朋克", "科幻文学"]}, {"titleOriginal": "The Three-Body Problem", "titleTranslatedCn": "三体", "author": "刘慈欣", "year": 2006, "movements": ["科幻文学", "硬科幻"]}]}
{"pathTitle": "反乌托邦文学入门", "targetReader": "想读权力、控制、技术和社会制度想象的读者", "works": [{"titleOriginal": "Animal Farm", "titleTranslatedCn": "动物农场", "author": "乔治·奥威尔", "year": 1945, "movements": ["反乌托邦文学", "讽刺文学"]}, {"titleOriginal": "Nineteen Eighty-Four", "titleTranslatedCn": "一九八四", "author": "乔治·奥威尔", "year": 1949, "movements": ["反乌托邦文学", "科幻文学"]}, {"titleOriginal": "Brave New World", "titleTranslatedCn": "美丽新世界", "author": "阿道司·赫胥黎", "year": 1932, "movements": ["反乌托邦文学", "科幻文学"]}, {"titleOriginal": "Fahrenheit 451", "titleTranslatedCn": "华氏451度", "author": "雷·布拉德伯里", "year": 1953, "movements": ["科幻文学", "反乌托邦文学"]}, {"titleOriginal": "The Handmaid's Tale", "titleTranslatedCn": "使女的故事", "author": "玛格丽特·阿特伍德", "year": 1985, "movements": ["女性主义文学", "反乌托邦文学"]}, {"titleOriginal": "Never Let Me Go", "titleTranslatedCn": "别让我走", "author": "石黑一雄", "year": 2005, "movements": ["科幻文学", "反乌托邦文学"]}, {"titleOriginal": "The Road", "titleTranslatedCn": "路", "author": "科马克·麦卡锡", "year": 2006, "movements": ["反乌托邦文学", "生态文学"]}]}
{"pathTitle": "推理小说入门", "targetReader": "想从经典侦探、硬汉派和社会派理解推理类型的读者", "works": [{"titleOriginal": "The Hound of the Baskervilles", "titleTranslatedCn": "巴斯克维尔的猎犬", "author": "阿瑟·柯南·道尔", "year": 1902, "movements": ["推理小说"]}, {"titleOriginal": "The Murder of Roger Ackroyd", "titleTranslatedCn": "罗杰疑案", "author": "阿加莎·克里斯蒂", "year": 1926, "movements": ["推理小说", "本格推理"]}, {"titleOriginal": "The Maltese Falcon", "titleTranslatedCn": "马耳他之鹰", "author": "达希尔·哈米特", "year": 1930, "movements": ["推理小说", "硬汉派侦探小说"]}, {"titleOriginal": "The Big Sleep", "titleTranslatedCn": "长眠不醒", "author": "雷蒙德·钱德勒", "year": 1939, "movements": ["推理小说", "硬汉派侦探小说"]}, {"titleOriginal": "The Name of the Rose", "titleTranslatedCn": "玫瑰的名字", "author": "翁贝托·埃科", "year": 1980, "movements": ["后现代主义", "推理小说", "元小说"]}, {"titleOriginal": "The Talented Mr. Ripley", "titleTranslatedCn": "天才雷普利", "author": "帕特里夏·海史密斯", "year": 1955, "movements": ["犯罪小说", "推理小说"]}]}
{"pathTitle": "硬汉派侦探小说入门", "targetReader": "想读冷峻城市、犯罪气息和美国硬汉侦探传统的读者", "works": [{"titleOriginal": "The Maltese Falcon", "titleTranslatedCn": "马耳他之鹰", "author": "达希尔·哈米特", "year": 1930, "movements": ["推理小说", "硬汉派侦探小说"]}, {"titleOriginal": "The Big Sleep", "titleTranslatedCn": "长眠不醒", "author": "雷蒙德·钱德勒", "year": 1939, "movements": ["推理小说", "硬汉派侦探小说"]}, {"titleOriginal": "The Postman Always Rings Twice", "titleTranslatedCn": "邮差总按两遍铃", "author": "詹姆斯·M·凯恩", "year": 1934, "movements": ["犯罪小说", "硬汉派侦探小说"]}]}
{"pathTitle": "哥特小说入门", "targetReader": "想理解恐怖、古堡、欲望、禁忌和现代恐怖源流的读者", "works": [{"titleOriginal": "Frankenstein; or, The Modern Prometheus", "titleTranslatedCn": "弗兰肯斯坦", "author": "玛丽·雪莱", "year": 1818, "movements": ["哥特小说", "科幻文学"]}, {"titleOriginal": "Wuthering Heights", "titleTranslatedCn": "呼啸山庄", "author": "艾米莉·勃朗特", "year": 1847, "movements": ["哥特小说", "浪漫主义"]}, {"titleOriginal": "The Strange Case of Dr Jekyll and Mr Hyde", "titleTranslatedCn": "化身博士", "author": "罗伯特·路易斯·史蒂文森", "year": 1886, "movements": ["哥特小说", "科幻文学"]}, {"titleOriginal": "Dracula", "titleTranslatedCn": "德古拉", "author": "布拉姆·斯托克", "year": 1897, "movements": ["哥特小说", "恐怖文学"]}, {"titleOriginal": "The Picture of Dorian Gray", "titleTranslatedCn": "道林·格雷的画像", "author": "奥斯卡·王尔德", "year": 1890, "movements": ["唯美主义", "哥特小说"]}]}
{"pathTitle": "外国文学新手入门", "targetReader": "想从较容易进入的外国经典开始读的中文读者", "works": [{"titleOriginal": "The Little Prince", "titleTranslatedCn": "小王子", "author": "安托万·德·圣-埃克苏佩里", "year": 1943, "movements": ["儿童文学", "哲学入门"]}, {"titleOriginal": "The Stranger", "titleTranslatedCn": "局外人", "author": "阿尔贝·加缪", "year": 1942, "movements": ["存在主义文学", "荒诞派", "现代主义"]}, {"titleOriginal": "Animal Farm", "titleTranslatedCn": "动物农场", "author": "乔治·奥威尔", "year": 1945, "movements": ["反乌托邦文学", "讽刺文学"]}, {"titleOriginal": "The Old Man and the Sea", "titleTranslatedCn": "老人与海", "author": "欧内斯特·海明威", "year": 1952, "movements": ["现代主义", "诺贝尔文学奖阅读"]}, {"titleOriginal": "The Great Gatsby", "titleTranslatedCn": "了不起的盖茨比", "author": "F·斯科特·菲茨杰拉德", "year": 1925, "movements": ["现代主义", "现实主义"]}, {"titleOriginal": "To Kill a Mockingbird", "titleTranslatedCn": "杀死一只知更鸟", "author": "哈珀·李", "year": 1960, "movements": ["现实主义", "成长小说"]}, {"titleOriginal": "The Remains of the Day", "titleTranslatedCn": "长日将尽", "author": "石黑一雄", "year": 1989, "movements": ["后殖民文学", "现实主义"]}]}
{"pathTitle": "诺贝尔文学奖入门", "targetReader": "想从诺奖作家中选择较容易进入作品的读者", "works": [{"titleOriginal": "The Stranger", "titleTranslatedCn": "局外人", "author": "阿尔贝·加缪", "year": 1942, "movements": ["存在主义文学", "荒诞派", "现代主义"]}, {"titleOriginal": "The Plague", "titleTranslatedCn": "鼠疫", "author": "阿尔贝·加缪", "year": 1947, "movements": ["存在主义文学", "荒诞派"]}, {"titleOriginal": "The Old Man and the Sea", "titleTranslatedCn": "老人与海", "author": "欧内斯特·海明威", "year": 1952, "movements": ["现代主义", "诺贝尔文学奖阅读"]}, {"titleOriginal": "One Day in the Life of Ivan Denisovich", "titleTranslatedCn": "伊凡·杰尼索维奇的一天", "author": "亚历山大·索尔仁尼琴", "year": 1962, "movements": ["现实主义", "纪实文学"]}, {"titleOriginal": "Blindness", "titleTranslatedCn": "失明症漫记", "author": "若泽·萨拉马戈", "year": 1995, "movements": ["寓言文学", "后现代主义"]}, {"titleOriginal": "The Remains of the Day", "titleTranslatedCn": "长日将尽", "author": "石黑一雄", "year": 1989, "movements": ["后殖民文学", "现实主义"]}, {"titleOriginal": "The Tin Drum", "titleTranslatedCn": "铁皮鼓", "author": "君特·格拉斯", "year": 1959, "movements": ["魔幻现实主义", "后现代主义"]}]}
{"pathTitle": "布克奖阅读入门", "targetReader": "想通过布克奖理解英语小说当代表达的读者", "works": [{"titleOriginal": "The Remains of the Day", "titleTranslatedCn": "长日将尽", "author": "石黑一雄", "year": 1989, "movements": ["后殖民文学", "现实主义"]}, {"titleOriginal": "Midnight's Children", "titleTranslatedCn": "午夜之子", "author": "萨尔曼·拉什迪", "year": 1981, "movements": ["后殖民文学", "魔幻现实主义"]}, {"titleOriginal": "The God of Small Things", "titleTranslatedCn": "微物之神", "author": "阿兰达蒂·洛伊", "year": 1997, "movements": ["后殖民文学", "女性主义文学"]}, {"titleOriginal": "Wolf Hall", "titleTranslatedCn": "狼厅", "author": "希拉里·曼特尔", "year": 2009, "movements": ["历史写作", "布克奖阅读"]}, {"titleOriginal": "The Sense of an Ending", "titleTranslatedCn": "终结的感觉", "author": "朱利安·巴恩斯", "year": 2011, "movements": ["后现代主义", "布克奖阅读"]}]}
{"pathTitle": "中国现代文学入门", "targetReader": "想理解五四以来中文现代文学形成过程的读者", "works": [{"titleOriginal": "呐喊", "titleTranslatedCn": "呐喊", "author": "鲁迅", "year": 1923, "movements": ["中国现代文学", "短篇小说"]}, {"titleOriginal": "彷徨", "titleTranslatedCn": "彷徨", "author": "鲁迅", "year": 1926, "movements": ["中国现代文学", "短篇小说"]}, {"titleOriginal": "边城", "titleTranslatedCn": "边城", "author": "沈从文", "year": 1934, "movements": ["中国现代文学", "乡土文学"]}, {"titleOriginal": "骆驼祥子", "titleTranslatedCn": "骆驼祥子", "author": "老舍", "year": 1936, "movements": ["中国现代文学", "现实主义"]}, {"titleOriginal": "家", "titleTranslatedCn": "家", "author": "巴金", "year": 1933, "movements": ["中国现代文学", "现实主义"]}, {"titleOriginal": "围城", "titleTranslatedCn": "围城", "author": "钱锺书", "year": 1947, "movements": ["中国现代文学", "讽刺文学"]}, {"titleOriginal": "倾城之恋", "titleTranslatedCn": "倾城之恋", "author": "张爱玲", "year": 1943, "movements": ["中国现代文学", "女性主义文学"]}]}
{"pathTitle": "鲁迅作品入门", "targetReader": "想进入鲁迅小说和现代中文文学起点的读者", "works": [{"titleOriginal": "呐喊", "titleTranslatedCn": "呐喊", "author": "鲁迅", "year": 1923, "movements": ["中国现代文学", "短篇小说"]}, {"titleOriginal": "彷徨", "titleTranslatedCn": "彷徨", "author": "鲁迅", "year": 1926, "movements": ["中国现代文学", "短篇小说"]}, {"titleOriginal": "故事新编", "titleTranslatedCn": "故事新编", "author": "鲁迅", "year": 1936, "movements": ["中国现代文学", "短篇小说", "后现代主义"]}]}
{"pathTitle": "中国现当代文学入门", "targetReader": "想从中国现代到当代建立基本阅读路径的读者", "works": [{"titleOriginal": "呐喊", "titleTranslatedCn": "呐喊", "author": "鲁迅", "year": 1923, "movements": ["中国现代文学", "短篇小说"]}, {"titleOriginal": "边城", "titleTranslatedCn": "边城", "author": "沈从文", "year": 1934, "movements": ["中国现代文学", "乡土文学"]}, {"titleOriginal": "骆驼祥子", "titleTranslatedCn": "骆驼祥子", "author": "老舍", "year": 1936, "movements": ["中国现代文学", "现实主义"]}, {"titleOriginal": "棋王", "titleTranslatedCn": "棋王", "author": "阿城", "year": 1984, "movements": ["寻根文学", "中国当代文学"]}, {"titleOriginal": "活着", "titleTranslatedCn": "活着", "author": "余华", "year": 1993, "movements": ["中国先锋文学", "中国当代文学"]}, {"titleOriginal": "白鹿原", "titleTranslatedCn": "白鹿原", "author": "陈忠实", "year": 1993, "movements": ["中国当代文学", "家族史诗", "茅盾文学奖阅读"]}, {"titleOriginal": "长恨歌", "titleTranslatedCn": "长恨歌", "author": "王安忆", "year": 1995, "movements": ["中国当代文学", "城市文学", "茅盾文学奖阅读"]}, {"titleOriginal": "繁花", "titleTranslatedCn": "繁花", "author": "金宇澄", "year": 2012, "movements": ["中国当代文学", "城市文学", "茅盾文学奖阅读"]}]}
{"pathTitle": "中国先锋文学入门", "targetReader": "想理解 1980 年代以来叙事实验和历史暴力书写的读者", "works": [{"titleOriginal": "活着", "titleTranslatedCn": "活着", "author": "余华", "year": 1993, "movements": ["中国先锋文学", "中国当代文学"]}, {"titleOriginal": "许三观卖血记", "titleTranslatedCn": "许三观卖血记", "author": "余华", "year": 1995, "movements": ["中国先锋文学", "中国当代文学"]}, {"titleOriginal": "妻妾成群", "titleTranslatedCn": "妻妾成群", "author": "苏童", "year": 1990, "movements": ["中国先锋文学", "中国当代文学"]}, {"titleOriginal": "米", "titleTranslatedCn": "米", "author": "苏童", "year": 1991, "movements": ["中国先锋文学", "中国当代文学"]}, {"titleOriginal": "马桥词典", "titleTranslatedCn": "马桥词典", "author": "韩少功", "year": 1996, "movements": ["寻根文学", "后现代主义"]}, {"titleOriginal": "红高粱家族", "titleTranslatedCn": "红高粱家族", "author": "莫言", "year": 1986, "movements": ["寻根文学", "魔幻现实主义", "中国当代文学"]}]}
{"pathTitle": "寻根文学入门", "targetReader": "想理解 1980 年代文学如何重新寻找民间、历史和地域文化的读者", "works": [{"titleOriginal": "棋王", "titleTranslatedCn": "棋王", "author": "阿城", "year": 1984, "movements": ["寻根文学", "中国当代文学"]}, {"titleOriginal": "小鲍庄", "titleTranslatedCn": "小鲍庄", "author": "王安忆", "year": 1985, "movements": ["寻根文学", "中国当代文学"]}, {"titleOriginal": "红高粱家族", "titleTranslatedCn": "红高粱家族", "author": "莫言", "year": 1986, "movements": ["寻根文学", "魔幻现实主义", "中国当代文学"]}, {"titleOriginal": "马桥词典", "titleTranslatedCn": "马桥词典", "author": "韩少功", "year": 1996, "movements": ["寻根文学", "后现代主义"]}, {"titleOriginal": "尘埃落定", "titleTranslatedCn": "尘埃落定", "author": "阿来", "year": 1998, "movements": ["中国当代文学", "寻根文学", "茅盾文学奖阅读"]}]}
{"pathTitle": "新写实小说入门", "targetReader": "想理解日常生活、普通人困境和反英雄叙事的读者", "works": [{"titleOriginal": "一句顶一万句", "titleTranslatedCn": "一句顶一万句", "author": "刘震云", "year": 2009, "movements": ["中国当代文学", "新写实小说", "茅盾文学奖阅读"]}, {"titleOriginal": "人生", "titleTranslatedCn": "人生", "author": "路遥", "year": 1982, "movements": ["现实主义", "中国当代文学"]}, {"titleOriginal": "推拿", "titleTranslatedCn": "推拿", "author": "毕飞宇", "year": 2008, "movements": ["中国当代文学", "茅盾文学奖阅读"]}]}
{"pathTitle": "茅盾文学奖入门", "targetReader": "想从中国长篇小说奖项中选择可进入作品的读者", "works": [{"titleOriginal": "平凡的世界", "titleTranslatedCn": "平凡的世界", "author": "路遥", "year": 1986, "movements": ["现实主义", "中国当代文学", "茅盾文学奖阅读"]}, {"titleOriginal": "白鹿原", "titleTranslatedCn": "白鹿原", "author": "陈忠实", "year": 1993, "movements": ["中国当代文学", "家族史诗", "茅盾文学奖阅读"]}, {"titleOriginal": "长恨歌", "titleTranslatedCn": "长恨歌", "author": "王安忆", "year": 1995, "movements": ["中国当代文学", "城市文学", "茅盾文学奖阅读"]}, {"titleOriginal": "尘埃落定", "titleTranslatedCn": "尘埃落定", "author": "阿来", "year": 1998, "movements": ["中国当代文学", "寻根文学", "茅盾文学奖阅读"]}, {"titleOriginal": "额尔古纳河右岸", "titleTranslatedCn": "额尔古纳河右岸", "author": "迟子建", "year": 2005, "movements": ["中国当代文学", "生态文学", "茅盾文学奖阅读"]}, {"titleOriginal": "繁花", "titleTranslatedCn": "繁花", "author": "金宇澄", "year": 2012, "movements": ["中国当代文学", "城市文学", "茅盾文学奖阅读"]}, {"titleOriginal": "一句顶一万句", "titleTranslatedCn": "一句顶一万句", "author": "刘震云", "year": 2009, "movements": ["中国当代文学", "新写实小说", "茅盾文学奖阅读"]}]}
{"pathTitle": "日本现代文学入门", "targetReader": "想从日本现代小说进入孤独、伦理、美学和战后精神经验的读者", "works": [{"titleOriginal": "Rashōmon", "titleTranslatedCn": "罗生门", "author": "芥川龙之介", "year": 1915, "movements": ["短篇小说", "日本现代文学"]}, {"titleOriginal": "Kokoro", "titleTranslatedCn": "心", "author": "夏目漱石", "year": 1914, "movements": ["日本现代文学", "心理小说"]}, {"titleOriginal": "Ningen Shikkaku", "titleTranslatedCn": "人间失格", "author": "太宰治", "year": 1948, "movements": ["日本无赖派", "存在主义文学"]}, {"titleOriginal": "Yukiguni", "titleTranslatedCn": "雪国", "author": "川端康成", "year": 1948, "movements": ["日本现代文学", "诺贝尔文学奖阅读"]}, {"titleOriginal": "Kinkakuji", "titleTranslatedCn": "金阁寺", "author": "三岛由纪夫", "year": 1956, "movements": ["日本现代文学", "美学小说"]}, {"titleOriginal": "The Woman in the Dunes", "titleTranslatedCn": "砂女", "author": "安部公房", "year": 1962, "movements": ["存在主义文学", "荒诞派", "日本现代文学"]}, {"titleOriginal": "Norwegian Wood", "titleTranslatedCn": "挪威的森林", "author": "村上春树", "year": 1987, "movements": ["日本现代文学", "成长小说"]}]}
{"pathTitle": "短篇小说入门", "targetReader": "想通过短篇理解现代小说技巧和文学密度的读者", "works": [{"titleOriginal": "The Metamorphosis", "titleTranslatedCn": "变形记", "author": "弗兰茨·卡夫卡", "year": 1915, "movements": ["现代主义", "荒诞派"]}, {"titleOriginal": "Ficciones", "titleTranslatedCn": "虚构集", "author": "豪尔赫·路易斯·博尔赫斯", "year": 1944, "movements": ["后现代主义", "魔幻现实主义", "短篇小说"]}, {"titleOriginal": "The Aleph", "titleTranslatedCn": "阿莱夫", "author": "豪尔赫·路易斯·博尔赫斯", "year": 1949, "movements": ["后现代主义", "魔幻现实主义", "短篇小说"]}, {"titleOriginal": "The Yellow Wallpaper", "titleTranslatedCn": "黄色墙纸", "author": "夏洛特·珀金斯·吉尔曼", "year": 1892, "movements": ["女性主义文学", "短篇小说"]}, {"titleOriginal": "Rashōmon", "titleTranslatedCn": "罗生门", "author": "芥川龙之介", "year": 1915, "movements": ["短篇小说", "日本现代文学"]}, {"titleOriginal": "呐喊", "titleTranslatedCn": "呐喊", "author": "鲁迅", "year": 1923, "movements": ["中国现代文学", "短篇小说"]}, {"titleOriginal": "受戒", "titleTranslatedCn": "受戒", "author": "汪曾祺", "year": 1980, "movements": ["中国当代文学", "短篇小说"]}]}
{"pathTitle": "非虚构写作入门", "targetReader": "想理解事实、叙事、现场和作者立场如何结合的读者", "works": [{"titleOriginal": "In Cold Blood", "titleTranslatedCn": "冷血", "author": "杜鲁门·卡波特", "year": 1966, "movements": ["新新闻主义", "非虚构写作", "犯罪小说"]}, {"titleOriginal": "The Rings of Saturn", "titleTranslatedCn": "土星之环", "author": "温弗里德·塞巴尔德", "year": 1995, "movements": ["非虚构写作", "后现代主义"]}, {"titleOriginal": "我的精神家园", "titleTranslatedCn": "我的精神家园", "author": "王小波", "year": 1997, "movements": ["非虚构写作", "中国当代文学"]}]}
{"pathTitle": "哲学感小说入门", "targetReader": "想通过小说而非理论书进入哲学问题的读者", "works": [{"titleOriginal": "The Stranger", "titleTranslatedCn": "局外人", "author": "阿尔贝·加缪", "year": 1942, "movements": ["存在主义文学", "荒诞派", "现代主义"]}, {"titleOriginal": "Siddhartha", "titleTranslatedCn": "悉达多", "author": "赫尔曼·黑塞", "year": 1922, "movements": ["现代主义", "哲学入门"]}, {"titleOriginal": "Steppenwolf", "titleTranslatedCn": "荒原狼", "author": "赫尔曼·黑塞", "year": 1927, "movements": ["现代主义", "存在主义文学"]}, {"titleOriginal": "Solaris", "titleTranslatedCn": "索拉里斯星", "author": "斯坦尼斯瓦夫·莱姆", "year": 1961, "movements": ["科幻文学", "哲学入门"]}, {"titleOriginal": "The Little Prince", "titleTranslatedCn": "小王子", "author": "安托万·德·圣-埃克苏佩里", "year": 1943, "movements": ["儿童文学", "哲学入门"]}, {"titleOriginal": "The Brothers Karamazov", "titleTranslatedCn": "卡拉马佐夫兄弟", "author": "费奥多尔·陀思妥耶夫斯基", "year": 1880, "movements": ["现实主义", "存在主义文学", "哲学入门"]}]}
```

---

## 8. 阅读路径详细候选作品块

下面每个 JSON 块都可以直接作为阅读路径提示词的输入。

```json
{
  "pathTitle": "现代主义文学入门",
  "targetReader": "想理解 20 世纪文学变化，但不想一上来读高难度长篇的中文读者",
  "works": [
    {
      "titleOriginal": "The Metamorphosis",
      "titleTranslatedCn": "变形记",
      "author": "弗兰茨·卡夫卡",
      "year": 1915,
      "movements": [
        "现代主义",
        "荒诞派"
      ]
    },
    {
      "titleOriginal": "The Stranger",
      "titleTranslatedCn": "局外人",
      "author": "阿尔贝·加缪",
      "year": 1942,
      "movements": [
        "存在主义文学",
        "荒诞派",
        "现代主义"
      ]
    },
    {
      "titleOriginal": "A Portrait of the Artist as a Young Man",
      "titleTranslatedCn": "一个青年艺术家的画像",
      "author": "詹姆斯·乔伊斯",
      "year": 1916,
      "movements": [
        "现代主义",
        "成长小说"
      ]
    },
    {
      "titleOriginal": "Mrs Dalloway",
      "titleTranslatedCn": "达洛维夫人",
      "author": "弗吉尼亚·伍尔夫",
      "year": 1925,
      "movements": [
        "现代主义",
        "意识流",
        "女性主义文学"
      ]
    },
    {
      "titleOriginal": "To the Lighthouse",
      "titleTranslatedCn": "到灯塔去",
      "author": "弗吉尼亚·伍尔夫",
      "year": 1927,
      "movements": [
        "现代主义",
        "意识流",
        "女性主义文学"
      ]
    },
    {
      "titleOriginal": "The Sound and the Fury",
      "titleTranslatedCn": "喧哗与骚动",
      "author": "威廉·福克纳",
      "year": 1929,
      "movements": [
        "现代主义",
        "意识流"
      ]
    },
    {
      "titleOriginal": "Ulysses",
      "titleTranslatedCn": "尤利西斯",
      "author": "詹姆斯·乔伊斯",
      "year": 1922,
      "movements": [
        "现代主义",
        "意识流"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "意识流文学入门",
  "targetReader": "想理解心理时间、意识流动和非线性叙事的进阶读者",
  "works": [
    {
      "titleOriginal": "Mrs Dalloway",
      "titleTranslatedCn": "达洛维夫人",
      "author": "弗吉尼亚·伍尔夫",
      "year": 1925,
      "movements": [
        "现代主义",
        "意识流",
        "女性主义文学"
      ]
    },
    {
      "titleOriginal": "To the Lighthouse",
      "titleTranslatedCn": "到灯塔去",
      "author": "弗吉尼亚·伍尔夫",
      "year": 1927,
      "movements": [
        "现代主义",
        "意识流",
        "女性主义文学"
      ]
    },
    {
      "titleOriginal": "A Portrait of the Artist as a Young Man",
      "titleTranslatedCn": "一个青年艺术家的画像",
      "author": "詹姆斯·乔伊斯",
      "year": 1916,
      "movements": [
        "现代主义",
        "成长小说"
      ]
    },
    {
      "titleOriginal": "The Sound and the Fury",
      "titleTranslatedCn": "喧哗与骚动",
      "author": "威廉·福克纳",
      "year": 1929,
      "movements": [
        "现代主义",
        "意识流"
      ]
    },
    {
      "titleOriginal": "Ulysses",
      "titleTranslatedCn": "尤利西斯",
      "author": "詹姆斯·乔伊斯",
      "year": 1922,
      "movements": [
        "现代主义",
        "意识流"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "存在主义文学入门",
  "targetReader": "想通过小说理解荒诞、自由、责任和现代人处境的读者",
  "works": [
    {
      "titleOriginal": "The Stranger",
      "titleTranslatedCn": "局外人",
      "author": "阿尔贝·加缪",
      "year": 1942,
      "movements": [
        "存在主义文学",
        "荒诞派",
        "现代主义"
      ]
    },
    {
      "titleOriginal": "The Plague",
      "titleTranslatedCn": "鼠疫",
      "author": "阿尔贝·加缪",
      "year": 1947,
      "movements": [
        "存在主义文学",
        "荒诞派"
      ]
    },
    {
      "titleOriginal": "Nausea",
      "titleTranslatedCn": "恶心",
      "author": "让-保罗·萨特",
      "year": 1938,
      "movements": [
        "存在主义文学",
        "现代主义"
      ]
    },
    {
      "titleOriginal": "Steppenwolf",
      "titleTranslatedCn": "荒原狼",
      "author": "赫尔曼·黑塞",
      "year": 1927,
      "movements": [
        "现代主义",
        "存在主义文学"
      ]
    },
    {
      "titleOriginal": "The Woman in the Dunes",
      "titleTranslatedCn": "砂女",
      "author": "安部公房",
      "year": 1962,
      "movements": [
        "存在主义文学",
        "荒诞派",
        "日本现代文学"
      ]
    },
    {
      "titleOriginal": "The Brothers Karamazov",
      "titleTranslatedCn": "卡拉马佐夫兄弟",
      "author": "费奥多尔·陀思妥耶夫斯基",
      "year": 1880,
      "movements": [
        "现实主义",
        "存在主义文学",
        "哲学入门"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "荒诞派文学入门",
  "targetReader": "想理解荒诞感、无意义处境和反传统戏剧/小说的读者",
  "works": [
    {
      "titleOriginal": "The Metamorphosis",
      "titleTranslatedCn": "变形记",
      "author": "弗兰茨·卡夫卡",
      "year": 1915,
      "movements": [
        "现代主义",
        "荒诞派"
      ]
    },
    {
      "titleOriginal": "The Trial",
      "titleTranslatedCn": "审判",
      "author": "弗兰茨·卡夫卡",
      "year": 1925,
      "movements": [
        "现代主义",
        "荒诞派"
      ]
    },
    {
      "titleOriginal": "Waiting for Godot",
      "titleTranslatedCn": "等待戈多",
      "author": "萨缪尔·贝克特",
      "year": 1953,
      "movements": [
        "荒诞派",
        "戏剧文学"
      ]
    },
    {
      "titleOriginal": "The Plague",
      "titleTranslatedCn": "鼠疫",
      "author": "阿尔贝·加缪",
      "year": 1947,
      "movements": [
        "存在主义文学",
        "荒诞派"
      ]
    },
    {
      "titleOriginal": "The Woman in the Dunes",
      "titleTranslatedCn": "砂女",
      "author": "安部公房",
      "year": 1962,
      "movements": [
        "存在主义文学",
        "荒诞派",
        "日本现代文学"
      ]
    },
    {
      "titleOriginal": "Molloy",
      "titleTranslatedCn": "莫洛伊",
      "author": "萨缪尔·贝克特",
      "year": 1951,
      "movements": [
        "荒诞派",
        "现代主义"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "魔幻现实主义入门",
  "targetReader": "想理解现实、神话、历史创伤和魔幻叙事如何共存的读者",
  "works": [
    {
      "titleOriginal": "The House of the Spirits",
      "titleTranslatedCn": "幽灵之家",
      "author": "伊莎贝尔·阿连德",
      "year": 1982,
      "movements": [
        "魔幻现实主义",
        "女性主义文学"
      ]
    },
    {
      "titleOriginal": "Cien años de soledad",
      "titleTranslatedCn": "百年孤独",
      "author": "加西亚·马尔克斯",
      "year": 1967,
      "movements": [
        "魔幻现实主义",
        "拉美文学爆炸"
      ]
    },
    {
      "titleOriginal": "Love in the Time of Cholera",
      "titleTranslatedCn": "霍乱时期的爱情",
      "author": "加西亚·马尔克斯",
      "year": 1985,
      "movements": [
        "魔幻现实主义",
        "拉美文学爆炸"
      ]
    },
    {
      "titleOriginal": "The Master and Margarita",
      "titleTranslatedCn": "大师和玛格丽特",
      "author": "米哈伊尔·布尔加科夫",
      "year": 1967,
      "movements": [
        "魔幻现实主义",
        "现代主义"
      ]
    },
    {
      "titleOriginal": "Midnight's Children",
      "titleTranslatedCn": "午夜之子",
      "author": "萨尔曼·拉什迪",
      "year": 1981,
      "movements": [
        "后殖民文学",
        "魔幻现实主义"
      ]
    },
    {
      "titleOriginal": "The Tin Drum",
      "titleTranslatedCn": "铁皮鼓",
      "author": "君特·格拉斯",
      "year": 1959,
      "movements": [
        "魔幻现实主义",
        "后现代主义"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "拉美文学爆炸入门",
  "targetReader": "想从代表性作品理解拉美 20 世纪文学高峰的读者",
  "works": [
    {
      "titleOriginal": "Ficciones",
      "titleTranslatedCn": "虚构集",
      "author": "豪尔赫·路易斯·博尔赫斯",
      "year": 1944,
      "movements": [
        "后现代主义",
        "魔幻现实主义",
        "短篇小说"
      ]
    },
    {
      "titleOriginal": "Hopscotch",
      "titleTranslatedCn": "跳房子",
      "author": "胡利奥·科塔萨尔",
      "year": 1963,
      "movements": [
        "拉美文学爆炸",
        "后现代主义"
      ]
    },
    {
      "titleOriginal": "Cien años de soledad",
      "titleTranslatedCn": "百年孤独",
      "author": "加西亚·马尔克斯",
      "year": 1967,
      "movements": [
        "魔幻现实主义",
        "拉美文学爆炸"
      ]
    },
    {
      "titleOriginal": "Love in the Time of Cholera",
      "titleTranslatedCn": "霍乱时期的爱情",
      "author": "加西亚·马尔克斯",
      "year": 1985,
      "movements": [
        "魔幻现实主义",
        "拉美文学爆炸"
      ]
    },
    {
      "titleOriginal": "2666",
      "titleTranslatedCn": "2666",
      "author": "罗贝托·波拉尼奥",
      "year": 2004,
      "movements": [
        "后现代主义",
        "拉美文学爆炸"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "后现代主义文学入门",
  "targetReader": "想理解元小说、碎片化、互文和叙事实验的读者",
  "works": [
    {
      "titleOriginal": "Ficciones",
      "titleTranslatedCn": "虚构集",
      "author": "豪尔赫·路易斯·博尔赫斯",
      "year": 1944,
      "movements": [
        "后现代主义",
        "魔幻现实主义",
        "短篇小说"
      ]
    },
    {
      "titleOriginal": "Invisible Cities",
      "titleTranslatedCn": "看不见的城市",
      "author": "伊塔洛·卡尔维诺",
      "year": 1972,
      "movements": [
        "后现代主义",
        "元小说"
      ]
    },
    {
      "titleOriginal": "If on a winter's night a traveler",
      "titleTranslatedCn": "如果在冬夜，一个旅人",
      "author": "伊塔洛·卡尔维诺",
      "year": 1979,
      "movements": [
        "后现代主义",
        "元小说"
      ]
    },
    {
      "titleOriginal": "The Name of the Rose",
      "titleTranslatedCn": "玫瑰的名字",
      "author": "翁贝托·埃科",
      "year": 1980,
      "movements": [
        "后现代主义",
        "推理小说",
        "元小说"
      ]
    },
    {
      "titleOriginal": "Slaughterhouse-Five",
      "titleTranslatedCn": "五号屠场",
      "author": "库尔特·冯内古特",
      "year": 1969,
      "movements": [
        "黑色幽默",
        "后现代主义",
        "战争文学"
      ]
    },
    {
      "titleOriginal": "Infinite Jest",
      "titleTranslatedCn": "无尽的玩笑",
      "author": "大卫·福斯特·华莱士",
      "year": 1996,
      "movements": [
        "后现代主义",
        "黑色幽默"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "黑色幽默入门",
  "targetReader": "想读荒诞、讽刺、战争和现代制度批判的读者",
  "works": [
    {
      "titleOriginal": "Cat's Cradle",
      "titleTranslatedCn": "猫的摇篮",
      "author": "库尔特·冯内古特",
      "year": 1963,
      "movements": [
        "黑色幽默",
        "后现代主义",
        "科幻文学"
      ]
    },
    {
      "titleOriginal": "Slaughterhouse-Five",
      "titleTranslatedCn": "五号屠场",
      "author": "库尔特·冯内古特",
      "year": 1969,
      "movements": [
        "黑色幽默",
        "后现代主义",
        "战争文学"
      ]
    },
    {
      "titleOriginal": "Catch-22",
      "titleTranslatedCn": "第二十二条军规",
      "author": "约瑟夫·海勒",
      "year": 1961,
      "movements": [
        "黑色幽默",
        "战争文学"
      ]
    },
    {
      "titleOriginal": "The Master and Margarita",
      "titleTranslatedCn": "大师和玛格丽特",
      "author": "米哈伊尔·布尔加科夫",
      "year": 1967,
      "movements": [
        "魔幻现实主义",
        "现代主义"
      ]
    },
    {
      "titleOriginal": "兄弟",
      "titleTranslatedCn": "兄弟",
      "author": "余华",
      "year": 2005,
      "movements": [
        "中国当代文学",
        "黑色幽默"
      ]
    },
    {
      "titleOriginal": "黄金时代",
      "titleTranslatedCn": "黄金时代",
      "author": "王小波",
      "year": 1992,
      "movements": [
        "中国当代文学",
        "黑色幽默"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "女性主义文学入门",
  "targetReader": "想从文学理解女性经验、性别结构和身体处境的读者",
  "works": [
    {
      "titleOriginal": "Jane Eyre",
      "titleTranslatedCn": "简·爱",
      "author": "夏洛蒂·勃朗特",
      "year": 1847,
      "movements": [
        "现实主义",
        "女性主义文学",
        "成长小说"
      ]
    },
    {
      "titleOriginal": "The Yellow Wallpaper",
      "titleTranslatedCn": "黄色墙纸",
      "author": "夏洛特·珀金斯·吉尔曼",
      "year": 1892,
      "movements": [
        "女性主义文学",
        "短篇小说"
      ]
    },
    {
      "titleOriginal": "Mrs Dalloway",
      "titleTranslatedCn": "达洛维夫人",
      "author": "弗吉尼亚·伍尔夫",
      "year": 1925,
      "movements": [
        "现代主义",
        "意识流",
        "女性主义文学"
      ]
    },
    {
      "titleOriginal": "The Bell Jar",
      "titleTranslatedCn": "钟形罩",
      "author": "西尔维娅·普拉斯",
      "year": 1963,
      "movements": [
        "女性主义文学",
        "现代主义"
      ]
    },
    {
      "titleOriginal": "The Handmaid's Tale",
      "titleTranslatedCn": "使女的故事",
      "author": "玛格丽特·阿特伍德",
      "year": 1985,
      "movements": [
        "女性主义文学",
        "反乌托邦文学"
      ]
    },
    {
      "titleOriginal": "The Vegetarian",
      "titleTranslatedCn": "素食者",
      "author": "韩江",
      "year": 2007,
      "movements": [
        "女性主义文学",
        "创伤文学"
      ]
    },
    {
      "titleOriginal": "The Color Purple",
      "titleTranslatedCn": "紫颜色",
      "author": "艾丽斯·沃克",
      "year": 1982,
      "movements": [
        "女性主义文学",
        "后殖民文学"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "后殖民文学入门",
  "targetReader": "想理解殖民历史、身份、语言和文化断裂的读者",
  "works": [
    {
      "titleOriginal": "Things Fall Apart",
      "titleTranslatedCn": "瓦解",
      "author": "钦努阿·阿契贝",
      "year": 1958,
      "movements": [
        "后殖民文学",
        "现实主义"
      ]
    },
    {
      "titleOriginal": "Wide Sargasso Sea",
      "titleTranslatedCn": "藻海无边",
      "author": "简·里斯",
      "year": 1966,
      "movements": [
        "后殖民文学",
        "女性主义文学"
      ]
    },
    {
      "titleOriginal": "Midnight's Children",
      "titleTranslatedCn": "午夜之子",
      "author": "萨尔曼·拉什迪",
      "year": 1981,
      "movements": [
        "后殖民文学",
        "魔幻现实主义"
      ]
    },
    {
      "titleOriginal": "The God of Small Things",
      "titleTranslatedCn": "微物之神",
      "author": "阿兰达蒂·洛伊",
      "year": 1997,
      "movements": [
        "后殖民文学",
        "女性主义文学"
      ]
    },
    {
      "titleOriginal": "The Remains of the Day",
      "titleTranslatedCn": "长日将尽",
      "author": "石黑一雄",
      "year": 1989,
      "movements": [
        "后殖民文学",
        "现实主义"
      ]
    },
    {
      "titleOriginal": "The Brief Wondrous Life of Oscar Wao",
      "titleTranslatedCn": "奥斯卡·瓦奥短暂而奇妙的一生",
      "author": "朱诺·迪亚斯",
      "year": 2007,
      "movements": [
        "后殖民文学",
        "魔幻现实主义"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "赛博朋克入门",
  "targetReader": "想理解高科技、低生活、资本城市和数字身份的读者",
  "works": [
    {
      "titleOriginal": "Do Androids Dream of Electric Sheep?",
      "titleTranslatedCn": "仿生人会梦见电子羊吗？",
      "author": "菲利普·K·迪克",
      "year": 1968,
      "movements": [
        "科幻文学",
        "赛博朋克"
      ]
    },
    {
      "titleOriginal": "Neuromancer",
      "titleTranslatedCn": "神经漫游者",
      "author": "威廉·吉布森",
      "year": 1984,
      "movements": [
        "赛博朋克",
        "科幻文学"
      ]
    },
    {
      "titleOriginal": "Snow Crash",
      "titleTranslatedCn": "雪崩",
      "author": "尼尔·斯蒂芬森",
      "year": 1992,
      "movements": [
        "赛博朋克",
        "科幻文学"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "科幻文学入门",
  "targetReader": "想从容易进入的作品理解科幻文学核心问题的读者",
  "works": [
    {
      "titleOriginal": "The Time Machine",
      "titleTranslatedCn": "时间机器",
      "author": "赫伯特·乔治·威尔斯",
      "year": 1895,
      "movements": [
        "科幻文学",
        "反乌托邦文学"
      ]
    },
    {
      "titleOriginal": "Frankenstein; or, The Modern Prometheus",
      "titleTranslatedCn": "弗兰肯斯坦",
      "author": "玛丽·雪莱",
      "year": 1818,
      "movements": [
        "哥特小说",
        "科幻文学"
      ]
    },
    {
      "titleOriginal": "Fahrenheit 451",
      "titleTranslatedCn": "华氏451度",
      "author": "雷·布拉德伯里",
      "year": 1953,
      "movements": [
        "科幻文学",
        "反乌托邦文学"
      ]
    },
    {
      "titleOriginal": "Solaris",
      "titleTranslatedCn": "索拉里斯星",
      "author": "斯坦尼斯瓦夫·莱姆",
      "year": 1961,
      "movements": [
        "科幻文学",
        "哲学入门"
      ]
    },
    {
      "titleOriginal": "Dune",
      "titleTranslatedCn": "沙丘",
      "author": "弗兰克·赫伯特",
      "year": 1965,
      "movements": [
        "科幻文学",
        "生态文学"
      ]
    },
    {
      "titleOriginal": "The Left Hand of Darkness",
      "titleTranslatedCn": "黑暗的左手",
      "author": "厄休拉·K·勒古恩",
      "year": 1969,
      "movements": [
        "科幻文学",
        "女性主义文学",
        "软科幻"
      ]
    },
    {
      "titleOriginal": "Neuromancer",
      "titleTranslatedCn": "神经漫游者",
      "author": "威廉·吉布森",
      "year": 1984,
      "movements": [
        "赛博朋克",
        "科幻文学"
      ]
    },
    {
      "titleOriginal": "The Three-Body Problem",
      "titleTranslatedCn": "三体",
      "author": "刘慈欣",
      "year": 2006,
      "movements": [
        "科幻文学",
        "硬科幻"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "反乌托邦文学入门",
  "targetReader": "想读权力、控制、技术和社会制度想象的读者",
  "works": [
    {
      "titleOriginal": "Animal Farm",
      "titleTranslatedCn": "动物农场",
      "author": "乔治·奥威尔",
      "year": 1945,
      "movements": [
        "反乌托邦文学",
        "讽刺文学"
      ]
    },
    {
      "titleOriginal": "Nineteen Eighty-Four",
      "titleTranslatedCn": "一九八四",
      "author": "乔治·奥威尔",
      "year": 1949,
      "movements": [
        "反乌托邦文学",
        "科幻文学"
      ]
    },
    {
      "titleOriginal": "Brave New World",
      "titleTranslatedCn": "美丽新世界",
      "author": "阿道司·赫胥黎",
      "year": 1932,
      "movements": [
        "反乌托邦文学",
        "科幻文学"
      ]
    },
    {
      "titleOriginal": "Fahrenheit 451",
      "titleTranslatedCn": "华氏451度",
      "author": "雷·布拉德伯里",
      "year": 1953,
      "movements": [
        "科幻文学",
        "反乌托邦文学"
      ]
    },
    {
      "titleOriginal": "The Handmaid's Tale",
      "titleTranslatedCn": "使女的故事",
      "author": "玛格丽特·阿特伍德",
      "year": 1985,
      "movements": [
        "女性主义文学",
        "反乌托邦文学"
      ]
    },
    {
      "titleOriginal": "Never Let Me Go",
      "titleTranslatedCn": "别让我走",
      "author": "石黑一雄",
      "year": 2005,
      "movements": [
        "科幻文学",
        "反乌托邦文学"
      ]
    },
    {
      "titleOriginal": "The Road",
      "titleTranslatedCn": "路",
      "author": "科马克·麦卡锡",
      "year": 2006,
      "movements": [
        "反乌托邦文学",
        "生态文学"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "推理小说入门",
  "targetReader": "想从经典侦探、硬汉派和社会派理解推理类型的读者",
  "works": [
    {
      "titleOriginal": "The Hound of the Baskervilles",
      "titleTranslatedCn": "巴斯克维尔的猎犬",
      "author": "阿瑟·柯南·道尔",
      "year": 1902,
      "movements": [
        "推理小说"
      ]
    },
    {
      "titleOriginal": "The Murder of Roger Ackroyd",
      "titleTranslatedCn": "罗杰疑案",
      "author": "阿加莎·克里斯蒂",
      "year": 1926,
      "movements": [
        "推理小说",
        "本格推理"
      ]
    },
    {
      "titleOriginal": "The Maltese Falcon",
      "titleTranslatedCn": "马耳他之鹰",
      "author": "达希尔·哈米特",
      "year": 1930,
      "movements": [
        "推理小说",
        "硬汉派侦探小说"
      ]
    },
    {
      "titleOriginal": "The Big Sleep",
      "titleTranslatedCn": "长眠不醒",
      "author": "雷蒙德·钱德勒",
      "year": 1939,
      "movements": [
        "推理小说",
        "硬汉派侦探小说"
      ]
    },
    {
      "titleOriginal": "The Name of the Rose",
      "titleTranslatedCn": "玫瑰的名字",
      "author": "翁贝托·埃科",
      "year": 1980,
      "movements": [
        "后现代主义",
        "推理小说",
        "元小说"
      ]
    },
    {
      "titleOriginal": "The Talented Mr. Ripley",
      "titleTranslatedCn": "天才雷普利",
      "author": "帕特里夏·海史密斯",
      "year": 1955,
      "movements": [
        "犯罪小说",
        "推理小说"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "硬汉派侦探小说入门",
  "targetReader": "想读冷峻城市、犯罪气息和美国硬汉侦探传统的读者",
  "works": [
    {
      "titleOriginal": "The Maltese Falcon",
      "titleTranslatedCn": "马耳他之鹰",
      "author": "达希尔·哈米特",
      "year": 1930,
      "movements": [
        "推理小说",
        "硬汉派侦探小说"
      ]
    },
    {
      "titleOriginal": "The Big Sleep",
      "titleTranslatedCn": "长眠不醒",
      "author": "雷蒙德·钱德勒",
      "year": 1939,
      "movements": [
        "推理小说",
        "硬汉派侦探小说"
      ]
    },
    {
      "titleOriginal": "The Postman Always Rings Twice",
      "titleTranslatedCn": "邮差总按两遍铃",
      "author": "詹姆斯·M·凯恩",
      "year": 1934,
      "movements": [
        "犯罪小说",
        "硬汉派侦探小说"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "哥特小说入门",
  "targetReader": "想理解恐怖、古堡、欲望、禁忌和现代恐怖源流的读者",
  "works": [
    {
      "titleOriginal": "Frankenstein; or, The Modern Prometheus",
      "titleTranslatedCn": "弗兰肯斯坦",
      "author": "玛丽·雪莱",
      "year": 1818,
      "movements": [
        "哥特小说",
        "科幻文学"
      ]
    },
    {
      "titleOriginal": "Wuthering Heights",
      "titleTranslatedCn": "呼啸山庄",
      "author": "艾米莉·勃朗特",
      "year": 1847,
      "movements": [
        "哥特小说",
        "浪漫主义"
      ]
    },
    {
      "titleOriginal": "The Strange Case of Dr Jekyll and Mr Hyde",
      "titleTranslatedCn": "化身博士",
      "author": "罗伯特·路易斯·史蒂文森",
      "year": 1886,
      "movements": [
        "哥特小说",
        "科幻文学"
      ]
    },
    {
      "titleOriginal": "Dracula",
      "titleTranslatedCn": "德古拉",
      "author": "布拉姆·斯托克",
      "year": 1897,
      "movements": [
        "哥特小说",
        "恐怖文学"
      ]
    },
    {
      "titleOriginal": "The Picture of Dorian Gray",
      "titleTranslatedCn": "道林·格雷的画像",
      "author": "奥斯卡·王尔德",
      "year": 1890,
      "movements": [
        "唯美主义",
        "哥特小说"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "外国文学新手入门",
  "targetReader": "想从较容易进入的外国经典开始读的中文读者",
  "works": [
    {
      "titleOriginal": "The Little Prince",
      "titleTranslatedCn": "小王子",
      "author": "安托万·德·圣-埃克苏佩里",
      "year": 1943,
      "movements": [
        "儿童文学",
        "哲学入门"
      ]
    },
    {
      "titleOriginal": "The Stranger",
      "titleTranslatedCn": "局外人",
      "author": "阿尔贝·加缪",
      "year": 1942,
      "movements": [
        "存在主义文学",
        "荒诞派",
        "现代主义"
      ]
    },
    {
      "titleOriginal": "Animal Farm",
      "titleTranslatedCn": "动物农场",
      "author": "乔治·奥威尔",
      "year": 1945,
      "movements": [
        "反乌托邦文学",
        "讽刺文学"
      ]
    },
    {
      "titleOriginal": "The Old Man and the Sea",
      "titleTranslatedCn": "老人与海",
      "author": "欧内斯特·海明威",
      "year": 1952,
      "movements": [
        "现代主义",
        "诺贝尔文学奖阅读"
      ]
    },
    {
      "titleOriginal": "The Great Gatsby",
      "titleTranslatedCn": "了不起的盖茨比",
      "author": "F·斯科特·菲茨杰拉德",
      "year": 1925,
      "movements": [
        "现代主义",
        "现实主义"
      ]
    },
    {
      "titleOriginal": "To Kill a Mockingbird",
      "titleTranslatedCn": "杀死一只知更鸟",
      "author": "哈珀·李",
      "year": 1960,
      "movements": [
        "现实主义",
        "成长小说"
      ]
    },
    {
      "titleOriginal": "The Remains of the Day",
      "titleTranslatedCn": "长日将尽",
      "author": "石黑一雄",
      "year": 1989,
      "movements": [
        "后殖民文学",
        "现实主义"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "诺贝尔文学奖入门",
  "targetReader": "想从诺奖作家中选择较容易进入作品的读者",
  "works": [
    {
      "titleOriginal": "The Stranger",
      "titleTranslatedCn": "局外人",
      "author": "阿尔贝·加缪",
      "year": 1942,
      "movements": [
        "存在主义文学",
        "荒诞派",
        "现代主义"
      ]
    },
    {
      "titleOriginal": "The Plague",
      "titleTranslatedCn": "鼠疫",
      "author": "阿尔贝·加缪",
      "year": 1947,
      "movements": [
        "存在主义文学",
        "荒诞派"
      ]
    },
    {
      "titleOriginal": "The Old Man and the Sea",
      "titleTranslatedCn": "老人与海",
      "author": "欧内斯特·海明威",
      "year": 1952,
      "movements": [
        "现代主义",
        "诺贝尔文学奖阅读"
      ]
    },
    {
      "titleOriginal": "One Day in the Life of Ivan Denisovich",
      "titleTranslatedCn": "伊凡·杰尼索维奇的一天",
      "author": "亚历山大·索尔仁尼琴",
      "year": 1962,
      "movements": [
        "现实主义",
        "纪实文学"
      ]
    },
    {
      "titleOriginal": "Blindness",
      "titleTranslatedCn": "失明症漫记",
      "author": "若泽·萨拉马戈",
      "year": 1995,
      "movements": [
        "寓言文学",
        "后现代主义"
      ]
    },
    {
      "titleOriginal": "The Remains of the Day",
      "titleTranslatedCn": "长日将尽",
      "author": "石黑一雄",
      "year": 1989,
      "movements": [
        "后殖民文学",
        "现实主义"
      ]
    },
    {
      "titleOriginal": "The Tin Drum",
      "titleTranslatedCn": "铁皮鼓",
      "author": "君特·格拉斯",
      "year": 1959,
      "movements": [
        "魔幻现实主义",
        "后现代主义"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "布克奖阅读入门",
  "targetReader": "想通过布克奖理解英语小说当代表达的读者",
  "works": [
    {
      "titleOriginal": "The Remains of the Day",
      "titleTranslatedCn": "长日将尽",
      "author": "石黑一雄",
      "year": 1989,
      "movements": [
        "后殖民文学",
        "现实主义"
      ]
    },
    {
      "titleOriginal": "Midnight's Children",
      "titleTranslatedCn": "午夜之子",
      "author": "萨尔曼·拉什迪",
      "year": 1981,
      "movements": [
        "后殖民文学",
        "魔幻现实主义"
      ]
    },
    {
      "titleOriginal": "The God of Small Things",
      "titleTranslatedCn": "微物之神",
      "author": "阿兰达蒂·洛伊",
      "year": 1997,
      "movements": [
        "后殖民文学",
        "女性主义文学"
      ]
    },
    {
      "titleOriginal": "Wolf Hall",
      "titleTranslatedCn": "狼厅",
      "author": "希拉里·曼特尔",
      "year": 2009,
      "movements": [
        "历史写作",
        "布克奖阅读"
      ]
    },
    {
      "titleOriginal": "The Sense of an Ending",
      "titleTranslatedCn": "终结的感觉",
      "author": "朱利安·巴恩斯",
      "year": 2011,
      "movements": [
        "后现代主义",
        "布克奖阅读"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "中国现代文学入门",
  "targetReader": "想理解五四以来中文现代文学形成过程的读者",
  "works": [
    {
      "titleOriginal": "呐喊",
      "titleTranslatedCn": "呐喊",
      "author": "鲁迅",
      "year": 1923,
      "movements": [
        "中国现代文学",
        "短篇小说"
      ]
    },
    {
      "titleOriginal": "彷徨",
      "titleTranslatedCn": "彷徨",
      "author": "鲁迅",
      "year": 1926,
      "movements": [
        "中国现代文学",
        "短篇小说"
      ]
    },
    {
      "titleOriginal": "边城",
      "titleTranslatedCn": "边城",
      "author": "沈从文",
      "year": 1934,
      "movements": [
        "中国现代文学",
        "乡土文学"
      ]
    },
    {
      "titleOriginal": "骆驼祥子",
      "titleTranslatedCn": "骆驼祥子",
      "author": "老舍",
      "year": 1936,
      "movements": [
        "中国现代文学",
        "现实主义"
      ]
    },
    {
      "titleOriginal": "家",
      "titleTranslatedCn": "家",
      "author": "巴金",
      "year": 1933,
      "movements": [
        "中国现代文学",
        "现实主义"
      ]
    },
    {
      "titleOriginal": "围城",
      "titleTranslatedCn": "围城",
      "author": "钱锺书",
      "year": 1947,
      "movements": [
        "中国现代文学",
        "讽刺文学"
      ]
    },
    {
      "titleOriginal": "倾城之恋",
      "titleTranslatedCn": "倾城之恋",
      "author": "张爱玲",
      "year": 1943,
      "movements": [
        "中国现代文学",
        "女性主义文学"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "鲁迅作品入门",
  "targetReader": "想进入鲁迅小说和现代中文文学起点的读者",
  "works": [
    {
      "titleOriginal": "呐喊",
      "titleTranslatedCn": "呐喊",
      "author": "鲁迅",
      "year": 1923,
      "movements": [
        "中国现代文学",
        "短篇小说"
      ]
    },
    {
      "titleOriginal": "彷徨",
      "titleTranslatedCn": "彷徨",
      "author": "鲁迅",
      "year": 1926,
      "movements": [
        "中国现代文学",
        "短篇小说"
      ]
    },
    {
      "titleOriginal": "故事新编",
      "titleTranslatedCn": "故事新编",
      "author": "鲁迅",
      "year": 1936,
      "movements": [
        "中国现代文学",
        "短篇小说",
        "后现代主义"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "中国现当代文学入门",
  "targetReader": "想从中国现代到当代建立基本阅读路径的读者",
  "works": [
    {
      "titleOriginal": "呐喊",
      "titleTranslatedCn": "呐喊",
      "author": "鲁迅",
      "year": 1923,
      "movements": [
        "中国现代文学",
        "短篇小说"
      ]
    },
    {
      "titleOriginal": "边城",
      "titleTranslatedCn": "边城",
      "author": "沈从文",
      "year": 1934,
      "movements": [
        "中国现代文学",
        "乡土文学"
      ]
    },
    {
      "titleOriginal": "骆驼祥子",
      "titleTranslatedCn": "骆驼祥子",
      "author": "老舍",
      "year": 1936,
      "movements": [
        "中国现代文学",
        "现实主义"
      ]
    },
    {
      "titleOriginal": "棋王",
      "titleTranslatedCn": "棋王",
      "author": "阿城",
      "year": 1984,
      "movements": [
        "寻根文学",
        "中国当代文学"
      ]
    },
    {
      "titleOriginal": "活着",
      "titleTranslatedCn": "活着",
      "author": "余华",
      "year": 1993,
      "movements": [
        "中国先锋文学",
        "中国当代文学"
      ]
    },
    {
      "titleOriginal": "白鹿原",
      "titleTranslatedCn": "白鹿原",
      "author": "陈忠实",
      "year": 1993,
      "movements": [
        "中国当代文学",
        "家族史诗",
        "茅盾文学奖阅读"
      ]
    },
    {
      "titleOriginal": "长恨歌",
      "titleTranslatedCn": "长恨歌",
      "author": "王安忆",
      "year": 1995,
      "movements": [
        "中国当代文学",
        "城市文学",
        "茅盾文学奖阅读"
      ]
    },
    {
      "titleOriginal": "繁花",
      "titleTranslatedCn": "繁花",
      "author": "金宇澄",
      "year": 2012,
      "movements": [
        "中国当代文学",
        "城市文学",
        "茅盾文学奖阅读"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "中国先锋文学入门",
  "targetReader": "想理解 1980 年代以来叙事实验和历史暴力书写的读者",
  "works": [
    {
      "titleOriginal": "活着",
      "titleTranslatedCn": "活着",
      "author": "余华",
      "year": 1993,
      "movements": [
        "中国先锋文学",
        "中国当代文学"
      ]
    },
    {
      "titleOriginal": "许三观卖血记",
      "titleTranslatedCn": "许三观卖血记",
      "author": "余华",
      "year": 1995,
      "movements": [
        "中国先锋文学",
        "中国当代文学"
      ]
    },
    {
      "titleOriginal": "妻妾成群",
      "titleTranslatedCn": "妻妾成群",
      "author": "苏童",
      "year": 1990,
      "movements": [
        "中国先锋文学",
        "中国当代文学"
      ]
    },
    {
      "titleOriginal": "米",
      "titleTranslatedCn": "米",
      "author": "苏童",
      "year": 1991,
      "movements": [
        "中国先锋文学",
        "中国当代文学"
      ]
    },
    {
      "titleOriginal": "马桥词典",
      "titleTranslatedCn": "马桥词典",
      "author": "韩少功",
      "year": 1996,
      "movements": [
        "寻根文学",
        "后现代主义"
      ]
    },
    {
      "titleOriginal": "红高粱家族",
      "titleTranslatedCn": "红高粱家族",
      "author": "莫言",
      "year": 1986,
      "movements": [
        "寻根文学",
        "魔幻现实主义",
        "中国当代文学"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "寻根文学入门",
  "targetReader": "想理解 1980 年代文学如何重新寻找民间、历史和地域文化的读者",
  "works": [
    {
      "titleOriginal": "棋王",
      "titleTranslatedCn": "棋王",
      "author": "阿城",
      "year": 1984,
      "movements": [
        "寻根文学",
        "中国当代文学"
      ]
    },
    {
      "titleOriginal": "小鲍庄",
      "titleTranslatedCn": "小鲍庄",
      "author": "王安忆",
      "year": 1985,
      "movements": [
        "寻根文学",
        "中国当代文学"
      ]
    },
    {
      "titleOriginal": "红高粱家族",
      "titleTranslatedCn": "红高粱家族",
      "author": "莫言",
      "year": 1986,
      "movements": [
        "寻根文学",
        "魔幻现实主义",
        "中国当代文学"
      ]
    },
    {
      "titleOriginal": "马桥词典",
      "titleTranslatedCn": "马桥词典",
      "author": "韩少功",
      "year": 1996,
      "movements": [
        "寻根文学",
        "后现代主义"
      ]
    },
    {
      "titleOriginal": "尘埃落定",
      "titleTranslatedCn": "尘埃落定",
      "author": "阿来",
      "year": 1998,
      "movements": [
        "中国当代文学",
        "寻根文学",
        "茅盾文学奖阅读"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "新写实小说入门",
  "targetReader": "想理解日常生活、普通人困境和反英雄叙事的读者",
  "works": [
    {
      "titleOriginal": "一句顶一万句",
      "titleTranslatedCn": "一句顶一万句",
      "author": "刘震云",
      "year": 2009,
      "movements": [
        "中国当代文学",
        "新写实小说",
        "茅盾文学奖阅读"
      ]
    },
    {
      "titleOriginal": "人生",
      "titleTranslatedCn": "人生",
      "author": "路遥",
      "year": 1982,
      "movements": [
        "现实主义",
        "中国当代文学"
      ]
    },
    {
      "titleOriginal": "推拿",
      "titleTranslatedCn": "推拿",
      "author": "毕飞宇",
      "year": 2008,
      "movements": [
        "中国当代文学",
        "茅盾文学奖阅读"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "茅盾文学奖入门",
  "targetReader": "想从中国长篇小说奖项中选择可进入作品的读者",
  "works": [
    {
      "titleOriginal": "平凡的世界",
      "titleTranslatedCn": "平凡的世界",
      "author": "路遥",
      "year": 1986,
      "movements": [
        "现实主义",
        "中国当代文学",
        "茅盾文学奖阅读"
      ]
    },
    {
      "titleOriginal": "白鹿原",
      "titleTranslatedCn": "白鹿原",
      "author": "陈忠实",
      "year": 1993,
      "movements": [
        "中国当代文学",
        "家族史诗",
        "茅盾文学奖阅读"
      ]
    },
    {
      "titleOriginal": "长恨歌",
      "titleTranslatedCn": "长恨歌",
      "author": "王安忆",
      "year": 1995,
      "movements": [
        "中国当代文学",
        "城市文学",
        "茅盾文学奖阅读"
      ]
    },
    {
      "titleOriginal": "尘埃落定",
      "titleTranslatedCn": "尘埃落定",
      "author": "阿来",
      "year": 1998,
      "movements": [
        "中国当代文学",
        "寻根文学",
        "茅盾文学奖阅读"
      ]
    },
    {
      "titleOriginal": "额尔古纳河右岸",
      "titleTranslatedCn": "额尔古纳河右岸",
      "author": "迟子建",
      "year": 2005,
      "movements": [
        "中国当代文学",
        "生态文学",
        "茅盾文学奖阅读"
      ]
    },
    {
      "titleOriginal": "繁花",
      "titleTranslatedCn": "繁花",
      "author": "金宇澄",
      "year": 2012,
      "movements": [
        "中国当代文学",
        "城市文学",
        "茅盾文学奖阅读"
      ]
    },
    {
      "titleOriginal": "一句顶一万句",
      "titleTranslatedCn": "一句顶一万句",
      "author": "刘震云",
      "year": 2009,
      "movements": [
        "中国当代文学",
        "新写实小说",
        "茅盾文学奖阅读"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "日本现代文学入门",
  "targetReader": "想从日本现代小说进入孤独、伦理、美学和战后精神经验的读者",
  "works": [
    {
      "titleOriginal": "Rashōmon",
      "titleTranslatedCn": "罗生门",
      "author": "芥川龙之介",
      "year": 1915,
      "movements": [
        "短篇小说",
        "日本现代文学"
      ]
    },
    {
      "titleOriginal": "Kokoro",
      "titleTranslatedCn": "心",
      "author": "夏目漱石",
      "year": 1914,
      "movements": [
        "日本现代文学",
        "心理小说"
      ]
    },
    {
      "titleOriginal": "Ningen Shikkaku",
      "titleTranslatedCn": "人间失格",
      "author": "太宰治",
      "year": 1948,
      "movements": [
        "日本无赖派",
        "存在主义文学"
      ]
    },
    {
      "titleOriginal": "Yukiguni",
      "titleTranslatedCn": "雪国",
      "author": "川端康成",
      "year": 1948,
      "movements": [
        "日本现代文学",
        "诺贝尔文学奖阅读"
      ]
    },
    {
      "titleOriginal": "Kinkakuji",
      "titleTranslatedCn": "金阁寺",
      "author": "三岛由纪夫",
      "year": 1956,
      "movements": [
        "日本现代文学",
        "美学小说"
      ]
    },
    {
      "titleOriginal": "The Woman in the Dunes",
      "titleTranslatedCn": "砂女",
      "author": "安部公房",
      "year": 1962,
      "movements": [
        "存在主义文学",
        "荒诞派",
        "日本现代文学"
      ]
    },
    {
      "titleOriginal": "Norwegian Wood",
      "titleTranslatedCn": "挪威的森林",
      "author": "村上春树",
      "year": 1987,
      "movements": [
        "日本现代文学",
        "成长小说"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "短篇小说入门",
  "targetReader": "想通过短篇理解现代小说技巧和文学密度的读者",
  "works": [
    {
      "titleOriginal": "The Metamorphosis",
      "titleTranslatedCn": "变形记",
      "author": "弗兰茨·卡夫卡",
      "year": 1915,
      "movements": [
        "现代主义",
        "荒诞派"
      ]
    },
    {
      "titleOriginal": "Ficciones",
      "titleTranslatedCn": "虚构集",
      "author": "豪尔赫·路易斯·博尔赫斯",
      "year": 1944,
      "movements": [
        "后现代主义",
        "魔幻现实主义",
        "短篇小说"
      ]
    },
    {
      "titleOriginal": "The Aleph",
      "titleTranslatedCn": "阿莱夫",
      "author": "豪尔赫·路易斯·博尔赫斯",
      "year": 1949,
      "movements": [
        "后现代主义",
        "魔幻现实主义",
        "短篇小说"
      ]
    },
    {
      "titleOriginal": "The Yellow Wallpaper",
      "titleTranslatedCn": "黄色墙纸",
      "author": "夏洛特·珀金斯·吉尔曼",
      "year": 1892,
      "movements": [
        "女性主义文学",
        "短篇小说"
      ]
    },
    {
      "titleOriginal": "Rashōmon",
      "titleTranslatedCn": "罗生门",
      "author": "芥川龙之介",
      "year": 1915,
      "movements": [
        "短篇小说",
        "日本现代文学"
      ]
    },
    {
      "titleOriginal": "呐喊",
      "titleTranslatedCn": "呐喊",
      "author": "鲁迅",
      "year": 1923,
      "movements": [
        "中国现代文学",
        "短篇小说"
      ]
    },
    {
      "titleOriginal": "受戒",
      "titleTranslatedCn": "受戒",
      "author": "汪曾祺",
      "year": 1980,
      "movements": [
        "中国当代文学",
        "短篇小说"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "非虚构写作入门",
  "targetReader": "想理解事实、叙事、现场和作者立场如何结合的读者",
  "works": [
    {
      "titleOriginal": "In Cold Blood",
      "titleTranslatedCn": "冷血",
      "author": "杜鲁门·卡波特",
      "year": 1966,
      "movements": [
        "新新闻主义",
        "非虚构写作",
        "犯罪小说"
      ]
    },
    {
      "titleOriginal": "The Rings of Saturn",
      "titleTranslatedCn": "土星之环",
      "author": "温弗里德·塞巴尔德",
      "year": 1995,
      "movements": [
        "非虚构写作",
        "后现代主义"
      ]
    },
    {
      "titleOriginal": "我的精神家园",
      "titleTranslatedCn": "我的精神家园",
      "author": "王小波",
      "year": 1997,
      "movements": [
        "非虚构写作",
        "中国当代文学"
      ]
    }
  ]
}
```
```json
{
  "pathTitle": "哲学感小说入门",
  "targetReader": "想通过小说而非理论书进入哲学问题的读者",
  "works": [
    {
      "titleOriginal": "The Stranger",
      "titleTranslatedCn": "局外人",
      "author": "阿尔贝·加缪",
      "year": 1942,
      "movements": [
        "存在主义文学",
        "荒诞派",
        "现代主义"
      ]
    },
    {
      "titleOriginal": "Siddhartha",
      "titleTranslatedCn": "悉达多",
      "author": "赫尔曼·黑塞",
      "year": 1922,
      "movements": [
        "现代主义",
        "哲学入门"
      ]
    },
    {
      "titleOriginal": "Steppenwolf",
      "titleTranslatedCn": "荒原狼",
      "author": "赫尔曼·黑塞",
      "year": 1927,
      "movements": [
        "现代主义",
        "存在主义文学"
      ]
    },
    {
      "titleOriginal": "Solaris",
      "titleTranslatedCn": "索拉里斯星",
      "author": "斯坦尼斯瓦夫·莱姆",
      "year": 1961,
      "movements": [
        "科幻文学",
        "哲学入门"
      ]
    },
    {
      "titleOriginal": "The Little Prince",
      "titleTranslatedCn": "小王子",
      "author": "安托万·德·圣-埃克苏佩里",
      "year": 1943,
      "movements": [
        "儿童文学",
        "哲学入门"
      ]
    },
    {
      "titleOriginal": "The Brothers Karamazov",
      "titleTranslatedCn": "卡拉马佐夫兄弟",
      "author": "费奥多尔·陀思妥耶夫斯基",
      "year": 1880,
      "movements": [
        "现实主义",
        "存在主义文学",
        "哲学入门"
      ]
    }
  ]
}
```

---

## 9. 使用建议

### 9.1 推荐生成顺序

1. 先用 `movementName` 批量生成流派草稿。
2. 再用 `titleOriginal / titleTranslatedCn / author / year / movements` 批量生成作品导读卡。
3. 最后用 `pathTitle / targetReader / works` 生成阅读路径。
4. 阅读路径生成后，应检查 steps 中的作品名是否存在于作品注册表。
5. 所有生成内容默认 `reviewStatus = AI_DRAFT`。

### 9.2 批量生成时的目录建议

```text
data/ai-inputs/
  movement-generation.jsonl
  work-guide-generation.jsonl
  reading-path-generation.jsonl

data/ai-drafts/
  movements.generated.json
  work-guides.generated.json
  reading-paths.generated.json
```

### 9.3 生成失败处理

如果 AI 输出的作品名不在本注册表中：

```text
不要自动创建新 Work。
先写入待确认队列。
```

建议待确认文件：

```text
data/review/unmatched-works.json
data/review/unmatched-movements.json
```

---

## 10. 后续可扩展方向

后续可以继续补充：

1. 奖项生成队列。
2. 榜单生成队列。
3. 出版社与译者队列。
4. 中文版本核验队列。
5. 专题包生成队列。
