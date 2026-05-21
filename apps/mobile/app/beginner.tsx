import { Link} from "expo-router";
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { works } from "@bookpath/content";
import { slugify } from "@bookpath/core";
import { colors, spacing, typography } from "@bookpath/design-tokens";
import { GoBack } from "@/components/go-back";

const items = works.filter((w) => w.beginnerEntry).sort((a, b) => a.difficultyLevel - b.difficultyLevel);



// Dark mode: dynamic colors
  export default function BeginnerScreen() {
  return (
    <View style={s.screen}>
      <View style={s.header}>
        <Text style={s.eyebrow}>Beginner / 新手友好</Text>
        <Text style={s.title}>适合新手的经典</Text>
        <Text style={s.desc}>
          以下 {items.length} 部作品难度较低（≤2），适合刚接触文学阅读的读者。
        </Text>
      </View>
      <FlatList data={items} keyExtractor={i => i.id} contentContainerStyle={s.list}
        windowSize={10} maxToRenderPerBatch={7} removeClippedSubviews={Platform.OS === "android"}
        ListHeaderComponent={
          <View style={s.filterBar}>
            {[1, 2].map(level => (
              <View key={level} style={s.filterChip}>
                <Text style={s.filterText}>难度 {level}</Text>
              </View>
            ))}
          </View>
        }
        renderItem={({ item }) => (
          <View style={s.card}>
            <Link href={`/work/${item.slug}` as any} asChild>
              <Pressable accessibilityRole="link">
                <View style={s.catRow}>
                  <Text style={s.diff}>难度 {item.difficultyLevel}</Text>
                  <Text style={s.region}>{item.countryOrRegion}</Text>
                </View>
                <Text style={s.cardTitle}>{item.titleDisplayCn}</Text>
                {item.titleOriginal && <Text style={s.orig}>{item.titleOriginal}</Text>}
              </Pressable>
            </Link>
            <Link href={`/author/${slugify(item.authorName)}` as any} asChild>
              <Pressable accessibilityRole="link"><Text style={s.author}>{item.authorName} →</Text></Pressable>
            </Link>
          </View>
        )}
      />
    </View>
  );
}


const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  header: { gap: 6, padding: spacing.pageX, paddingTop: spacing.sectionY, paddingBottom: 8 },
  eyebrow: { color: colors.accent, fontSize: 12, fontWeight: "800" },
  title: { color: colors.ink, fontSize: 28, fontWeight: "900", fontFamily: typography.serif, lineHeight: 32 },
  desc: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  list: { gap: 10, padding: spacing.pageX, paddingBottom: 40 },
  filterBar: { flexDirection: "row", gap: 8, marginBottom: 4 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 6, borderColor: colors.line, borderWidth: 1, borderRadius: 6, backgroundColor: colors.paperStrong },
  filterText: { color: colors.ink, fontSize: 13, fontWeight: "600" },
  card: { gap: 4, padding: spacing.cardPadding, backgroundColor: colors.paperStrong, borderColor: colors.line, borderWidth: 1 },
  catRow: { flexDirection: "row", justifyContent: "space-between" },
  diff: { color: colors.accent, fontSize: 11, fontWeight: "700" },
  region: { color: colors.muted, fontSize: 11 },
  cardTitle: { color: colors.ink, fontSize: 18, fontWeight: "800", fontFamily: typography.serif },
  orig: { color: colors.muted, fontSize: 12, fontStyle: "italic" },
  author: { color: colors.accent, fontSize: 13, fontWeight: "700", paddingVertical: 2 },
});
