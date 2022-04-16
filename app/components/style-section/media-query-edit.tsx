import { Button, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BreakpointId, Selector } from "~/context/font-size/interfaces";
import useMediaQueryService from "~/domain/media-query/useMediaQueryService";
import parseInputString from "~/domain/utilities/parseInputString";

import FormControlInputNumber from "../shared/form-control-input-number";
import FormControlSelectBreakpoint from "../shared/form-control-select-breakpoint";
import FormControlSelectSelector from "../shared/form-control-select-selector";
import SectionHeader from "../shared/section-header";
import VStackBox from "../shared/vstack-wrapper";

export default function MediaQueryEdit() {
  const [minFontSize, setMinFontSize] = useState<string>("");
  const [maxFontSize, setMaxFontSize] = useState<string>("");
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
    const value = e.target.value;
    setMinFontSize(parseInputString(value));
  }

  function onChangeMaxFontSize(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setMaxFontSize(parseInputString(value));
  }

  function onSaveMediaQuery() {
    if (currentBreakpointId && currentSelector) {
      saveMediaQuery(
        currentBreakpointId,
        currentSelector,
        parseFloat(minFontSize),
        parseFloat(maxFontSize)
      );
    }
  }

  function onSelectedBreakpointAndSelector() {
    if (currentBreakpointId && currentSelector) {
      const { minFontSize, maxFontSize } = getFontSizeRange(
        currentBreakpointId,
        currentSelector
      );

      setMinFontSize(minFontSize.toString());
      setMaxFontSize(maxFontSize.toString());
    }
  }

  useEffect(() => {
    onSelectedBreakpointAndSelector();
  }, [currentBreakpointId, currentSelector]);

  return (
    <VStackBox gap="1rem" w="100%">
      <SectionHeader>Media Query Builder</SectionHeader>

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
            />
            <FormControlInputNumber
              id="maxFontSize"
              label="Maximum font size"
              value={maxFontSize}
              unit="rem"
              onChange={(e) => onChangeMaxFontSize(e)}
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
