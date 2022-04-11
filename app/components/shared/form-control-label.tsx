import { FormLabel, Text } from "@chakra-ui/react";

export default function FormControlLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <FormLabel
      htmlFor={htmlFor}
      color="primary.500"
      fontSize={"md"}
      fontWeight={400}
    >
      {children}
    </FormLabel>
  );
}
