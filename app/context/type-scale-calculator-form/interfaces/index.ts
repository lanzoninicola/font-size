import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import { SelectorId } from "~/context/selectors-builder/interfaces";

export interface MinMaxTypeScaleConfig {
  fontSizeREM: string;
  scaleRatio: string;
}

export interface TypeScaleConfig {
  breakpointId: BreakpointId;
  baseStep: SelectorId;
  min: MinMaxTypeScaleConfig;
  max: MinMaxTypeScaleConfig;
}

export interface TypeScaleRatio {
  key: string;
  name: string;
  ratio: number;
}

// Interfaces for the type scale calculator form context.
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
