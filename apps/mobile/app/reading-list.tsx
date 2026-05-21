import { useCallback, useState } from "react";
import { Link, useFocusEffect} from "expo-router";
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { works } from "@bookpath/content";
import { getAllReading, statusLabel, removeStatus } from "@bookpath/core";
import type { ReadingStatus } from "@bookpath/core";
import { colors, spacing, typography } from "@bookpath/design-tokens";
import { GoBack } from "@/components/go-back";



// Dark mode: dynamic colors
  export default function ReadingListScreen() {
  const [items, setItems] = useState<Record<string, { status: ReadingStatus; updatedAt: string }>>({});

  useFocusEffect(useCallback(() => {
    (async () => setItems(await getAllReading()))();
  }, []));

  const entries = Object.entries(items).sort((a, b) => b[1].updatedAt.localeCompare(a[1].updatedAt));

  return (
    <View style={styles.screen}>
      <FlatList
        data={entries}
        keyExtractor={([id]) => id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📖</Text>
            <Text style={styles.emptyTitle}>还没有阅读记录</Text>
            <Text style={styles.emptyDesc}>在作品详情页标记阅读状态</Text>
          </View>
        }
        renderItem={({ item: [id, data] }) => (
          <View style={styles.card}>
            <Link href={`/work/${id}` as any} asChild>
              <Pressable accessibilityRole="link" style={styles.cardLink}>
                <Text style={styles.cardTitle}>{(works as any).find((w: any) => w.id === id)?.titleDisplayCn || id}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{statusLabel(data.status)}</Text>
                </View>
              </Pressable>
            </Link>
            <Pressable onPress={async () => { await removeStatus(id); setItems(prev => { const n = { ...prev }; delete n[id]; return n; }); }} style={styles.removeBtn}>
              <Text style={styles.removeText}>移除</Text>
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
  cardLink: { flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { color: colors.ink, fontSize: 15, fontWeight: "700", flex: 1 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, backgroundColor: colors.accent },
  statusText: { color: colors.paperStrong, fontSize: 11, fontWeight: "700" },
  removeBtn: { padding: 8 },
  removeText: { color: colors.muted, fontSize: 12, fontWeight: "600" },
});
