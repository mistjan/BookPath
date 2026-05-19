import Link from "next/link";

const gateways = [
  { title: "不知道读什么？", href: "/start", text: "按文学入门、外国文学、中国现当代、科幻、推理随机看一些入口卡片。" },
  { title: "认识一个流派", href: "/movements", text: "进入文学流派地图，先理解一片区域，再选入口作品。" },
  { title: "推荐阅读路径", href: "/paths", text: "按入门、体裁、地区和奖项查看阅读路线，先判断目标读者和第一本。" },
  { title: "从奖项发现书", href: "/awards", text: "看懂奖项倾向、局限和它对新手的参考价值。" },
  { title: "适合新手的经典", href: "/beginner", text: "只看难度 2 及以下、适合作为入口的作品。" }
];

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">BookPath / 首页导览</p>
          <h1>书径</h1>
          <p className="lede">不是再给你一份书单，而是帮你看懂书单。</p>
          <p className="lede">从文学流派、经典作品、奖项榜单和阅读路径开始，找到真正适合你的下一本书。</p>
        </div>
        <div className="map-visual" aria-label="书籍世界导览地图示意">
          <div className="map-node">文学流派</div>
          <div className="map-node">经典作品</div>
          <div className="map-node">阅读路径</div>
        </div>
      </section>

      <section className="gateway-grid" aria-label="首页导览入口">
        {gateways.map((gateway) => (
          <Link className="gateway-card" href={gateway.href} key={gateway.title}>
            <strong>{gateway.title}</strong>
            <p>{gateway.text}</p>
            <span>进入</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
