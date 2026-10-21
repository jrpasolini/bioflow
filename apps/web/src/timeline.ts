import type {LabReport,Indicator} from '../../../packages/fixtures/src/synthetic';

export interface MarkerObservation extends Indicator {
  id: string;
  reportId: string;
  collectedAt: string;
  laboratory: string;
  code: string;
  name: string;
  value: number;
  unit: string;
}

/** Each dot is one specific observation from one collection/report, not an AI-generated estimate. */
export function markerHistory(reports: readonly LabReport[], code: string): MarkerObservation[] {
  return reports.flatMap(report =>
    report.results.filter(result => result.code === code).map(result => ({
      id: report.id + ':' + result.code,
      reportId: report.id,
      collectedAt: report.collectedAt,
      laboratory: report.laboratory,
      code: result.code,
      name: result.name,
      value: result.value,
      unit: result.unit,
      referenceLow:result.referenceLow,referenceHigh:result.referenceHigh,
      referenceAttentionLow:result.referenceAttentionLow,referenceAttentionHigh:result.referenceAttentionHigh,
      referenceVeryLow:result.referenceVeryLow,referenceVeryHigh:result.referenceVeryHigh
    }))
  ).sort((a,b) => a.collectedAt.localeCompare(b.collectedAt) || a.reportId.localeCompare(b.reportId));
}

export interface ChartPoint {x:number; y:number}

/** Monotone cubic interpolation: passes through each exam without inventing extrema. */
export function smoothHistoryPath(points:readonly ChartPoint[]):string{
 if(!points.length)return '';
 const slopes=points.slice(1).map((p,i)=>(p.y-points[i].y)/(p.x-points[i].x));
 const tangent=points.map((_,i)=>{
  if(i===0)return slopes[0]||0;
  if(i===points.length-1)return slopes[i-1]||0;
  const a=slopes[i-1],b=slopes[i];
  return a*b<=0?0:2*a*b/(a+b);
 });
 let path=`M ${points[0].x} ${points[0].y}`;
 for(let i=1;i<points.length;i++){
  const a=points[i-1],b=points[i],dx=(b.x-a.x)/3;
  path+=` C ${a.x+dx} ${a.y+dx*tangent[i-1]}, ${b.x-dx} ${b.y-dx*tangent[i]}, ${b.x} ${b.y}`;
 }
 return path;
}

/**
 * Markers are chronologically ordered and displayed with one dot per exam.
 * Horizontal spacing is by collection sequence, NOT elapsed time.
 * Value scaling is per marker, preserving its own units and numerical range.
 */
export function plotHistory(series: readonly MarkerObservation[], width: number, height: number, padX: number, padY: number): ChartPoint[] {
  if(series.length===0) return [];
  const values=series.map(item=>item.value);
  const min=Math.min(...values),max=Math.max(...values);
  const span=max-min;
  const innerWidth=width-padX*2,innerHeight=height-padY*2;
  return series.map((item,i)=>({
    x: series.length===1 ? width/2 : padX+(i/(series.length-1))*innerWidth,
    y: span===0 ? height/2 : padY+(1-(item.value-min)/span)*innerHeight
  }));
}

