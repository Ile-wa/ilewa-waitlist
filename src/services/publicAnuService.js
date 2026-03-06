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
  const response = await publicApi.post('/anu/public/signup/', {
    full_name,
    email,
    role_interest,
  });
  return response.data;
};
