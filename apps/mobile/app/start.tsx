import { useMemo, useState } from "react";
import { Link} from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { works } from "@bookpath/content";
import { colors, spacing, typography } from "@bookpath/design-tokens";
import { GoBack } from "@/components/go-back";

type Mode = "menu" | "directed" | "result";

const difficultyOptions = [
  { value: "", label: "不限" },
  { value: "1,2", label: "轻松入门" },
  { value: "3", label: "适中" },
  { value: "4,5", label: "挑战" },
];

function shufflePick<T>(items: readonly T[], count: number, seen: Set<string>, keyFn: (item: T) => string): T[] {
  const available = items.filter((item) => !seen.has(keyFn(item)));
  if (available.length === 0) return items.slice(0, count);
  const pool = [...available];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

export default function StartScreen() {
  const [mode, setMode] = useState<Mode>("menu");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [step, setStep] = useState(1);
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<readonly (typeof works[number])[]>([]);

  const pickResults = (cat: string, sub: string, diff: string) => {
    const filtered = (works as readonly (typeof works[number])[]).filter((w) => {
      if (cat === "诗歌" && (w.literaryCategory as string) !== "诗歌") return false;
      if (cat === "戏剧" && (w.literaryCategory as string) !== "戏剧") return false;
      if (cat === "非虚构" && (w.workType as string) !== "非虚构" && (w.literaryCategory as string) !== "非虚构") return false;
      if (cat === "小说") {
        if ((w.literaryCategory as string) !== "小说") return false;
        if (sub && sub !== "不限" && w.literarySubcategory !== sub) return false;
      }
      if (diff) {
        const [min, max] = diff.split(",").map(Number);
        if (w.difficultyLevel < min || w.difficultyLevel > max) return false;
      }
      return true;
    });
    const picked = shufflePick(filtered, 5, seenIds, (w) => w.id);
    setResults(picked);
    setSeenIds((prev) => {
      const next = new Set(prev);
      picked.forEach((w) => next.add(w.id));
      return next;
    });
    setMode("result");
  };

  const reshuffle = () => pickResults(category, subcategory, difficulty);

  const reset = () => {
    setMode("menu"); setCategory(""); setSubcategory(""); setDifficulty(""); setStep(1); setResults([]);
  };

  const randomPicks = useMemo(() => {
    const pool = [...works];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, 5);
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Start / 不知道读什么</Text>
          <Text style={styles.title}>不知道读什么？</Text>
          {mode === "menu" && (
            <Text style={styles.description}>随便逛逛或者按方向找——先判断自己想要什么，再选择具体的书。</Text>
          )}
          {mode === "directed" && (
            <Text style={styles.description}>回答几个简单问题，帮你缩小范围。</Text>
          )}
          {mode === "result" && (
            <Text style={styles.description}>以下是为你推荐的作品——不满意可以换一批。</Text>
          )}
        </View>

        {mode === "menu" && (
          <>
            <Pressable onPress={() => pickResults("", "", "")} style={styles.primaryCard}>
              <Text style={styles.primaryCardTitle}>随便看看</Text>
              <Text style={styles.primaryCardDesc}>全库随机抽 5 部</Text>
            </Pressable>
            <Pressable accessibilityLabel="按方向找" onPress={() => setMode("directed")} style={styles.primaryCardAccent}>
              <Text style={styles.primaryCardTitleAccent}>按方向找</Text>
              <Text style={styles.primaryCardDescAccent}>通过几步选择缩小范围</Text>
            </Pressable>
          </>
        )}

        {mode === "directed" && step === 1 && (
          <>
            <Text style={styles.stepTitle}>第一步：想读什么类型？</Text>
            <View style={styles.chipRow}>
              {["小说", "诗歌", "戏剧", "非虚构"].map((cat) => (
                <Pressable
                  key={cat}
                  onPress={() => {
                    setCategory(cat);
                    if (cat === "诗歌" || cat === "戏剧" || cat === "非虚构") {
                      setStep(3);
                    } else {
                      setStep(2);
                    }
                  }}
                  style={styles.chip}
                >
                  <Text style={styles.chipText}>{cat}</Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        {mode === "directed" && step === 2 && category === "小说" && (
          <>
            <Text style={styles.stepTitle}>第二步：什么子类型？</Text>
            {["不限", "现实主义", "科幻小说", "推理小说", "文学小说", "魔幻现实主义", "历史小说", "反乌托邦小说"].map((sub) => (
              <Pressable
                key={sub}
                onPress={() => {
                  setSubcategory(sub === "不限" ? "" : sub);
                  setStep(3);
                }}
                style={styles.chip}
              >
                <Text style={styles.chipText}>{sub}</Text>
              </Pressable>
            ))}
          </>
        )}

        {mode === "directed" && step === 3 && (
          <>
            <Text style={styles.stepTitle}>{category === "小说" ? "第三步" : "第二步"}：想要什么难度？</Text>
            <View style={styles.chipRow}>
              {difficultyOptions.map((opt) => (
                <Pressable
                  key={opt.label}
                  onPress={() => {
                    setDifficulty(opt.value);
                    pickResults(category, subcategory, opt.value);
                  }}
                  style={styles.chip}
                >
                  <Text style={styles.chipText}>{opt.label}</Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        {mode === "result" && (
          <>
            {results.map((work) => (
              <Link key={work.id} href={`/work/${work.slug}` as any} asChild>
                <Pressable style={styles.card}>
                  <Text style={styles.cardTitle}>{work.titleDisplayCn}</Text>
                  <Text style={styles.cardMeta}>
                    {(work.literaryCategory as string)}
                    {work.literarySubcategory && work.literarySubcategory !== work.literaryCategory
                      ? ` / ${work.literarySubcategory}` : ""} · 难度 {work.difficultyLevel}
                  </Text>
                  <Text style={styles.cardDesc}>
                    {work.authorName}
                    {work.countryOrRegion !== "待补充" ? ` · ${work.countryOrRegion}` : ""}
                  </Text>
                </Pressable>
              </Link>
            ))}
            <View style={styles.actionRow}>
              <Pressable onPress={reshuffle} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>换一批</Text>
              </Pressable>
              <Pressable accessibilityLabel="重新选择" onPress={reset} style={styles.actionButtonSecondary}>
                <Text style={styles.actionButtonTextSecondary}>重新选择</Text>
              </Pressable>
            </View>
          </>
        )}

        {mode === "menu" && (
          <>
            <Text style={styles.sectionTitle}>随便看看</Text>
            {randomPicks.map((work) => (
              <Link key={work.id} href={`/work/${work.slug}` as any} asChild>
                <Pressable style={styles.card}>
                  <Text style={styles.cardTitle}>{work.titleDisplayCn}</Text>
                  <Text style={styles.cardMeta}>
                    {(work.literaryCategory as string)}
                    {work.literarySubcategory && work.literarySubcategory !== work.literaryCategory
                      ? ` / ${work.literarySubcategory}` : ""} · 难度 {work.difficultyLevel}
                  </Text>
                  <Text style={styles.cardDesc}>
                    {work.authorName}
                    {work.countryOrRegion !== "待补充" ? ` · ${work.countryOrRegion}` : ""}
                  </Text>
                </Pressable>
              </Link>
            ))}
            <Pressable accessibilityLabel="换一批" onPress={() => pickResults("", "", "")} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>换一批</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { gap: 16, padding: spacing.pageX, paddingBottom: 60 },
  header: { gap: 8, paddingTop: spacing.sectionY },
  eyebrow: { color: colors.accent, fontSize: 12, fontWeight: "800" },
  title: { color: colors.ink, fontSize: 34, fontWeight: "900", lineHeight: 40, fontFamily: typography.serif },
  description: { color: colors.muted, fontSize: 16, lineHeight: 27 },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: "800" },
  stepTitle: { color: colors.ink, fontSize: 18, fontWeight: "700" },
  primaryCard: { padding: 20, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paperStrong },
  primaryCardTitle: { color: colors.ink, fontSize: 20, fontWeight: "800" },
  primaryCardDesc: { color: colors.muted, fontSize: 14, marginTop: 4 },
  primaryCardAccent: { padding: 20, borderColor: colors.accent, borderWidth: 1, backgroundColor: colors.accent },
  primaryCardTitleAccent: { color: colors.paperStrong, fontSize: 20, fontWeight: "800" },
  primaryCardDescAccent: { color: colors.paperStrong, fontSize: 14, marginTop: 4, opacity: 0.85 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paperStrong },
  chipText: { color: colors.ink, fontSize: 15, fontWeight: "600" },
  card: { gap: 4, padding: spacing.cardPadding, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paperStrong },
  cardTitle: { color: colors.ink, fontSize: 18, fontWeight: "800" },
  cardMeta: { color: colors.accent, fontSize: 12, fontWeight: "600" },
  cardDesc: { color: colors.muted, fontSize: 13, lineHeight: 18 },
  actionRow: { flexDirection: "row", gap: 10 },
  actionButton: { flex: 1, padding: 14, borderColor: colors.accent, borderWidth: 1, backgroundColor: colors.accent, alignItems: "center" },
  actionButtonText: { color: colors.paperStrong, fontWeight: "800", fontSize: 14 },
  actionButtonSecondary: { flex: 1, padding: 14, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paperStrong, alignItems: "center" },
  actionButtonTextSecondary: { color: colors.ink, fontWeight: "800", fontSize: 14 },
});

