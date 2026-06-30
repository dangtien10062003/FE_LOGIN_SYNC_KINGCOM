import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      host: env.VITE_DEV_HOST || '127.0.0.1',
      port: Number(env.VITE_DEV_PORT || 5301),
      strictPort: true,
      proxy: {
        '/api': {
          target: env.VITE_DEV_API_PROXY,
          changeOrigin: true,
          secure: env.VITE_DEV_API_PROXY_SECURE === 'true'
        },
        '/haravan': {
          target: env.VITE_DEV_HARAVAN_PROXY,
          changeOrigin: true,
          secure: env.VITE_DEV_HARAVAN_PROXY_SECURE !== 'false',
          rewrite: (path) => path.replace(/^\/haravan/, '')
        }
      }
    },
    preview: {
      host: env.VITE_DEV_HOST || '127.0.0.1',
      port: Number(env.VITE_DEV_PORT || 5301),
      strictPort: true
    }
  };
});
