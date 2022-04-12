import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useBreakpoint from "~/context/font-size/hooks/useBreakpoint";
import useBreakpointBuilder from "~/context/font-size/hooks/useBreakpointBuilder";
import useTag from "~/context/font-size/hooks/useTag";
import VStackBox from "../shared/vstack-wrapper";
import FormControlInputNumber from "./components/form-control-input-number";
import FormControlSelectBreakpoint from "./components/form-control-select-breakpoint";
import FormControlSelectTag from "./components/form-control-select-tag";

export default function Breakpoints() {
  const {
    minWidth,
    maxWidth,
    onChangeMinWidth,
    onChangeMaxWidth,
    onCreateBreakpoint,
  } = useBreakpointBuilder();

  const {
    minWidth: minWidthRead,
    maxWidth: maxWidthRead,
    breakpoints,
    onChangeBreakpoint,
  } = useBreakpoint();

  function onChangeMinViewportWidth(e: React.ChangeEvent<HTMLInputElement>) {
    onChangeMinWidth(e);
  }

  function onChangeMaxViewportWidth(e: React.ChangeEvent<HTMLInputElement>) {
    onChangeMaxWidth(e);
  }

  useEffect(() => {}, [minWidthRead, maxWidthRead]);

  return (
    <VStackBox gap="1.2rem">
      {breakpoints && (
        <FormControlSelectBreakpoint
          breakpoints={breakpoints}
          onChange={onChangeBreakpoint}
        />
      )}
      <FormControlInputNumber
        id="minViewportWidth"
        label="Minimum viewport width"
        value={minWidth || minWidthRead}
        unit="px"
        onChange={(e) => onChangeMinViewportWidth(e)}
      />
      <FormControlInputNumber
        id="maxViewportWidth"
        label="Maximum viewport width"
        value={maxWidth || maxWidthRead}
        unit="px"
        onChange={(e) => onChangeMaxViewportWidth(e)}
      />
      <Button onClick={() => onCreateBreakpoint()}>Create breakpoint</Button>
    </VStackBox>
  );
}
