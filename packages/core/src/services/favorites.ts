// Favorites service
import { storage } from "./storage";

const KEY = "@bookpath/favorites";

interface FavoriteEntry {
  savedAt: string;
  title: string;
}

interface FavoritesData {
  [workId: string]: FavoriteEntry;
}

async function load(): Promise<FavoritesData> {
  return (await storage.get<FavoritesData>(KEY)) || {};
}

async function save(data: FavoritesData): Promise<void> {
  await storage.set(KEY, data);
}

export async function isFavorited(workId: string): Promise<boolean> {
  const data = await load();
  return !!data[workId];
}

export async function toggleFavorite(workId: string, title: string): Promise<boolean> {
  const data = await load();
  if (data[workId]) {
    delete data[workId];
    await save(data);
    return false; // removed
  } else {
    data[workId] = { savedAt: new Date().toISOString(), title };
    await save(data);
    return true; // added
  }
}

export async function getAllFavorites(): Promise<FavoritesData> {
  return load();
}

export async function removeFavorite(workId: string): Promise<void> {
  const data = await load();
  delete data[workId];
  await save(data);
}
