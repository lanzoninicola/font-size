import { Button, HStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import BreakpointsInnerList from "~/components/breakpoints/breakpoints-inner-list";
import FormControlInputNumber from "~/components/shared/form-control-input-number";
import VStackBox from "~/components/shared/vstack-wrapper";
import useBreakpointsFormService from "~/domain/breakpoints/useBreakpointsFormService";

export default function NewBreakpointPage() {
  const toast = useToast();
  const {
    minWidth,
    maxWidth,
    onChangeMinWidth,
    onChangeMaxWidth,
    onCreateBreakpoint,
  } = useBreakpointsFormService();

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
        {/* <FormControlInputText
        id="label"
        label="Name"
        value={label}
        minW="370px"
        isDisabled
      /> */}

        <HStack justify={"flex-end"} w="100%">
          <Button onClick={onSaveBreakpoint}>Save</Button>
        </HStack>
      </VStackBox>
      <BreakpointsInnerList />
    </>
  );
}
