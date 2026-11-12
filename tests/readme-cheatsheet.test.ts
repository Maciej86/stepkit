// Pilnuje, że ściągawka README.md w szablonie podaje te same porty i adresy, które naprawdę ustawia szablon.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const template = (path: string) => readFileSync(resolve(__dirname, '../plugins/stepkit/template', path), 'utf8');
const readme = process.env.README_PATH ? readFileSync(process.env.README_PATH, 'utf8') : template('README.md');

const defaultPort = (source: string, variable: string) => {
  const match = new RegExp(`${variable}(?:\\s*\\?\\?\\s*|:-)(\\d+)`).exec(source);
  if (!match) throw new Error(`no default for ${variable}`);
  return match[1];
};

describe('README cheat sheet in the template', () => {
  it.each([
    ['app', defaultPort(template('frontend/vite.config.ts'), 'FRONTEND_PORT')],
    ['mockups', defaultPort(template('mockups/vite.config.ts'), 'MOCKUPS_PORT')],
    ['phpMyAdmin', defaultPort(template('docker-compose.yml'), 'PHPMYADMIN_PORT')],
  ])('lists the default %s address', (_name, port) => {
    expect(readme).toContain(`http://localhost:${port}`);
  });

  it('links the progress page that the mockups app serves', () => {
    expect(template('mockups/src/App.tsx')).toContain("path: '/progress'");
    expect(readme).toContain(`http://localhost:${defaultPort(template('mockups/vite.config.ts'), 'MOCKUPS_PORT')}/progress`);
  });

  it('explains how to log in to phpMyAdmin without showing the password', () => {
    expect(readme).toMatch(/użytkownik `app`/);
    expect(readme).toContain('DB_PASSWORD');
  });

  it('names the commands that start and stop everything', () => {
    for (const script of ['db', 'db:stop', 'migrate', 'dev', 'check', 'test:e2e']) {
      expect(JSON.parse(template('package.json')).scripts[script]).toBeDefined();
      expect(readme).toContain(`npm run ${script}`);
    }
  });
});
