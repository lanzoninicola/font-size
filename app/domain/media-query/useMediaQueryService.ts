import { useEffect } from "react";
import useMediaQueriesSelector from "~/context/font-size/hooks/useMediaQueriesSelector";
import useTag from "~/context/font-size/hooks/useTag";
import { BreakpointKey, TagMediaQueries, Tags } from "~/context/interfaces";

import useBreakpointService from "../breakpoints/useBreakpointService";

export default function useMediaQueryService(
  inputMinFontSize?: number,
  inputMaxFontSize?: number
) {
  const { mediaQueries, setMediaQueries } = useMediaQueriesSelector();
  const { breakpoints, breakpointIdSelected, onSelectedBreakpoint } =
    useBreakpointService();
  const { tag, setTag } = useTag();

  function onSaveMediaQuery() {
    let newMediaQueries = { ...mediaQueries };

    let mediaQueriesTag = newMediaQueries[tag];

    if (!mediaQueriesTag) {
      mediaQueriesTag = {};
      newMediaQueries[tag] = mediaQueriesTag;
    }

    mediaQueriesTag[breakpointIdSelected] = {
      minFontSize: inputMinFontSize,
      maxFontSize: inputMaxFontSize,
    };

    setMediaQueries(newMediaQueries as TagMediaQueries);
  }

  function onSelectedTagId(event: React.ChangeEvent<HTMLInputElement>) {
    setTag(event.target.value as Tags);

    return getCurrentFontSizeValues();
  }

  function onSelectedBreakpointId(event: React.ChangeEvent<HTMLInputElement>) {
    onSelectedBreakpoint(event);

    return getCurrentFontSizeValues();
  }

  function getCurrentFontSizeValues() {
    let breakpoint = null;
    let minFontSize = 0;
    let maxFontSize = 0;

    if (breakpoints) {
      if (mediaQueries) {
        let mediaQueriesTag = mediaQueries[tag];

        if (mediaQueriesTag) {
          breakpoint = mediaQueriesTag[breakpointIdSelected];
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

  function getFontSizeByTagAndBreakpointId(
    tag: Tags,
    breakpointId: BreakpointKey
  ) {
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

  return {
    breakpoints,
    mediaQueries,
    breakpointIdSelected,
    getFontSizeByTagAndBreakpointId,
    onSelectedTagId,
    onSelectedBreakpointId,
    onSaveMediaQuery,
  };
}
