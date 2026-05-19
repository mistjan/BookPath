import { getAward, works } from "@/lib/content";

export default async function AwardDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const award = getAward(slug);
  const beginnerWorks = works.filter((work) => work.beginnerEntry).slice(0, 5);
  return (
    <main className="page detail-stack">
      <section className="hero">
        <div>
          <p className="eyebrow">{award.originalName}</p>
          <h1>{award.titleCn}</h1>
          <p className="lede">奖项详情页要说明它偏爱什么，也说明它不代表什么。</p>
        </div>
      </section>
      <section className="section-grid">
        <article className="field-card"><strong>奖项简介</strong><p>{award.originalName}，{award.countryOrRegion}，{award.awardType}。</p></article>
        <article className="field-card"><strong>奖项倾向</strong><p>待填充选择倾向，不能把奖项结果当作唯一文学判断。</p></article>
        <article className="field-card"><strong>对新手的价值</strong><p>{award.beginnerValue}</p></article>
        <article className="field-card"><strong>局限与争议</strong><p>奖项只作为发现线索，不能代替阅读路径。</p></article>
        <article className="field-card"><strong>获奖作品</strong><p>待 AwardItem.status = WINNER 数据填充。</p></article>
        <article className="field-card"><strong>入围作品</strong><p>待 SHORTLIST / FINALIST 数据填充。</p></article>
        <article className="field-card"><strong>已有中文版</strong><p>按 Edition.titleCn 与出版状态展示。</p></article>
        <article className="field-card"><strong>暂无中文版</strong><p>降低中文读者入口噪音。</p></article>
        <article className="field-card"><strong>适合新手的作品</strong><p>{beginnerWorks.map((work) => work.titleDisplayCn).join("、")}</p></article>
      </section>
    </main>
  );
}
