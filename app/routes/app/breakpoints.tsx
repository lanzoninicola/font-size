import { useEffect } from "react";
import Breakpoints from "~/components/breakpoints/breakpoints";
import FlexRowWrap from "~/components/layout/flex-row-wrap";
import FlexRowWrapColumn from "~/components/layout/flex-row-wrap-column";

export default function BreakpointsPage() {
  return (
    <FlexRowWrap>
      <FlexRowWrapColumn wrapAt="600px" maxW="650px">
        <Breakpoints />
        {/* <CodeIndex /> */}
      </FlexRowWrapColumn>
      <FlexRowWrapColumn wrapAt="600px" maxW={`calc(100vw - 850px)`} h="auto">
        {/* <Box bg="blue" h="100px" w="100%" flex={"1 0 600px"}></Box> */}
        {/* <PreviewIndex /> */}
      </FlexRowWrapColumn>
    </FlexRowWrap>
  );
}
