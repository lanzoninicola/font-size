import { Button, HStack } from "@chakra-ui/react";
import { useState } from "react";
import useMediaQueryService from "~/domain/media-query/useMediaQueryService";

import FormControlInputNumber from "../shared/form-control-input-number";
import FormControlSelectBreakpoint from "../shared/form-control-select-breakpoint";
import FormControlSelectTag from "../shared/form-control-select-tag";
import SectionHeader from "../shared/section-header";
import VStackBox from "../shared/vstack-wrapper";

export default function StyleSection() {
  const [inputMinFontSize, setInputMinFontSize] = useState<number>(0);
  const [inputMaxFontSize, setInputMaxFontSize] = useState<number>(0);

  const {
    breakpoints,
    breakpointIdSelected,
    onSaveMediaQuery,
    onSelectedBreakpointId,
    onSelectedTagId,
  } = useMediaQueryService(inputMinFontSize, inputMaxFontSize);

  function onChangeBreakpoint(e: React.ChangeEvent<HTMLInputElement>) {
    const { minFontSize, maxFontSize } = onSelectedBreakpointId(e);

    setInputMinFontSize(minFontSize);
    setInputMaxFontSize(maxFontSize);
  }

  function onChangeTag(e: React.ChangeEvent<HTMLInputElement>) {
    const { minFontSize, maxFontSize } = onSelectedTagId(e);

    setInputMinFontSize(minFontSize);
    setInputMaxFontSize(maxFontSize);
  }

  function onChangeMinFontSize(e: React.ChangeEvent<HTMLInputElement>) {
    setInputMinFontSize(parseInt(e.target.value, 10));
  }

  function onChangeMaxFontSize(e: React.ChangeEvent<HTMLInputElement>) {
    setInputMaxFontSize(parseInt(e.target.value, 10));
  }

  return (
    <VStackBox gap="1rem" w="100%">
      <SectionHeader>Style</SectionHeader>

      {breakpoints && (
        <VStackBox gap="2rem">
          <FormControlSelectBreakpoint
            breakpoints={breakpoints}
            onChange={onChangeBreakpoint}
          />
          <FormControlSelectTag onChange={(e) => onChangeTag(e)} />

          <VStackBox w="100%" gap="1rem">
            <FormControlInputNumber
              id="minFontSize"
              label="Minimum font size"
              value={inputMinFontSize}
              unit="rem"
              onChange={(e) => onChangeMinFontSize(e)}
            />
            <FormControlInputNumber
              id="maxFontSize"
              label="Maximum font size"
              value={inputMaxFontSize}
              unit="rem"
              onChange={(e) => onChangeMaxFontSize(e)}
            />
          </VStackBox>
          <HStack justify={"flex-end"} w="100%">
            <Button
              onClick={() => onSaveMediaQuery()}
              disabled={breakpointIdSelected === "no-selected"}
            >
              Save
            </Button>
          </HStack>
        </VStackBox>
      )}
    </VStackBox>
  );
}
