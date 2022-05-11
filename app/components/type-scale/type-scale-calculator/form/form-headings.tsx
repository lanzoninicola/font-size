import { Heading } from "@chakra-ui/react";

export function FormHeading({ children }: { children: React.ReactNode }) {
  return (
    <Heading
      as="h4"
      fontSize={"xs"}
      color="secondary.300"
      textTransform={"uppercase"}
      letterSpacing={1}
    >
      {children}
    </Heading>
  );
}

export function FormSubHeading({ children }: { children: React.ReactNode }) {
  return (
    <Heading as="h3" fontSize={"xs"} color="secondary.300">
      {children}
    </Heading>
  );
}
