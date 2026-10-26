/**
 * Local storage utility with type-safe get/set methods.
 * Use STORAGE_KEYS from @/constants/localStorageKeys for key names.
 */

export type StorageValue = string | number | boolean | object | null;

const isBrowser = (): boolean => typeof window !== "undefined";

/**
 * Set an item in local storage.
 * Non-string values are JSON stringified.
 */
export function setLocalStorageItem<T extends StorageValue>(
  key: string,
  value: T,
): void {
  try {
    const serialized =
      typeof value === "string" ? value : JSON.stringify(value);

    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Failed to set localStorage key "${key}"`, error);
  }
}

/**
 * Get an item from local storage as a string.
 */
export function getLocalStorageItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Failed to read localStorage key "${key}"`, error);
    return null;
  }
}

/**
 * Get an item from local storage and parse it as JSON.
 * Returns a default value if parsing fails or key is missing.
 */
export function getLocalStorageItemAs<T>(
  key: string,
  defaultValue: T | null = null,
): T | null {
  const raw = getLocalStorageItem(key);
  if (!raw) return defaultValue;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Remove an item from local storage.
 */
export function removeLocalStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove localStorage key "${key}"`, error);
  }
}

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Failed to clear localStorage", error);
  }
};
