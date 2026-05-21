import { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography } from "@bookpath/design-tokens";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { ErrorBoundary } from "@/components/error-boundary";
import { ThemeProvider } from "@/components/theme-provider";
import { setStorageBackend } from "@bookpath/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Defer storage init to component mount (safe for native)
let storageReady = false;
function initStorage() {
  if (storageReady) return;
  storageReady = true;
  setStorageBackend({
    get: async (key) => { const v = await AsyncStorage.getItem(key); return v ? JSON.parse(v) : null; },
    set: async (key, value) => { await AsyncStorage.setItem(key, JSON.stringify(value)); },
    remove: async (key) => { await AsyncStorage.removeItem(key); },
  });
}

const tabs = [
  { name: "index", title: "首页", icon: "compass-outline" as const, iconActive: "compass" as const },
  { name: "movements", title: "流派", icon: "git-branch-outline" as const, iconActive: "git-branch" as const },
  { name: "works", title: "作品", icon: "book-outline" as const, iconActive: "book" as const },
  { name: "paths", title: "路径", icon: "map-outline" as const, iconActive: "map" as const },
  { name: "more", title: "更多", icon: "grid-outline" as const, iconActive: "grid" as const },
] as const;

function LoadingScreen() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={colors.accent} />
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "NotoSerifSC": require("@expo-google-fonts/noto-serif-sc/400Regular/NotoSerifSC_400Regular.ttf"),
    "NotoSerifSC_700": require("@expo-google-fonts/noto-serif-sc/700Bold/NotoSerifSC_700Bold.ttf"),
    "NotoSerifSC_900": require("@expo-google-fonts/noto-serif-sc/900Black/NotoSerifSC_900Black.ttf"),
  });

  // Initialize storage on mount (not at module level)
  useEffect(() => { initStorage(); }, []);

  if (!fontsLoaded) return <LoadingScreen />;

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Tabs
          screenOptions={{
            headerStyle: { backgroundColor: colors.paper },
            headerTintColor: colors.ink,
            headerTitleStyle: { fontFamily: typography.serif, fontWeight: "700", fontSize: 18 },
            tabBarActiveTintColor: colors.accent,
            tabBarInactiveTintColor: colors.muted,
            tabBarStyle: {
              backgroundColor: colors.paperStrong,
              borderTopColor: colors.line,
              borderTopWidth: StyleSheet.hairlineWidth,
              paddingBottom: 8,
              paddingTop: 4,
              height: 58,
            },
            tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
          }}
        >
          {tabs.map((tab) => (
            <Tabs.Screen key={tab.name} name={tab.name} options={{
              title: tab.title,
              tabBarIcon: ({ focused, color, size }: any) => (
                <Ionicons name={focused ? tab.iconActive : tab.icon} size={size - 2} color={color} />
              ),
            }} />
          ))}
          <Tabs.Screen name="movement/[id]" options={{ href: null }} />
          <Tabs.Screen name="work/[slug]" options={{ href: null }} />
          <Tabs.Screen name="path/[slug]" options={{ href: null }} />
          <Tabs.Screen name="award/[slug]" options={{ href: null }} />
          <Tabs.Screen name="author/[id]" options={{ href: null }} />
          <Tabs.Screen name="start" options={{ href: null }} />
          <Tabs.Screen name="beginner" options={{ href: null }} />
          <Tabs.Screen name="classics" options={{ href: null }} />
          <Tabs.Screen name="awards" options={{ href: null }} />
          <Tabs.Screen name="authors" options={{ href: null }} />
          <Tabs.Screen name="favorites" options={{ href: null }} />
          <Tabs.Screen name="reading-list" options={{ href: null }} />
        </Tabs>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.paper },
});
