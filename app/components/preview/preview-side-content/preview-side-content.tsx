import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import PreviewDevicesPanel from "./preview-devices-panel";
import PreviewSidebar from "./preview-sidebar";

export default function PreviewSideContent() {
  const [showDevicesPanel, setShowDevicesPanel] = useState(false);

  function onShowDevicesPanel() {
    setShowDevicesPanel(!showDevicesPanel);
  }

  return (
    <>
      <HStack h="100%" gridArea="preview-side-content" position="relative">
        {showDevicesPanel && (
          <PreviewDevicesPanel onShowDevicesPanel={onShowDevicesPanel} />
        )}
        <PreviewSidebar onShowDevicesPanel={onShowDevicesPanel} />
      </HStack>
    </>
  );
}
