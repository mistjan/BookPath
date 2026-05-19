import Link from "next/link";
import { SearchBox } from "@/components/search/search-box";
import { SearchResults } from "@/components/search/search-results";
import { awards, movements, readingPaths, works } from "@/lib/content";
import { countSearchResults, searchBookPath, searchSuggestions, type SearchScope } from "@/lib/search";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeScope(value: string | undefined): SearchScope {
  if (value === "works" || value === "movements" || value === "paths" || value === "awards") return value;
  return "all";
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = firstParam(params.q)?.trim() ?? "";
  const scope = normalizeScope(firstParam(params.scope));
  const allResults = searchBookPath(query, "all");
  const results = searchBookPath(query, scope);
  const resultCount = countSearchResults(results);
  const allResultCount = countSearchResults(allResults);
  const scopes: Array<{ id: SearchScope; label: string; count: number }> = [
    { id: "all", label: "全部", count: allResultCount },
    { id: "works", label: "作品", count: allResults.works.length },
    { id: "movements", label: "流派", count: allResults.movements.length },
    { id: "paths", label: "路径", count: allResults.readingPaths.length },
    { id: "awards", label: "奖项", count: allResults.awards.length }
  ];

  function href(nextScope: SearchScope) {
    const next = new URLSearchParams();
    if (query) next.set("q", query);
    if (nextScope !== "all") next.set("scope", nextScope);
    const qs = next.toString();
    return qs ? `/search?${qs}` : "/search";
  }

  return (
    <main className="page">
      <section className="hero search-hero">
        <div>
          <p className="eyebrow">/search</p>
          <h1>全局发现</h1>
          <p className="lede">从一个词进入书籍世界地图：作品、流派、路径和奖项会分组返回，帮助你判断下一步去哪。</p>
        </div>
        <aside className="map-panel" aria-label="全局索引概览">
          <p className="eyebrow">Search Index</p>
          <strong>{works.length + movements.length + readingPaths.length + awards.length} 个入口</strong>
          <span>作品 {works.length}</span>
          <span>流派 {movements.length}</span>
          <span>路径 {readingPaths.length}</span>
          <span>奖项 {awards.length}</span>
        </aside>
      </section>

      <section className="search-shell" aria-label="全局搜索">
        <SearchBox query={query} scope={scope} />

        <nav className="search-scope-tabs" aria-label="搜索范围">
          {scopes.map((item) => (
            <Link className={scope === item.id ? "scope-tab active" : "scope-tab"} href={href(item.id)} key={item.id}>
              {item.label}<span>{item.count}</span>
            </Link>
          ))}
        </nav>

        {query ? (
          <div className="search-summary">
            <p className="eyebrow">Search Results</p>
            <h2>“{query}” 在当前范围命中 {resultCount} 个入口</h2>
            <Link className="text-link" href="/search">清除搜索</Link>
          </div>
        ) : (
          <div className="search-summary">
            <p className="eyebrow">Start With</p>
            <h2>先输入一个书名、作者、流派或奖项</h2>
            <div className="filter-link-group">
              {searchSuggestions().map((item) => (
                <Link className="filter-link" href={item.href} key={item.label}>{item.label}</Link>
              ))}
            </div>
          </div>
        )}

        {query ? <SearchResults results={results} scope={scope} /> : null}
      </section>
    </main>
  );
}
