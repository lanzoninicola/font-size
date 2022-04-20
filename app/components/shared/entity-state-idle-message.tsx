import { Box, Center, Text } from "@chakra-ui/react";

import { NewEntityIcon } from "./icons";

export default function EntityStateIdleMessage({
  context,
}: {
  context: string;
}) {
  return (
    <Center h="100%">
      <Text color="primary.500">
        <Box as="span" display="flex" flexDir={"row"} gap=".75rem">
          Add your {context} with <NewEntityIcon /> button
        </Box>
      </Text>
    </Center>
  );
}
