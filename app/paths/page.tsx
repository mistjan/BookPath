import Link from "next/link";
import { PathCard } from "@/components/cards/path-card";
import { readingPaths } from "@/lib/content";
import { firstPathByType, pathGroups, pathsByType } from "@bookpath/core";

export default function PathsPage() {
  const firstBeginnerPath = firstPathByType("BEGINNER") ?? readingPaths[0];

  return (
    <main className="page">
      <section className="hero path-index-hero">
        <div>
          <p className="eyebrow">/paths</p>
          <h1>阅读路径</h1>
          <p className="lede">路径页从真实 reading paths 出发：按入门、体裁、地区和奖项分组，先判断目标读者和第一本，再进入完整步骤。</p>
        </div>
        <aside className="map-panel" aria-label="路径索引概览">
          <p className="eyebrow">Path Atlas</p>
          <strong>{readingPaths.length} 条阅读路径</strong>
          {pathGroups.map((group) => (
            <span key={group.id}>{group.label} {pathsByType(group.id).length}</span>
          ))}
        </aside>
      </section>

      <nav className="path-type-nav" aria-label="路径类型导航">
        {pathGroups.map((group) => (
          <a href={`#${group.id.toLowerCase()}`} key={group.id}>
            <strong>{group.label}</strong>
            <span>{pathsByType(group.id).length} 条</span>
          </a>
        ))}
      </nav>

      <section className="path-start-panel" aria-label="第一条入门路径">
        <div>
          <p className="eyebrow">Start With</p>
          <h2>{firstBeginnerPath.title}</h2>
          <p>{firstBeginnerPath.description}</p>
        </div>
        <dl className="meta-list">
          <div><dt>目标读者</dt><dd>{firstBeginnerPath.targetReader}</dd></div>
          <div><dt>难度区间</dt><dd>{firstBeginnerPath.difficultyRange}</dd></div>
          <div><dt>第一本从哪里开始</dt><dd>{firstBeginnerPath.steps[0]?.title ?? "待确认"}</dd></div>
        </dl>
        <Link className="text-link" href={`/paths/${firstBeginnerPath.slug}`}>进入这条路径</Link>
      </section>

      <div className="path-group-stack">
        {pathGroups.map((group) => {
          const paths = pathsByType(group.id);
          return (
            <section className="path-group-section" id={group.id.toLowerCase()} key={group.id}>
              <div className="path-group-heading">
                <div>
                  <p className="eyebrow">{group.id}</p>
                  <h2>{group.label}</h2>
                  <p>{group.description}</p>
                </div>
                <span>{paths.length} 条路径</span>
              </div>
              <div className="path-discovery-grid">
                {paths.map((path) => <PathCard path={path} key={path.id} />)}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
