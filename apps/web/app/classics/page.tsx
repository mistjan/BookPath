import Link from "next/link";
import { works, movements } from "@/lib/content";

export default function ClassicsHubPage() {
  const chineseClassic = movements.find((m) => (m.id as string) === "chinese-classics");
  const westernClassic = movements.find((m) => (m.id as string) === "western-classics");
  const japaneseClassic = movements.find((m) => (m.id as string) === "japanese-classics");

  const chineseWorks = works.filter((w) => (w.movementIds as readonly string[])?.includes("chinese-classics"));
  const westernWorks = works.filter((w) => (w.movementIds as readonly string[])?.includes("western-classics"));
  const japaneseWorks = works.filter((w) => (w.movementIds as readonly string[])?.includes("japanese-classics"));

  return (
    <main className="page">
      <section className="hero" style={{ gridTemplateColumns: "1fr", minHeight: 300 }}>
        <div>
          <p className="eyebrow">Classics / 古典文学</p>
          <h1>古典文学</h1>
          <p className="lede">
            从荷马到红楼梦、从诗经到源氏物语——古典文学是人类最早的故事，也是后来一切文学的源头。
            这里按入门难度分三级推荐，帮你找到第一本。
          </p>
        </div>
      </section>

      {/* Chinese Classics */}
      <section style={{ marginBottom: 40 }}>
        <div className="section-heading-row">
          <h2 className="section-title">中国古典文学</h2>
          <Link className="text-link" href="/movements/chinese-classics">
            查看全部 → {chineseClassic ? `${chineseWorks.length} 部` : ""}
          </Link>
        </div>

        <TierSection
          beginner={[
            { title: "西游记", slug: "西游记", diff: "难度 2", why: "故事性最强，孙悟空打妖怪老少皆宜" },
            { title: "唐诗三百首", slug: "唐诗三百首", diff: "难度 2", why: "每天一首，不需要从头读到尾" },
            { title: "论语", slug: "论语", diff: "难度 2", why: "篇幅最短，一本语录随时可以翻开" },
          ]}
          intermediate={[
            { title: "红楼梦", slug: "红楼梦", diff: "难度 3", why: "中国古典小说的最高峰" },
            { title: "史记", slug: "史记", diff: "难度 3", why: "先读列传——项羽、荆轲——比小说精彩" },
            { title: "道德经", slug: "道德经", diff: "难度 2", why: "五千字讲透中国人的哲学" },
          ]}
          advanced={[
            { title: "文心雕龙", slug: "文心雕龙", diff: "难度 4", why: "文学理论，需要文言基础" },
            { title: "楚辞", slug: "楚辞", diff: "难度 3", why: "浪漫主义源头，需要注释" },
          ]}
        />
      </section>

      {/* Western Classics */}
      <section style={{ marginBottom: 40 }}>
        <div className="section-heading-row">
          <h2 className="section-title">西方古典文学</h2>
          <Link className="text-link" href="/movements/western-classics">
            查看全部 → {westernClassic ? `${westernWorks.length} 部` : ""}
          </Link>
        </div>

        <TierSection
          beginner={[
            { title: "罗密欧与朱丽叶", slug: "罗密欧与朱丽叶", diff: "难度 2", why: "故事谁都知道，语言又美" },
            { title: "奥德赛", slug: "奥德赛", diff: "难度 3", why: "冒险故事——独眼巨人、海妖塞壬" },
            { title: "莎士比亚悲剧选", slug: "莎士比亚悲剧选", diff: "难度 3", why: "选有注释的译本" },
          ]}
          intermediate={[
            { title: "伊利亚特", slug: "伊利亚特", diff: "难度 3", why: "阿喀琉斯的愤怒——西方文学从此开始" },
            { title: "神曲", slug: "神曲", diff: "难度 4", why: "地狱九圈影响了所有人对死后世界的想象" },
            { title: "堂吉诃德", slug: "堂吉诃德", diff: "难度 3", why: "现代小说的起点——风车大战" },
          ]}
          advanced={[
            { title: "失乐园", slug: "失乐园", diff: "难度 4", why: "弥尔顿的史诗，撒旦是最迷人的角色" },
            { title: "浮士德", slug: "浮士德", diff: "难度 4", why: "歌德用60年写成的诗剧" },
          ]}
        />
      </section>

      {/* Japanese Classics */}
      <section style={{ marginBottom: 40 }}>
        <div className="section-heading-row">
          <h2 className="section-title">日本古典文学</h2>
          <Link className="text-link" href="/movements/japanese-classics">
            查看全部 → {japaneseClassic ? `${japaneseWorks.length} 部` : ""}
          </Link>
        </div>

        <TierSection
          beginner={[
            { title: "枕草子", slug: "枕草子", diff: "难度 1", why: "一千年前的女孩日记，每段几十字" },
            { title: "竹取物语", slug: "竹取物语", diff: "难度 1", why: "日本最古老的童话——辉夜姬" },
            { title: "方丈记", slug: "方丈记", diff: "难度 1", why: "不到100页，世事无常中的平静" },
          ]}
          intermediate={[
            { title: "源氏物语", slug: "源氏物语", diff: "难度 3", why: "世界上第一部长篇小说" },
            { title: "平家物语", slug: "平家物语", diff: "难度 3", why: "祇园精舍钟声响——日本文学的经典开篇" },
          ]}
          advanced={[
            { title: "雨月物语", slug: "雨月物语", diff: "难度 3", why: "幽玄之美的鬼故事" },
          ]}
        />
      </section>
    </main>
  );
}

function TierSection({ beginner, intermediate, advanced }: {
  beginner: { title: string; slug: string; diff: string; why: string }[];
  intermediate: { title: string; slug: string; diff: string; why: string }[];
  advanced: { title: string; slug: string; diff: string; why: string }[];
}) {
  return (
    <div className="start-grid" style={{ marginTop: 12 }}>
      <TierCard title="🟢 新手从这里开始" items={beginner} color="var(--green)" />
      <TierCard title="🟡 进阶阅读" items={intermediate} color="var(--accent)" />
      <TierCard title="🔴 深度阅读" items={advanced} color="var(--muted)" />
    </div>
  );
}

function TierCard({ title, items, color }: {
  title: string; items: { title: string; slug: string; diff: string; why: string }[]; color: string;
}) {
  return (
    <article className="start-group" style={{ minHeight: 200 }}>
      <h3 style={{ fontSize: 18, fontWeight: 800, color }}>{title}</h3>
      <div className="start-card-stack">
        {items.length === 0 ? (
          <div className="start-work-card empty-boundary">
            <strong style={{ color: "var(--muted)" }}>暂无推荐</strong>
          </div>
        ) : items.map((item) => (
          <Link key={item.slug} href={`/works/${item.slug}`} className="start-work-card">
            <strong>{item.title}</strong>
            <span>{item.diff}</span>
            <p>{item.why}</p>
          </Link>
        ))}
      </div>
    </article>
  );
}
