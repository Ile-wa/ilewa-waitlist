import { useState, useEffect } from 'react';
import { X, Cookie, ChevronDown } from 'lucide-react';
import { hasConsented, setConsent } from '../utils/cookieConsent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    preferences: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasConsented()) setVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const handleAcceptAll = () => {
    setConsent({ essential: true, analytics: true, preferences: true });
    setVisible(false);
  };

  const handleRejectNonEssential = () => {
    setConsent({ essential: true, analytics: false, preferences: false });
    setVisible(false);
  };

  const handleSavePreferences = () => {
    setConsent(preferences);
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-2 md:p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-[8px] shadow-2xl border border-border-light overflow-hidden">
        <div className="p-3 md:p-5">
          {/* Header */}
          <div className="flex items-center gap-2 md:gap-3 md:items-start md:mb-3">
            <Cookie className="w-4 h-4 md:w-5 md:h-5 text-brand-blue shrink-0" />
            <p className="flex-1 text-xs md:text-sm text-text-primary leading-snug md:leading-relaxed">
              We use cookies to improve your experience.{' '}
              <a href="#" className="text-brand-blue underline hover:text-[#4a6dcc]">
                Privacy Policy
              </a>
            </p>
            <button
              onClick={handleRejectNonEssential}
              className="text-text-muted hover:text-text-secondary shrink-0"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Manage Preferences (expandable) */}
          {expanded && (
            <div className="mb-3 mt-2 space-y-2 pl-6 md:pl-8">
              <label className="flex items-center gap-2 text-sm text-text-secondary">
                <input type="checkbox" checked disabled className="accent-brand-blue" />
                <span>Essential <span className="text-xs text-text-muted">(always on)</span></span>
              </label>
              <label className="flex items-center gap-2 text-sm text-text-secondary">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                  className="accent-brand-blue"
                />
                Analytics
              </label>
              <label className="flex items-center gap-2 text-sm text-text-secondary">
                <input
                  type="checkbox"
                  checked={preferences.preferences}
                  onChange={(e) => setPreferences(prev => ({ ...prev, preferences: e.target.checked }))}
                  className="accent-brand-blue"
                />
                Preferences
              </label>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 mt-2 md:mt-0 pl-6 md:pl-8 flex-wrap">
            <button
              onClick={handleAcceptAll}
              className="px-3 md:px-4 py-1.5 md:py-2 bg-brand-blue text-white text-xs md:text-sm font-medium rounded-[8px] hover:bg-[#4a6dcc] transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={() => {
                if (expanded) {
                  handleSavePreferences();
                } else {
                  setExpanded(true);
                }
              }}
              className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-text-secondary border border-border-light rounded-[8px] hover:bg-bg-page transition-colors flex items-center gap-1"
            >
              {expanded ? 'Save' : 'Manage'}
              {!expanded && <ChevronDown className="w-3 h-3" />}
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
