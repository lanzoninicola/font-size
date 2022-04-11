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
      paddingInline={["1rem", "2rem"]}
      wrap="wrap"
      maxH="120px"
    >
      <Heading as="h1" color="primary.500">
        Font scaling with clamp()
      </Heading>
      <Credits />
    </HStack>
  );
}
