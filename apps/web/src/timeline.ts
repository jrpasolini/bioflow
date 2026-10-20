import type {LabReport} from '../../../packages/fixtures/src/synthetic';

export interface MarkerObservation {
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
      unit: result.unit
    }))
  ).sort((a,b) => a.collectedAt.localeCompare(b.collectedAt) || a.reportId.localeCompare(b.reportId));
}

export interface ChartPoint {x:number; y:number}

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
