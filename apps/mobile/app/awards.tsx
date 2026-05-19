import { awards } from "@bookpath/content";
import { MetricCard } from "../components/metric-card";
import { ScreenShell } from "../components/screen-shell";

export default function AwardsScreen() {
  return (
    <ScreenShell
      eyebrow="Awards"
      title="奖项"
      description="奖项页只服务阅读判断：名称、国家、类型和参考价值，避免变成获奖名单堆叠。"
    >
      <MetricCard label="奖项占位" value={awards.length} />
      <MetricCard label="页面目标" value="判断参考价值" />
    </ScreenShell>
  );
}
