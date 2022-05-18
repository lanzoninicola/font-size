import { Breakpoints } from "./breakpoints";
import { MediaQuery } from "./media-queries";
import { TypeScaleConfig } from "./type-scale-config";
import { TypeScaleStepConfig } from "./type-scale-steps";
import { Typography } from "./typography";

export interface AppContext {
  pixelsPerRem: number;
  breakpoints: Breakpoints;
  typography: Typography;
  typeScaleSteps: TypeScaleStepConfig[];
  typeScaleConfig: TypeScaleConfig[];
  mediaQueries: MediaQuery[];
  setPixelsPerRem: (pixelsPerRem: number) => void;
  setBreakpoints: (breakpoints: Breakpoints) => void;
  setTypography: (typography: Typography) => void;
  setTypeScaleSteps: (typeScaleSteps: TypeScaleStepConfig[]) => void;
  setTypeScale: (typeScaleConfig: TypeScaleConfig[]) => void;
  setMediaQueries: (mediaQueries: MediaQuery[]) => void;
}
