import { Link} from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@bookpath/design-tokens";
import { GoBack } from "@/components/go-back";

const tiers = [
  { id: "beginner", label: "🟢 新手从这里开始", color: colors.green },
  { id: "intermediate", label: "🟡 进阶阅读", color: colors.accent },
  { id: "advanced", label: "🔴 深度阅读", color: colors.muted },
] as const;

interface ClassicEntry {
  title: string; slug: string; diff: string; why: string;
}

const sections: { title: string; allHref: string; beginner: ClassicEntry[]; intermediate: ClassicEntry[]; advanced: ClassicEntry[] }[] = [
  {
    title: "中国古典文学", allHref: "/movements/chinese-classics",
    beginner: [
      { title: "西游记", slug: "work/西游记", diff: "难度 2", why: "故事性最强，孙悟空打妖怪老少皆宜" },
      { title: "唐诗三百首", slug: "work/唐诗三百首", diff: "难度 2", why: "每天一首，不需要从头读到尾" },
      { title: "论语", slug: "work/论语", diff: "难度 2", why: "篇幅最短，一本语录随时翻开" },
    ],
    intermediate: [
      { title: "红楼梦", slug: "work/红楼梦", diff: "难度 3", why: "中国古典小说的最高峰" },
      { title: "史记", slug: "work/史记", diff: "难度 3", why: "先读列传——项羽、荆轲" },
    ],
    advanced: [
      { title: "文心雕龙", slug: "work/文心雕龙", diff: "难度 4", why: "需要文言基础" },
      { title: "楚辞", slug: "work/楚辞", diff: "难度 3", why: "浪漫主义源头，需要注释" },
    ],
  },
  {
    title: "西方古典文学", allHref: "/movements/western-classics",
    beginner: [
      { title: "罗密欧与朱丽叶", slug: "work/罗密欧与朱丽叶", diff: "难度 2", why: "故事谁都知道" },
      { title: "奥德赛", slug: "work/奥德赛", diff: "难度 3", why: "独眼巨人、海妖塞壬" },
    ],
    intermediate: [
      { title: "伊利亚特", slug: "work/伊利亚特", diff: "难度 3", why: "西方文学从此开始" },
      { title: "堂吉诃德", slug: "work/堂吉诃德", diff: "难度 3", why: "风车大战——现代小说的起点" },
    ],
    advanced: [
      { title: "失乐园", slug: "work/失乐园", diff: "难度 4", why: "撒旦是最迷人的角色" },
      { title: "浮士德", slug: "work/浮士德", diff: "难度 4", why: "歌德用60年写成的诗剧" },
    ],
  },
  {
    title: "日本古典文学", allHref: "/movements/japanese-classics",
    beginner: [
      { title: "枕草子", slug: "work/枕草子", diff: "难度 1", why: "一千年前的女孩日记" },
      { title: "竹取物语", slug: "work/竹取物语", diff: "难度 1", why: "辉夜姬的童话" },
    ],
    intermediate: [
      { title: "源氏物语", slug: "work/源氏物语", diff: "难度 3", why: "世界上第一部长篇小说" },
    ],
    advanced: [
      { title: "雨月物语", slug: "work/雨月物语", diff: "难度 3", why: "幽玄之美的鬼故事" },
    ],
  },
];

function ClassicCard({ entry }: { entry: ClassicEntry }) {
  return (
    <Link href={`/${entry.slug}` as any} asChild>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{entry.title}</Text>
        <Text style={styles.cardTag}>{entry.diff}</Text>
        <Text style={styles.cardWhy}>{entry.why}</Text>
      </View>
    </Link>
  );
}

export default function ClassicsHubScreen() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Classics / 古典文学</Text>
          <Text style={styles.title}>古典文学</Text>
          <Text style={styles.description}>
            从荷马到红楼梦——古典文学是人类最早的故事。按难度分级推荐，帮你找到第一本。
          </Text>
        </View>

        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Link href={section.allHref as any}>
                <Text style={styles.viewAll}>查看全部 →</Text>
              </Link>
            </View>

            {tiers.map((tier) => {
              const items = section[tier.id];
              if (!items.length) return null;
              return (
                <View key={tier.id} style={styles.tierBlock}>
                  <Text style={[styles.tierLabel, { color: tier.color }]}>{tier.label}</Text>
                  {items.map((entry) => (
                    <ClassicCard key={entry.title} entry={entry} />
                  ))}
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { gap: 28, padding: spacing.pageX, paddingBottom: 60 },
  header: { gap: 8, paddingTop: spacing.sectionY },
  eyebrow: { color: colors.accent, fontSize: 12, fontWeight: "800" },
  title: { color: colors.ink, fontSize: 34, fontWeight: "900", lineHeight: 40, fontFamily: typography.serif },
  description: { color: colors.muted, fontSize: 16, lineHeight: 27 },
  section: { gap: 10 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: "800" },
  viewAll: { color: colors.accent, fontSize: 13, fontWeight: "700" },
  tierBlock: { gap: 6 },
  tierLabel: { fontSize: 14, fontWeight: "800", marginBottom: 2 },
  card: { gap: 2, padding: spacing.cardPadding, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paperStrong },
  cardTitle: { color: colors.ink, fontSize: 16, fontWeight: "700" },
  cardTag: { color: colors.accent, fontSize: 11, fontWeight: "600" },
  cardWhy: { color: colors.muted, fontSize: 13, lineHeight: 18 },
});
