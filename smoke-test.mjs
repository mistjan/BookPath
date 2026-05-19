import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const file = (name) => join(root, name);
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function text(name) {
  return readFileSync(file(name), "utf8");
}

function includesAll(name, labels, context = name) {
  const content = text(name);
  for (const label of labels) {
    check(content.includes(label), `${context} missing: ${label}`);
  }
}

check(!existsSync(file("index.html")), "old root index.html must stay deleted");
check(!existsSync(file("pages")), "old static pages/ directory must stay deleted");

for (const name of [
  "app/layout.tsx",
  "app/page.tsx",
  "app/movements/page.tsx",
  "app/movements/[slug]/page.tsx",
  "app/start/page.tsx",
  "app/beginner/page.tsx",
  "app/works/page.tsx",
  "app/works/[slug]/page.tsx",
  "app/paths/page.tsx",
  "app/paths/[slug]/page.tsx",
  "app/awards/page.tsx",
  "app/awards/[slug]/page.tsx",
  "app/search/page.tsx",
  "app/admin/page.tsx",
  "app/about/page.tsx",
  "components/layout/site-header.tsx",
  "components/layout/site-footer.tsx",
  "components/layout/admin-sidebar.tsx",
  "components/cards/movement-card.tsx",
  "components/cards/work-card.tsx",
  "components/cards/path-card.tsx",
  "components/cards/award-card.tsx",
  "components/movement/movement-hero.tsx",
  "components/movement/movement-work-section.tsx",
  "components/work/guide-card.tsx",
  "components/work/difficulty-badge.tsx",
  "components/work/edition-list.tsx",
  "components/path/path-step-list.tsx",
  "components/award/award-item-table.tsx",
  "components/search/search-box.tsx",
  "components/search/search-results.tsx",
  "components/admin/entity-table.tsx",
  "components/admin/status-badge.tsx",
  "components/admin/json-import-form.tsx",
  "lib/bookpath-data.ts",
  "lib/content.ts",
  "lib/prisma.ts",
  "lib/db.ts",
  "lib/slug.ts",
  "lib/search.ts",
  "lib/recommend.ts",
  "lib/start-categories.ts",
  "lib/constants.ts",
  "lib/content-status.ts",
  "lib/ai/client.ts",
  "lib/ai/schemas.ts",
  "lib/ai/prompts.ts",
  "prisma/schema.prisma",
  "scripts/import-library-data.mjs",
  "next.config.mjs",
  "tailwind.config.ts",
  "tsconfig.json",
  "README.md",
  "CODEX.md",
  "docs/specs/bookpath_ai_agent_spec.md"
]) {
  check(existsSync(file(name)), `${name} is missing`);
}

for (const name of [
  "apps/web/README.md",
  "apps/mobile/package.json",
  "apps/mobile/app.json",
  "apps/mobile/README.md",
  "apps/mobile/app/_layout.tsx",
  "apps/mobile/app/index.tsx",
  "apps/mobile/app/movements.tsx",
  "apps/mobile/app/works.tsx",
  "apps/mobile/app/paths.tsx",
  "apps/mobile/app/awards.tsx",
  "apps/mobile/app/search.tsx",
  "apps/mobile/components/screen-shell.tsx",
  "apps/mobile/components/metric-card.tsx",
  "packages/content/package.json",
  "packages/content/src/index.ts",
  "packages/core/package.json",
  "packages/core/src/index.ts",
  "packages/design-tokens/package.json",
  "packages/design-tokens/src/index.ts",
  "docs/mobile-architecture.md"
]) {
  check(existsSync(file(name)), `${name} is missing`);
}

const pkg = JSON.parse(text("package.json"));
for (const workspace of ["apps/mobile", "packages/content", "packages/core", "packages/design-tokens"]) {
  check(pkg.workspaces?.includes(workspace), `package.json missing workspace: ${workspace}`);
}
for (const dep of ["next", "react", "react-dom", "@prisma/client", "@supabase/supabase-js", "lucide-react", "zod"]) {
  check(Boolean(pkg.dependencies?.[dep]), `package.json missing dependency: ${dep}`);
}
for (const dep of ["typescript", "tailwindcss", "prisma", "eslint", "prettier"]) {
  check(Boolean(pkg.devDependencies?.[dep]), `package.json missing devDependency: ${dep}`);
}

includesAll("app/layout.tsx", ["suppressHydrationWarning"], "Root layout hydration guard");
includesAll("lib/content.ts", ["@bookpath/content"], "Web content shared package");
includesAll("tsconfig.json", ["@bookpath/content", "@bookpath/core", "@bookpath/design-tokens", "apps/mobile"], "Monorepo TypeScript boundaries");
includesAll("packages/content/src/index.ts", ["bookPathData", "movements", "works", "readingPaths", "awards"], "Shared content package");
includesAll("packages/core/src/index.ts", ["searchBookPath", "beginnerWorks", "beginnerFriendlyWorks", "filterWorks", "workFilterFacets", "pathGroups", "pathsByType", "getMovementById", "getWorkById", "getReadingPathBySlug"], "Shared core package");
includesAll("packages/design-tokens/src/index.ts", ["colors", "spacing", "typography"], "Shared design tokens package");
includesAll("apps/mobile/package.json", ["expo-router", "react-native", "@bookpath/content", "@bookpath/core", "@bookpath/design-tokens"], "Mobile package dependencies");
includesAll("apps/mobile/app/_layout.tsx", ["Tabs", "mainTabs"], "Mobile tab router");
includesAll("apps/mobile/constants/navigation.ts", ["地图", "流派", "作品", "路径", "奖项", "搜索"], "Mobile top-level navigation");
includesAll("docs/mobile-architecture.md", ["不做 WebView 套壳", "packages/content", "packages/core", "packages/design-tokens", "迁移顺序"], "Mobile architecture docs");

includesAll("app/page.tsx", [
  "书径",
  "不是再给你一份书单，而是帮你看懂书单。",
  "不知道读什么？",
  "/start",
  "认识一个流派",
  "推荐阅读路径",
  "从奖项发现书",
  "适合新手的经典",
  "/beginner"
], "Spec 5.1 home");

includesAll("app/start/page.tsx", [
  "不知道读什么？",
  "startCategories",
  "随机卡片",
  "start-work-card",
  "empty-boundary"
], "Start page categories");
includesAll("lib/start-categories.ts", [
  "文学入门",
  "外国文学入门",
  "中国现当代文学入门",
  "科幻入门",
  "推理入门",
  "futureTypeBoundaries",
  "EMPTY_BOUNDARY",
  "科幻小说",
  "推理小说",
  "works.filter"
], "Start category data boundary");

includesAll("components/cards/movement-card.tsx", [
  "解释摘要",
  "进入流派"
], "Movement list simplified cards");
for (const movedDetailLabel of ["流派名称", "原文名", "时期", "地区", "代表作品数量", "是否适合新手"]) {
  check(!text("components/cards/movement-card.tsx").includes(`<dt>${movedDetailLabel}</dt>`), `movement list should not show detail table field: ${movedDetailLabel}`);
}

includesAll("app/movements/[slug]/page.tsx", [
  "第一本先读",
  "给新手看的说明",
  "它为什么出现",
  "它反对/改变了什么",
  "核心特征",
  "常见误解",
  "新手阅读提醒",
  "为什么重要",
  "入口作品",
  "基础作品",
  "核心作品",
  "进阶作品",
  "扩展作品",
  "推荐阅读路径",
  "相关流派",
  "精确定义",
  "内容状态",
  "流派档案",
  "流派名称",
  "原文名",
  "时期",
  "地区",
  "代表作品数量",
  "是否适合新手",
  "入口作品",
  "基础作品",
  "核心作品",
  "进阶作品",
  "扩展作品",
  "ReadingPathStep.roleInPath",
  "暂无对应 reading path JSON"
], "Spec 5.3 movement detail");

includesAll("app/movements/page.tsx", ["map-guide", "movement-regions", "查看 5 个流派", "按路径进入"], "Movement map IA");
includesAll("app/movements/[slug]/page.tsx", ["入口作品", "基础作品", "核心作品", "进阶作品", "扩展作品", "暂无对应 reading path JSON", "/works/"], "Movement detail role groups and path fallback");

includesAll("app/beginner/page.tsx", ["适合新手的经典", "beginnerFriendlyWorks", "简介", "类型", "相关流派", "难度"], "Beginner page");

includesAll("app/works/page.tsx", [
  "@bookpath/core",
  "filterWorks",
  "workFilterFacets",
  "搜索",
  "按流派筛选",
  "按难度筛选",
  "按国家/地区",
  "按作品类型",
  "按是否适合新手"
], "Spec 5.4 works index filters");

includesAll("components/cards/work-card.tsx", [
  "作品地标",
  "类型",
  "literaryCategory",
  "literarySubcategory",
  "难度",
  "相关流派",
  "是否适合新手"
], "Spec 5.4 work card");

includesAll("app/search/page.tsx", [
  "全局发现",
  "SearchBox",
  "SearchResults",
  "searchBookPath",
  "作品",
  "流派",
  "路径",
  "奖项",
  "scope"
], "Global search page");
includesAll("lib/search.ts", [
  "SearchScope",
  "@bookpath/core",
  "searchBookPath",
  "countSearchResults",
  "searchSuggestions"
], "Global search data model");
includesAll("components/search/search-results.tsx", [
  "作品结果",
  "流派结果",
  "路径结果",
  "奖项结果"
], "Global search grouped results");

includesAll("app/works/[slug]/page.tsx", [
  "原名（来源语言，Work 主标题）",
  "中文译名/通行译名",
  "作者",
  "首版年份",
  "国家/地区",
  "作品类型",
  "文学大类",
  "下属子类",
  "一句话定位",
  "为什么经典",
  "为什么值得读",
  "适合谁",
  "不适合谁",
  "阅读难度",
  "难度理由",
  "阅读前最好知道什么",
  "阅读建议",
  "是否适合作为入门作品",
  "所属流派",
  "读完后可以通向哪些作品",
  "相似但更容易的作品",
  "相似但更进阶的作品",
  "所属阅读路径",
  "中文版本区域"
], "Spec 5.5 work detail");

includesAll("components/cards/path-card.tsx", [
  "目标读者",
  "类型",
  "难度区间",
  "作品数量",
  "第一本从哪里开始"
], "Spec 5.6 path card");

includesAll("app/paths/[slug]/page.tsx", ["路径说明", "路径标题", "目标读者", "路径类型", "起始难度", "结束难度", "难度范围", "内容状态"], "Spec 5.7 path detail");
includesAll("components/path/path-step-list.tsx", ["顺序号", "作品名", "原名", "作者", "定位", "推荐理由", "是否可跳过", "替代作品", "难度", "/works/"], "Spec 5.7 path steps");

includesAll("components/cards/award-card.tsx", ["奖项中文名", "国家/地区", "奖项类型", "对新手的参考价值"], "Award card simplified");
for (const hiddenAwardField of ["原名", "创立年份"]) {
  check(!text("components/cards/award-card.tsx").includes(`<dt>${hiddenAwardField}</dt>`), `award list should not show field: ${hiddenAwardField}`);
}
includesAll("app/awards/[slug]/page.tsx", ["奖项简介", "奖项倾向", "对新手的价值", "局限与争议", "获奖作品", "入围作品", "已有中文版", "暂无中文版", "适合新手的作品"], "Spec 5.9 award detail");

includesAll("app/paths/page.tsx", ["阅读路径", "readingPaths", "@bookpath/core", "pathGroups", "pathsByType", "firstPathByType", "第一本从哪里开始"], "Paths discovery page");

const adminContract = text("app/admin/page.tsx") + text("components/layout/admin-sidebar.tsx");
for (const label of ["作品管理", "流派管理", "阅读路径管理", "奖项管理", "榜单管理", "AI 草稿", "数据导入", "内容审核", "AI_DRAFT", "VERIFIED"]) {
  check(adminContract.includes(label), `Spec 1 admin and review status missing: ${label}`);
}

includesAll("lib/bookpath-data.ts", ["titleOriginal", "titleTranslatedCn", "literaryCategory", "literarySubcategory", "aiGenerated", "reviewStatus", "movements", "works", "readingPaths", "awards"], "Data model");
includesAll("scripts/import-library-data.mjs", ["authorRegionHints", "inferCountryOrRegion", "countryOrRegion"], "Library import country inference");
includesAll("prisma/schema.prisma", ["model Work", "titleOriginal", "titleTranslatedCn", "literaryCategory", "literarySubcategory", "model Movement", "model ReadingPath", "model Award", "ReviewStatus", "AI_DRAFT"], "Prisma boundary");

const dataText = text("lib/bookpath-data.ts");
const movementsBlock = dataText.match(/"movements": \[([\s\S]*?)\n  \],\n  "works"/)?.[1] ?? "";
const worksBlock = dataText.match(/"works": \[([\s\S]*?)\n  \],\n  "guideCards"/)?.[1] ?? "";
const guideCardsBlock = dataText.match(/"guideCards": \[([\s\S]*?)\n  \],\n  "readingPaths"/)?.[1] ?? "";
const readingPathsBlock = dataText.match(/"readingPaths": \[([\s\S]*?)\n  \],\n  "awards"/)?.[1] ?? "";
check(dataText.includes('"version": "0.3.0-library-import"'), "data layer must be generated from library import");
check(dataText.includes('"library/movements/bookpath_movements.generated.json"'), "data import source must include movements library");
check(dataText.includes('"library/reading path/bookpath_reading_paths.generated.json"'), "data import source must include reading path library");
check(dataText.includes('"library/work guide/bookpath_work_guides.generated.json"'), "data import source must include work guide library");
check((movementsBlock.match(/"label":/g) || []).length === 82, "data layer must import 82 movements");
check((worksBlock.match(/"titleOriginal":/g) || []).length === 343, "data layer must import 343 literary works");
check((worksBlock.match(/"literaryCategory":/g) || []).length === 343, "every imported work must have a literaryCategory");
check((worksBlock.match(/"literarySubcategory":/g) || []).length === 343, "every imported work must have a literarySubcategory");
check((worksBlock.match(/"countryOrRegion": "中国"/g) || []).length > 0, "imported works must include Chinese country classification");
check((worksBlock.match(/"countryOrRegion": "待补充"/g) || []).length < 343, "country classification must not fall back to all pending");
check((guideCardsBlock.match(/"oneSentencePositioning":/g) || []).length === 184, "data layer must import 184 work guides");
check((readingPathsBlock.match(/"targetReader":/g) || []).length === 88, "data layer must import 88 reading paths");
check((guideCardsBlock.match(/"aiGenerated": true/g) || []).length >= 184, "every imported guide card must be marked as AI draft");
check((readingPathsBlock.match(/"aiGenerated": true/g) || []).length >= 88, "every imported reading path must be marked as AI draft");
check((readingPathsBlock.match(/"titleOriginal":/g) || []).length > 0, "reading path steps must retain titleOriginal");
check((readingPathsBlock.match(/"titleTranslatedCn":/g) || []).length > 0, "reading path steps must retain titleTranslatedCn");
check(dataText.includes('"label": "科幻文学"'), "imported movements must include science fiction");
check(dataText.includes('"label": "推理小说"'), "imported movements must include mystery fiction");
check(dataText.includes('"literarySubcategory": "科幻小说"'), "imported works must classify science fiction works");
check(dataText.includes('"literarySubcategory": "推理小说"'), "imported works must classify mystery works");

if (failures.length) {
  console.error("BookPath product contract failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("BookPath product contract passed: no double homepage, App Router structure, Sections 1/2/3/5 present.");
