// Pilnuje, że numer wersji stepkit jest wszędzie ten sam, a projekty z szablonu i dane testowe nie wymagają aktualizacji.
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(__dirname, '..');
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');
const toNumbers = (v: string) => v.split('.').map(Number);
const compare = (a: string, b: string) => {
  const [x, y] = [toNumbers(a), toNumbers(b)];
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
  return 0;
};
const projectVersion = (status: string) => /\*\*Wersja stepkit:\*\* (\d+\.\d+\.\d+)/.exec(status)?.[1];

const plugin = JSON.parse(read('plugins/stepkit/.claude-plugin/plugin.json')).version as string;
const upgrades = read('plugins/stepkit/skills/dalej/references/upgrades.md');
const upgradesDir = resolve(root, 'plugins/stepkit/skills/dalej/references/upgrades');
const listed = /\*\*Pliki aktualizacji\*\*[^:]*: (.+)/.exec(upgrades)?.[1] ?? '';
const sections = listed === 'brak' ? [] : listed.split(', ').filter(Boolean);
const files = readdirSync(upgradesDir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
const newestSection = sections.at(-1) ?? '0.0.0';

describe('stepkit version', () => {
  it('is the same in plugin.json, marketplace.json and upgrades.md', () => {
    expect(JSON.parse(read('.claude-plugin/marketplace.json')).metadata.version).toBe(plugin);
    expect(/\*\*Aktualna wersja stepkit:\*\* (\S+)/.exec(upgrades)?.[1]).toBe(plugin);
  });

  it('is written into the template STATUS.md and the STATUS example', () => {
    expect(projectVersion(read('plugins/stepkit/template/docs/STATUS.md'))).toBe(plugin);
    expect(projectVersion(read('plugins/stepkit/skills/dalej/references/document-templates.md'))).toBe(plugin);
  });

  it('has no upgrade file newer than the plugin', () => {
    expect(listed).not.toBe('');
    expect(compare(newestSection, plugin)).toBeLessThanOrEqual(0);
  });

  it('lists every upgrade file in upgrades.md, oldest first, and nothing else', () => {
    expect([...sections].sort(compare)).toEqual(sections);
    expect([...files].sort(compare)).toEqual(sections);
  });

  it('starts each upgrade file with its own version as the title', () => {
    for (const v of files) expect(readFileSync(resolve(upgradesDir, `${v}.md`), 'utf8')).toMatch(new RegExp(`^# ${v.replace(/\./g, '\\.')}: \\S`));
  });

  it('keeps upgrades.md short (details live in upgrades/<version>.md)', () => {
    expect(upgrades).not.toMatch(/^## \d+\.\d+\.\d+:/m);
  });

  const evalDir = resolve(root, 'plugins/stepkit/evals');
  const fixtures = readdirSync(evalDir)
    .filter((name) => !['results', 'dalej-no-status'].includes(name))
    .map((name) => [name, read(`plugins/stepkit/evals/${name}/fixture.sh`)] as const)
    .filter(([, text]) => text.includes('docs/STATUS.md'));

  it.each(fixtures)('eval fixture %s is on the current version', (_name, text) => {
    expect(projectVersion(text)).toBe(plugin);
  });
});
