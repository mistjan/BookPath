#!/usr/bin/env python3
"""Validate BookPath reading path JSON files and rebuild generated app data.

This script is intentionally small: the source-of-truth importer remains
scripts/import-library-data.mjs, while this Python entry point gives editors a
repeatable workflow after placing new *.generated.json files under
library/reading path.
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_READING_PATH_DIR = ROOT / "library" / "reading path"
NODE_IMPORTER = ROOT / "scripts" / "import-library-data.mjs"

REQUIRED_PATH_FIELDS = {
    "title",
    "description",
    "targetReader",
    "difficultyStart",
    "difficultyEnd",
    "steps",
}

REQUIRED_STEP_FIELDS = {
    "stepOrder",
    "titleOriginal",
    "titleTranslatedCn",
    "roleInPath",
    "reason",
    "skipAllowed",
    "alternativeTitle",
}

VALID_ROLES = {"ENTRY", "FOUNDATION", "CORE", "ADVANCED", "EXPANSION"}


def load_json_array(path: Path) -> list[dict[str, Any]]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise ValueError(f"{path} 不是合法 JSON：{exc}") from exc
    if not isinstance(value, list):
        raise ValueError(f"{path} 顶层必须是 JSON 数组")
    return value


def validate_reading_path_file(path: Path) -> tuple[int, int, list[str]]:
    errors: list[str] = []
    items = load_json_array(path)
    step_count = 0

    for index, item in enumerate(items, start=1):
        if not isinstance(item, dict):
            errors.append(f"{path.name} 第 {index} 条不是对象")
            continue

        missing = sorted(REQUIRED_PATH_FIELDS - set(item))
        if missing:
            errors.append(f"{path.name} 第 {index} 条缺字段：{', '.join(missing)}")

        steps = item.get("steps")
        if not isinstance(steps, list) or not steps:
            errors.append(f"{path.name} 第 {index} 条 steps 必须是非空数组")
            continue

        step_count += len(steps)
        for step_index, step in enumerate(steps, start=1):
            if not isinstance(step, dict):
                errors.append(f"{path.name} 第 {index} 条第 {step_index} 步不是对象")
                continue
            step_missing = sorted(REQUIRED_STEP_FIELDS - set(step))
            if step_missing:
                errors.append(
                    f"{path.name} 第 {index} 条第 {step_index} 步缺字段：{', '.join(step_missing)}"
                )
            role = step.get("roleInPath")
            if role not in VALID_ROLES:
                errors.append(
                    f"{path.name} 第 {index} 条第 {step_index} 步 roleInPath 非法：{role}"
                )

    return len(items), step_count, errors


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="校验 library/reading path 下的阅读路径 JSON，并重建 lib/bookpath-data.ts。"
    )
    parser.add_argument(
        "--reading-path-dir",
        default=str(DEFAULT_READING_PATH_DIR),
        help="阅读路径 JSON 文件夹，默认：library/reading path",
    )
    parser.add_argument(
        "--skip-node-import",
        action="store_true",
        help="只校验 JSON，不执行 node scripts/import-library-data.mjs",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    reading_path_dir = Path(args.reading_path_dir)
    if not reading_path_dir.is_absolute():
        reading_path_dir = ROOT / reading_path_dir

    files = sorted(reading_path_dir.glob("*.generated.json"))
    if not files:
        print(f"未找到阅读路径文件：{reading_path_dir}/*.generated.json", file=sys.stderr)
        return 1

    total_paths = 0
    total_steps = 0
    all_errors: list[str] = []
    for file_path in files:
        path_count, step_count, errors = validate_reading_path_file(file_path)
        total_paths += path_count
        total_steps += step_count
        all_errors.extend(errors)
        print(f"已检查 {file_path.relative_to(ROOT)}：{path_count} 条路径，{step_count} 个步骤")

    if all_errors:
        print("\n校验失败：", file=sys.stderr)
        for error in all_errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print(f"\n阅读路径 JSON 校验通过：共 {total_paths} 条路径，{total_steps} 个步骤。")

    if args.skip_node_import:
        print("已跳过 Node 数据导入。")
        return 0

    result = subprocess.run(
        ["node", str(NODE_IMPORTER.relative_to(ROOT))],
        cwd=ROOT,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        print("Node 数据导入失败。", file=sys.stderr)
        return result.returncode

    print("已重建 lib/bookpath-data.ts。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
