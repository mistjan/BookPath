"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { works } from "@/lib/content";

type Mode = "menu" | "directed" | "result";

interface FilterState {
  category: string;
  subcategory: string;
  difficulty: string;
}

// Categories with their subcategory options
const categoryOptions: Record<string, string[]> = {
  "小说": ["不限", "现实主义", "科幻小说", "推理小说", "文学小说", "魔幻现实主义", "历史小说", "反乌托邦小说", "实验小说", "成长小说"],
  "诗歌": [],
  "戏剧": [],
  "非虚构": [],
};

const difficultyOptions = [
  { value: "", label: "不限" },
  { value: "1,2", label: "轻松入门" },
  { value: "3", label: "适中" },
  { value: "4,5", label: "挑战" },
];

function shufflePick<T>(items: readonly T[], count: number, seen: Set<string>, keyFn: (item: T) => string): T[] {
  const available = items.filter((item) => !seen.has(keyFn(item)));
  if (available.length === 0) return items.slice(0, count);
  const pool = [...available];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

export default function StartPage() {
  // Mode A: browse (random picks)
  // Mode B: directed (decision flow)
  const [mode, setMode] = useState<Mode>("menu");
  const [filters, setFilters] = useState<FilterState>({ category: "", subcategory: "", difficulty: "" });
  const [step, setStep] = useState(1);
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<readonly (typeof works[number])[]>([]);

  const pickResults = (cat: string, sub: string, diff: string) => {
    const filtered = (works as readonly (typeof works[number])[]).filter((w) => {
      if (cat === "诗歌" && (w.literaryCategory as string) !== "诗歌") return false;
      if (cat === "戏剧" && (w.literaryCategory as string) !== "戏剧") return false;
      if (cat === "非虚构" && (w.workType as string) !== "非虚构" && (w.literaryCategory as string) !== "非虚构") return false;
      if (cat === "小说") {
        if (w.literaryCategory !== "小说") return false;
        if (sub && sub !== "不限" && w.literarySubcategory !== sub) return false;
      }
      if (diff) {
        const [min, max] = diff.split(",").map(Number);
        if (w.difficultyLevel < min || w.difficultyLevel > max) return false;
      }
      return true;
    });
    const picked = shufflePick(filtered, 5, seenIds, (w) => w.id);
    setResults(picked);
    setSeenIds((prev) => {
      const next = new Set(prev);
      picked.forEach((w) => next.add(w.id));
      return next;
    });
    setMode("result");
  };

  const reshuffle = () => pickResults(filters.category, filters.subcategory, filters.difficulty);

  const reset = () => {
    setMode("menu");
    setFilters({ category: "", subcategory: "", difficulty: "" });
    setStep(1);
    setResults([]);
  };

  // Mode A: random browse
  const randomPicks = useMemo(() => {
    const pool = [...works];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, 5);
  }, []);

  return (
    <main className="page">
      <section className="hero" style={{ gridTemplateColumns: "1fr", minHeight: 200 }}>
        <div>
          <p className="eyebrow">Start / 不知道读什么</p>
          <h1>不知道读什么？</h1>
          <p className="lede">
            {mode === "menu" && "随便逛逛或者按方向找——先判断自己想要什么，再选择具体的书。"}
            {mode === "directed" && "回答几个简单问题，帮你缩小范围。"}
            {mode === "result" && "以下是为你推荐的作品——不满意可以换一批。"}
          </p>
        </div>
      </section>

      {/* Mode: Menu */}
      {mode === "menu" && (
        <section className="section-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <button
            onClick={() => {
              // Mode A: browse - show random picks immediately
              pickResults("", "", "");
            }}
            className="action-link"
            style={{ minHeight: 120, justifyContent: "center", textAlign: "center", cursor: "pointer", border: "1px solid var(--line)", background: "var(--paper-strong)", color: "var(--ink)", fontWeight: 800, fontSize: 18, display: "grid", gap: 8, textDecoration: "none" }}
          >
            随便看看
            <span style={{ fontWeight: 400, fontSize: 14, color: "var(--muted)" }}>全库随机抽 5 部</span>
          </button>
          <button
            onClick={() => setMode("directed")}
            className="action-link"
            style={{ minHeight: 120, justifyContent: "center", textAlign: "center", cursor: "pointer", border: "1px solid var(--accent)", background: "var(--accent)", color: "var(--paper-strong)", fontWeight: 800, fontSize: 18, display: "grid", gap: 8, textDecoration: "none" }}
          >
            按方向找
            <span style={{ fontWeight: 400, fontSize: 14, color: "var(--paper-strong)", opacity: 0.8 }}>通过几步选择缩小范围</span>
          </button>
        </section>
      )}

      {/* Mode: Directed - Step 1: Category */}
      {mode === "directed" && step === 1 && (
        <section className="section-grid">
          <h2 className="section-title">第一步：想读什么类型？</h2>
          <div className="filter-link-group" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
            {["小说", "诗歌", "戏剧", "非虚构"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilters((f) => ({ ...f, category: cat, subcategory: "" }));
                  if (cat === "诗歌" || cat === "戏剧" || cat === "非虚构") {
                    // Skip to difficulty pick for non-fiction categories
                    setStep(3);
                  } else {
                    setStep(2);
                  }
                }}
                style={{
                  padding: "12px 24px",
                  border: "1px solid var(--line)",
                  background: "var(--paper-strong)",
                  color: "var(--ink)",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 16,
                  font: "inherit",
                  minWidth: 120,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Mode: Directed - Step 2: Subcategory (for 小说 only) */}
      {mode === "directed" && step === 2 && filters.category === "小说" && (
        <section className="section-grid">
          <h2 className="section-title">第二步：什么子类型？</h2>
          <p className="text-muted" style={{ marginBottom: 8 }}>选一个子类型，或选「不限」看全部小说。</p>
          <div className="filter-link-group" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {categoryOptions["小说"].map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  setFilters((f) => ({ ...f, subcategory: sub === "不限" ? "" : sub }));
                  setStep(3);
                }}
                style={{
                  padding: "10px 20px",
                  border: "1px solid var(--line)",
                  background: "var(--paper-strong)",
                  color: "var(--ink)",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 14,
                  font: "inherit",
                }}
              >
                {sub}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Mode: Directed - Step 3: Difficulty */}
      {mode === "directed" && step === 3 && (
        <section className="section-grid">
          <h2 className="section-title">
            {filters.category === "小说" ? "第三步：想要什么难度？" : "第二步：想要什么难度？"}
          </h2>
          <div className="filter-link-group" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
            {difficultyOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  setFilters((f) => ({ ...f, difficulty: opt.value }));
                  pickResults(filters.category, filters.subcategory, opt.value);
                }}
                style={{
                  padding: "12px 24px",
                  border: "1px solid var(--line)",
                  background: "var(--paper-strong)",
                  color: "var(--ink)",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 15,
                  font: "inherit",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Mode: Results */}
      {mode === "result" && (
        <>
          {results.length === 0 ? (
            <div className="empty-state">
              <strong>没有找到匹配作品</strong>
              <p>可以减少筛选条件试试。</p>
            </div>
          ) : (
            <section className="start-grid" aria-label="推荐作品">
              {results.map((work) => (
                <Link key={work.id} href={`/works/${work.slug}`} className="start-work-card">
                  <strong>{work.titleDisplayCn}</strong>
                  <span>
                    {work.literaryCategory}
                    {work.literarySubcategory && work.literarySubcategory !== work.literaryCategory
                      ? ` / ${work.literarySubcategory}`
                      : ""}{" "}
                    · 难度 {work.difficultyLevel}
                  </span>
                  <p>
                    {work.authorName}
                    {work.countryOrRegion !== "待补充" ? ` · ${work.countryOrRegion}` : ""}
                    {work.firstPublishedYear ? ` · ${work.firstPublishedYear}` : ""}
                  </p>
                </Link>
              ))}
            </section>
          )}

          <div className="hero-actions" style={{ justifyContent: "center", marginTop: 28 }}>
            <button onClick={reshuffle} className="action-link" style={{ cursor: "pointer", font: "inherit" }}>
              换一批
            </button>
            <button onClick={reset} className="action-link secondary" style={{ cursor: "pointer", font: "inherit" }}>
              重新选择
            </button>
          </div>
        </>
      )}

      {/* Mode A: Show random picks directly as a section */}
      {mode === "menu" && (
        <section className="section-grid" style={{ marginTop: 28 }}>
          <h2 className="section-title">随便看看</h2>
          <p className="text-muted">以下是从全库中随机抽取的 5 部作品——如果你愿意，这就是开始。</p>
          {randomPicks.map((work) => (
            <Link key={work.id} href={`/works/${work.slug}`} className="start-work-card" style={{ marginTop: 8 }}>
              <strong>{work.titleDisplayCn}</strong>
              <span>
                {work.literaryCategory}
                {work.literarySubcategory && work.literarySubcategory !== work.literaryCategory
                  ? ` / ${work.literarySubcategory}`
                  : ""}{" "}
                · 难度 {work.difficultyLevel}
              </span>
              <p>
                {work.authorName}
                {work.countryOrRegion !== "待补充" ? ` · ${work.countryOrRegion}` : ""}
              </p>
            </Link>
          ))}
          <button
            onClick={() => pickResults("", "", "")}
            className="action-link"
            style={{ cursor: "pointer", font: "inherit", alignSelf: "center", marginTop: 12 }}
          >
            换一批
          </button>
        </section>
      )}
    </main>
  );
}
