import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { colors as lightColors, darkColors } from "@bookpath/design-tokens";
import { getTheme, setTheme } from "@bookpath/core";
import type { ThemeMode } from "@bookpath/core";

export type ColorSet = typeof lightColors;

interface ThemeCtx {
  colors: ColorSet;
  isDark: boolean;
  mode: ThemeMode;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
  colors: lightColors, isDark: false, mode: "system",
  toggle: () => {},
});
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [sysDark, setSysDark] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await getTheme();
      setModeState(saved);
    })();
    setSysDark(Appearance.getColorScheme() === "dark");
    const sub = Appearance.addChangeListener(({ colorScheme }) => setSysDark(colorScheme === "dark"));
    return () => sub.remove();
  }, []);

  const isDark = mode === "dark" || (mode === "system" && sysDark);
  const colors: any = isDark ? darkColors : lightColors;

  const toggle = async () => {
    const next: ThemeMode = isDark ? "light" : "dark";
    await setTheme(next);
    setModeState(next);
  };

  return (
    <ThemeContext.Provider value={{ colors, isDark, mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
