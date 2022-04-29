import { Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { json, Outlet } from "remix";
import FlexRowWrap from "~/components/layout/flex-row-wrap";
import FlexRowWrapColumn from "~/components/layout/flex-row-wrap-column";
import InnerContentColumn from "~/components/layout/inner-content-column";
import InnerPageContentArea from "~/components/layout/inner-page-content-area";
import InnerPageHeaderArea from "~/components/layout/inner-page-header-area";
import MediaQueriesToolbar from "~/components/media-queries/media-queries-toolbar";
import MediaQueryEdit from "~/components/media-queries/media-query-edit";
import PreviewIndex from "~/components/preview/preview-index";
import PreviewToolbar from "~/components/preview/preview-toolbar";
import ActionButton from "~/components/shared/action-button";
import { CollapseIcon, ExpandIcon } from "~/components/shared/icons";
import SectionSubHeader from "~/components/shared/section-subheader";
import VStackBox from "~/components/shared/vstack-wrapper";
import { PreviewProvider } from "~/context/preview/preview-context";

export async function loader() {
  // const url = "https://yesviz.com/viewport/";
  // // return json();
  // const response = await fetch(url);
  // const html = await response.text();
  // const parser = new DOMParser();
  // const doc = parser.parseFromString(html, "text/html");
  // console.log(doc);
  return null;
}

export default function MediaQueriesEditOutletPage() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function toggleCollapse() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <FlexRowWrap spacing="0">
      <FlexRowWrapColumn
        wrapAt="250px"
        maxW={isCollapsed ? "50px" : "370px"}
        borderRight="1px solid"
        borderRightColor={"primaryAlpha.20"}
        minH="100vh"
      >
        {!isCollapsed && (
          <>
            <InnerPageHeaderArea>
              <HStack w="100%" justify={"space-between"}>
                <SectionSubHeader>Builder</SectionSubHeader>
                <ActionButton label="Collpase" onClick={toggleCollapse}>
                  <CollapseIcon />
                </ActionButton>
              </HStack>
              <MediaQueriesToolbar />
            </InnerPageHeaderArea>
            <InnerPageContentArea>
              <MediaQueryEdit />
            </InnerPageContentArea>
          </>
        )}
        {isCollapsed && (
          <>
            <VStackBox w="100%" h="100%" pt="1rem" align="center">
              <ActionButton label="Collpase" onClick={toggleCollapse}>
                <ExpandIcon />
              </ActionButton>
              <Box w="100%" position={"relative"}>
                <SectionSubHeader
                  position={"absolute"}
                  top={"20px"}
                  left={"-5px"}
                  transform={"rotate(90deg)"}
                  transformOrigin="center"
                >
                  Builder
                </SectionSubHeader>
              </Box>
            </VStackBox>
          </>
        )}
      </FlexRowWrapColumn>

      <FlexRowWrapColumn wrapAt="600px" h="auto" paddingRight="1rem">
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
    </FlexRowWrap>
  );
}
