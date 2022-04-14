import { HStack, Button } from "@chakra-ui/react";
import breakpoints from "../breakpoints/breakpoints";
import FormControlInputNumber from "../shared/form-control-input-number";
import FormControlSelectBreakpoint from "../shared/form-control-select-breakpoint";
import SectionHeader from "../shared/section-header";
import VStackBox from "../shared/vstack-wrapper";

export default function SelectorsIndex() {
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
