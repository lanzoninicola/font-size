import { HStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import InputSelect from "~/components/shared/input-select";
import {
  BreakpointId,
  Breakpoints,
} from "~/context/breakpoint-builder/interfaces";
import VStackBox from "./vstack-wrapper";

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
    <VStackBox w="100%" spacing={1}>
      <Text color="primary.500" fontSize={"sm"}>
        Breakpoints
      </Text>
      <InputSelect
        maxW="270px"
        fontSize={"sm"}
        onChange={onChange}
        value={value || "no-selected"}
        textAlign="left"
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
    </VStackBox>
  );
}
