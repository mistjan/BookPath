import { beginnerWorks } from "@bookpath/core";
import { MetricCard } from "../components/metric-card";
import { ScreenShell } from "../components/screen-shell";

export default function WorksScreen() {
  const entryWorks = beginnerWorks(12);

  return (
    <ScreenShell
      eyebrow="Works"
      title="作品"
      description="作品页后续迁移为移动端地标卡片，突出类型、难度、适合谁和下一步去哪。"
    >
      <MetricCard label="可作为入口的作品" value={entryWorks.length} />
      <MetricCard label="示例作品" value={entryWorks[0]?.titleDisplayCn ?? "待确认"} />
    </ScreenShell>
  );
}
