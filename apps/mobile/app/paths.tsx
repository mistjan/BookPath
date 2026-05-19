import { readingPaths } from "@bookpath/content";
import { MetricCard } from "../components/metric-card";
import { ScreenShell } from "../components/screen-shell";

export default function PathsScreen() {
  return (
    <ScreenShell
      eyebrow="Paths"
      title="阅读路径"
      description="路径页后续按移动端步骤流重做，重点回答第一本从哪里开始、为什么下一步读它。"
    >
      <MetricCard label="路径数量" value={readingPaths.length} />
      <MetricCard label="首条路径" value={readingPaths[0]?.title ?? "待导入"} />
    </ScreenShell>
  );
}
