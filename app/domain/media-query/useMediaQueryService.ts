import useBreakpointsSelector from "~/context/font-size/hooks/useBreakpointsSelector";
import useMediaQueriesSelector from "~/context/font-size/hooks/useMediaQueriesSelector";
import {
  BreakpointId,
  MediaQueries,
  Selector,
} from "~/context/font-size/interfaces";

export default function useMediaQueryService() {
  const { mediaQueries, setMediaQueries } = useMediaQueriesSelector();
  const { breakpoints } = useBreakpointsSelector();

  function saveMediaQuery(
    breakpointId: BreakpointId,
    selector: Selector,
    minFontSize: number,
    maxFontSize: number
  ) {
    let newMediaQueries = { ...mediaQueries };

    newMediaQueries[breakpointId] = {
      ...newMediaQueries[breakpointId],
      [selector]: {
        ...newMediaQueries[breakpointId][selector],
        minFontSize,
        maxFontSize,
      },
    } as MediaQueries;

    setMediaQueries(newMediaQueries as MediaQueries);
  }

  /**
   *
   * @param {BreakpointId} breakpointId - The breakpoint id
   * @param {Selector} selector - The selector (tag, class, id) to get the media query info
   * @param {MediaQueries} mq - Optional if the component cannot access to the mediaqueries context
   *
   * @returns The min and max font size for the given selector and breakpoint in REM
   */
  function getFontSizeRange(breakpointId: BreakpointId, selector: Selector) {
    let breakpoint = null;
    let minFontSize = 0;
    let maxFontSize = 0;

    if (mediaQueries) {
      breakpoint = mediaQueries[breakpointId];

      if (breakpoint) {
        minFontSize = breakpoint[selector]?.minFontSize ?? 0;
        maxFontSize = breakpoint[selector]?.maxFontSize ?? 0;
      }
    }

    return {
      minFontSize,
      maxFontSize,
    };
  }

  return {
    breakpoints,
    mediaQueries,
    getFontSizeRange,
    saveMediaQuery,
  };
}
