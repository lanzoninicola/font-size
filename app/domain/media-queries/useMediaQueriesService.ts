import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import { MediaQuery, TypeScaleStepEntityState } from "~/context/app/types";
import useMediaQueryBuilderContext from "~/context/media-query-builder/hooks/useMediaQueryBuilderContext";
import { mediaQueryInitialStatePartial } from "~/context/media-query-builder/media-query-builder-context";

export default function useMediaQueriesService() {
  const {
    currentBreakpointId,
    currentTypeScaleStepId,
    minFontSize,
    maxFontSize,
    lineHeight,
    marginBottom,
    setEntityState,
    setCurrentTypeScaleStepId,
    setMinFontSize,
    setMaxFontSize,
    setLineHeight,
    setMarginBottom,
  } = useMediaQueryBuilderContext();
  const { mediaQueries, setMediaQueries } = useMediaQueriesSelector();

  function saveMediaQuery() {
    const mediaQueryData = {
      minFontSize: parseFloat(minFontSize),
      maxFontSize: parseFloat(maxFontSize),
      lineHeight: parseInt(lineHeight, 10),
      marginBottom: parseFloat(marginBottom),
    };

    let nextMediaQueries: MediaQuery[] = mediaQueries ? [...mediaQueries] : [];

    const stepMediaQuery: MediaQuery | undefined = mediaQueries?.find(
      (mediaQuery) =>
        mediaQuery.breakpointId === currentBreakpointId &&
        mediaQuery.stepId === currentTypeScaleStepId
    );

    const nextStepMediaQuery: Omit<MediaQuery, "fontFamily" | "fontWeight"> =
      stepMediaQuery
        ? { ...stepMediaQuery }
        : {
            ...mediaQueryInitialStatePartial,
            breakpointId: currentBreakpointId,
            stepId: currentTypeScaleStepId,
            ...mediaQueryData,
          };

    setMediaQueries(nextMediaQueries);

    setEntityState(TypeScaleStepEntityState.idle);
    setCurrentTypeScaleStepId("");
    setMinFontSize("");
    setMaxFontSize("");
    setLineHeight("");
    setMarginBottom("");
  }

  /**
   * @description Delete media query for current breakpoint and selector
   *
   * @param bp - the breakpoint id
   * @param s - the selector
   */
  function deleteMediaQuery(s: StepId) {
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
