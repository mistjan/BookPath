import { useMemo } from "react";
import { useLocalSearchParams, Stack, Link} from "expo-router";
import { ScrollView, Pressable, StyleSheet, Text, View } from "react-native";
import { works, awardsData } from "@bookpath/content";
import { movementName, slugify, authorBios } from "@bookpath/core";
import {colors, spacing, typography } from "@bookpath/design-tokens";
import { GoBack } from "@/components/go-back";



export default function AuthorDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const allWorks = useMemo(() => {
    return works.filter((w) => slugify(w.authorName) === id);
  }, [id]);

  const awardWins = useMemo(() => {
    // Scan all award editions for this author
    const wins: { awardName: string; edition: string; year: number | null }[] = [];
    awardsData.forEach((award) => {
      award.awardEditions.forEach((ed) => {
        const matched = ed.authorItems.find(
          (ai) => slugify(ai.nameCn) === id
        );
        if (matched) {
          wins.push({
            awardName: award.nameCn,
            edition: ed.awardEditionLabel,
            year: ed.awardYear,
          });
        }
      });
    });
    return wins.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  }, [id]);

  const authorName =
    allWorks[0]?.authorName ?? awardWins[0]?.awardName ?? id;

  if (!allWorks.length && !awardWins.length) {
    return (
      <View style={styles.screen}>
        <Stack.Screen options={{ headerLeft: () => <GoBack title="未找到" />, title: "未找到作家" }} />
        <View style={styles.content}>
          <Text style={styles.title}>未找到作家</Text>
          <Text style={styles.description}>id: {id}</Text>
        </View>
      </View>
    );
  }

  if (!allWorks.length) {
    // Author exists only in award data, no works in library
    const realName = awardWins[0] ? (() => {
      for (const a of awardsData) {
        for (const ed of a.awardEditions) {
          const found = ed.authorItems.find((ai) => slugify(ai.nameCn) === id);
          if (found) return found.nameCn;
        }
      }
      return id;
    })() : id;

    return (
      <View style={styles.screen}>
        <Stack.Screen options={{ headerShown: false }} />
      <View style={{flexDirection:"row",alignItems:"center",paddingLeft:12,paddingRight:20,paddingVertical:10,borderBottomColor:"#d7c7b4",borderBottomWidth:StyleSheet.hairlineWidth,backgroundColor:"#f7f0e5"}}><GoBack title="作家" /></View>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={styles.eyebrow}>作家</Text>
            <Text style={styles.title}>{realName}</Text>
            <Text style={styles.description}>暂未收录该作家的作品，以下为其获奖记录。</Text>
          </View>

          {authorBios[id] && (
            <View style={styles.bioSection}>
              <Text style={styles.bioText}>{authorBios[id].description}</Text>
              <Text style={styles.bioWhy}>{authorBios[id].whyImportant}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>获奖记录 ({awardWins.length})</Text>
            {awardWins.map((win, i) => (
              <View key={i} style={styles.awardCard}>
                <Text style={styles.awardName}>{win.awardName}</Text>
                <Text style={styles.awardEdition}>{win.edition}{win.year ? ` · ${win.year}年` : ""}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  const allMovementIds = [
    ...new Set(allWorks.flatMap((w) => w.movementIds as readonly string[])),
  ];
  const allCountries = [
    ...new Set(allWorks.map((w) => w.countryOrRegion).filter((c) => c !== "待补充")),
  ];
  const difficultyAvg = Math.round(
    allWorks.reduce((sum, w) => sum + w.difficultyLevel, 0) / allWorks.length
  );
  const sorted = [...allWorks].sort((a, b) => a.difficultyLevel - b.difficultyLevel);

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: authorName }} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>作家</Text>
          <Text style={styles.title}>{authorName}</Text>
          <View style={styles.stats}>
            <Text style={styles.stat}>{allWorks.length} 部作品</Text>
            <Text style={styles.stat}>均难度 {difficultyAvg}/5</Text>
          </View>
          {allCountries.length > 0 ? (
            <Text style={styles.meta}>地区：{allCountries.join("、")}</Text>
          ) : null}
          {allMovementIds.length > 0 ? (
            <Text style={styles.meta}>
              相关流派：{allMovementIds.map(movementName).join("、")}
            </Text>
          ) : null}
        </View>

        {authorBios[id] && (
          <View style={styles.bioSection}>
            <Text style={styles.bioText}>{authorBios[id].description}</Text>
            <Text style={styles.bioWhy}>{authorBios[id].whyImportant}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>作品列表 ({sorted.length})</Text>
          {sorted.map((work) => (
            <Link key={work.id} href={`/work/${work.slug}` as any} asChild>
              <Pressable accessibilityRole="link" style={styles.workCard}>
                <View style={styles.workHeader}>
                  <Text style={styles.workTitle}>{work.titleDisplayCn}</Text>
                  <Text style={styles.workDifficulty}>难度 {work.difficultyLevel}</Text>
                </View>
                {work.titleOriginal ? (
                  <Text style={styles.workOriginal}>{work.titleOriginal}</Text>
                ) : null}
                <View style={styles.workTags}>
                  <Text style={styles.workTag}>{work.literaryCategory}</Text>
                  <Text style={styles.workTag}>{work.literarySubcategory}</Text>
                </View>
              </Pressable>
            </Link>
          ))}
        </View>

        {awardWins.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>获奖记录 ({awardWins.length})</Text>
            {awardWins.map((win, i) => (
              <View key={i} style={styles.awardCard}>
                <Text style={styles.awardName}>{win.awardName}</Text>
                <Text style={styles.awardEdition}>{win.edition}{win.year ? ` · ${win.year}年` : ""}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { gap: 20, padding: spacing.pageX, paddingBottom: 60 },
  header: { gap: 6 },
  eyebrow: { color: colors.accent, fontSize: 12, fontWeight: "800" },
  title: { color: colors.ink, fontSize: 30, fontWeight: "900", lineHeight: 36, fontFamily: typography.serif },
  description: { color: colors.muted, fontSize: 16, lineHeight: 27 },
  stats: { flexDirection: "row", gap: 16, marginTop: 4 },
  stat: { color: colors.green, fontSize: 13, fontWeight: "600" },
  meta: { color: colors.muted, fontSize: 13, lineHeight: 21 },
  bioSection: { gap: 8, padding: spacing.cardPadding, borderColor: colors.accent, borderWidth: 1, backgroundColor: "#f5f0eb" },
  bioText: { color: colors.ink, fontSize: 13, lineHeight: 21 },
  bioWhy: { color: colors.muted, fontSize: 13, lineHeight: 21, fontStyle: "italic", marginTop: 6 },
  section: { gap: 8 },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: "800", marginBottom: 2 },
  workCard: {
    gap: 3,
    padding: spacing.cardPadding,
    borderColor: colors.line,
    borderWidth: 1,
    backgroundColor: colors.paperStrong,
  },
  workHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workTitle: { color: colors.ink, fontSize: 16, fontWeight: "700" },
  workDifficulty: { color: colors.accent, fontSize: 12, fontWeight: "600" },
  workOriginal: { color: colors.muted, fontSize: 11, fontStyle: "italic" },
  workTags: { flexDirection: "row", gap: 6, marginTop: 2 },
  workTag: { color: colors.green, fontSize: 10, backgroundColor: "#edf3e8", paddingHorizontal: 6, paddingVertical: 2 },
  awardCard: {
    gap: 2,
    padding: spacing.cardPadding,
    borderColor: colors.line,
    borderWidth: 1,
    backgroundColor: colors.paperStrong,
  },
  awardName: { color: colors.ink, fontSize: 15, fontWeight: "700" },
  awardEdition: { color: colors.accent, fontSize: 12, marginTop: 2 },
});
