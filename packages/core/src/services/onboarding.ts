// Onboarding / first-launch service
import { storage } from "./storage";

const KEY = "@bookpath/onboarding";

export async function isFirstLaunch(): Promise<boolean> {
  const val = await storage.get<boolean>(KEY);
  return val === null || val === undefined;
}

export async function markOnboardingComplete(): Promise<void> {
  await storage.set(KEY, true);
}
