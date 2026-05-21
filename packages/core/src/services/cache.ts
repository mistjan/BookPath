// Offline data cache
import { storage } from "./storage";

const DATA_KEY = "@bookpath/cached-data";
const VER_KEY = "@bookpath/data-version";

export async function cacheData(data: unknown, version: string): Promise<void> {
  await storage.set(DATA_KEY, data);
  await storage.set(VER_KEY, version);
}

export async function getCachedData<T>(expectedVersion: string): Promise<T | null> {
  const ver = await storage.get<string>(VER_KEY);
  if (ver !== expectedVersion) return null;
  return storage.get<T>(DATA_KEY);
}

export async function clearCache(): Promise<void> {
  await storage.remove(DATA_KEY);
  await storage.remove(VER_KEY);
}
