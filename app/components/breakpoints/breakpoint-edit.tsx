import { Button, HStack, Text, useToast } from "@chakra-ui/react";
import useBreakpointsSelector from "~/context/font-size/hooks/useBreakpointsSelector";
import { EntityState } from "~/context/shared/interfaces/entity-state";
import useBreakpointsFormService from "~/domain/breakpoints/useBreakpointsFormService";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";

import InnerContentColumn from "../layout/inner-content-column";
import EntityStateIdleMessage from "../shared/entity-state-idle-message";
import FormControlInputNumber from "../shared/form-control-input-number";
import FormControlSelectBreakpoint from "../shared/form-control-select-breakpoint";
import VStackBox from "../shared/vstack-wrapper";

export default function BreakpointsEdit() {
  const toast = useToast();
  const { breakpoints } = useBreakpointsSelector();
  const { isBreakpointsEmpty } = useBreakpointsQueryService();
  const {
    entityState,
    currentBreakpointId,
    minWidth,
    maxWidth,
    label,
    onChangeBreakpoint,
    onChangeMinWidth,
    onChangeMaxWidth,
    onUpdateBreakpoint,
    onCreateBreakpoint,
  } = useBreakpointsFormService();

  console.log("**** BreakpointsEdit fired", breakpoints);

  function onChangeMinViewportWidth(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    onChangeMinWidth(value);
  }

  function onChangeMaxViewportWidth(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    onChangeMaxWidth(value);
  }

  function onSelectBreakpoint(e: React.ChangeEvent<HTMLInputElement>) {
    const optionSelected = e.target.value;
    onChangeBreakpoint(optionSelected);
  }

  function onSaveBreakpoint() {
    let response = null;

    if (entityState === EntityState.new) {
      response = onCreateBreakpoint();
    } else {
      response = onUpdateBreakpoint();
    }

    if (response.error) {
      toast({
        title: "Error",
        description: response.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    if (response.ok) {
      toast({
        title: "Error",
        description: "Breakpoint created successfully",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <InnerContentColumn paddingTop={"0.5rem"}>
      {isBreakpointsEmpty() && entityState === EntityState.idle && (
        <EntityStateIdleMessage context="breakpoints" />
      )}
      {(!isBreakpointsEmpty() || entityState !== EntityState.idle) && (
        <VStackBox gap="2rem" paddingInlineStart="2rem" paddingRight="1rem">
          <VStackBox gap="1.5rem">
            {entityState !== EntityState.new && (
              <FormControlSelectBreakpoint
                breakpoints={breakpoints}
                onChange={onSelectBreakpoint}
                value={currentBreakpointId}
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
              {label}
            </Text>
          </HStack>
          <HStack justify={"flex-end"} w="100%">
            <Button onClick={onSaveBreakpoint}>
              {entityState === EntityState.new ? "Create" : "Save"}
            </Button>
          </HStack>
        </VStackBox>
      )}
    </InnerContentColumn>
  );
}
