import { Box, HStack } from "@chakra-ui/react";
import { json } from "remix";
import CodeIndex from "~/components/code/code-index";
import FlexRowWrap from "~/components/layout/flex-row-wrap";
import FlexRowWrapColumn from "~/components/layout/flex-row-wrap-column";
import PreviewIndex from "~/components/preview/preview-index";
import MediaQueryEdit from "~/components/media-queries/media-query-edit";

import { v4 as uuidv4 } from "uuid";
import useBreakpointsSelector from "~/context/font-size/hooks/useBreakpointsSelector";
import BreakpointsNotCreatedMessage from "~/components/shared/breakpoints-not-created-message";
import { PreviewProvider } from "~/context/preview/preview-context";
import SectionHeader from "~/components/shared/section-header";
import ToolbarButton from "~/components/layout/toolbar-button";
import ToolbarWrapper from "~/components/layout/toolbar-wrapper";
import {
  NewMediaQueryIcon,
  CodeIcon,
  ExportConfig,
} from "~/components/shared/icons";
import SectionSubHeader from "~/components/shared/section-subheader";
import VStackBox from "~/components/shared/vstack-wrapper";
import PreviewToolbar from "~/components/preview/preview-toolbar";
import MediaQueriesToolbar from "~/components/media-queries/media-queries-toolbar";
import MediaQueryList from "~/components/media-queries/media-query-list";
import { MediaQueryBuilderProvider } from "~/context/media-query-builder/media-query-builder-context";

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

export default function MediaQueriesSection() {
  const { breakpoints } = useBreakpointsSelector();

  return (
    <>
      <Box>
        <Box
          paddingLeft="2rem"
          borderBottom={"1px solid"}
          borderBottomColor="primaryAlpha.20"
        >
          <SectionHeader>Media Queries</SectionHeader>
        </Box>

        <FlexRowWrap gap={0}>
          {!breakpoints && (
            <FlexRowWrapColumn wrapAt="600px" maxW={`auto`} h="auto">
              <BreakpointsNotCreatedMessage />
            </FlexRowWrapColumn>
          )}
          {breakpoints && (
            <>
              <FlexRowWrapColumn
                wrapAt="600px"
                maxW="650px"
                borderRight="1px solid"
                borderRightColor={"primaryAlpha.20"}
              >
                <MediaQueryBuilderProvider>
                  <VStackBox
                    h="100px"
                    borderBottom="1px solid"
                    borderBottomColor="primaryAlpha.20"
                    paddingInlineStart="2rem"
                    paddingRight="1rem"
                  >
                    <SectionSubHeader>Builder</SectionSubHeader>
                    <MediaQueriesToolbar />
                  </VStackBox>

                  <MediaQueryEdit />
                  <MediaQueryList />
                </MediaQueryBuilderProvider>

                <CodeIndex />
              </FlexRowWrapColumn>
              <FlexRowWrapColumn wrapAt="600px" h="auto" paddingRight="1rem">
                {/* <Box bg="blue" h="100px" w="100%" flex={"1 0 600px"}></Box> */}

                <PreviewProvider>
                  <VStackBox
                    h="100px"
                    borderBottom="1px solid"
                    borderBottomColor="primaryAlpha.20"
                    paddingInlineStart="2rem"
                    paddingRight="1rem"
                  >
                    <SectionSubHeader>Preview</SectionSubHeader>
                    <PreviewToolbar />
                  </VStackBox>
                  <PreviewIndex />
                </PreviewProvider>
              </FlexRowWrapColumn>
            </>
          )}
        </FlexRowWrap>
      </Box>
    </>
  );
}
