import { Center } from "@chakra-ui/react";
import BreakpointsList from "~/components/breakpoints/breakpoints-list";
import EntityStateIdleMessage from "~/components/shared/entity-state-idle-message";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";

export default function BreakpointsPage() {
  const { isBreakpointsEmpty } = useBreakpointsQueryService();

  return (
    <>
      {isBreakpointsEmpty() && (
        <Center h="100%" w="100%">
          <EntityStateIdleMessage context="breakpoints" />
        </Center>
      )}
      {!isBreakpointsEmpty() && <BreakpointsList />}
    </>
  );
}
