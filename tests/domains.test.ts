// Pilnuje, że pliki z zasadami dziedzinowymi (domains/) są w spisie „Wzorce dziedzin” i trafiają do projektu.
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const refs = resolve(__dirname, '../plugins/stepkit/skills/dalej/references');
const conventions = readFileSync(resolve(refs, 'code-conventions.md'), 'utf8');
const index = conventions.slice(conventions.indexOf('## Wzorce dziedzin'), conventions.indexOf('## Lista kontrolna'));
const listed = [...index.matchAll(/^\| `([a-z-]+\.md)` \|/gm)].map((m) => m[1]);
const files = readdirSync(resolve(refs, 'domains')).filter((f) => f.endsWith('.md'));

describe('domain conventions', () => {
  it('has an index in code-conventions.md', () => {
    expect(listed.length).toBeGreaterThan(0);
  });

  it.each(files)('%s is listed in the index', (file) => expect(listed).toContain(file));
  it.each(listed)('%s from the index exists', (file) => expect(files).toContain(file));

  it.each(files)('%s says it is read together with code-conventions.md', (file) => {
    expect(readFileSync(resolve(refs, 'domains', file), 'utf8')).toContain('Czytasz razem z `code-conventions.md`');
  });

  it('gets copied into docs/conventions/ at start and on upgrade', () => {
    const skeleton = readFileSync(resolve(refs, '../../start/references/project-skeleton.md'), 'utf8');
    expect(skeleton).toContain('domains/"*.md docs/conventions/');
    expect(readFileSync(resolve(refs, 'upgrades.md'), 'utf8')).toContain('`docs/conventions/`');
  });

  it('is read by the module stages through the "Wzorce" column', () => {
    const skill = readFileSync(resolve(refs, '../SKILL.md'), 'utf8');
    expect(skill).toContain('kolumny „Wzorce”');
    expect(readFileSync(resolve(refs, 'document-templates.md'), 'utf8')).toContain('| Wzorce |');
  });
});
