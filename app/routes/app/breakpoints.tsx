import { Box } from "@chakra-ui/react";
import BreakpointsEdit from "~/components/breakpoints/breakpoint-edit";
import BreakpointsList from "~/components/breakpoints/breakpoints-list";
import BreakpointsToolbar from "~/components/breakpoints/breakpoints-toolbar";
import FlexRowWrap from "~/components/layout/flex-row-wrap";
import FlexRowWrapColumn from "~/components/layout/flex-row-wrap-column";
import SectionSubHeaderWrapper from "~/components/layout/section-sub-header-wrapper";
import PageHeader from "~/components/shared/page-header";
import SectionSubHeader from "~/components/shared/section-subheader";
import { BreakpointsFormProvider } from "~/context/breakpoint-builder/breakpoints-form-context";

export default function BreakpointsPage() {
  return (
    <Box>
      <PageHeader>Breakpoints</PageHeader>

      <FlexRowWrap gap={0}>
        <FlexRowWrapColumn wrapAt="600px" maxW="650px">
          <BreakpointsFormProvider>
            <SectionSubHeaderWrapper>
              <SectionSubHeader>Builder</SectionSubHeader>
              <BreakpointsToolbar />
            </SectionSubHeaderWrapper>

            <BreakpointsEdit />
            <BreakpointsList />
          </BreakpointsFormProvider>
        </FlexRowWrapColumn>

        <FlexRowWrapColumn wrapAt="600px" maxW={`calc(100vw - 850px)`} h="auto">
          {/* <PreviewIndex /> */}
        </FlexRowWrapColumn>
      </FlexRowWrap>
    </Box>
  );
}
