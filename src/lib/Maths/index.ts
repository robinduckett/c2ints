export function bound(
  bounded_value:number,
  lower: number,
  upper: number
): number {
  return bounded_value > upper ? upper : bounded_value < lower ? lower : bounded_value
}
