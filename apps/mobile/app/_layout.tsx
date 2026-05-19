import { Tabs } from "expo-router";
import { colors } from "@bookpath/design-tokens";
import { mainTabs } from "../constants/navigation";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.paper },
        headerTintColor: colors.ink,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.paperStrong,
          borderTopColor: colors.line
        }
      }}
    >
      {mainTabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title
          }}
        />
      ))}
    </Tabs>
  );
}
