import calculateClampSlope from "./calculateClampSlope";
import calculateClampYAxisIntersection from "./calculateClampYAxisIntersection";
import generateClampFormula from "./generateClampFormula";

export default function getCSSMediaQueryData({
  minFontSize,
  maxFontSize,
  minWidthREM,
  maxWidthREM,
}: {
  minFontSize: number;
  maxFontSize: number;
  minWidthREM: number;
  maxWidthREM: number;
}) {
  const slope = calculateClampSlope(
    minFontSize,
    maxFontSize,
    minWidthREM,
    maxWidthREM
  );

  const yAxisIntersection = calculateClampYAxisIntersection(
    minFontSize,
    slope,
    minWidthREM
  );

  const clampFormula = generateClampFormula(
    minFontSize,
    maxFontSize,
    slope,
    yAxisIntersection
  );
}
