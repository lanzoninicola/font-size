import { Button, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useHtmlSelectorsSelector from "~/context/font-size/hooks/useHtmlSelectorsSelector";
import { SelectorKey, Selectors } from "~/context/font-size/interfaces";
import { EntityState } from "~/context/shared/interfaces/entity-state";
import useMediaQueryService from "~/domain/media-query/useMediaQueryService";

import EntityStateIdleMessage from "../shared/entity-state-idle-message";
import FormControlInputNumber from "../shared/form-control-input-number";
import FormControlSelectBreakpoint from "../shared/form-control-select-breakpoint";
import FormControlSelectSelector from "../shared/form-control-select-selector";
import VStackBox from "../shared/vstack-wrapper";

export default function MediaQueryEdit() {
  const {
    mediaQueries,
    breakpoints,
    entityState,
    currentBreakpointId,
    currentSelector,
    minFontSize,
    maxFontSize,
    changeBreakpoint,
    changeSelector,
    changeMinFontSize,
    changeMaxFontSize,
    updateMinMaxFontSizeOnBreakpointAndSelectorChange,
    saveMediaQuery,
  } = useMediaQueryService();

  const { htmlSelectors } = useHtmlSelectorsSelector();
  const [selectors, setSelectors] = useState<Selectors | null>(null);

  function onChangeBreakpoint(e: React.ChangeEvent<HTMLInputElement>) {
    const bp = e.target.value as BreakpointId;
    changeBreakpoint(bp);
  }

  function onChangeSelector(e: React.ChangeEvent<HTMLInputElement>) {
    const s = e.target.value as SelectorKey;
    changeSelector(s);
  }

  function onChangeMinFontSize(e: React.ChangeEvent<HTMLInputElement>) {
    changeMinFontSize(e.target.value);
  }

  function onChangeMaxFontSize(e: React.ChangeEvent<HTMLInputElement>) {
    changeMaxFontSize(e.target.value);
  }

  function onSaveMediaQuery() {
    saveMediaQuery();
  }

  function onSelectedBreakpointAndSelector() {
    updateMinMaxFontSizeOnBreakpointAndSelectorChange();
  }

  useEffect(() => {
    onSelectedBreakpointAndSelector();
  }, [currentBreakpointId, currentSelector]);

  useEffect(() => {
    setSelectors(htmlSelectors);
  }, [htmlSelectors]);

  return (
    <>
      <FormControlSelectBreakpoint
        breakpoints={breakpoints}
        onChange={onChangeBreakpoint}
        value={currentBreakpointId}
      />
      <VStackBox w="100%" gap="1rem">
        {selectors &&
          selectors.map((s, index) => {
            return (
              <HStack key={index} w="100%">
                <Text color="primary.500" fontSize={"sm"} fontWeight={700}>
                  {s.value}
                </Text>
                <HStack w="100%" gap=".5rem">
                  <FormControlInputNumber
                    id="minFontSize"
                    value={minFontSize}
                    onChange={(e) => onChangeMinFontSize(e)}
                    isDisabled={!currentBreakpointId}
                  />
                  <FormControlInputNumber
                    id="maxFontSize"
                    value={maxFontSize}
                    onChange={(e) => onChangeMaxFontSize(e)}
                    isDisabled={!currentBreakpointId}
                  />
                  <FormControlInputNumber
                    id="linHeight"
                    value={"1"}
                    onChange={(e) => onChangeMaxFontSize(e)}
                    isDisabled={!currentBreakpointId}
                  />
                </HStack>
                <Button
                  size={"sm"}
                  onClick={() => onSaveMediaQuery()}
                  isDisabled={
                    currentBreakpointId === "" ||
                    currentSelector === "" ||
                    currentBreakpointId === "no-selected" ||
                    currentSelector === "no-selected" ||
                    minFontSize === "" ||
                    maxFontSize === ""
                  }
                >
                  Save
                </Button>
              </HStack>
            );
          })}
      </VStackBox>
    </>
  );
}
