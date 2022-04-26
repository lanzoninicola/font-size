import { Button, HStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import BreakpointsInnerList from "~/components/breakpoints/breakpoints-inner-list";
import FormControlInputNumber from "~/components/shared/form-control-input-number";
import FormControlInputText from "~/components/shared/form-control-input-text";
import VStackBox from "~/components/shared/vstack-wrapper";
import useBreakpointsFormService from "~/domain/breakpoints/useBreakpointsFormService";

export default function NewBreakpointPage() {
  const toast = useToast();
  const {
    label,
    minWidth,
    maxWidth,
    onChangeLabel,
    onChangeMinWidth,
    onChangeMaxWidth,
    onCreateBreakpoint,
  } = useBreakpointsFormService();

  function onChangeBreakpointName(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    onChangeLabel(value);
  }

  function onChangeMinViewportWidth(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    onChangeMinWidth(value);
  }

  function onChangeMaxViewportWidth(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    onChangeMaxWidth(value);
  }

  function onSaveBreakpoint() {
    const response = onCreateBreakpoint();

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
        title: "Info",
        description: `Breakpoint ${response.payload?.label} created successfully`,
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <VStackBox w="100%" gap="3rem">
        <VStackBox gap="1.5rem">
          <FormControlInputText
            id="label"
            label="Name"
            value={label}
            minW="370px"
            onChange={(e) => onChangeBreakpointName(e)}
          />
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

        <HStack justify={"flex-end"} w="100%">
          <Button onClick={onSaveBreakpoint} bg={"secondary.500"}>
            Save
          </Button>
        </HStack>
      </VStackBox>
      <BreakpointsInnerList />
    </>
  );
}
