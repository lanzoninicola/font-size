import { HStack, Link, Text } from "@chakra-ui/react";

import BoxWrapper from "./box-wrapper";
import { LinkOutIcon } from "./icons";
import VStackBox from "./vstack-wrapper";

export default function Credits() {
  return (
    <BoxWrapper
      className="credits"
      aria-label="Content credits"
      p={[".5rem 1rem", ".5rem 1.5rem", ".5rem 2.5rem"]}
    >
      <HStack gap="1rem">
        <VStackBox>
          <HStack wrap={"wrap"} gap=".15rem" spacing={0}>
            <Text fontSize={["sm"]} fontWeight={700}>
              Credits:
            </Text>
            <Text fontSize={["sm"]}>Pedro Rodriguez</Text>
          </HStack>
          <Text fontSize={["sm"]} fontWeight={700}>
            Read the article
          </Text>
        </VStackBox>
        <Link
          href="https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/"
          rel="noopener"
          target="_blank"
          isExternal
          aria-label="Link to CSS Tricks article"
        >
          <LinkOutIcon />
        </Link>
      </HStack>
    </BoxWrapper>
  );
}
