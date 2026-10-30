/**
 * Safe LocalStorage manager for Viksit Shetkari.
 * Prefix: vs_
 * Features:
 * - Schema version check and migration / safe fallback
 * - QuotaExceededError detection with graceful handling
 * - Deterministic fallback to initial seed state
 */

export const STORAGE_KEYS = {
  SCHEMA_VERSION: 'vs_schema_version',
  STATE: 'vs_state',
  LANGUAGE: 'vs_language',
  CHAT: 'vs_chat_history',
};

export const CURRENT_SCHEMA_VERSION = '1.0.0';

/**
 * Validates that an object contains essential keys expected in app state.
 */
export function isValidState(state) {
  if (!state || typeof state !== 'object') return false;
  const requiredKeys = ['currentUser', 'products', 'crops', 'orders', 'applications', 'posts', 'notifications', 'activity'];
  return requiredKeys.every((key) => key in state && Array.isArray(state[key]) || (key === 'currentUser' && typeof state[key] === 'object'));
}

/**
 * Loads state from localStorage. Returns null if invalid or corrupt.
 */
export function loadSavedState() {
  try {
    const version = localStorage.getItem(STORAGE_KEYS.SCHEMA_VERSION);
    if (!version || version !== CURRENT_SCHEMA_VERSION) {
      // In a production app, incremental migration functions would run here.
      // For this version, outdated schemas trigger a clean migration back to verified seed state.
      return null;
    }

    const raw = localStorage.getItem(STORAGE_KEYS.STATE);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!isValidState(parsed)) {
      console.warn('Viksit Shetkari: Stored state failed structural validation. Falling back to verified seed data.');
      return null;
    }

    return parsed;
  } catch (err) {
    console.error('Viksit Shetkari: Error reading localStorage:', err);
    return null;
  }
}

/**
 * Saves state to localStorage safely, guarding against QuotaExceededError.
 * Returns { success: boolean, quotaError?: boolean, error?: string }
 */
export function saveState(state) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEYS.STATE, serialized);
    localStorage.setItem(STORAGE_KEYS.SCHEMA_VERSION, CURRENT_SCHEMA_VERSION);
    return { success: true };
  } catch (err) {
    const isQuota =
      err &&
      (err.name === 'QuotaExceededError' ||
        err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
        err.code === 22 ||
        err.code === 1014);

    console.error('Viksit Shetkari: Storage save error', err);
    return {
      success: false,
      quotaError: Boolean(isQuota),
      error: isQuota
        ? 'Local storage quota exceeded! Please clear unused browser data.'
        : 'Failed to persist state locally.',
    };
  }
}

/**
 * Clears all vs_ keys and resets demo data.
 */
export function clearAllAppData() {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (err) {
    console.error('Error clearing app data', err);
    return false;
  }
}
