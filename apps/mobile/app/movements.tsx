import { useMemo, useState } from "react";
import { Link } from "expo-router";
import { FlatList, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { movements, works } from "@bookpath/content";
import { colors, spacing, typography } from "@bookpath/design-tokens";

function workCount(mid: string) {
  return works.filter((w) => (w.movementIds as readonly string[]).includes(mid)).length;
}

const groupOpts = [
  { label: "古典文学", ids: ["chinese-classics","pre-qin-lit","four-great-novels","chinese-poetry","western-classics","greek-epic","greek-tragedy","shakespeare","renaissance-lit","japanese-classics"] },
  { label: "现当代", ids: ["realism","naturalism","critical-realism","modernism","postmodernism","magic-realism","latin-american-boom","modern-chinese-literature","contemporary-chinese-literature","chinese-avant-garde-literature"] },
  { label: "思想·主题", ids: ["existentialist-literature","theatre-literature-of-the-absurd","black-humor","feminist-literature","postcolonial-literature","dystopian-literature","utopian-literature","psychological-novel"] },
  { label: "类型文学", ids: ["science-fiction","cyberpunk","fantasy-literature","horror-literature","gothic-fiction","detective-fiction-mystery","crime-fiction","social-school-mystery","honmaku-mystery","children-s-literature","climate-fiction"] },
  { label: "地域·流派", ids: ["modern-japanese-literature","i-novel","buraiha","aesthetic-novel","beat-generation","dirty-realism","immigrant-literature","war-literature","urban-literature","rural-literature","ecological-literature"] },
  { label: "奖项·入门", ids: ["nobel-literature-reading","booker-prize-reading","hugo-award-reading","akutagawa-prize-literature","naoki-prize-literature","mao-dun-literature-prize-reading","lu-xun-literature-prize-reading","fiction-introduction","short-story","drama","poetry-introduction","bildungsroman","family-saga"] },
];

export default function MovementsScreen() {
  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("");

  const flatList = useMemo(() => {
    let list = [...movements];
    const q = query.trim();
    if (q) list = list.filter(m => [m.label, m.originalName, m.oneLine].join(" ").includes(q));
    if (groupFilter) {
      const group = groupOpts.find(g => g.label === groupFilter);
      if (group) list = list.filter(m => group.ids.includes(m.id));
    }
    return list;
  }, [query, groupFilter]);

  return (
    <View style={s.screen}>
      <View style={s.searchWrap}>
        <TextInput style={s.input} placeholder="搜索流派..." placeholderTextColor={colors.muted}
          value={query} onChangeText={setQuery} autoCapitalize="none" autoCorrect={false} />
        {query.length > 0 && <Pressable onPress={() => setQuery("")} accessibilityLabel="清除搜索"><Text style={s.clearText}>✕</Text></Pressable>}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chipScroll}>
        <Pressable onPress={() => setGroupFilter("")} style={[s.chip, !groupFilter && s.chipOn]} accessibilityRole="button" accessibilityLabel="全部流派">
          <Text style={[s.chipText, !groupFilter && s.chipTextOn]}>全部</Text>
        </Pressable>
        {groupOpts.map(g => (
          <Pressable key={g.label} onPress={() => setGroupFilter(groupFilter === g.label ? "" : g.label)} style={[s.chip, groupFilter === g.label && s.chipOn]} accessibilityRole="button" accessibilityLabel={g.label}>
            <Text style={[s.chipText, groupFilter === g.label && s.chipTextOn]}>{g.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <FlatList data={flatList} keyExtractor={i => i.id} contentContainerStyle={s.list}
        windowSize={10} maxToRenderPerBatch={7}
        ListHeaderComponent={<Text style={s.resultCount}>{flatList.length} 个流派</Text>}
        renderItem={({ item }) => (
          <Link href={`/movement/${item.id}`} asChild>
            <Pressable style={s.card} accessibilityRole="link" accessibilityLabel={item.label}>
              <View style={s.catRow}>
                <Text style={s.period}>{item.period}</Text>
                <Text style={s.region}>{item.region}</Text>
              </View>
              <Text style={s.label}>{item.label}</Text>
              {item.originalName ? <Text style={s.orig}>{item.originalName}</Text> : null}
              <Text style={s.desc} numberOfLines={2}>{item.oneLine}</Text>
              <View style={s.footer}>
                <Text style={s.count}>{workCount(item.id)} 部作品</Text>
                <Text style={s.arrow}>→</Text>
              </View>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  searchWrap: { flexDirection: "row", alignItems: "center", gap: 8, margin: spacing.pageX, marginBottom: 4 },
  input: { flex: 1, height: 42, paddingHorizontal: 14, fontSize: 15, color: colors.ink, backgroundColor: colors.paperStrong, borderColor: colors.line, borderWidth: 1, borderRadius: 6 },
  clearText: { color: colors.muted, fontSize: 16, padding: 6 },
  chipScroll: { paddingHorizontal: spacing.pageX, gap: 6, marginBottom: 8 },
  chip: { paddingHorizontal: 10, paddingVertical: 5, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paperStrong },
  chipOn: { borderColor: colors.accent, backgroundColor: "#ead2be" },
  chipText: { color: colors.muted, fontSize: 12, fontWeight: "600" },
  chipTextOn: { color: colors.ink, fontWeight: "800" },
  list: { gap: 10, padding: spacing.pageX, paddingBottom: 40 },
  resultCount: { color: colors.muted, fontSize: 13, fontWeight: "600", marginBottom: 4 },
  card: { gap: 4, padding: spacing.cardPadding, backgroundColor: colors.paperStrong, borderColor: colors.line, borderWidth: 1 },
  catRow: { flexDirection: "row", justifyContent: "space-between" },
  period: { color: colors.accent, fontSize: 11, fontWeight: "700" },
  region: { color: colors.muted, fontSize: 11 },
  label: { color: colors.ink, fontSize: 20, fontWeight: "900", fontFamily: typography.serif },
  orig: { color: colors.muted, fontSize: 13, fontStyle: "italic" },
  desc: { color: colors.ink, fontSize: 14, lineHeight: 22, marginTop: 2 },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6, paddingTop: 10, borderTopColor: colors.line, borderTopWidth: StyleSheet.hairlineWidth },
  count: { color: colors.green, fontSize: 12, fontWeight: "600" },
  arrow: { color: colors.accent, fontSize: 16 },
});
