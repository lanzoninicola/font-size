import { Button, HStack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useBreakpointService from "~/domain/breakpoints/useBreakpointService";

import SectionHeader from "../shared/section-header";
import VStackBox from "../shared/vstack-wrapper";
import FormControlInputNumber from "../shared/form-control-input-number";
import FormControlSelectBreakpoint from "../shared/form-control-select-breakpoint";

export default function Breakpoints() {
  const [inputMinWidth, setInputMinWidth] = React.useState<number>(0);
  const [inputMaxWidth, setInputMaxWidth] = React.useState<number>(0);

  const {
    breakpoints,
    breakpointLabel,
    onSaveBreakpoint,
    onSelectedBreakpoint,
  } = useBreakpointService(inputMinWidth, inputMaxWidth);

  function onChangeMinViewportWidth(e: React.ChangeEvent<HTMLInputElement>) {
    setInputMinWidth(parseInt(e.target.value, 10));
  }

  function onChangeMaxViewportWidth(e: React.ChangeEvent<HTMLInputElement>) {
    setInputMaxWidth(parseInt(e.target.value, 10));
  }

  function onSelectBreakpoint(e: React.ChangeEvent<HTMLInputElement>) {
    const { minWidth, maxWidth } = onSelectedBreakpoint(e);
    setInputMinWidth(minWidth);
    setInputMaxWidth(maxWidth);
  }

  useEffect(() => {}, [inputMinWidth, inputMaxWidth]);

  return (
    <VStackBox gap="3rem">
      <SectionHeader>Breakpoints</SectionHeader>
      <VStackBox gap="1.5rem">
        {breakpoints && (
          <FormControlSelectBreakpoint
            breakpoints={breakpoints}
            onChange={onSelectBreakpoint}
          />
        )}
        <FormControlInputNumber
          id="minViewportWidth"
          label="Minimum viewport width"
          value={inputMinWidth}
          unit="px"
          onChange={(e) => onChangeMinViewportWidth(e)}
        />
        <FormControlInputNumber
          id="maxViewportWidth"
          label="Maximum viewport width"
          value={inputMaxWidth}
          unit="px"
          onChange={(e) => onChangeMaxViewportWidth(e)}
        />
      </VStackBox>
      <HStack justify={"space-between"} w="100%" mt="2rem">
        <Text color="white">Name:</Text>
        <Text color="white" fontWeight={700}>
          {breakpointLabel}
        </Text>
      </HStack>
      <HStack justify={"flex-end"} w="100%">
        <Button onClick={() => onSaveBreakpoint()}>Create</Button>
      </HStack>
    </VStackBox>
  );
}
