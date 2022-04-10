import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box gridArea={"ft"} paddingInline={["1rem", "2rem", "4rem"]}>
      <Text color="primary.500" fontSize={"lg"}>
        Footer
      </Text>
    </Box>
  );
}
