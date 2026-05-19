# 阅读路径导入说明

当你用 `library/bookpath_generation_docs/reading-path-generation.jsonl` 或 `missing-reading-path-generation.jsonl` 生成新的阅读路径 JSON 后，按下面流程导入。

## 1. 放置文件

把生成结果保存为 JSON 数组文件，并放到：

```text
library/reading path/
```

文件名必须以 `.generated.json` 结尾，例如：

```text
bookpath_missing_reading_paths.generated.json
```

导入器会自动读取该目录下所有 `*.generated.json` 文件，并合并为应用数据。

## 2. 校验并导入

在项目根目录运行：

```powershell
python scripts/import_reading_paths.py
```

脚本会做三件事：

1. 检查每个阅读路径文件是否是 JSON 数组。
2. 检查路径字段：`title`、`description`、`targetReader`、`difficultyStart`、`difficultyEnd`、`steps`。
3. 检查步骤字段：`stepOrder`、`titleOriginal`、`titleTranslatedCn`、`roleInPath`、`reason`、`skipAllowed`、`alternativeTitle`。
4. 校验通过后自动运行 `node scripts/import-library-data.mjs`，重建 `lib/bookpath-data.ts`。

## 3. 只校验不导入

如果只想检查 JSON 文件，不想重建数据：

```powershell
python scripts/import_reading_paths.py --skip-node-import
```

## 4. 导入后验证产品

```powershell
npm run verify
npm run build
```

## 注意

- `roleInPath` 只能是：`ENTRY`、`FOUNDATION`、`CORE`、`ADVANCED`、`EXPANSION`。
- `steps.titleOriginal` 和 `steps.titleTranslatedCn` 应尽量与候选作品名称一致，否则可能无法链接到作品详情页。
- 如果某条路径标题能匹配流派名称，例如 `现实主义入门`，流派详情页会自动显示这条路径。
