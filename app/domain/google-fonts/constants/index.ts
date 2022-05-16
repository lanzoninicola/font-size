import { DefaultGoogleFont } from "../interfaces";

/** The default font family used by the app and shown in font pickers. */
export const DEFAULT_GOOGLE_FONT: DefaultGoogleFont = {
  category: "sans-serif",
  family: "Inter",
  variants: ["400"],
};

/** The API endpoint to load the Google Font Families */
export const GOOGLE_WEBFONTS_API_URL =
  "https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha";

/** The root API endpoint for requesting @font-face declarations from Google Fonts. */
export const GOOGLE_FONTS_BASE_URL = `https://fonts.googleapis.com/css2`;
