import { movements, readingPaths, works } from "@bookpath/content";
import { MetricCard } from "../components/metric-card";
import { ScreenShell } from "../components/screen-shell";

export default function MapHomeScreen() {
  return (
    <ScreenShell
      eyebrow="BookPath Mobile"
      title="书籍世界导览地图"
      description="移动端首页先承担地图入口：让读者从流派、作品、路径和奖项进入，而不是从单一书单开始。"
    >
      <MetricCard label="流派节点" value={movements.length} />
      <MetricCard label="作品地标" value={works.length} />
      <MetricCard label="阅读路径" value={readingPaths.length} />
    </ScreenShell>
  );
}
