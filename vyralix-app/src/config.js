// Central API base URL.
// Set VITE_API_URL in Vercel (or a local .env) to point at the deployed backend.
// Falls back to the local Express server when the variable is missing.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
