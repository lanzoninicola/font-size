import useBreakpointsSelector from "~/context/font-size/hooks/useBreakpointsSelector";
import usePixelsPerRemSelector from "~/context/font-size/hooks/usePixelsPerRemSelector";
import {
  BreakpointId,
  Breakpoints,
  BreakpointViewportSize,
} from "~/context/font-size/interfaces";

export default function useBreakpointService() {
  const { breakpoints, setBreakpoints } = useBreakpointsSelector();
  const { pixelsPerRem } = usePixelsPerRemSelector();

  function buildId({
    minWidth = 0,
    maxWidth = 0,
  }: {
    minWidth: number;
    maxWidth: number;
  }) {
    return `min${minWidth}max${maxWidth}`;
  }

  function buildLabel({
    minWidth,
    maxWidth,
  }: {
    minWidth: string;
    maxWidth: string;
  }) {
    return `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
  }

  function createBreakpoint(
    minWidth: number,
    maxWidth: number,
    label?: string
  ) {
    const id = buildId({ minWidth, maxWidth });
    const viewportSize: BreakpointViewportSize = {
      minWidth,
      maxWidth,
    };

    const breakpoint: Breakpoints = {
      [id]: {
        label:
          label ||
          buildLabel({
            minWidth: String(minWidth),
            maxWidth: String(maxWidth),
          }),
        ...viewportSize,
      },
    };

    setBreakpoints({
      ...breakpoints,
      ...breakpoint,
    });
  }

  function saveBreakpoint(
    breakpointId: string,
    label: string,
    minWidth: number,
    maxWidth: number
  ): void {
    let newBreakpoints = { ...breakpoints };

    newBreakpoints[breakpointId] = {
      label: label,
      minWidth: minWidth,
      maxWidth: maxWidth,
    };

    setBreakpoints(newBreakpoints);
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

    console.log(b);

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
    buildLabel,
    createBreakpoint,
    saveBreakpoint,
    getViewportSizeByBreakpointId,
  };
}
