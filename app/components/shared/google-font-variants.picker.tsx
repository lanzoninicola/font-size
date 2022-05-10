import { HStack, Text } from "@chakra-ui/react";
import InputSelect from "./input-select";

interface GoogleFontsProps {
  weights: string[];
  [key: string]: any;
}

export default function GoogleFontVariantsPicker({
  weights,
  ...props
}: GoogleFontsProps) {
  return (
    <HStack>
      <Text color="primary.500" fontSize="smaller">
        Weight
      </Text>
      <InputSelect w="100%" fontSize={"smaller"} textAlign="left" {...props}>
        {weights.map((weight, index) => (
          <option key={index} value={weight}>
            {weight}
          </option>
        ))}
      </InputSelect>
    </HStack>
  );
}
