import { FormLabel, Text } from "@chakra-ui/react";

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
      fontWeight={400}
      fontSize={props.fontSize || "md"}
      {...props}
    >
      {children}
    </FormLabel>
  );
}
