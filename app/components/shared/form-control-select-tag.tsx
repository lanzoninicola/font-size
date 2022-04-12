import { HStack, Text } from "@chakra-ui/react";
import InputSelect from "~/components/shared/input-select";
import useTag from "~/context/font-size/hooks/useTag";

export default function FormControlSelectTag({
  onChange,
}: {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { tag } = useTag();

  return (
    <HStack justify={"space-between"} w="100%">
      <Text color="primary.500" fontSize={"md"}>
        Choose a tag
      </Text>
      <InputSelect minW="370px" fontSize="16px" onChange={onChange} value={tag}>
        <option value="h1">Heading (H1)</option>
        <option value="h2">Heading (H2)</option>
        <option value="h3">Heading (H3)</option>
        <option value="p">Paragraph (p)</option>
      </InputSelect>
    </HStack>
  );
}
