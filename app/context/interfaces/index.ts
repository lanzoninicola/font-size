export enum Tags {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
  p = "p",
  caption = "caption",
}

export enum BreakpointsSettingsKey {
  label = "label",
  minWidth = "minWidth",
  maxWidth = "maxWidth",
}

export type BreakpointKey = string;

export enum FontSizeSettingsKey {
  minFontSize = "minFontSize",
  maxFontSize = "maxFontSize",
}

export interface Breakpoints {
  [key: BreakpointKey]: {
    [BreakpointsSettingsKey.label]?: string;
    [BreakpointsSettingsKey.minWidth]?: number;
    [BreakpointsSettingsKey.maxWidth]?: number;
    [FontSizeSettingsKey.minFontSize]?: number;
    [FontSizeSettingsKey.maxFontSize]?: number;
  };
}

// export type TagMediaQueries = {
//   [key in keyof typeof Tags]: Breakpoints | null | undefined;
// };

export type TagMediaQueries = Record<Tags, Breakpoints | null>;
