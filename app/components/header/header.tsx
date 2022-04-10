import { Heading, HStack } from "@chakra-ui/react";
import Credits from "../shared/credits";

export default function Header() {
  return (
    <HStack
      as="header"
      justify="space-between"
      borderBottom={"1px solid"}
      borderColor="primaryAlpha.20"
      gridArea={"hd"}
      paddingInline={["1rem", "2rem", "4rem"]}
      wrap="wrap"
    >
      <Heading color="primary.500">font-size: clamp()</Heading>
      <Credits />
    </HStack>
  );
}
