import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import { MediaQueries, SelectorId } from "~/context/app/interfaces";
import useMediaQueryBuilderContext from "~/context/media-query-builder/hooks/useMediaQueryBuilderContext";
import {
  EntityState,
  SelectorEntityState,
} from "~/context/shared/interfaces/entity-state";

export default function useMediaQueriesService() {
  const {
    entityState,
    currentBreakpointId,
    currentSelectorId,
    minFontSize,
    maxFontSize,
    setEntityState,
    setCurrentSelector,
    setMinFontSize,
    setMaxFontSize,
  } = useMediaQueryBuilderContext();
  const { mediaQueries, setMediaQueries } = useMediaQueriesSelector();

  function saveMediaQuery() {
    const mediaQueryData = {
      minFontSize: parseFloat(minFontSize),
      maxFontSize: parseFloat(maxFontSize),
    };

    const nextMediaQueries: MediaQueries = { ...mediaQueries };
    nextMediaQueries[currentBreakpointId] = {
      ...nextMediaQueries[currentBreakpointId],
    };
    nextMediaQueries[currentBreakpointId][currentSelectorId] = mediaQueryData;

    setMediaQueries(nextMediaQueries);

    setEntityState(SelectorEntityState.idle);
    setCurrentSelector("");
    setMinFontSize("");
    setMaxFontSize("");
  }

  // function createMediaQuery(
  //   breakpointId: BreakpointId,
  //   selector: SelectorId,
  //   minFontSize: number,
  //   maxFontSize: number
  // ) {
  //   const mediaQueryData = {
  //     minFontSize,
  //     maxFontSize,
  //   };

  //   const nextMediaQueries: MediaQueries = { ...mediaQueries };
  //   nextMediaQueries[breakpointId] = { ...nextMediaQueries[breakpointId] };
  //   nextMediaQueries[breakpointId][selector] = mediaQueryData;

  //   setMediaQueries(nextMediaQueries);
  // }

  // function updateMediaQuery(
  //   breakpointId: BreakpointId,
  //   selector: SelectorId,
  //   minFontSize: number,
  //   maxFontSize: number
  // ) {
  //   let nextMediaQueries = { ...mediaQueries };

  //   nextMediaQueries[breakpointId] = {
  //     ...nextMediaQueries[breakpointId],
  //     [selector]: {
  //       ...nextMediaQueries[breakpointId][selector],
  //       minFontSize,
  //       maxFontSize,
  //     },
  //   } as MediaQueries;

  //   setMediaQueries(nextMediaQueries as MediaQueries);
  // }

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
      setCurrentSelector("");
    }

    if (Object.keys(nextMediaQueries).length === 0) {
      setMediaQueries(null);
    }

    setMediaQueries(nextMediaQueries as MediaQueries | null);
  }

  return {
    saveMediaQuery,
    deleteMediaQuery,
  };
}
