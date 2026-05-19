import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "@bookpath/design-tokens";

type MetricCardProps = {
  label: string;
  value: string | number;
};

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 8,
    padding: spacing.cardPadding,
    borderColor: colors.line,
    borderWidth: 1,
    backgroundColor: colors.paperStrong
  },
  label: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "800"
  },
  value: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "900"
  }
});
