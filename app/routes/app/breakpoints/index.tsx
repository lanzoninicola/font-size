import { Center } from "@chakra-ui/react";
import BreakpointsList from "~/components/breakpoints/breakpoints-list";
import BreakpointsToolbar from "~/components/breakpoints/breakpoints-toolbar";
import FlexRowWrapColumn from "~/components/layout/flex-row-wrap-column";
import InnerPageHeaderArea from "~/components/layout/inner-page-header-area";
import EntityStateIdleMessage from "~/components/shared/entity-state-idle-message";
import SectionSubHeader from "~/components/shared/section-subheader";
import VStackBox from "~/components/shared/vstack-wrapper";
import { BreakpointsFormProvider } from "~/context/breakpoint-builder/breakpoints-form-context";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";

export default function BreakpointsPage() {
  const { isBreakpointsEmpty } = useBreakpointsQueryService();

  return (
    <>
      <VStackBox gap="2rem">
        <InnerPageHeaderArea>
          <SectionSubHeader>Breakpoints List</SectionSubHeader>
          <BreakpointsToolbar />
        </InnerPageHeaderArea>
        {isBreakpointsEmpty() && (
          <Center h="100%" w="100%">
            <EntityStateIdleMessage context="breakpoints" />
          </Center>
        )}
        {!isBreakpointsEmpty() && <BreakpointsList />}
      </VStackBox>
    </>
  );
}
