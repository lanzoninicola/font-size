import { Box } from "@chakra-ui/react";
import { Outlet } from "remix";
import FlexRowWrap from "~/components/layout/flex-row-wrap";
import PageHeader from "~/components/shared/page-header";
import { BreakpointsFormProvider } from "~/context/breakpoint-builder/breakpoints-form-context";

export default function BreakpointsPage() {
  return (
    <Box>
      <PageHeader>Breakpoints</PageHeader>

      <FlexRowWrap gap={0}>
        <BreakpointsFormProvider>
          <Outlet />
        </BreakpointsFormProvider>
      </FlexRowWrap>
    </Box>
  );
}
