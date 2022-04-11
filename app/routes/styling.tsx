import { Box } from "@chakra-ui/react";
import CodeSection from "~/components/code/code-section";
import FlexRowWrap from "~/components/layout/flex-row-wrap";
import FlexRowWrapColumn from "~/components/layout/flex-row-wrap-column";
import StyleSection from "~/components/style-section/style-section";

export default function StylingSection() {
  return (
    <>
      <FlexRowWrap>
        <FlexRowWrapColumn wrapAt="600px" maxW="650px">
          <StyleSection />
          <CodeSection />
        </FlexRowWrapColumn>
        <FlexRowWrapColumn wrapAt="600px" maxW={`calc(100vw - 850px)`}>
          <Box bg="blue" h="100px" w="100%" flex={"1 0 600px"}></Box>
        </FlexRowWrapColumn>
      </FlexRowWrap>
    </>
  );
}
