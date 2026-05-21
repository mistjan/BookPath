import Link from "next/link";
import { works, awardsData, slugify, movementName } from "@/lib/content";
import { authorBios } from "@bookpath/core";

function findAuthorAwardWins(authorId: string) {
  const wins: { awardName: string; edition: string; year: number | null }[] = [];
  awardsData.forEach((award) => {
    award.awardEditions.forEach((ed) => {
      const matched = ed.authorItems.find((ai) => slugify(ai.nameCn) === authorId);
      if (matched) {
        wins.push({
          awardName: award.nameCn,
          edition: ed.awardEditionLabel,
          year: ed.awardYear,
        });
      }
    });
  });
  return wins.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}

export default async function AuthorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const id = decodeURIComponent(rawId);

  const authorWorks = works.filter((w) => slugify(w.authorName) === id);
  const awardWins = findAuthorAwardWins(id);

  const authorName =
    authorWorks[0]?.authorName ?? awardWins[0]?.awardName ?? id;

  // No data at all
  if (!authorWorks.length && !awardWins.length) {
    return (
      <main className="page">
        <section className="hero">
          <div>
            <p className="eyebrow">作者</p>
            <h1>未找到作家</h1>
            <p className="lede">id: {id}</p>
          </div>
        </section>
      </main>
    );
  }

  // Only award data, no works in library
  if (!authorWorks.length) {
    const realName = (() => {
      for (const a of awardsData) {
        for (const ed of a.awardEditions) {
          const found = ed.authorItems.find((ai) => slugify(ai.nameCn) === id);
          if (found) return found.nameCn;
        }
      }
      return id;
    })();

    return (
      <main className="page">
        <section className="hero">
          <div>
            <p className="eyebrow">作者</p>
            <h1>{realName}</h1>
            <p className="lede">暂未收录该作家的作品，以下为其获奖记录。</p>
          </div>
        </section>
        <section className="section-grid">
          <h2 className="section-title">获奖记录 ({awardWins.length})</h2>
          {awardWins.map((win, i) => (
            <article key={i} className="field-card">
              <strong>{win.awardName}</strong>
              <p>{win.edition}{win.year ? ` · ${win.year}年` : ""}</p>
            </article>
          ))}
        </section>
      </main>
    );
  }

  const allMovementIds = [...new Set(authorWorks.flatMap((w) => w.movementIds as readonly string[]))];
  const allCountries = [...new Set(authorWorks.map((w) => w.countryOrRegion).filter((c) => c !== "待补充"))];
  const sorted = [...authorWorks].sort((a, b) => a.difficultyLevel - b.difficultyLevel);

  // Check for author bio
  const bio = authorBios[id] || authorBios[authorName.replace(/^[《》\s]+|[《》\s]+$/g, "")];

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">作者</p>
          <h1>{authorName}</h1>
          <div className="work-hero-meta">
            <span>{authorWorks.length} 部作品</span>
            {allCountries.length > 0 && <span>{allCountries.join("、")}</span>}
            {awardWins.length > 0 && <span>{awardWins.length} 项获奖</span>}
          </div>
          {allMovementIds.length > 0 && (
            <p className="lede">
              相关流派：{allMovementIds.map(movementName).join("、")}
            </p>
          )}
          {bio && (
            <div style={{ marginTop: 24, display: "grid", gap: 16 }}>
              {bio.description && (
                <article className="field-card">
                  <strong>简介</strong>
                  <p>{bio.description}</p>
                </article>
              )}
              {bio.whyImportant && (
                <article className="field-card">
                  <strong>为什么重要</strong>
                  <p>{bio.whyImportant}</p>
                </article>
              )}
              {bio.recommendedFor && (
                <article className="field-card">
                  <strong>适合谁</strong>
                  <p>{bio.recommendedFor}</p>
                </article>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="section-grid">
        <h2 className="section-title">作品列表 ({sorted.length})</h2>
        {sorted.map((work) => (
          <Link key={work.id} href={`/works/${work.slug}`} className="card-link">
            <article className="field-card">
              <strong>{work.titleDisplayCn}</strong>
              {work.titleOriginal && <p className="text-muted">{work.titleOriginal}</p>}
              <div className="work-hero-meta">
                <span>难度 {work.difficultyLevel}</span>
                <span>{work.literaryCategory}</span>
                {work.literarySubcategory !== work.literaryCategory && (
                  <span>{work.literarySubcategory}</span>
                )}
              </div>
            </article>
          </Link>
        ))}
      </section>

      {awardWins.length > 0 && (
        <section className="section-grid" style={{ marginTop: 28 }}>
          <h2 className="section-title">获奖记录 ({awardWins.length})</h2>
          {awardWins.map((win, i) => (
            <article key={i} className="field-card">
              <strong>{win.awardName}</strong>
              <p>{win.edition}{win.year ? ` · ${win.year}年` : ""}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
