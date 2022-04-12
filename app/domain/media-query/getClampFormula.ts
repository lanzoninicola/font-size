export default function getClampFormula(
  minFontSize: number,
  maxFontSize: number,
  slope: number,
  yAxisIntersection: number
) {
  return `clamp(${minFontSize}rem, ${yAxisIntersection.toFixed(4)}rem + ${(
    slope * 100
  ).toFixed(4)}vw, ${maxFontSize}rem)`;
}
