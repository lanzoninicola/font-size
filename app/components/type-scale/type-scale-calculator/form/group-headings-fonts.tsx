import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLoaderData } from "remix";
import GoogleFontFamiliesPicker from "~/components/shared/google-font-families-picker";
import GoogleFontVariantsPicker from "~/components/shared/google-font-variants.picker";
import useCurrentBreakpointIdSelector from "~/context/type-scale-calculator-form/hooks/useCurrentBreakpointIdSelector";
import useFontHeadingSelector from "~/context/type-scale-calculator-form/hooks/useFontHeadingSelector";
import { DEFAULT_FONT_FAMILY } from "~/domain/google-fonts/constants";
import { FontFamily } from "~/domain/google-fonts/interfaces";

export default function GroupHeadingsFonts() {
  const googleWebFonts: FontFamily[] = useLoaderData();

  const [familyWeights, setFamilyWeights] = useState<string[]>(
    DEFAULT_FONT_FAMILY.variants
  );
  const { currentBreakpointId } = useCurrentBreakpointIdSelector();
  const { fontHeading, actions } = useFontHeadingSelector();

  function initValues() {
    actions.TYPE_SCALE_CALCULATOR_FORM__INIT_HEADING_FONT.dispatch({
      ...fontHeading,
      breakpointId: currentBreakpointId,
    });
  }

  function onChangedFontFamily(fontInfo: HTMLSelectElement) {
    // load the weights for the selected font family into the state
    const optionChecked = fontInfo.querySelector("option:checked");
    if (optionChecked) {
      loadWeightsForSelectedFontFamily(optionChecked);
    }

    // update the state
    actions.TYPE_SCALE_CALCULATOR_FORM__HEADING_FONT_CHANGED.dispatch({
      ...fontHeading,
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

  function onChangedFontWeight(fontWeight: string) {
    // update the state
    actions.TYPE_SCALE_CALCULATOR_FORM__HEADING_FONT_CHANGED.dispatch({
      ...fontHeading,
      breakpointId: currentBreakpointId,
      fontWeight,
    });
  }

  useEffect(() => {
    initValues();
  }, [currentBreakpointId]);

  return (
    <HStack w="100%">
      <GoogleFontFamiliesPicker
        fonts={googleWebFonts}
        onChange={onChangedFontFamily}
        value={fontHeading.fontFamily}
      />
      <GoogleFontVariantsPicker
        weights={familyWeights}
        value={fontHeading.fontWeight}
        onChange={onChangedFontWeight}
      />
    </HStack>
  );
}
