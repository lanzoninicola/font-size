import { BreakpointId } from "./breakpoints";
import { SelectorsFontSizeRange } from "./selectors";

export interface MediaQueryBreakpointFlat {
  selector: string;
  minFontSize: number;
  maxFontSize: number;
}

export type MediaQueries = Record<BreakpointId, SelectorsFontSizeRange>;
