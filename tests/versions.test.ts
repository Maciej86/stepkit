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
const sections = [...upgrades.matchAll(/^## (\d+\.\d+\.\d+):/gm)].map((m) => m[1]);
const newestSection = [...sections].sort(compare).at(-1)!;

describe('stepkit version', () => {
  it('is the same in plugin.json, marketplace.json and upgrades.md', () => {
    expect(JSON.parse(read('.claude-plugin/marketplace.json')).metadata.version).toBe(plugin);
    expect(/\*\*Aktualna wersja stepkit:\*\* (\S+)/.exec(upgrades)?.[1]).toBe(plugin);
  });

  it('is written into the template STATUS.md and the STATUS example', () => {
    expect(projectVersion(read('plugins/stepkit/template/docs/STATUS.md'))).toBe(plugin);
    expect(projectVersion(read('plugins/stepkit/skills/dalej/references/document-templates.md'))).toBe(plugin);
  });

  it('has no upgrade section newer than the plugin', () => {
    expect(sections.length).toBeGreaterThan(0);
    expect(compare(newestSection, plugin)).toBeLessThanOrEqual(0);
  });

  const evalDir = resolve(root, 'plugins/stepkit/evals');
  const fixtures = readdirSync(evalDir)
    .filter((name) => !['results', 'dalej-upgrade', 'dalej-no-status'].includes(name))
    .map((name) => [name, read(`plugins/stepkit/evals/${name}/fixture.sh`)] as const)
    .filter(([, text]) => text.includes('docs/STATUS.md'));

  it.each(fixtures)('eval fixture %s does not need an upgrade', (_name, text) => {
    const version = projectVersion(text);
    expect(version).toBeDefined();
    expect(compare(version!, newestSection)).toBeGreaterThanOrEqual(0);
  });

  it('keeps the dalej-upgrade fixture old on purpose', () => {
    expect(projectVersion(read('plugins/stepkit/evals/dalej-upgrade/fixture.sh'))).toBeUndefined();
  });
});
