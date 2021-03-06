import { Button, HStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "remix";
import FormControlInputNumber from "~/components/shared/form-control-input-number";
import FormControlInputText from "~/components/shared/form-control-input-text";
import VStackBox from "~/components/shared/vstack-wrapper";
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import useBreakpointsFormService from "~/domain/breakpoints/useBreakpointsFormService";

export default function BreakpointFormUpdate() {
  const toast = useToast();
  const { breakpointId } = useParams();
  const {
    currentBreakpointId,
    minWidth,
    maxWidth,
    label,
    onUpdateInit,
    onChangeLabel,
    onChangeMinWidth,
    onChangeMaxWidth,
    onUpdateBreakpoint,
  } = useBreakpointsFormService();
  const { breakpoints } = useBreakpointsSelector();

  function onInit() {
    if (breakpointId) {
      const response = onUpdateInit(breakpointId);

      if (response.ok === false) {
        toast({
          title: "Error",
          description: response.error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  }

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
    const response = onUpdateBreakpoint();

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
        description: "Breakpoint updated successfully",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    onInit();
  }, [breakpoints, currentBreakpointId]);

  return (
    <>
      <VStackBox gap="2rem">
        <VStackBox gap="1.5rem" w="100%">
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
        <FormControlInputText
          orientation="vertical"
          id="label"
          label="Name"
          value={label}
          minW="320px"
          onChange={(e) => onChangeBreakpointName(e)}
        />
        <HStack justify={"flex-end"} w="100%">
          <Button onClick={onSaveBreakpoint} bg="secondary.500">
            Save
          </Button>
        </HStack>
      </VStackBox>
    </>
  );
}
