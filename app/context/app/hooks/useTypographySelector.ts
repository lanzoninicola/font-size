import { useContextSelector } from "use-context-selector";
import { AppContextData } from "../app-context";
import { FontFamily, FontWeight } from "../interfaces";

export default function useTypographySelector() {
  const typography = useContextSelector(
    AppContextData,
    (ctx) => ctx?.typography
  );

  const setTypography = useContextSelector(
    AppContextData,
    (ctx) => ctx?.setTypography
  );

  const actions = {
    TYPOGRAPHY__HEADINGS_FONT_FAMILY_CHANGED: {
      dispatch: (payload: FontFamily) => changeHeadingsFontFamily(payload),
    },
    TYPOGRAPHY__HEADINGS_FONT_WEIGHT_CHANGED: {
      dispatch: (payload: FontWeight) => changeHeadingsFontWeight(payload),
    },
    TYPOGRAPHY__BODY_FONT_FAMILY_CHANGED: {
      dispatch: (payload: FontFamily) => changeBodyFontFamily(payload),
    },
    TYPOGRAPHY__BODY_FONT_WEIGHT_CHANGED: {
      dispatch: (payload: FontWeight) => changeBodyFontWeight(payload),
    },
  };

  function changeHeadingsFontFamily(payload: FontFamily) {
    const nextTypography = { ...typography };
    nextTypography.headings.fontFamily = payload;
    setTypography(nextTypography);
  }

  function changeHeadingsFontWeight(payload: FontWeight) {
    const nextTypography = { ...typography };
    nextTypography.headings.fontWeight = payload;
    setTypography(nextTypography);
  }

  function changeBodyFontFamily(payload: FontFamily) {
    const nextTypography = { ...typography };
    nextTypography.body.fontFamily = payload;
    setTypography(nextTypography);
  }

  function changeBodyFontWeight(payload: FontWeight) {
    const nextTypography = { ...typography };
    nextTypography.body.fontWeight = payload;
    setTypography(nextTypography);
  }

  return {
    typography,
    actions,
  };
}
