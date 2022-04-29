import { useEffect, useState } from "react";
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import {
  Breakpoints,
  BreakpointViewportSize,
} from "~/context/breakpoint-builder/interfaces";

import useMediaQueriesQueryService from "../media-queries/useMediaQueriesQueryService";
import parseDecimalNumber from "../utilities/parseDecimalNumber";
import {
  BreakpointsDataServiceResponse,
  DeleteBreakpointResponse,
  BreakpointListAllOptions,
  BreakpointResponse,
  BreakpointValidationResult,
  OrderByParameter,
  BreakpointListAllResponse,
  BreakpointFlat,
} from "./interfaces";
import useBreakpointsQueryService from "./useBreakpointsQueryService";

/**
 * @description This hook is responsible for managing CRUD operations on the breakpoints.
 */
export default function useBreakpointsDataService(): BreakpointsDataServiceResponse {
  const { breakpoints, setBreakpoints } = useBreakpointsSelector();

  const { isMediaQueryOfBreakpointExists } = useMediaQueriesQueryService();
  const { isBreakpointExistsByViewportSize } = useBreakpointsQueryService();

  function listAll(
    options?: BreakpointListAllOptions
  ): BreakpointListAllResponse {
    let orderby: OrderByParameter = "minWidth";

    if (options) {
      if (options.orderby) {
        orderby = options.orderby;
      }
    }

    if (!breakpoints) {
      return {
        ok: false,
      };
    }

    const breakpointsList: BreakpointFlat[] = Object.keys(breakpoints).map(
      (breakpointId) => {
        return {
          id: breakpointId,
          label: breakpoints[breakpointId].label,
          minWidth: breakpoints[breakpointId].minWidth,
          maxWidth: breakpoints[breakpointId].maxWidth,
        };
      }
    );

    if (orderby === "label") {
      breakpointsList.sort((a, b) => {
        if (a.label < b.label) {
          return -1;
        }

        if (a.label > b.label) {
          return 1;
        }

        return 0;
      });
    }

    if (orderby === "minWidth") {
      breakpointsList.sort((a, b) => {
        if (a.minWidth < b.minWidth) {
          return -1;
        }

        if (a.minWidth > b.minWidth) {
          return 1;
        }

        return 0;
      });
    }

    if (orderby === "maxWidth") {
      breakpointsList.sort((a, b) => {
        if (a.maxWidth < b.maxWidth) {
          return -1;
        }

        if (a.maxWidth > b.maxWidth) {
          return 1;
        }

        return 0;
      });
    }

    return {
      ok: true,
      payload: breakpointsList,
    };
  }

  function createBreakpoint(
    minWidth: string,
    maxWidth: string,
    userLabel?: string
  ): BreakpointResponse {
    const minWidthPx = parseDecimalNumber(minWidth);
    const maxWidthPx = parseDecimalNumber(maxWidth);

    const validationResult = _validateBreakpoint(
      {
        minWidth: minWidthPx,
        maxWidth: maxWidthPx,
      },
      "create"
    );

    if (!validationResult.ok) {
      return {
        ok: false,
        error: validationResult.error,
      };
    }

    const id = _buildId({ minWidth: minWidthPx, maxWidth: maxWidthPx });
    const label = userLabel ? userLabel : buildLabel({ minWidth, maxWidth });
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
      ok: true,
      payload: {
        id: id,
        label: label,
        minWidth: minWidthPx,
        maxWidth: maxWidthPx,
      },
    };
  }

  function updateBreakpoint(
    breakpointId: string,
    minWidth: string,
    maxWidth: string,
    userLabel?: string
  ): BreakpointResponse {
    const minWidthPx = parseDecimalNumber(minWidth);
    const maxWidthPx = parseDecimalNumber(maxWidth);

    const validationResult = _validateBreakpoint(
      {
        minWidth: minWidthPx,
        maxWidth: maxWidthPx,
      },
      "update"
    );

    if (!validationResult.ok) {
      return {
        ok: false,
        error: validationResult.error,
      };
    }

    let nextBreakpoints = { ...breakpoints };

    const label = userLabel ? userLabel : buildLabel({ minWidth, maxWidth });

    nextBreakpoints[breakpointId] = {
      label,
      minWidth: minWidthPx,
      maxWidth: maxWidthPx,
    };

    setBreakpoints(nextBreakpoints);

    return {
      ok: true,
      payload: {
        id: breakpointId,
        label,
        minWidth: minWidthPx,
        maxWidth: maxWidthPx,
      },
    };
  }

  function deleteBreakpoint(breakpointId: string): DeleteBreakpointResponse {
    if (isMediaQueryOfBreakpointExists(breakpointId)) {
      return {
        ok: false,
        error:
          "There are media queries attached to this breakpoint. Please remove them first.",
      };
    }

    let nextBreakpoints: Breakpoints = { ...breakpoints };
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

  function buildLabel({
    minWidth,
    maxWidth,
  }: {
    minWidth: string;
    maxWidth: string;
  }) {
    return `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
  }

  function _validateBreakpoint(
    viewportSize: BreakpointViewportSize,
    action: "create" | "update" = "create"
  ): BreakpointValidationResult {
    const { minWidth, maxWidth } = viewportSize;

    if (minWidth === maxWidth) {
      return {
        ok: false,
        error: "Min and max widths cannot be the same.",
      };
    }

    if (minWidth > maxWidth) {
      return {
        ok: false,
        error: "Min width cannot be greater than max width.",
      };
    }

    if (
      minWidth === null ||
      maxWidth === null ||
      minWidth === 0 ||
      maxWidth === 0 ||
      isNaN(minWidth) ||
      isNaN(maxWidth)
    ) {
      return {
        ok: false,
        error: "Invalid breakpoint widths provided.",
      };
    }

    if (
      isBreakpointExistsByViewportSize({
        minWidth,
        maxWidth,
      }) &&
      action === "create"
    ) {
      return {
        ok: false,
        error: "A breakpoint already exists with the same viewport size",
      };
    }

    return {
      ok: true,
    };
  }

  return {
    buildLabel,
    listAll,
    createBreakpoint,
    updateBreakpoint,
    deleteBreakpoint,
  };
}
