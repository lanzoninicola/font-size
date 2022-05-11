import { FontConfig } from "~/context/type-scale-calculator-form/interfaces";
import { GOOGLE_FONTS_BASE_URL } from "./constants";

export default function useGoogleFontsUtils() {
  /**
   * @returns Given the font config object, returns the properly formatted href
   * that can be used to link to that font's @font-face CSS on Google's servers.
   *
   * @see https://developers.google.com/fonts/docs/css2
   */
  function getGoogleFontLinkTagHref(...fonts: FontConfig[]): string {
    let url = `${GOOGLE_FONTS_BASE_URL}?`;
    fonts.forEach((font, idx = 0) => {
      idx++ > 0 && (url += `&`);
      url += appendParams(font);
    });
    url += `&display=swap`;

    return url;
  }

  function appendParams(font: FontConfig) {
    const { fontFamily, fontWeight } = font;
    return `family=${fontFamily}:wght@${fontWeight}`;
  }

  return {
    getGoogleFontLinkTagHref,
  };
}
