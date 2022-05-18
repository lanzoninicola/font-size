import { FormLabel } from "@chakra-ui/react";

export default function FormControlLabel({
  children,
  htmlFor,
  ...props
}: {
  children: React.ReactNode;
  htmlFor?: string;
  [key: string]: any;
}) {
  return (
    <FormLabel
      htmlFor={htmlFor}
      color="primary.500"
      fontWeight="normal"
      fontSize={props.fontSize || "sm"}
      {...props}
    >
      {children}
    </FormLabel>
  );
}
