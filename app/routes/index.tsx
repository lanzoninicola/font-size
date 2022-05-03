import { useState } from "react";
import { json, MetaFunction, Outlet, useOutletContext } from "remix";
import Footer from "~/components/footer/footer";
import Header from "~/components/header/header";
import PreviewContent from "~/components/preview/preview-content";
import PreviewSideContent from "~/components/preview/preview-side-content";
import MainGridWrapper from "~/components/shared/main-grid-wrapper";
import SidePanel from "~/components/shared/side-panel";
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

export async function loader() {
  return json(devices);
}

export default function Index() {
  const { isPanelCollapsed, togglePanelCollapse } =
    useOutletContext<ContextType>();

  return (
    <MainGridWrapper as="main" bg="background.700" minH="100vh">
      <Header />

      <AppSidebar />
      <BreakpointsFormProvider>
        <MediaQueryBuilderProvider>
          <SidePanel
            minW="50px"
            maxW="370px"
            isCollapsed={isPanelCollapsed}
            gridArea="panel"
          >
            <Outlet />
          </SidePanel>

          <PreviewProvider>
            <PreviewContent />
            <PreviewSideContent />
          </PreviewProvider>
        </MediaQueryBuilderProvider>
      </BreakpointsFormProvider>
      <Footer />
    </MainGridWrapper>
  );
}
