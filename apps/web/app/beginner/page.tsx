import Link from "next/link";
import { movementName } from "@/lib/content";
import { beginnerFriendlyWorks } from "@bookpath/core";

const beginnerWorks = beginnerFriendlyWorks();

export default function BeginnerPage() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Beginner Classics</p>
          <h1>适合新手的经典</h1>
          <p className="lede">这里只推荐难度 2 及以下的作品。先用低门槛入口保护阅读兴趣，再进入更难的核心经典。</p>
        </div>
      </section>

      <section className="beginner-grid" aria-label="适合新手的作品">
        {beginnerWorks.map((work) => (
          <article className="info-card simple-card" key={work.id}>
            <strong>{work.titleDisplayCn}</strong>
            <p>{work.titleOriginal}</p>
            <dl className="meta-list">
              <div><dt>简介</dt><dd>一张低门槛入口卡，适合先建立阅读信心。</dd></div>
              <div><dt>类型</dt><dd>{work.literaryCategory} / {work.literarySubcategory}</dd></div>
              <div><dt>相关流派</dt><dd>{work.movementIds.map(movementName).join("、")}</dd></div>
              <div><dt>难度</dt><dd>{work.difficultyLevel} / 5</dd></div>
            </dl>
            <Link className="text-link" href={`/works/${work.id}`}>查看作品</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
