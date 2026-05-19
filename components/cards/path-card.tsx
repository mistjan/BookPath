import Link from "next/link";
import type { ReadingPath } from "@/lib/bookpath-data";

export function PathCard({ path }: { path: ReadingPath }) {
  const firstStep = path.steps[0];
  return (
    <article className="info-card path-discovery-card">
      <p className="eyebrow">{path.type}</p>
      <strong>{path.title}</strong>
      <p>{path.intro}</p>
      <dl className="meta-list">
        <div><dt>目标读者</dt><dd>{path.targetReader}</dd></div>
        <div><dt>类型</dt><dd>{path.type}</dd></div>
        <div><dt>难度区间</dt><dd>{path.difficultyRange}</dd></div>
        <div><dt>作品数量</dt><dd>{path.workCount}</dd></div>
        <div><dt>第一本从哪里开始</dt><dd>{firstStep ? `${firstStep.title} / ${firstStep.roleInPath}` : "待确认"}</dd></div>
      </dl>
      <Link className="text-link" href={`/paths/${path.slug}`}>查看路径详情</Link>
    </article>
  );
}
