import { movements } from "@bookpath/content";
import { MetricCard } from "../components/metric-card";
import { ScreenShell } from "../components/screen-shell";

export default function MovementsScreen() {
  return (
    <ScreenShell
      eyebrow="Movements"
      title="流派"
      description="这里后续迁移流派地图与流派详情入口，列表只显示名称和解释摘要。"
    >
      <MetricCard label="当前流派数量" value={movements.length} />
      <MetricCard label="第一批重点" value={movements[0]?.label ?? "待导入"} />
    </ScreenShell>
  );
}
