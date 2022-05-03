import { Heading, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { json, MetaFunction, Outlet, useOutletContext } from "remix";
import BreakpointsToolbar from "~/components/breakpoints/breakpoints-toolbar";
import Footer from "~/components/footer/footer";
import Header from "~/components/header/header";
import InnerPageContentArea from "~/components/layout/inner-page-content-area";
import InnerPageHeaderArea from "~/components/layout/inner-page-header-area";
import PreviewContent from "~/components/preview/preview-content";
import PreviewSideContent from "~/components/preview/preview-side-content";
import ActionButton from "~/components/shared/action-button";
import { CollapseIcon } from "~/components/shared/icons";
import MainGridWrapper from "~/components/shared/main-grid-wrapper";
import SectionSubHeader from "~/components/shared/section-subheader";
import SidePanel from "~/components/shared/side-panel";
import SidePanelCollapsed from "~/components/shared/side-panel-collapsed";
import AppSidebar from "~/components/sidebar/app-sidebar";
import { BreakpointsFormProvider } from "~/context/breakpoint-builder/breakpoints-form-context";
import { MediaQueryBuilderProvider } from "~/context/media-query-builder/media-query-builder-context";
import { PreviewProvider } from "~/context/preview/preview-context";
import devices from "~/domain/preview/deviceProviders/yesviz/data/devices.json";
import { ContextType } from "~/root";

export const meta: MetaFunction = () => {
  return {
    title: "Font Scale",
    description: "Let me help you",
  };
};

export default function Index() {
  const { isPanelCollapsed, togglePanelCollapse } =
    useOutletContext<ContextType>();

  return (
    <>
      {!isPanelCollapsed && (
        <>
          <InnerPageHeaderArea>
            <HStack w="100%" justify={"space-between"}>
              <SectionSubHeader>Home</SectionSubHeader>
              <ActionButton label="Collpase" onClick={togglePanelCollapse}>
                <CollapseIcon />
              </ActionButton>
            </HStack>
          </InnerPageHeaderArea>
          <InnerPageContentArea>
            <Heading color="white">Welcome!</Heading>
          </InnerPageContentArea>
        </>
      )}
      {isPanelCollapsed && (
        <>
          <SidePanelCollapsed
            title="Home"
            toggleCollapse={togglePanelCollapse}
          />
        </>
      )}
    </>
  );
}
