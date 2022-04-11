import { Divider, HStack } from "@chakra-ui/react";
import ConverterPixelsRems from "~/components/settings/converter-pixels-rems";

import SectionHeader from "~/components/shared/section-header";
import VStackBox from "~/components/shared/vstack-wrapper";
import FormControlInputNumber from "~/components/style-section/components/form-control-input-number";
import useMaxFontSize from "~/context/font-size/hooks/useMaxFontSize";
import useMaxViewportWidth from "~/context/font-size/hooks/useMaxViewportWidth";
import useMinFontSize from "~/context/font-size/hooks/useMinFontSize";
import useMinViewportWidth from "~/context/font-size/hooks/useMinViewportWidth";
import usePixelsPerRem from "~/context/font-size/hooks/usePixelsPerRem";
import useTag from "~/context/font-size/hooks/useTag";

export default function SettingsPage() {
  const { pixelsPerRem, setPixelsPerRem } = usePixelsPerRem();

  function onChangePixelsPerRem(pixels: string) {
    setPixelsPerRem(parseInt(pixels, 10));
  }

  return (
    <VStackBox gap="1rem" marginBlock="2rem">
      <SectionHeader>Settings</SectionHeader>
      <VStackBox gap="1.2rem">
        {/* TODO: miss validation (eg. I can set zero that it is not correct) */}
        <FormControlInputNumber
          id="rems"
          label="1 rem"
          value={pixelsPerRem}
          unit="PX"
          onChange={(e) => onChangePixelsPerRem(e.target.value)}
        />
        <ConverterPixelsRems />
      </VStackBox>
    </VStackBox>
  );
}
