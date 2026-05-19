import Link from "next/link";
import { WorkCard } from "@/components/cards/work-card";
import { works } from "@/lib/content";
import { filterWorks, workFilterFacets } from "@bookpath/core";

const PAGE_SIZE = 36;

type WorksSearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function WorksPage({ searchParams }: { searchParams: WorksSearchParams }) {
  const params = await searchParams;
  const query = firstParam(params.q)?.trim() ?? "";
  const category = firstParam(params.category) ?? "";
  const subcategory = firstParam(params.subcategory) ?? "";
  const difficulty = firstParam(params.difficulty) ?? "";
  const region = firstParam(params.region) ?? "";
  const movement = firstParam(params.movement) ?? "";
  const beginner = firstParam(params.beginner) ?? "";
  const page = Math.max(1, Number(firstParam(params.page) ?? "1") || 1);
  const filteredWorks = filterWorks({ query, category, subcategory, difficulty, region, movement, beginner });
  const pageCount = Math.max(1, Math.ceil(filteredWorks.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleWorks = filteredWorks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const { categoryCount, categoryEntries, subcategoryEntries, regionEntries, movementEntries } = workFilterFacets();

  function href(overrides: Record<string, string | number | undefined>) {
    const next = new URLSearchParams();
    for (const [key, value] of Object.entries({ q: query, category, subcategory, difficulty, region, movement, beginner, page: currentPage, ...overrides })) {
      if (value !== undefined && value !== "" && value !== 0) next.set(key, String(value));
    }
    const qs = next.toString();
    return qs ? `/works?${qs}` : "/works";
  }

  return (
    <main className="page">
      <section className="hero work-index-hero">
        <div>
          <p className="eyebrow">/works</p>
          <h1>作品地标</h1>
          <p className="lede">这里不是书名墙，而是书籍世界地图上的地标。每张卡先告诉你类型、难度、相关流派和它是否适合作为入口。</p>
        </div>
        <aside className="map-panel" aria-label="作品库概览">
          <p className="eyebrow">Work Atlas</p>
          <strong>{works.length} 个作品地标</strong>
          <span>{categoryCount} 个文学子类</span>
          <span>当前显示 {filteredWorks.length} 个结果</span>
          <span>类型按四大类 / 下属子类标注</span>
          <span>难度和流派用于判断下一本</span>
        </aside>
      </section>
      <section className="work-index-layout" aria-label="作品地图索引">
        <aside className="work-filter-panel" aria-label="作品筛选">
          <form className="work-search" action="/works">
            <label htmlFor="work-search">搜索</label>
            <input id="work-search" name="q" defaultValue={query} placeholder="书名、作者、流派、国家" />
            <button type="submit">搜索作品</button>
          </form>

          <details open>
            <summary>按作品类型筛选：文学大类 / 下属子类</summary>
            <div className="filter-link-group">
              <Link className={!category && !subcategory ? "filter-link active" : "filter-link"} href={href({ category: "", subcategory: "", page: 1 })}>全部类型</Link>
              {categoryEntries.map(([label, count]) => (
                <Link className={category === label ? "filter-link active" : "filter-link"} href={href({ category: label, subcategory: "", page: 1 })} key={label}>{label}<span>{count}</span></Link>
              ))}
              {subcategoryEntries.map(([label, count]) => (
                <Link className={subcategory === label ? "filter-link active" : "filter-link"} href={href({ subcategory: label, category: "", page: 1 })} key={label}>{label}<span>{count}</span></Link>
              ))}
            </div>
          </details>

          <details>
            <summary>按流派筛选</summary>
            <div className="filter-link-group">
              <Link className={!movement ? "filter-link active" : "filter-link"} href={href({ movement: "", page: 1 })}>全部流派</Link>
              {movementEntries.map(([id, label, count]) => (
                <Link className={movement === id ? "filter-link active" : "filter-link"} href={href({ movement: id, page: 1 })} key={id}>{label}<span>{count}</span></Link>
              ))}
            </div>
          </details>

          <details>
            <summary>按难度筛选</summary>
            <div className="filter-link-group">
              <Link className={!difficulty ? "filter-link active" : "filter-link"} href={href({ difficulty: "", page: 1 })}>全部难度</Link>
              {[1, 2, 3, 4, 5].map((level) => (
                <Link className={difficulty === String(level) ? "filter-link active" : "filter-link"} href={href({ difficulty: level, page: 1 })} key={level}>难度 {level}</Link>
              ))}
            </div>
          </details>

          <details>
            <summary>按国家/地区筛选</summary>
            <div className="filter-link-group">
              <Link className={!region ? "filter-link active" : "filter-link"} href={href({ region: "", page: 1 })}>全部地区</Link>
              {regionEntries.map(([label, count]) => (
                <Link className={region === label ? "filter-link active" : "filter-link"} href={href({ region: label, page: 1 })} key={label}>{label}<span>{count}</span></Link>
              ))}
            </div>
          </details>

          <details>
            <summary>按是否适合新手筛选</summary>
            <div className="filter-link-group">
              <Link className={!beginner ? "filter-link active" : "filter-link"} href={href({ beginner: "", page: 1 })}>全部</Link>
              <Link className={beginner === "yes" ? "filter-link active" : "filter-link"} href={href({ beginner: "yes", page: 1 })}>适合入口</Link>
              <Link className={beginner === "no" ? "filter-link active" : "filter-link"} href={href({ beginner: "no", page: 1 })}>建议按路径进入</Link>
            </div>
          </details>
        </aside>

        <div className="work-results">
          <div className="work-results-bar">
            <div>
              <p className="eyebrow">Map Results</p>
              <h2>{filteredWorks.length} 个作品地标</h2>
            </div>
            <Link className="text-link" href="/works">清除筛选</Link>
          </div>

          <section className="card-grid work-grid" aria-label="作品列表">
            {visibleWorks.map((work) => <WorkCard work={work} key={work.id} />)}
          </section>

          {visibleWorks.length === 0 ? (
            <div className="empty-state">
              <strong>没有找到匹配作品</strong>
              <p>可以减少筛选条件，或回到全部作品地标。</p>
              <Link className="text-link" href="/works">查看全部作品</Link>
            </div>
          ) : null}

          <nav className="pagination" aria-label="作品分页">
            <Link aria-disabled={currentPage === 1} className={currentPage === 1 ? "page-link disabled" : "page-link"} href={href({ page: currentPage - 1 })}>上一页</Link>
            <span>第 {currentPage} / {pageCount} 页，每页 {PAGE_SIZE} 个</span>
            <Link aria-disabled={currentPage === pageCount} className={currentPage === pageCount ? "page-link disabled" : "page-link"} href={href({ page: currentPage + 1 })}>下一页</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
