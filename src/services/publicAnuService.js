/**
 * Public Services
 * Waitlist signup — no authentication required
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

const publicApi = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Waitlist Form ────────────────────────────────────────────────────────
export const submitWaitlistForm = async ({ full_name, email, role_interest }) => {
  const parts = full_name.trim().split(/\s+/);
  const first_name = parts[0] || '';
  const last_name = parts.slice(1).join(' ') || '';

  const response = await publicApi.post('/anu/public/signup/', {
    first_name,
    last_name,
    email,
    role_interest,
  });
  return response.data;
};
