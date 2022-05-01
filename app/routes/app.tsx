import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet } from "remix";
import Footer from "~/components/footer/footer";
import Header from "~/components/header/header";
import FlippedContainer from "~/components/layout/flipped-container";
import PreviewContent from "~/components/preview/preview-content";
import PreviewSidebar from "~/components/preview/preview-sidebar";
import PreviewToolbar from "~/components/preview/preview-toolbar";
import MainGridWrapper from "~/components/shared/main-grid-wrapper";
import SectionHeader from "~/components/shared/section-header";
import SectionSubHeader from "~/components/shared/section-subheader";
import SidePanel from "~/components/shared/side-panel";
import VStackBox from "~/components/shared/vstack-wrapper";
import AppSidebar from "~/components/sidebar/app-sidebar";
import { BreakpointsFormProvider } from "~/context/breakpoint-builder/breakpoints-form-context";
import { MediaQueryBuilderProvider } from "~/context/media-query-builder/media-query-builder-context";
import { PreviewProvider } from "~/context/preview/preview-context";

export type ContextType = {
  isPanelCollapsed: boolean;
  togglePanelCollapse: () => void;
};

export default function App() {
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  function togglePanelCollapse() {
    setIsPanelCollapsed(!isPanelCollapsed);
  }

  const context: ContextType = { isPanelCollapsed, togglePanelCollapse };

  return (
    <MainGridWrapper as="main" bg="background.300" minH="100vh">
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
            <Outlet context={context} />
          </SidePanel>

          <PreviewProvider>
            <PreviewContent />
            <PreviewSidebar />
          </PreviewProvider>
        </MediaQueryBuilderProvider>
      </BreakpointsFormProvider>
      <Footer />
    </MainGridWrapper>
  );
}
