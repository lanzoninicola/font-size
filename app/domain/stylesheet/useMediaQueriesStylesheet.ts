import { useEffect, useState } from "react";
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import usePixelsPerRemSelector from "~/context/app/hooks/usePixelsPerRemSelector";
import { MediaQuery } from "~/context/app/interfaces";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";

import useBreakpointsQueryService from "../breakpoints/useBreakpointsQueryService";
import calculateClampSlope from "./calculateClampSlope";
import calculateClampYAxisIntersection from "./calculateClampYAxisIntersection";
import css from "./css";
import generateClampFormula from "./generateClampFormula";
import withUnit from "./withUnit";

export default function useMediaQueriesStylesheet() {
  const { pixelsPerRem } = usePixelsPerRemSelector();
  const { mediaQueries } = useMediaQueriesSelector();
  const { breakpoints } = useBreakpointsSelector();

  const { getViewportSizeByBreakpointId } = useBreakpointsQueryService();

  /**
   * @description Returns the CSS code block based on the MediaQueries state
   *
   * @param forceImportant - if true add !important to the CSS*
   * @param breakpointId - the breakpoint id
   * @returns {string} The CSS code
   */
  function getMediaQueriesStylesheet(
    forceImportant = false,
    breakpointId?: BreakpointId
  ) {
    const htmlPercentage = (100 / 16) * pixelsPerRem;

    let codeBlock = `html {font-size: ${htmlPercentage}%;} /*${pixelsPerRem}px*/`;
    codeBlock += `\n`;

    if (!mediaQueries) {
      return codeBlock;
    }

    if (!breakpoints) {
      return codeBlock;
    }

    let nextMediaQueries: MediaQuery[] = breakpointId
      ? mediaQueries.filter(
          (mediaQuery) => mediaQuery.breakpointId === breakpointId
        )
      : mediaQueries;

    nextMediaQueries.forEach((mediaQuery: MediaQuery) => {
      const {
        breakpointId,
        stepId,
        minFontSize,
        maxFontSize,
        lineHeight,
        marginBottom,
      } = mediaQuery;

      const { minWidth, minWidthREM, maxWidthREM } =
        getViewportSizeByBreakpointId(breakpointId, breakpoints);

      codeBlock += `@media only screen and (min-width: ${minWidth}px) {`;
      codeBlock += `\n`;

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

      codeBlock += `  ${stepId} {`;
      codeBlock += `\n`;
      codeBlock += css("font-size", clampFormula, forceImportant);
      codeBlock += css(
        "line-height",
        withUnit(lineHeight, "%"),
        forceImportant
      );

      codeBlock += css(
        "margin-bottom",
        withUnit(marginBottom, "rem"),
        forceImportant
      );
      codeBlock += `  }`;
      codeBlock += `\n`;

      codeBlock += `}`;
      codeBlock += `\n`;
    });

    return codeBlock;
  }

  return {
    getMediaQueriesStylesheet,
  };
}
