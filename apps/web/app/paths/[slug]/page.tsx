import { PathStepList } from "@/components/path/path-step-list";
import { getReadingPath } from "@/lib/content";

export default async function PathDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = getReadingPath(slug);
  if (!path) {
    return (
      <main className="page">
        <section className="hero">
          <div>
            <p className="eyebrow">路径</p>
            <h1>未找到路径</h1>
            <p className="lede">slug: {slug}</p>
          </div>
        </section>
      </main>
    );
  }
  const firstStep = path.steps[0];
  return (
    <main className="page detail-stack">
      <section className="hero path-detail-hero">
        <div>
          <p className="eyebrow">/paths/{path.slug}</p>
          <h1>{path.title}</h1>
          <p className="lede">{path.intro}</p>
        </div>
        <aside className="decision-panel" aria-label="路径入口摘要">
          <p className="eyebrow">Start Here</p>
          <strong>{firstStep ? firstStep.title : "待确认"}</strong>
          <p>{path.targetReader}</p>
        </aside>
      </section>
      <section className="detail-section path-overview-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Path Brief</p>
            <h2>路径说明</h2>
          </div>
          <span className="path-status">内容状态：{path.reviewStatus === "AI_DRAFT" ? "待审核" : path.reviewStatus}</span>
        </div>
        <p className="path-description">{path.description}</p>
        <div className="path-overview-grid">
          <article>
            <span>路径标题</span>
            <strong>{path.title}</strong>
          </article>
          <article>
            <span>目标读者</span>
            <strong>{path.targetReader}</strong>
          </article>
          <article>
            <span>难度范围</span>
            <strong>{path.difficultyRange}</strong>
            <small>起始难度 {path.difficultyStart} / 结束难度 {path.difficultyEnd}</small>
          </article>
          <article>
            <span>路径类型</span>
            <strong>{path.type}</strong>
          </article>
          <article>
            <span>作品数量</span>
            <strong>{path.workCount}</strong>
          </article>
        </div>
      </section>
      <section className="detail-section path-step-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Step By Step</p>
            <h2>路径步骤</h2>
          </div>
          <p className="muted-copy">每一步都标明定位、难度、是否可跳过和替代作品；推荐理由可展开查看。</p>
        </div>
        <PathStepList path={path as any} variant="timeline" />
      </section>
    </main>
  );
}
