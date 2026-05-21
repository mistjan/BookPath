import { useCallback, useState } from "react";
import { Link, type Href, useFocusEffect } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getAllFavorites, getAllReading } from "@bookpath/core";
import { colors, spacing, typography } from "@bookpath/design-tokens";
import { useTheme } from "@/components/theme-provider";

// ═══ 核心入口 ═══
const sections = [
  { title: "奖项", href: "/awards", icon: "🏆", desc: "布克奖、普利策、诺贝尔等 40 个奖项" },
  { title: "作家", href: "/authors", icon: "✍️", desc: "按姓名浏览作家及其作品" },
  { title: "古典文学", href: "/classics", icon: "📜", desc: "从诗经到莎士比亚，中国·西方·日本" },
];

// Dark mode: dynamic colors
  export default function MoreScreen() {
  const { colors, isDark, toggle: toggleDark } = useTheme();
  const [favCount, setFavCount] = useState(0);
  const [readingCount, setReadingCount] = useState(0);

  useFocusEffect(useCallback(() => {
    (async () => {
      const favs = await getAllFavorites();
      setFavCount(Object.keys(favs).length);
      const reading = await getAllReading();
      setReadingCount(Object.keys(reading).length);
    })();
  }, []));

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>更多</Text>
          <Text style={styles.sub}>奖项、作家、古典文学和其他入口</Text>
        </View>

        {/* ═══ 核心入口 ═══ */}
        <Text style={styles.groupLabel}>探索</Text>
        <View style={styles.cardGroup}>
          {sections.map((s) => (
            <Link key={s.title} href={s.href as any} asChild>
              <Pressable style={styles.card}>
                <Text style={styles.icon}>{s.icon}</Text>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{s.title}</Text>
                  <Text style={styles.cardDesc}>{s.desc}</Text>
                </View>
                <Text style={styles.arrow}>→</Text>
              </Pressable>
            </Link>
          ))}
        </View>

        {/* ═══ 我的 ═══ */}
        <Text style={styles.groupLabel}>我的</Text>
        <View style={styles.cardGroup}>
          <Link href={"/favorites" as Href} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.icon}>❤</Text>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>我的收藏</Text>
                <Text style={styles.cardDesc}>{favCount > 0 ? `${favCount} 部作品` : "还没有收藏"}</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </Pressable>
          </Link>

          <Link href={"/reading-list" as Href} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.icon}>📖</Text>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>阅读记录</Text>
                <Text style={styles.cardDesc}>{readingCount > 0 ? `${readingCount} 部` : "还没有记录"}</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </Pressable>
          </Link>

          <Pressable style={styles.card} onPress={toggleDark}>
            <Text style={styles.icon}>🌙</Text>
            <View style={styles.cardBody}>
              <Text style={[styles.cardTitle, isDark&&{color:colors.paper}]}>深色模式</Text>
              <Text style={styles.cardDesc}>{isDark? "已开启" : "点击切换"}</Text>
            </View>
            <Text style={styles.arrow}>{isDark? "🌙" : "☀️"}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { gap: 16, padding: spacing.pageX, paddingBottom: 40 },
  header: { gap: 2, paddingTop: spacing.sectionY },
  title: { color: colors.ink, fontSize: 28, fontWeight: "900", fontFamily: typography.serif, lineHeight: 32 },
  sub: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  groupLabel: { fontSize: 12, fontWeight: "700", color: colors.muted, letterSpacing: 1, textTransform: "uppercase", marginTop: 8 },
  cardGroup: { gap: 8 },
  card: {
    flexDirection: "row", alignItems: "center",
    padding: 16, gap: 12,
    borderColor: colors.line, borderWidth: 1, borderRadius: 6,
    backgroundColor: colors.paperStrong,
  },
  icon: { fontSize: 22, width: 28, textAlign: "center" },
  cardBody: { flex: 1, gap: 2 },
  cardTitle: { color: colors.ink, fontSize: 15, fontWeight: "700" },
  cardDesc: { color: colors.muted, fontSize: 12, lineHeight: 16 },
  arrow: { color: colors.muted, fontSize: 16 },
});
