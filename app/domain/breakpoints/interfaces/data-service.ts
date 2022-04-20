import {
  Breakpoints,
  BreakpointId,
} from "~/context/breakpoint-builder/interfaces";

export interface BreakpointsDataServiceResponse {
  breakpoints: Breakpoints;
  buildLabel: ({
    minWidth,
    maxWidth,
  }: {
    minWidth: string;
    maxWidth: string;
  }) => string;
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
  id: BreakpointId;
  label: string;
  minWidth: string;
  maxWidth: string;
}

export interface DeleteBreakpointResponse {
  ok: boolean;
  error?: string;
}
