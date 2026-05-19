# BookPath Mobile

BookPath Mobile 是未来 App 主体的 Expo + React Native + Expo Router 骨架。

当前状态是迁移骨架，不是可发布 App：

- 不做 WebView 套壳
- 不接用户系统
- 不接 AI 内容生成 API
- 不复制一份独立数据
- 通过 `packages/content`、`packages/core`、`packages/design-tokens` 共享 Web 端内容和规则

安装 Expo 依赖之后运行：

```powershell
npm install
npm run mobile:start
```

首批页面：

- `/`：书籍世界地图首页
- `/movements`：流派入口
- `/works`：作品入口
- `/paths`：阅读路径入口
- `/awards`：奖项入口
- `/search`：全局搜索入口

下一阶段迁移顺序：

1. 首页地图与 Tab 导航
2. 作品列表与作品详情
3. 流派详情
4. 路径详情
5. 搜索与收藏
