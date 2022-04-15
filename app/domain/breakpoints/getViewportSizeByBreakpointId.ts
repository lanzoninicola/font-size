import usePixelsPerRemSelector from "~/context/font-size/hooks/usePixelsPerRemSelector";
import {
  BreakpointId,
  Breakpoints,
  BreakpointViewportSize,
} from "~/context/font-size/interfaces";

/**
 *
 * @param {BreakpointId} breakpointId - The breakpoint id
 * @param {Breakpoints} b - Optional if the component cannot access to the breakpoints value context
 *
 * @returns The min and max viewport size for the given breakpointId in PX and REM
 */
export default function getViewportSizeByBreakpointId(
  id: BreakpointId,
  b: Breakpoints = {} as Breakpoints
) {
  const { pixelsPerRem } = usePixelsPerRemSelector();

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
