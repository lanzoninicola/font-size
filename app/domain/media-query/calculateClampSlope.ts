export default function calculateClampSlope(
  minFontSizeREM: number,
  maxFontSizeREM: number,
  minWidthREM: number,
  maxWidthREM: number
) {
  return (maxFontSizeREM - minFontSizeREM) / (maxWidthREM - minWidthREM);
}
