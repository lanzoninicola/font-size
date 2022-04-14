import { HStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import InputSelect from "~/components/shared/input-select";
import { Breakpoints } from "~/context/font-size/interfaces";
import useBreakpointService from "~/domain/breakpoints/useBreakpointService";

export interface SelectOption {
  value: string | undefined;
  label: string | undefined;
}

export default function FormControlSelectBreakpoint({
  breakpoints,
  onChange,
  ...props
}: {
  breakpoints: Breakpoints | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}) {
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (breakpoints) {
      let options: SelectOption[] = [
        {
          value: undefined,
          label: " --- Select a breakpoint --- ",
        },
      ];

      Object.keys(breakpoints).map((key) => {
        options.push({
          value: key,
          label: breakpoints[key].label ? breakpoints[key].label : "",
        });
      });
      setSelectOptions(options);
    }
  }, [breakpoints]);

  return (
    <HStack justify={"space-between"} w="100%">
      <Text color="primary.500" fontSize={"md"}>
        Breakpoints
      </Text>
      <InputSelect
        minW="370px"
        fontSize="16px"
        onChange={onChange}
        defaultValue="no-selected"
        {...props}
      >
        {breakpoints &&
          selectOptions.map((selectOption, index) => {
            return (
              <option key={index + 1} value={selectOption.value}>
                {selectOption.label}
              </option>
            );
          })}
      </InputSelect>
    </HStack>
  );
}
