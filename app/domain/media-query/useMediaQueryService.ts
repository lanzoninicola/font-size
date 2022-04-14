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
