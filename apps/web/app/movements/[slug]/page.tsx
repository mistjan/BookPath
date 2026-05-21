import Link from "next/link";
import { PathStepList } from "@/components/path/path-step-list";
import { getMovement, movements, readingPaths, works } from "@/lib/content";

const roleGroups = [
  { id: "ENTRY", label: "入口作品", note: "适合作为第一步，先建立直观感受。" },
  { id: "FOUNDATION", label: "基础作品", note: "补足流派常见写法和基本问题。" },
  { id: "CORE", label: "核心作品", note: "进入这个流派最有代表性的阅读区域。" },
  { id: "ADVANCED", label: "进阶作品", note: "难度更高，建议已有一点阅读经验后再读。" },
  { id: "EXPANSION", label: "扩展作品", note: "用于连接相邻流派、地区或更复杂的问题。" }
] as const;

export function generateStaticParams() {
  return movements.map((movement) => ({ slug: movement.id }));
}

function pathBase(title: string) {
  return title.replace(/文学入门$/, "").replace(/入门$/, "");
}

function findMovementPath(movement: NonNullable<ReturnType<typeof getMovement>>) {
  return readingPaths.find((item) => item.movementId === movement.id)
    ?? readingPaths.find((item) => {
      const base = pathBase(item.title);
      return item.title === movement.label
        || base === movement.label
        || base === movement.shortLabel
        || movement.label === `${base}文学`
        || movement.shortLabel === `${base}文学`;
    })
    ?? null;
}

export default async function MovementDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const movement = getMovement(slug);
  if (!movement) {
    return (
      <main className="page">
        <section className="hero">
          <div>
            <p className="eyebrow">流派</p>
            <h1>未找到流派</h1>
            <p className="lede">slug: {slug}</p>
          </div>
        </section>
      </main>
    );
  }
  const path: any = findMovementPath(movement);
  const entry = movement.guideCards.filter((card) => card.roleInPath === "ENTRY");
  const firstBook = entry[0] ?? movement.guideCards[0] ?? null;

  return (
    <main className="page detail-stack">
      <section className="hero movement-detail-hero">
        <div>
          <p className="eyebrow">{movement.originalName}</p>
          <h1>{movement.label}</h1>
          <p className="lede">{movement.oneLine}</p>
        </div>
        <aside className="decision-panel" aria-label="第一本建议">
          <p className="eyebrow">Start Here</p>
          {firstBook ? (
            <>
              <Link href={`/works/${works.find((w: any) => w.id === firstBook.workId)?.slug || firstBook.workId}`}>
                <strong>第一本先读：{firstBook.title} →</strong>
              </Link>
              <p>{firstBook.suitability}</p>
            </>
          ) : (
            <p style={{ color: "var(--muted)", fontSize: 14 }}>该流派暂无推荐入门作品。</p>
          )}
        </aside>
      </section>

      <section className="movement-brief">
        <article>
          <p className="eyebrow">For Beginners</p>
          <h2>给新手看的说明</h2>
          <p>{(movement as any).beginnerWarning || ""}</p>
        </article>
        <article>
          <p className="eyebrow">Context</p>
          <h2>它为什么出现</h2>
          <p>{movement.whyAppeared}</p>
        </article>
      </section>

      <section className="detail-section">
        <h2>流派档案</h2>
        <dl className="meta-list">
          <div><dt>流派名称</dt><dd>{movement.label}</dd></div>
          <div><dt>原文名</dt><dd>{movement.originalName}</dd></div>
          <div><dt>时期</dt><dd>{movement.period}</dd></div>
          <div><dt>地区</dt><dd>{movement.region}</dd></div>
          <div><dt>代表作品数量</dt><dd>{(movement as any).representativeWorksCount || 0}</dd></div>
          <div><dt>是否适合新手</dt><dd>{(movement as any).beginnerFriendly || ""}</dd></div>
          <div><dt>内容状态</dt><dd>{movement.reviewStatus === "AI_DRAFT" ? "待审核" : movement.reviewStatus}</dd></div>
        </dl>
      </section>

      <section className="section-grid movement-explain-grid">
        <article className="field-card"><strong>精确定义</strong><p>{movement.definitionPrecise}</p></article>
        <article className="field-card"><strong>它反对/改变了什么</strong><p>{movement.reactsAgainst || "待确认"}</p></article>
        <article className="field-card"><strong>核心特征</strong><p>{movement.keyFeatures.length ? movement.keyFeatures.join("；") : "待确认"}</p></article>
        <article className="field-card"><strong>常见误解</strong><p>{movement.misunderstandings.length ? movement.misunderstandings.join("；") : "待确认"}</p></article>
        <article className="field-card"><strong>新手阅读提醒</strong><p>{(movement as any).beginnerWarning || ""}</p></article>
        <article className="field-card"><strong>为什么重要</strong><p>{movement.importance || "待确认"}</p></article>
        <article className="field-card"><strong>相关流派</strong><p>{movement.relatedMovements.length ? movement.relatedMovements.join("、") : "待确认"}</p></article>
      </section>

      <section className="detail-section">
        <h2>作品分组</h2>
        <p>分组依据：ReadingPathStep.roleInPath，对应入口 / 基础 / 核心 / 进阶 / 扩展五个阅读位置。</p>
        <div className="movement-role-grid">
          {roleGroups.map((group) => {
            const cards = movement.guideCards.filter((card) => card.roleInPath === group.id);
            return (
              <article className="movement-role-card" key={group.id}>
                <p className="eyebrow">阅读位置</p>
                <h3>{group.label}</h3>
                <p>{group.note}</p>
                <div className="movement-work-links">
                  {cards.length ? cards.map((card) => (
                    <Link href={`/works/${card.workId}`} key={card.id}>
                      <strong>{card.title}</strong>
                      <span>难度 {card.difficultyLevel} / {(card as any).caution ? "建议暂缓" : "可按路径进入"}</span>
                    </Link>
                  )) : <span className="muted-copy">暂无对应作品</span>}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="reading-path" className="detail-section movement-path-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Reading Path</p>
            <h2>推荐阅读路径</h2>
          </div>
          {path ? <Link className="text-link" href={`/paths/${path.slug}`}>查看完整路径页</Link> : null}
        </div>
        {path ? (
          <PathStepList path={path as any} variant="timeline" />
        ) : (
          <div className="empty-state">
            <strong>暂无对应 reading path JSON</strong>
            <p>当前流派没有匹配到独立阅读路径，因此不会回退显示其它流派的路径。可以先通过上方五类作品分组进入作品详情。</p>
          </div>
        )}
      </section>
    </main>
  );
}
