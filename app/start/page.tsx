import Link from "next/link";
import { startCategories } from "@/lib/start-categories";

export default function StartPage() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Start / 不知道读什么</p>
          <h1>不知道读什么？</h1>
          <p className="lede">先按兴趣方向随便看几张入口卡。这里不是搜索页，而是帮你从“我没想法”变成“我可以先试这类”。</p>
        </div>
      </section>

      <section className="start-grid" aria-label="入门分类随机卡片">
        {startCategories.map((group) => (
          <article className="start-group" key={group.title}>
            <h2>{group.title}</h2>
            <p>{group.intro}</p>
            <div className="start-card-stack" aria-label={`${group.title} 随机卡片`}>
              {group.cards.map((card) => (
                card.kind === "work" ? (
                  <Link className="start-work-card" href={card.href} key={card.title}>
                    <strong>{card.title}</strong>
                    <span>{card.meta}</span>
                    <p>{card.description}</p>
                  </Link>
                ) : (
                  <div className="start-work-card empty-boundary" key={card.title}>
                    <strong>{card.title}</strong>
                    <span>{card.meta}</span>
                    <p>{card.description}</p>
                  </div>
                )
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
