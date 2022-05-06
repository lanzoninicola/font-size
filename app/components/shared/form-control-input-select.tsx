import { HStack, StackProps, ThemingProps } from "@chakra-ui/react";
import InputWrapper from "./form-control-input-wrapper";
import FormControlLabel from "./form-control-label";
import InputSelect from "./input-select";
import InputText from "./input-text";

export default function FormControlInputSelect({
  id,
  orientation,
  size,
  label,
  labelSpacing,
  ariaLabel,
  justify,
  children,
  ...props
}: {
  id?: string;
  orientation?: "horizontal" | "vertical";
  size?: ThemingProps<"Input">["size"];
  label?: string;
  labelSpacing?: string;
  ariaLabel?: string;

  justify?: StackProps["justify"];

  children: React.ReactNode;
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
        <FormControlLabel fontSize={size} htmlFor={id} m={0}>
          {label}
        </FormControlLabel>
      )}

      <InputSelect size={size} w="100%" {...props}>
        {children}
      </InputSelect>
    </InputWrapper>
  );
}
