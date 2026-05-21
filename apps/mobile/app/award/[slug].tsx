import { useState } from "react";
import { useLocalSearchParams, Stack, Link} from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { awardsData } from "@bookpath/content";
import { slugify, findWorkByName } from "@bookpath/core";
import {colors, spacing, typography } from "@bookpath/design-tokens";
import { GoBack } from "@/components/go-back";



export default function AwardDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [expandedCycle, setExpandedCycle] = useState<string | null>(null);

  const award = awardsData.find((a) => a.slug === slug);

  if (!award) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>未找到奖项</Text>
        <Text style={styles.description}>slug: {slug}</Text>
      </View>
    );
  }

  const sortedEditions = [...award.awardEditions].sort(
    (a, b) => (b.awardYear ?? 0) - (a.awardYear ?? 0)
  );

  const toggleEdition = (cycle: string) => {
    setExpandedCycle((prev) => (prev === cycle ? null : cycle));
  };

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{flexDirection:"row",alignItems:"center",paddingLeft:12,paddingRight:20,paddingVertical:10,borderBottomColor:colors.line,borderBottomWidth:StyleSheet.hairlineWidth,backgroundColor:"#f7f0e5"}}>
        <GoBack title="奖项" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>{award.nameOriginal}</Text>
          <Text style={styles.title}>{award.nameCn}</Text>
          <View style={styles.stats}>
            <Text style={styles.stat}>{award.awardType}</Text>
            <Text style={styles.stat}>{award.countryOrRegion}</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.stat}>始于 {award.foundedYear}</Text>
            <Text style={styles.stat}>{award.awardEditions.length} 届</Text>
          </View>
        </View>

        {award.scopeNote ? (
          <View style={styles.noteCard}>
            <Text style={styles.noteText}>{award.scopeNote}</Text>
          </View>
        ) : null}

        {award.whoShouldRead ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>适合什么人阅读</Text>
            <Text style={styles.bodyText}>{award.whoShouldRead}</Text>
          </View>
        ) : null}

        {award.limitationNote ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>局限与争议</Text>
            <Text style={styles.bodyText}>{award.limitationNote}</Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>历届列表</Text>
          {sortedEditions.map((ed) => {
            const isExpanded = expandedCycle === ed.awardCycle;
            const hasData =
              ed.workItems.length > 0 ||
              ed.authorItems.length > 0 ||
              !!ed.evaluationNote;

            return (
              <View key={ed.awardCycle + ed.awardYear}>
                <Pressable
                  onPress={() => toggleEdition(ed.awardCycle)}
                  style={({ pressed }) => [
                    styles.editionCard,
                    pressed && styles.editionCardPressed,
                  ]}
                >
                  <View style={styles.editionHeader}>
                    <Text style={styles.editionLabel}>
                      {ed.awardEditionLabel}
                    </Text>
                    <View style={styles.editionHeaderRight}>
                      <Text style={styles.editionYear}>
                        {ed.awardYear ?? ed.awardCycle}
                      </Text>
                      <Text style={styles.expandArrow}>
                        {isExpanded ? "▲" : "▼"}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.editionMeta}>
                    <Text style={styles.editionStatus}>
                      {ed.evaluationNote ? "已整理" : "待补充内容"}
                    </Text>
                    <Text style={styles.editionRecipient}>
                      {ed.recipientType === "AUTHOR"
                        ? "作者奖"
                        : ed.recipientType === "WORK"
                          ? "作品奖"
                          : ed.recipientType}
                    </Text>
                  </View>
                </Pressable>

                {isExpanded && (
                  <View style={styles.expandedContent}>
                    {ed.evaluationNote ? (
                      <View style={styles.evaluationCard}>
                        <Text style={styles.evaluationTitle}>简评</Text>
                        <Text style={styles.evaluationText}>
                          {ed.evaluationNote}
                        </Text>
                      </View>
                    ) : null}

                    {ed.authorItems.length > 0 ? (
                      <View style={styles.subSection}>
                        <Text style={styles.subSectionTitle}>获奖作者</Text>
                        {ed.authorItems.map((item, i) => (
                          <Link
                            key={i}
                            href={`/author/${slugify(item.nameCn)}` as any}
                            asChild
                          >
                            <Pressable accessibilityRole="link" style={styles.winnerCard}>
                              <Text style={styles.winnerLinkName}>
                                {item.nameCn} →
                              </Text>
                              {item.nameOriginal ? (
                                <Text style={styles.winnerOriginal}>
                                  {item.nameOriginal}
                                </Text>
                              ) : null}
                              {item.country ? (
                                <Text style={styles.winnerCountry}>
                                  {item.country}
                                </Text>
                              ) : null}
                            </Pressable>
                          </Link>
                        ))}
                      </View>
                    ) : null}

                    {ed.workItems.length > 0 ? (
                      <View style={styles.subSection}>
                        <Text style={styles.subSectionTitle}>获奖作品</Text>
                        {ed.workItems.map((item, i) => {
                          const matchedWork = findWorkByName(item.nameCn);
                          const workSlug = matchedWork?.slug ?? slugify(item.nameCn);
                          return (
                            <Link
                              key={i}
                              href={`/work/${workSlug}` as any}
                              asChild
                            >
                              <Pressable accessibilityRole="link" style={styles.winnerCard}>
                                <Text style={styles.winnerLinkName}>
                                  {item.nameCn} →
                                </Text>
                                {item.nameOriginal ? (
                                  <Text style={styles.winnerOriginal}>
                                    {item.nameOriginal}
                                  </Text>
                                ) : null}
                                {item.country ? (
                                  <Text style={styles.winnerCountry}>
                                    {item.country}
                                  </Text>
                                ) : null}
                              </Pressable>
                            </Link>
                          );
                        })}
                      </View>
                    ) : null}

                    {!hasData ? (
                      <View style={styles.placeholder}>
                        <Text style={styles.placeholderTitle}>
                          待补充内容
                        </Text>
                        <Text style={styles.placeholderText}>
                          该届获奖作品/作家信息尚待整理。
                        </Text>
                      </View>
                    ) : null}
                  </View>
                )}
              </View>
            );
          })}
        </View>
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
  stats: { flexDirection: "row", gap: 16, marginTop: 2 },
  stat: { color: colors.green, fontSize: 13, fontWeight: "600" },
  noteCard: {
    padding: 12,
    borderColor: colors.accent,
    borderWidth: 1,
    backgroundColor: "#f5f0eb",
  },
  noteText: { color: colors.ink, fontSize: 13, lineHeight: 21 },
  section: { gap: 8 },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: "800", marginBottom: 2 },
  bodyText: { color: colors.ink, fontSize: 14, lineHeight: 24 },
  editionCard: {
    gap: 4,
    padding: spacing.cardPadding,
    borderColor: colors.line,
    borderWidth: 1,
    backgroundColor: colors.paperStrong,
  },
  editionCardPressed: {
    opacity: 0.7,
  },
  editionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editionHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  editionLabel: { color: colors.ink, fontSize: 16, fontWeight: "700" },
  editionYear: { color: colors.muted, fontSize: 13 },
  expandArrow: { color: colors.muted, fontSize: 11 },
  editionMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },
  editionStatus: { color: colors.accent, fontSize: 11 },
  editionRecipient: { color: colors.muted, fontSize: 11 },
  expandedContent: {
    gap: 12,
    padding: spacing.cardPadding,
    borderColor: colors.line,
    borderWidth: 1,
    borderTopWidth: 0,
    backgroundColor: colors.paper,
  },
  evaluationCard: {
    gap: 6,
    padding: 14,
    borderColor: colors.accent,
    borderWidth: 1,
    backgroundColor: "#f5f0eb",
  },
  evaluationTitle: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "800",
  },
  evaluationText: {
    color: colors.ink,
    fontSize: 14,
    lineHeight: 23,
  },
  subSection: { gap: 6 },
  subSectionTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 2,
  },
  winnerCard: {
    gap: 2,
    padding: 12,
    borderColor: colors.line,
    borderWidth: 1,
    backgroundColor: colors.paperStrong,
  },
  winnerName: { color: colors.ink, fontSize: 15, fontWeight: "600" },
  winnerLinkName: { color: colors.accent, fontSize: 15, fontWeight: "700" },
  winnerOriginal: {
    color: colors.muted,
    fontSize: 12,
    fontStyle: "italic",
  },
  winnerCountry: {
    color: colors.accent,
    fontSize: 11,
    marginTop: 2,
  },
  placeholder: {
    gap: 8,
    padding: 20,
    borderColor: colors.line,
    borderWidth: 1,
    borderStyle: "dashed",
    backgroundColor: colors.paperStrong,
    alignItems: "center",
  },
  placeholderTitle: {
    color: colors.muted,
    fontSize: 18,
    fontWeight: "700",
  },
  placeholderText: {
    color: colors.muted,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
});
