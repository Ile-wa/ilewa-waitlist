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
      <ul className="space-y-1.5">
        {rows.map((row, i) => {
          const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : null;
          const initials = `${(row.first_name || "?")[0]}${row.last_initial || ""}`.toUpperCase();
          return (
            <li
              key={`${row.first_name}-${row.position}`}
              className="flex items-center gap-4 py-2"
            >
              <span
                className={
                  medal
                    ? "inline-block w-10 text-2xl leading-none text-center"
                    : "inline-block w-10 text-sm font-semibold text-text-secondary tabular-nums text-center"
                }
              >
                {medal || `#${row.position}`}
              </span>
              <span className="w-10 h-10 rounded-full bg-brand-blue-bg flex items-center justify-center text-sm font-semibold text-brand-blue shrink-0">
                {initials}
              </span>
              <span className="text-base text-text-primary">
                {row.first_name} {row.last_initial}.
              </span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
