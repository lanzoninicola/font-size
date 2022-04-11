import { Box } from "@chakra-ui/react";
import { json } from "remix";
import CodeSection from "~/components/code/code-section";
import FlexRowWrap from "~/components/layout/flex-row-wrap";
import FlexRowWrapColumn from "~/components/layout/flex-row-wrap-column";
import PreviewSection from "~/components/preview/preview-section";
import StyleSection from "~/components/style-section/style-section";

import { v4 as uuidv4 } from "uuid";

export interface LoaderData {
  ENV: {
    IFRAME_ORIGIN: string;
  };
  senderId: string;
}

export async function loader() {
  const uuid = uuidv4();

  return json({
    ENV: {
      IFRAME_ORIGIN: process.env.IFRAME_ORIGIN,
    },
    senderId: uuid,
  });
}

export default function StylingSection() {
  return (
    <>
      <FlexRowWrap>
        <FlexRowWrapColumn wrapAt="600px" maxW="650px">
          <StyleSection />
          <CodeSection />
        </FlexRowWrapColumn>
        <FlexRowWrapColumn wrapAt="600px" maxW={`calc(100vw - 850px)`} h="auto">
          {/* <Box bg="blue" h="100px" w="100%" flex={"1 0 600px"}></Box> */}
          <PreviewSection />
        </FlexRowWrapColumn>
      </FlexRowWrap>
    </>
  );
}
