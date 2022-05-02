import { useContextSelector } from "use-context-selector";
import { YesVizDeviceInfo } from "../interfaces";

import { PreviewContextData } from "../preview-context";

export default function usePreviewDevicesSelector() {
  const devices = useContextSelector(PreviewContextData, (ctx) => ctx?.devices);

  const setDevices = useContextSelector(
    PreviewContextData,
    (ctx) => ctx?.setDevices
  );

  function setDevicesOrderedByName(devices: YesVizDeviceInfo[]) {
    setDevices(
      devices.sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    );
  }

  return {
    devices,
    setDevices: setDevicesOrderedByName,
  };
}
