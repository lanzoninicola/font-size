import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InputSelect from "~/components/shared/input-select";
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import { BreakpointFlat } from "~/domain/breakpoints/interfaces";
import useBreakpointsDataService from "~/domain/breakpoints/useBreakpointsDataService";

import VStackBox from "./vstack-wrapper";

export interface SelectOption {
  value: string;
  label: string;
}

export default function FormControlSelectBreakpoint({
  value,
  onChange,
  ...props
}: {
  value?: BreakpointId;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}) {
  const { breakpoints } = useBreakpointsSelector();

  const { listAll } = useBreakpointsDataService();
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);

  function initOptions() {
    const breakpointsResponse = listAll();
    if (breakpointsResponse) {
      const { ok, payload } = breakpointsResponse;

      if (ok) {
        if (payload) {
          buildOptions(payload);
        }
      }
    }
  }

  function buildOptions(breakpoints: BreakpointFlat[]) {
    if (breakpoints) {
      let options: SelectOption[] = [
        {
          value: "",
          label: " --- Choose a breakpoint --- ",
        },
      ];

      breakpoints.map((b) => {
        const optionLabel = `${b.label} (${b.minWidth}x${b.maxWidth})`;

        options.push({
          value: b.id,
          label: optionLabel || "",
        });
      });
      setSelectOptions(options);
    }
  }

  useEffect(() => {
    initOptions();
  }, [breakpoints]);

  return (
    <VStackBox w="100%" spacing={1}>
      <Text color="primary.500" fontSize={"sm"}>
        Breakpoints
      </Text>
      <InputSelect
        className="input-select"
        maxW="100%"
        fontSize={"sm"}
        onChange={onChange}
        value={value || "no-selected"}
        textAlign="left"
        {...props}
      >
        {selectOptions.map((selectOption, index) => {
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
