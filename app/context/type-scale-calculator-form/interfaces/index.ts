import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import { SelectorId } from "~/context/type-scale-steps-builder/interfaces";

export interface MinMaxTypeScaleConfig {
  fontSizeREM: string;
  scaleRatio: string;
}

export interface FontTypeScaleConfig {
  fontFamily: string;
  fontWeight: number;
}

export interface TypeScaleConfig {
  breakpointId: BreakpointId;
  baseStep: SelectorId;
  min: MinMaxTypeScaleConfig;
  max: MinMaxTypeScaleConfig;
  fontHeading: FontTypeScaleConfig;
  fontBody: FontTypeScaleConfig;
}

export interface TypeScaleRatio {
  key: string;
  name: string;
  ratio: number;
}

// START: Types for the type scale calculator form context.
export type DefaultBreakpointId = "default";

export type BreakpointIdFormControl = BreakpointId | DefaultBreakpointId;
export interface BaseStepFormControl {
  breakpointId: BreakpointIdFormControl;
  step: SelectorId;
}
export interface MinMaxConfigFormControl {
  breakpointId: BreakpointIdFormControl;
  fontSizeREM: string;
  scaleRatio: TypeScaleRatio["ratio"];
}

export interface FontConfigFormControl {
  breakpointId: BreakpointIdFormControl;
  fontFamily: string;
  fontWeight: string;
}
// END: Types for the type scale calculator form context.

export interface BreakpointTypeScale {
  breakpointId: BreakpointId;
  // step key of the type scale
  stepKey: string;
  // min font size calculated for the breakpoint
  minFontSize: number;
  // max font size calculated for the breakpoint
  maxFontSize: number;
}