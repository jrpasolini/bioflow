import {readFileSync} from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
const contents = readFileSync(new URL('../src/synthetic.ts', import.meta.url), 'utf8');
test('demo fixtures explicitly declare fictional identity', () => {
  assert.match(contents, /isSynthetic:\s*true/);
  assert.match(contents, /originalPdfId:\s*null/);
});
test('no external URLs or email addresses in fixture', () => {
  assert.doesNotMatch(contents, /https?:\/\/|[\w.+-]+@[\w.-]+\.[a-z]{2,}/i);
});

test('fictional demographic data must be explicit, not copied from a real patient', () => {
  assert.match(contents, /dateOfBirth: '1958-09-07'/);
  assert.match(contents, /demoRecordId: 'BF-DEMO-001'/);
});
