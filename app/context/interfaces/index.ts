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

export type MinViewportWidthState = Record<Tags, number>;
export type MaxViewportWidthState = Record<Tags, number>;
export type MinFontSizeState = Record<Tags, number>;
export type MaxFontSizeState = Record<Tags, number>;
