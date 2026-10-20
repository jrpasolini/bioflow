import test from 'node:test';
import assert from 'node:assert/strict';
import {testModule} from '../../../scripts/test-module.mjs';
const {markerHistory,plotHistory,smoothHistoryPath}=await testModule(new URL('../src/timeline.ts',import.meta.url),'timeline');
const {localDemo}=await testModule(new URL('../src/demo-api.ts',import.meta.url),'timeline-fixture');
const {referenceStatus}=await testModule(new URL('../src/reference.ts',import.meta.url),'timeline-reference');
test('history uses each exam reference, including explicit attention intervals',()=>{
 const reports=structuredClone(localDemo.reports.slice(0,3));
 const values=[{referenceLow:70,referenceHigh:100},{referenceLow:70,referenceHigh:120},{referenceLow:70,referenceHigh:100,referenceAttentionLow:101,referenceAttentionHigh:120}];
 reports.forEach((r,i)=>{r.results=[{code:'sample',name:'Sample',value:110,unit:'u',...values[i]}];});
 const series=markerHistory(reports,'sample');
 assert.deepEqual(series.map(referenceStatus),['high','normal','attention']);
 assert.deepEqual(series.map(s=>s.reportId),reports.map(r=>r.id));
});
test('each plotted point retains its original exam, date and value',()=>{
 const series=markerHistory(localDemo.reports,'glucose');
 assert.equal(series.length,8);
 for(const point of series){
  const report=localDemo.reports.find(r=>r.id===point.reportId);
  assert.equal(point.collectedAt,report.collectedAt);
  assert.equal(point.value,report.results.find(a=>a.code==='glucose').value);
 }
 const points=plotHistory(series,520,190,28,28);
 const path=smoothHistoryPath(points);
 assert.equal((path.match(/ C /g)||[]).length,points.length-1);
 for(const p of points)assert.ok(path.includes(`${p.x} ${p.y}`));
 assert.doesNotMatch(path,/NaN|Infinity/);
});
test('smooth history handles empty, single and constant observations',()=>{
 assert.equal(smoothHistoryPath([]),'');
 assert.equal(smoothHistoryPath([{x:10,y:20}]),'M 10 20');
 assert.doesNotMatch(smoothHistoryPath([{x:0,y:4},{x:1,y:4},{x:2,y:4}]),/NaN|Infinity/);
});
