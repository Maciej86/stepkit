/** Stałe serwera. Zmieniane tylko w kodzie (sekrety i adresy są w .env). */
export const TOKEN_TTL = '7d';
export const AUTH_COOKIE_NAME = 'token';
export const AUTH_COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
export const LOGIN_RATE_LIMIT = { windowMs: 15 * 60 * 1000, max: 10 };
export const BCRYPT_COST = 12;
export const PAGE_SIZE = 25;
