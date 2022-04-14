export enum HTMLTags {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
  p = "p",
  caption = "caption",
}

export type CSSClassAttribute = string;
export type IdAttribute = string;

export type HTMLAttributes = CSSClassAttribute | IdAttribute;

export type Selector = HTMLTags | HTMLAttributes;

export enum BreakpointsSettingsKeys {
  label = "label",
  minWidth = "minWidth",
  maxWidth = "maxWidth",
}

export type BreakpointId = string;

export enum FontSizeSettingsKeys {
  minFontSize = "minFontSize",
  maxFontSize = "maxFontSize",
}

export interface Breakpoints {
  [key: BreakpointId]: {
    [BreakpointsSettingsKeys.label]?: string;
    [BreakpointsSettingsKeys.minWidth]?: number;
    [BreakpointsSettingsKeys.maxWidth]?: number;
    [FontSizeSettingsKeys.minFontSize]?: number;
    [FontSizeSettingsKeys.maxFontSize]?: number;
  };
}

// export type MediaQueries = {
//   [key in keyof typeof HTMLTags]: Breakpoints | null | undefined;
// };

// export type MediaQueries2 = Record<Selector, Breakpoints | null>;

export interface SelectorsFontSizeRange {
  [key: Selector]: {
    [FontSizeSettingsKeys.minFontSize]?: number;
    [FontSizeSettingsKeys.maxFontSize]?: number;
  };
}

export type MediaQueries = Record<BreakpointId, SelectorsFontSizeRange>;
