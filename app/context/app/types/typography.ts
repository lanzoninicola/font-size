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
