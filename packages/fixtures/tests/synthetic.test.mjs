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

test('history demonstration includes multiple fully fabricated collection dates', () => {
  assert.match(contents,/bf-demo-2023-02/);
  assert.match(contents,/bf-demo-2024-05/);
  assert.match(contents,/bf-demo-2026-03/);
  assert.match(contents,/status:'synthetic-demo'/);
});

test('latest synthetic report showcases high, low and within-range outcomes', () => {
  const last = contents.slice(contents.indexOf("id:'bf-demo-2026-09'"));
  assert.match(last,/code:'hba1c'.*value:6\.6.*referenceHigh:5\.7/);
  assert.match(last,/code:'hdl'.*value:38.*referenceLow:40/);
  assert.match(last,/code:'creatinine'.*value:0\.99.*referenceHigh:1\.3/);
  assert.match(last,/code:'hemoglobin'/);
});
