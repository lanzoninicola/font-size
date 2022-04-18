import { HStack, Text } from "@chakra-ui/react";
import InputSelect from "~/components/shared/input-select";

export default function FormControlSelectSelector({
  isDisabled,
  onChange,
}: {
  isDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <HStack justify={"space-between"} w="100%">
      <Text color="primary.500" fontSize={"md"}>
        Selectors
      </Text>
      <InputSelect
        minW="370px"
        fontSize="16px"
        onChange={onChange}
        defaultValue="no-selected"
        isDisabled={isDisabled}
      >
        <option value="no-selected">--- Choose a selector ---</option>
        <option value="h1">Heading (H1)</option>
        <option value="h2">Heading (H2)</option>
        <option value="h3">Heading (H3)</option>
        <option value="p">Paragraph (p)</option>
      </InputSelect>
    </HStack>
  );
}
