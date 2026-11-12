// Daty tylko przez formatDate / formatDateTime / DateText z @app/shared i common/DateText. Przeglądarka i serwer
// formatują po swojemu (np. "8/3/2026" w angielskiej przeglądarce), a ręczne składanie dni gubi strefę czasową.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const OWN_FORMATTING = /\.toLocale(Date|Time)?String\(|Intl\.DateTimeFormat|\.get(Full)?Year\(\)|\.getMonth\(\)/;

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === 'test' || name === 'node_modules' ? [] : sourceFiles(path);
    return /\.tsx?$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : [];
  });
}

describe('dates', () => {
  const roots = ['src', '../mockups/src', '../backend/src'].map((d) => resolve(process.cwd(), d));
  const files = roots.flatMap(sourceFiles);

  it('finds the source files to check', () => {
    expect(files.length).toBeGreaterThan(10);
  });

  it.each(files)('%s formats dates only with @app/shared', (file) => {
    const offending = readFileSync(file, 'utf8')
      .split('\n')
      .filter((line) => OWN_FORMATTING.test(line));
    expect(offending).toEqual([]);
  });
});
