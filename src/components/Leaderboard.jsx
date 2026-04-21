import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { getLeaderboard } from "../services/publicAnuService";

export default function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getLeaderboard()
      .then((data) => {
        if (!cancelled) {
          setRows(data);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!loaded) return null;
  if (rows.length === 0) {
    return (
      <div className="mt-8 bg-white border border-border-light rounded-[8px] p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-4 h-4 text-brand-blue" />
          <h3 className="text-sm font-semibold text-text-primary">Founding ranks</h3>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">
          Be the first. Every signup lands here in order.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mt-8 bg-white border border-border-light rounded-[8px] p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-4 h-4 text-brand-blue" />
        <h3 className="text-sm font-semibold text-text-primary">Founding ranks</h3>
      </div>
      <ul className="space-y-2.5">
        {rows.map((row) => (
          <li key={`${row.first_name}-${row.position}`} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-3">
              <span className="w-8 text-xs font-semibold text-text-secondary tabular-nums">
                #{row.position}
              </span>
              <span className="text-text-primary">
                {row.first_name} {row.last_initial}.
              </span>
            </span>
            {row.referral_count > 0 && (
              <span className="text-xs text-text-secondary tabular-nums">
                {row.referral_count} {row.referral_count === 1 ? "invite" : "invites"}
              </span>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
