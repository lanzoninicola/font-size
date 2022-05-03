import { HStack } from "@chakra-ui/react";
import { Outlet, useOutletContext } from "remix";
import BreakpointsToolbar from "~/components/breakpoints/breakpoints-toolbar";
import InnerPageContentArea from "~/components/layout/inner-page-content-area";
import InnerPageHeaderArea from "~/components/layout/inner-page-header-area";
import ActionButton from "~/components/shared/action-button";
import { CollapseIcon } from "~/components/shared/icons";
import SectionSubHeader from "~/components/shared/section-subheader";
import SidePanelCollapsed from "~/components/shared/side-panel-collapsed";
import { ContextType } from "~/root";

export default function BreakpointsPage() {
  const { isPanelCollapsed, togglePanelCollapse } =
    useOutletContext<ContextType>();

  return (
    <>
      {!isPanelCollapsed && (
        <>
          <InnerPageHeaderArea>
            <HStack w="100%" justify={"space-between"}>
              <SectionSubHeader>Breakpoints</SectionSubHeader>
              <ActionButton label="Collpase" onClick={togglePanelCollapse}>
                <CollapseIcon />
              </ActionButton>
            </HStack>
            <BreakpointsToolbar />
          </InnerPageHeaderArea>
          <InnerPageContentArea>
            <Outlet />
          </InnerPageContentArea>
        </>
      )}
      {isPanelCollapsed && (
        <>
          <SidePanelCollapsed
            title="Breakpoints"
            toggleCollapse={togglePanelCollapse}
          />
        </>
      )}
    </>
  );
}
