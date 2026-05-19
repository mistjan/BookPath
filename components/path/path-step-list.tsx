import Link from "next/link";
import type { ReadingPath } from "@/lib/bookpath-data";

const roleLabels: Record<string, string> = {
  ENTRY: "入口",
  FOUNDATION: "基础",
  CORE: "核心",
  ADVANCED: "进阶",
  EXPANSION: "扩展"
};

function roleLabel(role: string) {
  return roleLabels[role] ?? role;
}

export function PathStepList({ path, variant = "rail" }: { path: ReadingPath; variant?: "rail" | "timeline" }) {
  return (
    <ol className={variant === "timeline" ? "path-list path-list-timeline" : "path-list"}>
      {path.steps.map((step) => (
        <li key={step.id}>
          <span className="step-number">{step.order}</span>
          <div>
            <p className="path-step-role">定位：{roleLabel(step.roleInPath)}</p>
            <Link className="path-step-title" href={`/works/${step.workId}`}>{step.title}</Link>
            <dl className="path-step-meta">
              <div><dt>顺序号</dt><dd>{step.order}</dd></div>
              <div><dt>作品名</dt><dd>{step.titleTranslatedCn}</dd></div>
              <div><dt>原名</dt><dd>{step.titleOriginal}</dd></div>
              <div><dt>作者</dt><dd>{step.work?.authorName ?? "待补充"}</dd></div>
              <div><dt>定位</dt><dd>{roleLabel(step.roleInPath)}</dd></div>
              <div><dt>难度</dt><dd>{step.work?.difficultyLevel ?? "待确认"}</dd></div>
              <div><dt>是否可跳过</dt><dd>{step.skipAllowed ? "可以" : "不建议"}</dd></div>
              <div><dt>替代作品</dt><dd>{step.alternativeTitle || "无"}</dd></div>
            </dl>
            <details className="path-step-details">
              <summary>展开推荐理由</summary>
              <p>推荐理由：{step.reason}</p>
            </details>
          </div>
        </li>
      ))}
    </ol>
  );
}
