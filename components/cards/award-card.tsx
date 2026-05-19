import Link from "next/link";
import type { Award } from "@/lib/bookpath-data";

export function AwardCard({ award }: { award: Award }) {
  return (
    <article className="info-card simple-card">
      <strong>{award.titleCn}</strong>
      <dl className="meta-list">
        <div><dt>奖项中文名</dt><dd>{award.titleCn}</dd></div>
        <div><dt>国家/地区</dt><dd>{award.countryOrRegion}</dd></div>
        <div><dt>奖项类型</dt><dd>{award.awardType}</dd></div>
        <div><dt>对新手的参考价值</dt><dd>{award.beginnerValue}</dd></div>
      </dl>
      <Link className="text-link" href={`/awards/${award.id}`}>查看奖项详情</Link>
    </article>
  );
}
