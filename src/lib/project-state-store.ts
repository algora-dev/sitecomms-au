import { parseProjectState, PROJECT_STATE_KEY } from "./jurisdictions";

type PreferenceStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;
/** Lazy storage access keeps SSR safe; the only persisted value is a validated state code. */
export function createProjectStateStore(getStorage: () => PreferenceStorage) {
  let memoryState = "";
  let memoryOnly = false;
  return {
    getSnapshot(): string {
      if (memoryOnly) return memoryState;
      try { return parseProjectState(getStorage().getItem(PROJECT_STATE_KEY)) ?? ""; }
      catch { return memoryState; }
    },
    set(value: unknown): void {
      memoryState = parseProjectState(value) ?? "";
      if (memoryOnly) return;
      try {
        const storage = getStorage();
        if (memoryState) storage.setItem(PROJECT_STATE_KEY, memoryState);
        else storage.removeItem(PROJECT_STATE_KEY);
      } catch {
        // A quota/privacy restriction may block writes even when reads succeed.
        memoryOnly = true;
      }
    },
  };
}
