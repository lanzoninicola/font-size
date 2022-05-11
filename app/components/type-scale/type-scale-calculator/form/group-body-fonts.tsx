import { HStack, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLoaderData } from "remix";
import GoogleFontFamiliesPicker from "~/components/shared/google-font-families-picker";
import GoogleFontVariantsPicker from "~/components/shared/google-font-variants.picker";
import VStackBox from "~/components/shared/vstack-wrapper";
import useCurrentBreakpointIdSelector from "~/context/type-scale-calculator-form/hooks/useCurrentBreakpointIdSelector";
import useFontBodySelector from "~/context/type-scale-calculator-form/hooks/useFontBodySelector";
import { DEFAULT_FONT_FAMILY } from "~/domain/google-fonts/constants";
import { FontFamily } from "~/domain/google-fonts/interfaces";
import useGoogleFontsUtils from "~/domain/google-fonts/useGoogleFontsUtils";

import { FormSubHeading } from "./form-headings";

export default function GroupBodyFonts() {
  const googleWebFonts: FontFamily[] = useLoaderData();
  const { currentBreakpointId } = useCurrentBreakpointIdSelector();
  const { fontBody, actions } = useFontBodySelector();
  const { getGoogleFontLinkTagHref } = useGoogleFontsUtils();

  const [familyWeights, setFamilyWeights] = useState<string[]>(
    DEFAULT_FONT_FAMILY.variants
  );

  function initValues() {
    actions.TYPE_SCALE_CALCULATOR_FORM__INIT_BODY_FONT.dispatch({
      ...fontBody,
      breakpointId: currentBreakpointId,
    });
  }

  function onChangeFontFamily(fontFamilyHTMLSelectElement: HTMLSelectElement) {
    populateFontWeightsPickerComponent(fontFamilyHTMLSelectElement);

    // get the family name from the <select> html element
    const fontFamily = fontFamilyHTMLSelectElement.value;

    // update the global state
    actions.TYPE_SCALE_CALCULATOR_FORM__BODY_FONT_CHANGED.dispatch({
      ...fontBody,
      breakpointId: currentBreakpointId,
      fontFamily,
    });
  }

  function onChangeFontWeight(fontWeight: string) {
    // update the global state
    actions.TYPE_SCALE_CALCULATOR_FORM__BODY_FONT_CHANGED.dispatch({
      ...fontBody,
      breakpointId: currentBreakpointId,
      fontWeight,
    });
  }

  function populateFontWeightsPickerComponent(
    fontFamilyHTMLSelectElement: HTMLSelectElement
  ) {
    // get the <option> html element selected that contains the font weights for the selected font family
    const HTMLOptionElementChecked =
      fontFamilyHTMLSelectElement.querySelector("option:checked");
    if (HTMLOptionElementChecked) {
      const weights = getWeights(HTMLOptionElementChecked);
      setFamilyWeights(weights);
    }
  }

  /** Get the array of font weights for the selected font family from the "data-weights" attribute */
  function getWeights(HTMLOptionElementChecked: Element): string[] {
    const weightsAttr = HTMLOptionElementChecked.getAttribute("data-weights");
    return weightsAttr?.split(",") || DEFAULT_FONT_FAMILY.variants;
  }

  useEffect(() => {
    initValues();
  }, [currentBreakpointId]);

  return (
    <VStackBox spacing={2}>
      <FormSubHeading>Headings font</FormSubHeading>
      <VStackBox spacing={2}>
        <HStack w="100%">
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
        <link rel="stylesheet" href={getGoogleFontLinkTagHref(fontBody)}></link>
        <Input
          variant="unstyled"
          placeholder="Type here something..."
          fontFamily={fontBody.fontFamily}
          color="primary.500"
        />
      </VStackBox>
    </VStackBox>
  );
}
