import { Button, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BreakpointId, Selector } from "~/context/font-size/interfaces";
import useMediaQueryService from "~/domain/media-query/useMediaQueryService";

import FormControlInputNumber from "../shared/form-control-input-number";
import FormControlSelectBreakpoint from "../shared/form-control-select-breakpoint";
import FormControlSelectSelector from "../shared/form-control-select-selector";
import SectionHeader from "../shared/section-header";
import VStackBox from "../shared/vstack-wrapper";

export default function StyleSection() {
  const [isFontSizesDisabled, setIsFontSizesDisabled] = useState(false);
  const [minFontSize, setMinFontSize] = useState<number>(0);
  const [maxFontSize, setMaxFontSize] = useState<number>(0);
  const [currentBreakpointId, setCurrentBreakpointId] = useState<
    BreakpointId | undefined
  >(undefined);
  const [currentSelector, setCurrentSelector] = useState<Selector | null>(null);

  const { breakpoints, saveMediaQuery, getFontSizeRange } =
    useMediaQueryService();

  function onChangeBreakpoint(e: any) {
    setCurrentBreakpointId(e.target.value as BreakpointId);
  }

  function onChangeSelector(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentSelector(e.target.value as Selector);
  }

  function onChangeMinFontSize(e: React.ChangeEvent<HTMLInputElement>) {
    setMinFontSize(parseInt(e.target.value, 10));
  }

  function onChangeMaxFontSize(e: React.ChangeEvent<HTMLInputElement>) {
    setMaxFontSize(parseInt(e.target.value, 10));
  }

  function onSaveMediaQuery() {
    if (currentBreakpointId && currentSelector) {
      saveMediaQuery(
        currentBreakpointId,
        currentSelector,
        minFontSize,
        maxFontSize
      );
    }
  }

  function onSelectedBreakpointAndSelector() {
    if (currentBreakpointId && currentSelector) {
      const { minFontSize, maxFontSize } = getFontSizeRange(
        currentBreakpointId,
        currentSelector
      );

      setMinFontSize(minFontSize);
      setMaxFontSize(maxFontSize);
    }
  }

  useEffect(() => {
    onSelectedBreakpointAndSelector();

    if (!currentBreakpointId && !currentSelector) {
      setIsFontSizesDisabled(true);
    } else {
      setIsFontSizesDisabled(false);
    }
  }, [currentBreakpointId, currentSelector]);

  return (
    <VStackBox gap="1rem" w="100%">
      <SectionHeader>Style</SectionHeader>

      {breakpoints && (
        <VStackBox gap="2rem">
          <FormControlSelectBreakpoint
            breakpoints={breakpoints}
            onChange={onChangeBreakpoint}
          />
          <FormControlSelectSelector onChange={(e) => onChangeSelector(e)} />

          <VStackBox w="100%" gap="1rem">
            <FormControlInputNumber
              id="minFontSize"
              label="Minimum font size"
              value={minFontSize}
              unit="rem"
              onChange={(e) => onChangeMinFontSize(e)}
              isDisabled={isFontSizesDisabled}
            />
            <FormControlInputNumber
              id="maxFontSize"
              label="Maximum font size"
              value={maxFontSize}
              unit="rem"
              onChange={(e) => onChangeMaxFontSize(e)}
              isDisabled={isFontSizesDisabled}
            />
          </VStackBox>
          <HStack justify={"flex-end"} w="100%">
            <Button
              onClick={() => onSaveMediaQuery()}
              disabled={!currentBreakpointId || !currentSelector}
            >
              Save
            </Button>
          </HStack>
        </VStackBox>
      )}
    </VStackBox>
  );
}
