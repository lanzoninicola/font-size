import { useContextSelector } from "use-context-selector";
import usePreviewIframeRefsSelector from "~/context/preview/hooks/usePreviewIframeRefsSelector";
import useMediaQueriesStylesheet from "~/domain/stylesheet/useMediaQueriesStylesheet";
import useTypographyStylesheet from "~/domain/stylesheet/useTypographyStylesheet";
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

  const { actions: previewActions } = usePreviewIframeRefsSelector();
  const { getTypographyBodyStylesheet } = useTypographyStylesheet(typography);

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

    const stylesheet = getTypographyBodyStylesheet(true);

    previewActions.PREVIEW__POST_MESSAGE_CHANGED_BODY_FONT.dispatch({
      fontBody: typography.body,
      stylesheetTypographyCode: stylesheet,
    });
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
