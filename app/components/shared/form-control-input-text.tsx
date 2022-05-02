import { HStack, StackProps } from "@chakra-ui/react";
import React from "react";
import FormControlLabel from "~/components/shared/form-control-label";

import InputWrapper from "./form-control-input-wrapper";
import InputText from "./input-text";

export default function FormControlInputText({
  id,
  orientation,
  label,
  labelFontSize,
  labelSpacing,
  ariaLabel,
  value,
  unit,

  justify,

  onChange,
  onBlur,

  ...props
}: {
  id: string;
  orientation?: "horizontal" | "vertical";
  label?: string;
  labelFontSize?: string;
  labelSpacing?: string;
  ariaLabel?: string;
  value?: string;
  unit?: string;

  justify?: StackProps["justify"];

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEventHandler<HTMLInputElement>) => void;
  [key: string]: any;
}) {
  return (
    <InputWrapper
      orientation={orientation}
      w="100%"
      aria-label={ariaLabel || (label && `Set the ${label.toLowerCase()}`)}
      justify={justify || "space-between"}
      gap={labelSpacing || ".25rem"}
    >
      {label && (
        <FormControlLabel fontSize={labelFontSize} htmlFor={id} m={0}>
          {label}
        </FormControlLabel>
      )}
      <HStack w="100%">
        <InputText
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
      </HStack>
    </InputWrapper>
  );
}
