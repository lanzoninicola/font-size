import { useState } from "react";
import { json, Outlet } from "remix";
import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import PreviewContent from "~/components/preview/preview-content";
import PreviewSideContent from "~/components/preview/preview-side-content";
import MainGridWrapper from "~/components/shared/main-grid-wrapper";
import SidePanel from "~/components/shared/side-panel";
import AppSidebar from "~/components/layout/sidebar/app-sidebar";
import { BreakpointsFormProvider } from "~/context/breakpoint-builder/breakpoints-form-context";
import { MediaQueryBuilderProvider } from "~/context/media-query-builder/media-query-builder-context";
import { PreviewProvider } from "~/context/preview/preview-context";
import devices from "~/domain/preview/deviceProviders/yesviz/data/devices.json";

export type ContextType = {
  isPanelCollapsed: boolean;
  togglePanelCollapse: () => void;
};

export async function loader() {
  return json(devices);
}

export default function App() {
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  function togglePanelCollapse() {
    setIsPanelCollapsed(!isPanelCollapsed);
  }

  const context: ContextType = { isPanelCollapsed, togglePanelCollapse };

  return (
    <MainGridWrapper as="main" bg="background.700" minH="100vh">
      <Header />

      <AppSidebar />
      <BreakpointsFormProvider>
        <MediaQueryBuilderProvider>
          <SidePanel
            minW="50px"
            maxW="400px"
            isCollapsed={isPanelCollapsed}
            gridArea="panel"
          >
            <Outlet context={context} />
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
