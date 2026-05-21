import { useRef, useState } from "react";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { Modal, ScrollView, Pressable, Share, StyleSheet, Text, View } from "react-native";
import { readingPaths, works } from "@bookpath/content";
import { slugify } from "@bookpath/core";
import {colors, spacing, typography } from "@bookpath/design-tokens";
import { GoBack } from "@/components/go-back";
import { ShareCard } from "@/components/share-card";
import { captureRef } from "react-native-view-shot";

interface PathStep {
  id: string;
  title: string;
  titleOriginal?: string;
  roleInPath: string;
  reason: string;
  skippable?: boolean;
  skipAllowed?: boolean;
  alternativeTitle?: string;
  work?: {
    slug?: string;
    authorName?: string;
    difficultyLevel?: number;
    literaryCategory?: string;
  };
}

interface PathDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  intro: string;
  targetReader: string;
  type: string;
  pathType: string;
  movementId: string;
  difficultyRange: string;
  difficultyStart: number;
  difficultyEnd: number;
  workCount?: number;
  estimatedBookCount?: number;
  steps: readonly PathStep[];
  aiGenerated: boolean;
  reviewStatus: string;
}

const typedPaths: PathDetail[] = readingPaths as unknown as PathDetail[];

const pathTypeLabel: Record<string, string> = {
  BEGINNER: "入门路径",
  GENRE: "体裁路径",
  REGION: "地区路径",
  AWARD: "奖项路径"
};

const roleLabels: Record<string, string> = {
  ENTRY: "入口",
  FOUNDATION: "基础",
  CORE: "核心",
  ADVANCED: "进阶",
  EXPANSION: "扩展"
};

const roleColors: Record<string, string> = {
  ENTRY: colors.accent,
  FOUNDATION: colors.green,
  CORE: colors.ink,
  ADVANCED: colors.muted,
  EXPANSION: colors.muted
};



export default function PathDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const path = typedPaths.find((p) => p.slug === slug || p.id === slug);

  if (!path) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>未找到路径</Text>
        <Text style={styles.description}>slug: {slug}</Text>
      </View>
    );
  }

  const firstStep = path.steps[0];
  const workCount = path.workCount ?? path.estimatedBookCount ?? path.steps.length;

  const cardRef = useRef(null);
  const [showShare, setShowShare] = useState(false);

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerLeft: () => <GoBack />, title: path.title }} />
      <Pressable onPress={() => setShowShare(true)} style={{position:"absolute",top:12,right:12,zIndex:10,padding:8}}><Text style={{fontSize:18,color:colors.muted}}>↗</Text></Pressable>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>{pathTypeLabel[path.type] ?? path.type}</Text>
          <Text style={styles.title}>{path.title}</Text>
          <Text style={styles.bodyText}>{path.intro}</Text>
        </View>

        {firstStep ? (
          <View style={styles.decisionCard}>
            <Text style={styles.eyebrow}>Start Here</Text>
            <Text style={styles.decisionTitle}>{firstStep.title}</Text>
            <Text style={styles.bodyText}>{path.targetReader}</Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>路径概览</Text>
          <MetaRow label="路径标题" value={path.title} />
          <MetaRow label="目标读者" value={path.targetReader} />
          <MetaRow label="难度范围" value={`${path.difficultyRange} (${path.difficultyStart}-${path.difficultyEnd})`} />
          <MetaRow label="路径类型" value={pathTypeLabel[path.type] ?? path.type} />
          <MetaRow label="作品数量" value={String(workCount)} />
          <MetaRow label="内容状态" value={path.reviewStatus === "AI_DRAFT" ? "待审核" : path.reviewStatus} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>路径步骤</Text>
          <Text style={styles.stepNote}>每一步标明定位、难度和推荐理由。点击作品可查看详情。</Text>
          {path.steps.map((step, index) => (
            <View key={step.id} style={styles.stepCard}>
              <View style={styles.stepNumberRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.stepLine} />
              </View>
              <View style={styles.stepContent}>
                <View style={styles.stepHeader}>
                  <View style={[styles.roleBadge, { borderColor: roleColors[step.roleInPath] ?? colors.muted }]}>
                    <Text style={[styles.roleBadgeText, { color: roleColors[step.roleInPath] ?? colors.muted }]}>
                      {roleLabels[step.roleInPath] ?? step.roleInPath}
                    </Text>
                  </View>
                  {step.skipAllowed ? (
                    <Text style={styles.skippable}>可跳过</Text>
                  ) : null}
                </View>
                {step.work?.slug ? (
                  <Link href={`/work/${step.work.slug}` as any} asChild>
                    <Pressable>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                    </Pressable>
                  </Link>
                ) : (
                  <Text style={styles.stepTitle}>{step.title}</Text>
                )}
                {step.work ? (
                  <View style={styles.stepWorkMeta}>
                    {step.work.authorName ? (
                      <Link href={`/author/${slugify(step.work.authorName)}` as any} asChild>
                        <Pressable>
                          <Text style={styles.stepMetaLink}>{step.work.authorName}</Text>
                        </Pressable>
                      </Link>
                    ) : null}
                    {step.work.difficultyLevel ? <Text style={styles.stepMetaText}>难度 {step.work.difficultyLevel}</Text> : null}
                  </View>
                ) : null}
                <Text style={styles.stepReason}>{step.reason}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal visible={showShare} transparent animationType="fade" onRequestClose={() => setShowShare(false)}>
        <Pressable style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.5)"}} onPress={() => setShowShare(false)}>
          <Pressable onPress={()=>{}} style={{padding:20}}>
            <ShareCard ref={cardRef} type="path" title={path.title} meta1={((path as any).steps?.length||0)+" 步"} meta2={((path as any).difficultyRange||"适中")} positioning={(path as any).description||""} steps={(path as any).steps?.slice(0,5).map((s:any) => { const w = works.find((x:any) => x.id === s.workId); return { title: s.title, author: w?.authorName, difficulty: s.difficultyLevel || w?.difficultyLevel, reason: s.reason }; }) || []} />
            <Pressable onPress={async () => { try { const uri = await captureRef(cardRef, { format: "png", quality: 0.9 }); await Share.share({ url: uri }); } catch {} }} style={{marginTop:12,padding:14,backgroundColor:"#7b3f2d",alignItems:"center"}}><Text style={{color:"#fffaf1",fontWeight:"800",fontSize:14}}>分享为图片</Text></Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={sr.metaRow}>
      <Text style={sr.metaLabel}>{label}</Text>
      <Text style={sr.metaValue}>{value}</Text>
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
  bodyText: { color: colors.ink, fontSize: 15, lineHeight: 26 },
  decisionCard: { gap: 6, padding: spacing.cardPadding, borderColor: colors.accent, borderWidth: 1, backgroundColor: colors.paperStrong },
  decisionTitle: { color: colors.ink, fontSize: 17, fontWeight: "800" },
  section: { gap: 8 },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: "800", marginBottom: 2 },
  stepNote: { color: colors.muted, fontSize: 13, marginBottom: 4 },
  stepCard: { flexDirection: "row" },
  stepNumberRow: { alignItems: "center", width: 32 },
  stepNumber: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.accent, alignItems: "center", justifyContent: "center" },
  stepNumberText: { color: colors.paperStrong, fontSize: 12, fontWeight: "800" },
  stepLine: { width: 2, flex: 1, backgroundColor: colors.line, marginTop: 4 },
  stepContent: { flex: 1, gap: 6, paddingBottom: 20, paddingLeft: 10, paddingTop: 2 },
  stepHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  roleBadge: { borderWidth: 1, paddingHorizontal: 6, paddingVertical: 2 },
  roleBadgeText: { fontSize: 10, fontWeight: "700" },
  skippable: { color: colors.muted, fontSize: 11 },
  stepTitle: { color: colors.ink, fontSize: 16, fontWeight: "700" },
  stepWorkMeta: { flexDirection: "row", gap: 8, alignItems: "center" },
  stepMetaText: { color: colors.muted, fontSize: 12 },
  stepMetaLink: { color: colors.accent, fontSize: 12, fontWeight: "700", textDecorationLine: "underline" },
  stepReason: { color: colors.ink, fontSize: 13, lineHeight: 21 }
});

const sr = StyleSheet.create({
  metaRow: { flexDirection: "row", paddingVertical: 6, paddingHorizontal: 10, borderColor: colors.line, borderWidth: StyleSheet.hairlineWidth, backgroundColor: colors.paperStrong, gap: 8 },
  metaLabel: { color: colors.muted, fontSize: 13, width: 80 },
  metaValue: { color: colors.ink, fontSize: 13, flex: 1 }
});
