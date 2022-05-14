import { useState } from "react";
import { createContext } from "use-context-selector";

import { PreviewContext, PreviewDevice, YesVizDeviceInfo } from "./types";

export const PreviewContextData = createContext<PreviewContext>(
  {} as PreviewContext
);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [devices, setDevices] = useState<YesVizDeviceInfo[]>([]);
  const [previewWindows, setPreviewWindows] = useState<PreviewDevice[]>([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [zoom, setZoom] = useState(100);

  return (
    <PreviewContextData.Provider
      value={{
        devices,
        previewWindows,
        previewUrl,
        zoom,
        setDevices,
        setPreviewWindows,
        setPreviewUrl,
        setZoom,
      }}
    >
      {children}
    </PreviewContextData.Provider>
  );
}
