/**
 * Referral attribution helpers.
 *
 * Captures ?ref=<code> from the URL on page load, stashes it in sessionStorage
 * under the key `ilewa_ref`, and strips the query param from the visible URL
 * so users who share from their address bar don't double-attribute themselves.
 *
 * sessionStorage (not cookies) is deliberate: ephemeral + first-party means
 * we sidestep GDPR/NDPR consent-banner requirements on the signup page.
 */

const STORAGE_KEY = 'ilewa_ref';

export function captureReferralFromUrl() {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const code = params.get('ref');
  if (!code) return getStoredReferralCode();

  try {
    window.sessionStorage.setItem(STORAGE_KEY, code);
  } catch (_) {
    // sessionStorage unavailable (private mode, disabled) — silently no-op.
  }

  // Clean up the URL so the ref doesn't persist in screenshots/bookmarks.
  params.delete('ref');
  const qs = params.toString();
  const url = window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash;
  window.history.replaceState({}, '', url);

  return code;
}

export function getStoredReferralCode() {
  if (typeof window === 'undefined') return null;
  try {
    return window.sessionStorage.getItem(STORAGE_KEY);
  } catch (_) {
    return null;
  }
}

export function clearStoredReferralCode() {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch (_) {
    // ignore
  }
}
