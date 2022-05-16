import { BreakpointId } from "~/context/app/types/breakpoints";

export interface TypeScaleCalculatorFormContext {
  currentBreakpointId: BreakpointId;
  setCurrentBreakpointId: (breakpointId: BreakpointId) => void;
}

export interface TypeScaleRatio {
  key: string;
  name: string;
  ratio: number;
}
