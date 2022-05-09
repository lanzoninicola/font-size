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
  breakpoints: Breakpoints | null;
  typeScaleSteps: TypeScaleStepConfig[] | null;
  typeScaleConfig: TypeScaleConfig[] | null;
  mediaQueries: MediaQuery[] | null;
  setPixelsPerRem: (pixelsPerRem: number) => void;
  setBreakpoints: (breakpoints: Breakpoints | null) => void;
  setTypeScaleSteps: (typeScaleSteps: TypeScaleStepConfig[] | null) => void;
  setTypeScale: (typeScaleConfig: TypeScaleConfig[]) => void;
  setMediaQueries: (mediaQueries: MediaQuery[] | null) => void;
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

export type {
  Breakpoints,
  TypeScaleStepConfig,
  TypeScaleConfig,
  MediaQuery,
  BreakpointTypeScale,
};

export { HTMLTags, DataProvider };
