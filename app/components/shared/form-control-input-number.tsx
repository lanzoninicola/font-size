import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import FormControlLabel from "~/components/shared/form-control-label";
import InputNumber from "~/components/shared/input-number";

export default function FormControlInputNumber({
  id,
  label,
  labelFontSize,
  labelSpacing,
  ariaLabel,
  unitFontSize,
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
  unitFontSize?: string;
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
      justify={unit ? "space-between" : "center"}
      alignItems="center"
      gap={labelSpacing || ".25rem"}
    >
      {label && (
        <FormControlLabel fontSize={labelFontSize} htmlFor={id} m={0}>
          {label}
        </FormControlLabel>
      )}
      <HStack>
        <InputNumber
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
        {unit && (
          <Text
            color="primary.500"
            fontWeight={700}
            fontSize={unitFontSize || "sm"}
          >
            {unit.toUpperCase()}
          </Text>
        )}
      </HStack>
    </HStack>
  );
}
