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
export type HTMLAttributes = CSSClassAttribute;

export type SelectorId = HTMLTags | HTMLAttributes;
export enum SelectorType {
  tag = "tag",
  class = "class",
}

export type Selector = {
  key: SelectorId;
  type: SelectorType;
  value: HTMLTags | CSSClassAttribute;
  isBaseline: boolean;
  order: number;
};

export enum SelectorConfigKeys {
  minFontSize = "minFontSize",
  maxFontSize = "maxFontSize",
  lineHeight = "lineHeight",
}

export interface SelectorsTokensValue {
  [key: SelectorId]: {
    [SelectorConfigKeys.minFontSize]?: number;
    [SelectorConfigKeys.maxFontSize]?: number;
    [SelectorConfigKeys.lineHeight]?: number;
  };
}
