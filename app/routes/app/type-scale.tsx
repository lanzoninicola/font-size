import { HStack } from "@chakra-ui/react";
import { Outlet, useOutletContext } from "remix";
import InnerPageContentArea from "~/components/layout/inner-page-content-area";
import InnerPageHeaderArea from "~/components/layout/inner-page-header-area";
import SelectorsToolbar from "~/components/selectors/selectors-toolbar";
import ActionButton from "~/components/shared/action-button";
import { CollapseIcon } from "~/components/shared/icons";
import SectionSubHeader from "~/components/shared/section-subheader";
import SidePanelCollapsed from "~/components/shared/side-panel-collapsed";

import { ContextType } from "../app";

export default function SelectorsPage() {
  const { isPanelCollapsed, togglePanelCollapse } =
    useOutletContext<ContextType>();

  return (
    <>
      {!isPanelCollapsed && (
        <>
          <InnerPageHeaderArea>
            <HStack w="100%" justify={"space-between"}>
              <SectionSubHeader>Type Scale</SectionSubHeader>
              <ActionButton label="Collpase" onClick={togglePanelCollapse}>
                <CollapseIcon />
              </ActionButton>
            </HStack>
            <SelectorsToolbar />
          </InnerPageHeaderArea>
          <InnerPageContentArea>
            <Outlet />
          </InnerPageContentArea>
        </>
      )}
      {isPanelCollapsed && (
        <>
          <SidePanelCollapsed
            title="Type Scale"
            toggleCollapse={togglePanelCollapse}
          />
        </>
      )}
    </>
  );
}
