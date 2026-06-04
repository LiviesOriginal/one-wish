const PREFIX = "wish:";

function useLocalStorage() {
  return {
    async list(prefix) {
      const keys = Object.keys(localStorage).filter((k) => k.startsWith(prefix));
      return { keys };
    },
    async get(key) {
      const value = localStorage.getItem(key);
      return value ? { value } : null;
    },
    async set(key, value) {
      localStorage.setItem(key, value);
    },
    async remove(key) {
      localStorage.removeItem(key);
    },
  };
}

/** Uses host `window.storage` when embedded; falls back to localStorage. */
export function getStorage() {
  if (typeof window !== "undefined" && window.storage) {
    return window.storage;
  }
  return useLocalStorage();
}

export async function loadWishHistory() {
  const storage = getStorage();
  const list = await storage.list(PREFIX);
  if (!list?.keys?.length) return [];

  const items = [];
  for (const key of list.keys) {
    try {
      const row = await storage.get(key);
      if (row?.value) items.push(JSON.parse(row.value));
    } catch {
      /* skip corrupt */
    }
  }
  items.sort((a, b) => b.ts - a.ts);
  return items;
}

export async function saveWishEntry(entry) {
  const storage = getStorage();
  await storage.set(`${PREFIX}${entry.id}`, JSON.stringify(entry));
}

export async function clearWishHistory() {
  const storage = getStorage();
  const list = await storage.list(PREFIX);
  if (!list?.keys) return;
  await Promise.all(
    list.keys.map((key) => (storage.remove ? storage.remove(key) : localStorage.removeItem(key)))
  );
}

/** Install localStorage adapter when no host storage is present. */
export function ensureStorage() {
  if (typeof window === "undefined" || window.storage) return;
  window.storage = useLocalStorage();
}
