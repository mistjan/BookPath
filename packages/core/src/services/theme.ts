// Theme / dark mode service
import { storage } from "./storage";

const KEY = "@bookpath/theme";

export type ThemeMode = "light" | "dark" | "system";

export async function getTheme(): Promise<ThemeMode> {
  return (await storage.get<ThemeMode>(KEY)) || "system";
}

export async function setTheme(mode: ThemeMode): Promise<void> {
  await storage.set(KEY, mode);
}
