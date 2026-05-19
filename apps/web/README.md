# BookPath Web

当前 Next.js Web App 仍位于仓库根目录，这是为了保持现有页面、导入脚本和验证流程稳定。

`apps/web` 是迁移占位目录，用来声明 Web 端在目标 monorepo 中的归属：

- Web 端职责：SEO、桌面阅读地图、内容审核与管理预览
- Mobile 端职责：最终 App 主体验、原生导航、离线地图、收藏和阅读进度
- 共享层职责：`packages/content`、`packages/core`、`packages/design-tokens`

后续迁移到 `apps/web` 时再整体移动：

- `app/`
- `components/`
- `lib/`
- `public/` 或静态资源
- `next.config.mjs`
- `postcss.config.mjs`
- `tailwind.config.ts`

不要在移动端迁移尚未跑通前移动 Web 根目录，否则会干扰当前验证和内容导入。
