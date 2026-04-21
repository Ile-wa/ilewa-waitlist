import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Loader2,
  Search, Shield, Wallet,
  Home, Users, TrendingUp,
  Play, ChevronDown,
} from "lucide-react";
import PublicHeader from "./components/PublicHeader";
import PublicFooter from "./components/PublicFooter";
import CookieConsent from "./components/CookieConsent";
import GeneralsSuccess from "./components/GeneralsSuccess";
import Leaderboard from "./components/Leaderboard";
import { submitWaitlistForm } from "./services/publicAnuService";
import { captureReferralFromUrl, getStoredReferralCode } from "./utils/referral";

// ─── Generals Signup Form ────────────────────────────────────────────────
const GeneralsForm = ({ defaultRole }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    role_interest: defaultRole || "tenant",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.full_name.trim() || !formData.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitWaitlistForm({
        ...formData,
        referred_by_code: getStoredReferralCode() || undefined,
      });
      setResult(res);
    } catch (err) {
      const msg = err.response?.data;
      if (msg?.email) {
        setError(Array.isArray(msg.email) ? msg.email[0] : msg.email);
      } else if (msg?.detail) {
        setError(msg.detail);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return <GeneralsSuccess result={result} />;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[8px] border border-border-light p-6 sm:p-8">
      <div className="space-y-4">
        <div>
          <label htmlFor="wl-name" className="block text-xs font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5">
            Full name
          </label>
          <input
            id="wl-name"
            type="text"
            required
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            placeholder="Ada Okafor"
            className="w-full px-4 py-3 border border-border-light rounded-[8px] text-sm text-text-primary placeholder:text-text-muted-light focus:outline-none focus:ring-2 focus:ring-brand-blue-bg focus:border-brand-blue transition-all"
          />
        </div>

        <div>
          <label htmlFor="wl-email" className="block text-xs font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5">
            Email
          </label>
          <input
            id="wl-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="ada@example.com"
            className="w-full px-4 py-3 border border-border-light rounded-[8px] text-sm text-text-primary placeholder:text-text-muted-light focus:outline-none focus:ring-2 focus:ring-brand-blue-bg focus:border-brand-blue transition-all"
          />
        </div>

        <div>
          <label htmlFor="wl-role" className="block text-xs font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5">
            I want to
          </label>
          <select
            id="wl-role"
            value={formData.role_interest}
            onChange={(e) => setFormData({ ...formData, role_interest: e.target.value })}
            className="w-full px-4 py-3 border border-border-light rounded-[8px] text-sm text-text-primary bg-white cursor-pointer appearance-none bg-[url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239c9c9c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E&quot;)] bg-no-repeat bg-[right_12px_center] focus:outline-none focus:ring-2 focus:ring-brand-blue-bg focus:border-brand-blue transition-all"
          >
            <option value="tenant">I'm a renter</option>
            <option value="agent">I'm an agent</option>
            <option value="property_owner">I'm a landlord</option>
          </select>
        </div>
      </div>

      {error && (
        <p className="mt-3 text-sm text-text-secondary bg-brand-blue-bg border border-border-light rounded-[8px] px-4 py-2.5">
          {error}
        </p>
      )}

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-brand-blue hover:bg-[#4a6dcc] text-white py-3.5 rounded-[8px] font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Enlisting...
          </>
        ) : (
          <>
            Become a General
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </form>
  );
};

// ─── Tab Content ──────────────────────────────────────────────────────────
const renterBenefits = [
  {
    icon: Search,
    step: "01",
    title: "Search verified listings",
    description: "Every property is checked before it goes live. Real photos, real prices, real availability.",
  },
  {
    icon: Shield,
    step: "02",
    title: "Message agents directly",
    description: "One tap to reach the agent. No middlemen, no forwarded numbers, no ghosting.",
  },
  {
    icon: Wallet,
    step: "03",
    title: "Pay on-platform",
    description: "Inspection fees, rent, agreements \u2014 all tracked. Every naira has a receipt.",
  },
];

const agentBenefits = [
  {
    icon: Home,
    step: "01",
    title: "List and get seen",
    description: "Your listings reach people actively searching. No more spamming WhatsApp groups.",
  },
  {
    icon: Users,
    step: "02",
    title: "Manage inquiries in one place",
    description: "Conversations, bookings, follow-ups \u2014 one dashboard. No scattered DMs.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Get paid professionally",
    description: "Clear payment records. Build a track record that earns more clients over time.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("renters");
  const steps = activeTab === "renters" ? renterBenefits : agentBenefits;

  useEffect(() => {
    captureReferralFromUrl();
  }, []);

  return (
    <div className="min-h-screen">
      <PublicHeader transparent minimal cta={{ label: "Become a General", href: "#generals" }} />

      {/* ── 1. Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop"
            alt="Modern Nigerian property"
            className="w-full h-full object-cover md:object-center object-[65%_center]"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-[5] max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center items-center text-center min-h-[100dvh]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl flex flex-col items-center"
          >
            <h1 className="text-[32px] sm:text-[56px] font-bold text-white leading-[1.08] tracking-[-1.5px] mb-3 sm:mb-5">
              Nigerian property,{" "}
              <br className="hidden sm:block" />
              without the wahala.
            </h1>
            <p className="text-sm sm:text-lg text-white/70 leading-relaxed max-w-md mb-6 sm:mb-10">
              Verified listings. Agents who respond. Every naira receipted.
              The property platform Lagos deserves is almost here.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById("generals")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 sm:gap-2.5 bg-white text-text-primary px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-[8px] font-semibold text-xs sm:text-sm transition-all"
            >
              Become a General
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[5]"
        >
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </section>

      {/* ── 2. Value strip ────────────────────────────────────────── */}
      <section className="border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Verified listings",
                text: "Every property is checked before it goes live. Real photos, real prices, real availability.",
              },
              {
                icon: Users,
                title: "Direct communication",
                text: "One tap to your agent. No middlemen, no forwarded numbers, no one disappearing after payment.",
              },
              {
                icon: Wallet,
                title: "Transparent payments",
                text: "Inspection fees, rent, agreements \u2014 all on-platform. Every naira tracked, every transaction receipted.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`py-10 sm:py-14 ${
                  i < 2 ? "md:border-r md:border-border-light" : ""
                } ${i === 1 ? "md:px-10 lg:px-14" : i === 2 ? "md:pl-10 lg:pl-14" : "md:pr-10 lg:pr-14"}`}
              >
                <div className="w-8 h-8 bg-brand-blue-bg rounded-full flex items-center justify-center mb-4">
                  <item.icon className="w-4 h-4 text-brand-blue" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. How it works ──────────────────────────────────────── */}
      <section id="how-it-works" className="py-10 sm:py-20 bg-bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-8 sm:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-4">
              How Ilewa works
            </h2>
            <p className="text-sm text-text-secondary max-w-md">
              Whether you&rsquo;re searching for a place or managing listings,
              the platform works for your side of the table.
            </p>
          </motion.div>

          {/* Tab Switcher */}
          <div className="flex mb-8 sm:mb-12">
            <div className="inline-flex bg-white rounded-[8px] p-1 border border-border-light">
              <button
                onClick={() => setActiveTab("renters")}
                className={`px-5 sm:px-7 py-2.5 rounded-[6px] font-medium text-sm transition-all ${
                  activeTab === "renters"
                    ? "bg-brand-blue text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                For Renters
              </button>
              <button
                onClick={() => setActiveTab("agents")}
                className={`px-5 sm:px-7 py-2.5 rounded-[6px] font-medium text-sm transition-all ${
                  activeTab === "agents"
                    ? "bg-brand-blue text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                For Agents
              </button>
            </div>
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                  className="bg-white border border-border-light rounded-[8px] p-6 sm:p-8"
                >
                  <span className="text-xs font-semibold text-brand-blue uppercase tracking-[0.2em] mb-4 block">
                    Step {step.step}
                  </span>
                  <h3 className="text-sm font-semibold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── 4. Ilewa Generals ────────────────────────────────────── */}
      <section id="generals" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ y: 15 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs font-medium text-brand-blue uppercase tracking-[0.2em] mb-4">
                Ilewa Generals
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-4">
                Lead the charge.
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-10 max-w-sm">
                The Generals are on the front lines of transforming Nigerian real estate.
                First to test. First to shape. First to experience a marketplace where
                certified agents, verified documents, and rated users set a new standard for trust.
              </p>

              <div className="space-y-8">
                {[
                  {
                    num: "01",
                    title: "Frontline access",
                    text: "Use the full platform while it\u2019s invite-only. Test it. Break it. Shape what ships.",
                  },
                  {
                    num: "02",
                    title: "Direct line to HQ",
                    text: "Your feedback goes straight to the team writing the code. Not a suggestion box \u2014 a war room.",
                  },
                  {
                    num: "03",
                    title: "Founding rank",
                    text: "When Ilewa opens to everyone, Generals keep their status. First in. Never forgotten.",
                  },
                ].map((item) => (
                  <div key={item.num} className="flex items-start gap-4">
                    <span className="text-xs font-semibold text-brand-blue uppercase tracking-[0.2em] mt-0.5 select-none">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary mb-0.5">{item.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 15 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:sticky lg:top-28 order-first lg:order-last"
            >
              <GeneralsForm defaultRole={activeTab === "agents" ? "agent" : "tenant"} />
              <Leaderboard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. Ilewa Labs ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ y: 15 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs font-medium text-brand-blue uppercase tracking-[0.2em] mb-4">
                Ilewa Labs
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-4">
                Learn the platform before everyone else
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-10 max-w-sm">
                Ilewa Labs is our YouTube channel &mdash; product walkthroughs, live demos,
                recorded events, and practical guides on getting the most out of the platform.
                New episodes dropping regularly.
              </p>

              <a
                href="https://youtube.com/@ilewa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm font-semibold text-text-primary hover:text-brand-blue transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                Watch on YouTube
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            <motion.div
              initial={{ y: 15 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-8"
            >
              {[
                {
                  num: "01",
                  title: "Product walkthroughs",
                  text: "Step-by-step guides for tenants, agents, and property owners. See every feature in action.",
                },
                {
                  num: "02",
                  title: "Live demos & events",
                  text: "Recorded Q&A sessions, feature launches, and community conversations.",
                },
                {
                  num: "03",
                  title: "Behind the build",
                  text: "What we shipped, what\u2019s coming next, and the thinking behind it.",
                },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-4">
                  <span className="text-xs font-semibold text-brand-blue uppercase tracking-[0.2em] mt-0.5 select-none">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-0.5">{item.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <PublicFooter hideCta />
      <CookieConsent />
    </div>
  );
}
