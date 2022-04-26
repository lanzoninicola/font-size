import { useEffect, useState } from "react";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import usePixelsPerRemSelector from "~/context/app/hooks/usePixelsPerRemSelector";
import { SelectorId } from "~/context/app/interfaces";

import useBreakpointsQueryService from "../breakpoints/useBreakpointsQueryService";
import calculateClampSlope from "./calculateClampSlope";
import calculateClampYAxisIntersection from "./calculateClampYAxisIntersection";
import generateClampFormula from "./generateClampFormula";
import useMediaQueriesQueryService from "../media-queries/useMediaQueriesQueryService";
import useMediaQueriesService from "../media-queries/useMediaQueriesService";

export default function useCSSCodeBlock(forceImportant = false) {
  const { pixelsPerRem } = usePixelsPerRemSelector();
  const { mediaQueries } = useMediaQueriesService();
  const { breakpoints } = useBreakpointsSelector();

  const { getViewportSizeByBreakpointId } = useBreakpointsQueryService();
  const { getTokenValues } = useMediaQueriesQueryService();

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
        const { minFontSize, maxFontSize } = getTokenValues(
          breakpointId,
          selector as SelectorId
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
