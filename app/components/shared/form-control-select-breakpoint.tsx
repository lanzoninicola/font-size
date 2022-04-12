import { HStack, Text } from "@chakra-ui/react";
import InputSelect from "~/components/shared/input-select";
import { Breakpoints } from "~/context/interfaces";

export default function FormControlSelectBreakpoint({
  breakpoints,
  onChange,
  ...props
}: {
  breakpoints: Breakpoints | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}) {
  return (
    <HStack justify={"space-between"} w="100%">
      <Text color="primary.500" fontSize={"md"}>
        Breakpoints
      </Text>
      <InputSelect minW="370px" fontSize="16px" onChange={onChange} {...props}>
        {breakpoints &&
          Object.keys(breakpoints).map((key, index) => {
            return (
              <option key={index} value={key}>
                {breakpoints[key as keyof typeof breakpoints].label}
              </option>
            );
          })}
      </InputSelect>
    </HStack>
  );
}
