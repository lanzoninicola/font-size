import { useEffect, useState } from "react";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useBreakpointsSelector from "~/context/font-size/hooks/useBreakpointsSelector";
import usePixelsPerRemSelector from "~/context/font-size/hooks/usePixelsPerRemSelector";
import { SelectorKey } from "~/context/font-size/interfaces";

import useBreakpointsQueryService from "../breakpoints/useBreakpointsQueryService";
import calculateClampSlope from "../media-query/calculateClampSlope";
import calculateClampYAxisIntersection from "../media-query/calculateClampYAxisIntersection";
import generateClampFormula from "../media-query/generateClampFormula";
import useMediaQueryService from "../media-query/useMediaQueryService";

export default function useCSSCodeBlock(forceImportant = false) {
  const { pixelsPerRem } = usePixelsPerRemSelector();
  const { mediaQueries, getFontSizeRange } = useMediaQueryService();
  const { breakpoints } = useBreakpointsSelector();
  const { getViewportSizeByBreakpointId } = useBreakpointsQueryService();

  const [codeBlock, setCodeBlock] = useState<string>("");

  function buildCodeBlock() {
    const htmlPercentage = (100 / 16) * pixelsPerRem;

    let codeBlock = `html {font-size: ${htmlPercentage}%;} /*${pixelsPerRem}px*/`;
    codeBlock += `\n`;

    if (!mediaQueries) {
      return codeBlock;
    }

    if (!breakpoints) {
      return codeBlock;
    }

    for (const breakpointId in mediaQueries) {
      const breakpointMediaQuery = mediaQueries[breakpointId as BreakpointId];

      if (!breakpointMediaQuery) {
        continue;
      }

      const { minWidth, maxWidth, minWidthREM, maxWidthREM } =
        getViewportSizeByBreakpointId(breakpointId, breakpoints);

      // const minWidth = breakpoints[breakpointId as BreakpointId].minWidth || 0;
      // const maxWidth = breakpoints[breakpointId as BreakpointId].maxWidth || 0;
      // const minWidthREM = minWidth / pixelsPerRem;
      // const maxWidthREM = maxWidth / pixelsPerRem;

      codeBlock += `@media only screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px) {`;
      codeBlock += `\n`;

      for (const selector in breakpointMediaQuery) {
        const { minFontSize, maxFontSize } = getFontSizeRange(
          breakpointId,
          selector as SelectorKey
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

        const clampFormula = generateClampFormula(
          minFontSize,
          maxFontSize,
          slope,
          yAxisIntersection
        );

        codeBlock += `  ${selector} {`;
        codeBlock += `\n`;
        codeBlock += `   font-size: ${clampFormula}${
          forceImportant ? " !important" : ""
        };`;
        codeBlock += `\n`;
        codeBlock += `  }`;
        codeBlock += `\n`;
      }

      codeBlock += `}`;
      codeBlock += `\n`;
    }

    return codeBlock;
  }

  useEffect(() => {
    setCodeBlock(buildCodeBlock());
  }, [mediaQueries, breakpoints]);

  return {
    codeBlock,
  };
}
