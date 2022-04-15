import { Button, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useBreakpointService from "~/domain/breakpoints/useBreakpointService";

import SectionHeader from "../shared/section-header";
import VStackBox from "../shared/vstack-wrapper";
import FormControlInputNumber from "../shared/form-control-input-number";
import FormControlSelectBreakpoint from "../shared/form-control-select-breakpoint";
import parseInputString from "~/domain/utilities/parseInputString";
import parseDecimalNumber from "~/domain/utilities/parseDecimalNumber";
import { BreakpointId } from "~/context/font-size/interfaces";

enum EntityState {
  new = "new",
  edit = "edit",
  delete = "delete",
}

export default function BreakpointsEdit() {
  const [entityState, setEntityState] = useState<EntityState>(EntityState.new);
  const [currentId, setCurrentId] = useState<BreakpointId>("");
  const [minWidth, setMinWidth] = useState<string>("");
  const [maxWidth, setMaxWidth] = useState<string>("");
  const [label, setLabel] = useState<string>("...");

  const {
    breakpoints,
    buildLabel,
    createBreakpoint,
    saveBreakpoint,
    getViewportSizeByBreakpointId,
  } = useBreakpointService();

  function onChangeMinViewportWidth(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const minWidthAsString = parseInputString(value);
    setMinWidth(minWidthAsString);
  }

  function onChangeMaxViewportWidth(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const maxWidthAsString = parseInputString(value);
    setMaxWidth(maxWidthAsString);
  }

  function onSelectBreakpoint(e: React.ChangeEvent<HTMLInputElement>) {
    const optionSelected = e.target.value;

    if (optionSelected !== "") {
      setEntityState(EntityState.edit);
      setCurrentId(optionSelected as BreakpointId);
      const { minWidth, maxWidth } =
        getViewportSizeByBreakpointId(optionSelected);
      setMinWidth(String(minWidth));
      setMaxWidth(String(maxWidth));
    }

    if (optionSelected === "") {
      setEntityState(EntityState.new);
      setCurrentId("");
      setMinWidth("");
      setMaxWidth("");
    }
  }

  function onSaveBreakpoint() {
    saveBreakpoint(
      currentId,
      label,
      parseDecimalNumber(minWidth),
      parseDecimalNumber(maxWidth)
    );
  }

  function onCreateBreakpoint() {
    createBreakpoint(
      parseDecimalNumber(minWidth),
      parseDecimalNumber(maxWidth),
      label
    );
    setMinWidth("");
    setMaxWidth("");
  }

  useEffect(() => {
    setLabel(buildLabel({ minWidth, maxWidth }));
  }, [minWidth, maxWidth]);

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
          value={minWidth}
          unit="px"
          onChange={(e) => onChangeMinViewportWidth(e)}
        />
        <FormControlInputNumber
          id="maxViewportWidth"
          label="Maximum viewport width"
          value={maxWidth}
          unit="px"
          onChange={(e) => onChangeMaxViewportWidth(e)}
        />
      </VStackBox>
      <HStack justify={"space-between"} w="100%" mt="2rem">
        <Text color="white">Name:</Text>
        <Text color="white" fontWeight={700}>
          {entityState === EntityState.new ? "" : label}
        </Text>
      </HStack>
      <HStack justify={"flex-end"} w="100%">
        <Button
          onClick={
            entityState === EntityState.new
              ? onCreateBreakpoint
              : onSaveBreakpoint
          }
        >
          {entityState === EntityState.new ? "Create" : "Save"}
        </Button>
      </HStack>
    </VStackBox>
  );
}
