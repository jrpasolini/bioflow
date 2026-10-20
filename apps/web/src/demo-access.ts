/** A published shortcut for the *public synthetic demo only*. NOT an authentication factor. */
export const DEMO_ACCESS_CODE = '110526';
export function isDemoAccessCode(value: string): boolean {
 return /^[0-9]{6}$/.test(value) && value === DEMO_ACCESS_CODE;
}
