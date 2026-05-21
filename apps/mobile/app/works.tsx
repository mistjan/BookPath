import { memo, useMemo, useState } from "react";
import { Link } from "expo-router";
import { FlatList, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { works } from "@bookpath/content";
import { filterWorks, slugify } from "@bookpath/core";
import type { WorkFilterInput } from "@bookpath/core";
import { colors, spacing, typography } from "@bookpath/design-tokens";

const diffLabel = (l: number) => l <= 1 ? "入门" : l === 2 ? "较易" : l === 3 ? "中等" : l === 4 ? "较难" : "进阶";
const sortOpts: { value: WorkFilterInput["sort"]; label: string }[] = [
  { value: "year-desc", label: "最新" }, { value: "year-asc", label: "最早" },
  { value: "difficulty", label: "难度" }, { value: "title", label: "名称" },
];
const catMerge: Record<string, string> = { "诗词": "诗歌" };
const allCats = [...new Set(works.map(w => catMerge[w.literaryCategory] || w.literaryCategory))].sort();
const allRegions = [...new Set(works.filter(w => w.countryOrRegion && w.countryOrRegion !== "待补充").flatMap(w => w.countryOrRegion.split("/").map(x => x.trim())))].sort();

export default function WorksScreen() {
  const [query, setQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [cat, setCat] = useState("");
  const [diff, setDiff] = useState("");
  const [sort, setSort] = useState<WorkFilterInput["sort"]>("year-desc");
  const [country, setCountry] = useState("");
  const [beginnerOnly, setBeginnerOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = filterWorks({ query, category: cat, difficulty: diff || undefined, sort, country: country || undefined });
    if (beginnerOnly) list = list.filter(w => w.beginnerEntry);
    return list;
  }, [query, cat, diff, sort, country, beginnerOnly]);
  const active = !!cat || !!diff || !!country || beginnerOnly;

  return (
    <View style={s.screen}>
      <View style={s.searchWrap}>
        <TextInput style={s.input} placeholder="搜索作品名、作者..." placeholderTextColor={colors.muted}
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
              <Text style={s.panelLabel}>分类</Text>
              <View style={s.chipRow}>
                {["全部", ...allCats].map(c => (
                  <Pressable key={c} accessibilityRole="button" onPress={() => setCat(c === "全部" ? "" : c)} style={[s.chip, cat === c && s.chipOn]}>
                    <Text style={[s.chipText, cat === c && s.chipTextOn]}>{c}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View style={s.filterCol}>
              <Text style={s.panelLabel}>难度</Text>
              <View style={s.chipRow}>
                {[{ v: "", l: "全部" }, ..."12345".split("").map(d => ({ v: d, l: `Lv.${d}` }))].map(({ v, l }) => (
                  <Pressable key={l} accessibilityRole="button" onPress={() => setDiff(diff === v ? "" : v)} style={[s.chip, diff === v && s.chipOn]}>
                    <Text style={[s.chipText, diff === v && s.chipTextOn]}>{l}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
          <Text style={s.panelLabel}>国家/地区</Text>
          <View style={s.chipRow}>
            {["全部", ...allRegions].map(r => (
              <Pressable key={r} accessibilityRole="button" onPress={() => setCountry(r === "全部" ? "" : r)} style={[s.chip, country === r && s.chipOn]}>
                <Text style={[s.chipText, country === r && s.chipTextOn]}>{r}</Text>
              </Pressable>
            ))}
          </View>
          <View style={s.filterRow}>
            <Text style={s.panelLabel}>排序</Text>
            <View style={s.chipRow}>
              {sortOpts.map(o => (
                <Pressable key={o.value} accessibilityRole="button" onPress={() => setSort(o.value)} style={[s.chip, sort === o.value && s.chipOn]}>
                  <Text style={[s.chipText, sort === o.value && s.chipTextOn]}>{o.label}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable onPress={() => setBeginnerOnly(!beginnerOnly)} style={[s.chip, beginnerOnly && s.chipOn]}>
              <Text style={[s.chipText, beginnerOnly && s.chipTextOn]}>仅新手友好</Text>
            </Pressable>
          </View>
          {active && <Pressable onPress={() => { setCat(""); setDiff(""); setSort("year-desc"); setCountry(""); setBeginnerOnly(false); }}><Text style={s.clearLink}>清除筛选</Text></Pressable>}
        </View>
      )}

      <View style={s.resultBar}>
        <Text style={s.resultText}>{filtered.length} 部作品</Text>
        {active && <Text style={s.resultHint}>已筛选</Text>}
      </View>

      <FlatList data={filtered} keyExtractor={i => i.id} contentContainerStyle={s.list}
        numColumns={2} columnWrapperStyle={s.row}
        windowSize={10} maxToRenderPerBatch={7} removeClippedSubviews={Platform.OS === "android"}
        renderItem={({ item }) => <WorkCard item={item} />}
      />
    </View>
  );
}

const WorkCard = memo(function WorkCard({ item }: { item: (typeof works)[number] }) {
  return (
    <View style={s.card}>
      <Link href={`/work/${item.slug}` as any} asChild>
        <Pressable accessibilityRole="link">
          <View style={s.cardCatRow}>
            <Text style={s.cardDiff}>难度 {item.difficultyLevel} · {diffLabel(item.difficultyLevel)}</Text>
            <Text style={s.cardRegion}>{item.countryOrRegion}</Text>
          </View>
          <Text style={s.cardTitle}>{item.titleDisplayCn}</Text>
          {item.titleOriginal ? <Text style={s.cardOrig}>{item.titleOriginal}</Text> : null}
        </Pressable>
      </Link>
      <Link href={`/author/${slugify(item.authorName)}` as any} asChild>
        <Pressable accessibilityRole="link"><Text style={s.authorLink}>{item.authorName}</Text></Pressable>
      </Link>
      <Link href={`/work/${item.slug}` as any} asChild>
        <Pressable accessibilityRole="link">
          <View style={s.tagRow}>
            <Text style={s.tag}>{item.literaryCategory}</Text>
            {item.literarySubcategory && item.literarySubcategory !== item.literaryCategory && <Text style={s.tag}>{item.literarySubcategory}</Text>}
          </View>
          <View style={s.cardFooter}>
            {item.beginnerEntry ? <Text style={s.badge}>新手友好</Text> : <View />}
            <Text style={s.arrow}>→</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
});

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  searchWrap: { flexDirection: "row", alignItems: "center", gap: 8, margin: spacing.pageX, marginBottom: 8 },
  input: { flex: 1, height: 42, paddingHorizontal: 14, fontSize: 15, color: colors.ink, backgroundColor: colors.paperStrong, borderColor: colors.line, borderWidth: 1, borderRadius: 6 },
  filterBtn: { padding: 8 }, filterBtnText: { color: colors.accent, fontSize: 14, fontWeight: "800" },
  clearText: { color: colors.muted, fontSize: 16, padding: 6 },
  panel: { gap: 8, paddingHorizontal: spacing.pageX, paddingVertical: 12, borderBottomColor: colors.line, borderBottomWidth: StyleSheet.hairlineWidth },
  filterRow: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  filterCol: { flex: 1 },
  panelLabel: { fontSize: 11, fontWeight: "700", color: colors.muted, letterSpacing: 0.5, textTransform: "uppercase" },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  chip: { paddingHorizontal: 10, paddingVertical: 5, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paperStrong },
  chipOn: { borderColor: colors.accent, backgroundColor: "#ead2be" },
  chipText: { color: colors.muted, fontSize: 12, fontWeight: "600" },
  chipTextOn: { color: colors.ink, fontWeight: "800" },
  clearLink: { color: colors.accent, fontSize: 12, fontWeight: "700", alignSelf: "flex-end", paddingVertical: 4 },
  resultBar: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: spacing.pageX, paddingVertical: 8, borderBottomColor: colors.line, borderBottomWidth: StyleSheet.hairlineWidth },
  resultText: { color: colors.muted, fontSize: 13, fontWeight: "600" },
  resultHint: { color: colors.accent, fontSize: 12, fontWeight: "700" },
  list: { gap: 8, padding: spacing.pageX, paddingBottom: 40 },
  row: { gap: 8 },
  card: { flex: 1, gap: 3, padding: 12, backgroundColor: colors.paperStrong, borderColor: colors.line, borderWidth: 1 },
  cardCatRow: { flexDirection: "row", justifyContent: "space-between" },
  cardDiff: { color: colors.accent, fontSize: 11, fontWeight: "700" },
  cardRegion: { color: colors.muted, fontSize: 11 },
  cardTitle: { color: colors.ink, fontSize: 15, fontWeight: "800", fontFamily: typography.serif },
  cardOrig: { color: colors.muted, fontSize: 12, fontStyle: "italic" },
  authorLink: { color: colors.accent, fontSize: 13, fontWeight: "700", paddingVertical: 2 },
  tagRow: { flexDirection: "row", gap: 6, marginTop: 2 },
  tag: { color: colors.green, fontSize: 11, backgroundColor: "#edf3e8", paddingHorizontal: 6, paddingVertical: 2 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6, paddingTop: 8, borderTopColor: colors.line, borderTopWidth: StyleSheet.hairlineWidth },
  badge: { color: colors.accent, fontSize: 11, fontWeight: "700" },
  arrow: { color: colors.accent, fontSize: 16 },
});
