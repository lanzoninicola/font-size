import { HStack } from "@chakra-ui/react";
import React from "react";
import FormControlLabel from "~/components/shared/form-control-label";

import InputText from "./input-text";

export default function FormControlInputText({
  id,
  label,
  labelFontSize,
  labelSpacing,
  ariaLabel,
  value,
  unit,
  onChange,
  onBlur,

  ...props
}: {
  id: string;
  label?: string;
  labelFontSize?: string;
  labelSpacing?: string;
  ariaLabel?: string;
  value?: string;
  unit?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEventHandler<HTMLInputElement>) => void;
  [key: string]: any;
}) {
  return (
    <HStack
      w="100%"
      aria-label={ariaLabel || (label && `Set the ${label.toLowerCase()}`)}
      justify={"space-between"}
      alignItems="center"
      gap={labelSpacing || ".25rem"}
    >
      {label && (
        <FormControlLabel fontSize={labelFontSize} htmlFor={id} m={0}>
          {label}
        </FormControlLabel>
      )}
      <HStack>
        <InputText
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
      </HStack>
    </HStack>
  );
}
