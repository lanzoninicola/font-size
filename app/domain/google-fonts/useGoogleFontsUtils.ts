import { FontConfigFormControl } from "~/context/type-scale-calculator-form/interfaces";
import { GOOGLE_FONTS_BASE_URL } from "./constants";

export interface GoogleFontURLProps {
  fontHeading: Omit<FontConfigFormControl, "breakpointId">;
  fontBody: Omit<FontConfigFormControl, "breakpointId">;
}

export default function useGoogleFontsUtils() {
  // https://developers.google.com/fonts/docs/css2
  function getGoogleFontURL({ fontHeading, fontBody }: GoogleFontURLProps) {
    const headingFamily = fontHeading.fontFamily.replace(" ", "+");
    const bodyFamily = fontBody.fontFamily.replace(" ", "+");

    let url = `${GOOGLE_FONTS_BASE_URL}?`;
    url += `family=${headingFamily}:wght@${fontHeading.fontWeight}`;
    url += `&`;
    url += `family=${bodyFamily}:wght@${fontBody.fontWeight}`;
    url += `&display=swap`;

    return url;
  }

  return {
    getGoogleFontURL,
  };
}
