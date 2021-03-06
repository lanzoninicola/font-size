import { HStack, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLoaderData } from "remix";
import GoogleFontFamiliesPicker from "~/components/shared/google-font-families-picker";
import GoogleFontVariantsPicker from "~/components/shared/google-font-variants.picker";
import VStackBox from "~/components/shared/vstack-wrapper";
import useTypographySelector from "~/context/app/hooks/useTypographySelector";
import { DEFAULT_GOOGLE_FONT } from "~/domain/google-fonts/constants";
import { FontFamily } from "~/domain/google-fonts/interfaces";
import useGoogleFontsUtils from "~/domain/google-fonts/useGoogleFontsUtils";

import { FormSubHeading } from "../type-scale/type-scale-calculator/form/form-headings";

export default function BodyFontsPicker() {
  const googleWebFonts: FontFamily[] = useLoaderData();
  const { typography, actions } = useTypographySelector();
  const { getGoogleFontLinkTagHref } = useGoogleFontsUtils();

  const [familyWeights, setFamilyWeights] = useState<string[]>(
    DEFAULT_GOOGLE_FONT.variants
  );

  function onChangeFontFamily(fontFamilyHTMLSelectElement: HTMLSelectElement) {
    populateFontWeightsPickerComponent(fontFamilyHTMLSelectElement);

    // get the family name from the <select> html element
    const fontFamily = fontFamilyHTMLSelectElement.value;

    // update the global state
    actions.TYPOGRAPHY__BODY_FONT_FAMILY_CHANGED.dispatch(fontFamily);
  }

  function onChangeFontWeight(fontWeight: string) {
    // update the global state
    actions.TYPOGRAPHY__BODY_FONT_WEIGHT_CHANGED.dispatch(fontWeight);
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
    return weightsAttr?.split(",") || DEFAULT_GOOGLE_FONT.variants;
  }

  return (
    <VStackBox spacing={2}>
      <FormSubHeading>Body font</FormSubHeading>
      <VStackBox spacing={2}>
        <HStack w="100%">
          <GoogleFontFamiliesPicker
            fonts={googleWebFonts}
            onChange={onChangeFontFamily}
            value={typography?.body.fontFamily}
          />
          <GoogleFontVariantsPicker
            weights={familyWeights}
            value={typography?.body.fontWeight}
            onChange={onChangeFontWeight}
          />
        </HStack>
        <link
          rel="stylesheet"
          href={getGoogleFontLinkTagHref(typography?.body)}
        ></link>
        <Input
          variant="unstyled"
          placeholder="Type here something..."
          fontFamily={typography?.body.fontFamily}
          color="primary.500"
        />
      </VStackBox>
    </VStackBox>
  );
}
