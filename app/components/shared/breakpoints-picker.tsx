import { useEffect, useState } from "react";
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import { BreakpointFlat } from "~/domain/breakpoints/interfaces";
import useBreakpointsDataService from "~/domain/breakpoints/useBreakpointsDataService";

import FormControlInputSelect from "./form-control-input-select";

export interface SelectOption {
  value: string;
  label: string;
}

export interface Props {
  value?: BreakpointId;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

export default function BreakpointsPicker({
  value,
  onChange,
  ...props
}: Props) {
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
    <FormControlInputSelect
      id="breakpoint"
      size={"md"}
      orientation="vertical"
      value={value || "no-selected"}
      maxW="100%"
      onChange={onChange}
      {...props}
    >
      {selectOptions.map((selectOption, index) => {
        return (
          <option key={index + 1} value={selectOption.value}>
            {selectOption.label}
          </option>
        );
      })}
    </FormControlInputSelect>
  );
}
