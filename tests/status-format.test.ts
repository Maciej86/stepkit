// Pilnuje, że wzór STATUS.md w document-templates.md da się odczytać stroną „Postęp” z szablonu.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseStatus } from '../plugins/stepkit/template/mockups/src/progress/parseStatus';

const doc = readFileSync(resolve(__dirname, '../plugins/stepkit/skills/dalej/references/document-templates.md'), 'utf8');
const example = /## `docs\/STATUS.md`[\s\S]*?```markdown\n([\s\S]*?)```/.exec(doc)![1];

describe('STATUS.md example in document-templates.md', () => {
  it('parses with the template parser', () => {
    const result = parseStatus(example);
    if (!result.ok) throw new Error(result.reason);
    expect(result.status.modules).toHaveLength(5);
    expect(result.status.modules[4].dependsOn).toEqual(['login', 'orders', 'email', 'customers']);
    expect(result.status.startSteps).toHaveLength(8);
  });
});
