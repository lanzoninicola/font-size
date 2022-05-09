import { mediaQueryInitialStatePartial } from "~/context/app/app-context";
import { MediaQuery } from "~/context/app/interfaces";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import { TypeScaleStepConfig } from "~/context/type-scale-steps-builder/interfaces";

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

  /**
   *
   * @deprecated - use getMediaQueryByBreakpointIdAndStepId instead
   *
   * @param {BreakpointId} breakpointId - The breakpoint id
   * @param {SelectorId} typeScaleStep - The typeScaleStep (tag, class, id) to get the media query info
   * @param {MediaQueries} mq - Optional if the component cannot access to the mediaqueries context
   *
   * @returns The min and max font size for the given typeScaleStep and breakpoint in REM
   */
  function getTokenValues(
    breakpointId: BreakpointId,
    typeScaleStep: TypeScaleStepConfig
  ) {
    let minFontSize = 0;
    let maxFontSize = 0;
    let lineHeight = DEFAULT_LINE_HEIGHT;

    if (mediaQueries) {
      const breakpointMediaQuery: MediaQuery | undefined = mediaQueries.find(
        (mq) =>
          mq.breakpointId === breakpointId && mq.stepId === typeScaleStep.key
      );

      if (breakpointMediaQuery) {
        minFontSize = breakpointMediaQuery.minFontSize ?? 0;
        maxFontSize = breakpointMediaQuery.maxFontSize ?? 0;
        lineHeight = breakpointMediaQuery.lineHeight ?? lineHeight;
      }
    }

    return {
      minFontSize,
      maxFontSize,
      lineHeight,
    };
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
    getTokenValues,
    getMediaQueryByBreakpointIdAndStepId,
    removeMediaQueriesByBreakpointId,
  };
}
