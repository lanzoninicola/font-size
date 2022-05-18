import { css } from "@emotion/react";
import { BreakpointId } from "~/context/app/types/breakpoints";
import { MediaQuery } from "~/context/app/types/media-queries";
import breakpoints from "~/routes/app/breakpoints";
import mediaQueries from "~/routes/app/media-queries";
import calculateClampSlope from "./calculateClampSlope";
import calculateClampYAxisIntersection from "./calculateClampYAxisIntersection";
import generateClampFormula from "./generateClampFormula";
import withUnit from "./withUnit";

/**
 * @description Returns the CSS code block based on the MediaQueries state
 *
 * @param forceImportant - if true add !important to the CSS*
 * @param breakpointId - the breakpoint id
 * @returns {string} The CSS code
 */
function getMediaQueriesStylesheet(
  mediaQueries: MediaQuery[],
  forceImportant = false,
  breakpointId?: BreakpointId
) {
  //   const htmlPercentage = (100 / 16) * pixelsPerRem;

  //   let codeBlock = `html {font-size: ${htmlPercentage}%;} /*${pixelsPerRem}px*/`;
  let codeBlock = "";
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
    codeBlock += css("line-height", withUnit(lineHeight, "%"), forceImportant);

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
