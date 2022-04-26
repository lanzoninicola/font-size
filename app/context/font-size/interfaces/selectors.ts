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

export type SelectorKey = HTMLTags | HTMLAttributes;
export enum SelectorType {
  tag = "tag",
  class = "class",
  id = "id",
}

export type Selector = {
  key: SelectorKey;
  type: SelectorType;
  value: HTMLTags | CSSClassAttribute | IdAttribute;
};

export type Selectors = Selector[];

export enum FontSizeConfigKeys {
  minFontSize = "minFontSize",
  maxFontSize = "maxFontSize",
}

export interface SelectorsFontSizeRange {
  [key: SelectorKey]: {
    [FontSizeConfigKeys.minFontSize]?: number;
    [FontSizeConfigKeys.maxFontSize]?: number;
  };
}
