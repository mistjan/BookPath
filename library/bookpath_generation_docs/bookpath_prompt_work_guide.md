# BookPath 作品导读卡生成提示词

文件建议位置：`scripts/prompts/work-guide.ts`  
对应 BookPath 文档第 8.4 节：作品导读卡 Prompt。

---

## 1. 使用目标

本提示词用于让 AI 根据作品基础信息生成 `GuideCard` 草稿。

所有生成结果默认视为 AI 草稿：

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
titleOriginal
titleTranslatedCn
author
year
movements
```

调用示例：

```json
{
  "titleOriginal": "L'Étranger",
  "titleTranslatedCn": "局外人",
  "author": "阿尔贝·加缪",
  "year": 1942,
  "movements": ["存在主义文学", "荒诞派", "现代主义"]
}
```

---

## 3. 正式提示词

```text
你是一个面向中文读者的书籍导读编辑。请为以下作品生成导读卡。

作品：
原名：{{titleOriginal}}
中文译名：{{titleTranslatedCn}}
作者：{{author}}
首版年份：{{year}}
相关流派：{{movements}}

要求：
1. 不要写营销文案。
2. 不要只说“值得一读”“影响深远”。
3. 必须说明它为什么重要。
4. 必须说明它适合谁、不适合谁。
5. 必须给出阅读难度 1-5，并说明理由。
6. 不确定的地方标记为“待确认”。
7. 输出 JSON。
8. 不要生成 Markdown。
9. 不要在 JSON 外添加解释文字。
10. 不要直接断言某个译本最佳、是否绝版、是否删节。
11. 对作品的解释应服务于中文普通读者，而不是文学专业论文。
12. nextWorks、easierAlternatives、advancedAlternatives 中的作品必须优先使用原名 titleOriginal；如有常见中文译名，可同时放入 titleTranslatedCn。
13. difficultyLevel 只能是 1、2、3、4、5。
14. beginnerEntry 必须根据作品是否适合作为入门读物判断，不要因为作品经典就设为 true。
15. 如果中文译名存在多个通行版本，但不确定，应在相关字段中写“待确认”，不要擅自判断版本优劣。

JSON 字段：
{
  "oneSentencePositioning": "",
  "whyClassic": "",
  "whyRead": "",
  "suitableFor": "",
  "notSuitableFor": "",
  "difficultyLevel": 1,
  "difficultyReason": "",
  "readingPrerequisites": "",
  "readingAdvice": "",
  "beginnerEntry": true,
  "nextWorks": [],
  "easierAlternatives": [],
  "advancedAlternatives": []
}
```

---

## 4. 输出字段说明

| 字段 | 说明 |
|---|---|
| `oneSentencePositioning` | 一句话定位：这本书到底是什么 |
| `whyClassic` | 为什么经典，必须具体 |
| `whyRead` | 普通读者为什么值得读 |
| `suitableFor` | 适合谁 |
| `notSuitableFor` | 不适合谁 |
| `difficultyLevel` | 1-5 的阅读难度 |
| `difficultyReason` | 难度理由 |
| `readingPrerequisites` | 阅读前最好知道什么 |
| `readingAdvice` | 怎么读更合适 |
| `beginnerEntry` | 是否适合作为入门作品 |
| `nextWorks` | 读完后可以通向哪些作品 |
| `easierAlternatives` | 相似但更容易的作品 |
| `advancedAlternatives` | 相似但更进阶的作品 |

---

## 5. 难度分级

| 难度 | 标准 |
|---|---|
| 1 | 情节清楚，语言直接，背景门槛低，新手可以直接读 |
| 2 | 有一定文学性或历史背景，但普通读者仍可顺畅进入 |
| 3 | 结构、语言、时代背景或思想主题有一定门槛，需要放慢阅读 |
| 4 | 需要较强阅读耐心，可能涉及复杂叙事、文学史背景、思想史背景或实验性写法 |
| 5 | 高难度文本，不建议新手直接阅读，更适合进阶读者或专题阅读 |

---

## 6. 禁止空泛表达

避免：

```text
这是一部不容错过的作品。
这本书影响深远，值得一读。
该作品具有极高的文学价值。
它深刻揭示了人性的复杂。
这是一部伟大的经典。
```

除非紧接着给出具体理由，否则这些表达不合格。

---

## 7. 推荐表达方向

应该写成：

```text
这本书适合作为现代主义入口，不是因为它最重要，而是因为它篇幅短、叙事直接，能让读者较快感受到现代人和世界之间的疏离感。
```

而不是：

```text
这本书是现代主义经典，影响深远，值得一读。
```

---

## 8. 校验规则建议

```ts
difficultyLevel: z.number().int().min(1).max(5)
beginnerEntry: z.boolean()
nextWorks: z.array(...)
easierAlternatives: z.array(...)
advancedAlternatives: z.array(...)
```
