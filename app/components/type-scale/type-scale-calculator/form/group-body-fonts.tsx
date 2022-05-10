import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLoaderData } from "remix";
import GoogleFontFamiliesPicker from "~/components/shared/google-font-families-picker";
import GoogleFontVariantsPicker from "~/components/shared/google-font-variants.picker";
import useCurrentBreakpointIdSelector from "~/context/type-scale-calculator-form/hooks/useCurrentBreakpointIdSelector";
import useFontBodySelector from "~/context/type-scale-calculator-form/hooks/useFontBodySelector";
import { DEFAULT_FONT_FAMILY } from "~/domain/google-fonts/constants";
import { FontFamily } from "~/domain/google-fonts/interfaces";

export default function GroupBodyFonts() {
  const googleWebFonts: FontFamily[] = useLoaderData();

  const [familyWeights, setFamilyWeights] = useState<string[]>(
    DEFAULT_FONT_FAMILY.variants
  );
  const { currentBreakpointId } = useCurrentBreakpointIdSelector();
  const { fontBody, actions } = useFontBodySelector();

  function initValues() {
    actions.TYPE_SCALE_CALCULATOR_FORM__INIT_BODY_FONT.dispatch({
      ...fontBody,
      breakpointId: currentBreakpointId,
    });
  }

  function onChangeFontFamily(fontInfo: HTMLSelectElement) {
    // load the weights for the selected font family into the state
    const optionChecked = fontInfo.querySelector("option:checked");
    if (optionChecked) {
      loadWeightsForSelectedFontFamily(optionChecked);
    }

    // update the state
    actions.TYPE_SCALE_CALCULATOR_FORM__BODY_FONT_CHANGED.dispatch({
      ...fontBody,
      breakpointId: currentBreakpointId,
      fontFamily: fontInfo.value,
    });
  }

  function loadWeightsForSelectedFontFamily(optionChecked: Element) {
    const weightsAttr = optionChecked.getAttribute("data-weights");
    const weights: string[] =
      weightsAttr?.split(",") || DEFAULT_FONT_FAMILY.variants;

    setFamilyWeights(weights);
  }

  function onChangeFontWeight(fontWeight: string) {
    // update the state
    actions.TYPE_SCALE_CALCULATOR_FORM__BODY_FONT_CHANGED.dispatch({
      ...fontBody,
      breakpointId: currentBreakpointId,
      fontWeight,
    });
  }

  useEffect(() => {
    initValues();
  }, [currentBreakpointId]);

  return (
    <HStack>
      <GoogleFontFamiliesPicker
        fonts={googleWebFonts}
        onChange={onChangeFontFamily}
        value={fontBody.fontFamily}
      />
      <GoogleFontVariantsPicker
        weights={familyWeights}
        value={fontBody.fontWeight}
        onChange={onChangeFontWeight}
      />
    </HStack>
  );
}
