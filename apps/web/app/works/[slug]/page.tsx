import Link from "next/link";
import { GuideCard } from "@/components/work/guide-card";
import { WorkActions } from "@/components/work/work-actions";
import { getGuideCardForWork, movements, readingPaths, works, awardsData, slugify } from "@/lib/content";

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
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const workBySlug = works.find((w) => w.slug === slug || w.id === slug);
  const work = workBySlug ?? works.find((w) => w.titleDisplayCn === slug || w.titleOriginal === slug) ?? null;

  // Scan award data for work mentions when work not found
  const awardMentions = !work ? (() => {
    const mentions: { awardName: string; edition: string; year: number | null }[] = [];
    awardsData.forEach((award) => {
      award.awardEditions.forEach((ed) => {
        const matched = ed.workItems.find(
          (wi) => slugify(wi.nameCn) === slug || wi.nameCn === slug
        );
        if (matched) {
          mentions.push({ awardName: award.nameCn, edition: ed.awardEditionLabel, year: ed.awardYear });
        }
      });
    });
    return mentions.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  })() : [];

  // Not found at all
  if (!work && !awardMentions.length) {
    return (
      <main className="page">
        <section className="hero">
          <div>
            <p className="eyebrow">作品</p>
            <h1>未找到作品</h1>
            <p className="lede">slug: {slug}</p>
          </div>
        </section>
      </main>
    );
  }

  // Has award mentions but no work in library
  if (!work && awardMentions.length > 0) {
    return (
      <main className="page">
        <section className="hero">
          <div>
            <p className="eyebrow">作品</p>
            <h1>{slug}</h1>
            <p className="lede">暂未收录该作品的详细信息，以下为其获奖记录。</p>
          </div>
        </section>
        <section className="section-grid">
          <h2 className="section-title">获奖记录 ({awardMentions.length})</h2>
          {awardMentions.map((m, i) => (
            <article key={i} className="field-card">
              <strong>{m.awardName}</strong>
              <p>{m.edition}{m.year ? ` · ${m.year}年` : ""}</p>
            </article>
          ))}
        </section>
      </main>
    );
  }

  // Work found — proceed with full detail
  const w = work!;
  const movementIds = w.movementIds as readonly string[];
  const linkedMovements = movements.filter((movement) => movementIds.includes(movement.id));
  const linkedPaths = readingPaths.filter((path) => path.movementId && movementIds.includes(path.movementId));
  const primaryPath = linkedPaths[0];
  const guide = getGuideCardForWork(w.id);
  const movementLabels = linkedMovements.map((movement) => movement.label).join("、") || "待补充";
  const difficulty = guide?.difficultyLevel ?? w.difficultyLevel;
  const entryReady = guide?.beginnerEntry ?? w.beginnerEntry;
  const contentState = guide ? (guide.reviewStatus === "AI_DRAFT" ? "待审核" : guide.reviewStatus) : "导读卡待补充";
  const workId = w.id;
  const positioning = guide?.oneSentencePositioning || `这本书是 ${w.literaryCategory} / ${w.literarySubcategory} 的一个阅读地标。`;

  return (
    <main className="page detail-stack work-detail-page">
      <section className="hero work-detail-hero">
        <div className="work-title-stack">
          <p className="eyebrow">Work Landmark</p>
          <h1>{w.titleDisplayCn}</h1>
          <p className="work-original-title">{w.titleOriginal}</p>
          <div className="work-hero-meta" aria-label="作品基础信息">
            <Link href={`/author/${slugify(w.authorName)}`}>{w.authorName}</Link>
            <span>{w.firstPublishedYear}</span>
            <span>{w.countryOrRegion}</span>
            <span>{w.literaryCategory} / {w.literarySubcategory}</span>
          </div>
          <p className="lede">{positioning}</p>
        </div>
        <aside className="decision-panel work-decision-card" aria-label="作品阅读判断">
          <p className="eyebrow">Reading Decision</p>
          <strong>{entryReady ? "可以作为入口" : "建议按路径进入"}</strong>
          <div className="difficulty-meter" aria-label={`阅读难度 ${difficulty} / 5`}>
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className={index < (difficulty as number) ? "is-active" : ""} />
            ))}
          </div>
          <p>阅读难度 {difficulty} / 5。类型：{w.literaryCategory} / {w.literarySubcategory}。</p>
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
            <p>{(guide as any)?.notSuitableFor || "待确认"}</p>
          </article>
        </div>
      </GuideCard>

      <WorkActions workId={workId} title={w.titleDisplayCn} />

      <GuideCard title="作品身份">
        <dl className="meta-list">
          <div><dt>原名（来源语言，Work 主标题）</dt><dd>{w.titleOriginal}</dd></div>
          <div><dt>中文译名/通行译名</dt><dd>{(w as any).titleTranslatedCn ?? "中文原作，无需译名"}</dd></div>
          <div><dt>作者</dt><dd><Link href={`/author/${slugify(w.authorName)}`}>{w.authorName}</Link></dd></div>
          <div><dt>首版年份</dt><dd>{w.firstPublishedYear}</dd></div>
          <div><dt>国家/地区</dt><dd>{w.countryOrRegion}</dd></div>
          <div><dt>作品类型</dt><dd>{w.workType}</dd></div>
          <div><dt>文学大类</dt><dd>{w.literaryCategory}</dd></div>
          <div><dt>下属子类</dt><dd>{w.literarySubcategory}</dd></div>
          <div><dt>内容状态</dt><dd>{contentState}</dd></div>
        </dl>
      </GuideCard>
      <GuideCard title="导读判断">
        <dl className="meta-list work-reading-list">
          <div><dt>一句话定位</dt><dd>{positioning}</dd></div>
          <div><dt>为什么经典</dt><dd>{guide?.whyClassic || "待确认"}</dd></div>
          <div><dt>为什么值得读</dt><dd>{guide?.whyRead || "待确认"}</dd></div>
          <div><dt>适合谁</dt><dd>{guide?.suitableFor || (entryReady ? "适合作为入口读者" : "适合按路径推进的读者")}</dd></div>
          <div><dt>不适合谁</dt><dd>{(guide as any)?.notSuitableFor || "待确认"}</dd></div>
          <div><dt>阅读难度</dt><dd>{difficulty} / 5</dd></div>
          <div><dt>难度理由</dt><dd>{guide?.difficultyReason || "待确认"}</dd></div>
          <div><dt>阅读前最好知道什么</dt><dd>{(guide as any)?.readingPrerequisites || "待确认"}</dd></div>
          <div><dt>阅读建议</dt><dd>{guide?.readingAdvice || "待确认"}</dd></div>
          <div><dt>是否适合作为入门作品</dt><dd>{entryReady ? "是" : "否"}</dd></div>
        </dl>
      </GuideCard>
      <GuideCard title="地图连接">
        <dl className="meta-list work-map-list">
          <div><dt>所属流派</dt><dd>{linkedMovements.length ? linkedMovements.map((movement) => <Link key={movement.id} className="inline-pill-link" href={`/movements/${movement.id}`}>{movement.label}</Link>) : "待补充"}</dd></div>
          <div><dt>读完后可以通向哪些作品</dt><dd>{formatWorkReferences((guide as any)?.nextWorks)}</dd></div>
          <div><dt>相似但更容易的作品</dt><dd>{formatWorkReferences((guide as any)?.easierAlternatives)}</dd></div>
          <div><dt>相似但更进阶的作品</dt><dd>{formatWorkReferences((guide as any)?.advancedAlternatives)}</dd></div>
          <div><dt>所属阅读路径</dt><dd>{linkedPaths.length ? linkedPaths.map((path) => <Link key={path.id} className="inline-pill-link" href={`/paths/${path.slug}`}>{path.title}</Link>) : "待确认"}</dd></div>
          <div><dt>中文版本区域</dt><dd>待 Edition.titleCn、出版社、译者、年份填充。</dd></div>
        </dl>
      </GuideCard>
    </main>
  );
}

