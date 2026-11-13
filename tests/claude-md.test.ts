// Pilnuje, że CLAUDE.md szablonu odsyła do rzeczy, które naprawdę są w szablonie, i że zasady trafiają do projektu.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const plugin = resolve(__dirname, '../plugins/stepkit');
const template = resolve(plugin, 'template');
const claudeMd = readFileSync(resolve(template, 'CLAUDE.md'), 'utf8');

function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    if (name === 'node_modules' || name === 'dist') return [];
    const path = join(dir, name);
    return statSync(path).isDirectory() ? sources(path) : /\.tsx?$/.test(name) ? [path] : [];
  });
}
const code = sources(template).map((f) => readFileSync(f, 'utf8')).join('\n');

describe('template CLAUDE.md', () => {
  it.each([
    'mountModule', 'validateBody', 'InfoCard', 'PageSection', 'ButtonIcon', 'DateText', 'notify',
    'formatDate', 'countWorkingDays', 'getPolishHolidays', 'Table.ScrollContainer', 'saveUpload', 'sendUpload',
    'withTransaction', 'validateQuery', 'listQuerySchema', 'DataState', 'postalCode',
  ])('names %s, which exists in the template', (name) => {
    expect(claudeMd).toContain(name);
    expect(code).toContain(name);
  });

  it.each(['docs/OVERVIEW.md', 'docs/SPEC-GENERAL.md', 'docs/STATUS.md', 'docs/DESIGN.md', 'docs/IDEAS.md', 'docs/CONVENTIONS.md'])(
    'points to %s',
    (path) => expect(claudeMd).toContain(path),
  );

  it('gets docs/CONVENTIONS.md copied from code-conventions.md at start', () => {
    const skeleton = readFileSync(resolve(plugin, 'skills/start/references/project-skeleton.md'), 'utf8');
    expect(skeleton).toContain('code-conventions.md" docs/CONVENTIONS.md');
  });
});
