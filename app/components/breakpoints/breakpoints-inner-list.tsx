import { Divider, Heading, HStack, Text } from "@chakra-ui/react";
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";

import { MaxWidthIcon, MinWidthIcon } from "../shared/icons";
import VStackBox from "../shared/vstack-wrapper";

export default function BreakpointsInnerList() {
  const { breakpoints } = useBreakpointsSelector();

  return (
    <VStackBox w="100%" gap=".5rem">
      <VStackBox gap=".5rem" mb="1rem">
        <Heading as="h3" fontSize={"md"} color="secondary.700">
          Recently created
        </Heading>
        <Divider borderColor="secondary.700" />
      </VStackBox>
      {breakpoints &&
        Object.keys(breakpoints).map((breakpointId: BreakpointId, index) => {
          const { minWidth, maxWidth, label } = breakpoints[breakpointId];

          return (
            <HStack
              key={index}
              justify={"space-between"}
              w="100%"
              _hover={{
                cursor: "pointer",
                backgroundColor: "primaryAlpha.80",
                borderRadius: "5px",
                paddingInline: ".5rem",
                transition: "all 0.2s ease-in-out",
              }}
            >
              <Text fontSize={"sm"} color="secondary.700">
                {label}
              </Text>
              <HStack gap="1rem">
                <HStack>
                  <MinWidthIcon color="green" />
                  <Text
                    fontSize={"sm"}
                    color="secondary.700"
                  >{`${minWidth}px`}</Text>
                </HStack>
                <HStack>
                  <MaxWidthIcon color="green" />
                  <Text
                    fontSize={"sm"}
                    color="secondary.700"
                  >{`${maxWidth}px`}</Text>
                </HStack>
              </HStack>
            </HStack>
          );
        })}
    </VStackBox>
  );
}
