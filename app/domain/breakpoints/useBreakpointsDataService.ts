import {
  BreakpointId,
  Breakpoints,
  BreakpointViewportSize,
} from "~/context/breakpoint-builder/interfaces";
import useBreakpointsSelector from "~/context/font-size/hooks/useBreakpointsSelector";

import useMediaQueriesQueryService from "../media-query/useMediaQueriesQueryService";
import parseDecimalNumber from "../utilities/parseDecimalNumber";
import {
  BreakpointsDataServiceResponse,
  DeleteBreakpointResponse,
} from "./interfaces";
import { CreateUpdateBreakpointResponse } from "./interfaces/data-service";

/**
 * @description This hook is responsible for managing CRUD operations on the breakpoints.
 */
export default function useBreakpointsDataService(): BreakpointsDataServiceResponse {
  const { breakpoints, setBreakpoints } = useBreakpointsSelector();
  const { isMediaQueryForBreakpoint } = useMediaQueriesQueryService();

  function buildLabel({
    minWidth,
    maxWidth,
  }: {
    minWidth: string;
    maxWidth: string;
  }) {
    return `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
  }

  function createBreakpoint(
    minWidth: string,
    maxWidth: string
  ): CreateUpdateBreakpointResponse {
    const minWidthPx = parseDecimalNumber(minWidth);
    const maxWidthPx = parseDecimalNumber(maxWidth);

    const id = _buildId({ minWidth: minWidthPx, maxWidth: maxWidthPx });
    const label = buildLabel({ minWidth, maxWidth });
    const viewportSize: BreakpointViewportSize = {
      minWidth: minWidthPx,
      maxWidth: maxWidthPx,
    };

    const breakpoint: Breakpoints = {
      [id]: {
        label: label,
        ...viewportSize,
      },
    };

    setBreakpoints({
      ...breakpoints,
      ...breakpoint,
    });

    return {
      id,
      label,
      minWidth,
      maxWidth,
    };
  }

  function updateBreakpoint(
    breakpointId: string,
    minWidth: string,
    maxWidth: string
  ): CreateUpdateBreakpointResponse {
    let nextBreakpoints = { ...breakpoints };

    const label = buildLabel({ minWidth, maxWidth });

    nextBreakpoints[breakpointId] = {
      label,
      minWidth: parseDecimalNumber(minWidth),
      maxWidth: parseDecimalNumber(maxWidth),
    };

    setBreakpoints(nextBreakpoints);

    return {
      id: breakpointId,
      label,
      minWidth,
      maxWidth,
    };
  }

  function deleteBreakpoint(breakpointId: string): DeleteBreakpointResponse {
    if (isMediaQueryForBreakpoint(breakpointId)) {
      return {
        ok: false,
        error:
          "There are media queries attached to this breakpoint. Please remove them first.",
      };
    }

    let nextBreakpoints = { ...breakpoints };
    delete nextBreakpoints[breakpointId];
    setBreakpoints(nextBreakpoints);

    return {
      ok: true,
    };
  }

  function _buildId({
    minWidth = 0,
    maxWidth = 0,
  }: {
    minWidth: number;
    maxWidth: number;
  }) {
    return `min${minWidth}max${maxWidth}`;
  }

  return {
    breakpoints,
    buildLabel,
    createBreakpoint,
    updateBreakpoint,
    deleteBreakpoint,
  };
}
