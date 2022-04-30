import { useContextSelector } from "use-context-selector";

import { PreviewContextData } from "../preview-context";

export default function usePreviewDevicesSelector() {
  const devices = useContextSelector(PreviewContextData, (ctx) => ctx?.devices);

  const setDevices = useContextSelector(
    PreviewContextData,
    (ctx) => ctx?.setDevices
  );

  return {
    devices,
    setDevices,
  };
}
