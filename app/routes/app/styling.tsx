import { Box } from "@chakra-ui/react";
import { json } from "remix";
import CodeIndex from "~/components/code/code-index";
import FlexRowWrap from "~/components/layout/flex-row-wrap";
import FlexRowWrapColumn from "~/components/layout/flex-row-wrap-column";
import PreviewIndex from "~/components/preview/preview-index";
import MediaQueryEdit from "~/components/style-section/media-query-edit";

import { v4 as uuidv4 } from "uuid";
import useBreakpointsSelector from "~/context/font-size/hooks/useBreakpointsSelector";
import BreakpointsNotCreatedMessage from "~/components/shared/breakpoints-not-created-message";
import { PreviewProvider } from "~/context/preview/preview-context";

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
  const { breakpoints } = useBreakpointsSelector();

  return (
    <>
      <FlexRowWrap spacing={"3rem"}>
        {!breakpoints && (
          <FlexRowWrapColumn wrapAt="600px" maxW={`auto`} h="auto">
            <BreakpointsNotCreatedMessage />
          </FlexRowWrapColumn>
        )}
        {breakpoints && (
          <>
            <FlexRowWrapColumn wrapAt="600px" maxW="650px" gap="3rem">
              <MediaQueryEdit />
              <CodeIndex />
            </FlexRowWrapColumn>
            <FlexRowWrapColumn
              wrapAt="600px"
              h="auto"
              maxW={`calc(100vw - 900px)`}
            >
              {/* <Box bg="blue" h="100px" w="100%" flex={"1 0 600px"}></Box> */}

              <PreviewProvider>
                <PreviewIndex />
              </PreviewProvider>
            </FlexRowWrapColumn>
          </>
        )}
      </FlexRowWrap>
    </>
  );
}
