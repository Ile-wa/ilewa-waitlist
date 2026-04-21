/**
 * Public Services
 * Waitlist signup + growth-loop endpoints — no authentication required.
 */

import axios from 'axios';

// Resolution order:
//   1. VITE_API_URL at build time wins (canonical way to configure).
//   2. Otherwise, if we're running on localhost, use the local backend.
//   3. Otherwise, fall back to the production Render API so a deploy
//      without VITE_API_URL still works instead of hitting localhost.
function resolveApiUrl() {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) return envUrl;
  if (typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)) {
    return 'http://localhost:8001';
  }
  return 'https://ilewa-api.onrender.com';
}

const API_URL = resolveApiUrl();

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
