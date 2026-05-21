"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { awardsData, works, slugify } from "@/lib/content";

export default function AwardDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [expandedCycle, setExpandedCycle] = useState<string | null>(null);

  const award = awardsData.find((a) => a.slug === slug);

  if (!award) {
    return (
      <main className="page">
        <section className="hero">
          <div>
            <p className="eyebrow">奖项</p>
            <h1>未找到奖项</h1>
            <p className="lede">slug: {slug}</p>
          </div>
        </section>
      </main>
    );
  }

  const sortedEditions = [...award.awardEditions].sort(
    (a, b) => (b.awardYear ?? 0) - (a.awardYear ?? 0)
  );

  const toggleEdition = (cycle: string) => {
    setExpandedCycle((prev) => (prev === cycle ? null : cycle));
  };

  return (
    <main className="page detail-stack">
      <section className="hero">
        <div>
          <p className="eyebrow">{award.nameOriginal}</p>
          <h1>{award.nameCn}</h1>
          <div className="work-hero-meta">
            <span>{award.awardType}</span>
            <span>{award.countryOrRegion}</span>
            <span>始于 {award.foundedYear}</span>
            <span>{award.awardEditions.length} 届</span>
          </div>
        </div>
      </section>

      {award.scopeNote && (
        <section className="note-card">
          <p>{award.scopeNote}</p>
        </section>
      )}

      {award.whoShouldRead && (
        <section className="section-grid">
          <article className="field-card">
            <strong>适合什么人阅读</strong>
            <p>{award.whoShouldRead}</p>
          </article>
        </section>
      )}

      {award.limitationNote && (
        <section className="section-grid">
          <article className="field-card">
            <strong>局限与争议</strong>
            <p>{award.limitationNote}</p>
          </article>
        </section>
      )}

      <section className="section-grid">
        <h2 className="section-title">历届列表</h2>
        {sortedEditions.map((ed) => {
          const isExpanded = expandedCycle === ed.awardCycle;
          const hasData =
            ed.workItems.length > 0 ||
            ed.authorItems.length > 0 ||
            !!ed.evaluationNote;

          return (
            <div key={ed.awardCycle + ed.awardYear} className="edition-block">
              <button
                onClick={() => toggleEdition(ed.awardCycle)}
                className="edition-header"
              >
                <div className="edition-header-left">
                  <strong>{ed.awardEditionLabel}</strong>
                  <span className="text-muted">{ed.awardYear ?? ed.awardCycle}</span>
                </div>
                <div className="edition-header-right">
                  <span className="edition-status">{ed.evaluationNote ? "已整理" : "待补充"}</span>
                  <span className="expand-arrow">{isExpanded ? "▲" : "▼"}</span>
                </div>
              </button>

              {isExpanded && (
                <div className="edition-detail">
                  {ed.evaluationNote && (
                    <div className="evaluation-card">
                      <strong>简评</strong>
                      <p>{ed.evaluationNote}</p>
                    </div>
                  )}

                  {ed.authorItems.length > 0 && (
                    <div className="winner-section">
                      <h3>获奖作者</h3>
                      {ed.authorItems.map((item, i) => (
                        <Link
                          key={i}
                          href={`/author/${slugify(item.nameCn)}`}
                          className="winner-card"
                        >
                          <strong>{item.nameCn} →</strong>
                          {item.nameOriginal && <span className="text-muted">{item.nameOriginal}</span>}
                          {item.country && <span className="winner-country">{item.country}</span>}
                        </Link>
                      ))}
                    </div>
                  )}

                  {ed.workItems.length > 0 && (
                    <div className="winner-section">
                      <h3>获奖作品</h3>
                      {ed.workItems.map((item, i) => {
                        const matched = works.find(
                          (w) => w.titleDisplayCn === item.nameCn || w.titleOriginal === item.nameCn
                        );
                        const workSlug = matched?.slug ?? slugify(item.nameCn);
                        return (
                          <Link
                            key={i}
                            href={`/works/${workSlug}`}
                            className="winner-card"
                          >
                            <strong>{item.nameCn} →</strong>
                            {item.nameOriginal && <span className="text-muted">{item.nameOriginal}</span>}
                            {item.country && <span className="winner-country">{item.country}</span>}
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {!hasData && (
                    <div className="placeholder-card">
                      <p>待补充内容</p>
                      <span className="text-muted">该届获奖作品/作家信息尚待整理。</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}
