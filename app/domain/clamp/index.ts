export function getFormula(
  minFontSize: number,
  maxFontSize: number,
  slope: number,
  yAxisIntersection: number
) {
  return `clamp(${minFontSize}rem, ${yAxisIntersection.toFixed(4)}rem + ${(
    slope * 100
  ).toFixed(4)}vw, ${maxFontSize}rem)`;
}

export function calculateSlope(
  minFontSize: number,
  maxFontSize: number,
  minWidth: number,
  maxWidth: number
) {
  return (maxFontSize - minFontSize) / (maxWidth - minWidth);
}

export function calculateYAxisIntersection(
  minFontSize: number,
  slope: number,
  minWidth: number
) {
  return -minWidth * slope + minFontSize;
}
