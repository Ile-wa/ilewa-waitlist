/**
 * Public Services
 * Waitlist signup + growth-loop endpoints — no authentication required.
 */

import axios from 'axios';

// VITE_API_URL must be set at build time. No fallbacks — a missing value
// should fail loudly rather than silently hit the wrong backend.
const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  throw new Error(
    'VITE_API_URL is not set. Configure it in your environment before building.'
  );
}

const publicApi = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Waitlist Form ────────────────────────────────────────────────────────
export const submitWaitlistForm = async ({ full_name, email, role_interest, referred_by_code }) => {
  const parts = full_name.trim().split(/\s+/);
  const first_name = parts[0] || '';
  const last_name = parts.slice(1).join(' ') || '';

  const body = { first_name, last_name, email, role_interest };
  if (referred_by_code) body.referred_by_code = referred_by_code;

  const response = await publicApi.post('/anu/public/signup/', body);
  return response.data;
};

// ─── Growth-Loop Reads ────────────────────────────────────────────────────
export const getLeaderboard = async () => {
  const response = await publicApi.get('/anu/public/leaderboard/');
  return response.data.leaderboard || [];
};

export const getWaitlistStats = async () => {
  const response = await publicApi.get('/anu/public/stats/');
  return response.data;
};

export const lookupGeneral = async (referralCode) => {
  const response = await publicApi.get(`/anu/public/generals/${referralCode}/`);
  return response.data;
};
