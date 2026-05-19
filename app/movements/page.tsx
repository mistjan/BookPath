import { MovementCard } from "@/components/cards/movement-card";
import { movements } from "@/lib/content";

export default function MovementsPage() {
  const beginnerReady = movements.filter((movement) => movement.beginnerFriendly.includes("适合")).length;

  return (
    <main className="page">
      <section className="hero movement-map-hero">
        <div>
          <p className="eyebrow">Movement Map / 文学区域</p>
          <h1>流派地图</h1>
          <p className="lede">先选择一片文学区域，再进入作品和阅读路径。BookPath 不把流派当百科词条，而把它当成帮你判断第一本书的地图入口。</p>
          <div className="hero-actions" aria-label="流派地图快捷入口">
            <a className="action-link" href="#movement-regions">查看 5 个流派</a>
            <a className="action-link" href="/paths">按路径进入</a>
          </div>
        </div>
        <aside className="map-panel" aria-label="流派地图概览">
          <p className="eyebrow">Current Atlas</p>
          <strong>{movements.length} 个流派区域</strong>
          <span>{beginnerReady} 个适合新手优先进入</span>
          <span>每个流派 5 本作品、1 条五步路径</span>
          <span>奖项和搜索作为外围入口</span>
        </aside>
      </section>

      <section className="map-guide" aria-label="如何使用流派地图">
        <article>
          <span>01</span>
          <strong>先看新手解释</strong>
          <p>判断这个流派是不是你现在想进入的文学区域。</p>
        </article>
        <article>
          <span>02</span>
          <strong>再看第一本</strong>
          <p>不要从最难经典开始，先让阅读兴趣活下来。</p>
        </article>
        <article>
          <span>03</span>
          <strong>最后走路径</strong>
          <p>按 ENTRY 到 EXPANSION 的顺序理解作品之间的关系。</p>
        </article>
      </section>

      <section id="movement-regions" className="card-grid movement-region-grid" aria-label="流派列表">
        {movements.map((movement) => <MovementCard movement={movement} key={movement.id} />)}
      </section>
    </main>
  );
}
