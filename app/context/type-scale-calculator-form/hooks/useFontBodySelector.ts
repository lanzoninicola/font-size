import { useContextSelector } from "use-context-selector";
import { DEFAULT_FONT_FAMILY } from "~/domain/google-fonts/constants";
import useTypeScaleCalculatorQueryService from "~/domain/type-scale-calculator/useTypeScaleCalculatorQueryService";
import { FontConfigFormControl } from "../interfaces";
import { TypeScaleCalculatorFormContextData } from "../type-scale-calculator-form-context";

export default function useFontBodySelector() {
  const fontBody = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.fontBody
  );

  const setFontBody = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.setFontBody
  );

  const actions = {
    TYPE_SCALE_CALCULATOR_FORM__INIT_BODY_FONT: {
      dispatch: (payload: FontConfigFormControl) => initFontBody(payload),
    },
    TYPE_SCALE_CALCULATOR_FORM__BODY_FONT_CHANGED: {
      dispatch: (payload: FontConfigFormControl) => changeBodyFont(payload),
    },
  };

  const { getFontBodyConfig } = useTypeScaleCalculatorQueryService();

  function initFontBody(payload: FontConfigFormControl) {
    const fontBodyStored = getFontBodyConfig(payload.breakpointId);

    if (fontBodyStored) {
      setFontBody({
        ...payload,
        fontFamily: fontBodyStored.fontFamily,
        fontWeight: String(fontBodyStored.fontWeight),
      });
    } else {
      setFontBody({
        breakpointId: payload.breakpointId,
        fontFamily: DEFAULT_FONT_FAMILY.family,
        fontWeight: DEFAULT_FONT_FAMILY.variants[0],
      });
    }
  }

  function changeBodyFont(payload: FontConfigFormControl) {
    setFontBody(payload);
  }

  return {
    fontBody,
    actions,
  };
}
