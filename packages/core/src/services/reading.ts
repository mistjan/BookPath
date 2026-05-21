// Reading progress service
import { storage } from "./storage";

const KEY = "@bookpath/reading";

export type ReadingStatus = "want_to_read" | "reading" | "finished";

interface ReadingEntry {
  status: ReadingStatus;
  updatedAt: string;
}

interface ReadingData {
  [workId: string]: ReadingEntry;
}

const labelMap: Record<ReadingStatus, string> = {
  want_to_read: "想读",
  reading: "在读",
  finished: "已读完",
};

export function statusLabel(s: ReadingStatus): string {
  return labelMap[s];
}

export const allStatuses: ReadingStatus[] = ["want_to_read", "reading", "finished"];

async function load(): Promise<ReadingData> {
  return (await storage.get<ReadingData>(KEY)) || {};
}

async function save(data: ReadingData): Promise<void> {
  await storage.set(KEY, data);
}

export async function setStatus(workId: string, status: ReadingStatus): Promise<void> {
  const data = await load();
  data[workId] = { status, updatedAt: new Date().toISOString() };
  await save(data);
}

export async function getStatus(workId: string): Promise<ReadingStatus | null> {
  const data = await load();
  return data[workId]?.status ?? null;
}

export async function removeStatus(workId: string): Promise<void> {
  const data = await load();
  delete data[workId];
  await save(data);
}

export async function getAllReading(): Promise<ReadingData> {
  return load();
}
