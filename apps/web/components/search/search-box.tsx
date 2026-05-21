import type { SearchScope } from "@/lib/search";

export function SearchBox({ query, scope }: { query: string; scope: SearchScope }) {
  return (
    <form className="global-search-box" action="/search">
      <label htmlFor="global-search">关键词搜索</label>
      <div className="global-search-row">
        <input id="global-search" name="q" defaultValue={query} placeholder="搜索作品、作者、流派、路径、奖项" />
        <select aria-label="搜索范围" name="scope" defaultValue={scope}>
          <option value="all">全部</option>
          <option value="works">作品</option>
          <option value="movements">流派</option>
          <option value="paths">路径</option>
          <option value="awards">奖项</option>
        </select>
        <button type="submit">搜索</button>
      </div>
    </form>
  );
}
