// Storage abstraction layer
// Platform-specific backends are injected at app startup

export interface StorageBackend {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
}

let backend: StorageBackend | null = null;

export function setStorageBackend(b: StorageBackend) {
  backend = b;
}

function check(): StorageBackend {
  if (!backend) throw new Error("Storage backend not set — call setStorageBackend at app startup");
  return backend;
}

export const storage = {
  async get<T>(key: string): Promise<T | null> { return check().get<T>(key); },
  async set<T>(key: string, value: T): Promise<void> { return check().set<T>(key, value); },
  async remove(key: string): Promise<void> { return check().remove(key); },
};
