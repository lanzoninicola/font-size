/**
 * @description This hook is responsible to run query against the MediaQueries state
 */

import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useMediaQueryService from "./useMediaQueryService";

export default function useMediaQueriesQueryService() {
  const { mediaQueries } = useMediaQueryService();

  function isMediaQueryOfBreakpointExists(bp: BreakpointId) {
    if (!mediaQueries) return false;
    if (!mediaQueries[bp]) return false;
    return true;
  }

  return {
    isMediaQueryOfBreakpointExists,
  };
}
