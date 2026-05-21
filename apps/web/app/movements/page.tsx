import { MovementCard } from "@/components/cards/movement-card";
import { movements } from "@/lib/content";

const groups: Record<string, string[]> = {
  "古典文学": [
    "chinese-classics", "pre-qin-lit", "four-great-novels", "chinese-poetry",
    "western-classics", "greek-epic", "greek-tragedy", "shakespeare", "renaissance-lit",
    "japanese-classics",
  ],
  "现当代文学": [
    "realism", "naturalism", "critical-realism", "modernism",
    "postmodernism", "magical-realism", "latin-american-boom",
    "modernism-intro", "stream-of-consciousness",
    "chinese-modern-lit", "chinese-contemporary-lit", "chinese-avant-garde", "roots-seeking-lit",
    "new-realism", "scar-lit",
  ],
  "思想与主题": [
    "existentialism", "absurdism", "black-humor", "feminist-lit",
    "postcolonial-lit", "dystopian-lit", "utopian-lit",
    "philosophical-novels", "psychological-novels",
  ],
  "类型文学": [
    "sci-fi", "cyberpunk", "fantasy", "horror", "gothic",
    "mystery", "hardboiled", "crime", "social-mystery", "honkaku",
    "children-lit", "climate-fiction",
  ],
  "地域文学": [
    "japanese-modern-lit", "japanese-private-novel", "japanese-decadent",
    "beat-generation", "dirty-realism",
    "migrant-lit", "trauma-lit", "holocaust-lit",
    "city-lit", "rural-lit",
  ],
  "入门与奖项": [
    "beginner-intro", "short-story", "poetry-intro", "drama-intro",
    "bildungsroman", "family-saga", "war-lit",
    "nobel-intro", "booker-intro", "maodun-intro", "lu-xun-lit-intro",
    "akutagawa-intro", "naoki-intro", "hugo-award-intro",
  ],
  "其他": [],
};

const groupOrder = ["古典文学", "现当代文学", "思想与主题", "类型文学", "地域文学", "入门与奖项", "其他"];

function groupMovements() {
  const assigned = new Set<string>();
  const result: Record<string, (typeof movements[number])[]> = {};
  for (const g of groupOrder) result[g] = [];

  for (const m of movements) {
    let placed = false;
    for (const g of groupOrder) {
      if (groups[g]?.includes(m.id)) {
        result[g].push(m);
        assigned.add(m.id);
        placed = true;
        break;
      }
    }
    if (!placed) result["其他"].push(m);
  }
  return result;
}

export default function MovementsPage() {
  const grouped = groupMovements();
  const beginnerReady = movements.filter((movement) => (movement as any).beginnerFriendly?.includes("适合")).length;

  return (
    <main className="page">
      <section className="hero movement-map-hero">
        <div>
          <p className="eyebrow">Movement Map / 文学区域</p>
          <h1>流派地图</h1>
          <p className="lede">先选择一片文学区域，再进入作品和阅读路径。BookPath 不把流派当百科词条，而把它当成帮你判断第一本书的地图入口。</p>
        </div>
        <aside className="map-panel" aria-label="流派地图概览">
          <p className="eyebrow">Current Atlas</p>
          <strong>{movements.length} 个流派区域</strong>
          <span>分 {groupOrder.length} 大类展示</span>
          <span>{beginnerReady} 个适合新手优先进入</span>
        </aside>
      </section>

      {groupOrder.map((groupName) => {
        const items = grouped[groupName];
        if (!items.length) return null;
        return (
          <section key={groupName} style={{ marginBottom: 32 }}>
            <h2 className="section-title" style={{ fontSize: 26, marginBottom: 12 }}>
              {groupName === "其他" ? "其他流派" : groupName}
              <span style={{ fontSize: 14, fontWeight: 400, color: "var(--muted)", marginLeft: 10 }}>
                {items.length} 个
              </span>
            </h2>
            <div className="card-grid movement-region-grid" aria-label={groupName}>
              {items.map((movement) => <MovementCard movement={movement as any} key={movement.id} />)}
            </div>
          </section>
        );
      })}
    </main>
  );
}
