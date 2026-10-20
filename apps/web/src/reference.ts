import type {Indicator} from '../../../packages/fixtures/src/synthetic';

export type ReferenceStatus = 'high' | 'low' | 'normal' | 'unknown';

/** Compare only against the specific result's reported reference interval.
 * Missing reference bounds must never be interpreted as "normal".
 */
export function referenceStatus(result: Indicator): ReferenceStatus {
  const low=result.referenceLow, high=result.referenceHigh;
  if (!Number.isFinite(result.value) || (low!==undefined && !Number.isFinite(low))
    || (high!==undefined && !Number.isFinite(high)) || (low!==undefined && high!==undefined && low>high)) return 'unknown';
  if (low===undefined && high===undefined) return 'unknown';
  if (high!==undefined && result.value>high) return 'high';
  if (low!==undefined && result.value<low) return 'low';
  return 'normal';
}

/** Nonclinical visual prominence heuristic, NOT a risk or severity score. */
export function proportionalReferenceDeviation(result: Indicator): number {
  const status=referenceStatus(result);
  if(status==='high' && result.referenceHigh!==undefined)
    return (result.value-result.referenceHigh)/Math.max(Math.abs(result.referenceHigh),1);
  if(status==='low' && result.referenceLow!==undefined)
    return (result.referenceLow-result.value)/Math.max(Math.abs(result.referenceLow),1);
  return 0;
}

/** Select a single out-of-range result for the summary title, or none if not applicable. */
export function chooseFeaturedResult(results: readonly Indicator[]): Indicator | null {
  let featured: Indicator | null=null;
  let maxScore=0;
  for(const item of results){
    const score=proportionalReferenceDeviation(item);
    if(score>maxScore){featured=item;maxScore=score;}
  }
  return featured;
}
