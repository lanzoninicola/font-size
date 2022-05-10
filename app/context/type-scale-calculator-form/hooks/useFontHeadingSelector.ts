import { useContextSelector } from "use-context-selector";
import { DEFAULT_FONT_FAMILY } from "~/domain/google-fonts/constants";
import useTypeScaleCalculatorQueryService from "~/domain/type-scale-calculator/useTypeScaleCalculatorQueryService";
import { FontConfigFormControl } from "../interfaces";
import { TypeScaleCalculatorFormContextData } from "../type-scale-calculator-form-context";

export default function useFontHeadingSelector() {
  const fontHeading = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.fontHeading
  );

  const setFontHeading = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.setFontHeading
  );

  const actions = {
    TYPE_SCALE_CALCULATOR_FORM__INIT_HEADING_FONT: {
      dispatch: (payload: FontConfigFormControl) => initHeadingFont(payload),
    },
    TYPE_SCALE_CALCULATOR_FORM__HEADING_FONT_CHANGED: {
      dispatch: (payload: FontConfigFormControl) => changeHeadingFont(payload),
    },
  };

  const { getFontHeadingConfig } = useTypeScaleCalculatorQueryService();

  function initHeadingFont(payload: FontConfigFormControl) {
    const fontHeadingStored = getFontHeadingConfig(payload.breakpointId);

    if (fontHeadingStored) {
      setFontHeading({
        ...payload,
        fontFamily: fontHeadingStored.fontFamily,
        fontWeight: String(fontHeadingStored.fontWeight),
      });
    } else {
      setFontHeading({
        breakpointId: payload.breakpointId,
        fontFamily: DEFAULT_FONT_FAMILY.family,
        fontWeight: DEFAULT_FONT_FAMILY.variants[0],
      });
    }
  }

  function changeHeadingFont(payload: FontConfigFormControl) {
    setFontHeading(payload);
  }

  return {
    fontHeading,
    actions,
  };
}
