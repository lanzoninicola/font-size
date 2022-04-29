import { Box } from "@chakra-ui/react";
import { Outlet } from "remix";
import FlexRowWrap from "~/components/layout/flex-row-wrap";
import { BreakpointsFormProvider } from "~/context/breakpoint-builder/breakpoints-form-context";

export default function BreakpointsPage() {
  return (
    <Box>
      <FlexRowWrap gap={0}>
        <BreakpointsFormProvider>
          <Outlet />
        </BreakpointsFormProvider>
      </FlexRowWrap>
    </Box>
  );
}
