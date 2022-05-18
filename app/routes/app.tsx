import { useState } from "react";
import { json, Outlet } from "remix";
import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import AppSidebar from "~/components/layout/sidebar/app-sidebar";
import PreviewFrames from "~/components/preview/preview-frames";
import PreviewSideContent from "~/components/preview/preview-side-content/preview-side-content";
import MainGridWrapper from "~/components/shared/main-grid-wrapper";
import SidePanel from "~/components/shared/side-panel";
import { BreakpointsFormProvider } from "~/context/breakpoint-builder/breakpoints-form-context";
import { MediaQueryBuilderProvider } from "~/context/media-query-builder/media-query-builder-context";
import { PreviewProvider } from "~/context/preview/preview-context";
import { TypeScaleCalculatorFormProvider } from "~/context/type-scale-calculator-form/type-scale-calculator-form-context";
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
    <MainGridWrapper as="main" bg="background.500" minH="100vh">
      <Header />

      <AppSidebar />
      <PreviewProvider>
        <BreakpointsFormProvider>
          <TypeScaleCalculatorFormProvider>
            <MediaQueryBuilderProvider>
              <SidePanel
                minW="50px"
                maxW="400px"
                isCollapsed={isPanelCollapsed}
                gridArea="panel"
              >
                <Outlet context={context} />
              </SidePanel>

              <PreviewFrames />
              <PreviewSideContent />
            </MediaQueryBuilderProvider>
          </TypeScaleCalculatorFormProvider>
        </BreakpointsFormProvider>
      </PreviewProvider>
      <Footer />
    </MainGridWrapper>
  );
}
