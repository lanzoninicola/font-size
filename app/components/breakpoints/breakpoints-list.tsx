import { HStack, Text, useToast } from "@chakra-ui/react";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useBreakpointsSelector from "~/context/font-size/hooks/useBreakpointsSelector";
import useBreakpointsFormService from "~/domain/breakpoints/useBreakpointsFormService";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";

import EntityList from "../shared/entity-list";
import {
  MaxFontSizeIcon,
  MaxWidthIcon,
  MinFontSizeIcon,
  MinWidthIcon,
} from "../shared/icons";
import VStackBox from "../shared/vstack-wrapper";

export default function BreakpointsList() {
  const toast = useToast();

  const { breakpoints } = useBreakpointsSelector();
  const { onEditBreakpoint, onDeleteBreakpoint } = useBreakpointsFormService();
  const { isBreakpointsEmpty } = useBreakpointsQueryService();

  function onBrekpointDeletion(id: BreakpointId) {
    const deleteResponse = onDeleteBreakpoint(id);

    if (!deleteResponse.ok) {
      toast({
        title: "Error",
        description: deleteResponse.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <VStackBox w="100%" gap=".5rem" paddingLeft="2rem" paddingRight="1rem">
      {!isBreakpointsEmpty() &&
        Object.keys(breakpoints).map((breakpointId: BreakpointId, index) => {
          const { minWidth, maxWidth } = breakpoints[breakpointId];

          return (
            <EntityList
              key={index}
              entityName={breakpoints[breakpointId].label}
              onEdit={() => onEditBreakpoint(breakpointId)}
              onDelete={() => onBrekpointDeletion(breakpointId)}
            >
              <HStack gap="1rem">
                <HStack>
                  <MinWidthIcon color="green" />
                  <Text color="secondary.700">{`${minWidth}px`}</Text>
                </HStack>
                <HStack>
                  <MaxWidthIcon color="green" />
                  <Text color="secondary.700">{`${maxWidth}px`}</Text>
                </HStack>
              </HStack>
            </EntityList>
          );
        })}
    </VStackBox>
  );
}
