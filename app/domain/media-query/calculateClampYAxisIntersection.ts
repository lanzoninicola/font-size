export default function calculateClampYAxisIntersection(
  minFontSize: number,
  slope: number,
  minWidth: number
) {
  return -minWidth * slope + minFontSize;
}
