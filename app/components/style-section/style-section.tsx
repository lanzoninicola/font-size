import { useEffect, useState } from "react";
import useBreakpointService from "~/domain/breakpoints/useBreakpointService";
import useMediaQueriesSelector from "~/context/font-size/hooks/useMediaQueriesSelector";
import useTag from "~/context/font-size/hooks/useTag";
import { Tags } from "~/context/interfaces";

import SectionHeader from "../shared/section-header";
import VStackBox from "../shared/vstack-wrapper";
import Breakpoints from "../breakpoints/breakpoints";
import FormControlInputNumber from "./components/form-control-input-number";
import FormControlSelectTag from "./components/form-control-select-tag";
import FormControlSelectBreakpoint from "../shared/form-control-select-breakpoint";
import { HStack, Button, Center, Text } from "@chakra-ui/react";
import useMediaQueryService from "~/domain/media-query/useMediaQueryService";

export default function StyleSection() {
  const [inputMinFontSize, setInputMinFontSize] = useState<number>(0);
  const [inputMaxFontSize, setInputMaxFontSize] = useState<number>(0);

  const { tag, setTag } = useTag();
  const { breakpoints, breakpointKeySelected, onSelectedBreakpoint } =
    useBreakpointService();
  const { onCreateMediaQuery, onUpdateMediaQuery } = useMediaQueryService(
    breakpointKeySelected,
    tag,
    inputMinFontSize,
    inputMaxFontSize
  );

  function onChangeTag(e: React.ChangeEvent<HTMLInputElement>) {
    setTag(e.target.value as Tags);
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
            onChange={onSelectedBreakpoint}
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
            {breakpoints && (
              <Button onClick={() => onUpdateMediaQuery()}>Update</Button>
            )}
            <Button onClick={() => onCreateMediaQuery()}>Save</Button>
          </HStack>
        </VStackBox>
      )}
    </VStackBox>
  );
}
