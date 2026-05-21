import { useCallback, useState } from "react";
import { Link, useFocusEffect} from "expo-router";
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { getAllFavorites, removeFavorite } from "@bookpath/core";
import { colors, spacing, typography } from "@bookpath/design-tokens";
import { GoBack } from "@/components/go-back";



// Dark mode: dynamic colors
  export default function FavoritesScreen() {
  const [items, setItems] = useState<Record<string, { savedAt: string; title: string }>>({});

  useFocusEffect(useCallback(() => {
    (async () => setItems(await getAllFavorites()))();
  }, []));

  const entries = Object.entries(items).sort((a, b) => b[1].savedAt.localeCompare(a[1].savedAt));

  return (
    <View style={styles.screen}>
      <FlatList
        data={entries}
        keyExtractor={([id]) => id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>♡</Text>
            <Text style={styles.emptyTitle}>还没有收藏</Text>
            <Text style={styles.emptyDesc}>在作品详情页点♡即可收藏</Text>
          </View>
        }
        renderItem={({ item: [id, data] }) => (
          <View style={styles.card}>
            <Link href={`/work/${id}` as any} asChild>
              <Pressable accessibilityRole="link" style={styles.cardLink}>
                <Text style={styles.cardTitle}>{data.title}</Text>
                <Text style={styles.savedAt}>收藏于 {data.savedAt.slice(0, 10)}</Text>
              </Pressable>
            </Link>
            <Pressable onPress={async () => { await removeFavorite(id); setItems(prev => { const n = { ...prev }; delete n[id]; return n; }); }} style={styles.removeBtn}>
              <Text style={styles.removeText}>取消收藏</Text>
            </Pressable>
          </View>
        )}
        windowSize={10}
        maxToRenderPerBatch={7}
        removeClippedSubviews={Platform.OS === "android"}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  list: { padding: spacing.pageX, gap: 8, paddingBottom: 40 },
  empty: { alignItems: "center", gap: 8, paddingTop: 60 },
  emptyIcon: { fontSize: 40, color: colors.muted },
  emptyTitle: { color: colors.ink, fontSize: 18, fontWeight: "800" },
  emptyDesc: { color: colors.muted, fontSize: 14 },
  card: { flexDirection: "row", alignItems: "center", padding: spacing.cardPadding, borderColor: colors.line, borderWidth: 1, borderRadius: 6, backgroundColor: colors.paperStrong },
  cardLink: { flex: 1 },
  cardTitle: { color: colors.ink, fontSize: 16, fontWeight: "700" },
  removeBtn: { padding: 8 },
  savedAt: { color: colors.muted, fontSize: 11, marginTop: 2 },
  removeText: { color: colors.muted, fontSize: 12, fontWeight: "600" },
});
