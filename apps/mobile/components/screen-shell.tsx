import type React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "@bookpath/design-tokens";

type ScreenShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function ScreenShell({ eyebrow, title, description, children }: ScreenShellProps) {
  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {children ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: spacing.gap,
    padding: spacing.pageX,
    backgroundColor: colors.paper
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0
  },
  title: {
    color: colors.ink,
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 40
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 27
  },
  body: {
    gap: spacing.gap,
    marginTop: spacing.sectionY
  }
});
