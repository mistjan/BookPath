# BookPath 奖项生成提示词 v2

文件建议位置：`scripts/prompts/award.ts`  
用途：根据奖项列表页 `/awards` 与奖项详情页 `/awards/[slug]` 的展示要求，生成结构化奖项页数据。

本版新增硬性要求：

1. **不能编造获奖书籍、入围书籍、年份、届数、作者、中文出版状态。**
2. **必须联网搜索。**
3. **必须多方核对。**
4. **优先使用官方奖项网站、主办方页面、出版社页面、权威图书馆/百科/数据库。**
5. **每个 awardItem 必须标注年份、届数/期数/奖项周期、获奖状态和信息来源。**
6. **无法核实的作品不得写入 awardItems，只能写入 verificationGaps。**

---

## 1. 使用目标

本提示词用于让 AI 根据一个奖项、榜单或年度推荐的基础信息，联网核验并生成完整奖项页数据。

奖项列表页卡片需要显示：

- 奖项中文名
- 原名
- 国家/地区
- 创立年份
- 奖项类型
- 对新手的参考价值

奖项详情页必须包含：

- 奖项简介
- 奖项倾向
- 对新手的价值
- 局限与争议
- 获奖作品
- 入围作品
- 已有中文版
- 暂无中文版
- 适合新手的作品

所有生成内容默认视为 AI 草稿：

```json
{
  "aiGenerated": true,
  "reviewStatus": "AI_DRAFT"
}
```

不得默认标记为 `VERIFIED`。

---

## 2. 输入变量

必须使用以下变量名，不要改名：

```text
awardNameCn
awardNameOriginal
countryOrRegion
foundedYear
awardType
officialUrl
scopeNote
verificationRequired
sourcePriority
searchQueries
```

调用示例：

```json
{
  "awardNameCn": "诺贝尔文学奖",
  "awardNameOriginal": "Nobel Prize in Literature",
  "countryOrRegion": "瑞典 / 世界范围",
  "foundedYear": 1901,
  "awardType": "文学综合奖",
  "officialUrl": "https://www.nobelprize.org/prizes/literature/",
  "scopeNote": "世界文学范围内最具象征性的文学奖之一，适合建立世界文学坐标，但不等于新手书单。",
  "verificationRequired": true,
  "sourcePriority": ["official_award_site", "publisher", "library_database", "major_media_or_encyclopedia"],
  "searchQueries": [
    "Nobel Prize in Literature winners official",
    "Nobel Prize in Literature shortlist official",
    "诺贝尔文学奖 获奖名单 官方"
  ]
}
```

---

## 3. 正式提示词

```text
你是一个面向中文普通读者的书籍导览编辑和事实核验员。请为以下文学奖项、图书奖项或阅读榜单生成结构化内容。

奖项中文名：{{awardNameCn}}
奖项原名：{{awardNameOriginal}}
国家/地区：{{countryOrRegion}}
创立年份：{{foundedYear}}
奖项类型：{{awardType}}
官方网站：{{officialUrl}}
范围说明：{{scopeNote}}
是否必须核验：{{verificationRequired}}
来源优先级：{{sourcePriority}}
建议搜索词：{{searchQueries}}

硬性事实规则：
1. 必须联网搜索，不允许只凭模型记忆生成获奖书籍、入围书籍、年份、届数、作者、中文出版状态。
2. 不得编造任何获奖作品、入围作品、作者、年份、届数、出版社、译者、ISBN、在售状态。
3. 每条 awardItem 必须至少有 1 个可追溯来源；优先官方奖项网站或主办方页面。
4. 重要奖项条目应尽量使用 2 个以上来源交叉核对。若官方来源和二级来源冲突，以官方来源为准，并在 verificationNote 中说明。
5. 如果某奖项没有“届数”概念，awardEditionNumber 填 null，awardCycle 填对应年份或奖项周期，不要编造第几届。
6. 如果官方页面明确写出第几届/第几回/第几期，必须写入 awardEditionNumber 或 awardEditionLabel。
7. awardYear 必须是作品对应的获奖/入围年份，不是作品首版年份。
8. firstPublishedYear 是作品首版年份；如果无法核实，填 null。
9. 中文出版状态必须谨慎核验，只能使用 PUBLISHED、OUT_OF_PRINT、NO_TRANSLATION、UNKNOWN。
10. 中文出版状态没有权威来源时一律用 UNKNOWN，不要猜测。
11. 无法核实的作品不得写入 awardItems；应写入 verificationGaps，并说明缺少什么来源。
12. beginnerFriendlyWorks 只能从 awardItems 中选择，不得额外编造作品。
13. noChineseTranslationWorks 只能从 awardItems 中选择，并且 cnPublicationStatus 应为 NO_TRANSLATION 或 UNKNOWN。
14. cnPublishedWorks 只能从 awardItems 中选择，并且 cnPublicationStatus 应为 PUBLISHED 或 OUT_OF_PRINT。
15. winnerWorks 只能从 awardItems 中 status 为 WINNER 的作品摘出。
16. shortlistedWorks 只能从 awardItems 中 status 为 SHORTLIST、LONGLIST、FINALIST 的作品摘出。
17. 如果这是年度榜单、出版推广榜或媒体评选，不要假装它是传统文学奖；必须在 description 和 limitationNote 中说明。
18. 输出 JSON。
19. 不要生成 Markdown。
20. 不要在 JSON 外添加解释文字。

内容写作要求：
1. 面向没有专业文学背景的中文读者。
2. 不要写成百科腔，不要只堆事实。
3. 必须说明这个奖项主要奖励什么、偏好什么、适合用户怎么参考。
4. 必须说明它对新手的价值，但不能把奖项等同于“必读书单”。
5. 必须说明局限与争议，例如语言、地域、市场、评委偏好、出版可得性、商业性或文学性偏向。
6. 对新手友好作品必须谨慎选择：短、清晰、入口明确者优先。
7. 高难度经典不要因为获奖就标记为新手友好。
8. 不要直接搬运第三方网站文案。

JSON 字段：
{
  "nameCn": "",
  "nameOriginal": "",
  "countryOrRegion": "",
  "foundedYear": 1901,
  "awardType": "",
  "officialUrl": "",
  "description": "",
  "selectionTendency": "",
  "beginnerValue": "",
  "limitationNote": "",
  "displayCard": {
    "nameCn": "",
    "nameOriginal": "",
    "countryOrRegion": "",
    "foundedYear": 1901,
    "awardType": "",
    "beginnerValue": ""
  },
  "sourceAudit": {
    "searchedOnline": true,
    "sourcePriorityUsed": [],
    "primarySources": [
      {
        "title": "",
        "url": "",
        "sourceType": "official_award_site | organizer | publisher | library_database | major_media_or_encyclopedia | other",
        "usedFor": ""
      }
    ],
    "secondarySources": [
      {
        "title": "",
        "url": "",
        "sourceType": "publisher | library_database | major_media_or_encyclopedia | other",
        "usedFor": ""
      }
    ],
    "lastCheckedAt": "",
    "verificationSummary": ""
  },
  "awardItems": [
    {
      "awardYear": 0,
      "awardEditionNumber": null,
      "awardEditionLabel": "",
      "awardCycle": "",
      "status": "WINNER | SHORTLIST | LONGLIST | FINALIST | UNKNOWN",
      "category": "",
      "titleOriginal": "",
      "titleTranslatedCn": "",
      "authorNameCn": "",
      "authorNameOriginal": "",
      "firstPublishedYear": null,
      "cnPublicationStatus": "PUBLISHED | OUT_OF_PRINT | NO_TRANSLATION | UNKNOWN",
      "reasonForInclusion": "",
      "beginnerFriendly": false,
      "difficultyLevel": 3,
      "sources": [
        {
          "title": "",
          "url": "",
          "sourceType": "official_award_site | organizer | publisher | library_database | major_media_or_encyclopedia | other",
          "supports": "awardYear | awardEdition | status | title | author | cnPublicationStatus | firstPublishedYear"
        }
      ],
      "verificationStatus": "VERIFIED | PARTIAL | NEEDS_REVIEW",
      "verificationNote": ""
    }
  ],
  "winnerWorks": [],
  "shortlistedWorks": [],
  "cnPublishedWorks": [],
  "noChineseTranslationWorks": [],
  "beginnerFriendlyWorks": [],
  "verificationGaps": [
    {
      "item": "",
      "issue": "",
      "neededSourceType": "",
      "note": ""
    }
  ]
}
```

---

## 4. 输出字段说明

| 字段 | 说明 |
|---|---|
| `nameCn` | 奖项中文名，必须与输入 `awardNameCn` 一致或高度一致 |
| `nameOriginal` | 奖项原名 |
| `countryOrRegion` | 国家/地区或影响范围 |
| `foundedYear` | 创立年份；不确定则填 `null` |
| `awardType` | 奖项类型，例如“文学综合奖”“长篇小说奖”“科幻文学奖”“年度图书榜” |
| `officialUrl` | 官方网站；没有则填空字符串或“待确认” |
| `description` | 奖项简介：它是什么，主要奖励什么 |
| `selectionTendency` | 奖项倾向：偏文学性、实验性、类型文学、市场性、公共阅读、学术性等 |
| `beginnerValue` | 对新手的价值：该如何参考，而不是简单说“都值得读” |
| `limitationNote` | 局限与争议：语言、地域、商业、评委、出版可得性等 |
| `displayCard` | 奖项列表页卡片所需字段 |
| `sourceAudit` | 整个奖项页面的来源核验摘要 |
| `awardItems` | 经核验的获奖 / 入围 / 长名单 / 决选作品 |
| `winnerWorks` | 从 `awardItems` 中 status 为 WINNER 的作品摘出 |
| `shortlistedWorks` | 从 `awardItems` 中 status 为 SHORTLIST / FINALIST / LONGLIST 的作品摘出 |
| `cnPublishedWorks` | 从 `awardItems` 中中文出版状态为 PUBLISHED / OUT_OF_PRINT 的作品摘出 |
| `noChineseTranslationWorks` | 从 `awardItems` 中中文出版状态为 NO_TRANSLATION / UNKNOWN 的作品摘出 |
| `beginnerFriendlyWorks` | 从 `awardItems` 中 beginnerFriendly 为 true 的作品摘出 |
| `verificationGaps` | 记录无法核实、缺少来源、来源冲突或需人工确认的问题 |

---

## 5. 枚举限制

### 5.1 awardItems.status

只能使用：

```text
WINNER
SHORTLIST
LONGLIST
FINALIST
UNKNOWN
```

### 5.2 cnPublicationStatus

只能使用：

```text
PUBLISHED
OUT_OF_PRINT
NO_TRANSLATION
UNKNOWN
```

### 5.3 difficultyLevel

只能使用：

```text
1
2
3
4
5
```

### 5.4 verificationStatus

只能使用：

```text
VERIFIED
PARTIAL
NEEDS_REVIEW
```

### 5.5 sourceType

只能使用：

```text
official_award_site
organizer
publisher
library_database
major_media_or_encyclopedia
other
```

---

## 6. 来源优先级

优先级从高到低：

1. 官方奖项网站 / 主办方网站
2. 出版社官网 / 作者官网
3. 国家图书馆、WorldCat、Open Library、ISBN 数据库等图书馆或书目数据库
4. 权威百科、主流媒体、专业书评媒体
5. 普通媒体报道、博客、论坛、二手资料

使用规则：

```text
官方来源能确认的，不用低级来源覆盖。
低级来源只能补充，不应推翻官方来源。
来源冲突必须写入 verificationNote。
无法核实则写入 verificationGaps，不要编造。
```

---

## 7. 奖项届数 / 年份规则

1. `awardYear`：奖项公布或归属年份。
2. `awardEditionNumber`：第几届，必须来自官方或可靠来源；没有则填 `null`。
3. `awardEditionLabel`：如“第 12 届”“第 170 回”“2023 年度”等原始标注。
4. `awardCycle`：奖项周期，如“2023”“2023-2024”“2023 年度”。
5. `firstPublishedYear`：作品首版年份，不能和 `awardYear` 混淆。
6. 文学奖如果奖励作家而不是单本作品，应在 category 和 verificationNote 中说明，不要强行填作品。

---

## 8. 中文出版状态规则

`cnPublicationStatus` 只能使用：

- `PUBLISHED`：有可核验的中文译本或中文出版物。
- `OUT_OF_PRINT`：有中文版本但已绝版或难以购买；必须有来源，否则用 UNKNOWN。
- `NO_TRANSLATION`：有可靠来源能判断暂无中文译本。
- `UNKNOWN`：无法核实或信息不足。

不要编造：

- 出版社
- 译者
- ISBN
- 装帧
- 页数
- 在售状态

---

## 9. 校验规则建议

建议使用 zod 或等价工具检查：

```ts
const AwardItemStatus = z.enum([
  "WINNER",
  "SHORTLIST",
  "LONGLIST",
  "FINALIST",
  "UNKNOWN",
]);

const CnPublicationStatus = z.enum([
  "PUBLISHED",
  "OUT_OF_PRINT",
  "NO_TRANSLATION",
  "UNKNOWN",
]);

const VerificationStatus = z.enum([
  "VERIFIED",
  "PARTIAL",
  "NEEDS_REVIEW",
]);

const SourceType = z.enum([
  "official_award_site",
  "organizer",
  "publisher",
  "library_database",
  "major_media_or_encyclopedia",
  "other",
]);

difficultyLevel: z.number().int().min(1).max(5)
beginnerFriendly: z.boolean()
awardItems: z.array(...)
awardItems[].sources: z.array(...).min(1)
sourceAudit.searchedOnline: z.literal(true)
```

---

## 10. 失败处理

如果无法联网搜索：

```json
{
  "awardItems": [],
  "verificationGaps": [
    {
      "item": "{{awardNameCn}}",
      "issue": "无法联网搜索，不能生成获奖/入围作品列表",
      "neededSourceType": "official_award_site",
      "note": "根据硬性规则，不允许仅凭模型记忆生成 awardItems。"
    }
  ]
}
```

如果能找到奖项介绍，但无法核实具体作品：

```text
可以生成 description、selectionTendency、beginnerValue、limitationNote。
不要生成 awardItems。
把缺口写入 verificationGaps。
```

---

## 11. 单条调用示例

输入：

```json
{
  "awardNameCn": "布克奖",
  "awardNameOriginal": "The Booker Prize",
  "countryOrRegion": "英国 / 英语世界",
  "foundedYear": 1969,
  "awardType": "英语长篇小说奖",
  "officialUrl": "https://thebookerprizes.com/",
  "scopeNote": "主要面向英语原创长篇小说，适合观察英语文学当代小说趋势。",
  "verificationRequired": true,
  "sourcePriority": ["official_award_site", "publisher", "library_database", "major_media_or_encyclopedia"],
  "searchQueries": [
    "The Booker Prize winners official",
    "The Booker Prize shortlist official",
    "布克奖 获奖名单 官方"
  ]
}
```

预期输出：只返回 JSON，不返回 Markdown。
