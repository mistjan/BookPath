import { Pressable, Text } from "react-native";
import { router } from "expo-router";
import { colors } from "@bookpath/design-tokens";

export function GoBack({ title = "" }: { title?: string }) {
  const handleBack = () => {
    // Try Expo Router first (works on native + web)
    try { router.back(); return; } catch {}
    // Fallback: browser history (works on web)
    try { if (typeof window !== "undefined" && window.history) window.history.back(); } catch {}
  };

  return (
    <Pressable
      onPress={handleBack}
      style={{ flexDirection: "row", alignItems: "center", gap: 4, paddingVertical: 2 }}
      accessibilityLabel="返回上一页"
      accessibilityRole="button"
    >
      <Text style={{ fontSize: 24, color: colors.accent, fontWeight: "500", lineHeight: 26, marginTop: -2 }}>‹</Text>
      <Text style={{ fontSize: 17, color: colors.ink, fontWeight: "700", lineHeight: 24 }}>{title}</Text>
    </Pressable>
  );
}
