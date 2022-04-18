import { Center, Box, Text } from "@chakra-ui/react";
import { NewMediaQueryIcon } from "../shared/icons";

export default function MediaQueryEditIdle() {
  return (
    <Center>
      <Text color="primary.500">
        <Box as="span" display="flex" flexDir={"row"} gap=".75rem">
          Add your media queries with <NewMediaQueryIcon /> button
        </Box>
      </Text>
    </Center>
  );
}
