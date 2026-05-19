# BookPath 阅读路径生成提示词

文件建议位置：`scripts/prompts/reading-path.ts`  
对应 BookPath 文档第 8.5 节：阅读路径 Prompt。

---

## 1. 使用目标

本提示词用于让 AI 根据主题、目标读者和候选作品生成一条阅读路径草稿。

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
pathTitle
targetReader
works
```

调用示例：

```json
{
  "pathTitle": "现代主义文学入门",
  "targetReader": "想理解 20 世纪文学变化，但不想一上来读高难度长篇的中文读者",
  "works": [
    {
      "titleOriginal": "Die Verwandlung",
      "titleTranslatedCn": "变形记",
      "author": "弗兰茨·卡夫卡",
      "year": 1915,
      "movements": ["现代主义", "荒诞派"]
    },
    {
      "titleOriginal": "L'Étranger",
      "titleTranslatedCn": "局外人",
      "author": "阿尔贝·加缪",
      "year": 1942,
      "movements": ["存在主义文学", "荒诞派", "现代主义"]
    }
  ]
}
```

---

## 3. 正式提示词

```text
你是一个文学阅读路径设计师。请为以下主题生成阅读路径。

主题：{{pathTitle}}
目标读者：{{targetReader}}
候选作品：{{works}}

要求：
1. 路径必须由易到难。
2. 每一步都要说明为什么放在这个位置。
3. 区分 ENTRY、FOUNDATION、CORE、ADVANCED、EXPANSION。
4. 不要把最经典等同于最适合入门。
5. 不确定的地方标记为“待确认”。
6. 输出 JSON。
7. 不要生成 Markdown。
8. 不要在 JSON 外添加解释文字。
9. 只能从候选作品 works 中选择路径步骤；如果候选作品不足，可以在 reason 中说明“候选作品不足，待补充”，不要编造不存在的候选书。
10. steps 中的 titleOriginal 和 titleTranslatedCn 必须与候选作品 works 中的名称一致。
11. roleInPath 只能使用 ENTRY、FOUNDATION、CORE、ADVANCED、EXPANSION。
12. difficultyStart 和 difficultyEnd 只能是 1、2、3、4、5。
13. 路径设计必须说明递进逻辑，不要只按出版时间或名气排序。
14. 如果某部作品很经典但不适合作为第一本，应放在 CORE、ADVANCED 或 EXPANSION，而不是 ENTRY。

JSON 字段：
{
  "title": "",
  "description": "",
  "targetReader": "",
  "difficultyStart": 1,
  "difficultyEnd": 5,
  "steps": [
    {
      "stepOrder": 1,
      "titleOriginal": "",
      "titleTranslatedCn": "",
      "roleInPath": "",
      "reason": "",
      "skipAllowed": false,
      "alternativeTitle": ""
    }
  ]
}
```

---

## 4. 输出字段说明

| 字段 | 说明 |
|---|---|
| `title` | 阅读路径标题，应和 `pathTitle` 一致或高度一致 |
| `description` | 路径说明，解释为什么这样安排 |
| `targetReader` | 目标读者，应和输入一致或扩写 |
| `difficultyStart` | 起始难度，1-5 |
| `difficultyEnd` | 结束难度，1-5 |
| `steps` | 路径步骤，必须有顺序 |
| `stepOrder` | 从 1 开始递增 |
| `titleOriginal` | 原作名，必须和候选 works 一致 |
| `titleTranslatedCn` | 中文译名，必须和候选 works 一致 |
| `roleInPath` | ENTRY、FOUNDATION、CORE、ADVANCED、EXPANSION |
| `reason` | 为什么这一步放在这里 |
| `skipAllowed` | 是否可跳过 |
| `alternativeTitle` | 替代作品名，可为空或“待确认” |

---

## 5. 角色定义

| roleInPath | 含义 |
|---|---|
| ENTRY | 入口作品，适合让用户第一次进入该主题 |
| FOUNDATION | 基础作品，建立必要阅读经验 |
| CORE | 核心作品，代表性强但不一定最容易 |
| ADVANCED | 进阶作品，难度较高 |
| EXPANSION | 扩展作品，用来横向拓宽理解 |

---

## 6. 路径设计原则

1. 从可进入性开始，而不是从名气开始。
2. 从短篇、中篇或结构清楚的作品开始。
3. 再进入核心代表作。
4. 最后放高难度、实验性、长篇或背景要求高的作品。
5. 每一步都必须解释“为什么现在读它”。
6. 经典但难的作品不要放在第一步。
7. 路径应服务读者理解，不服务炫耀书单。
8. 对中文用户不熟悉的背景，应在 reason 中说明需要补充背景。

---

## 7. 校验规则建议

```ts
roleInPath: z.enum(["ENTRY", "FOUNDATION", "CORE", "ADVANCED", "EXPANSION"])
difficultyStart: z.number().int().min(1).max(5)
difficultyEnd: z.number().int().min(1).max(5)
steps: z.array(...).min(3)
```
