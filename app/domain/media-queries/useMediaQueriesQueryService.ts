/**
 * @description This hook is responsible to run query against the MediaQueries state
 */
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import { SelectorId } from "~/context/app/interfaces";

export default function useMediaQueriesQueryService() {
  const { mediaQueries } = useMediaQueriesSelector();
  const DEFAULT_LINE_HEIGHT = 120;

  function isMediaQueryEmpty() {
    return new Promise((resolve, reject) => {
      if (mediaQueries !== null) {
        resolve(Object.keys(mediaQueries).length === 0);
      }

      reject("mediaQueries is null");
    });
  }

  /**
   * @description Check if the Media Queries object has the specified breakpoint
   *
   * @param {BreakpointId} breakpointId
   * @returns {boolean}
   *
   * */
  function isMediaQueryOfBreakpointExists(bp: BreakpointId) {
    if (!mediaQueries) return false;
    if (!mediaQueries[bp]) return false;
    return true;
  }

  /**
   *
   * @param {BreakpointId} breakpointId - The breakpoint id
   * @param {SelectorId} selector - The selector (tag, class, id) to get the media query info
   * @param {MediaQueries} mq - Optional if the component cannot access to the mediaqueries context
   *
   * @returns The min and max font size for the given selector and breakpoint in REM
   */
  function getTokenValues(breakpointId: BreakpointId, selector: SelectorId) {
    let breakpoint = null;
    let minFontSize = 0;
    let maxFontSize = 0;
    let lineHeight = DEFAULT_LINE_HEIGHT;

    if (mediaQueries) {
      breakpoint = mediaQueries[breakpointId];

      if (breakpoint) {
        minFontSize = breakpoint[selector]?.minFontSize ?? 0;
        maxFontSize = breakpoint[selector]?.maxFontSize ?? 0;
        lineHeight = breakpoint[selector]?.lineHeight ?? lineHeight;
      }
    }

    return {
      minFontSize,
      maxFontSize,
      lineHeight,
    };
  }

  function isMediaQueryOfBreakpointAndSelectorExists(
    bp: BreakpointId,
    s: SelectorId
  ) {
    if (!mediaQueries) return false;
    if (!mediaQueries[bp]) return false;
    if (!mediaQueries[bp][s]) return false;
    return true;
  }

  return {
    isMediaQueryEmpty,
    isMediaQueryOfBreakpointExists,
    isMediaQueryOfBreakpointAndSelectorExists,
    getTokenValues,
  };
}