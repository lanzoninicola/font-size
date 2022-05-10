import { useContextSelector } from "use-context-selector";
import { FontConfigFormControl } from "../interfaces";
import { TypeScaleCalculatorFormContextData } from "../type-scale-calculator-form-context";

export default function useHeadingFontSelector() {
  const fontHeading = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.fontHeading
  );

  const setFontHeading = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.setFontHeading
  );

  const actions = {
    TYPE_SCALE_CALCULATOR_FORM__HEADING_FONT_SELECTOR_SET: {
      dispatch: (payload: FontConfigFormControl) => changeHeadingFont(payload),
    },
  };

  function changeHeadingFont(payload: FontConfigFormControl) {
    setFontHeading(payload);
  }

  return {
    fontHeading,
    actions,
  };
}
