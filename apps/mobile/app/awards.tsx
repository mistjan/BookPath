import { useMemo, useState } from "react";
import { Link } from "expo-router";
import { FlatList, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { awardsData } from "@bookpath/content";
import { colors, spacing, typography } from "@bookpath/design-tokens";

const catGroup: Record<string, string[]> = {
  "文学奖": ["文学综合奖","国际文学奖","国际小说奖","英语长篇小说奖","翻译文学奖","小说奖","小说奖 / 评论界奖项","长篇小说奖","纯文学新人奖","综合文学奖","大众文学奖","法语小说奖","法语文学奖","中文文学奖","作家终身成就类文学奖","书店员评选奖"],
  "科幻/奇幻奖": ["科幻 / 奇幻奖","科幻小说奖","奇幻文学奖"],
  "推理/犯罪奖": ["推理 / 犯罪文学奖","犯罪小说奖","传统推理奖","推理小说新人奖","推理文学奖"],
  "非虚构/其他": ["非虚构图书奖","历史写作奖","科学图书奖","戏剧文学奖","年度图书推荐 / 榜单","图书奖 / 阅读推广奖"],
};
const catNames = Object.keys(catGroup);
const regionMap: Record<string, string> = {
  "中国大陆": "中国", "中国大陆 / 北京": "中国",
  "英国": "英国", "英国 / 世界范围": "英国", "英国 / 犯罪小说领域": "英国", "英国 / 科学写作": "英国", "英国 / 科幻文学": "英国", "英国 / 英语世界": "英国",
  "美国": "美国", "美国 / 推理小说领域": "美国", "美国 / 推理犯罪领域": "美国", "美国 / 科幻奇幻领域": "美国", "美国 / 科幻文学": "美国",
  "日本": "日本", "日本 / 推理领域": "日本", "法国": "法国",
};
const regionNames = [...new Set(awardsData.flatMap(a => (regionMap[a.countryOrRegion] || a.countryOrRegion).split("/").map(x => x.trim())))].sort();

// Dark mode: dynamic colors
  export default function AwardsScreen() {
  const [query, setQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [catFilter, setCatFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  const filtered = useMemo(() => {
    let list = [...awardsData];
    const q = query.trim();
    if (q) list = list.filter(a => [a.nameCn, a.nameOriginal, a.awardType, a.countryOrRegion].join(" ").includes(q));
    if (catFilter) { const cats = catGroup[catFilter] || []; list = list.filter(a => cats.includes(a.awardType)); }
    if (regionFilter) { list = list.filter(a => (regionMap[a.countryOrRegion] || a.countryOrRegion).split('/').map(x => x.trim()).some(r => r === regionFilter || (regionFilter === '世界' && (r === '国际' || r === '世界范围' || r.includes('世界'))))); }
    return list;
  }, [query, catFilter, regionFilter]);
  const active = !!catFilter || !!regionFilter;

  return (
    <View style={s.screen}>
      <View style={s.searchWrap}>
        <TextInput style={s.input} placeholder="搜索奖项..." placeholderTextColor={colors.muted}
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
              <Text style={s.panelLabel}>类别</Text>
              <View style={s.chipRow}>
                {["全部", ...catNames].map(c => (
                  <Pressable key={c} accessibilityRole="button" onPress={() => setCatFilter(c === "全部" ? "" : c)} style={[s.chip, catFilter === c && s.chipOn]}>
                    <Text style={[s.chipText, catFilter === c && s.chipTextOn]}>{c}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View style={s.filterCol}>
              <Text style={s.panelLabel}>国家/地区</Text>
              <View style={s.chipRow}>
                {["全部", ...regionNames].map(r => (
                  <Pressable key={r} accessibilityRole="button" onPress={() => setRegionFilter(r === "全部" ? "" : r)} style={[s.chip, regionFilter === r && s.chipOn]}>
                    <Text style={[s.chipText, regionFilter === r && s.chipTextOn]}>{r}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
          {active && <Pressable onPress={() => { setCatFilter(""); setRegionFilter(""); }}><Text style={s.clearLink}>清除筛选</Text></Pressable>}
        </View>
      )}

      <FlatList data={filtered} keyExtractor={i => i.slug} contentContainerStyle={s.list}
        windowSize={10} maxToRenderPerBatch={7} removeClippedSubviews={Platform.OS === "android"}
        renderItem={({ item }) => (
          <Link href={`/award/${item.slug}` as any} asChild>
            <Pressable accessibilityRole="link" style={s.card}>
              <View style={s.catRow}>
                <Text style={s.type}>{catNames.find(g => catGroup[g].includes(item.awardType)) || item.awardType}</Text>
                <Text style={s.region}>{regionMap[item.countryOrRegion] || item.countryOrRegion}</Text>
              </View>
              <Text style={s.title}>{item.nameCn}</Text>
              {item.nameOriginal && <Text style={s.orig}>{item.nameOriginal}</Text>}
              <Text style={s.editions}>{item.awardEditions.length} 届 · 始于 {item.foundedYear}</Text>
              {item.scopeNote && <Text style={s.desc} numberOfLines={2}>{item.scopeNote}</Text>}
            </Pressable>
          </Link>
        )}
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
  card: { gap: 4, padding: spacing.cardPadding, backgroundColor: colors.paperStrong, borderColor: colors.line, borderWidth: 1 },
  catRow: { flexDirection: "row", justifyContent: "space-between" },
  type: { color: colors.accent, fontSize: 11, fontWeight: "700" },
  region: { color: colors.muted, fontSize: 11 },
  title: { color: colors.ink, fontSize: 18, fontWeight: "800", fontFamily: typography.serif },
  orig: { color: colors.muted, fontSize: 12, fontStyle: "italic" },
  editions: { color: colors.green, fontSize: 12, fontWeight: "600", marginTop: 2 },
  desc: { color: colors.ink, fontSize: 13, lineHeight: 20, marginTop: 2 },
});
