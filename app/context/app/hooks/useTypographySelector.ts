import { useContextSelector } from "use-context-selector";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import useTypographyStylesheet from "~/domain/stylesheet/useTypographyStylesheet";
import getTypographyInitialState from "~/domain/typography/getTypographyInitialState";

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
    TYPOGRAPHY__POST_MESSAGE_CURRENT_TYPOGRAPHY: {
      dispatch: () => publishCurrentTypography(),
    },
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

  const { actions: previewActions } = usePreviewWindowsSelector();
  const {
    getStyleSheet,
    getTypographyBodyStylesheet,
    getTypographyHeadersStylesheet,
  } = useTypographyStylesheet(typography);

  function publishCurrentTypography() {
    previewActions.PREVIEW_WINDOWS__POST_MESSAGE_CURRENT_TYPOGRAPHY.dispatch({
      fontHeading: typography.headings,
      fontBody: typography.body,
      stylesheetTypographyCode: getStyleSheet(true),
    });
  }

  function changeHeadingsFontFamily(payload: FontFamily) {
    const initialState = getTypographyInitialState();

    const nextTypography = { ...typography };
    nextTypography.headings.fontFamily = payload;
    nextTypography.headings.fontWeight = initialState.headings.fontWeight;
    setTypography(nextTypography);

    previewActions.PREVIEW_WINDOWS__POST_MESSAGE_CURRENT_TYPOGRAPHY.dispatch({
      fontBody: typography.headings,
      stylesheetTypographyCode: getTypographyHeadersStylesheet(true),
    });
  }

  function changeHeadingsFontWeight(payload: FontWeight) {
    const nextTypography = { ...typography };
    nextTypography.headings.fontWeight = payload;
    setTypography(nextTypography);

    previewActions.PREVIEW_WINDOWS__POST_MESSAGE_CURRENT_TYPOGRAPHY.dispatch({
      fontBody: typography.headings,
      stylesheetTypographyCode: getTypographyHeadersStylesheet(true),
    });
  }

  function changeBodyFontFamily(payload: FontFamily) {
    const initialState = getTypographyInitialState();

    const nextTypography = { ...typography };
    nextTypography.body.fontFamily = payload;
    nextTypography.body.fontWeight = initialState.body.fontWeight;
    setTypography(nextTypography);

    previewActions.PREVIEW_WINDOWS__POST_MESSAGE_CURRENT_TYPOGRAPHY.dispatch({
      fontBody: typography.body,
      stylesheetTypographyCode: getTypographyBodyStylesheet(true),
    });
  }

  function changeBodyFontWeight(payload: FontWeight) {
    const nextTypography = { ...typography };
    nextTypography.body.fontWeight = payload;
    setTypography(nextTypography);

    previewActions.PREVIEW_WINDOWS__POST_MESSAGE_CURRENT_TYPOGRAPHY.dispatch({
      fontBody: typography.body,
      stylesheetTypographyCode: getTypographyBodyStylesheet(true),
    });
  }

  return {
    typography,
    actions,
  };
}
