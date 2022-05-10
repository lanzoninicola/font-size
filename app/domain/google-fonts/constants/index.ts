import { DefaultFontFamily } from "../interfaces";

export const DEFAULT_FONT_FAMILY: DefaultFontFamily = {
  category: "sans-serif",
  family: "Open Sans",
  variants: ["400"],
};

/** The root API endpoint for requesting @font-face declarations from Google Fonts. */
export const GOOGLE_FONTS_BASE_URL = `https://fonts.googleapis.com/css2`;
