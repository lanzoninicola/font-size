import { useEffect, useState } from "react";
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import usePixelsPerRemSelector from "~/context/app/hooks/usePixelsPerRemSelector";
import useTypeScaleConfigSelector from "~/context/app/hooks/useTypeScaleConfigSelector";
import useTypeScaleStepsSelector from "~/context/app/hooks/useTypeScaleStepsSelector";
import useTypographySelector from "~/context/app/hooks/useTypographySelector";
import { MediaQuery } from "~/context/app/interfaces";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";

import useBreakpointsQueryService from "../breakpoints/useBreakpointsQueryService";
import useMediaQueriesQueryService from "../media-queries/useMediaQueriesQueryService";
import useTypeScaleStepsQueryService from "../type-scale-steps/useTypeScaleStepsQueryService";
import calculateClampSlope from "./calculateClampSlope";
import calculateClampYAxisIntersection from "./calculateClampYAxisIntersection";
import generateClampFormula from "./generateClampFormula";

export default function useStylesheet() {
  const { pixelsPerRem } = usePixelsPerRemSelector();
  const { mediaQueries } = useMediaQueriesSelector();
  const { breakpoints } = useBreakpointsSelector();
  const { getHeadersSteps } = useTypeScaleStepsQueryService();
  const { typography } = useTypographySelector();

  const { getViewportSizeByBreakpointId } = useBreakpointsQueryService();

  /**
   * @description Combines the body and headers typography CSS styles
   * @param forceImportant
   * @returns {string} The CSS code block
   */
  function getTypographyStyleSheet(forceImportant = false) {
    let codeBlock = "";
    codeBlock += getBodyTypographyStylesheet(forceImportant);
    codeBlock += getHeadersTypographyStylesheet(forceImportant);
    return codeBlock;
  }

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

  /**
   * @description: Returns the CSS code for the body typography from the Typography state
   * @param forceImportant - if true add !important to the CSS
   * @returns {string} - The CSS code block
   *
   * @private
   * */
  function getBodyTypographyStylesheet(forceImportant = false) {
    const { fontFamily, fontWeight } = typography.body;

    let codeBlock = `  body {`;
    codeBlock += `\n`;
    // font-family style
    codeBlock += css("font-family", fontFamily, forceImportant);
    // font-weight style
    codeBlock += css("font-weight", fontWeight, forceImportant);

    codeBlock += `  }`;
    codeBlock += `\n`;

    return codeBlock;
  }

  /**
   * @description: Returns the CSS code for the headers typography from the Typography state
   * @param forceImportant - if true add !important to the CSS
   * @returns {string} - The CSS code block
   *
   * @private
   * */
  function getHeadersTypographyStylesheet(forceImportant = false) {
    const headers = getHeadersSteps();
    const { fontFamily, fontWeight } = typography.headings;
    let codeBlock = "";

    headers.forEach((header) => {
      codeBlock += `  ${header.key} {`;
      codeBlock += `\n`;
      // font-family style
      codeBlock += css("font-family", fontFamily, forceImportant);
      // font-weight style
      codeBlock += css("font-weight", fontWeight, forceImportant);
      codeBlock += `  }`;
      codeBlock += `\n`;
    });

    return codeBlock;
  }

  /**
   * @description: Returns the CSS code for the given property and value
   * @param property - the CSS property
   * @param value - the CSS value
   * @param forceImportant - if true add !important to the CSS
   * @returns {string} - The CSS code block
   *
   * @private
   *
   * */
  function css(
    property: string,
    value: string,
    forceImportant: boolean
  ): string {
    let codeBlock = `  ${property}: ${value}${
      forceImportant && " !important"
    };`;
    codeBlock += `\n`;

    return codeBlock;
  }

  /**
   * @description: add the unit to the CSS prop value
   * @param value - the CSS value
   * @param unit - the CSS unit
   * @returns {string} - "${value}${unit}"
   *
   * @private
   * */
  function withUnit(value: number, unit: string = "rem") {
    return `${value}${unit}`;
  }

  return {
    getTypographyStyleSheet,
    getMediaQueriesStylesheet,
  };
}
