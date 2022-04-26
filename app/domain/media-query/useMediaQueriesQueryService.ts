/**
 * @description This hook is responsible to run query against the MediaQueries state
 */

import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useMediaQueryService from "./useMediaQueryService";

export default function useMediaQueriesQueryService() {
  const { mediaQueries } = useMediaQueryService();

  /**
   * @description Check if the global Media Queries object is empty
   * @returns {boolean}
   */
  // function isMediaQueryEmpty() {
  //   if (mediaQueries) {
  //     return Object.keys(mediaQueries).length === 0;
  //   }

  //   return true;
  // }

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

  return {
    isMediaQueryEmpty,
    isMediaQueryOfBreakpointExists,
  };
}
