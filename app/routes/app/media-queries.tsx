import { Box } from "@chakra-ui/react";
import { json, Outlet } from "remix";
import { v4 as uuidv4 } from "uuid";
import CodeIndex from "~/components/code/code-index";
import FlexRowWrap from "~/components/layout/flex-row-wrap";
import FlexRowWrapColumn from "~/components/layout/flex-row-wrap-column";
import MediaQueriesToolbar from "~/components/media-queries/media-queries-toolbar";
import MediaQueryEdit from "~/components/media-queries/media-query-edit";
import MediaQueryList from "~/components/media-queries/media-query-list";
import PreviewIndex from "~/components/preview/preview-index";
import PreviewToolbar from "~/components/preview/preview-toolbar";
import BreakpointsNotCreatedMessage from "~/components/shared/breakpoints-not-created-message";
import SectionHeader from "~/components/shared/section-header";
import SectionSubHeader from "~/components/shared/section-subheader";
import VStackBox from "~/components/shared/vstack-wrapper";
import useBreakpointsSelector from "~/context/font-size/hooks/useBreakpointsSelector";
import { MediaQueryBuilderProvider } from "~/context/media-query-builder/media-query-builder-context";
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
          {breakpoints && <Outlet />}
        </FlexRowWrap>
      </Box>
    </>
  );
}
