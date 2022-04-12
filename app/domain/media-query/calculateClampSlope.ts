export default function calculateClampSlope(
  minFontSize: number,
  maxFontSize: number,
  minWidth: number,
  maxWidth: number
) {
  return (maxFontSize - minFontSize) / (maxWidth - minWidth);
}
