import { searchBookPath } from "@bookpath/core";
import { MetricCard } from "../components/metric-card";
import { ScreenShell } from "../components/screen-shell";

export default function SearchScreen() {
  const sample = searchBookPath("现代主义");

  return (
    <ScreenShell
      eyebrow="Search"
      title="搜索"
      description="搜索先复用核心包的本地内容检索，后续再根据移动端输入与结果分组优化。"
    >
      <MetricCard label="现代主义相关流派" value={sample.movements.length} />
      <MetricCard label="现代主义相关作品" value={sample.works.length} />
    </ScreenShell>
  );
}
