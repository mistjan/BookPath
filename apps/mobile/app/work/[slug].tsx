import { useRef, useState, useEffect } from "react";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { Modal, ScrollView, Pressable, Share, StyleSheet, Text, View } from "react-native";
import { works, guideCards, movements, readingPaths, awardsData } from "@bookpath/content";
import { slugify, findWorkByName, isFavorited, toggleFavorite, getStatus, setStatus, statusLabel, allStatuses } from "@bookpath/core";
import type { ReadingStatus } from "@bookpath/core";
import { colors, spacing, typography } from "@bookpath/design-tokens";
import { GoBack } from "@/components/go-back";
import { ShareCard } from "@/components/share-card";
import { captureRef } from "react-native-view-shot";

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { gap: 24, padding: spacing.pageX, paddingBottom: 60 },
  header: { gap: 4 },
  eyebrow: { color: colors.accent, fontSize: 12, fontWeight: "800" },
  title: { color: colors.ink, fontSize: 32, fontWeight: "900", lineHeight: 38, fontFamily: typography.serif },
  original: { color: colors.muted, fontSize: 14, fontStyle: "italic" },
  metaRow: { flexDirection: "row", gap: 8, flexWrap: "wrap", alignItems: "center" },
  metaLink: { color: colors.accent, fontSize: 14, fontWeight: "700" },
  metaText: { color: colors.muted, fontSize: 14 },
  category: { color: colors.muted, fontSize: 13 },
  bodyText: { color: colors.ink, fontSize: 15, lineHeight: 26 },
  section: { gap: 10 },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: "800" },
  decisionCard: { gap: 10, padding: spacing.cardPadding, borderColor: colors.accent, borderWidth: 1, backgroundColor: colors.paperStrong },
  decisionTitle: { color: colors.ink, fontSize: 18, fontWeight: "800" },
  decisionDesc: { color: colors.muted, fontSize: 13 },
  difficultyRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  difficultyLabel: { color: colors.muted, fontSize: 13, width: 40 },
  difficultyBar: { flexDirection: "row", gap: 4, flex: 1 },
  difficultyDot: { width: 16, height: 16, borderRadius: 8 },
  difficultyNum: { color: colors.ink, fontSize: 16, fontWeight: "800" },
  difficultyTag: { paddingHorizontal: 10, paddingVertical: 4, borderColor: colors.line, borderWidth: 1 },
  difficultyTagText: { color: colors.muted, fontSize: 12 },
  mapSection: { gap: 10 },
  chipGroup: { gap: 6, flexDirection: "row", flexWrap: "wrap" },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paperStrong },
  chipText: { color: colors.ink, fontSize: 13, fontWeight: "600" },
  mapToggle: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8, borderBottomColor: colors.line, borderBottomWidth: StyleSheet.hairlineWidth },
  mapToggleLabel: { color: colors.ink, fontSize: 15, fontWeight: "700" },
  mapToggleArrow: { color: colors.accent, fontSize: 12 },
  guideToggleWrap: { borderRadius: 2, overflow: "hidden" },
  guideToggleWrapOpen: { backgroundColor: "#f5f0eb" },
  guideToggleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, paddingHorizontal: 4 },
  guideToggleLabel: { color: colors.accent, fontSize: 13, fontWeight: "700" },
  guideToggleArrow: { color: colors.muted, fontSize: 12 },
  guideToggleValue: { color: colors.ink, fontSize: 14, lineHeight: 23, paddingBottom: 10, paddingHorizontal: 4 },
  awardMention: { gap: 2, padding: 12, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paperStrong },
  awardMentionName: { color: colors.ink, fontSize: 15, fontWeight: "700" },
  awardMentionEdition: { color: colors.accent, fontSize: 12, marginTop: 2 },
});

export default function WorkDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [showMovements, setShowMovements] = useState(false);
  const [showAllPaths, setShowAllPaths] = useState(false);
  const [faved, setFaved] = useState(false);
  const [reading, setReading] = useState<ReadingStatus | null>(null);
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const cardRef = useRef(null);
  const [showShareCard, setShowShareCard] = useState(false);

  useEffect(() => {
    (async () => {
      const w = works.find((x) => x.slug === slug || x.id === slug);
      if (w) {
        setFaved(await isFavorited(w.id));
        setReading(await getStatus(w.id));
      }
    })();
  }, [slug]);

  const handleToggleFav = async () => {
    const w = works.find((x) => x.slug === slug || x.id === slug);
    if (!w) return;
    const now = await toggleFavorite(w.id, w.titleDisplayCn);
    setFaved(now);
  };

  const handleStatus = async (s: ReadingStatus) => {
    const w = works.find((x) => x.slug === slug || x.id === slug);
    if (!w) return;
    await setStatus(w.id, s);
    setReading(s);
    setShowStatusPicker(false);
  };

  const workBySlug = works.find((w) => w.slug === slug || w.id === slug);
  const work = workBySlug ?? works.find((w) => w.titleDisplayCn === slug || w.titleOriginal === slug) ?? null;

  if (!work) {
    return (
      <View style={styles.screen}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={{flexDirection:"row",alignItems:"center",paddingLeft:12,paddingRight:20,paddingVertical:10,borderBottomColor:colors.line,borderBottomWidth:StyleSheet.hairlineWidth,backgroundColor:"#f7f0e5"}}>
          <GoBack title="未找到作品" />
        </View>
      </View>
    );
  }

  const awardMentions = awardsData
    .flatMap((award: any) => award.awardEditions.filter((e: any) => (e as any).winnerWorkSlug === (work as any).slug).map((e: any) => ({ awardName: award.nameCn, edition: (e as any).editionName, year: (e as any).year })))
    .slice(0, 3);

  const workGuideCards = guideCards.filter((gc) => (work.guideCardIds as readonly string[]).includes(gc.id));
  const guide = workGuideCards[0];
  const movementIds = work.movementIds as readonly string[];
  const linkedMovements = movements.filter((m) => movementIds.includes(m.id));
  const linkedPaths = readingPaths.filter((p: any) => (p as any).steps?.some((s: any) => s.workId === work.id));
  const entryReady = guide?.beginnerEntry ?? (work as any).beginnerEntry ?? work.beginnerEntry;
  const workAny = work as any;
  const positioning = guide?.oneSentencePositioning ?? `${workAny.titleDisplayCn} 是 ${workAny.literaryCategory} / ${workAny.literarySubcategory} 的一个阅读地标。`;
  const difficulty = work.difficultyLevel;

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{flexDirection:"row",alignItems:"center",paddingLeft:12,paddingRight:20,paddingVertical:10,borderBottomColor:colors.line,borderBottomWidth:StyleSheet.hairlineWidth,backgroundColor:"#f7f0e5"}}>
        <GoBack title={work.titleDisplayCn} />
        <View style={{flex:1}} />
        <Pressable onPress={() => setShowShareCard(true)}><Text style={{fontSize:18,color:colors.muted}}>↗</Text></Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Work Landmark</Text>
          <Text style={styles.title}>{work.titleDisplayCn}</Text>
          {work.titleOriginal ? <Text style={styles.original}>{work.titleOriginal}</Text> : null}
          <View style={styles.metaRow}>
            <Link href={`/author/${slugify(work.authorName)}` as any} asChild>
              <Pressable><Text style={styles.metaLink}>{work.authorName}</Text></Pressable>
            </Link>
            {work.firstPublishedYear ? <Text style={styles.metaText}>{work.firstPublishedYear}</Text> : null}
            <Text style={styles.metaText}>{work.countryOrRegion}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <Text style={styles.category}>{work.literaryCategory} / {work.literarySubcategory}</Text>
            <Pressable onPress={handleToggleFav} accessibilityLabel={faved ? "取消收藏" : "收藏"}>
              <Text style={{ fontSize: 22, color: faved ? "#e44" : colors.muted }}>{faved ? "❤" : "♡"}</Text>
            </Pressable>
            <Pressable onPress={() => setShowShareCard(true)} accessibilityLabel="分享">
              <Text style={{ fontSize: 18, color: colors.muted }}>↗</Text>
            </Pressable>
            <View style={{ position: "relative" }}>
              <Pressable onPress={() => setShowStatusPicker((p) => !p)} style={{ paddingHorizontal: 8, paddingVertical: 4, borderColor: colors.line, borderWidth: 1 }}>
                <Text style={{ fontSize: 12, color: colors.ink, fontWeight: "600" }}>{reading ? statusLabel(reading) : "标记状态"} ▼</Text>
              </Pressable>
              {showStatusPicker && (
                <View style={{ position: "absolute", top: 32, left: 0, backgroundColor: colors.paperStrong, borderColor: colors.line, borderWidth: 1, zIndex: 10 }}>
                  {allStatuses.map((s) => (
                    <Pressable key={s} onPress={() => handleStatus(s)} style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: reading === s ? colors.accent : "transparent" }}>
                      <Text style={{ fontSize: 13, fontWeight: "600", color: reading === s ? colors.paperStrong : colors.ink }}>{statusLabel(s)}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          </View>
          <Text style={styles.bodyText}>{positioning}</Text>
        </View>

        <View style={styles.decisionCard}>
          <Text style={styles.eyebrow}>Reading Decision</Text>
          <Text style={styles.decisionTitle}>{entryReady ? "可以作为入口" : "建议按路径进入"}</Text>
          <View style={styles.difficultyRow}>
            <Text style={styles.difficultyLabel}>难度</Text>
            <View style={styles.difficultyBar}>
              {[1, 2, 3, 4, 5].map((level) => {
                const dotColor = level <= (difficulty as number)
                  ? (difficulty as number) <= 2 ? colors.green : (difficulty as number) === 3 ? colors.accent : "#b33"
                  : colors.line;
                return <View key={level} style={[styles.difficultyDot, { backgroundColor: dotColor, borderColor: dotColor }]} />;
              })}
            </View>
            <Text style={styles.difficultyNum}>{difficulty} / 5</Text>
            <View style={styles.difficultyTag}>
              <Text style={styles.difficultyTagText}>{(difficulty as number) <= 2 ? "轻松" : (difficulty as number) === 3 ? "适中" : "挑战"}</Text>
            </View>
          </View>
          <Text style={styles.decisionDesc}>{work.literaryCategory} / {work.literarySubcategory}</Text>
        </View>

        {guide ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>导读判断</Text>
            <GuideToggle label="一句话定位" value={guide.oneSentencePositioning} />
            <GuideToggle label="为什么经典" value={guide.whyClassic} />
            <GuideToggle label="推荐理由" value={guide.whyRead} />
            <GuideToggle label="适合谁" value={guide.suitableFor} />
            <GuideToggle label="不适合谁" value={(guide as any).notSuitableFor || "待确认"} />
            <GuideToggle label="阅读前最好知道" value={(guide as any).readingPrerequisites || "待确认"} />
            <GuideToggle label="难度说明" value={guide.difficultyReason} />
            <GuideToggle label="阅读建议" value={guide.readingAdvice} />
          </View>
        ) : null}

        {awardMentions.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>获奖记录</Text>
            {awardMentions.map((m, i) => (
              <View key={i} style={styles.awardMention}>
                <Text style={styles.awardMentionName}>{m.awardName}</Text>
                <Text style={styles.awardMentionEdition}>{m.edition}{m.year ? `（${m.year}年）` : ""}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.mapSection}>
          <Pressable onPress={() => setShowMovements((prev) => !prev)} style={styles.mapToggle}>
            <Text style={styles.mapToggleLabel}>所属流派 ({linkedMovements.length})</Text>
            <Text style={styles.mapToggleArrow}>{showMovements ? "▲" : "▼"}</Text>
          </Pressable>
          {showMovements && linkedMovements.length > 0 ? (
            <View style={styles.chipGroup}>
              {linkedMovements.map((movement) => (
                <Link key={movement.id} href={`/movement/${movement.id}` as any} asChild>
                  <Pressable style={styles.chip}><Text style={styles.chipText}>{movement.label}</Text></Pressable>
                </Link>
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.mapSection}>
          <Pressable onPress={() => setShowAllPaths((prev) => !prev)} style={styles.mapToggle}>
            <Text style={styles.mapToggleLabel}>阅读路径 ({linkedPaths.length})</Text>
            <Text style={styles.mapToggleArrow}>{showAllPaths ? "▲" : "▼"}</Text>
          </Pressable>
          {showAllPaths && linkedPaths.length > 0 ? (
            <View style={styles.chipGroup}>
              {linkedPaths.map((path: any) => (
                <Link key={path.id} href={`/path/${path.slug}` as any} asChild>
                  <Pressable style={styles.chip}><Text style={styles.chipText}>{path.title}</Text></Pressable>
                </Link>
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>

      <Modal visible={showShareCard} transparent animationType="fade" onRequestClose={() => setShowShareCard(false)}>
        <Pressable style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.5)"}} onPress={() => setShowShareCard(false)}>
          <Pressable onPress={()=>{}} style={{padding:20}}>
            <ShareCard ref={cardRef}
              type="work" title={work.titleDisplayCn} subtitle={work.titleOriginal}
              meta1={work.authorName} meta2={work.literaryCategory}
              meta3={"难度 " + work.difficultyLevel} meta4={linkedMovements[0]?.label}
              positioning={positioning}
              cell1Label="为什么经典" cell1Value={guide?.whyClassic}
              cell2Label="为什么值得读" cell2Value={guide?.whyRead}
              cell3Label="适合谁" cell3Value={guide?.suitableFor}
              cell4Label="阅读建议" cell4Value={guide?.readingAdvice}
            />
            <Pressable onPress={async () => { try { const uri = await captureRef(cardRef, {format:"png",quality:0.9}); await Share.share({url:uri}); } catch {} }}
              style={{marginTop:12,padding:14,backgroundColor:"#7b3f2d",alignItems:"center"}}>
              <Text style={{color:"#fffaf1",fontWeight:"800",fontSize:14}}>分享为图片</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function GuideToggle({ label, value }: { label: string; value: string }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={[styles.guideToggleWrap, open && styles.guideToggleWrapOpen]}>
      <Pressable onPress={() => setOpen((p) => !p)} style={styles.guideToggleRow}>
        <Text style={styles.guideToggleLabel}>{label}</Text>
        <Text style={[styles.guideToggleArrow, open && { color: colors.accent }]}>{open ? "▲" : "▼"}</Text>
      </Pressable>
      {open && <Text style={styles.guideToggleValue}>{value}</Text>}
    </View>
  );
}
