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

  function isBreakpointsEmpty() {
    if (breakpoints) {
      return Object.keys(breakpoints).length === 0;
    }

    return true;
  }

  function isBreakpointExists(breakpointId: BreakpointId) {
    return !!breakpoints[breakpointId];
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
    getViewportSizeByBreakpointId,
  };
}
