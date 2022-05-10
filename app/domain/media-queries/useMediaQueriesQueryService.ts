import { mediaQueryInitialStatePartial } from "~/context/app/app-context";
import { MediaQuery } from "~/context/app/interfaces";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";

/**
 * @description This hook is responsible to run query against the MediaQueries state
 */
export default function useMediaQueriesQueryService(
  mediaQueries: MediaQuery[] | null
) {
  const DEFAULT_LINE_HEIGHT = 120;

  /**
   * @description Check if the Media Queries array has the specified breakpoint
   *
   * @param {BreakpointId} breakpointId
   * @returns {boolean}
   *
   * */
  function isMediaQueryOfBreakpointExists(bp: BreakpointId) {
    if (!mediaQueries) return false;
    return mediaQueries.some((mq) => mq.breakpointId === bp);
  }

  function getMediaQueriesByBreakpointId(bp: BreakpointId) {
    if (!mediaQueries) return null;
    return mediaQueries.filter((mq) => mq.breakpointId === bp);
  }

  /**
   *
   * @param breakpointId - the breakpoint id
   * @param stepId - Step key
   * @param mediaQueries - Media queries
   * @returns Media query step configuration for the given breakpoint and step. If not found, returns the initial state for the media query
   *
   * @description - Get the media query step configuration for the breakpoint (minFontSize, maxFontSize, lineHeight, marginBottom, fontFamily)
   */
  function getMediaQueryByBreakpointIdAndStepId(
    breakpointId: BreakpointId,
    stepId: string
  ): Omit<MediaQuery, "breakpointId" | "stepId"> {
    const mq = mediaQueries?.find(
      (mq) => mq.breakpointId === breakpointId && mq.stepId === stepId
    );

    return {
      minFontSize: mq?.minFontSize ?? mediaQueryInitialStatePartial.minFontSize,
      maxFontSize: mq?.maxFontSize ?? mediaQueryInitialStatePartial.maxFontSize,
      lineHeight: mq?.lineHeight ?? mediaQueryInitialStatePartial.lineHeight,
      marginBottom:
        mq?.marginBottom ?? mediaQueryInitialStatePartial.marginBottom,
      fontFamily: mq?.fontFamily ?? mediaQueryInitialStatePartial.fontFamily,
      fontWeight: mq?.fontWeight ?? mediaQueryInitialStatePartial.fontWeight,
    };
  }

  /**
   *
   * @param breakpointId - the breakpoint id
   * @param mediaQueries - Media queries
   * @returns A new list of media queries without the records of media query for the breakpoint
   */
  function removeMediaQueriesByBreakpointId(
    breakpointId: BreakpointId
  ): MediaQuery[] | [] {
    return (
      mediaQueries?.filter(
        (mediaQuery) => mediaQuery.breakpointId !== breakpointId
      ) ?? []
    );
  }

  return {
    isMediaQueryOfBreakpointExists,
    getMediaQueriesByBreakpointId,
    getMediaQueryByBreakpointIdAndStepId,
    removeMediaQueriesByBreakpointId,
  };
}
