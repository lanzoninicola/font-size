import { HStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import InputSelect from "~/components/shared/input-select";
import { Breakpoints } from "~/context/interfaces";

export default function FormControlSelectBreakpoint({
  breakpoints,
  onChange,
  ...props
}: {
  breakpoints: Breakpoints;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}) {
  return (
    <HStack justify={"space-between"} w="100%">
      <Text color="primary.500" fontSize={"md"}>
        Breakpoints
      </Text>
      <InputSelect minW="270px" onChange={onChange} {...props}>
        {Object.keys(breakpoints).map((key, index) => {
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
