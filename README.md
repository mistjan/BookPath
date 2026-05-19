# BookPath 初代产品

BookPath 是面向中文读者的文学流派与书籍发现导览平台。

它不是电子书平台、读书记录工具、社区、社交产品，也不是简单榜单聚合站。核心目标是帮助用户理解文学流派、认识经典作品、找到合适的入门书籍，并从流派、作品、路径、奖项和搜索进入一张清晰的阅读地图。

## Source Priority

`docs/specs/bookpath_ai_agent_spec.md` 是最高权重产品文档。

优先级：

1. 用户当前最新明确指令
2. `docs/specs/bookpath_ai_agent_spec.md`
3. `PRODUCT.md`
4. `DESIGN.md`
5. `README.md`
6. 实现细节

## Product Shape

当前结构已经从旧静态原型切换为 BookPath 文档要求的初代 Web App 骨架：

- `app/page.tsx`：唯一首页 `/`
- `app/movements/page.tsx`：流派列表 `/movements`
- `app/movements/[slug]/page.tsx`：流派详情 `/movements/[slug]`
- `app/works/page.tsx`：作品列表 `/works`
- `app/works/[slug]/page.tsx`：作品详情 `/works/[slug]`
- `app/paths/page.tsx`：阅读路径列表 `/paths`
- `app/paths/[slug]/page.tsx`：阅读路径详情 `/paths/[slug]`
- `app/awards/page.tsx`：奖项列表 `/awards`
- `app/awards/[slug]/page.tsx`：奖项详情 `/awards/[slug]`
- `app/search/page.tsx`：搜索页 `/search`
- `app/admin/page.tsx`：后台管理入口 `/admin`
- `app/about/page.tsx`：产品边界 `/about`

旧的 `index.html` 和 `pages/*.html` 已退出产品路径，避免形成两个主页。

## Architecture

按 BookPath 第 2、3 点，目标栈是：

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui 方向的组件组织
- lucide-react
- Prisma
- Supabase PostgreSQL
- zod
- eslint / prettier

当前仓库已经安装依赖，并以 Next.js App Router 作为初代 Web App 骨架。

移动端目标架构已经开始落地为渐进式 monorepo：

- `apps/mobile`：Expo + React Native + Expo Router 移动端骨架
- `apps/web`：Web 端迁移占位，当前 Next.js 仍暂留仓库根目录
- `packages/content`：共享内容数据入口
- `packages/core`：共享搜索、筛选、路径与推荐规则
- `packages/design-tokens`：共享视觉 token

移动端架构说明见：

- `docs/mobile-architecture.md`

当前不做 WebView 套壳。移动端会逐步迁移为原生导航体验，Web 端继续作为网页产品、内容审核与验证环境。

当前 Web 已开始回接共享层：

- `lib/content.ts` 从 `@bookpath/content` 读取内容数据
- `lib/search.ts` 从 `@bookpath/core` 复用全局搜索与结果统计
- `lib/recommend.ts` 从 `@bookpath/core` 复用入门作品选择
- `app/works/page.tsx` 从 `@bookpath/core` 复用作品筛选和 facet 统计
- `app/paths/page.tsx` 从 `@bookpath/core` 复用路径分组与路径类型筛选

## Data

当前内容数据位于：

- `lib/bookpath-data.ts`
- `lib/content.ts`

`lib/bookpath-data.ts` 由 library 原始 JSON 导入生成，来源文件是：

- `library/movements/bookpath_movements.generated.json`
- `library/reading path/*.generated.json`
- `library/work guide/bookpath_work_guides.generated.json`

重新导入数据时运行：

```powershell
python scripts/import_reading_paths.py
```

当前导入规模：

- 82 个流派
- 343 部作品
- 184 张作品导读卡
- 88 条阅读路径

阅读路径导入说明见：

- `docs/import-reading-paths.md`

建模必须区分：

- `Work.titleOriginal`：来源语言原名
- `Work.titleTranslatedCn`：中文译名/通行译名
- `Edition.titleCn`：具体中文版本名，后续由版本模型填充

当前内容范围仍以文学和文学相关作品为主。

## Verify

```powershell
npm run verify
```

当前验证检查：

- 不存在旧 `index.html`
- 不存在旧静态 `pages/` 目录
- Next App Router 关键页面存在
- 渐进式 monorepo 目录存在：`apps/mobile`、`apps/web`、`packages/content`、`packages/core`、`packages/design-tokens`
- Mobile 骨架包含地图、流派、作品、路径、奖项和搜索入口
- Web 搜索、作品筛选、路径分组已开始复用 `packages/core`
- 首页符合 BookPath 5.1
- 流派、作品、路径、奖项页面符合 BookPath 5.2-5.9
- `package.json` 声明 Next.js / TypeScript / Prisma / Tailwind / zod 等目标栈
- 数据层来自 library 导入，并保留 82 个流派、343 部作品、184 张作品导读卡、88 条阅读路径和奖项占位

## Do Not Regress

- 不要恢复根 `index.html`
- 不要恢复静态 `pages/*.html` 作为主路径
- 不要把 `/` 和 `/movements` 都做成主页
- 不要把产品做成单页展示或设计变体集
- 不要把作品页做成百科页
- 不要把奖项页做成获奖名单堆叠
