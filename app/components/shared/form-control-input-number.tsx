import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import FormControlLabel from "~/components/shared/form-control-label";
import InputNumber from "~/components/shared/input-number";
import InputWrapper from "./form-control-input-wrapper";
import VStackBox from "./vstack-wrapper";

export default function FormControlInputNumber({
  id,
  orientation,
  label,
  labelFontSize,
  labelSpacing,
  ariaLabel,
  unitFontSize,
  value,
  unit,
  leftUnit,
  rightUnit,
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
  unitFontSize?: string;
  value?: string;
  unit?: string;
  leftUnit?: string;
  rightUnit?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEventHandler<HTMLInputElement>) => void;
  [key: string]: any;
}) {
  return (
    <InputWrapper
      w="100%"
      aria-label={ariaLabel || (label && `Set the ${label.toLowerCase()}`)}
      justify={unit || leftUnit || rightUnit ? "space-between" : "center"}
      alignItems="center"
      gap={labelSpacing || ".25rem"}
    >
      {label && (
        <FormControlLabel fontSize={labelFontSize} htmlFor={id} m={0}>
          {label}
        </FormControlLabel>
      )}
      <HStack>
        {leftUnit && (
          <Text
            color="primary.500"
            fontWeight={700}
            fontSize={unitFontSize || "sm"}
          >
            {leftUnit && leftUnit.toUpperCase()}
          </Text>
        )}
        <InputNumber
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
        {(unit || rightUnit) && (
          <Text
            color="primary.500"
            fontWeight={700}
            fontSize={unitFontSize || "sm"}
          >
            {(unit && unit.toUpperCase()) ||
              (rightUnit && rightUnit.toUpperCase())}
          </Text>
        )}
      </HStack>
    </InputWrapper>
  );
}
