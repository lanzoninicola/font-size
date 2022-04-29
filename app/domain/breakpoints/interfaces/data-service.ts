import {
  Breakpoints,
  BreakpointId,
} from "~/context/breakpoint-builder/interfaces";

export interface BreakpointsDataServiceResponse {
  buildLabel: ({
    minWidth,
    maxWidth,
  }: {
    minWidth: string;
    maxWidth: string;
  }) => string;
  listAll: (options?: BreakpointListAllOptions) => BreakpointListAllResponse;
  createBreakpoint: (
    minWidth: string,
    maxWidth: string,
    userLabel?: string
  ) => BreakpointResponse;
  updateBreakpoint: (
    id: string,
    minWidth: string,
    maxWidth: string,
    userLabel?: string
  ) => BreakpointResponse;
  deleteBreakpoint: (id: BreakpointId) => DeleteBreakpointResponse;
}

export interface BreakpointListAllOptions {
  orderby?: OrderByParameter;
}

export type OrderByParameter = "label" | "minWidth" | "maxWidth";

export interface BreakpointFlat {
  id: BreakpointId;
  label: string;
  minWidth: number;
  maxWidth: number;
}

export interface BreakpointListAllResponse {
  ok: boolean;
  payload?: BreakpointFlat[]; // if ok === true
}
export interface BreakpointResponse {
  ok: boolean;
  payload?: BreakpointFlat; // if ok === true
  error?: string; // if ok === false
}

export interface DeleteBreakpointResponse {
  ok: boolean;
  error?: string;
}

export interface BreakpointValidationResult {
  ok: boolean;
  error?: string;
}
