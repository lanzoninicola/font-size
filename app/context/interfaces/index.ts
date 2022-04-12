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

export enum MediaQuerySettingsKey {
  label = "label",
  minWidth = "minWidth",
  maxWidth = "maxWidth",
  minFontSize = "minFontSize",
  maxFontSize = "maxFontSize",
}

export type BreakpointKey = string;

export interface BreakpointSettings {
  [MediaQuerySettingsKey.label]: string;
  [MediaQuerySettingsKey.minWidth]: number;
  [MediaQuerySettingsKey.maxWidth]: number;
  [MediaQuerySettingsKey.minFontSize]: number;
  [MediaQuerySettingsKey.maxFontSize]: number;
}

export type Breakpoints = Record<BreakpointKey, BreakpointSettings>;

export type MediaQueries = {
  [key in keyof typeof Tags]: Breakpoints;
};
