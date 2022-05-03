import { Box, Divider, Grid, HStack, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import { BreakpointFlat } from "~/domain/breakpoints/interfaces";
import useBreakpointsDataService from "~/domain/breakpoints/useBreakpointsDataService";
import useBreakpointsFormService from "~/domain/breakpoints/useBreakpointsFormService";
import useBreakpointsRoutesNavigate from "~/domain/breakpoints/useBreakpointsRoutesNavigate";

import ActionButton from "../shared/action-button";
import { EditIcon, TrashIcon } from "../shared/icons";
import VStackBox from "../shared/vstack-wrapper";

export default function BreakpointsList() {
  const toast = useToast();

  const { breakpoints: breakpointContext } = useBreakpointsSelector();

  const { listAll } = useBreakpointsDataService();
  const { onDeleteBreakpoint } = useBreakpointsFormService();
  const { navigateTuUpdateBreakpoint } = useBreakpointsRoutesNavigate();

  const [breakpoints, setBreakpoints] = useState<BreakpointFlat[]>([]);

  function loadBreakpoints() {
    const breakpointsResponse = listAll();

    if (breakpointsResponse) {
      const { ok, payload } = breakpointsResponse;

      if (ok) {
        if (payload) {
          setBreakpoints(payload);
        }
      }
    }
  }

  function onBreakpointUpdate(breakpointId: BreakpointId) {
    navigateTuUpdateBreakpoint(breakpointId);
  }

  function onBreakpointDelete(id: BreakpointId) {
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

  useEffect(() => {
    loadBreakpoints();
  }, [breakpointContext]);

  return (
    <Grid gridTemplateColumns={"1fr 1fr"} gap="1rem">
      {breakpoints.map((breakpoint, index) => {
        const { id, minWidth, maxWidth, label } = breakpoint;
        return (
          <VStackBox
            borderRadius="20px"
            key={index}
            bg="background.300"
            w="max-content"
            p=".75rem"
            minW="150px"
            gap=".25rem"
          >
            <Grid
              gridTemplateColumns={"auto 80px auto"}
              gridTemplateRows={"1fr 1fr"}
              columnGap=".25rem"
            >
              <MinMaxLabel>MIN</MinMaxLabel>
              <ViewportValue>{minWidth}</ViewportValue>
              <UnitValue>PX</UnitValue>

              <MinMaxLabel>MAX</MinMaxLabel>
              <ViewportValue color="primary.500">{maxWidth}</ViewportValue>
              <UnitValue>PX</UnitValue>
            </Grid>
            <Divider borderColor="primaryAlpha.20" marginBlock={"1rem"} />
            <HStack w="100%" justify={"space-around"}>
              <ActionButton
                label="Edit entity"
                noHoverbg
                onClick={() => onBreakpointUpdate(id)}
                tooltipOffset={[-20, -50]}
              >
                <EditIcon ariaLabel="Edit entity" color="gray" />
              </ActionButton>
              <ActionButton
                label="Remove entity"
                noHoverbg
                onClick={() => onBreakpointDelete(id)}
                tooltipOffset={[-20, -50]}
              >
                <TrashIcon ariaLabel="Remove entity" color="gray" size={20} />
              </ActionButton>
            </HStack>
          </VStackBox>
        );
      })}
    </Grid>
  );
}

function MinMaxLabel({ children }: { children: React.ReactNode }) {
  return (
    <Box transform={"rotate(-90deg)"}>
      <Text fontSize="10px" color="primary.500" fontWeight={700}>
        {children}
      </Text>
    </Box>
  );
}

function ViewportValue({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Text
      color="secondary.300"
      fontSize="32px"
      lineHeight={1}
      textAlign="right"
      {...props}
    >
      {children}
    </Text>
  );
}

function UnitValue({ children }: { children: React.ReactNode }) {
  return (
    <Text fontSize="10px" color="primary.500" alignSelf={"flex-end"}>
      {children}
    </Text>
  );
}
