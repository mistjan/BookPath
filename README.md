# BookPath — 书径

面向中文读者的文学流派与书籍发现导览平台。

不是电子书平台、读书记录工具、社区、社交产品，也不是简单榜单聚合站。核心目标是帮助用户理解文学流派、认识经典作品、找到合适的入门书籍。

---

## 产品定位

> 不是再给你一份书单，而是帮你看懂书单。

从文学流派、经典作品、奖项榜单和阅读路径开始，找到真正适合你的下一本书。

### 不是

- ❌ 电子书平台 / 读书记录工具 / 社区 / 社交产品
- ❌ 简单榜单聚合站 / 评分聚合器 / 导购站

---

## 架构

### Monorepo 结构

```
BookPath/
├── apps/
│   ├── mobile/          # Expo + React Native + Expo Router（主 App · 5 Tab 导航）
│   └── web/             # Next.js App Router（桌面端）
├── packages/
│   ├── content/         # 共享内容数据入口（流派/作品/路径/奖项）
│   ├── core/            # 共享业务逻辑（搜索/筛选/推荐/slugify/存储/收藏/阅读）
│   └── design-tokens/   # 跨平台视觉 Token（颜色/间距/字体 · 含暗色色板）
├── lib/                 # 数据源（bookpath-data.ts / awards-data.ts · 不从 Apps 迁移）
├── library/             # 内容生成文档
├── scripts/             # 数据导入/批量补全脚本
└── docs/                # 产品/架构/设计文档
```

### 技术栈

| 层 | 技术 |
|---|------|
| **Web 框架** | Next.js 15 App Router + TypeScript 5.7 |
| **移动端** | Expo SDK 55 + React Native + Expo Router · 5 Tab 导航 |
| **样式** | Tailwind CSS (Web) / StyleSheet + 设计 Token (Mobile) |
| **数据库** | Prisma + Supabase PostgreSQL（管理后台预留） |
| **移动端存储** | AsyncStorage（收藏/阅读/主题） |
| **分享** | react-native-view-shot + react-native-qrcode-svg + Share API |
| **包管理** | npm workspaces |

---

## 数据规模

| 类型 | 数量 | 完成度 |
|------|------|--------|
| 流派 | 92 | 100% 字段完整（含常见误解、新手引导、导读卡） |
| 作品 | 535 | 100% 有导读卡、首版年份、原名 |
| 作品导读卡 | 900+ | 535 部作品全覆盖，部分字段为 AI 草稿 |
| 阅读路径 | 98 | 含新增古典文学、国别文学等 10 条路径 |
| 奖项 | 40 | 含 2,358 届历届记录，83% 已填充 |
| 作家 | 与作品关联 | 作者页从作品和奖项数据聚合 |

---

## 功能状态

### 移动端（主 App · 5 Tab）

| Tab | 页面 | 功能 |
|-----|------|------|
| 🧭 首页 | 品牌区 + CTA + 快速探索(6) + 今日推荐 + 推荐路径 | 随机推荐/新手友好入口 |
| 🏷️ 流派 | 列表 · 详情 | 6 类筛选 chip · 详情含 Start Here 可点击跳转 |
| 📖 作品 | 列表 · 详情 | 2 列网格 · 筛选(分类/难度/国家/排序) · ♡收藏 · 标记状态 · ↗ 分享卡 |
| 🗺️ 路径 | 列表 · 详情 | 类型/难度筛选 · ↗ 分享卡(步骤列表) |
| ⚙ 更多 | 奖项/作家/古典文学/新手友好/随机推荐 · 收藏列表/阅读记录/深色模式 |

### 通用功能（移动端）

| 功能 | 状态 |
|------|------|
| 收藏 | ✅ AsyncStorage 持久化 · 详情页 ♡ 切换 · 收藏列表页 |
| 阅读进度 | ✅ 想读/在读/读完 三态 · 详情页状态选择 · 阅读记录页 |
| 深色模式 | ✅ ThemeProvider 包裹全局 · 更多页切换 · 暗色色板已定义 |
| 分享图 | ✅ 作品/流派/路径分享信息卡 · captureRef 生成 PNG · QR 码 |
| 新手引导 | ✅ 首次启动弹窗 · isFirstLaunch + markOnboardingComplete |
| 返回按钮 | ✅ 所有子页面左上角 ‹ + 标题 · 点击回到上一页 |
| 错误边界 | ✅ ErrorBoundary 包裹根 Layout |
| 离线缓存 | ⚠️ cache.ts 服务已就绪 · 未接入启动流程 |
| 无障碍 | ⚠️ 关键按钮有 accessibilityLabel · 列表卡片通过文本内容可被屏幕阅读器识别 |

### Web 端

| 功能 | 状态 |
|------|------|
| 首页导览 | ✅ 7 入口卡片 |
| 流派列表/详情 | ✅ 搜索 · 详情含作品分组 + 阅读路径 + Start Here 可点击 |
| 作品列表/详情 | ✅ 搜索 · 分类/难度排序 · 详情含导读卡 · 收藏/阅读按钮 |
| 奖项列表/详情 | ✅ 历届行内展开 |
| 阅读路径列表/详情 | ✅ 步骤时间线 |
| 搜索 | ✅ 全局搜索 |
| 作者详情 | ✅ 作品+奖项聚合 |
| 古典文学精选 | ✅ /classics |
| 新手/入门 | ✅ /beginner · /start |

---

## 开发

### 启动

```powershell
# Web 端
npm --workspace @bookpath/web run dev

# 移动端 Web 版
.\start-mobile-web.bat
# 或: npm --workspace apps/mobile run web
```

### 验证

```powershell
npm --workspace apps/mobile run check    # 移动端类型检查
npm --workspace @bookpath/web run build  # Web 端生产构建
```

### APK 构建 (EAS Build)

```powershell
# 首次配置
eas init --force
eas build:configure

# 构建 APK
eas build --platform android --profile preview --non-interactive

# 查看构建列表
eas build:list
```

### 缓存清理

```powershell
.\clear-cache.bat    # 清除收藏/阅读/主题/缓存数据
```

---

## 已知限制

| 问题 | 说明 |
|------|------|
| 导读卡 AI 草稿 | 535 张导读卡全为 AI_DRAFT，无人工审核 |
| 奖项数据缺口 | 398 届空置（主要集中在日本推理协会奖/轨迹奖/老舍文学奖等） |
| 深色模式 | ThemeProvider + 切换按钮已完成 · StyleSheet 动态化需逐页迁移 |
| 无用户系统 | 收藏/阅读状态仅本地存储，跨设备不同步 |
| 无后端 CMS | 数据为静态 JSON，内容更新需修改数据文件后重建 |
| DeepLink | `bookpath://` scheme 已配置 · `https://bookpath.app` 需部署 Web 端 + apple-app-site-association |
