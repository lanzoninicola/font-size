import { Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet, useOutletContext } from "remix";
import InnerPageContentArea from "~/components/layout/inner-page-content-area";
import InnerPageHeaderArea from "~/components/layout/inner-page-header-area";
import MediaQueriesToolbar from "~/components/media-queries/media-queries-toolbar";
import ActionButton from "~/components/shared/action-button";
import { CollapseIcon, ExpandIcon } from "~/components/shared/icons";
import SectionSubHeader from "~/components/shared/section-subheader";
import SidePanelCollapsed from "~/components/shared/side-panel-collapsed";
import VStackBox from "~/components/shared/vstack-wrapper";
import { MediaQueryBuilderProvider } from "~/context/media-query-builder/media-query-builder-context";
import { ContextType } from "../app";

export default function MediaQueriesPage() {
  const { isPanelCollapsed, togglePanelCollapse } =
    useOutletContext<ContextType>();

  return (
    <>
      {/* <Box
        maxW={isCollapsed ? "50px" : "370px"}
        borderRight="1px solid"
        borderRightColor={"primaryAlpha.20"}
        minH="100vh"
        transition="max-width 0.2s ease-in-out"
        bg="background.300"
      > */}
      {!isPanelCollapsed && (
        <>
          <InnerPageHeaderArea>
            <HStack w="100%" justify={"space-between"}>
              <SectionSubHeader>Media Queries</SectionSubHeader>
              <ActionButton label="Collpase" onClick={togglePanelCollapse}>
                <CollapseIcon />
              </ActionButton>
            </HStack>
            <MediaQueriesToolbar />
          </InnerPageHeaderArea>
          <InnerPageContentArea>
            <Outlet />
          </InnerPageContentArea>
        </>
      )}
      {isPanelCollapsed && (
        <>
          <SidePanelCollapsed
            title="Media Queries"
            toggleCollapse={togglePanelCollapse}
          />
        </>
      )}
      {/* </Box> */}
    </>
  );
}
