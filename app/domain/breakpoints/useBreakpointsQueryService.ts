import React from "react";
import {
  BreakpointViewportSize,
  Breakpoints,
  BreakpointId,
} from "~/context/breakpoint-builder/interfaces";
import useBreakpointsSelector from "~/context/font-size/hooks/useBreakpointsSelector";
import usePixelsPerRemSelector from "~/context/font-size/hooks/usePixelsPerRemSelector";

/**
 * @description This hook is responsible to run query against the Breakpoints state.
 *
 */
export default function useBreakpointsQueryService() {
  const { breakpoints } = useBreakpointsSelector();
  const { pixelsPerRem } = usePixelsPerRemSelector();

  console.log("useBreakpointsQueryService fired", breakpoints);

  /**
   * @description Check if the global Breakpoints object is empty
   * @returns {boolean}
   */
  function isBreakpointsEmpty() {
    if (breakpoints) {
      return Object.keys(breakpoints).length === 0;
    }

    return true;
  }

  /**
   * @description Check if the breakpoint exists in the global Breakpoints object by its id
   * @param breakpointId - The breakpoint id to check
   * @returns {boolean}
   */
  function isBreakpointExists(breakpointId: BreakpointId) {
    return !!breakpoints[breakpointId];
  }

  /**
   * @description Check if the breakpoint exists in the global Breakpoints object by viewport size (width and height)
   * @param viewportSize - The viewport size to check
   * @returns {boolean}
   */
  function isBreakpointExistsByViewportSize(
    viewportSize: BreakpointViewportSize
  ) {
    const { minWidth, maxWidth } = viewportSize;

    for (const breakpointId in breakpoints) {
      if (breakpoints.hasOwnProperty(breakpointId)) {
        const breakpoint = breakpoints[breakpointId];
        const { minWidth: breakpointMinWidth, maxWidth: breakpointMaxWidth } =
          breakpoint;

        if (
          minWidth === breakpointMinWidth &&
          maxWidth === breakpointMaxWidth
        ) {
          return true;
        }
      }
    }
  }

  /**
   *
   * @param {BreakpointId} breakpointId - The breakpoint id
   * @param {MediaQueries} b - Optional if the component cannot access to the breakpoints value context
   *
   * @returns The min and max viewport size for the given breakpointId in PX and REM
   */
  function getViewportSizeByBreakpointId(
    id: BreakpointId,
    b: Breakpoints = breakpoints || {}
  ) {
    let viewportSize: BreakpointViewportSize = { minWidth: 0, maxWidth: 0 };
    let minWidth = 0;
    let maxWidth = 0;
    let minWidthREM = 0;
    let maxWidthREM = 0;

    if (b) {
      viewportSize = b[id];
    }

    if (viewportSize) {
      minWidth = viewportSize.minWidth || 0;
      maxWidth = viewportSize.maxWidth || 0;
      minWidthREM = minWidth / pixelsPerRem;
      maxWidthREM = maxWidth / pixelsPerRem;
    }

    return {
      minWidth,
      maxWidth,
      minWidthREM,
      maxWidthREM,
    };
  }

  return {
    breakpoints,
    isBreakpointsEmpty,
    isBreakpointExists,
    isBreakpointExistsByViewportSize,
    getViewportSizeByBreakpointId,
  };
}
