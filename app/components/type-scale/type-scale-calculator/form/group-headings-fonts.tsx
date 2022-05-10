import { HStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "remix";
import GoogleFontFamiliesPicker from "~/components/shared/google-font-families-picker";
import GoogleFontVariantsPicker from "~/components/shared/google-font-variants.picker";
import { DEFAULT_FONT_FAMILY } from "~/domain/google-fonts/constants";
import { FontFamily } from "~/domain/google-fonts/interfaces";

export default function GroupHeadingsFonts() {
  const googleWebFonts: FontFamily[] = useLoaderData();

  const [familyWeights, setFamilyWeights] = useState<string[]>(["400"]);

  function onChangeFontFamily(fontInfo: string) {
    const [_, weights] = fontInfo.split("|");

    setFamilyWeights(weights.split(","));
  }

  return (
    <HStack>
      <GoogleFontFamiliesPicker
        fonts={googleWebFonts}
        onChange={onChangeFontFamily}
        defaultValue={DEFAULT_FONT_FAMILY.family}
      />
      <GoogleFontVariantsPicker weights={familyWeights} />
    </HStack>
  );
}
