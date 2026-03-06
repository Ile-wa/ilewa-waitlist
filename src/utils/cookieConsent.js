const CONSENT_KEY = 'ilewa_cookie_consent';
const CONSENT_VERSION = 1;

export const getConsent = () => {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const setConsent = (preferences) => {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({
      ...preferences,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    })
  );
};

export const hasConsented = () => getConsent() !== null;
