import { HStack, Text, useToast } from "@chakra-ui/react";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import useBreakpointsFormService from "~/domain/breakpoints/useBreakpointsFormService";

import EntityListFullPage from "../shared/entity-list-full-page";
import { MaxWidthIcon, MinWidthIcon } from "../shared/icons";
import VStackBox from "../shared/vstack-wrapper";

export default function BreakpointsList() {
  const toast = useToast();

  const { breakpoints } = useBreakpointsSelector();
  const { navigateToBreakpointEdit, onDeleteBreakpoint } =
    useBreakpointsFormService();

  function onBreakpointEdit(breakpointId: BreakpointId) {
    navigateToBreakpointEdit(breakpointId);
  }

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
      {breakpoints &&
        Object.keys(breakpoints).map((breakpointId: BreakpointId, index) => {
          const { minWidth, maxWidth } = breakpoints[breakpointId];

          return (
            <EntityListFullPage
              key={index}
              entityName={breakpoints[breakpointId].label}
              onEdit={() => onBreakpointEdit(breakpointId)}
              onDelete={() => onBrekpointDeletion(breakpointId)}
            >
              <HStack gap="1rem">
                <HStack>
                  <MinWidthIcon color="gray" />
                  <Text color="primary.500">{`${minWidth}px`}</Text>
                </HStack>
                <HStack>
                  <MaxWidthIcon color="gray" />
                  <Text color="primary.500">{`${maxWidth}px`}</Text>
                </HStack>
              </HStack>
            </EntityListFullPage>
          );
        })}
    </VStackBox>
  );
}
