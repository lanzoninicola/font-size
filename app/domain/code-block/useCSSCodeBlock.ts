import usePixelsPerRemSelector from "~/context/font-size/hooks/usePixelsPerRemSelector";
import { Tags } from "~/context/interfaces";
import useBreakpointService from "../breakpoints/useBreakpointService";
import calculateClampSlope from "../media-query/calculateClampSlope";
import calculateClampYAxisIntersection from "../media-query/calculateClampYAxisIntersection";
import getClampFormula from "../media-query/getClampFormula";
import useMediaQueryService from "../media-query/useMediaQueryService";

export default function useCSSCodeBlock() {
  const { pixelsPerRem } = usePixelsPerRemSelector();
  const { mediaQueries, getFontSizeByTagAndBreakpointId } =
    useMediaQueryService();
  const { getBreakpointValuesById } = useBreakpointService();

  function buildCodeBlock() {
    const htmlPercentage = (100 / 16) * pixelsPerRem;

    let codeBlock = `html {font-size: ${htmlPercentage}%;} /*${pixelsPerRem}px*/`;
    codeBlock += `\n`;

    if (!mediaQueries) {
      return codeBlock;
    }

    for (const tag in mediaQueries) {
      const mediaQueryTag = mediaQueries[tag as Tags];

      if (!mediaQueryTag) {
        continue;
      }

      for (const breakpointId in mediaQueryTag) {
        const { minWidth, minWidthREM, maxWidth, maxWidthREM } =
          getBreakpointValuesById(breakpointId);

        const { minFontSize, maxFontSize } = getFontSizeByTagAndBreakpointId(
          tag as Tags,
          breakpointId
        );

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

        const clampFormula = getClampFormula(
          minFontSize,
          maxFontSize,
          slope,
          yAxisIntersection
        );

        codeBlock += `@media only screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px) {`;
        codeBlock += `\n`;
        codeBlock += `  ${tag} {`;
        codeBlock += `\n`;
        codeBlock += `   font-size: ${clampFormula}px;`;
        codeBlock += `\n`;
        codeBlock += `  }`;
        codeBlock += `\n`;
        codeBlock += `}`;
        codeBlock += `\n`;
      }
    }

    return codeBlock;
  }

  return {
    codeBlock: buildCodeBlock(),
  };
}
