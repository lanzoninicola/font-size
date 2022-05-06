import { MediaQueries } from "../../media-query-builder/interfaces/media-query";
import { Breakpoints } from "../../breakpoint-builder/interfaces";
import { TypeScaleConfig } from "../../type-scale-calculator-form/interfaces";

import {
  CSSClassAttribute,
  HTMLTags,
  HTMLAttributes,
  SelectorsTokensValue,
  SelectorId,
  SelectorType,
  Selector,
} from "../../selectors-builder/interfaces";

enum DataProvider {
  default = "default",
  chakraui = "chackraui",
  tailwindcss = "tailwindcss",
  bootstrap = "bootstrap",
}

export type {
  MediaQueries,
  Breakpoints,
  TypeScaleConfig,
  CSSClassAttribute,
  HTMLAttributes,
  SelectorsTokensValue,
  SelectorId,
  Selector,
};

export { HTMLTags, SelectorType, DataProvider };
