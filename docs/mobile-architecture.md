# BookPath Mobile 架构计划

BookPath 最终目标是移动端 App，但当前 Web 端已经承担内容建模、导入和页面验证。因此移动端采用渐进式 monorepo，不做 WebView 套壳。

## 目标架构

```text
BookPath/
  app/                         当前 Next.js Web App，暂留根目录
  components/                  当前 Web 组件
  lib/                         当前 Web 内容访问层
  apps/
    web/                       Web 迁移占位，后续再整体移动
    mobile/                    Expo + React Native + Expo Router App 骨架
  packages/
    content/                   共享内容数据入口
    core/                      共享搜索、筛选、路径、推荐规则
    design-tokens/             共享颜色、间距、字号语义
```

## 为什么不用 WebView

- BookPath 的核心体验是地图、路径、详情页跳转和后续收藏/进度，不只是展示网页。
- 移动端需要原生导航、可离线内容、手势和更清晰的卡片流。
- WebView 会让短期迁移快一点，但会限制长期产品体验。

## 当前落地状态

- `apps/mobile` 已建立 Expo Router 骨架。
- `packages/content` 重新导出 `lib/bookpath-data.ts` 的内容数据。
- `packages/core` 提供基础搜索、入门作品、实体查询函数。
- `packages/design-tokens` 提供移动端与 Web 可共享的基础视觉 token。
- 根 `tsconfig.json` 已排除 `apps/mobile`，避免未安装 Expo 依赖时影响 Web 构建。

## 首批移动端页面

- `apps/mobile/app/index.tsx`：书籍世界地图首页
- `apps/mobile/app/movements.tsx`：流派入口
- `apps/mobile/app/works.tsx`：作品入口
- `apps/mobile/app/paths.tsx`：阅读路径入口
- `apps/mobile/app/awards.tsx`：奖项入口
- `apps/mobile/app/search.tsx`：搜索入口

## 迁移顺序

1. 保持 Web 端继续可构建、可验证。
2. 先迁移内容读取和核心逻辑，不迁移 UI。
3. 移动端首页先做地图导航和 Tab。
4. 迁移作品列表与作品详情，因为作品是所有路径的地标节点。
5. 再迁移流派详情和阅读路径详情。
6. 最后再做收藏、阅读状态、离线缓存和账号。

## 运行方式

当前未安装 Expo 依赖时，不运行 mobile。

准备进入移动端开发时：

```powershell
npm install
npm run mobile:start
```

Web 端仍然使用：

```powershell
npm run dev -- --hostname 127.0.0.1 --port 3000
npm run verify
npm run build
```
