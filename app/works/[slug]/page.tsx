import Link from "next/link";
import { GuideCard } from "@/components/work/guide-card";
import { getGuideCardForWork, getWork, movements, readingPaths } from "@/lib/content";

function formatWorkReferences(items: readonly unknown[] | undefined) {
  if (!items?.length) return "待确认";
  return items
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        const workRef = item as { titleOriginal?: string; titleTranslatedCn?: string; author?: string };
        return [workRef.titleTranslatedCn, workRef.titleOriginal, workRef.author].filter(Boolean).join(" / ");
      }
      return String(item);
    })
    .filter(Boolean)
    .join("、");
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWork(slug);
  const movementIds = work.movementIds as readonly string[];
  const linkedMovements = movements.filter((movement) => movementIds.includes(movement.id));
  const linkedPaths = readingPaths.filter((path) => path.movementId && movementIds.includes(path.movementId));
  const primaryPath = linkedPaths[0];
  const guide = getGuideCardForWork(work.id);
  const movementLabels = linkedMovements.map((movement) => movement.label).join("、") || "待补充";
  const difficulty = guide?.difficultyLevel ?? work.difficultyLevel;
  const entryReady = guide?.beginnerEntry ?? work.beginnerEntry;
  const contentState = guide ? `${guide.aiGenerated ? "AI 草稿" : "人工内容"} / ${guide.reviewStatus}` : "导读卡待补充";
  const positioning = guide?.oneSentencePositioning || `这本书是 ${work.literaryCategory} / ${work.literarySubcategory} 的一个阅读地标。`;

  return (
    <main className="page detail-stack work-detail-page">
      <section className="hero work-detail-hero">
        <div className="work-title-stack">
          <p className="eyebrow">Work Landmark</p>
          <h1>{work.titleDisplayCn}</h1>
          <p className="work-original-title">{work.titleOriginal}</p>
          <div className="work-hero-meta" aria-label="作品基础信息">
            <span>{work.authorName}</span>
            <span>{work.firstPublishedYear}</span>
            <span>{work.countryOrRegion}</span>
            <span>{work.literaryCategory} / {work.literarySubcategory}</span>
          </div>
          <p className="lede">{positioning}</p>
        </div>
        <aside className="decision-panel work-decision-card" aria-label="作品阅读判断">
          <p className="eyebrow">Reading Decision</p>
          <strong>{entryReady ? "可以作为入口" : "建议按路径进入"}</strong>
          <div className="difficulty-meter" aria-label={`阅读难度 ${difficulty} / 5`}>
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className={index < difficulty ? "is-active" : ""} />
            ))}
          </div>
          <p>阅读难度 {difficulty} / 5。类型：{work.literaryCategory} / {work.literarySubcategory}。</p>
          <div className="work-action-row">
            {primaryPath ? <Link className="action-link" href={`/paths/${primaryPath.slug}`}>查看所属路径</Link> : null}
            {linkedMovements[0] ? <Link className="action-link secondary" href={`/movements/${linkedMovements[0].id}`}>回到流派地图</Link> : null}
          </div>
        </aside>
      </section>

      <section className="work-summary-strip" aria-label="作品重点摘要">
        <article>
          <span>阅读定位</span>
          <strong>{entryReady ? "入口作品" : "路径作品"}</strong>
        </article>
        <article>
          <span>阅读难度</span>
          <strong>{difficulty} / 5</strong>
        </article>
        <article>
          <span>所属流派</span>
          <strong>{movementLabels}</strong>
        </article>
        <article>
          <span>内容状态</span>
          <strong>{contentState}</strong>
        </article>
      </section>

      <GuideCard title="先看结论">
        <div className="work-judgement-grid">
          <article className="work-judgement-primary">
            <span>一句话定位</span>
            <p>{positioning}</p>
          </article>
          <article>
            <span>为什么值得读</span>
            <p>{guide?.whyRead || "待确认"}</p>
          </article>
          <article>
            <span>适合谁</span>
            <p>{guide?.suitableFor || (entryReady ? "适合作为入口读者" : "适合按路径推进的读者")}</p>
          </article>
          <article>
            <span>不适合谁</span>
            <p>{guide?.notSuitableFor || "待确认"}</p>
          </article>
        </div>
      </GuideCard>

      <GuideCard title="作品身份">
        <dl className="meta-list">
          <div><dt>原名（来源语言，Work 主标题）</dt><dd>{work.titleOriginal}</dd></div>
          <div><dt>中文译名/通行译名</dt><dd>{work.titleTranslatedCn ?? "中文原作，无需译名"}</dd></div>
          <div><dt>作者</dt><dd>{work.authorName}</dd></div>
          <div><dt>首版年份</dt><dd>{work.firstPublishedYear}</dd></div>
          <div><dt>国家/地区</dt><dd>{work.countryOrRegion}</dd></div>
          <div><dt>作品类型</dt><dd>{work.workType}</dd></div>
          <div><dt>文学大类</dt><dd>{work.literaryCategory}</dd></div>
          <div><dt>下属子类</dt><dd>{work.literarySubcategory}</dd></div>
          <div><dt>内容状态</dt><dd>{contentState}</dd></div>
        </dl>
      </GuideCard>
      <GuideCard title="导读判断">
        <dl className="meta-list work-reading-list">
          <div><dt>一句话定位</dt><dd>{positioning}</dd></div>
          <div><dt>为什么经典</dt><dd>{guide?.whyClassic || "待确认"}</dd></div>
          <div><dt>为什么值得读</dt><dd>{guide?.whyRead || "待确认"}</dd></div>
          <div><dt>适合谁</dt><dd>{guide?.suitableFor || (entryReady ? "适合作为入口读者" : "适合按路径推进的读者")}</dd></div>
          <div><dt>不适合谁</dt><dd>{guide?.notSuitableFor || "待确认"}</dd></div>
          <div><dt>阅读难度</dt><dd>{difficulty} / 5</dd></div>
          <div><dt>难度理由</dt><dd>{guide?.difficultyReason || "待确认"}</dd></div>
          <div><dt>阅读前最好知道什么</dt><dd>{guide?.readingPrerequisites || "待确认"}</dd></div>
          <div><dt>阅读建议</dt><dd>{guide?.readingAdvice || "待确认"}</dd></div>
          <div><dt>是否适合作为入门作品</dt><dd>{entryReady ? "是" : "否"}</dd></div>
        </dl>
      </GuideCard>
      <GuideCard title="地图连接">
        <dl className="meta-list work-map-list">
          <div><dt>所属流派</dt><dd>{linkedMovements.length ? linkedMovements.map((movement) => <Link key={movement.id} className="inline-pill-link" href={`/movements/${movement.id}`}>{movement.label}</Link>) : "待补充"}</dd></div>
          <div><dt>读完后可以通向哪些作品</dt><dd>{formatWorkReferences(guide?.nextWorks)}</dd></div>
          <div><dt>相似但更容易的作品</dt><dd>{formatWorkReferences(guide?.easierAlternatives)}</dd></div>
          <div><dt>相似但更进阶的作品</dt><dd>{formatWorkReferences(guide?.advancedAlternatives)}</dd></div>
          <div><dt>所属阅读路径</dt><dd>{linkedPaths.length ? linkedPaths.map((path) => <Link key={path.id} className="inline-pill-link" href={`/paths/${path.slug}`}>{path.title}</Link>) : "待确认"}</dd></div>
          <div><dt>中文版本区域</dt><dd>待 Edition.titleCn、出版社、译者、年份填充。</dd></div>
        </dl>
      </GuideCard>
    </main>
  );
}
