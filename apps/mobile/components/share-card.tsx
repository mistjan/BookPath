import { forwardRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { typography } from "@bookpath/design-tokens";
import QRCode from "react-native-qrcode-svg";

interface StepInfo {
  title: string;
  author?: string;
  difficulty?: number;
  reason?: string;
}

interface ShareCardProps {
  type: "work" | "movement" | "path";
  title: string;
  subtitle?: string;
  meta1?: string;
  meta2?: string;
  meta3?: string;
  meta4?: string;
  positioning?: string;
  steps?: StepInfo[];
  cell1Label?: string;
  cell1Value?: string;
  cell2Label?: string;
  cell2Value?: string;
  cell3Label?: string;
  cell3Value?: string;
  cell4Label?: string;
  cell4Value?: string;
}

const diffLabel = (l?: number) => {
  if (!l) return "";
  if (l <= 2) return "较易";
  if (l === 3) return "适中";
  return "较难";
};

export const ShareCard = forwardRef<View, ShareCardProps>(function ShareCard(
  { type, title, subtitle, meta1, meta2, meta3, meta4, positioning, steps, cell1Label, cell1Value, cell2Label, cell2Value, cell3Label, cell3Value, cell4Label, cell4Value },
  ref
) {
  const shareUrl = `https://bookpath.app/${type}/${encodeURIComponent(title)}`;
  const isPath = type === "path";
  const showSteps = isPath && steps && steps.length > 0;
  const displaySteps = showSteps ? steps!.slice(0, 5) : [];

  return (
    <View ref={ref} style={s.card}>
      {/* Brand */}
      <View style={s.brandRow}>
        <View style={s.dot} />
        <Text style={s.brand}>书径 · BookPath</Text>
      </View>

      {/* Type badge */}
      <View style={s.typeBadge}>
        <Text style={s.typeText}>
          {type === "work" ? "📖 作品" : type === "movement" ? "🏷️ 流派" : "🗺️ 阅读路径"}
        </Text>
      </View>

      {/* Title */}
      <Text style={s.title}>{title}</Text>
      {subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}

      {/* Meta chips */}
      <View style={s.chipRow}>
        {meta1 ? <View style={s.chip}><Text style={s.chipText}>{meta1}</Text></View> : null}
        {meta2 ? <View style={s.chip}><Text style={s.chipText}>{meta2}</Text></View> : null}
        {meta3 ? <View style={s.chip}><Text style={s.chipText}>{meta3}</Text></View> : null}
        {meta4 ? <View style={s.chip}><Text style={s.chipText}>{meta4}</Text></View> : null}
      </View>

      {/* Path description */}
      {showSteps && positioning ? <Text style={s.pathDesc}>{positioning}</Text> : null}

      {/* Path steps list */}
      {showSteps ? (
        <View style={s.stepsContainer}>
          {displaySteps.map((step, i) => (
            <View key={i} style={s.stepBlock}>
              <View style={s.stepNum}>
                <Text style={s.stepNumText}>{i + 1}</Text>
              </View>
              <View style={s.stepContent}>
                <Text style={s.stepTitle}>{step.title}</Text>
                <Text style={s.stepAuthor}>{step.author || ""} · {diffLabel(step.difficulty)} {step.difficulty ? `难度 ${step.difficulty}` : ""}</Text>
              </View>
              {i < displaySteps.length - 1 ? <Text style={s.stepArrow}>↓</Text> : null}
            </View>
          ))}
          {steps!.length > 5 ? <Text style={s.stepMore}>…还有 {steps!.length - 5} 步</Text> : null}
        </View>
      ) : null}

      {/* 2×2 Grid (for non-path) */}
      {!showSteps && (cell1Label || cell2Label || cell3Label || cell4Label) ? (
        <View style={s.grid}>
          {cell1Label ? <View style={s.gridCell}><Text style={s.gridLabel}>{cell1Label}</Text><Text style={s.gridValue} numberOfLines={3}>{cell1Value || ""}</Text></View> : null}
          {cell2Label ? <View style={s.gridCell}><Text style={s.gridLabel}>{cell2Label}</Text><Text style={s.gridValue} numberOfLines={3}>{cell2Value || ""}</Text></View> : null}
          {cell3Label ? <View style={s.gridCell}><Text style={s.gridLabel}>{cell3Label}</Text><Text style={s.gridValue} numberOfLines={3}>{cell3Value || ""}</Text></View> : null}
          {cell4Label ? <View style={s.gridCell}><Text style={s.gridLabel}>{cell4Label}</Text><Text style={s.gridValue} numberOfLines={3}>{cell4Value || ""}</Text></View> : null}
        </View>
      ) : null}

      {/* Positioning */}
      {positioning && !showSteps ? <Text style={s.positioning}>{positioning}</Text> : null}

      {/* Divider */}
      <View style={s.divider} />

      {/* Footer: QR */}
      <View style={s.footer}>
        <View style={s.qrWrap}>
          <QRCode value={shareUrl} size={52} backgroundColor="#fffaf1" color="#231f18" />
        </View>
        <View style={s.footerText}>
          <Text style={s.footerTitle}>书径</Text>
          <Text style={s.footerDesc}>不是再给你一份书单{'\n'}而是帮你看懂书单</Text>
        </View>
      </View>
    </View>
  );
});

const s = StyleSheet.create({
  card: { width: 340, padding: 20, backgroundColor: "#fffaf1", borderColor: "#d7c7b4", borderWidth: 1, gap: 10 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#7b3f2d" },
  brand: { color: "#7b3f2d", fontSize: 10, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase" },
  typeBadge: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, backgroundColor: "#7b3f2d" },
  typeText: { color: "#fffaf1", fontSize: 11, fontWeight: "800" },
  title: { color: "#231f18", fontSize: 20, fontWeight: "900", fontFamily: typography.serif, lineHeight: 24 },
  subtitle: { color: "#6f6254", fontSize: 11, lineHeight: 16, marginTop: -6 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  chip: { paddingHorizontal: 8, paddingVertical: 3, backgroundColor: "#7b3f2d" },
  chipText: { color: "#fffaf1", fontSize: 10, fontWeight: "700" },
  positioning: { color: "#231f18", fontSize: 12, lineHeight: 18, fontStyle: "italic" },
  // Steps list
  pathDesc: { color: "#6f6254", fontSize: 11, lineHeight: 16, fontStyle: "italic" },
  stepsContainer: { gap: 2, marginTop: 2 },
  stepBlock: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
  stepNum: { width: 22, height: 22, borderRadius: 11, backgroundColor: "#7b3f2d", justifyContent: "center", alignItems: "center", marginTop: 2 },
  stepNumText: { color: "#fffaf1", fontSize: 11, fontWeight: "800" },
  stepContent: { flex: 1, paddingBottom: 6, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#d7c7b4" },
  stepTitle: { color: "#231f18", fontSize: 13, fontWeight: "700", lineHeight: 18 },
  stepAuthor: { color: "#6f6254", fontSize: 11, lineHeight: 16 },
  stepArrow: { color: "#7b3f2d", fontSize: 16, textAlign: "center", marginLeft: 2 },
  stepMore: { color: "#6f6254", fontSize: 11, textAlign: "center", marginTop: 2 },
  // Grid
  grid: { flexDirection: "row", flexWrap: "wrap", borderColor: "#d7c7b4", borderWidth: 1, marginTop: 2 },
  gridCell: { width: "50%", padding: 10, borderRightColor: "#d7c7b4", borderBottomColor: "#d7c7b4", borderRightWidth: StyleSheet.hairlineWidth, borderBottomWidth: StyleSheet.hairlineWidth, gap: 4 },
  gridLabel: { color: "#7b3f2d", fontSize: 9, fontWeight: "800", letterSpacing: 0.5, textTransform: "uppercase" },
  gridValue: { color: "#231f18", fontSize: 11, lineHeight: 16 },
  divider: { height: 1, backgroundColor: "#d7c7b4", marginTop: 4 },
  footer: { flexDirection: "row", gap: 12, alignItems: "center" },
  qrWrap: { width: 52, height: 52, justifyContent: "center", alignItems: "center" },
  footerText: { flex: 1 },
  footerTitle: { color: "#231f18", fontSize: 15, fontWeight: "900", fontFamily: "NotoSerifSC" },
  footerDesc: { color: "#6f6254", fontSize: 10, lineHeight: 15, marginTop: 2 },
});
