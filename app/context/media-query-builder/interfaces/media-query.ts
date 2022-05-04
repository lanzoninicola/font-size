import { BreakpointId } from "../../breakpoint-builder/interfaces";
import { SelectorsTokensValue } from "../../selectors-builder/interfaces";

export interface MediaQueryBreakpointFlat {
  selector: string;
  minFontSize: number;
  maxFontSize: number;
  lineHeight: number;
}

export type MediaQueries = Record<BreakpointId, SelectorsTokensValue>;
