import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import usePixelsPerRemSelector from "~/context/app/hooks/usePixelsPerRemSelector";
import {
  BreakpointId,
  Breakpoints,
  BreakpointViewportSize,
} from "~/context/breakpoint-builder/interfaces";

import { BreakpointResponse } from "./interfaces/data-service";

/**
 * @description This hook is responsible to run query against the Breakpoints state.
 *
 */
export default function useBreakpointsQueryService() {
  const { breakpoints } = useBreakpointsSelector();
  const { pixelsPerRem } = usePixelsPerRemSelector();

  /**
   * @description Returns the name of the given breakpointId
   * @returns {string}
   * */
  function getBreakpointName(breakpointId: BreakpointId): string {
    if (breakpoints) {
      const breakpoint = breakpoints[breakpointId];

      if (breakpoint) {
        return breakpoint.label;
      }
    }

    return "";
  }

  /**
   * @description Returns the breakpoint information for the specified breakpoint id
   * @param {BreakpointId} breakpointId
   * @returns {BreakpointResponse}
   * */
  function getBreakpointById(breakpointId: BreakpointId): BreakpointResponse {
    // The firs time the hook is called, the breakpoints state is null as it is not yet loaded.
    // So we need to check if the breakpoints state is null before trying to access it.
    // To not return false positive response, we return a default breakpoint response.
    if (!breakpoints) {
      return {
        ok: true,
      };
    }

    if (isBreakpointExists(breakpointId)) {
      const { label, minWidth, maxWidth } = breakpoints[breakpointId];
      return {
        ok: true,
        payload: {
          id: breakpointId,
          label,
          minWidth: String(minWidth),
          maxWidth: String(maxWidth),
        },
      };
    }
    return {
      ok: false,
      error: `Breakpoint with id ${breakpointId} does not exist.`,
    };
  }

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
    if (breakpoints) {
      return breakpoints[breakpointId] !== undefined;
    }
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
    getBreakpointName,
    getBreakpointById,
    isBreakpointsEmpty,
    isBreakpointExists,
    isBreakpointExistsByViewportSize,
    getViewportSizeByBreakpointId,
  };
}
