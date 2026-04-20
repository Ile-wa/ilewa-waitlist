import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Copy, Check, Share2 } from "lucide-react";

const TIERS = [
  { count: 3, label: "Early access" },
  { count: 10, label: "General badge" },
  { count: 25, label: "VIP General status" },
  { count: 50, label: "Private beta access" },
];

function nextTier(referralCount) {
  return TIERS.find((t) => referralCount < t.count) || null;
}

export default function GeneralsSuccess({ result }) {
  const [copied, setCopied] = useState(false);

  const isReturning = result.status === "already_registered";
  const position = result.position;
  const referralCount = result.referral_count ?? 0;
  const shareUrl = result.share_url;
  const tier = nextTier(referralCount);
  const progress = tier ? Math.min(100, (referralCount / tier.count) * 100) : 100;

  const shareMessage =
    `I just joined the early access list for Ilewa, a new platform fixing the rental chaos in Lagos. ` +
    `If you join through my link we both move up the queue. ${shareUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {
      // Fallback: select the input so the user can copy manually
    }
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-[8px] border border-border-light p-6 sm:p-8"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-brand-blue-bg rounded-full flex items-center justify-center shrink-0">
          <CheckCircle className="w-5 h-5 text-brand-blue" />
        </div>
        <h3 className="text-lg font-bold text-text-primary">
          {isReturning ? "Welcome back, General" : "Welcome, General"}
        </h3>
      </div>

      {position != null && (
        <div className="mb-6 pb-6 border-b border-border-light">
          <p className="text-xs font-medium text-text-secondary uppercase tracking-[0.2em] mb-1.5">
            Your rank
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Ilewa General #{position.toLocaleString()}
          </p>
        </div>
      )}

      {tier && (
        <div className="mb-6">
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-sm font-semibold text-text-primary">
              Next reward: {tier.label}
            </p>
            <p className="text-xs text-text-secondary">
              {referralCount} / {tier.count}
            </p>
          </div>
          <div className="h-1.5 bg-bg-page rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-brand-blue rounded-full"
            />
          </div>
          <p className="text-xs text-text-secondary mt-2 leading-relaxed">
            Each friend you invite jumps you up the ranks.
          </p>
        </div>
      )}

      {shareUrl && (
        <>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-[0.5px] mb-2">
            Your invite link
          </p>
          <div className="flex items-stretch gap-2 mb-4">
            <input
              type="text"
              readOnly
              value={shareUrl}
              onClick={(e) => e.target.select()}
              className="flex-1 min-w-0 px-3 py-2.5 border border-border-light rounded-[8px] text-xs sm:text-sm text-text-primary bg-bg-page focus:outline-none focus:ring-2 focus:ring-brand-blue-bg focus:border-brand-blue"
            />
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 bg-text-primary text-white rounded-[8px] text-xs font-semibold hover:opacity-90 transition-all"
              aria-label="Copy invite link"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </motion.button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#25D366] text-white rounded-[8px] text-xs font-semibold hover:opacity-90 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              WhatsApp
            </a>
            <a
              href={twitterHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-black text-white rounded-[8px] text-xs font-semibold hover:opacity-90 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              Twitter
            </a>
          </div>
        </>
      )}

      <p className="text-xs text-text-secondary leading-relaxed mt-5">
        {isReturning
          ? "You were already on the list — your rank and link are unchanged."
          : "We'll email you when it's time. Share your link now to move up."}
      </p>
    </motion.div>
  );
}
