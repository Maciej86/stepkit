// Pilnuje, że zasady rozmowy z użytkownikiem („Komendy ze /”, „Polecenie w terminalu”, „Wpis do pliku”) są takie same
// w skillach start i dalej. zglos odsyła do dalej, więc też musi je tam znaleźć.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const skills = resolve(__dirname, '../plugins/stepkit/skills');
const read = (name: string) => readFileSync(resolve(skills, name, 'SKILL.md'), 'utf8');

// Od „**Komendy ze `/`.**” do pierwszego nagłówka „## ”.
const sharedRules = (text: string) => {
  const start = text.indexOf('**Komendy ze `/`.**');
  if (start < 0) return undefined;
  const end = text.indexOf('\n## ', start);
  return text.slice(start, end < 0 ? undefined : end).trim();
};

describe('shared conversation rules', () => {
  const dalej = sharedRules(read('dalej'));

  it('are in dalej and contain all three rules', () => {
    expect(dalej).toBeDefined();
    for (const rule of ['**Komendy ze `/`.**', '**Polecenie w terminalu.**', '**Wpis do pliku.**']) {
      expect(dalej).toContain(rule);
    }
  });

  it('are identical in start and dalej', () => {
    expect(sharedRules(read('start'))).toBe(dalej);
  });

  it('are referenced by zglos', () => {
    const zglos = read('zglos');
    expect(zglos).toContain('„Komendy ze `/`”, „Polecenie w terminalu” i „Wpis do pliku”');
    expect(zglos).toContain('`../dalej/SKILL.md`');
  });
});
