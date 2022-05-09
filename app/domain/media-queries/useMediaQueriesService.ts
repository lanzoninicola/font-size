import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import useMediaQueryBuilderContext from "~/context/media-query-builder/hooks/useMediaQueryBuilderContext";

export default function useMediaQueriesService() {
  const {
    currentBreakpointId,
    currentTypeScaleStepId,
    minFontSize,
    maxFontSize,
    lineHeight,
    setEntityState,
    setCurrentTypeScaleStepId,
    setMinFontSize,
    setMaxFontSize,
    setLineHeight,
  } = useMediaQueryBuilderContext();
  const { mediaQueries, setMediaQueries } = useMediaQueriesSelector();

  function saveMediaQuery() {
    const mediaQueryData = {
      minFontSize: parseFloat(minFontSize),
      maxFontSize: parseFloat(maxFontSize),
      lineHeight: parseFloat(lineHeight),
    };

    const nextMediaQueries: MediaQueries = { ...mediaQueries };
    nextMediaQueries[currentBreakpointId] = {
      ...nextMediaQueries[currentBreakpointId],
    };
    nextMediaQueries[currentBreakpointId][currentTypeScaleStepId] =
      mediaQueryData;

    setMediaQueries(nextMediaQueries);

    setEntityState(SelectorEntityState.idle);
    setCurrentTypeScaleStepId("");
    setMinFontSize("");
    setMaxFontSize("");
    setLineHeight("");
  }

  /**
   * @description Delete media query for current breakpoint and selector
   *
   * @param bp - the breakpoint id
   * @param s - the selector
   */
  function deleteMediaQuery(s: SelectorId) {
    let nextMediaQueries: MediaQueries | null = { ...mediaQueries };

    delete nextMediaQueries[currentBreakpointId][s];

    if (Object.keys(nextMediaQueries[currentBreakpointId]).length === 0) {
      delete nextMediaQueries[currentBreakpointId];
      setCurrentTypeScaleStepId("");
    }

    if (Object.keys(nextMediaQueries).length === 0) {
      setMediaQueries(null);
    }

    setMediaQueries(nextMediaQueries as MediaQueries | null);
  }

  function deleteAllMediaQueries() {
    setMediaQueries({} as MediaQueries);
  }

  return {
    saveMediaQuery,
    deleteMediaQuery,
    deleteAllMediaQueries,
  };
}
