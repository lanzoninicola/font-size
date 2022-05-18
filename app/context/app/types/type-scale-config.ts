import { BreakpointId } from "./breakpoints";

/** Contains the configuration of Minimum and Maximum font size and scale ratio for the breakpoint */
export interface MinMaxTypeScaleConfig {
  fontSizeREM: number;
  scaleRatio: number;
}

/**
 * Shape of the configuration object that contains the user preferences for the type scale calculation.
 * The configuration data are created/updated through the Type Scale Calculator form
 * */
export interface TypeScaleConfig {
  /** The breakpoint id */
  breakpointId: BreakpointId;
  /** The minimum font size and scale ratio, describing how the font size should behave when the viewport width is >= this breakpoint */
  min: MinMaxTypeScaleConfig;
  /** The maximum font size and scale ratio, describing how the font size should behave when the viewport width is <= this breakpoint */
  max: MinMaxTypeScaleConfig;
}

/** Min font size config set in the calculator form */
export interface BreakpointMinFontSize {
  breakpointId: BreakpointId;
  minFontSizeREM: number;
}

/** Max font size config set in the calculator form*/
export interface BreakpointMaxFontSize {
  breakpointId: BreakpointId;
  maxFontSizeREM: number;
}

/** Min scale ratio configuration set in the calculator form*/
export interface BreakpointMinScaleRatio {
  breakpointId: BreakpointId;
  minScaleRatio: number;
}

/** Max scale ratio configuration set in the calculator form */
export interface BreakpointMaxScaleRatio {
  breakpointId: BreakpointId;
  maxScaleRatio: number;
}
