import { BreakpointId } from "./breakpoints";

export interface MinMaxTypeScaleConfig {
  fontSizeREM: number;
  scaleRatio: number;
}

export interface TypeScaleConfig {
  breakpointId: BreakpointId;
  min: MinMaxTypeScaleConfig;
  max: MinMaxTypeScaleConfig;
}
