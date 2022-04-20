import { HStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import InputSelect from "~/components/shared/input-select";
import {
  BreakpointId,
  Breakpoints,
} from "~/context/breakpoint-builder/interfaces";

export interface SelectOption {
  value: string;
  label: string;
}

export default function FormControlSelectBreakpoint({
  breakpoints,
  value,
  onChange,
  ...props
}: {
  breakpoints: Breakpoints | null;
  value?: BreakpointId;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}) {
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (breakpoints) {
      let options: SelectOption[] = [
        {
          value: "",
          label: " --- Choose a breakpoint --- ",
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
        value={value || "no-selected"}
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
