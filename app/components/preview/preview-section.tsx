import { HStack } from "@chakra-ui/react";
import VStackBox from "../shared/vstack-wrapper";

import PreviewItem from "./preview-item";
import PreviewToolbar from "./preview-toolbar";

export default function PreviewSection() {
  return (
    <VStackBox gap="1rem">
      <PreviewToolbar />
      <HStack
        flex={"1 0 850px"}
        p="1rem"
        w="100%"
        gap="2rem"
        align={"flex-start"}
      >
        <PreviewItem />
        {/* <PreviewItem /> */}
      </HStack>
    </VStackBox>
  );
}
