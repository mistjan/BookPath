# BookPath 流派生成提示词

文件建议位置：`scripts/prompts/movement.ts`  
对应 BookPath 文档第 8.3 节：流派生成 Prompt。

---

## 1. 使用目标

本提示词用于让 AI 根据 `movementName` 生成一个文学流派、文学类型或阅读门类的结构化草稿。

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
movementName
```

调用示例：

```json
{
  "movementName": "现代主义"
}
```

---

## 3. 正式提示词

```text
你是一个面向中文普通读者的文学导览编辑。请为以下文学流派生成结构化内容。

流派名称：{{movementName}}

要求：
1. 不要写成百科腔。
2. 面向没有文学专业背景的中文读者。
3. 必须解释它为什么出现、反对什么、改变了什么。
4. 必须说明常见误解。
5. 必须给出新手入门建议。
6. 不要直接照搬任何网站文字。
7. 不确定的地方标记为“待确认”。
8. 输出 JSON。
9. 不要生成 Markdown。
10. 不要在 JSON 外添加解释文字。
11. 如果流派边界存在争议，应在 definitionPrecise、historicalContext 或 beginnerWarning 中说明，不要强行绝对化。
12. recommendedWorks 中的作品名必须优先使用原名 titleOriginal；若已有常见中文译名，则填写 titleTranslatedCn。
13. recommendedWorks.role 只能使用 ENTRY、FOUNDATION、CORE、ADVANCED、EXPANSION。
14. difficultyLevel 只能是 1、2、3、4、5。
15. relatedMovements 中必须使用中文流派名，与注册表中的 movementName 保持一致。

JSON 字段：
{
  "nameCn": "",
  "nameOriginal": "",
  "period": "",
  "region": "",
  "introForBeginner": "",
  "definitionPrecise": "",
  "historicalContext": "",
  "reactsAgainst": "",
  "keyFeatures": [],
  "commonMisunderstandings": [],
  "beginnerWarning": "",
  "importance": "",
  "recommendedWorks": [
    {
      "titleOriginal": "",
      "titleTranslatedCn": "",
      "authorNameCn": "",
      "role": "ENTRY | FOUNDATION | CORE | ADVANCED | EXPANSION",
      "reason": "",
      "difficultyLevel": 1
    }
  ],
  "relatedMovements": []
}
```

---

## 4. 输出字段说明

| 字段 | 说明 |
|---|---|
| `nameCn` | 中文流派名，必须和输入 `movementName` 一致或高度一致 |
| `nameOriginal` | 原文名，如 Modernism、Magic Realism；中文本土流派可填空字符串 |
| `period` | 主要活跃时期，如“19 世纪中后期”“20 世纪上半叶” |
| `region` | 主要地域，如“欧洲”“拉丁美洲”“中国大陆” |
| `introForBeginner` | 给普通读者看的解释，不要用百科腔 |
| `definitionPrecise` | 更精确的定义，允许比 intro 更专业 |
| `historicalContext` | 它为什么出现 |
| `reactsAgainst` | 它反对、修正、继承或改变了什么 |
| `keyFeatures` | 核心写作特征，数组 |
| `commonMisunderstandings` | 常见误解，数组 |
| `beginnerWarning` | 新手阅读提醒 |
| `importance` | 为什么重要 |
| `recommendedWorks` | 推荐作品，不是越多越好，优先 8-15 本 |
| `relatedMovements` | 相关流派名，必须和注册表统一 |

---

## 5. 质量要求

生成内容必须符合以下标准：

1. 先让普通用户明白“它是什么”。
2. 再解释“它为什么出现”。
3. 再解释“它改变了什么”。
4. 最后给出“怎么入门”。
5. 不把“经典”简单解释成“评分高”。
6. 不把“推荐”写成“值得一读”。
7. 不把争议流派写成绝对分类。
8. 不直接断言中文译本、绝版、删节等版本信息。
9. 不搬运第三方简介或评论。
10. 不确定内容写“待确认”。

---

## 6. 校验规则建议

AI 返回后应使用 zod 或等价工具检查：

```ts
role: z.enum(["ENTRY", "FOUNDATION", "CORE", "ADVANCED", "EXPANSION"])
difficultyLevel: z.number().int().min(1).max(5)
recommendedWorks: z.array(...)
relatedMovements: z.array(z.string())
```

---

## 7. 单条调用示例

输入：

```json
{
  "movementName": "现代主义"
}
```

预期输出：只返回 JSON，不返回 Markdown。
