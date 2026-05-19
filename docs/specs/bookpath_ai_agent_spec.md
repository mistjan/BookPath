# 《书径 BookPath》AI Agent 执行规格文档

> 面向 Codex / AI Coding Agent 的产品设计与开发执行手册  
> 文档版本：v0.1  
> 产品定位：面向中文读者的文学流派与书籍发现导览平台  
> 当前策略：所有内容暂由 AI 生成，但必须保留审核状态与人工校订入口

\---

## 0\. 给 AI Agent 的总说明

你正在开发一个名为 **书径 BookPath** 的 Web App。

这是一个面向中文读者的书籍发现与文学入门导览平台。它不是电子书平台，不提供书籍正文；不是读书记录工具；不是社区；不是社交产品；也不是简单的榜单聚合站。

它的核心目标是：

> 帮助用户理解文学流派、认识经典作品、找到合适的入门书籍、看懂奖项和榜单，并根据流派、主题、难度、奖项、出版社、译本等维度建立清晰的阅读地图。

第一版最重要的模块是：

1. 流派地图
2. 流派详情页
3. 作品导读卡
4. 阅读路径
5. 奖项中心
6. 搜索与筛选
7. 后台内容管理
8. AI 内容草稿生成与审核

所有 AI 生成内容都必须标记为 `AI\_DRAFT`，不得默认标记为 `VERIFIED`。

\---

## 1\. 产品边界

### 1.1 第一版必须做

* Web App
* 中文界面
* 首页导航
* 流派列表页
* 流派详情页
* 作品列表页
* 作品详情页
* 阅读路径列表页
* 阅读路径详情页
* 奖项列表页
* 奖项详情页
* 搜索页
* 后台管理页
* 内容审核状态

### 1.2 第一版不要做

* 用户社区
* 用户评论
* 好友关注
* 私信
* 读书打卡
* 长篇读书笔记
* 电子书正文
* 盗版资源
* 购买闭环
* 复杂爬虫
* 移动端原生 App
* 个性化推荐大模型服务
* 大规模用户系统

### 1.3 默认实现形式

第一版优先做成：

```text
Next.js Web App + Supabase PostgreSQL + Prisma + Tailwind CSS + shadcn/ui
```

\---

## 2\. 技术栈

### 2.1 前端与后端

* Next.js App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* lucide-react
* React Server Components 优先
* 必要时使用 Client Components

### 2.2 数据库

* PostgreSQL
* 推荐 Supabase PostgreSQL
* ORM 使用 Prisma

### 2.3 校验与工具

* zod：用于 API 入参和 AI 生成 JSON 校验
* dotenv：环境变量管理
* eslint / prettier：代码规范
* npm 或 pnpm 均可，默认使用 npm

### 2.4 搜索

第一阶段：

* Prisma `contains`
* PostgreSQL ILIKE
* 简单筛选

第二阶段可升级：

* PostgreSQL Full Text Search
* PGroonga
* Meilisearch
* Typesense
* pgvector

\---

## 3\. 推荐目录结构

```text
bookpath/
  app/
    layout.tsx
    page.tsx

    movements/
      page.tsx
      \[slug]/
        page.tsx

    works/
      page.tsx
      \[slug]/
        page.tsx

    paths/
      page.tsx
      \[slug]/
        page.tsx

    awards/
      page.tsx
      \[slug]/
        page.tsx

    lists/
      page.tsx
      \[slug]/
        page.tsx

    search/
      page.tsx

    about/
      page.tsx

    admin/
      page.tsx
      works/
        page.tsx
        new/
          page.tsx
        \[id]/
          page.tsx
      movements/
        page.tsx
        new/
          page.tsx
        \[id]/
          page.tsx
      paths/
        page.tsx
      awards/
        page.tsx
      lists/
        page.tsx
      ai-drafts/
        page.tsx
      import/
        page.tsx
      review/
        page.tsx

    api/
      movements/
        route.ts
      works/
        route.ts
      paths/
        route.ts
      awards/
        route.ts
      lists/
        route.ts
      search/
        route.ts
      admin/
        ai/
          generate-movement/
            route.ts
          generate-work-guide/
            route.ts
          generate-reading-path/
            route.ts
        import/
          route.ts
        review/
          route.ts

  components/
    layout/
      site-header.tsx
      site-footer.tsx
      admin-sidebar.tsx
    cards/
      work-card.tsx
      movement-card.tsx
      path-card.tsx
      award-card.tsx
    movement/
      movement-hero.tsx
      movement-work-section.tsx
    work/
      guide-card.tsx
      difficulty-badge.tsx
      edition-list.tsx
    path/
      path-step-list.tsx
    award/
      award-item-table.tsx
    search/
      search-box.tsx
      search-results.tsx
    admin/
      entity-table.tsx
      status-badge.tsx
      json-import-form.tsx

  lib/
    prisma.ts
    db.ts
    slug.ts
    search.ts
    recommend.ts
    constants.ts
    content-status.ts
    ai/
      client.ts
      schemas.ts
      prompts.ts

  prisma/
    schema.prisma
    seed.ts

  scripts/
    generate-content.ts
    import-seed.ts
    normalize-books.ts
    prompts/
      movement.ts
      work-guide.ts
      reading-path.ts

  data/
    seed/
      movements.json
      authors.json
      works.json
      paths.json
      awards.json
      lists.json
      publishers.json
      translators.json

  docs/
    product-design.md
    database-design.md
    ai-content-policy.md
    codex-tasks.md
    content-style-guide.md
```

\---

## 4\. 核心数据模型

### 4.1 建模原则

不要只建立 `books` 表。必须区分：

|实体|含义|
|-|-|
|Work|抽象原作，主标题使用来源国家/原语言的原名，例如 `Cien años de soledad`|
|Edition|具体版本，例如某出版社某译者某年份版本|
|Author|作者|
|Translator|译者|
|Publisher|出版社|
|Movement|文学流派|
|Theme|主题|
|GuideCard|作品导读卡|
|ReadingPath|阅读路径|
|ReadingPathStep|阅读路径步骤|
|Award|奖项|
|AwardItem|获奖/入围记录|
|BookList|榜单|
|ListItem|榜单项目|

标题建模原则：

- `Work.titleOriginal` 是作品的主标题，保存来源国家/原语言的原名。前台展示 Work 时，默认以这个字段作为原作名。
- `Work.titleTranslatedCn` 保存翻译作品的中文译名/通行译名，例如《百年孤独》。它用于中文读者识别作品，但不替代原作名。
- `Edition.titleCn` 保存某一个具体中文版本的书名，和出版社、译者、年份等版本信息绑定。
- 不要把 `Work` 的主标题和某个译本标题混在一起；原作、通行译名、具体版本标题必须分开。

### 4.2 Prisma Schema 草案

请在 `prisma/schema.prisma` 中实现以下模型。

```prisma
model Work {
  id                    String   @id @default(cuid())
  slug                  String   @unique
  titleOriginal         String
  titleTranslatedCn     String?
  titleAliases          String\[]
  authorId              String?
  author                Author?  @relation(fields: \[authorId], references: \[id])
  originalLanguage      String?
  countryOrRegion       String?
  firstPublishedYear    Int?
  workType              WorkType
  summaryShort          String?
  status                PublishStatus @default(DRAFT)
  aiGenerated           Boolean  @default(true)
  reviewStatus          ReviewStatus @default(AI\_DRAFT)
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  guideCard             GuideCard?
  editions              Edition\[]
  movementLinks         WorkMovement\[]
  themeLinks            WorkTheme\[]
  awardItems            AwardItem\[]
  listItems             ListItem\[]
  pathSteps             ReadingPathStep\[]
}

model Edition {
  id                    String   @id @default(cuid())
  workId                String
  work                  Work     @relation(fields: \[workId], references: \[id])
  titleCn               String
  isbn                  String?
  publisherId           String?
  publisher             Publisher? @relation(fields: \[publisherId], references: \[id])
  translatorId          String?
  translator            Translator? @relation(fields: \[translatorId], references: \[id])
  publicationYear       Int?
  binding               String?
  pages                 Int?
  price                 String?
  languageVariant       String?
  isAbridged            Boolean?
  isRecommended         Boolean  @default(false)
  recommendationReason  String?
  availability          Availability @default(UNKNOWN)
  coverUrl              String?
  sourceUrl             String?
  reviewStatus          ReviewStatus @default(AI\_DRAFT)
}

model Author {
  id                    String   @id @default(cuid())
  slug                  String   @unique
  nameCn                String
  nameOriginal          String?
  birthYear             Int?
  deathYear             Int?
  countryOrRegion       String?
  language              String?
  bioShort              String?
  works                 Work\[]
}

model Translator {
  id                    String   @id @default(cuid())
  name                  String
  description           String?
  editions              Edition\[]
}

model Publisher {
  id                    String   @id @default(cuid())
  name                  String   @unique
  country               String?
  description           String?
  strengths             String?
  reliabilityNote       String?
  editions              Edition\[]
}

model Movement {
  id                      String   @id @default(cuid())
  slug                    String   @unique
  nameCn                  String
  nameOriginal            String?
  period                  String?
  region                  String?
  introForBeginner        String
  definitionPrecise       String?
  historicalContext       String?
  reactsAgainst           String?
  keyFeatures             String\[]
  commonMisunderstandings String\[]
  beginnerWarning         String?
  importance              String?
  status                  PublishStatus @default(DRAFT)
  reviewStatus            ReviewStatus @default(AI\_DRAFT)

  workLinks               WorkMovement\[]
  pathLinks               ReadingPath\[]
}

model WorkMovement {
  id                    String   @id @default(cuid())
  workId                String
  movementId            String
  work                  Work     @relation(fields: \[workId], references: \[id])
  movement              Movement @relation(fields: \[movementId], references: \[id])
  relevanceLevel        RelevanceLevel
  explanation           String?
  editorConfidence      Confidence @default(MEDIUM)

  @@unique(\[workId, movementId])
}

model Theme {
  id                    String   @id @default(cuid())
  slug                  String   @unique
  name                  String
  description           String?
  workLinks             WorkTheme\[]
}

model WorkTheme {
  id                    String   @id @default(cuid())
  workId                String
  themeId               String
  work                  Work     @relation(fields: \[workId], references: \[id])
  theme                 Theme    @relation(fields: \[themeId], references: \[id])
  weight                Int      @default(1)

  @@unique(\[workId, themeId])
}

model GuideCard {
  id                      String   @id @default(cuid())
  workId                  String   @unique
  work                    Work     @relation(fields: \[workId], references: \[id])
  oneSentencePositioning  String
  whyClassic              String?
  whyRead                 String?
  suitableFor             String?
  notSuitableFor          String?
  difficultyLevel         Int
  difficultyReason        String?
  readingPrerequisites    String?
  readingAdvice           String?
  beginnerEntry           Boolean  @default(false)
  editorNote              String?
  aiGenerated             Boolean  @default(true)
  reviewStatus            ReviewStatus @default(AI\_DRAFT)
}

model ReadingPath {
  id                    String   @id @default(cuid())
  slug                  String   @unique
  title                 String
  description           String
  targetReader          String?
  pathType              PathType
  movementId            String?
  movement              Movement? @relation(fields: \[movementId], references: \[id])
  difficultyStart       Int?
  difficultyEnd         Int?
  estimatedBookCount    Int?
  editorNote            String?
  status                PublishStatus @default(DRAFT)
  reviewStatus          ReviewStatus @default(AI\_DRAFT)

  steps                 ReadingPathStep\[]
}

model ReadingPathStep {
  id                    String   @id @default(cuid())
  pathId                String
  workId                String
  path                  ReadingPath @relation(fields: \[pathId], references: \[id])
  work                  Work     @relation(fields: \[workId], references: \[id])
  stepOrder             Int
  roleInPath            StepRole
  reason                String
  skipAllowed           Boolean  @default(false)
  alternativeWorkId     String?

  @@unique(\[pathId, stepOrder])
}

model Award {
  id                    String   @id @default(cuid())
  slug                  String   @unique
  nameCn                String
  nameOriginal          String?
  countryOrRegion       String?
  foundedYear           Int?
  awardType             String?
  description           String?
  selectionTendency     String?
  beginnerValue         String?
  limitationNote        String?
  officialUrl           String?
  items                 AwardItem\[]
}

model AwardItem {
  id                    String   @id @default(cuid())
  awardId               String
  workId                String?
  authorId              String?
  award                 Award    @relation(fields: \[awardId], references: \[id])
  work                  Work?    @relation(fields: \[workId], references: \[id])
  year                  Int
  status                AwardStatus
  category              String?
  sourceUrl             String?
  cnPublicationStatus   CnPublicationStatus @default(UNKNOWN)
}

model BookList {
  id                    String   @id @default(cuid())
  slug                  String   @unique
  name                  String
  sourceName            String
  sourceUrl             String?
  listType              ListType
  methodologyNote       String?
  biasNote              String?
  beginnerValue         String?
  items                 ListItem\[]
}

model ListItem {
  id                    String   @id @default(cuid())
  listId                String
  workId                String
  list                  BookList @relation(fields: \[listId], references: \[id])
  work                  Work     @relation(fields: \[workId], references: \[id])
  rank                  Int?
  year                  Int?
  note                  String?
  sourceUrl             String?
}

enum WorkType {
  NOVEL
  NOVELLA
  SHORT\_STORY\_COLLECTION
  POETRY
  DRAMA
  ESSAY
  NONFICTION
  PHILOSOPHY
  HISTORY
  SOCIAL\_SCIENCE
  OTHER
}

enum PublishStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum ReviewStatus {
  AI\_DRAFT
  NEEDS\_REVIEW
  REVIEWED
  VERIFIED
}

enum RelevanceLevel {
  CORE
  RELATED
  INFLUENCED\_BY
  DEBATED
}

enum Confidence {
  LOW
  MEDIUM
  HIGH
}

enum Availability {
  AVAILABLE
  OUT\_OF\_PRINT
  EBOOK
  UNKNOWN
}

enum CnPublicationStatus {
  PUBLISHED
  OUT\_OF\_PRINT
  NO\_TRANSLATION
  UNKNOWN
}

enum PathType {
  MOVEMENT
  GENRE
  THEME
  AWARD
  AUTHOR
  REGION
  BEGINNER
}

enum StepRole {
  ENTRY
  FOUNDATION
  CORE
  ADVANCED
  EXPANSION
  OPTIONAL
}

enum AwardStatus {
  WINNER
  SHORTLIST
  LONGLIST
  FINALIST
  NOMINATED
}

enum ListType {
  CLASSIC
  ANNUAL
  SALES
  EDITOR
  USER\_RATING
  AWARD\_RELATED
  THEME
}
```

\---

## 5\. 页面设计要求

### 5.1 首页 `/`

首页不是信息流，而是导览入口。

必须包含：

1. 顶部导航
2. 产品说明
3. “不知道读什么？”入口
4. “认识一个流派”入口
5. “推荐阅读路径”入口
6. “从奖项发现书”入口
7. “适合新手的经典”入口

首页文案可先使用：

```text
书径

不是再给你一份书单，而是帮你看懂书单。

从文学流派、经典作品、奖项榜单和阅读路径开始，找到真正适合你的下一本书。
```

### 5.2 流派列表页 `/movements`

每个流派卡片显示：

* 流派名称
* 原文名
* 时期
* 地区
* 新手解释摘要
* 代表作品数量
* 是否适合新手
* 查看详情按钮

### 5.3 流派详情页 `/movements/\[slug]`

这是第一版最重要的页面。

必须包含：

1. 流派名称
2. 一句话解释
3. 给新手看的说明
4. 它为什么出现
5. 它反对/改变了什么
6. 核心特征
7. 常见误解
8. 新手阅读提醒
9. 为什么重要
10. 入门作品
11. 核心作品
12. 进阶作品
13. 不建议新手直接读的作品
14. 推荐阅读路径
15. 相关流派占位区

作品分组依据：

* `WorkMovement.relevanceLevel`
* `GuideCard.difficultyLevel`
* `GuideCard.beginnerEntry`
* `ReadingPathStep.roleInPath`

### 5.4 作品列表页 `/works`

必须支持：

* 搜索
* 按流派筛选
* 按难度筛选
* 按国家/地区筛选
* 按作品类型筛选
* 按是否适合新手筛选

作品卡片显示：

* 原名（来源语言）
* 中文译名/通行译名
* 作者
* 一句话定位
* 难度
* 相关流派
* 是否适合新手

### 5.5 作品详情页 `/works/\[slug]`

必须包含：

1. 原名（来源语言，Work 主标题）
2. 中文译名/通行译名
3. 作者
4. 首版年份
5. 国家/地区
6. 作品类型
7. 一句话定位
8. 为什么经典
9. 为什么值得读
10. 适合谁
11. 不适合谁
12. 阅读难度
13. 难度理由
14. 阅读前最好知道什么
15. 阅读建议
16. 所属流派
17. 相关主题
18. 所属阅读路径
19. 中文版本区域
20. 相关作品占位区

### 5.6 阅读路径列表页 `/paths`

卡片显示：

* 路径标题
* 目标读者
* 类型
* 难度区间
* 作品数量
* 简介

### 5.7 阅读路径详情页 `/paths/\[slug]`

必须按顺序显示：

* 路径说明
* 目标读者
* 难度范围
* 每个步骤：

  * 顺序号
  * 作品名
  * 作者
  * 角色：ENTRY / FOUNDATION / CORE / ADVANCED / EXPANSION
  * 推荐理由
  * 是否可跳过
  * 难度

### 5.8 奖项列表页 `/awards`

卡片显示：

* 奖项中文名
* 原名
* 国家/地区
* 创立年份
* 奖项类型
* 对新手的参考价值

### 5.9 奖项详情页 `/awards/\[slug]`

必须包含：

1. 奖项简介
2. 奖项倾向
3. 对新手的价值
4. 局限与争议
5. 获奖作品
6. 入围作品
7. 已有中文版
8. 暂无中文版
9. 适合新手的作品

\---

## 6\. 后台设计要求

### 6.1 后台入口 `/admin`

后台不必第一版做复杂权限，但代码结构要预留权限。

后台侧边栏包含：

* 作品管理
* 流派管理
* 阅读路径管理
* 奖项管理
* 榜单管理
* AI 草稿
* 数据导入
* 内容审核

### 6.2 内容状态

每个主要实体必须有：

```text
status: DRAFT | PUBLISHED | ARCHIVED
reviewStatus: AI\_DRAFT | NEEDS\_REVIEW | REVIEWED | VERIFIED
aiGenerated: boolean
```

前台默认只展示：

```text
status = PUBLISHED
```

开发阶段可以通过配置允许展示 DRAFT。

### 6.3 后台最小功能

必须支持：

* 创建作品
* 编辑作品
* 创建流派
* 编辑流派
* 绑定作品和流派
* 修改作品难度
* 创建阅读路径
* 调整阅读路径步骤顺序
* 创建奖项
* 查看 AI 草稿
* 修改审核状态
* 发布内容

\---

## 7\. Seed 数据要求

### 7.1 第一批流派

请生成并导入以下 20 个流派：

1. 现实主义
2. 自然主义
3. 现代主义
4. 意识流
5. 存在主义文学
6. 荒诞派
7. 魔幻现实主义
8. 拉美文学爆炸
9. 后现代主义
10. 黑色幽默
11. 垮掉的一代
12. 肮脏现实主义
13. 女性主义文学
14. 后殖民文学
15. 赛博朋克
16. 科幻文学
17. 推理小说
18. 中国现代文学
19. 中国先锋文学
20. 新写实小说

### 7.2 第一批阅读路径

请生成并导入以下 10 条阅读路径：

1. 现代主义文学入门
2. 魔幻现实主义入门
3. 存在主义文学入门
4. 后现代主义文学入门
5. 中国现当代文学入门
6. 中国先锋文学入门
7. 科幻文学入门
8. 推理小说入门
9. 诺贝尔文学奖入门
10. 外国文学新手入门

### 7.3 第一批奖项

请生成并导入以下奖项：

1. 诺贝尔文学奖
2. 布克奖
3. 国际布克奖
4. 普利策小说奖
5. 雨果奖
6. 星云奖
7. 茅盾文学奖
8. 鲁迅文学奖
9. 文津图书奖
10. 中国好书

### 7.4 第一批作品数量

第一版 Seed 至少包含：

```text
作品：100 本
导读卡：100 张
流派：20 个
阅读路径：10 条
奖项：10 个
榜单：5 个
```

MVP 扩充目标：

```text
作品：300-500 本
导读卡：300-500 张
流派：20-30 个
阅读路径：10-20 条
奖项：10-15 个
```

\---

## 8\. AI 内容生成规范

### 8.1 总原则

AI 可以生成内容初稿，但不得将内容标记为已验证。

所有 AI 生成内容必须：

```text
aiGenerated = true
reviewStatus = AI\_DRAFT
```

### 8.2 禁止生成的内容

AI 不应直接生成或断言：

* 某译本一定是最佳译本
* 某版本一定删节
* 某书当前是否绝版
* 具体购买链接
* 第三方用户评论摘要
* 大段搬运式简介
* 未确认的出版信息

不确定内容必须写：

```text
待确认
```

### 8.3 流派生成 Prompt

文件位置：

```text
scripts/prompts/movement.ts
```

内容：

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
  "keyFeatures": \[],
  "commonMisunderstandings": \[],
  "beginnerWarning": "",
  "importance": "",
  "recommendedWorks": \[
    {
      "titleOriginal": "",
      "titleTranslatedCn": "",
      "authorNameCn": "",
      "role": "ENTRY | FOUNDATION | CORE | ADVANCED | EXPANSION",
      "reason": "",
      "difficultyLevel": 1
    }
  ],
  "relatedMovements": \[]
}
```

### 8.4 作品导读卡 Prompt

文件位置：

```text
scripts/prompts/work-guide.ts
```

内容：

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
  "nextWorks": \[],
  "easierAlternatives": \[],
  "advancedAlternatives": \[]
}
```

### 8.5 阅读路径 Prompt

文件位置：

```text
scripts/prompts/reading-path.ts
```

内容：

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

JSON 字段：
{
  "title": "",
  "description": "",
  "targetReader": "",
  "difficultyStart": 1,
  "difficultyEnd": 5,
  "steps": \[
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

\---

## 9\. 搜索与推荐

### 9.1 搜索范围

搜索必须覆盖：

* 作品原名（`Work.titleOriginal`）
* 作品中文译名（`Work.titleTranslatedCn`）
* 作者中文名
* 作者原名
* 流派名称
* 主题名称
* 导读卡的一句话定位
* 为什么经典
* 阅读路径标题
* 奖项名称

### 9.2 搜索结果分组

搜索结果页面必须分组显示：

1. 作品
2. 流派
3. 阅读路径
4. 奖项
5. 榜单

### 9.3 第一版推荐公式

第一版不做复杂机器学习。

推荐得分可以按以下逻辑实现：

```text
score =
movementMatch \* 30
+ themeMatch \* 20
+ difficultyFit \* 20
+ pathRoleWeight \* 15
+ awardWeight \* 10
+ editorPick \* 5
```

### 9.4 推荐解释要求

推荐不能只写：

```text
与你喜欢的书相似。
```

必须写成：

```text
这本书同样处理“现代人的疏离感”，但篇幅更短、叙事更直接，比《尤利西斯》更适合作为现代主义入口。
```

\---

## 10\. API 设计

### 10.1 前台 API

```text
GET /api/movements
GET /api/movements/\[slug]

GET /api/works
GET /api/works/\[slug]

GET /api/paths
GET /api/paths/\[slug]

GET /api/awards
GET /api/awards/\[slug]

GET /api/lists
GET /api/lists/\[slug]

GET /api/search?q=
```

### 10.2 后台 API

```text
POST /api/admin/works
PATCH /api/admin/works/\[id]

POST /api/admin/movements
PATCH /api/admin/movements/\[id]

POST /api/admin/paths
PATCH /api/admin/paths/\[id]

POST /api/admin/awards
PATCH /api/admin/awards/\[id]

POST /api/admin/import

POST /api/admin/ai/generate-movement
POST /api/admin/ai/generate-work-guide
POST /api/admin/ai/generate-reading-path

POST /api/admin/review
```

\---

## 11\. 分阶段执行计划

## 阶段 0：项目初始化

### 目标

搭建可运行的 Next.js 项目骨架。

### 任务

```text
创建 Next.js + TypeScript + Tailwind CSS 项目，使用 App Router。
安装并配置：
- shadcn/ui
- Prisma
- PostgreSQL 连接配置
- dotenv
- zod
- lucide-react

创建基础目录：
app、components、lib、prisma、scripts、data、docs。

创建以下空页面：
/
 /movements
 /works
 /paths
 /awards
 /lists
 /search
 /admin
```

### 验收标准

* `npm run dev` 能启动
* 所有基础路由能打开
* Tailwind 生效
* shadcn/ui 可用
* Prisma 初始化完成

\---

## 阶段 1：数据库与 Seed 数据

### 目标

建立数据库模型并导入初始内容。

### 任务 1.1

```text
根据本文件的数据模型创建 Prisma schema。
运行 migration。
生成 Prisma Client。
```

### 任务 1.2

```text
创建 seed JSON 文件：
- data/seed/movements.json
- data/seed/authors.json
- data/seed/works.json
- data/seed/paths.json
- data/seed/awards.json
- data/seed/lists.json
- data/seed/publishers.json
- data/seed/translators.json
```

### 任务 1.3

```text
创建 prisma/seed.ts。
读取 data/seed 下的 JSON 文件。
按以下顺序导入：
1. Authors
2. Publishers
3. Translators
4. Movements
5. Themes
6. Works
7. GuideCards
8. Editions
9. WorkMovement
10. WorkTheme
11. ReadingPaths
12. ReadingPathSteps
13. Awards
14. AwardItems
15. BookLists
16. ListItems

导入时按 slug 或 name 去重。
```

### 验收标准

* 数据库能成功创建
* Seed 能成功导入
* 至少有 20 个流派
* 至少有 100 本作品
* 至少有 100 张导读卡
* 每个流派至少关联 5 本作品
* 每条阅读路径至少 5 个步骤

\---

## 阶段 2：前台页面

### 目标

完成用户可浏览的核心页面。

### 任务 2.1：首页

```text
实现首页。
模块包括：
- 顶部导航
- 产品说明
- 不知道读什么
- 认识一个流派
- 推荐阅读路径
- 从奖项发现书
- 适合新手的经典

要求：
- 中文排版清晰
- 移动端自适应
- 卡片布局
```

### 任务 2.2：流派页

```text
实现 /movements 和 /movements/\[slug]。
从数据库读取真实数据。
流派详情页必须完整展示流派解释、误区、入门作品、核心作品、进阶作品、阅读路径。
```

### 任务 2.3：作品页

```text
实现 /works 和 /works/\[slug]。
作品详情页必须展示 GuideCard 内容。
```

### 任务 2.4：阅读路径页

```text
实现 /paths 和 /paths/\[slug]。
路径详情页按步骤展示作品和推荐理由。
```

### 任务 2.5：奖项页与榜单页

```text
实现 /awards、/awards/\[slug]、/lists、/lists/\[slug]。
```

### 验收标准

* 用户不用登录即可浏览所有前台页面
* 所有页面使用真实数据库数据
* 每个详情页都能返回有效内容
* 移动端可读性良好

\---

## 阶段 3：搜索与筛选

### 目标

用户可以按关键词和筛选条件找到书、流派、路径和奖项。

### 任务

```text
实现 /search 页面和 /api/search。
搜索范围：
- Work.titleOriginal
- Work.titleTranslatedCn
- Author.nameCn
- Author.nameOriginal
- Movement.nameCn
- Theme.name
- GuideCard.oneSentencePositioning
- GuideCard.whyClassic
- ReadingPath.title
- Award.nameCn

搜索结果分组：
- 作品
- 流派
- 阅读路径
- 奖项
- 榜单
```

### 筛选功能

`/works` 页面支持：

* 流派
* 难度
* 是否适合新手
* 国家/地区
* 类型

### 验收标准

* 搜索“现代主义”能返回流派、作品、路径
* 搜索“局外人”能返回作品
* 按难度筛选有效
* 按流派筛选有效

\---

## 阶段 4：后台管理

### 目标

内容可以通过后台维护，不必直接改数据库。

### 任务

```text
实现 /admin 后台基础布局。

后台模块：
- 作品管理
- 流派管理
- 阅读路径管理
- 奖项管理
- 榜单管理
- AI 草稿
- 数据导入
- 内容审核
```

### 作品管理

支持：

* 列表
* 新建
* 编辑
* 归档
* 修改 reviewStatus
* 修改 publishStatus

### 流派管理

支持：

* 列表
* 新建
* 编辑
* 绑定作品
* 设置 relevanceLevel
* 设置 editorConfidence

### 阅读路径管理

支持：

* 新建路径
* 添加步骤
* 调整顺序
* 设置 roleInPath
* 设置 skipAllowed

### 验收标准

* 后台可以增删改查
* 可以修改审核状态
* 可以发布内容
* 可以归档内容
* 不需要直接操作数据库

\---

## 阶段 5：AI 内容生成

### 目标

后台可以生成 AI 草稿并进入审核流程。

### 任务 5.1

```text
创建 prompt builder：
- scripts/prompts/movement.ts
- scripts/prompts/work-guide.ts
- scripts/prompts/reading-path.ts
```

### 任务 5.2

```text
创建 zod schema：
- MovementDraftSchema
- WorkGuideDraftSchema
- ReadingPathDraftSchema
```

### 任务 5.3

```text
实现 /api/admin/ai/generate-movement。
输入 movementName。
调用 AI。
校验 JSON。
保存 Movement 草稿。
reviewStatus = AI\_DRAFT。
```

### 任务 5.4

```text
实现 /api/admin/ai/generate-work-guide。
输入作品基础信息。
生成 GuideCard 草稿。
保存到数据库。
reviewStatus = AI\_DRAFT。
```

### 任务 5.5

```text
实现 /admin/ai-drafts。
显示所有 AI\_DRAFT 内容。
支持：
- 查看
- 编辑
- 通过
- 退回
- 发布
```

### 验收标准

* 能生成一个流派草稿
* 能生成一本书的导读卡
* AI 返回 JSON 不合法时有错误提示
* AI 内容默认不直接标记 VERIFIED

\---

## 阶段 6：内容扩充

### 目标

让 MVP 内容达到可体验规模。

### 内容目标

```text
流派：20 个
作品：300 本
导读卡：300 张
阅读路径：10 条
奖项：10 个
榜单：5 个
```

### 执行方法

1. 使用 AI 生成候选内容
2. 写入 JSON seed
3. 导入数据库
4. 在后台批量检查
5. 修改明显错误
6. 发布可展示内容

### 验收标准

用户能完成以下任务：

1. 了解一个流派是什么
2. 找到该流派适合新手的作品
3. 理解一本书为什么经典
4. 找到下一本应该读什么
5. 看懂某个奖项的参考价值

\---

## 12\. 内容写作风格指南

### 12.1 总体风格

内容应当：

* 清楚
* 准确
* 面向中文普通读者
* 不装腔
* 不故作高深
* 不写空泛推荐
* 不堆术语
* 不直接照搬百科
* 不使用营销文案

### 12.2 禁止句式

避免使用：

```text
这是一部不容错过的作品。
这本书影响深远，值得一读。
该作品具有极高的文学价值。
它深刻揭示了人性的复杂。
这是一部伟大的经典。
```

除非后面给出具体解释，否则这些句子没有信息量。

### 12.3 推荐表达方式

应该写：

```text
这本书适合作为现代主义入口，不是因为它最重要，而是因为它篇幅短、叙事直接，能让读者较快感受到现代人和世界之间的疏离感。
```

```text
这本书不建议作为新手第一本，因为它弱化情节推进，更依赖语言、意识流动和读者对现代主义背景的理解。
```

\---

## 13\. 难度分级标准

### 难度 1

```text
情节清楚，语言直接，背景门槛低，新手可以直接读。
```

### 难度 2

```text
有一定文学性或历史背景，但普通读者仍可顺畅进入。
```

### 难度 3

```text
结构、语言、时代背景或思想主题有一定门槛，需要放慢阅读。
```

### 难度 4

```text
需要较强阅读耐心，可能涉及复杂叙事、文学史背景、思想史背景或实验性写法。
```

### 难度 5

```text
高难度文本，不建议新手直接阅读，更适合进阶读者或专题阅读。
```

\---

## 14\. 流派页内容模板

每个流派页面必须尽量满足以下结构：

```text
# 流派名称

## 一句话解释

用普通读者能理解的话说明这个流派是什么。

## 它为什么出现

说明时代背景、文学背景和思想背景。

## 它反对或改变了什么

说明它和之前文学传统的关系。

## 核心特征

- 特征 1
- 特征 2
- 特征 3

## 常见误解

说明普通读者容易误解的地方。

## 为什么重要

说明它在文学史、类型史或思想史上的意义。

## 新手阅读提醒

说明适不适合新手、应该怎么进入。

## 入门作品

适合新手理解这个流派的作品。

## 核心作品

最能代表这个流派的作品。

## 进阶作品

难度更高或更需要背景的作品。

## 不建议新手直接读

经典但门槛较高的作品。

## 相关流派

和它有影响、重叠、继承或反动关系的流派。
```

\---

## 15\. 作品导读卡模板

每本作品详情页必须尽量满足：

```text
# 作品名

## 一句话定位

这本书到底是什么。

## 为什么经典

具体说明它在文学史、类型史、思想史或写作方法上的位置。

## 为什么值得读

说明普通读者读它能获得什么。

## 适合谁

明确目标读者。

## 不适合谁

明确不适合的读者，避免无差别推荐。

## 阅读难度

1-5 级。

## 难度理由

说明难在哪里或为什么容易读。

## 阅读前最好知道什么

背景知识。

## 阅读建议

怎么读更合适。

## 所属流派

列出流派，并说明关系。

## 读完可以通向哪里

推荐下一本或下一条路径。
```

\---

## 16\. Codex 总执行 Prompt

可以直接复制给 Codex：

```text
你正在开发一个名为“书径 BookPath”的 Web App。

产品定位：
面向中文读者的文学流派与书籍发现导览平台。它不是读书记录工具，不是社区，不提供电子书内容。核心是帮助用户理解文学流派、经典作品、阅读路径、奖项榜单和中文版本信息。

技术栈：
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- PostgreSQL / Supabase
- zod

核心模块：
1. 流派地图
2. 作品导读卡
3. 阅读路径
4. 奖项中心
5. 榜单中心
6. 搜索与筛选
7. 后台管理
8. AI 内容生成草稿

开发原则：
1. 先实现 Web App，不做移动端。
2. 数据从 seed JSON 导入。
3. 所有 AI 生成内容默认 reviewStatus = AI\_DRAFT。
4. 前台只展示 PUBLISHED 内容。
5. 后台可以编辑、审核、发布内容。
6. 不实现用户社区、评论、关注、打卡。
7. 不直接搬运第三方评论和简介。
8. 页面要适合中文长文本阅读。
9. 所有任务必须可运行、可测试、可逐步验收。
10. 如果遇到不确定内容，先使用“待确认”，不要编造确定结论。

请先完成阶段 0：初始化项目结构。
```

\---

## 17\. 分阶段 Codex 子任务 Prompt

### 阶段 0 Prompt

```text
请完成阶段 0：初始化项目结构。

要求：
1. 创建 Next.js + TypeScript + Tailwind CSS 项目，使用 App Router。
2. 安装 shadcn/ui、Prisma、zod、dotenv、lucide-react。
3. 创建目录：app、components、lib、prisma、scripts、data、docs。
4. 创建基础页面：
   - /
   - /movements
   - /works
   - /paths
   - /awards
   - /lists
   - /search
   - /admin
5. 创建基础 layout 和导航。
6. 确保 npm run dev 可以启动。
```

### 阶段 1 Prompt

```text
请完成阶段 1：数据库与 Seed 数据。

要求：
1. 根据 docs/ai-agent-spec.md 中的数据模型创建 prisma/schema.prisma。
2. 生成 Prisma migration。
3. 创建 data/seed 下的 JSON 文件。
4. 先生成 20 个流派、100 本作品、10 条阅读路径、10 个奖项、5 个榜单的 AI 草稿数据。
5. 创建 prisma/seed.ts，将 JSON 数据导入数据库。
6. 所有 AI 生成内容 reviewStatus = AI\_DRAFT。
7. 所有要在前台展示的测试内容 status = PUBLISHED。
8. 导入时按 slug 去重。
```

### 阶段 2 Prompt

```text
请完成阶段 2：前台核心页面。

要求：
1. 实现首页。
2. 实现 /movements 和 /movements/\[slug]。
3. 实现 /works 和 /works/\[slug]。
4. 实现 /paths 和 /paths/\[slug]。
5. 实现 /awards 和 /awards/\[slug]。
6. 实现 /lists 和 /lists/\[slug]。
7. 所有页面从数据库读取真实数据。
8. 页面适配中文长文本阅读。
9. 移动端布局不能混乱。
```

### 阶段 3 Prompt

```text
请完成阶段 3：搜索与筛选。

要求：
1. 实现 /search 页面。
2. 实现 /api/search。
3. 搜索结果分组显示：作品、流派、阅读路径、奖项、榜单。
4. /works 页面支持按流派、难度、国家/地区、作品类型、是否适合新手筛选。
5. 搜索“现代主义”必须能返回相关流派、作品和路径。
```

### 阶段 4 Prompt

```text
请完成阶段 4：后台管理。

要求：
1. 实现 /admin 后台布局。
2. 实现作品管理。
3. 实现流派管理。
4. 实现阅读路径管理。
5. 实现奖项管理。
6. 实现榜单管理。
7. 支持修改 status 和 reviewStatus。
8. 支持发布、归档和编辑内容。
```

### 阶段 5 Prompt

```text
请完成阶段 5：AI 内容生成草稿。

要求：
1. 创建 scripts/prompts/movement.ts。
2. 创建 scripts/prompts/work-guide.ts。
3. 创建 scripts/prompts/reading-path.ts。
4. 创建 zod schema 校验 AI 返回 JSON。
5. 实现 /api/admin/ai/generate-movement。
6. 实现 /api/admin/ai/generate-work-guide。
7. 实现 /api/admin/ai/generate-reading-path。
8. 实现 /admin/ai-drafts 页面。
9. AI 内容必须默认 reviewStatus = AI\_DRAFT。
10. AI JSON 不合法时要返回清晰错误。
```

\---

## 18\. MVP 最终验收标准

### 内容规模

```text
流派：至少 20 个
作品：至少 300 本
导读卡：至少 300 张
阅读路径：至少 10 条
奖项：至少 10 个
榜单：至少 5 个
```

### 功能标准

```text
首页可用
流派页可用
作品详情页可用
阅读路径页可用
奖项页可用
榜单页可用
搜索可用
筛选可用
后台可编辑内容
AI 可生成草稿
Seed 数据可导入
```

### 用户体验标准

用户应该能在 5 分钟内完成：

1. 了解一个流派是什么
2. 找到该流派适合新手的作品
3. 理解一本书为什么经典
4. 找到下一本应该读什么
5. 看懂某个奖项的参考价值

\---

## 19\. 当前最优先开发项

优先级从高到低：

1. 数据库模型
2. Seed 数据
3. 流派详情页
4. 作品导读卡
5. 阅读路径详情页
6. 搜索
7. 后台编辑
8. AI 草稿生成
9. 奖项与榜单
10. 版本/译本模块

第一版的成败取决于：

> 用户打开一个流派页面后，是否真的比看豆瓣、百科和普通书单更明白“这是什么、该读什么、为什么读、先读哪本”。

\---

## 20\. 重要提醒

不要把这个项目做成普通书单站。

不要把“经典”解释成“评分高”。

不要把“推荐”做成“猜你喜欢”。

不要一开始追求书很多。

第一版真正要做深的是：

```text
流派 → 作品 → 阅读路径 → 作品导读 → 下一本书
```

这是产品的主线。
