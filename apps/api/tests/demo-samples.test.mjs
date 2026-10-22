import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {inflateRawSync} from 'node:zlib';
import {testModule} from '../../../scripts/test-module.mjs';

const {SAMPLES,isSampleHash}=await testModule(new URL('../src/demo-samples.ts',import.meta.url),'reduced-samples');
const audit=JSON.parse(await readFile(new URL('../../../docs/PDF_PUBLICATION_AUDIT.json',import.meta.url)));
const reduction=JSON.parse(await readFile(new URL('../../../docs/DEMO_SAMPLE_REDUCTION.json',import.meta.url)));
const zip=await readFile(new URL('../../web/public/demo/bioflow-3-exames.zip',import.meta.url));
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
function entries(bytes){
 const files=new Map();
 for(let offset=0;bytes.readUInt32LE(offset)===0x04034b50;){
  assert.equal(bytes.readUInt16LE(offset+6)&9,0,'no encrypted entries or data descriptors');
  const method=bytes.readUInt16LE(offset+8),size=bytes.readUInt32LE(offset+18);
  const nameSize=bytes.readUInt16LE(offset+26),extraSize=bytes.readUInt16LE(offset+28);
  const name=bytes.subarray(offset+30,offset+30+nameSize).toString('utf8');
  const start=offset+30+nameSize+extraSize,body=bytes.subarray(start,start+size);
  assert.ok(method===0||method===8);
  assert.ok(!files.has(name),'duplicate archive name');
  files.set(name,method===8?inflateRawSync(body):body);
  offset=start+size;
 }
 return files;
}

test('downloaded ZIP, publication audit and API allowlist agree on exactly three reduced PDFs',()=>{
 assert.equal(hash(zip),audit.zipSha256);
 assert.equal(zip.length,audit.zipBytes);
 const files=entries(zip);
 assert.equal(files.size,4);
 assert.ok(files.has('LEIA-ME.txt'));
 assert.equal(Object.keys(SAMPLES).length,3);
 for(const sample of audit.heldout){
  const pdf=files.get(sample.file);
  assert.ok(pdf);
  assert.equal(hash(pdf),sample.sha256);
  assert.equal(pdf.length,sample.bytes);
  assert.equal(SAMPLES[sample.sha256].pages,1);
  assert.match(pdf.toString('latin1'),/\/Count 1\b/);
 }
});

test('each sample retains at most 40% of independently inventoried numeric result rows',()=>{
 for(const sample of reduction.samples){
  assert.equal(sample.originalInventory.length,sample.previousResultRows);
  assert.equal(sample.retained.length,sample.resultRows);
  assert.equal(sample.resultRows,Math.floor(sample.previousResultRows*.4));
  assert.ok(sample.reductionPercent>=60);
  assert.equal(new Set(sample.retained.map(x=>x.name)).size,sample.resultRows);
  for(const row of sample.retained)assert.ok(sample.originalInventory.some(x=>JSON.stringify(x)===JSON.stringify(row)));
  assert.ok(sample.textChars<2500,'each sample fits the existing single-chunk budget');
  assert.equal(sample.pages,1);
  assert.equal(isSampleHash(sample.previousSha256),false,'old large uploads are no longer authorized');
  assert.ok(isSampleHash(sample.sha256));
 }
});
