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

export interface BreakpointResponse {
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
