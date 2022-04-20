import {
  Breakpoints,
  BreakpointId,
} from "~/context/breakpoint-builder/interfaces";

export interface BreakpointsDataServiceResponse {
  createBreakpoint: (
    minWidth: string,
    maxWidth: string
  ) => CreateUpdateBreakpointResponse;
  updateBreakpoint: (
    id: string,
    minWidth: string,
    maxWidth: string
  ) => CreateUpdateBreakpointResponse;
  deleteBreakpoint: (id: BreakpointId) => DeleteBreakpointResponse;
}

export interface CreateUpdateBreakpointResponse {
  ok: boolean;
  payload?: {
    id: BreakpointId;
    label: string;
    minWidth: string;
    maxWidth: string;
  }; // if ok === true
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
