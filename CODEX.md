# BookPath Codex Notes

## Highest Priority

始终先读 `docs/specs/bookpath_ai_agent_spec.md`。它高于本文件、README、PRODUCT、DESIGN 和任何历史实现。

当前用户已明确要求：完全摒弃不符合 BookPath 文档 1、2、3、5 点的旧结果。

## Current Product State

BookPath 已从旧静态原型切换为 Next.js App Router 初代产品骨架。

主路径是：

- `app/page.tsx`
- `app/movements/page.tsx`
- `app/movements/[slug]/page.tsx`
- `app/works/page.tsx`
- `app/works/[slug]/page.tsx`
- `app/paths/page.tsx`
- `app/paths/[slug]/page.tsx`
- `app/awards/page.tsx`
- `app/awards/[slug]/page.tsx`
- `app/search/page.tsx`
- `app/admin/page.tsx`
- `app/about/page.tsx`

旧 `index.html` 和旧静态 `pages/` 目录必须保持删除状态。不要再制造两个主页。

## Product Boundary

BookPath 是中文文学流派与书籍发现导览平台。它不是社区、社交产品、电子书平台、读书打卡工具、读书笔记工具或榜单聚合站。

第一版必须有：首页导航、流派列表页、流派详情页、作品列表页、作品详情页、阅读路径列表页、阅读路径详情页、奖项列表页、奖项详情页、搜索页、后台管理页、内容审核状态。

## Data Boundary

当前静态内容在 `lib/bookpath-data.ts`，访问助手在 `lib/content.ts`。

必须保留标题建模：

- `Work.titleOriginal` 是来源语言原名
- `Work.titleTranslatedCn` 是中文译名/通行译名
- `Edition.titleCn` 后续才表示具体版本标题

## Verification

运行：

```powershell
npm run verify
```

验证失败时，优先修复与 BookPath 1、2、3、5 点不符的结构问题。
