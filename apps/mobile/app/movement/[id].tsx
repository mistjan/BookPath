import { useRef, useState } from "react";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { Modal, ScrollView, Pressable, Share, StyleSheet, Text, View } from "react-native";
import { movements, readingPaths, works } from "@bookpath/content";
import { getWorkById } from "@bookpath/core";
import { colors, spacing, typography } from "@bookpath/design-tokens";
import { GoBack } from "@/components/go-back";
import { ShareCard } from "@/components/share-card";
import { captureRef } from "react-native-view-shot";

const roleGroups = [
  { id: "ENTRY", label: "入口作品", note: "适合作为第一步，先建立直观感受。" },
  { id: "FOUNDATION", label: "基础作品", note: "补足流派常见写法和基本问题。" },
  { id: "CORE", label: "核心作品", note: "进入这个流派最有代表性的阅读区域。" },
  { id: "ADVANCED", label: "进阶作品", note: "难度更高，建议已有一点阅读经验后再读。" },
  { id: "EXPANSION", label: "扩展作品", note: "用于连接相邻流派、地区或更复杂的问题。" }
] as const;

export default function MovementDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const movement = movements.find((movement) => movement.id === id);

  if (!movement) {
    return (
      <View style={styles.screen}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={{flexDirection:"row",alignItems:"center",paddingLeft:12,paddingRight:20,paddingVertical:10,borderBottomColor:colors.line,borderBottomWidth:StyleSheet.hairlineWidth,backgroundColor:"#f7f0e5"}}>
          <GoBack title="未找到" />
        </View>
        <Text style={styles.description}>id: {id}</Text>
      </View>
    );
  }

  const entry = movement.guideCards.filter((card) => card.roleInPath === "ENTRY");
  const firstBook = entry[0] ?? movement.guideCards[0];
  const relatedPaths = readingPaths.filter((p: any) => p.movementId === movement.id || (p.title||"").includes(movement.label));
  const relatedMovementObjects = (movement.relatedMovements as readonly string[])
    .map((name) => movements.find((m) => m.label === name || m.id === name))
    .filter(Boolean) as unknown as typeof movements;

  const cardRef = useRef(null);
  const [showShare, setShowShare] = useState(false);
  const [showRelated, setShowRelated] = useState(false);
  const [showPaths, setShowPaths] = useState(false);

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{flexDirection:"row",alignItems:"center",paddingLeft:12,paddingRight:20,paddingVertical:10,borderBottomColor:colors.line,borderBottomWidth:StyleSheet.hairlineWidth,backgroundColor:"#f7f0e5"}}>
        <GoBack title={movement.label} />
        <View style={{flex:1}} />
        <Pressable onPress={() => setShowShare(true)}><Text style={{fontSize:18,color:colors.muted}}>↗</Text></Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>{movement.originalName}</Text>
          <Text style={styles.title}>{movement.label}</Text>
          <Text style={styles.description}>{movement.oneLine}</Text>
        </View>

        {firstBook ? (
          <Link href={`/work/${works.find((w) => w.id === firstBook.workId)?.slug || firstBook.workId}` as any} asChild>
            <Pressable style={styles.startHere} accessibilityRole="link" accessibilityLabel={"第一本先读：" + firstBook.title}>
              <Text style={styles.eyebrow}>Start Here →</Text>
              <Text style={styles.firstBookTitle}>第一本先读：{firstBook.title}</Text>
              <Text style={styles.firstBookNote}>{firstBook.suitability}</Text>
            </Pressable>
          </Link>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.eyebrow}>For Beginners</Text>
          <Text style={styles.sectionTitle}>给新手看的说明</Text>
          <Text style={styles.bodyText}>{(movement as any).beginnerWarning || ""}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.eyebrow}>Context</Text>
          <Text style={styles.sectionTitle}>它为什么出现</Text>
          <Text style={styles.bodyText}>{movement.whyAppeared}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>流派档案</Text>
          <View style={styles.metaTable}>
            <MetaRow label="时期" value={movement.period} />
            <MetaRow label="地区" value={movement.region} />
            <MetaRow label="内容状态" value={movement.reviewStatus === "AI_DRAFT" ? "待审核" : movement.reviewStatus} />
          </View>
        </View>

        <View style={styles.section}>
          <FieldCard label="精确定义" value={movement.definitionPrecise} />
          <FieldCard label="核心特征" value={movement.keyFeatures.join("；")} />
          <FieldCard label="常见误解" value={movement.misunderstandings.join("；")} />
          <FieldCard label="为什么重要" value={movement.importance ?? "待确认"} />
        </View>

        {relatedMovementObjects.length > 0 ? (
          <View style={styles.section}>
            <Pressable onPress={() => setShowRelated(!showRelated)} style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingVertical:10,paddingHorizontal:4,borderBottomColor:colors.line,borderBottomWidth:StyleSheet.hairlineWidth}}>
              <Text style={{color:colors.ink,fontSize:15,fontWeight:"700"}}>相关流派（{relatedMovementObjects.length}）</Text>
              <Text style={{color:colors.accent,fontSize:12}}>{showRelated ? "▲" : "▼"}</Text>
            </Pressable>
            {showRelated && (
              <View style={styles.pillGroup}>
                {relatedMovementObjects.map((relMovement) => (
                  <Link key={relMovement.id} href={`/movement/${relMovement.id}` as any} asChild>
                    <Pressable style={styles.pill}>
                      <Text style={styles.pillText}>{relMovement.label}</Text>
                      <Text style={styles.pillArrow}>→</Text>
                    </Pressable>
                  </Link>
                ))}
              </View>
            )}
          </View>
        ) : null}

        <View style={styles.section}>
          <Pressable onPress={() => setShowPaths(!showPaths)} style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingVertical:10,paddingHorizontal:4,borderBottomColor:colors.line,borderBottomWidth:StyleSheet.hairlineWidth}}>
            <Text style={{color:colors.ink,fontSize:15,fontWeight:"700"}}>阅读路径（{relatedPaths.length}）</Text>
            <Text style={{color:colors.accent,fontSize:12}}>{showPaths ? "▲" : "▼"}</Text>
          </Pressable>
          {showPaths && (
            relatedPaths.length > 0 ? (
              <View style={styles.pillGroup}>
                {relatedPaths.map((path) => (
                  <Link key={(path as any).id} href={`/path/${(path as any).slug}` as any} asChild>
                    <Pressable style={styles.pill}>
                      <Text style={styles.pillText}>{(path as any).title}</Text>
                      <Text style={styles.pillArrow}>→</Text>
                    </Pressable>
                  </Link>
                ))}
              </View>
            ) : (
              <Text style={styles.emptyText}>暂无关联阅读路径</Text>
            )
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>作品分组</Text>
          {roleGroups.map((group) => {
            const cards = movement.guideCards.filter((card) => card.roleInPath === group.id);
            return (
              <View key={group.id} style={styles.roleCard}>
                <Text style={styles.roleLabel}>{group.label}</Text>
                <Text style={styles.roleNote}>{group.note}</Text>
                {cards.length ? cards.map((card) => {
                  const workItem = getWorkById(card.workId);
                  const workSlug = workItem?.slug ?? card.workId;
                  return (
                    <Link key={card.id} href={`/work/${workSlug}` as any} asChild>
                      <Pressable accessibilityRole="link" accessibilityLabel={card.title} style={({ pressed }) => [styles.workLink, pressed && styles.workLinkPressed]}>
                        <Text style={styles.workLinkTitle}>{card.title}</Text>
                        <Text style={styles.workLinkMeta}>难度 {card.difficultyLevel}{(card as any).caution ? " / 建议暂缓" : ""}</Text>
                      </Pressable>
                    </Link>
                  );
                }) : <Text style={styles.emptyText}>暂无对应作品</Text>}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <Modal visible={showShare} transparent animationType="fade" onRequestClose={() => setShowShare(false)}>
        <Pressable style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.5)"}} onPress={() => setShowShare(false)}>
          <Pressable onPress={()=>{}} style={{padding:20}}>
            <ShareCard ref={cardRef}
              type="movement" title={movement.label} slug={movement.id} subtitle={movement.originalName}
              meta1={movement.period} meta2={movement.region}
              positioning={movement.oneLine}
              cell1Label="核心特征" cell1Value={movement.keyFeatures.slice(0,2).join("、")}
              cell2Label="常见误解" cell2Value={movement.misunderstandings.slice(0,2).join("、")}
              cell3Label="代表作品" cell3Value={movement.guideCards.slice(0,4).map((g:any)=>g.title.replace(/[《》]/g,"")).join("、")}
              cell4Label="相关流派" cell4Value={relatedMovementObjects.slice(0,3).map((m:any)=>m.label).join("、")}
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

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { gap: 24, padding: spacing.pageX, paddingBottom: 60 },
  header: { gap: spacing.gap },
  eyebrow: { color: colors.accent, fontSize: 12, fontWeight: "800" },
  title: { color: colors.ink, fontSize: 34, fontWeight: "900", lineHeight: 40, fontFamily: typography.serif },
  description: { color: colors.muted, fontSize: 16, lineHeight: 27 },
  startHere: { gap: 6, padding: spacing.cardPadding, borderColor: colors.accent, borderWidth: 1, backgroundColor: colors.paperStrong },
  firstBookTitle: { color: colors.ink, fontSize: 16, fontWeight: "700" },
  firstBookNote: { color: colors.muted, fontSize: 13, lineHeight: 20 },
  section: { gap: spacing.gap },
  sectionTitle: { color: colors.ink, fontSize: 22, fontWeight: "800" },
  bodyText: { color: colors.ink, fontSize: 15, lineHeight: 26 },
  metaTable: { gap: 1, borderColor: colors.line, borderWidth: 1 },
  metaRow: { flexDirection: "row", padding: 10, backgroundColor: colors.paperStrong, borderBottomColor: colors.line, borderBottomWidth: StyleSheet.hairlineWidth },
  metaLabel: { color: colors.muted, fontSize: 14, width: 80 },
  metaValue: { color: colors.ink, fontSize: 14, flex: 1 },
  fieldCard: { gap: 4, padding: spacing.cardPadding, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paperStrong, marginTop: 1 },
  fieldLabel: { color: colors.accent, fontSize: 12, fontWeight: "800" },
  fieldValue: { color: colors.ink, fontSize: 14, lineHeight: 23 },
  pillGroup: { gap: 8 },
  pill: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 12, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paperStrong },
  pillText: { color: colors.ink, fontSize: 14, fontWeight: "600" },
  pillArrow: { color: colors.accent, fontSize: 14 },
  roleCard: { gap: 6, padding: spacing.cardPadding, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paperStrong },
  roleLabel: { color: colors.accent, fontSize: 13, fontWeight: "800" },
  roleNote: { color: colors.muted, fontSize: 12 },
  workLink: { gap: 2, paddingTop: 6, paddingBottom: 4, paddingHorizontal: 8, marginHorizontal: -8, borderTopColor: colors.line, borderTopWidth: StyleSheet.hairlineWidth },
  workLinkPressed: { backgroundColor: colors.paper },
  workLinkTitle: { color: colors.ink, fontSize: 14, fontWeight: "600" },
  workLinkMeta: { color: colors.muted, fontSize: 12 },
  emptyText: { color: colors.muted, fontSize: 13 },
});

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaRow}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

function FieldCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.fieldCard}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}


