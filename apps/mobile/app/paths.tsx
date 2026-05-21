import { useMemo, useState } from "react";
import { Link } from "expo-router";
import { FlatList, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { readingPaths } from "@bookpath/content";
import { colors, spacing, typography } from "@bookpath/design-tokens";

const typeOpts = ["入门", "体裁", "奖项", "地区", "写作"];
const typeLabelMap: Record<string, string> = { "BEGINNER": "入门", "GENRE": "体裁", "AWARD": "奖项", "REGION": "地区", "WRITING": "写作" };
const allPaths = (readingPaths as unknown as any[]);
const diffOpts = ["1-2", "3", "4-5"];

// Dark mode: dynamic colors
  export default function PathsScreen() {
  const [query, setQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
  const [diffFilter, setDiffFilter] = useState("");

  const typeMap: Record<string, string> = { "入门": "BEGINNER", "体裁": "GENRE", "奖项": "AWARD", "地区": "REGION", "写作": "WRITING" };

  const filtered = useMemo(() => {
    let list = query.trim() ? allPaths.filter((p: any) => [p.title, p.description || ""].join(" ").includes(query.trim())) : allPaths;
    if (typeFilter) list = list.filter((p: any) => (p.type || "").includes(typeMap[typeFilter] || typeFilter));
    if (diffFilter) list = list.filter((p: any) => (p.difficultyRange || "").includes(diffFilter));
    return list;
  }, [query, typeFilter, diffFilter]);
  const active = !!typeFilter || !!diffFilter;

  return (
    <View style={s.screen}>
      <View style={s.searchWrap}>
        <TextInput style={s.input} placeholder="搜索路径..." placeholderTextColor={colors.muted}
          value={query} onChangeText={setQuery} autoCapitalize="none" autoCorrect={false} />
        <Pressable onPress={() => setShowFilter(p => !p)} style={s.filterBtn}>
          <Text style={[s.filterBtnText, showFilter && { color: colors.ink }]}>{showFilter ? "▲" : "▼"}</Text>
        </Pressable>
        {query.length > 0 && <Pressable accessibilityLabel="清除搜索" onPress={() => setQuery("")}><Text style={s.clearText}>✕</Text></Pressable>}
      </View>

      {showFilter && (
        <View style={s.panel}>
          <View style={s.filterRow}>
            <View style={s.filterCol}>
              <Text style={s.panelLabel}>类型</Text>
              <View style={s.chipRow}>
                {["全部", ...typeOpts].map(t => (
                  <Pressable key={t} accessibilityRole="button" onPress={() => setTypeFilter(t === "全部" ? "" : t)} style={[s.chip, typeFilter === t && s.chipOn]}>
                    <Text style={[s.chipText, typeFilter === t && s.chipTextOn]}>{t}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View style={s.filterCol}>
              <Text style={s.panelLabel}>难度</Text>
              <View style={s.chipRow}>
                {["全部", ...diffOpts].map(d => (
                  <Pressable key={d} accessibilityRole="button" onPress={() => setDiffFilter(d === "全部" ? "" : d)} style={[s.chip, diffFilter === d && s.chipOn]}>
                    <Text style={[s.chipText, diffFilter === d && s.chipTextOn]}>{d}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
          {active && <Pressable onPress={() => { setTypeFilter(""); setDiffFilter(""); }}><Text style={s.clearLink}>清除筛选</Text></Pressable>}
        </View>
      )}

      <FlatList data={filtered} keyExtractor={(i: any) => i.slug || i.id} contentContainerStyle={s.list}
        windowSize={10} maxToRenderPerBatch={7} removeClippedSubviews={Platform.OS === "android"}
        renderItem={({ item }) => {
          const p = item as any;
          const t = p.type || "";
          const desc = p.description || "";
          const steps = p.steps?.length || 0;
          return (
            <Link href={`/path/${p.slug || p.id}` as any} asChild>
              <Pressable accessibilityRole="link" style={s.card}>
                <View style={s.topRow}>
                  <Text style={s.typeTag}>{typeLabelMap[t] || t || "阅读"}</Text>
                  <Text style={s.steps}>{steps} 步</Text>
                </View>
                <Text style={s.title}>{p.title}</Text>
                <Text style={s.desc} numberOfLines={2}>{desc}</Text>
                <View style={s.footer}>
                  <Text style={s.diff}>难度 {p.difficultyRange || "适中"}</Text>
                  <Text style={s.arrow}>→</Text>
                </View>
              </Pressable>
            </Link>
          );
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  searchWrap: { flexDirection: "row", alignItems: "center", gap: 8, margin: spacing.pageX, marginBottom: 8 },
  input: { flex: 1, height: 42, paddingHorizontal: 14, fontSize: 15, color: colors.ink, backgroundColor: colors.paperStrong, borderColor: colors.line, borderWidth: 1, borderRadius: 6 },
  filterBtn: { padding: 8 }, filterBtnText: { color: colors.accent, fontSize: 14, fontWeight: "800" },
  clearText: { color: colors.muted, fontSize: 16, padding: 6 },
  list: { gap: 10, padding: spacing.pageX, paddingBottom: 40 },
  panel: { gap: 8, paddingHorizontal: spacing.pageX, paddingVertical: 12, borderBottomColor: colors.line, borderBottomWidth: StyleSheet.hairlineWidth },
  filterRow: { flexDirection: "row", gap: 12 },
  filterCol: { flex: 1 },
  panelLabel: { fontSize: 11, fontWeight: "700", color: colors.muted, letterSpacing: 0.5, textTransform: "uppercase" },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  chip: { paddingHorizontal: 10, paddingVertical: 5, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paperStrong },
  chipOn: { borderColor: colors.accent, backgroundColor: "#ead2be" },
  chipText: { color: colors.muted, fontSize: 12, fontWeight: "600" },
  chipTextOn: { color: colors.ink, fontWeight: "800" },
  clearLink: { color: colors.accent, fontSize: 12, fontWeight: "700", alignSelf: "flex-end", paddingVertical: 4 },
  card: { gap: 6, padding: spacing.cardPadding, backgroundColor: colors.paperStrong, borderColor: colors.line, borderWidth: 1 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  typeTag: { color: colors.accent, fontSize: 10, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase" },
  steps: { color: colors.green, fontSize: 12, fontWeight: "600" },
  title: { color: colors.ink, fontSize: 17, fontWeight: "800", fontFamily: typography.serif },
  desc: { color: colors.muted, fontSize: 13, lineHeight: 19 },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4, paddingTop: 10, borderTopColor: colors.line, borderTopWidth: StyleSheet.hairlineWidth },
  diff: { color: colors.muted, fontSize: 12, fontWeight: "600" },
  arrow: { color: colors.accent, fontSize: 16 },
});
