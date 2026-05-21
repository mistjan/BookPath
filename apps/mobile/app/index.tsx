import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { movements, works, readingPaths } from "@bookpath/content";
import { colors, spacing, typography } from "@bookpath/design-tokens";
import { isFirstLaunch, markOnboardingComplete } from "@bookpath/core";

function shufflePick<T>(items: readonly T[], count: number): T[] {
  const pool = [...items];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

const randomWorks = shufflePick(works, 5);
const randomPath = shufflePick(readingPaths as any, 1)[0] as any;

const gateways = [
  { icon: "🤷", title: "不知道读什么？", desc: "选方向、定难度，推荐三本你真正想读的", href: "/start" },
  { icon: "🏷️", title: "认识一个流派", desc: `${movements.length} 个文学流派，先理解一片区域`, href: "/movements" },
  { icon: "🗺️", title: "推荐阅读路径", desc: `${readingPaths.length} 条阅读路径，按入门/体裁/奖项`, href: "/paths" },
  { icon: "🏆", title: "从奖项发现书", desc: "看懂 40 个奖项的倾向和局限", href: "/awards" },
  { icon: "🌱", title: "适合新手的经典", desc: `${works.filter(w => w.beginnerEntry).length} 部难度较低的作品`, href: "/beginner" },
];

// Dark mode: dynamic colors
  export default function HomeScreen() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    (async () => {
      if (await isFirstLaunch()) setShowOnboarding(true);
    })();
  }, []);

  const dismissOnboarding = async () => {
    await markOnboardingComplete();
    setShowOnboarding(false);
  };

  return (
    <View style={s.screen}>
      {showOnboarding && (
        <View style={s.onboard}>
          <View style={s.onboardCard}>
            <Text style={s.onboardTitle}>欢迎来到书径</Text>
            <Text style={s.onboardDesc}>从流派、作品、奖项和阅读路径开始，找到真正适合你的下一本书。在作品详情页可以收藏和标记阅读状态。</Text>
            <Pressable onPress={dismissOnboarding} style={s.onboardBtn}>
              <Text style={s.onboardBtnText}>开始探索</Text>
            </Pressable>
          </View>
        </View>
      )}
      <ScrollView contentContainerStyle={s.content}>
        {/* Brand */}
        <View style={s.brand}>
          <Text style={s.brandTitle}>书径</Text>
          <Text style={s.brandSub}>BookPath</Text>
          <Text style={s.brandDesc}>不是再给你一份书单，而是帮你看懂书单。</Text>
          <Text style={s.brandDesc2}>从文学流派、经典作品、奖项榜单和阅读路径开始，找到真正适合你的下一本书。</Text>
        </View>

        {/* Gateway cards */}
        <View style={s.gatewaySection}>
          {gateways.map((g, i) => (
            <Link key={g.title} href={g.href as any} asChild>
              <Pressable style={i === 0 ? StyleSheet.flatten([s.gatewayCard, s.gatewayPrimary]) : s.gatewayCard}
                accessibilityRole="link" accessibilityLabel={g.title}>
                <Text style={s.gatewayIcon}>{g.icon}</Text>
                <View style={s.gatewayBody}>
                  <Text style={[s.gatewayTitle, i === 0 && { color: colors.paperStrong }]}>{g.title}</Text>
                  <Text style={[s.gatewayDesc, i === 0 && { color: colors.paperStrong, opacity: 0.8 }]}>{g.desc}</Text>
                </View>
                <Text style={[s.gatewayArrow, i === 0 && { color: colors.paperStrong }]}>→</Text>
              </Pressable>
            </Link>
          ))}
        </View>

        {/* Today's Picks */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>每日推荐</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.hScroll}>
            {randomWorks.map((work) => (
              <Link key={work.id} href={`/work/${work.slug}` as any} asChild>
                <Pressable style={s.featCard} accessibilityRole="link" accessibilityLabel={work.titleDisplayCn}>
                  <Text style={s.featCat}>{(work.literaryCategory as string)}</Text>
                  <Text style={s.featTitle} numberOfLines={2}>{work.titleDisplayCn}</Text>
                  <Text style={s.featAuthor}>{work.authorName}</Text>
                  <View style={s.featMeta}>
                    <View style={[s.diffDot, { backgroundColor: work.difficultyLevel <= 2 ? colors.green : work.difficultyLevel === 3 ? colors.accent : "#b33" }]} />
                    <Text style={s.featDiff}>{work.difficultyLevel}/5</Text>
                    {work.beginnerEntry && <Text style={s.featBadge}>新手</Text>}
                  </View>
                </Pressable>
              </Link>
            ))}
          </ScrollView>
        </View>

        {/* Featured Path */}
        {randomPath && (
          <View style={s.section}>
            <Text style={s.sectionLabel}>推荐路径</Text>
            <Link href={`/path/${randomPath.slug || randomPath.id}` as any} asChild>
              <Pressable accessibilityRole="link" accessibilityLabel={randomPath.title} style={s.pathCard}>
                <View style={s.pathTop}>
                  <Text style={s.pathType}>{((randomPath.type === "BEGINNER" ? "入门" : randomPath.type || "阅读") + "路径")}</Text>
                  <Text style={s.pathSteps}>{randomPath.steps?.length || 0} 步</Text>
                </View>
                <Text style={s.pathTitle}>{randomPath.title}</Text>
                <Text style={s.pathDesc} numberOfLines={2}>{randomPath.description || ""}</Text>
                <View style={s.pathFooter}>
                  <Text style={s.pathArrow}>→ 查看全部步骤</Text>
                </View>
              </Pressable>
            </Link>
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { paddingBottom: 20 },
  // Brand
  brand: { paddingHorizontal: spacing.pageX, paddingTop: spacing.sectionY, paddingBottom: 20, gap: 2 },
  brandTitle: { color: colors.ink, fontSize: 34, fontWeight: "900", fontFamily: typography.serif, lineHeight: 38 },
  brandSub: { color: colors.muted, fontSize: 11, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase" },
  brandDesc: { color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 6 },
  brandDesc2: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 2 },
  // Gateways
  gatewaySection: { gap: 8, paddingHorizontal: spacing.pageX },
  gatewayCard: {
    flexDirection: "row", alignItems: "center", gap: 12,
    padding: 16, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paperStrong,
  },
  gatewayPrimary: { backgroundColor: colors.accent, borderColor: colors.accent },
  gatewayIcon: { fontSize: 24 },
  gatewayBody: { flex: 1, gap: 2 },
  gatewayTitle: { color: colors.ink, fontSize: 15, fontWeight: "800" },
  gatewayDesc: { color: colors.muted, fontSize: 12, lineHeight: 17 },
  gatewayArrow: { color: colors.muted, fontSize: 16 },
  // Section
  section: { gap: 8, marginTop: 24 },
  sectionLabel: { fontSize: 12, fontWeight: "700", color: colors.muted, letterSpacing: 1, textTransform: "uppercase", paddingHorizontal: spacing.pageX },
  // Horizontal scroll
  hScroll: { paddingHorizontal: spacing.pageX, gap: 10, paddingRight: 40 },
  featCard: { width: 150, padding: 14, gap: 4, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paperStrong },
  featCat: { color: colors.accent, fontSize: 10, fontWeight: "700", letterSpacing: 0.5, textTransform: "uppercase" },
  featTitle: { color: colors.ink, fontSize: 14, fontWeight: "700", lineHeight: 19 },
  featAuthor: { color: colors.muted, fontSize: 11 },
  featMeta: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 },
  diffDot: { width: 8, height: 8, borderRadius: 4 },
  featDiff: { color: colors.muted, fontSize: 11, fontWeight: "600" },
  featBadge: { fontSize: 10, fontWeight: "700", color: colors.green, paddingHorizontal: 5 },
  // Path card
  pathCard: { marginHorizontal: spacing.pageX, padding: spacing.cardPadding, gap: 6, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paperStrong },
  pathTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  pathType: { color: colors.accent, fontSize: 10, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase" },
  pathSteps: { color: colors.green, fontSize: 12, fontWeight: "600" },
  pathTitle: { color: colors.ink, fontSize: 17, fontWeight: "800" },
  pathDesc: { color: colors.muted, fontSize: 13, lineHeight: 19 },
  pathFooter: { flexDirection: "row", justifyContent: "flex-end", marginTop: 4, paddingTop: 8, borderTopColor: colors.line, borderTopWidth: StyleSheet.hairlineWidth },
  pathArrow: { color: colors.accent, fontSize: 13, fontWeight: "700" },
  // Onboarding
  onboard: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100, justifyContent: "center", alignItems: "center", padding: 40 },
  onboardCard: { backgroundColor: colors.paperStrong, padding: 24, gap: 12, maxWidth: 320 },
  onboardTitle: { color: colors.ink, fontSize: 22, fontWeight: "900", fontFamily: typography.serif, textAlign: "center" },
  onboardDesc: { color: colors.muted, fontSize: 14, lineHeight: 22, textAlign: "center" },
  onboardBtn: { padding: 14, backgroundColor: colors.accent, alignItems: "center", marginTop: 4 },
  onboardBtnText: { color: colors.paperStrong, fontWeight: "800", fontSize: 15 },
});
