import { HStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import InputSelect from "~/components/shared/input-select";
import useBreakpoint from "~/context/font-size/hooks/useBreakpoint";
import useMediaQueries from "~/context/font-size/hooks/useMediaQueries";
import useTag from "~/context/font-size/hooks/useTag";

import useDeepCompareEffect from "use-deep-compare-effect";
import { Breakpoints } from "~/context/interfaces";

export default function FormControlSelectBreakpoint({
  breakpoints,
  onChange,
}: {
  breakpoints: Breakpoints;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <HStack justify={"space-between"} w="100%">
      <Text color="primary.500" fontSize={"md"}>
        Breakpoints
      </Text>
      <InputSelect minW="270px" onChange={onChange}>
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
