import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Loader2, CheckCircle,
  Search, Shield, Wallet,
  Home, Users, TrendingUp,
  Play,
} from "lucide-react";
import PublicHeader from "./components/PublicHeader";
import PublicFooter from "./components/PublicFooter";
import CookieConsent from "./components/CookieConsent";
import { submitWaitlistForm } from "./services/publicAnuService";

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
      const res = await submitWaitlistForm(formData);
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
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-[8px] border border-border-light p-8 text-center"
      >
        <div className="w-14 h-14 bg-brand-blue-bg rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-7 h-7 text-brand-blue" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">
          {result.status === "already_registered" ? "You\u2019re already a General" : "Welcome, General"}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {result.status === "already_registered"
            ? "We already have your details. We\u2019ll reach out when it\u2019s time."
            : "You\u2019re in. Check your email \u2014 we\u2019ll be in touch with next steps."}
        </p>
      </motion.div>
    );
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
            <option value="tenant">Find a home</option>
            <option value="agent">List properties as an agent</option>
            <option value="property_owner">List my own properties</option>
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

  return (
    <div className="min-h-screen">
      <PublicHeader transparent minimal cta={{ label: "Become a General", href: "#generals" }} />

      {/* ── 1. Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen w-full overflow-hidden max-md:min-h-0">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop"
            alt="Modern Nigerian property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-[5] max-w-7xl mx-auto px-4 sm:px-6 pt-40 sm:pt-56 pb-24 max-md:pt-32 max-md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl"
          >
            <p className="text-xs font-medium text-white/40 uppercase tracking-[0.2em] mb-6">
              Coming soon
            </p>
            <h1 className="text-4xl sm:text-[56px] font-bold text-white leading-[1.08] tracking-[-1.5px] mb-6 max-[480px]:text-[28px]">
              Nigerian property,{" "}
              <br className="hidden sm:block" />
              without the wahala.
            </h1>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-md mb-12">
              Verified listings. Agents who respond. Every payment receipted.
              Ilewa is the property platform Lagos deserves.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById("generals")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2.5 bg-white text-text-primary px-7 py-3.5 rounded-[8px] font-semibold text-sm transition-all"
            >
              Become a General
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Value strip ────────────────────────────────────────── */}
      <section className="border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              {
                title: "Verified listings",
                text: "Every property is checked before it goes live. Real photos, real prices, real availability.",
              },
              {
                title: "Direct communication",
                text: "One tap to your agent. No middlemen, no forwarded numbers, no one disappearing after payment.",
              },
              {
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
                <div className="w-full h-[2px] bg-brand-blue mb-6 max-w-[32px]" />
                <h3 className="text-sm font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. How it works ──────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-14"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-3">
              How Ilewa works
            </h2>
            <p className="text-sm text-text-secondary max-w-md">
              Whether you&rsquo;re searching for a place or managing listings,
              the platform works for your side of the table.
            </p>
          </motion.div>

          {/* Tab Switcher */}
          <div className="flex mb-12">
            <div className="inline-flex bg-white rounded-[8px] p-1 border border-border-light">
              <button
                onClick={() => setActiveTab("renters")}
                className={`px-5 sm:px-7 py-2.5 rounded-[6px] font-medium text-sm transition-all ${
                  activeTab === "renters"
                    ? "bg-brand-blue text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Find a Home
              </button>
              <button
                onClick={() => setActiveTab("agents")}
                className={`px-5 sm:px-7 py-2.5 rounded-[6px] font-medium text-sm transition-all ${
                  activeTab === "agents"
                    ? "bg-brand-blue text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                List Properties
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
                  <span className="text-xs font-bold text-brand-blue tracking-widest uppercase mb-4 block">
                    Step {step.step}
                  </span>
                  <h3 className="text-base font-semibold text-text-primary mb-2">
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
      <section id="generals" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs font-medium text-brand-blue uppercase tracking-[0.2em] mb-4">
                Ilewa Generals
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-4">
                Join the founding cohort
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-10 max-w-sm">
                Generals are the early adopters who get first access,
                test features before anyone else, and directly shape what we build.
              </p>

              <div className="space-y-8">
                {[
                  {
                    num: "01",
                    title: "First access",
                    text: "Use the full platform while it\u2019s still invite-only.",
                  },
                  {
                    num: "02",
                    title: "Shape what gets built",
                    text: "Your feedback goes directly to the team writing the code.",
                  },
                  {
                    num: "03",
                    title: "Priority at launch",
                    text: "Skip the line when we open to everyone.",
                  },
                ].map((item) => (
                  <div key={item.num} className="flex items-start gap-4">
                    <span className="text-xs font-bold text-brand-blue tracking-widest mt-0.5 select-none">
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
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:sticky lg:top-28"
            >
              <GeneralsForm defaultRole={activeTab === "agents" ? "agent" : "tenant"} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. Ilewa Labs ────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                  <span className="text-xs font-bold text-brand-blue tracking-widest mt-0.5 select-none">
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
