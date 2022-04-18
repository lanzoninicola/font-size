import { Box, Button, Center, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { BreakpointId, Selector } from "~/context/font-size/interfaces";
import useMediaQueryBuilderContext from "~/context/media-query-builder/hooks/useMediaQueryBuilderContext";
import { EntityState } from "~/context/media-query-builder/interfaces";
import useMediaQueryService from "~/domain/media-query/useMediaQueryService";
import parseInputString from "~/domain/utilities/parseInputString";

import InnerContentColumn from "../layout/inner-content-column";
import FormControlInputNumber from "../shared/form-control-input-number";
import FormControlSelectBreakpoint from "../shared/form-control-select-breakpoint";
import FormControlSelectSelector from "../shared/form-control-select-selector";
import { AddIcon, NewMediaQueryIcon } from "../shared/icons";
import VStackBox from "../shared/vstack-wrapper";
import MediaQueryEditIdle from "./media-query-edit-idle";
import MediaQueryList from "./media-query-list";

export default function MediaQueryEdit() {
  // const [minFontSize, setMinFontSize] = useState<string>("");
  // const [maxFontSize, setMaxFontSize] = useState<string>("");
  // const [currentBreakpointId, setCurrentBreakpointId] = useState<
  //   BreakpointId | undefined
  // >(undefined);
  // const [currentSelector, setCurrentSelector] = useState<Selector | null>(null);

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

  function onChangeBreakpoint(e: React.ChangeEvent<HTMLInputElement>) {
    const bp = e.target.value as BreakpointId;
    changeBreakpoint(bp);
  }

  function onChangeSelector(e: React.ChangeEvent<HTMLInputElement>) {
    const s = e.target.value as Selector;
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

  console.log(entityState);

  useEffect(() => {
    onSelectedBreakpointAndSelector();
  }, [currentBreakpointId, currentSelector]);

  return (
    <InnerContentColumn paddingTop={"0.5rem"}>
      {!mediaQueries && entityState === EntityState.idle && (
        <MediaQueryEditIdle />
      )}
      {mediaQueries && (
        <VStackBox gap="4rem" paddingInlineStart="2rem" paddingRight="1rem">
          <VStackBox w="100%" gap="1rem">
            <FormControlSelectBreakpoint
              breakpoints={breakpoints}
              onChange={onChangeBreakpoint}
            />
            <FormControlSelectSelector
              onChange={(e) => onChangeSelector(e)}
              isDisabled={!currentBreakpointId}
            />
          </VStackBox>
          <VStackBox w="100%" gap="1rem">
            <FormControlInputNumber
              id="minFontSize"
              label="Minimum font size"
              value={minFontSize}
              unit="rem"
              onChange={(e) => onChangeMinFontSize(e)}
              isDisabled={!currentBreakpointId}
            />
            <FormControlInputNumber
              id="maxFontSize"
              label="Maximum font size"
              value={maxFontSize}
              unit="rem"
              onChange={(e) => onChangeMaxFontSize(e)}
              isDisabled={!currentBreakpointId}
            />
          </VStackBox>
          <HStack justify={"flex-end"} w="100%">
            <Button
              onClick={() => onSaveMediaQuery()}
              isDisabled={
                currentBreakpointId === "" ||
                currentSelector === "" ||
                currentBreakpointId === "no-selected" ||
                currentSelector === "no-selected"
              }
            >
              Save
            </Button>
          </HStack>
        </VStackBox>
      )}
    </InnerContentColumn>
  );
}
