import { useMemo, useState } from "react";
import { Link } from "expo-router";
import { FlatList, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { works } from "@bookpath/content";
import { slugify } from "@bookpath/core";
import { colors, spacing, typography } from "@bookpath/design-tokens";

const allRegions = [...new Set(works.filter(w => w.countryOrRegion !== "待补充").flatMap(w => w.countryOrRegion.split("/").map(x => x.trim())))].sort();

function authorEra(w: typeof works[number]): string {
  if (!w.firstPublishedYear) return "";
  const y = parseInt(String(w.firstPublishedYear));
  if (isNaN(y)) return "";
  if (y < 1500) return "古代";
  if (y < 1900) return "近代";
  return "现代";
}

const eraOpts = ["古代", "近代", "现代"];

// Dark mode: dynamic colors
  export default function AuthorsScreen() {
  const [query, setQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [regionFilter, setRegionFilter] = useState("");
  const [eraFilter, setEraFilter] = useState("");

  const authorMap = useMemo(() => {
    const map = new Map<string, { works: (typeof works[number])[]; ids: string; count: number; region: string; era: string }>();
    for (const w of works) {
      const key = slugify(w.authorName);
      if (!map.has(key)) map.set(key, { works: [], ids: key, count: 0, region: w.countryOrRegion !== "待补充" ? w.countryOrRegion : "", era: "" });
      const entry = map.get(key)!;
      entry.works.push(w);
      entry.count++;
      entry.era = entry.era || authorEra(w);
    }
    return [...map.entries()].map(([, v]) => v).sort((a, b) => b.count - a.count);
  }, []);

  const filtered = useMemo(() => {
    let list = authorMap;
    const q = query.trim();
    if (q) list = list.filter(a => a.works[0].authorName.includes(q) || a.ids.includes(q));
    if (regionFilter) list = list.filter(a => (a.region || '').split('/').map(x => x.trim()).includes(regionFilter));
    if (eraFilter) list = list.filter(a => a.era === eraFilter);
    return list;
  }, [query, regionFilter, eraFilter, authorMap]);
  const active = !!regionFilter || !!eraFilter;

  return (
    <View style={s.screen}>
      <View style={s.searchWrap}>
        <TextInput style={s.input} placeholder="搜索作家..." placeholderTextColor={colors.muted}
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
              <Text style={s.panelLabel}>国家/地区</Text>
              <View style={s.chipRow}>
                {["全部", ...allRegions].map(r => (
                  <Pressable key={r} accessibilityRole="button" onPress={() => setRegionFilter(r === "全部" ? "" : r)} style={[s.chip, regionFilter === r && s.chipOn]}>
                    <Text style={[s.chipText, regionFilter === r && s.chipTextOn]}>{r}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View style={s.filterCol}>
              <Text style={s.panelLabel}>年代</Text>
              <View style={s.chipRow}>
                {["全部", ...eraOpts].map(e => (
                  <Pressable key={e} accessibilityRole="button" onPress={() => setEraFilter(e === "全部" ? "" : e)} style={[s.chip, eraFilter === e && s.chipOn]}>
                    <Text style={[s.chipText, eraFilter === e && s.chipTextOn]}>{e}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
          {active && <Pressable onPress={() => { setRegionFilter(""); setEraFilter(""); }}><Text style={s.clearLink}>清除筛选</Text></Pressable>}
        </View>
      )}

      <FlatList data={filtered} keyExtractor={i => i.ids} contentContainerStyle={s.list}
        windowSize={10} maxToRenderPerBatch={7} removeClippedSubviews={Platform.OS === "android"}
        renderItem={({ item }) => {
          const author = item.works[0];
          const diffAvg = Math.round(item.works.reduce((s, w) => s + w.difficultyLevel, 0) / item.works.length);
          return (
            <Link href={`/author/${item.ids}` as any} asChild>
              <Pressable accessibilityRole="link" style={s.card}>
                <Text style={s.name}>{author.authorName}</Text>
                <View style={s.metaRow}>
                  <Text style={s.meta}>{item.count} 部</Text>
                  {item.region ? <Text style={s.meta}>{item.region}</Text> : null}
                  <Text style={s.meta}>难度 {diffAvg}/5</Text>
                  {item.era ? <Text style={s.meta}>{item.era}</Text> : null}
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
  list: { gap: 8, padding: spacing.pageX, paddingBottom: 40 },
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
  name: { color: colors.ink, fontSize: 18, fontWeight: "800", fontFamily: typography.serif },
  metaRow: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
  meta: { color: colors.muted, fontSize: 12, fontWeight: "600" },
});
