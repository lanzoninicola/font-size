import { BreakpointId } from "../../breakpoint-builder/interfaces";
import { SelectorsFontSizeRange } from "./selectors";

export interface MediaQueryBreakpointFlat {
  selector: string;
  minFontSize: number;
  maxFontSize: number;
}

export type MediaQueries = Record<BreakpointId, SelectorsFontSizeRange>;
