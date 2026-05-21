import Link from "next/link";
import { movementName } from "@/lib/content";
import type { SearchScope, searchBookPath } from "@/lib/search";

type SearchResultsData = ReturnType<typeof searchBookPath>;

function ResultSection({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <section className="search-result-section">
      <div className="search-section-heading">
        <h2>{title}</h2>
        <span>{count}</span>
      </div>
      {count ? <div className="search-result-list">{children}</div> : <p className="muted-copy">没有命中。</p>}
    </section>
  );
}

export function SearchResults({ results, scope = "all" }: { results: SearchResultsData; scope?: SearchScope }) {
  const showWorks = scope === "all" || scope === "works";
  const showMovements = scope === "all" || scope === "movements";
  const showPaths = scope === "all" || scope === "paths";
  const showAwards = scope === "all" || scope === "awards";

  return (
    <div className={scope === "all" ? "search-results" : "search-results scoped"}>
      {showWorks ? (
        <ResultSection title="作品结果" count={results.works.length}>
          {results.works.slice(0, 12).map((work) => (
            <Link className="search-result-row" href={`/works/${work.id}`} key={work.id}>
              <strong>{work.titleDisplayCn}</strong>
              <span>{work.titleOriginal} / {work.authorName}</span>
              <small>{work.literaryCategory} / {work.literarySubcategory} / 难度 {work.difficultyLevel}</small>
            </Link>
          ))}
        </ResultSection>
      ) : null}

      {showMovements ? (
        <ResultSection title="流派结果" count={results.movements.length}>
          {results.movements.slice(0, 12).map((movement) => (
            <Link className="search-result-row" href={`/movements/${movement.id}`} key={movement.id}>
              <strong>{movement.label}</strong>
              <span>{movement.originalName} / {movement.region} / {movement.period}</span>
              <small>{movement.oneLine}</small>
            </Link>
          ))}
        </ResultSection>
      ) : null}

      {showPaths ? (
        <ResultSection title="路径结果" count={results.readingPaths.length}>
          {results.readingPaths.slice(0, 12).map((path) => (
            <Link className="search-result-row" href={`/paths/${path.slug}`} key={path.id}>
              <strong>{path.title}</strong>
              <span>{path.type} / {path.difficultyRange} / {path.workCount} 部作品</span>
              <small>{path.movementId ? `关联流派：${movementName(path.movementId)}` : path.targetReader}</small>
            </Link>
          ))}
        </ResultSection>
      ) : null}

      {showAwards ? (
        <ResultSection title="奖项结果" count={results.awards.length}>
          {results.awards.map((award) => (
            <Link className="search-result-row" href={`/awards/${award.id}`} key={award.id}>
              <strong>{award.titleCn}</strong>
              <span>{award.countryOrRegion} / {award.awardType}</span>
              <small>{award.beginnerValue}</small>
            </Link>
          ))}
        </ResultSection>
      ) : null}
    </div>
  );
}
