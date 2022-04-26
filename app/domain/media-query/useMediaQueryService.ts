import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useBreakpointsSelector from "~/context/font-size/hooks/useBreakpointsSelector";
import useMediaQueriesSelector from "~/context/font-size/hooks/useMediaQueriesSelector";
import { MediaQueries, SelectorKey } from "~/context/font-size/interfaces";
import { MediaQueryBreakpointFlat } from "~/context/font-size/interfaces/media-query";
import useMediaQueryBuilderContext from "~/context/media-query-builder/hooks/useMediaQueryBuilderContext";
import { EntityState } from "~/context/shared/interfaces/entity-state";
import parseInputString from "../utilities/parseInputString";

export default function useMediaQueryService() {
  const {
    entityState,
    currentBreakpointId,
    currentSelector,
    minFontSize,
    maxFontSize,
    setEntityState,
    setCurrentBreakpointId,
    setCurrentSelector,
    setMinFontSize,
    setMaxFontSize,
  } = useMediaQueryBuilderContext();
  const { mediaQueries, setMediaQueries } = useMediaQueriesSelector();
  const { breakpoints } = useBreakpointsSelector();

  function changeBreakpoint(bp: BreakpointId) {
    updateEntityStateOnBreakpointChange(bp);
    setCurrentBreakpointId(bp);
  }

  function changeSelector(s: SelectorKey) {
    updateEntityStateOnSelectorChange(s);
    setCurrentSelector(s);
  }

  function updateEntityStateOnBreakpointChange(bp: BreakpointId) {
    if (isMediaQueryOfBreakpointExists(bp)) {
      setEntityState(EntityState.edit);
    } else {
      setEntityState(EntityState.new);
    }
  }

  function updateEntityStateOnSelectorChange(s: SelectorKey) {
    if (isMediaQueryOfBreakpointExistsAndSelector(currentBreakpointId, s)) {
      setEntityState(EntityState.edit);
    } else {
      setEntityState(EntityState.new);
    }
  }

  function updateMinMaxFontSizeOnBreakpointAndSelectorChange() {
    if (
      !isMediaQueryOfBreakpointExistsAndSelector(
        currentBreakpointId,
        currentSelector
      )
    ) {
      changeMinFontSize("");
      changeMaxFontSize("");

      return;
    }

    const { minFontSize, maxFontSize } = getFontSizeRange(
      currentBreakpointId,
      currentSelector
    );
    changeMinFontSize(minFontSize.toString());
    changeMaxFontSize(maxFontSize.toString());
  }

  function changeMinFontSize(minfs: string) {
    parseInputString(minfs);
    setMinFontSize(minfs);
  }

  function changeMaxFontSize(maxfs: string) {
    parseInputString(maxfs);
    setMaxFontSize(maxfs);
  }

  function initMediaQuery() {
    setEntityState(EntityState.new);
  }

  function saveMediaQuery() {
    if (entityState === EntityState.new) {
      createMediaQuery(
        currentBreakpointId,
        currentSelector,
        parseFloat(minFontSize),
        parseFloat(maxFontSize)
      );
    }

    if (entityState === EntityState.edit) {
      updateMediaQuery(
        currentBreakpointId,
        currentSelector,
        parseFloat(minFontSize),
        parseFloat(maxFontSize)
      );
    }
  }

  function createMediaQuery(
    breakpointId: BreakpointId,
    selector: SelectorKey,
    minFontSize: number,
    maxFontSize: number
  ) {
    const mediaQueryData = {
      minFontSize,
      maxFontSize,
    };

    const nextMediaQueries: MediaQueries = { ...mediaQueries };
    nextMediaQueries[breakpointId] = { ...nextMediaQueries[breakpointId] };
    nextMediaQueries[breakpointId][selector] = mediaQueryData;

    setMediaQueries(nextMediaQueries);
  }

  function updateMediaQuery(
    breakpointId: BreakpointId,
    selector: SelectorKey,
    minFontSize: number,
    maxFontSize: number
  ) {
    let nextMediaQueries = { ...mediaQueries };

    nextMediaQueries[breakpointId] = {
      ...nextMediaQueries[breakpointId],
      [selector]: {
        ...nextMediaQueries[breakpointId][selector],
        minFontSize,
        maxFontSize,
      },
    } as MediaQueries;

    setMediaQueries(nextMediaQueries as MediaQueries);
  }

  /**
   * @description Edit media query for current breakpoint and selector
   *
   * @param bp - the breakpoint id
   * @param s - the selector
   */
  function editMediaQuery(bp: BreakpointId, s: SelectorKey) {
    console.log("editMediaQuery", bp, s);
    setCurrentBreakpointId(bp);
    setCurrentSelector(s);
    setEntityState(EntityState.edit);

    updateMinMaxFontSizeOnBreakpointAndSelectorChange();
  }

  /**
   * @description Delete media query for current breakpoint and selector
   *
   * @param bp - the breakpoint id
   * @param s - the selector
   */
  function deleteMediaQuery(bp: BreakpointId, s: SelectorKey) {
    let nextMediaQueries: MediaQueries | null = { ...mediaQueries };

    delete nextMediaQueries[bp][s];

    if (Object.keys(nextMediaQueries[bp]).length === 0) {
      delete nextMediaQueries[bp];
      setCurrentSelector("");
    }

    if (Object.keys(nextMediaQueries).length === 0) {
      setMediaQueries(null);
    }

    setMediaQueries(nextMediaQueries as MediaQueries | null);
  }

  /**
   *
   * @param {BreakpointId} breakpointId - The breakpoint id
   * @param {SelectorKey} selector - The selector (tag, class, id) to get the media query info
   * @param {MediaQueries} mq - Optional if the component cannot access to the mediaqueries context
   *
   * @returns The min and max font size for the given selector and breakpoint in REM
   */
  function getFontSizeRange(breakpointId: BreakpointId, selector: SelectorKey) {
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

  /**
   * @param {stirng} bp - The breakpoint id
   * @returns {array} - An array of media query breakpoints for the given breakpoint
   */
  function listMediaQueriesByBreakpointId(
    bp: BreakpointId
  ): MediaQueryBreakpointFlat[] {
    if (!isMediaQueryOfBreakpointExists(bp)) {
      return [];
    }

    let list = [] as MediaQueryBreakpointFlat[];
    const breakpoint = mediaQueries?.[bp];

    if (!breakpoint) {
      return [];
    }

    for (let selector in breakpoint) {
      const { minFontSize, maxFontSize } = breakpoint[selector];

      list.push({
        selector,
        minFontSize: minFontSize ? minFontSize : 0,
        maxFontSize: maxFontSize ? maxFontSize : 0,
      });
    }

    return list;
  }

  function isMediaQueryOfBreakpointExists(bp: BreakpointId) {
    if (!mediaQueries) return false;
    if (!mediaQueries[bp]) return false;
    return true;
  }

  function isMediaQueryOfBreakpointExistsAndSelector(
    bp: BreakpointId,
    s: SelectorKey
  ) {
    if (!mediaQueries) return false;
    if (!mediaQueries[bp]) return false;
    if (!mediaQueries[bp][s]) return false;
    return true;
  }

  return {
    breakpoints,
    mediaQueries,
    entityState,
    currentBreakpointId,
    currentSelector,
    minFontSize,
    maxFontSize,
    initMediaQuery,
    changeBreakpoint,
    changeSelector,
    changeMinFontSize,
    changeMaxFontSize,
    updateMinMaxFontSizeOnBreakpointAndSelectorChange,
    getFontSizeRange,
    saveMediaQuery,
    editMediaQuery,
    deleteMediaQuery,
    listMediaQueriesByBreakpointId,
  };
}
