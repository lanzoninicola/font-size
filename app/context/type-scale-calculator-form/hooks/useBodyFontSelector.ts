import { useContextSelector } from "use-context-selector";
import { FontConfigFormControl } from "../interfaces";
import { TypeScaleCalculatorFormContextData } from "../type-scale-calculator-form-context";

export default function useBodyFontSelector() {
  const fontBody = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.fontBody
  );

  const setFontBody = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.setFontBody
  );

  const actions = {
    TYPE_SCALE_CALCULATOR_FORM__BODY_FONT_SELECTOR_SET: {
      dispatch: (payload: FontConfigFormControl) => changeBodyFont(payload),
    },
  };

  function changeBodyFont(payload: FontConfigFormControl) {
    setFontBody(payload);
  }

  return {
    fontBody,
    actions,
  };
}
