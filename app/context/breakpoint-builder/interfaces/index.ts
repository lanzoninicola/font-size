export enum BreakpointConfigKeys {
  label = "label",
  minWidth = "minWidth",
  maxWidth = "maxWidth",
}

export type BreakpointId = string;

export interface BreakpointViewportSize {
  [BreakpointConfigKeys.minWidth]: number;
  [BreakpointConfigKeys.maxWidth]: number;
}

export interface Breakpoints {
  [key: BreakpointId]: {
    [BreakpointConfigKeys.label]: string;
    [BreakpointConfigKeys.minWidth]: number;
    [BreakpointConfigKeys.maxWidth]: number;
  };
}
