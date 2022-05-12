import { BreakpointId } from "../../breakpoint-builder/interfaces";

/**
 * @example Shape of the media query object
 * 
    {
      breakpointId: "min769max1280",
      step: {
        key: "h1",
        minFontSize: 2.488,
        maxFontSize: 3.052,
        lineHeight: 120,
        marginBottom: 0,
      },
    },
 */
export interface MediaQuery {
  breakpointId: BreakpointId;
  // key of the step
  stepId: string;
  // min font size for the step. This value is calculated based on the type scale configuration.
  minFontSize: number;
  // max font size for the step. This value is calculated based on the type scale configuration.
  maxFontSize: number;
  // line height for the step. This value might be changed in Media Query application section
  lineHeight: number;
  // margin bottom for the step. This value might be changed in Media Query application section
  marginBottom: number;
}

export type MediaQueryStepEdit = Omit<MediaQuery, "fontFamily" | "fontWeight">;
