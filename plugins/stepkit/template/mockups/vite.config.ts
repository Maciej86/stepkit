import { unwatchFile, watchFile } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Porty i inne ustawienia z pliku .env w głównym folderze projektu (jeśli istnieje).
try {
  process.loadEnvFile(new URL('../.env', import.meta.url));
} catch {
  // brak .env: wartości domyślne
}

/**
 * Strona „Postęp” czyta ../docs/STATUS.md spoza folderu makiet. Serwer sprawdza plik co sekundę: powiadomienia
 * systemu plików (zwłaszcza w WSL) potrafią się urwać po większej zmianie plików, a wtedy strona stała w miejscu.
 */
const watchStatus = (): Plugin => {
  const file = fileURLToPath(new URL('../docs/STATUS.md', import.meta.url));
  return {
    name: 'watch-status',
    // Tylko serwer makiet, nie budowanie i nie testy (vitest zostawiałby otwarte sprawdzanie pliku).
    apply: (_config, env) => env.command === 'serve' && !process.env.VITEST,
    configureServer: (server) => {
      watchFile(file, { interval: 1000 }, () => server.watcher.emit('change', file));
    },
    closeBundle: () => unwatchFile(file),
  };
};

export default defineConfig({
  plugins: [react(), watchStatus()],
  build: { chunkSizeWarningLimit: 2000 },
  server: {
    // Port można zmienić zmienną MOCKUPS_PORT, gdy 5174 jest zajęty przez inny program.
    port: Number(process.env.MOCKUPS_PORT ?? 5174),
    strictPort: true,
    // Strona „Postęp” czyta ../docs/STATUS.md.
    fs: { allow: ['..'] },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
