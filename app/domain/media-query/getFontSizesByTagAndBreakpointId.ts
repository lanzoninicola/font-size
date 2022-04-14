import useBreakpointsSelector from "~/context/font-size/hooks/useBreakpointsSelector";
import useMediaQueriesSelector from "~/context/font-size/hooks/useMediaQueriesSelector";
import { BreakpointId, HTMLTags } from "~/context/font-size/interfaces";

export default function getFontSizesByTagAndBreakpoints(
  tag: HTMLTags,
  breakpointId: BreakpointId
) {
  const { mediaQueries } = useMediaQueriesSelector();
  const { breakpoints } = useBreakpointsSelector();

  let breakpoint = null;
  let minFontSize = 0;
  let maxFontSize = 0;

  if (breakpoints) {
    if (mediaQueries) {
      let mediaQueriesTag = mediaQueries[tag];

      if (mediaQueriesTag) {
        breakpoint = mediaQueriesTag[breakpointId];
      }
    }
  }

  if (breakpoint) {
    minFontSize = breakpoint.minFontSize || 0;
    maxFontSize = breakpoint.maxFontSize || 0;
  }

  return {
    minFontSize,
    maxFontSize,
  };
}
