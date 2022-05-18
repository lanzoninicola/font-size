import { HStack, VStack, Text } from "@chakra-ui/react";
import FormControlLabel from "~/components/shared/form-control-label";
import InputNumber from "~/components/shared/input-number";
import VStackBox from "~/components/shared/vstack-wrapper";

export default function ConverterPixelsRems() {
  function onChangePixels(value: string) {}

  function onChangeRems(value: string) {}

  return (
    <VStackBox>
      <FormControlLabel>Convert PX to REM</FormControlLabel>
      <HStack w="100%" aria-label={`Convert PX to REM`} justify="space-between">
        <HStack>
          <InputNumber />
          <Text color="primary.500" fontWeight="bold" fontSize={"sm"}>
            PX
          </Text>
        </HStack>
        <HStack>
          <InputNumber />
          <Text color="primary.500" fontWeight="bold" fontSize={"sm"}>
            REM
          </Text>
        </HStack>
      </HStack>
    </VStackBox>
  );
}
