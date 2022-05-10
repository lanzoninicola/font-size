import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet, useOutletContext } from "remix";
import InnerPageContentArea from "~/components/layout/inner-page-content-area";
import InnerPageHeaderArea from "~/components/layout/inner-page-header-area";
import MediaQueriesToolbar from "~/components/media-queries/media-queries-toolbar";
import ActionButton from "~/components/shared/action-button";
import { CollapseIcon } from "~/components/shared/icons";
import SectionSubHeader from "~/components/shared/section-subheader";
import SidePanelCollapsed from "~/components/shared/side-panel-collapsed";

import { ContextType } from "../app";

export default function MediaQueriesPage() {
  const { isPanelCollapsed, togglePanelCollapse } =
    useOutletContext<ContextType>();

  return (
    <>
      {!isPanelCollapsed && (
        <>
          <InnerPageHeaderArea>
            <HStack w="100%" justify={"space-between"}>
              <SectionSubHeader>Media Queries</SectionSubHeader>
              <ActionButton label="Collapse" onClick={togglePanelCollapse}>
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
    </>
  );
}
