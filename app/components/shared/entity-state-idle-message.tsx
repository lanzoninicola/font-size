import { Box, Center, Text } from "@chakra-ui/react";

import { InitIcon, NewEntityIcon } from "./icons";
import VStackBox from "./vstack-wrapper";

export default function EntityStateIdleMessage({
  context,
}: {
  context: string;
}) {
  return (
    <VStackBox h="100%" spacing={2}>
      <Text color="primary.500">
        <Box as="span" display="flex" flexDir={"row"} gap=".75rem">
          Add your {context} with <NewEntityIcon /> button
        </Box>
      </Text>
      <Text color="primary.500">
        <Box as="span" display="flex" flexDir={"row"} gap=".75rem">
          or load a pre-made {context} with <InitIcon />
        </Box>
      </Text>
    </VStackBox>
  );
}
