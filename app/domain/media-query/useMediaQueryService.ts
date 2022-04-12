import { useEffect } from "react";
import useMediaQueriesSelector from "~/context/font-size/hooks/useMediaQueriesSelector";
import { Tags, BreakpointKey, TagMediaQueries } from "~/context/interfaces";

export default function useMediaQueryService(
  breakpointId: BreakpointKey,
  tag: Tags,
  inputMinFontSize?: number,
  inputMaxFontSize?: number
) {
  const { mediaQueries, setMediaQueries } = useMediaQueriesSelector();

  function onCreateMediaQuery() {
    let newMediaQueries = { ...mediaQueries };

    let mediaQueriesTag = newMediaQueries[tag];

    if (!mediaQueriesTag) {
      mediaQueriesTag = {};
      newMediaQueries[tag] = mediaQueriesTag;
    }

    mediaQueriesTag[breakpointId] = {
      minFontSize: inputMinFontSize,
      maxFontSize: inputMaxFontSize,
    };

    setMediaQueries(newMediaQueries as TagMediaQueries);
  }

  function onUpdateMediaQuery() {}

  return {
    mediaQueries,
    onCreateMediaQuery,
    onUpdateMediaQuery,
  };
}
