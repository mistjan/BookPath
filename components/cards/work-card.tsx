import Link from "next/link";
import type { Work } from "@/lib/bookpath-data";
import { movementName } from "@/lib/content";

export function WorkCard({ work }: { work: Work }) {
  return (
    <article className="info-card work-landmark-card">
      <p className="eyebrow">{work.titleOriginal}</p>
      <strong>{work.titleDisplayCn}</strong>
      <p>简介：一张作品地标卡，说明这本书在书籍世界地图里的入口价值。</p>
      <dl className="meta-list">
        <div><dt>类型</dt><dd>{work.literaryCategory} / {work.literarySubcategory}</dd></div>
        <div><dt>难度</dt><dd>{work.difficultyLevel} / 5</dd></div>
        <div><dt>相关流派</dt><dd>{work.movementIds.map(movementName).join("、")}</dd></div>
        <div><dt>是否适合新手</dt><dd>{work.beginnerEntry ? "适合入口" : "建议按路径进入"}</dd></div>
      </dl>
      <Link className="text-link" href={`/works/${work.id}`}>查看作品详情</Link>
    </article>
  );
}
