export const appConfig = {
  apiBaseUrl: requiredEnv('VITE_API_BASE_URL'),
  adminUrl: requiredEnv('VITE_ADMIN_URL'),
  authTokenStorageKey: requiredEnv('VITE_AUTH_TOKEN_STORAGE_KEY'),
  apiTimeoutMs: Number(import.meta.env.VITE_API_TIMEOUT_MS || 60000)
};

function requiredEnv(name) {
  const value = import.meta.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}
