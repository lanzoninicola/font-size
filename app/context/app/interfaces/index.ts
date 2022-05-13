import { Breakpoints } from "../../breakpoint-builder/interfaces";
import {
  HTMLTags,
  TypeScaleStepConfig,
} from "../../type-scale-steps-builder/interfaces";
import {
  BreakpointTypeScale,
  TypeScaleConfig,
} from "../../type-scale-calculator-form/interfaces";
import { MediaQuery } from "~/context/media-query-builder/interfaces/media-query";

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

enum DataProvider {
  default = "default",
  chakraui = "chackraui",
  tailwindcss = "tailwindcss",
  bootstrap = "bootstrap",
}

export enum EntityState {
  idle = "idle",
  new = "new",
  edit = "edit",
  delete = "delete",
}

export enum TypeScaleStepEntityState {
  idle = "idle",
  edit = "edit",
}

export type FontFamily = string;
export type FontWeight = string;

export interface FontConfig {
  fontFamily: FontFamily;
  fontWeight: FontWeight;
}

export interface Typography {
  headings: FontConfig;
  body: FontConfig;
}

export type {
  Breakpoints,
  TypeScaleStepConfig,
  TypeScaleConfig,
  MediaQuery,
  BreakpointTypeScale,
};

export { HTMLTags, DataProvider };
